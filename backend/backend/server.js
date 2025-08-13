const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

// Initialize Razorpay only if keys are provided
let razorpay = null;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  const Razorpay = require('razorpay');
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
}

const app = express();
const PORT = process.env.PORT || 5000;

// Base URLs for frontend and backend
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'https://fitgym.vercel.app',
  'https://fitgymm.vercel.app',
  FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());

// In-memory user storage (replace with your database)
let users = [];

// Google OAuth endpoints
// 1) Start login: redirect user to Google consent screen
app.get('/auth/google', (req, res) => {
  try {
    const params = new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID,
      redirect_uri: `${BACKEND_URL}/auth/google/callback`,
      response_type: 'code',
      scope: 'openid email profile',
      access_type: 'offline',
      prompt: 'consent'
    });

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    return res.redirect(authUrl);
  } catch (err) {
    console.error('❌ Error building Google auth URL:', err);
    return res.status(500).json({ error: 'Failed to initiate Google OAuth' });
  }
});

// 2) OAuth callback handler (Google redirects here)
app.get('/auth/google/callback', async (req, res) => {
  try {
    const { code, error } = req.query;

    if (error) {
      const url = new URL(`${FRONTEND_URL}/auth/google/callback`);
      url.searchParams.set('error', String(error));
      return res.redirect(url.toString());
    }

    if (!code) {
      return res.status(400).send('Authorization code is required');
    }

    // Exchange authorization code for tokens
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${BACKEND_URL}/auth/google/callback`,
      grant_type: 'authorization_code'
    });

    const { access_token } = tokenResponse.data;

    // Get user info from Google
    const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    const googleUser = userInfoResponse.data;

    // Check/create user
    let user = users.find(u => u.email === googleUser.email);
    if (!user) {
      user = {
        id: Date.now().toString(),
        email: googleUser.email,
        name: googleUser.name,
        picture: googleUser.picture,
        googleId: googleUser.id,
        createdAt: new Date().toISOString(),
        isActive: true,
        role: 'user'
      };
      users.push(user);
    }

    // Issue a simple session token (replace with JWT in production)
    const sessionToken = `google_${Date.now()}_${user.id}`;

    // Redirect back to frontend with token and basic user info
    const redirectUrl = new URL(`${FRONTEND_URL}/auth/google/callback`);
    redirectUrl.searchParams.set('token', sessionToken);
    redirectUrl.searchParams.set('email', user.email);
    redirectUrl.searchParams.set('name', user.name);
    return res.redirect(redirectUrl.toString());
  } catch (error) {
    console.error('❌ Google OAuth (GET callback) error:', error.response?.data || error.message);
    const url = new URL(`${FRONTEND_URL}/auth/google/callback`);
    url.searchParams.set('error', 'Authentication failed');
    return res.redirect(url.toString());
  }
});

app.post('/auth/google/callback', async (req, res) => {
  try {
    const { code } = req.body;
    
    console.log('🔍 Google OAuth callback received:', { code: code ? 'Present' : 'Missing' });
    
    if (!code) {
      console.log('❌ No authorization code received');
      return res.status(400).json({ error: 'Authorization code is required' });
    }

    console.log('🔄 Exchanging authorization code for access token...');

    // Exchange authorization code for access token
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${FRONTEND_URL}/auth/google/callback`,
      grant_type: 'authorization_code'
    });

    console.log('✅ Access token received successfully');

    const { access_token } = tokenResponse.data;

    // Get user info from Google
    console.log('🔄 Getting user info from Google...');
    const userInfoResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    });

    const googleUser = userInfoResponse.data;
    console.log('✅ User info received:', { email: googleUser.email, name: googleUser.name });
    
    // Check if user exists in our system
    let user = users.find(u => u.email === googleUser.email);
    
    if (!user) {
      console.log('🆕 Creating new user...');
      // Create new user
      user = {
        id: Date.now().toString(),
        email: googleUser.email,
        name: googleUser.name,
        picture: googleUser.picture,
        googleId: googleUser.id,
        createdAt: new Date().toISOString(),
        isActive: true,
        role: 'user'
      };
      users.push(user);
    } else {
      console.log('👤 User already exists');
    }

    // Generate session token (in production, use JWT)
    const sessionToken = `google_${Date.now()}_${user.id}`;

    console.log('✅ Authentication successful, sending response');

    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        picture: user.picture,
        role: user.role
      },
      sessionToken
    });

  } catch (error) {
    console.error('❌ Google OAuth error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Authentication failed', details: error.message });
  }
});

app.post('/auth/google/verify', async (req, res) => {
  try {
    const { idToken } = req.body;
    
    if (!idToken) {
      return res.status(400).json({ error: 'ID token is required' });
    }

    // Verify the ID token with Google
    const verifyResponse = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`);
    const userInfo = verifyResponse.data;
    
    // Check if user exists in our system
    let user = users.find(u => u.email === userInfo.email);
    
    if (!user) {
      // Create new user
      user = {
        id: Date.now().toString(),
        email: userInfo.email,
        name: userInfo.name,
        picture: userInfo.picture,
        googleId: userInfo.sub,
        createdAt: new Date().toISOString(),
        isActive: true,
        role: 'user'
      };
      users.push(user);
    }

    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        picture: user.picture,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Google token verification error:', error);
    res.status(500).json({ error: 'Token verification failed' });
  }
});

// User management endpoints
app.get('/api/users/:email', (req, res) => {
  const { email } = req.params;
  const user = users.find(u => u.email === email);
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  res.json({ user });
});

app.post('/api/users', (req, res) => {
  const { email, name, password } = req.body;
  
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'User already exists' });
  }
  
  const newUser = {
    id: Date.now().toString(),
    email,
    name,
    password, // In production, hash this password
    createdAt: new Date().toISOString(),
    isActive: true,
    role: 'user'
  };
  
  users.push(newUser);
  res.json({ user: newUser });
});

// Razorpay payment endpoints (only if Razorpay is configured)
if (razorpay) {
  app.post('/create-order', async (req, res) => {
    try {
      const { amount, currency = 'INR', planName, billing, userId } = req.body;
      
      if (!amount || !planName) {
        return res.status(400).json({ error: 'Amount and plan name are required' });
      }

      // Create Razorpay order
      const options = {
        amount: amount * 100, // Razorpay expects amount in paise
        currency: currency,
        receipt: `order_${Date.now()}`,
        notes: {
          planName: planName,
          billing: billing,
          userId: userId || 'anonymous'
        }
      };

      const order = await razorpay.orders.create(options);

      res.json({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: process.env.RAZORPAY_KEY_ID
      });
    } catch (error) {
      console.error('Order creation error:', error);
      res.status(500).json({ error: 'Failed to create order' });
    }
  });

  app.post('/verify-payment', async (req, res) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
      
      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return res.status(400).json({ error: 'Payment verification parameters are required' });
      }

      // Verify the payment signature
      const text = `${razorpay_order_id}|${razorpay_payment_id}`;
      const crypto = require('crypto');
      const signature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(text)
        .digest('hex');

      if (signature === razorpay_signature) {
        // Payment is verified - you can update your database here
        res.json({ 
          success: true, 
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id
        });
      } else {
        res.status(400).json({ 
          success: false, 
          error: 'Invalid payment signature' 
        });
      }
    } catch (error) {
      console.error('Payment verification error:', error);
      res.status(500).json({ error: 'Failed to verify payment' });
    }
  });
} else {
  // Placeholder endpoints when Razorpay is not configured
  app.post('/create-order', (req, res) => {
    res.status(503).json({ error: 'Payment service not configured' });
  });

  app.post('/verify-payment', (req, res) => {
    res.status(503).json({ error: 'Payment service not configured' });
  });
}

// Chat endpoint
app.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log('Received message:', message);
    console.log('API Key present:', !!process.env.GROQ_API_KEY);

    if (!process.env.GROQ_API_KEY) {
      return res.status(503).json({ 
        error: 'AI service not configured',
        message: "I'm sorry, the AI chat service is not configured yet. Please try again later!"
      });
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          {
            role: 'system',
            content: `You are FitBot, an enthusiastic and knowledgeable AI fitness coach for a premium gym called FitGym. You are passionate about helping people achieve their fitness goals! You provide detailed, practical advice about workouts, nutrition, motivation, and fitness tips. Always be encouraging and supportive. Keep responses conversational and engaging.`
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 300,
        temperature: 0.7,
        top_p: 0.9,
        stream: false
      }),
    });

    console.log('Groq response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Groq API error:', response.status, errorText);
      throw new Error(`Groq API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Groq response data:', data);
    
    // Extract the generated text from the response
    let aiResponse = '';
    if (data && data.choices && data.choices[0] && data.choices[0].message) {
      aiResponse = data.choices[0].message.content;
    } else {
      aiResponse = "I'm sorry, I couldn't generate a response right now. Please try again!";
    }

    res.json({ 
      message: aiResponse,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ 
      error: 'Failed to get response from AI',
      message: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment!"
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    services: {
      googleOAuth: !!process.env.GOOGLE_CLIENT_SECRET,
      razorpay: !!razorpay,
      aiChat: !!process.env.GROQ_API_KEY
    }
  });
});

// Test endpoint
app.get('/test', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is working',
    googleClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
    port: PORT
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/health`);
  console.log(`🧪 Test endpoint: http://localhost:${PORT}/test`);
  console.log(`🔐 Google OAuth: ${process.env.GOOGLE_CLIENT_SECRET ? 'Configured' : 'Not configured'}`);
  console.log(`💳 Razorpay: ${razorpay ? 'Configured' : 'Not configured'}`);
  console.log(`🤖 AI Chat: ${process.env.GROQ_API_KEY ? 'Configured' : 'Not configured'}`);
});
