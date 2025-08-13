export default function Chat() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 fade-in">
            Chat with FitBot
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto slide-in-from-bottom-2">
            Your AI fitness coach is here to help you with workout plans, nutrition advice, and fitness tips!
          </p>
        </div>
        
        {/* Chat Container */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
          <div className="h-[700px] md:h-[800px]">
            <iframe
              src="https://www.chatbase.co/chatbot-iframe/1msim0gDlB570sJRUdRlz"
              width="100%"
              height="100%"
              style={{ border: 'none' }}
              title="FitBot AI Chat"
            />
          </div>
        </div>
        
        {/* Features */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-200 slide-in-from-bottom-2">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Personalized Plans</h3>
            <p className="text-gray-600 text-sm">Get customized workout and nutrition plans tailored to your goals</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-200 slide-in-from-bottom-2" style={{ animationDelay: '100ms' }}>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">24/7 Support</h3>
            <p className="text-gray-600 text-sm">Get instant answers to your fitness questions anytime, anywhere</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-200 slide-in-from-bottom-2" style={{ animationDelay: '200ms' }}>
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Guidance</h3>
            <p className="text-gray-600 text-sm">Access professional fitness knowledge and motivation tips</p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Our AI Coach?</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-blue-600 font-bold">💪</span>
                </div>
                <p className="text-sm text-gray-600">Workout Plans</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-green-600 font-bold">🥗</span>
                </div>
                <p className="text-sm text-gray-600">Nutrition Advice</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-purple-600 font-bold">🎯</span>
                </div>
                <p className="text-sm text-gray-600">Goal Setting</p>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-orange-600 font-bold">📊</span>
                </div>
                <p className="text-sm text-gray-600">Progress Tracking</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
