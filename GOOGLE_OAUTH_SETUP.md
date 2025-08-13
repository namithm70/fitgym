# Google OAuth Setup Guide for FitGym

This guide will help you set up Google OAuth authentication for your FitGym website.

## Prerequisites

1. Google Cloud Console account
2. Your Google Client ID: `511929170399-qiat6ljlisq95vdvu7b2dqcatjtvfkhs.apps.googleusercontent.com`
3. Your callback URL: `https://fitgymm.vercel.app/auth/google/callback`

## Backend Setup

### 1. Install Dependencies

Make sure you have axios installed in your backend:

```bash
cd fitgym/backend/backend
npm install axios
```

### 2. Environment Variables

Create a `.env` file in `fitgym/backend/backend/` with the following variables:

```env
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
RAZORPAY_KEY_ID=your_razorpay_key_id_here
RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here
GROQ_API_KEY=your_groq_api_key_here
PORT=5000
```

**Important**: You need to get your Google Client Secret from the Google Cloud Console.

### 3. Start the Backend Server

```bash
cd fitgym/backend/backend
npm start
```

The server will run on `http://localhost:5000`

## Frontend Setup

### 1. Configuration

The frontend is already configured to use:
- Development: `http://localhost:5173/auth/google/callback`
- Production: `https://fitgymm.vercel.app/auth/google/callback`

### 2. Start the Frontend

```bash
cd fitgym/frontend
npm run dev
```

The frontend will run on `http://localhost:5173`

## Google Cloud Console Setup

### 1. Configure OAuth Consent Screen

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to "APIs & Services" > "OAuth consent screen"
4. Configure the consent screen with your app details

### 2. Configure OAuth Credentials

1. Go to "APIs & Services" > "Credentials"
2. Find your OAuth 2.0 Client ID
3. Add the following authorized redirect URIs:
   - `http://localhost:5173/auth/google/callback` (for development)
   - `https://fitgymm.vercel.app/auth/google/callback` (for production)

### 3. Get Your Client Secret

1. In the same credentials page, click on your OAuth 2.0 Client ID
2. Copy the Client Secret
3. Add it to your backend `.env` file

## How It Works

1. User clicks "Continue with Google" on signup/login page
2. User is redirected to Google OAuth consent screen
3. After consent, Google redirects back to your callback URL with an authorization code
4. Your backend exchanges the code for an access token
5. Backend gets user info from Google and creates/updates user in your system
6. User is logged in and redirected to dashboard

## Testing

1. Start both backend and frontend servers
2. Go to `http://localhost:5173/signup` or `http://localhost:5173/login`
3. Click "Continue with Google"
4. Complete the Google OAuth flow
5. You should be redirected to the dashboard

## Production Deployment

1. Update the `config.ts` file with your production backend URL
2. Make sure your Google OAuth credentials include the production callback URL
3. Deploy both frontend and backend
4. Test the OAuth flow in production

## Troubleshooting

### Common Issues

1. **"redirect_uri_mismatch"**: Make sure the redirect URI in Google Console matches exactly
2. **"invalid_client"**: Check that your client ID and secret are correct
3. **CORS errors**: Ensure your backend CORS settings allow your frontend domain
4. **"access_denied"**: User may have cancelled the OAuth flow

### Debug Steps

1. Check browser console for errors
2. Check backend server logs
3. Verify environment variables are set correctly
4. Test with different browsers/devices

## Security Notes

1. Never expose your Google Client Secret in frontend code
2. Always use HTTPS in production
3. Implement proper session management
4. Consider implementing CSRF protection
5. Store user data securely in a database (not in memory)

## Next Steps

1. Replace in-memory user storage with a proper database
2. Implement JWT tokens for session management
3. Add user profile management
4. Implement proper error handling and user feedback
5. Add logout functionality
