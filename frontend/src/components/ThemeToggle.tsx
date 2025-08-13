import { useTheme } from '../contexts/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()

  return (
    <button
      onClick={toggle}
      className="relative inline-flex h-10 w-20 items-center rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-light-accent/20 dark:focus:ring-dark-accent/20"
      style={{
        backgroundColor: theme === 'dark' ? '#1c1c1e' : '#f2f2f7',
      }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {/* Toggle handle */}
      <div
        className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-lg transition-all duration-300 ease-in-out"
        style={{
          transform: theme === 'dark' ? 'translateX(2.5rem)' : 'translateX(0.25rem)',
        }}
      >
        {/* Sun icon for light mode */}
        {theme === 'light' && (
          <svg
            className="h-4 w-4 text-yellow-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </svg>
        )}
        
        {/* Moon icon for dark mode */}
        {theme === 'dark' && (
          <svg
            className="h-4 w-4 text-blue-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </div>
      
      {/* Background gradient overlay */}
      <div
        className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300"
        style={{
          background: theme === 'dark' 
            ? 'linear-gradient(135deg, #007aff 0%, #5856d6 100%)'
            : 'linear-gradient(135deg, #ff9500 0%, #ff2d92 100%)',
          opacity: theme === 'dark' ? 0.1 : 0.05,
        }}
      />
    </button>
  )
}
