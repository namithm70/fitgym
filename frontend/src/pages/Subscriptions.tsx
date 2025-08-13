import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Subscriptions() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  const plans = [
    {
      name: "FitPass Elite",
      description: "Unlimited access to group classes, all gyms and at-home workouts",
      monthlyPrice: 6999,
      yearlyPrice: 69999,
      features: [
        "At-center group classes",
        "All ELITE & PRO gyms", 
        "At-home live workouts",
        "Personal training sessions",
        "Nutrition guidance",
        "Recovery sessions",
        "Priority booking",
        "Exclusive events"
      ],
      popular: true,
      gradient: "from-red-500 to-orange-500",
      icon: "👑"
    },
    {
      name: "FitPass Pro",
      description: "Unlimited access to all PRO gyms and at-home workouts",
      monthlyPrice: 3999,
      yearlyPrice: 39999,
      features: [
        "All PRO gyms",
        "2 Sessions/month at ELITE gyms",
        "Group classes access",
        "At-home live workouts",
        "Basic nutrition support",
        "Equipment access",
        "Community support",
        "Mobile app access"
      ],
      popular: false,
      gradient: "from-blue-500 to-cyan-500",
      icon: "💪"
    },
    {
      name: "FitPass Select",
      description: "Unlimited access to single center and at-home workouts",
      monthlyPrice: 1999,
      yearlyPrice: 19999,
      features: [
        "One center that you choose",
        "Limited sessions in other centers",
        "At-home live workouts",
        "Basic equipment access",
        "Community support",
        "Basic app features",
        "Locker room access",
        "Free parking"
      ],
      popular: false,
      gradient: "from-green-500 to-emerald-500",
      icon: "🎯"
    },
    {
      name: "FitPass Play",
      description: "Unlimited access to sports and recreational activities",
      monthlyPrice: 2999,
      yearlyPrice: 29999,
      features: [
        "Badminton, swimming & other sports",
        "Guaranteed playing partner",
        "Guided sessions with experts",
        "Sports equipment access",
        "Tournament participation",
        "Sports coaching",
        "Facility booking",
        "Team events"
      ],
      popular: false,
      gradient: "from-purple-500 to-pink-500",
      icon: "🏸"
    },
    {
      name: "FitPass Trial",
      description: "1-day trial access to test our facilities",
      dailyPrice: 5,
      features: [
        "Single day access",
        "All equipment available",
        "Basic support",
        "Perfect for testing",
        "No commitment",
        "Full facility access",
        "Basic guidance",
        "Trial membership"
      ],
      popular: false,
      gradient: "from-yellow-500 to-orange-500",
      icon: "🎯"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            FitPass
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            One membership for all your fitness needs
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Choose the perfect plan that fits your lifestyle and fitness goals. All plans include a 7-day free trial.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                billingCycle === 'yearly' ? 'bg-red-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                  billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-500'}`}>
              Yearly
              <span className="ml-1 text-red-500 font-bold">Save 15%</span>
            </span>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`card-apple hover-lift group slide-in-from-bottom-2 relative ${plan.popular ? 'ring-2 ring-red-500' : ''}`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-red-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    MOST POPULAR
                  </span>
                </div>
              )}
              
              <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${plan.gradient} shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 rotate-in`}>
                <span className="text-2xl">{plan.icon}</span>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {plan.name}
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                {plan.description}
              </p>
              
              <div className="mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  ₹{plan.name === 'FitPass Trial' ? plan.dailyPrice : billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                </span>
                <span className="text-gray-600">/{plan.name === 'FitPass Trial' ? 'day' : billingCycle === 'monthly' ? 'month' : 'year'}</span>
                {billingCycle === 'yearly' && plan.name !== 'FitPass Trial' && (
                  <div className="text-sm text-green-600 font-medium mt-1">
                    Save ₹{(plan.monthlyPrice * 12) - plan.yearlyPrice}/year
                  </div>
                )}
              </div>
              
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-600">
                    <svg className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Link
                to={`/checkout?plan=${encodeURIComponent(plan.name)}&billing=${plan.name === 'FitPass Trial' ? 'daily' : billingCycle}`}
                className="btn-apple w-full justify-center"
              >
                {plan.name === 'FitPass Trial' ? 'PAY ₹5' : 'TRY FOR FREE'}
              </Link>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">
            Frequently Asked Questions
          </h3>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                question: "What's included in the free trial?",
                answer: "All FitPass plans include a 7-day free trial with full access to all features. No credit card required to start your trial."
              },
              {
                question: "Can I cancel anytime?",
                answer: "Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period."
              },
              {
                question: "Do you offer group discounts?",
                answer: "Yes! We offer special corporate and group rates for teams of 5 or more. Contact us for custom pricing."
              },
              {
                question: "What if I'm not satisfied?",
                answer: "We offer a 30-day money-back guarantee. If you're not completely satisfied, we'll refund your first month."
              },
              {
                question: "Can I upgrade or downgrade my plan?",
                answer: "Absolutely! You can change your plan at any time. Changes take effect at the start of your next billing cycle."
              },
              {
                question: "Is there a joining fee?",
                answer: "No joining fees! All our plans are transparent with no hidden costs. You only pay the advertised price."
              }
            ].map((faq, index) => (
              <div key={index} className="card-apple">
                <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                <p className="text-gray-600 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="card-apple rounded-3xl p-12 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to start your fitness journey?
            </h3>
            <p className="text-gray-600 mb-8">
              Join thousands of members who have transformed their lives with FitGym. Start your free trial today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="btn-apple inline-flex items-center justify-center px-8 py-4 text-lg font-semibold"
              >
                Start Free Trial
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                to="/chat"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-red-500 border-2 border-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                Chat with AI Coach
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
