import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
      {/* Hero Section - Apple style */}
      <section className="relative overflow-hidden bg-gradient-to-br from-light-surface to-light-surface2 dark:from-dark-surface dark:to-dark-surface2">
        <div className="absolute inset-0 bg-gradient-to-r from-light-accent/5 to-light-accent2/5 dark:from-dark-accent/5 dark:to-dark-accent2/5"></div>
        <div className="relative container-apple pt-24 pb-16">
          <div className="text-center">
            <div className="mb-8 animate-bounce-subtle">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-light-accent to-light-accent2 dark:from-dark-accent dark:to-dark-accent2 shadow-apple-lg hover:shadow-apple-xl transition-all duration-300 hover:scale-105">
                <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-light-text dark:text-dark-text mb-6 animate-fade-in">
              A fitness movement that is
              <span className="block bg-gradient-to-r from-light-accent to-light-accent2 dark:from-dark-accent dark:to-dark-accent2 bg-clip-text text-transparent">
                worth breaking a sweat for
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-light-text2 dark:text-dark-text2 mb-8 max-w-3xl mx-auto animate-slide-up">
              Join the FitGym family and transform your fitness journey with our premium facilities, expert trainers, and AI-powered coaching.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Link
                to="/subscriptions"
                className="btn-apple-primary inline-flex items-center justify-center px-8 py-4 text-lg font-semibold hover:scale-105 transition-transform duration-200"
              >
                EXPLORE FITPASS
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                to="/signup"
                className="btn-apple-secondary inline-flex items-center justify-center px-8 py-4 text-lg font-semibold hover:scale-105 transition-transform duration-200"
              >
                GET STARTED
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FitPass Section - Apple style */}
      <section className="section-padding bg-light-surface dark:bg-dark-surface">
        <div className="container-apple">
          <div className="text-center mb-16">
            <h2 className="text-apple-title mb-4">
              FitPass
            </h2>
            <h3 className="text-apple-headline mb-4">
              One membership for all your fitness needs
            </h3>
            <p className="text-apple-body max-w-2xl mx-auto">
              Choose the perfect plan that fits your lifestyle and fitness goals
            </p>
          </div>
          
          <div className="responsive-grid">
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
                gradient: "from-light-accent to-light-accent2 dark:from-dark-accent dark:to-dark-accent2"
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
                description: "Perfect for beginners starting their fitness journey",
                features: [
                  "Single center access",
                  "Basic equipment",
                  "At-home workout videos",
                  "Community support",
                  "Email support"
                ],
                price: "₹999",
                popular: false,
                gradient: "from-purple-500 to-pink-500"
              }
            ].map((plan, index) => (
              <div
                key={plan.name}
                className={`card-apple-elevated p-6 hover-lift animate-scale-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {plan.popular && (
                  <div className="badge-apple-primary mb-4 w-fit">
                    Most Popular
                  </div>
                )}
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${plan.gradient} mb-4 flex items-center justify-center`}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-apple-headline mb-2">{plan.name}</h3>
                <p className="text-apple-caption mb-4">{plan.description}</p>
                <div className="text-3xl font-bold text-light-text dark:text-dark-text mb-6">
                  {plan.price}
                  <span className="text-apple-caption font-normal">/month</span>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-apple-body">
                      <svg className="w-5 h-5 text-light-success dark:text-dark-success mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/subscriptions"
                  className="btn-apple-primary w-full justify-center"
                >
                  Choose Plan
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Apple style */}
      <section className="section-padding bg-light-bg dark:bg-dark-bg">
        <div className="container-apple">
          <div className="text-center mb-16">
            <h2 className="text-apple-title mb-4">
              Why Choose FitGym?
            </h2>
            <p className="text-apple-body max-w-2xl mx-auto">
              Experience the future of fitness with cutting-edge technology and personalized coaching
            </p>
          </div>
          
          <div className="responsive-grid">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ),
                title: "AI-Powered Coaching",
                description: "Get personalized workout plans and real-time feedback from our advanced AI fitness coach"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ),
                title: "Premium Locations",
                description: "Access to the best gyms and fitness centers across Bangalore with state-of-the-art equipment"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                ),
                title: "Expert Trainers",
                description: "Work with certified fitness professionals who understand your goals and guide you to success"
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                title: "Progress Tracking",
                description: "Monitor your fitness journey with detailed analytics and progress reports"
              }
            ].map((feature, index) => (
              <div
                key={feature.title}
                className="card-apple p-6 text-center hover-lift animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-light-accent to-light-accent2 dark:from-dark-accent dark:to-dark-accent2 mx-auto mb-4 flex items-center justify-center text-white">
                  {feature.icon}
                </div>
                <h3 className="text-apple-headline mb-3">{feature.title}</h3>
                <p className="text-apple-body">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Apple style */}
      <section className="section-padding bg-gradient-to-br from-light-accent to-light-accent2 dark:from-dark-accent dark:to-dark-accent2">
        <div className="container-apple text-center">
          <h2 className="text-apple-title text-white mb-4">
            Ready to Transform Your Fitness?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of members who have already achieved their fitness goals with FitGym
          </p>
          <div className="responsive-flex justify-center">
            <Link
              to="/signup"
              className="btn-apple-primary bg-white text-light-accent hover:bg-white/90"
            >
              Start Your Journey
            </Link>
            <Link
              to="/subscriptions"
              className="btn-apple-secondary border-white text-white hover:bg-white/10"
            >
              View Plans
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}


