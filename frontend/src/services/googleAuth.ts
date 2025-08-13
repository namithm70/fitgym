import { apiUrl, googleRedirectUri } from '../config'

// Google OAuth Configuration
const GOOGLE_CLIENT_ID = '511929170399-qiat6ljlisq95vdvu7b2dqcatjtvfkhs.apps.googleusercontent.com'

declare global {
  interface Window {
    google: any
  }
}

export interface GoogleUser {
  id: string
  email: string
  name: string
  picture?: string
}

class GoogleAuthService {
  private isInitialized = false

  async initialize(): Promise<void> {
    if (this.isInitialized) return

    return new Promise((resolve, reject) => {
      // Load Google Identity Services script
      const script = document.createElement('script')
      script.src = 'https://accounts.google.com/gsi/client'
      script.async = true
      script.defer = true
      script.onload = () => {
        this.isInitialized = true
        resolve()
      }
      script.onerror = () => {
        reject(new Error('Failed to load Google Identity Services'))
      }
      document.head.appendChild(script)
    })
  }

  // Method to initiate Google OAuth flow with redirect
  async signIn(): Promise<void> {
    const params = new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: googleRedirectUri,
      response_type: 'code',
      scope: 'email profile',
      access_type: 'offline',
      prompt: 'consent'
    })

    // Redirect to Google OAuth
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
  }

  // Method to handle the callback and get user info
  async handleCallback(code: string): Promise<GoogleUser | null> {
    try {
      const response = await fetch(`${apiUrl}/auth/google/callback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })

      const data = await response.json()

      if (data.success) {
        return {
          id: data.user.id,
          email: data.user.email,
          name: data.user.name,
          picture: data.user.picture,
        }
      } else {
        throw new Error(data.error || 'Authentication failed')
      }
    } catch (error) {
      console.error('Google callback error:', error)
      return null
    }
  }

  // Alternative method using Google Sign-In button (for popup flow)
  async signInWithButton(): Promise<GoogleUser | null> {
    try {
      await this.initialize()

      return new Promise((resolve, reject) => {
        if (!window.google) {
          reject(new Error('Google Identity Services not loaded'))
          return
        }

        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: async (response: any) => {
            if (response.error) {
              reject(new Error(response.error))
              return
            }

            try {
              // Decode the JWT token to get user info
              const userInfo = this.decodeJwtResponse(response.credential)
              resolve(userInfo)
            } catch (error) {
              reject(error)
            }
          },
        })

        window.google.accounts.id.prompt()
      })
    } catch (error) {
      console.error('Google sign in error:', error)
      return null
    }
  }

  private decodeJwtResponse(token: string): GoogleUser {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))

    const data = JSON.parse(jsonPayload)
    return {
      id: data.sub,
      email: data.email,
      name: data.name,
      picture: data.picture,
    }
  }

  private async getUserInfo(accessToken: string): Promise<GoogleUser> {
    const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to get user info')
    }

    const data = await response.json()
    return {
      id: data.id,
      email: data.email,
      name: data.name,
      picture: data.picture,
    }
  }

  signOut(): void {
    if (window.google && window.google.accounts) {
      window.google.accounts.id.disableAutoSelect()
    }
    console.log('Google sign out completed')
  }
}

export const googleAuth = new GoogleAuthService()

// For development/testing purposes, you can use this mock implementation
export const mockGoogleAuth = {
  async signIn(): Promise<GoogleUser> {
    // Simulate Google sign in
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: 'mock-google-id',
          email: 'user@gmail.com',
          name: 'John Doe',
          picture: 'https://via.placeholder.com/150',
        })
      }, 1000)
    })
  },
  signOut(): void {
    console.log('Mock Google sign out')
  },
}
