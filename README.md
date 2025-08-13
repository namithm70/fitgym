# 🏋️ FitGym - AI-Powered Fitness Platform

A modern, responsive fitness website with AI-powered coaching, built with React, TypeScript, and Node.js.

## ✨ Features

- **🤖 AI Fitness Coach** - Powered by Groq AI for personalized workout and nutrition advice
- **💳 Subscription Management** - Multiple membership tiers (Elite, Pro, Select, Play)
- **🛍️ E-commerce Store** - 45+ fitness products with real pricing and discounts
- **👥 User Management** - User registration, admin dashboard, account activation
- **🌙 Dark Mode** - Beautiful dark/light theme toggle
- **📱 Responsive Design** - Works perfectly on all devices
- **🎨 Modern UI** - Cult.fit inspired design with smooth animations

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Context API** for state management

### Backend
- **Node.js** with Express
- **Groq AI** for intelligent responses
- **CORS** enabled for cross-origin requests
- **Environment variables** for secure configuration

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/fitgym.git
   cd fitgym
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../backend/backend
   npm install
   ```

4. **Set up environment variables**
   ```bash
   # In backend/backend/.env
   GROQ_API_KEY=your_groq_api_key_here
   PORT=5000
   ```

5. **Run the application**
   ```bash
   # Start backend (in backend/backend/)
   npm start
   
   # Start frontend (in frontend/)
   npm run dev
   ```

## 🌐 Usage

1. **Open your browser** and navigate to `http://localhost:5173`
2. **Explore the website** - Home, Subscriptions, Shop, Chat
3. **Test the AI chatbot** by asking fitness questions
4. **Try dark mode** using the toggle in the navbar

## 📁 Project Structure

```
fitgym/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React contexts
│   │   ├── hooks/          # Custom hooks
│   │   └── services/       # API services
│   ├── public/             # Static assets
│   └── package.json
├── backend/                 # Node.js backend
│   └── backend/
│       ├── server.js       # Express server
│       ├── .env           # Environment variables
│       └── package.json
└── README.md
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in `backend/backend/`:

```env
GROQ_API_KEY=your_groq_api_key_here
PORT=5000
```

### API Endpoints

- `POST /chat` - AI chat endpoint
- `GET /health` - Health check
- `GET /test` - Test endpoint

## 🎨 Features in Detail

### AI Chatbot
- **Real-time responses** using Groq AI
- **Fitness-focused** system prompt
- **Interactive UI** with typing indicators
- **Quick question buttons** for common queries
- **New chat and clear chat** functionality

### Subscription Plans
- **FitPass Elite** - Premium access to all facilities
- **FitPass Pro** - Access to PRO gyms
- **FitPass Select** - Single center access
- **FitPass Play** - Sports and recreational activities

### E-commerce Store
- **45+ products** across multiple categories
- **Real pricing** in INR with discounts
- **Search and filter** functionality
- **Product categories**: Protein, Supplements, Equipment, Clothing, Accessories

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Cult.fit** for design inspiration
- **Groq** for AI capabilities
- **Tailwind CSS** for beautiful styling
- **React** team for the amazing framework

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

**Made with ❤️ for fitness enthusiasts everywhere!**
