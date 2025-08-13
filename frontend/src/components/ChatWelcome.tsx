interface ChatWelcomeProps {
  onSuggestionClick: (suggestion: string) => void
}

const suggestions = [
  {
    icon: "💪",
    title: "Workout Plans",
    description: "Get personalized training routines",
    query: "Create a workout plan for me"
  },
  {
    icon: "🥗",
    title: "Nutrition Guide", 
    description: "Diet plans and meal suggestions",
    query: "Suggest me a healthy diet plan"
  },
  {
    icon: "💊",
    title: "Supplements",
    description: "Recommendations for your goals",
    query: "What supplements should I take?"
  },
  {
    icon: "🎯",
    title: "Weight Loss",
    description: "Effective strategies to lose weight",
    query: "Help me lose weight effectively"
  },
  {
    icon: "🏋️",
    title: "Form Check",
    description: "Learn proper exercise techniques",
    query: "How do I perform squats correctly?"
  },
  {
    icon: "📈",
    title: "Progress Tracking",
    description: "Monitor your fitness journey",
    query: "How should I track my progress?"
  }
]

export default function ChatWelcome({ onSuggestionClick }: ChatWelcomeProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center p-8 text-center">
      {/* Welcome Message */}
      <div className="mb-8 bounce-in">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 shadow-lg pulse-glow">
          <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome to FitBot!</h2>
        <p className="mt-2 text-gray-600 dark:text-light">
          I'm your AI fitness coach. Ask me anything about workouts, nutrition, or training.
        </p>
      </div>

      {/* Suggestion Cards */}
      <div className="grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {suggestions.map((suggestion, index) => (
          <button
            key={suggestion.title}
            onClick={() => onSuggestionClick(suggestion.query)}
            className="group rounded-2xl border border-gray-200 bg-white p-4 text-left transition-all hover:border-blue-300 hover:shadow-md hover:scale-105 dark:border-gray-700 dark:bg-card dark:hover:border-blue-600 dark:hover:bg-card-hover slide-in-from-bottom-2"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="mb-3 text-2xl">{suggestion.icon}</div>
            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {suggestion.title}
            </h3>
            <p className="mt-1 text-sm text-gray-600 dark:text-light">
              {suggestion.description}
            </p>
          </button>
        ))}
      </div>

      {/* Features */}
      <div className="mt-8 text-sm text-gray-500 dark:text-muted">
        <div className="flex items-center justify-center gap-6">
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span>Real-time responses</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
            <span>Personalized advice</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-purple-500"></div>
            <span>24/7 availability</span>
          </div>
        </div>
      </div>
    </div>
  )
}
