import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Cult.fit style */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-50 to-orange-50">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="mb-8 bounce-in">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-orange-500 shadow-2xl pulse-glow">
                <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 fade-in">
              A fitness movement that is
              <span className="block bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                worth breaking a sweat for
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto slide-in-from-bottom-2">
              Join the FitGym family and transform your fitness journey with our premium facilities, expert trainers, and AI-powered coaching.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center slide-in-from-bottom-2">
              <Link
                to="/subscriptions"
                className="btn-apple inline-flex items-center justify-center px-8 py-4 text-lg font-semibold transform hover:scale-105"
              >
                EXPLORE FITPASS
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                to="/signup"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-700 border-2 border-gray-300 rounded-full hover:border-red-500 hover:text-red-500 transition-all duration-300 transform hover:scale-105 hover-lift"
              >
                GET STARTED
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FitPass Section - Cult.fit style */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              FitPass
            </h2>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              One membership for all your fitness needs
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the perfect plan that fits your lifestyle and fitness goals
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: "FitPass Elite",
                description: "Unlimited access to group classes, all gyms and at-home workouts",
                features: [
                  "At-center group classes",
                  "All ELITE & PRO gyms", 
                  "At-home live workouts",
                  "Personal training sessions",
                  "Nutrition guidance"
                ],
                price: "₹6,999",
                popular: true,
                gradient: "from-red-500 to-orange-500"
              },
              {
                name: "FitPass Pro",
                description: "Unlimited access to all PRO gyms and at-home workouts",
                features: [
                  "All PRO gyms",
                  "2 Sessions/month at ELITE gyms",
                  "Group classes access",
                  "At-home live workouts",
                  "Basic nutrition support"
                ],
                price: "₹3,999",
                popular: false,
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                name: "FitPass Select",
                description: "Unlimited access to single center and at-home workouts",
                features: [
                  "One center that you choose",
                  "Limited sessions in other centers",
                  "At-home live workouts",
                  "Basic equipment access",
                  "Standard support"
                ],
                price: "₹1,999",
                popular: false,
                gradient: "from-green-500 to-emerald-500"
              },
              {
                name: "FitPass Basic",
                description: "Basic gym access with limited features",
                features: [
                  "Single center access",
                  "Basic equipment only",
                  "No group classes",
                  "No personal training",
                  "Email support"
                ],
                price: "₹999",
                popular: false,
                gradient: "from-purple-500 to-pink-500"
              },
              {
                name: "FitPass Trial",
                description: "1-day trial access to test our facilities",
                features: [
                  "Single day access",
                  "All equipment available",
                  "Basic support",
                  "Perfect for testing",
                  "No commitment"
                ],
                price: "₹5",
                popular: false,
                gradient: "from-yellow-500 to-orange-500"
              }
            ].map((plan, index) => (
              <div
                key={plan.name}
                className={`card-apple relative ${plan.popular ? 'ring-2 ring-red-500' : ''} hover-lift`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${plan.gradient} flex items-center justify-center`}>
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  
                  <div className="text-4xl font-bold text-gray-900 mb-6">
                    {plan.price}
                    <span className="text-lg font-normal text-gray-500">/month</span>
                  </div>
                  
                  <ul className="space-y-3 mb-8 text-left">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-700">
                        <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Link
                    to="/subscriptions"
                    className={`w-full btn-apple inline-flex items-center justify-center px-6 py-3 text-base font-semibold`}
                  >
                    Choose Plan
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose FitGym?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the difference with our state-of-the-art facilities and expert guidance
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: "💪",
                title: "Premium Equipment",
                description: "Access to the latest fitness equipment and technology"
              },
              {
                icon: "👨‍🏫",
                title: "Expert Trainers",
                description: "Certified personal trainers to guide your fitness journey"
              },
              {
                icon: "🤖",
                title: "AI Coaching",
                description: "Personalized AI-powered fitness recommendations"
              },
              {
                icon: "🏋️",
                title: "Group Classes",
                description: "High-energy group classes for all fitness levels"
              },
              {
                icon: "🥗",
                title: "Nutrition Support",
                description: "Expert nutrition guidance and meal planning"
              },
              {
                icon: "📱",
                title: "Mobile App",
                description: "Track your progress with our comprehensive mobile app"
              }
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="card-apple text-center hover-lift"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-500 to-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Ready to Start Your Fitness Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of members who have transformed their lives with FitGym
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold bg-white text-red-500 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Get Started Today
            </Link>
            <Link
              to="/subscriptions"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white rounded-full hover:bg-white hover:text-red-500 transition-all duration-300 transform hover:scale-105"
            >
              View Plans
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}


