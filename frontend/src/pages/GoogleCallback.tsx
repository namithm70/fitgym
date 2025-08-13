import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { apiUrl } from '../config'

export default function GoogleCallback() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { login } = useAuth()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        const code = searchParams.get('code')
        const error = searchParams.get('error')

        if (error) {
          setError('Authentication failed. Please try again.')
          setIsLoading(false)
          return
        }

        if (!code) {
          setError('No authorization code received.')
          setIsLoading(false)
          return
        }

        // Send the authorization code to your backend
        const response = await fetch(`${apiUrl}/auth/google/callback`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ code }),
        })

        const data = await response.json()

        if (data.success) {
          // Store the session token
          localStorage.setItem('sessionToken', data.sessionToken)
          
          // Login the user
          login('user', data.user.email)
          
          // Redirect to dashboard
          navigate('/dashboard', { replace: true })
        } else {
          setError(data.error || 'Authentication failed')
        }
      } catch (err) {
        console.error('Google callback error:', err)
        setError('Authentication failed. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    handleGoogleCallback()
  }, [searchParams, navigate, login])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Completing Sign In</h2>
          <p className="text-gray-600">Please wait while we complete your Google sign in...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-200 text-center max-w-md">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <svg className="h-8 w-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Authentication Failed</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/login')}
            className="w-full btn-apple py-3 text-lg font-semibold"
          >
            Back to Sign In
          </button>
        </div>
      </div>
    )
  }

  return null
}
