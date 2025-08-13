// Configuration for different environments
const config = {
  development: {
    apiUrl: 'http://localhost:5000',
    googleRedirectUri: 'http://localhost:5173/auth/google/callback'
  },
  production: {
    apiUrl: 'https://your-backend-url.com', // Replace with your actual backend URL
    googleRedirectUri: 'https://fitgymm.vercel.app/auth/google/callback'
  }
}

const environment = import.meta.env.MODE || 'development'
export const apiUrl = config[environment as keyof typeof config].apiUrl
export const googleRedirectUri = config[environment as keyof typeof config].googleRedirectUri
