import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const { auth, logout } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 dark:border-white/5">
      <div className="container-apple">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group" onClick={closeMobileMenu}>
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-light-accent to-light-accent2 dark:from-dark-accent dark:to-dark-accent2 shadow-apple group-hover:shadow-apple-md transition-all duration-300 group-hover:scale-105">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-light-text dark:text-dark-text group-hover:text-light-accent dark:group-hover:text-dark-accent transition-colors duration-300">
                FitGym
              </span>
              <span className="text-xs text-light-text3 dark:text-dark-text3 -mt-1">
                FITNESS • SPORTS • STORE
              </span>
            </div>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className="nav-link rounded-xl px-4 py-2 hover:bg-light-surface2 dark:hover:bg-dark-surface2"
            >
              Home
            </Link>
            <Link
              to="/subscriptions"
              className="nav-link rounded-xl px-4 py-2 hover:bg-light-surface2 dark:hover:bg-dark-surface2"
            >
              Plans
            </Link>
            <Link
              to="/shop"
              className="nav-link rounded-xl px-4 py-2 hover:bg-light-surface2 dark:hover:bg-dark-surface2"
            >
              Shop
            </Link>
            <Link
              to="/chat"
              className="nav-link rounded-xl px-4 py-2 hover:bg-light-surface2 dark:hover:bg-dark-surface2"
            >
              AI Chat
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Location - Desktop */}
            <div className="hidden lg:flex items-center space-x-2 text-light-text3 dark:text-dark-text3">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm font-medium">BANGALORE</span>
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Auth Buttons - Desktop */}
            <div className="hidden md:flex items-center space-x-3">
              {auth.isAuthenticated ? (
                <>
                  {auth.role === 'admin' ? (
                    <Link
                      to="/admin"
                      className="btn-apple-primary"
                    >
                      Admin Dashboard
                    </Link>
                  ) : (
                    <Link
                      to="/dashboard"
                      className="btn-apple-primary"
                    >
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="btn-apple-secondary"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="btn-apple-secondary"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="btn-apple-primary"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-xl text-light-text3 dark:text-dark-text3 hover:bg-light-surface2 dark:hover:bg-dark-surface2 transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden animate-slide-down">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-light-surface/80 dark:bg-dark-surface/80 backdrop-blur-xl rounded-2xl mt-2 border border-light-surface3 dark:border-dark-surface3">
              <Link
                to="/"
                className="nav-link block px-3 py-2 rounded-xl hover:bg-light-surface2 dark:hover:bg-dark-surface2"
                onClick={closeMobileMenu}
              >
                Home
              </Link>
              <Link
                to="/subscriptions"
                className="nav-link block px-3 py-2 rounded-xl hover:bg-light-surface2 dark:hover:bg-dark-surface2"
                onClick={closeMobileMenu}
              >
                Plans
              </Link>
              <Link
                to="/shop"
                className="nav-link block px-3 py-2 rounded-xl hover:bg-light-surface2 dark:hover:bg-dark-surface2"
                onClick={closeMobileMenu}
              >
                Shop
              </Link>
              <Link
                to="/chat"
                className="nav-link block px-3 py-2 rounded-xl hover:bg-light-surface2 dark:hover:bg-dark-surface2"
                onClick={closeMobileMenu}
              >
                AI Chat
              </Link>
              
              <div className="divider-apple my-2" />
              
              {auth.isAuthenticated ? (
                <>
                  {auth.role === 'admin' ? (
                    <Link
                      to="/admin"
                      className="btn-apple-primary w-full justify-center"
                      onClick={closeMobileMenu}
                    >
                      Admin Dashboard
                    </Link>
                  ) : (
                    <Link
                      to="/dashboard"
                      className="btn-apple-primary w-full justify-center"
                      onClick={closeMobileMenu}
                    >
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout()
                      closeMobileMenu()
                    }}
                    className="btn-apple-secondary w-full justify-center"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="btn-apple-secondary w-full justify-center"
                    onClick={closeMobileMenu}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="btn-apple-primary w-full justify-center"
                    onClick={closeMobileMenu}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}


