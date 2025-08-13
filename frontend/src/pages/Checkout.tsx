import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { razorpayService } from '../services/razorpayService'

type PaymentMethod = 'card' | 'paypal' | 'apple' | 'google'

const planDetails = {
  'FitPass Elite': { 
    name: 'FitPass Elite', 
    monthlyPrice: 6999, 
    yearlyPrice: 69999,
    description: 'Unlimited access to group classes, all gyms and at-home workouts',
    icon: '👑',
    gradient: 'from-red-500 to-orange-500',
    features: ['All ELITE & PRO gyms', 'Personal training', 'Priority booking']
  },
  'FitPass Pro': { 
    name: 'FitPass Pro', 
    monthlyPrice: 3999, 
    yearlyPrice: 39999,
    description: 'Unlimited access to all PRO gyms and at-home workouts',
    icon: '💪',
    gradient: 'from-blue-500 to-cyan-500',
    features: ['All PRO gyms', 'Group classes', 'Equipment access']
  },
  'FitPass Select': { 
    name: 'FitPass Select', 
    monthlyPrice: 1999, 
    yearlyPrice: 19999,
    description: 'Unlimited access to single center and at-home workouts',
    icon: '🎯',
    gradient: 'from-green-500 to-emerald-500',
    features: ['One center access', 'Basic equipment', 'Locker room']
  },
  'FitPass Play': { 
    name: 'FitPass Play', 
    monthlyPrice: 2999, 
    yearlyPrice: 29999,
    description: 'Unlimited access to sports and recreational activities',
    icon: '🏸',
    gradient: 'from-purple-500 to-pink-500',
    features: ['Sports facilities', 'Guided sessions', 'Tournaments']
  },
  'FitPass Trial': { 
    name: 'FitPass Trial', 
    dailyPrice: 5,
    description: '1-day trial access to test our facilities',
    icon: '🎯',
    gradient: 'from-yellow-500 to-orange-500',
    features: ['Single day access', 'All equipment available', 'Basic support']
  }
}

export default function Checkout() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { auth } = useAuth()
  
  const planName = searchParams.get('plan') as keyof typeof planDetails
  const billing = searchParams.get('billing') as 'monthly' | 'yearly'
  
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card')
  const [formData, setFormData] = useState({
    email: auth.userId || '',
    fullName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
    city: '',
    zipCode: '',
    country: 'US',
    phone: ''
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [currentStep, setCurrentStep] = useState(1)
  const [paymentError, setPaymentError] = useState<string>('')
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  useEffect(() => {
    if (!planName || !planDetails[planName]) {
      navigate('/subscriptions')
    }
  }, [planName, navigate])

  if (!planName || !planDetails[planName]) {
    return null
  }

  const plan = planDetails[planName]
  
  // Handle different pricing structures
  let price: number
  let savings: number
  let monthlyEquivalent: number
  
  if (planName === 'FitPass Trial') {
    price = (plan as any).dailyPrice
    savings = 0
    monthlyEquivalent = (plan as any).dailyPrice
  } else {
    price = billing === 'yearly' ? (plan as any).yearlyPrice : (plan as any).monthlyPrice
    savings = billing === 'yearly' ? ((plan as any).monthlyPrice * 12) - (plan as any).yearlyPrice : 0
    monthlyEquivalent = billing === 'yearly' ? Math.round((plan as any).yearlyPrice / 12) : (plan as any).monthlyPrice
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
    
    if (paymentMethod === 'card') {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required'
      if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required'
      if (!formData.cvv.trim()) newErrors.cvv = 'CVV is required'
    }
    
    if (!formData.billingAddress.trim()) newErrors.billingAddress = 'Billing address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handlePaymentSuccess = (paymentResult: any) => {
    setPaymentSuccess(true)
    setIsProcessing(false)
    // Show success and redirect after a short delay
    setTimeout(() => {
      navigate('/dashboard?welcome=true')
    }, 2000)
  }

  const handlePaymentError = (error: string) => {
    setPaymentError(error)
    setIsProcessing(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    
    setIsProcessing(true)
    
    try {
      // Create Razorpay order
      const orderData = await razorpayService.createOrder(
        price,
        planName,
        planName === 'FitPass Trial' ? 'daily' : billing,
        auth.userId
      )

      // Initialize Razorpay payment
      await razorpayService.initializePayment(
        orderData,
        {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone
        },
        (response) => {
          setPaymentSuccess(true)
          setIsProcessing(false)
          // Show success and redirect after a short delay
          setTimeout(() => {
            navigate('/dashboard?welcome=true')
          }, 2000)
        },
        (error) => {
          setPaymentError(error)
          setIsProcessing(false)
        }
      )
    } catch (error) {
      console.error('Payment error:', error)
      setPaymentError('Payment failed. Please try again.')
      setIsProcessing(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-200 to-orange-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-orange-200 to-yellow-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-red-100 to-orange-100 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Link 
            to="/subscriptions" 
            className="inline-flex items-center text-red-500 hover:text-red-600 mb-6 group transition-all duration-300"
          >
            <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Plans
          </Link>
          
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-fade-in">
              Complete Your Purchase
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in-delay">
              You're just one step away from starting your fitness journey! 🚀
            </p>
            {paymentError && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-2xl">
                <p className="text-red-600 text-center">{paymentError}</p>
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 sticky top-8 animate-slide-in-left">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
                <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              
              {/* Selected Plan */}
              <div className="mb-8">
                <div className={`flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br ${plan.gradient} mb-6 mx-auto shadow-lg transform hover:scale-110 transition-all duration-300`}>
                  <span className="text-3xl">{plan.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 text-center mb-3">{plan.name}</h3>
                <p className="text-sm text-gray-600 text-center mb-6 leading-relaxed">{plan.description}</p>
                
                {/* Plan Features */}
                <div className="space-y-2 mb-6">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <svg className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>
                
                <div className="text-center p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl border border-red-100">
                  <span className="text-4xl font-bold text-gray-900">₹{price}</span>
                  <span className="text-gray-600">/{planName === 'FitPass Trial' ? 'day' : billing === 'yearly' ? 'year' : 'month'}</span>
                  {billing === 'yearly' && planName !== 'FitPass Trial' && (
                    <div className="text-sm text-green-600 font-medium mt-2">
                      Save ₹{savings}/year
                    </div>
                  )}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Plan Price</span>
                  <span className="font-medium">₹{price}</span>
                </div>
                
                {billing === 'yearly' && savings > 0 && planName !== 'FitPass Trial' && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Yearly discount</span>
                    <span>-₹{savings}</span>
                  </div>
                )}
                
                {planName !== 'FitPass Trial' && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>7-day free trial</span>
                    <span>-₹0</span>
                  </div>
                )}
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-gray-900">Total Today</span>
                    <span className="text-gray-900">₹0</span>
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    {planName === 'FitPass Trial' 
                      ? 'One-time payment for 1-day access'
                      : `Then ₹${monthlyEquivalent}/${billing === 'yearly' ? 'month' : 'month'} after trial`
                    }
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-100">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900">Secure Payment</h4>
                    <p className="text-xs text-gray-600">256-bit SSL encryption</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 animate-slide-in-right">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Information */}
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Contact Information</h3>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-red-500 transition-colors duration-300">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-red-100 focus:border-red-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                      />
                      {errors.fullName && <p className="mt-2 text-sm text-red-600 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.fullName}
                      </p>}
                    </div>
                    
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-red-500 transition-colors duration-300">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-red-100 focus:border-red-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                      />
                      {errors.email && <p className="mt-2 text-sm text-red-600 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.email}
                      </p>}
                    </div>
                    
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-red-500 transition-colors duration-300">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-red-100 focus:border-red-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                      />
                      {errors.phone && <p className="mt-2 text-sm text-red-600 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.phone}
                      </p>}
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Payment Method</h3>
                  </div>
                  <div className="grid gap-4 md:grid-cols-4">
                    {[
                      { id: 'card', label: 'Credit Card', icon: '💳', color: 'from-blue-500 to-purple-500' },
                      { id: 'paypal', label: 'PayPal', icon: '🔵', color: 'from-blue-400 to-blue-600' },
                      { id: 'apple', label: 'Apple Pay', icon: '🍎', color: 'from-gray-800 to-gray-900' },
                      { id: 'google', label: 'Google Pay', icon: '🔴', color: 'from-red-500 to-red-600' }
                    ].map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setPaymentMethod(method.id as PaymentMethod)}
                        className={`p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                          paymentMethod === method.id
                            ? `border-red-500 bg-gradient-to-br ${method.color} text-white shadow-lg`
                            : 'border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50 bg-white/50 backdrop-blur-sm'
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-3xl mb-3">{method.icon}</div>
                          <div className="text-sm font-semibold">{method.label}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Card Details */}
                {paymentMethod === 'card' && (
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mr-4">
                        <span className="text-white text-sm font-bold">3</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Card Details</h3>
                    </div>
                    <div className="space-y-6">
                      <div className="group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-red-500 transition-colors duration-300">Card Number</label>
                        <div className="relative">
                          <input
                            type="text"
                            name="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={formData.cardNumber}
                            onChange={(e) => {
                              e.target.value = formatCardNumber(e.target.value)
                              handleInputChange(e)
                            }}
                            maxLength={19}
                            className="w-full px-4 py-4 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-red-100 focus:border-red-500 transition-all duration-300 bg-white/50 backdrop-blur-sm pr-12"
                          />
                          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                            <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                            </svg>
                          </div>
                        </div>
                        {errors.cardNumber && <p className="mt-2 text-sm text-red-600 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.cardNumber}
                        </p>}
                      </div>
                      
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-red-500 transition-colors duration-300">Expiry Date</label>
                          <input
                            type="text"
                            name="expiryDate"
                            placeholder="MM/YY"
                            value={formData.expiryDate}
                            onChange={(e) => {
                              e.target.value = formatExpiryDate(e.target.value)
                              handleInputChange(e)
                            }}
                            maxLength={5}
                            className="w-full px-4 py-4 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-red-100 focus:border-red-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                          />
                          {errors.expiryDate && <p className="mt-2 text-sm text-red-600 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {errors.expiryDate}
                          </p>}
                        </div>
                        <div className="group">
                          <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-red-500 transition-colors duration-300">CVV</label>
                          <input
                            type="text"
                            name="cvv"
                            placeholder="123"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            maxLength={4}
                            className="w-full px-4 py-4 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-red-100 focus:border-red-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                          />
                          {errors.cvv && <p className="mt-2 text-sm text-red-600 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {errors.cvv}
                          </p>}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Billing Address */}
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mr-4">
                      <span className="text-white text-sm font-bold">4</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Billing Address</h3>
                  </div>
                  <div className="space-y-6">
                    <div className="group">
                      <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-red-500 transition-colors duration-300">Address</label>
                      <input
                        type="text"
                        name="billingAddress"
                        placeholder="Enter your billing address"
                        value={formData.billingAddress}
                        onChange={handleInputChange}
                        className="w-full px-4 py-4 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-red-100 focus:border-red-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                      />
                      {errors.billingAddress && <p className="mt-2 text-sm text-red-600 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.billingAddress}
                      </p>}
                    </div>
                    
                    <div className="grid gap-6 md:grid-cols-3">
                      <div className="group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-red-500 transition-colors duration-300">City</label>
                        <input
                          type="text"
                          name="city"
                          placeholder="Enter city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-red-100 focus:border-red-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                        />
                        {errors.city && <p className="mt-2 text-sm text-red-600 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.city}
                        </p>}
                      </div>
                      <div className="group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-red-500 transition-colors duration-300">ZIP Code</label>
                        <input
                          type="text"
                          name="zipCode"
                          placeholder="Enter ZIP code"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-red-100 focus:border-red-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                        />
                        {errors.zipCode && <p className="mt-2 text-sm text-red-600 flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.zipCode}
                        </p>}
                      </div>
                      <div className="group">
                        <label className="block text-sm font-semibold text-gray-700 mb-2 group-hover:text-red-500 transition-colors duration-300">Country</label>
                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full px-4 py-4 rounded-2xl border-2 border-gray-200 focus:ring-4 focus:ring-red-100 focus:border-red-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                        >
                          <option value="US">United States</option>
                          <option value="CA">Canada</option>
                          <option value="UK">United Kingdom</option>
                          <option value="AU">Australia</option>
                          <option value="DE">Germany</option>
                          <option value="FR">France</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Terms and Submit */}
                <div className="space-y-6">
                  <div className="flex items-start p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl border border-red-100">
                    <input
                      type="checkbox"
                      id="terms"
                      className="mt-1 h-5 w-5 text-red-500 focus:ring-red-500 border-gray-300 rounded"
                      required
                    />
                    <label htmlFor="terms" className="ml-3 text-sm text-gray-700">
                      I agree to the{' '}
                      <a href="#" className="text-red-500 hover:text-red-600 font-semibold underline">Terms of Service</a>
                      {' '}and{' '}
                      <a href="#" className="text-red-500 hover:text-red-600 font-semibold underline">Privacy Policy</a>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full btn-apple py-5 text-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300 shadow-xl"
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing Payment...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <span>{planName === 'FitPass Trial' ? `Pay ₹${price} for 1 Day` : 'Start Free Trial - ₹0 Today'}</span>
                        <svg className="ml-2 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    )}
                  </button>

                  <div className="text-center space-y-2">
                    <p className="text-sm text-gray-600">
                      {planName === 'FitPass Trial' 
                        ? '🔒 Secure payment for 1-day trial access. No recurring charges.'
                        : '🔒 You won\'t be charged until after your 7-day free trial. Cancel anytime.'
                      }
                    </p>
                    <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Secure Payment
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Money Back Guarantee
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
