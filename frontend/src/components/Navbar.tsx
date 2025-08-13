import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

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
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group" onClick={closeMobileMenu}>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-orange-500 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
              <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900 group-hover:text-red-500 transition-colors duration-300">
                FitGym
              </span>
              <span className="text-xs text-gray-500 -mt-1">
                FITNESS • SPORTS • STORE
              </span>
            </div>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-red-500 font-medium transition-colors duration-300 relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              to="/subscriptions"
              className="text-gray-700 hover:text-red-500 font-medium transition-colors duration-300 relative group"
            >
              Plans
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              to="/shop"
              className="text-gray-700 hover:text-red-500 font-medium transition-colors duration-300 relative group"
            >
              Shop
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              to="/chat"
              className="text-gray-700 hover:text-red-500 font-medium transition-colors duration-300 relative group"
            >
              AI Chat
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-red-500 to-orange-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Location - Desktop */}
            <div className="hidden lg:flex items-center space-x-2 text-gray-600">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm font-medium">BANGALORE</span>
            </div>

            {/* Auth Buttons - Desktop */}
            <div className="hidden md:flex items-center space-x-3">
              {auth.isAuthenticated ? (
                <>
                  {auth.role === 'admin' ? (
                    <Link
                      to="/admin"
                      className="btn-apple px-4 py-2 text-sm"
                    >
                      Admin Dashboard
                    </Link>
                  ) : (
                    <Link
                      to="/dashboard"
                      className="btn-apple px-4 py-2 text-sm"
                    >
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="text-gray-700 hover:text-red-500 font-medium transition-colors duration-300"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="btn-apple px-4 py-2 text-sm"
                  >
                    Sign Up
                  </Link>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-red-500 font-medium transition-colors duration-300"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors duration-300"
              aria-label="Toggle mobile menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-lg">
              {/* Location - Mobile */}
              <div className="flex items-center space-x-2 text-gray-600 px-3 py-2">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm font-medium">BANGALORE</span>
              </div>

              {/* Navigation Links - Mobile */}
              <Link
                to="/"
                onClick={closeMobileMenu}
                className="block px-3 py-2 text-gray-700 hover:text-red-500 hover:bg-gray-50 rounded-md font-medium transition-colors duration-300"
              >
                Home
              </Link>
              <Link
                to="/subscriptions"
                onClick={closeMobileMenu}
                className="block px-3 py-2 text-gray-700 hover:text-red-500 hover:bg-gray-50 rounded-md font-medium transition-colors duration-300"
              >
                Plans
              </Link>
              <Link
                to="/shop"
                onClick={closeMobileMenu}
                className="block px-3 py-2 text-gray-700 hover:text-red-500 hover:bg-gray-50 rounded-md font-medium transition-colors duration-300"
              >
                Shop
              </Link>
              <Link
                to="/chat"
                onClick={closeMobileMenu}
                className="block px-3 py-2 text-gray-700 hover:text-red-500 hover:bg-gray-50 rounded-md font-medium transition-colors duration-300"
              >
                AI Chat
              </Link>

              {/* Divider */}
              <div className="border-t border-gray-200 my-2"></div>

              {/* Auth Buttons - Mobile */}
              {auth.isAuthenticated ? (
                <div className="space-y-2">
                  {auth.role === 'admin' ? (
                    <Link
                      to="/admin"
                      onClick={closeMobileMenu}
                      className="block w-full text-center btn-apple px-4 py-2 text-sm"
                    >
                      Admin Dashboard
                    </Link>
                  ) : (
                    <Link
                      to="/dashboard"
                      onClick={closeMobileMenu}
                      className="block w-full text-center btn-apple px-4 py-2 text-sm"
                    >
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout()
                      closeMobileMenu()
                    }}
                    className="block w-full text-left px-3 py-2 text-gray-700 hover:text-red-500 hover:bg-gray-50 rounded-md font-medium transition-colors duration-300"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/signup"
                    onClick={closeMobileMenu}
                    className="block w-full text-center btn-apple px-4 py-2 text-sm"
                  >
                    Sign Up
                  </Link>
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    className="block w-full text-center px-3 py-2 text-gray-700 hover:text-red-500 hover:bg-gray-50 rounded-md font-medium transition-colors duration-300"
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}


