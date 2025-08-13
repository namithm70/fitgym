// AI Service that supports multiple free AI providers
export type AIProvider = 'huggingface' | 'groq' | 'together' | 'mock'

export interface AIConfig {
  provider: AIProvider
  apiKey?: string
  model?: string
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

class AIService {
  private config: AIConfig = {
    provider: 'mock', // Default to mock for demo
    model: 'microsoft/DialoGPT-medium'
  }

  private systemPrompt = `You are FitBot, an enthusiastic and knowledgeable AI fitness coach for a premium gym. You are passionate about helping people achieve their fitness goals!

PERSONALITY:
- Be enthusiastic, encouraging, and motivational
- Use emojis and exclamation marks to show energy
- Be conversational and friendly, not robotic
- Show genuine excitement about fitness and helping others
- Use fitness slang and terminology naturally

EXPERTISE AREAS:
🏋️ WORKOUTS: Create detailed training plans, explain exercises, suggest modifications
🥗 NUTRITION: Meal planning, macro guidance, recipes, supplement advice
💪 GOALS: Weight loss, muscle building, strength, endurance, flexibility
🎯 MOTIVATION: Encouragement, goal setting, progress tracking
⚡ RECOVERY: Rest, sleep, injury prevention, mobility work

RESPONSE STYLE:
- Be detailed and specific (3-6 sentences minimum)
- Include actionable advice and next steps
- Ask follow-up questions to engage the user
- Use bullet points or numbered lists for clarity
- Always end with encouragement or a question

If someone asks for a workout plan, give them a COMPLETE, DETAILED plan with exercises, sets, reps, and rest periods. Don't give generic responses!`

  configure(config: AIConfig) {
    this.config = { ...this.config, ...config }
  }

  async chat(messages: ChatMessage[]): Promise<string> {
    const fullMessages = [
      { role: 'system' as const, content: this.systemPrompt },
      ...messages
    ]

    try {
      switch (this.config.provider) {
        case 'huggingface':
          return await this.chatWithHuggingFace(fullMessages)
        case 'groq':
          return await this.chatWithGroq(fullMessages)
        case 'together':
          return await this.chatWithTogether(fullMessages)
        default:
          return this.mockChat(messages)
      }
    } catch (error) {
      console.error('AI Chat Error:', error)
      return this.mockChat(messages) // Always fall back to mock for better responses
    }
  }

  private async chatWithHuggingFace(messages: ChatMessage[]): Promise<string> {
    if (!this.config.apiKey) {
      return this.mockChat(messages)
    }

    // Get the last user message for conversation
    const lastUserMessage = messages.filter(m => m.role === 'user').pop()?.content || ''
    
    // Try different models based on availability
    const models = [
      'microsoft/DialoGPT-medium',
      'facebook/blenderbot-400M-distill',
      'microsoft/DialoGPT-small'
    ]

    for (const model of models) {
      try {
        const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.config.apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inputs: lastUserMessage,
            parameters: {
              max_new_tokens: 200, // Increased for longer responses
              temperature: 0.8, // More creative
              do_sample: true,
              top_p: 0.9,
              repetition_penalty: 1.2
            },
            options: {
              wait_for_model: true
            }
          })
        })

        if (response.ok) {
          const data = await response.json()
          
          // Handle different response formats
          let aiResponse = ''
          if (Array.isArray(data) && data[0]?.generated_text) {
            aiResponse = data[0].generated_text
          } else if (data.generated_text) {
            aiResponse = data.generated_text
          } else if (typeof data === 'string') {
            aiResponse = data
          }

          // Clean up the response
          if (aiResponse) {
            // Remove the input text if it's echoed back
            aiResponse = aiResponse.replace(lastUserMessage, '').trim()
            
            // Check if response is meaningful
            if (aiResponse.length > 30 && this.isFitnessRelated(aiResponse)) {
              return aiResponse
            }
          }
        }
      } catch (error) {
        console.warn(`Model ${model} failed:`, error)
        continue
      }
    }

    // If all models fail or give poor responses, use mock
    return this.mockChat(messages)
  }

  private isFitnessRelated(text: string): boolean {
    const fitnessKeywords = [
      'workout', 'exercise', 'fitness', 'gym', 'training', 'muscle', 'strength',
      'cardio', 'nutrition', 'diet', 'protein', 'weight', 'health', 'calories',
      'squat', 'deadlift', 'bench', 'press', 'pull', 'push', 'legs', 'arms',
      'chest', 'back', 'shoulders', 'abs', 'core', 'reps', 'sets', 'rest'
    ]
    const lowerText = text.toLowerCase()
    return fitnessKeywords.some(keyword => lowerText.includes(keyword))
  }

  private async chatWithGroq(messages: ChatMessage[]): Promise<string> {
    if (!this.config.apiKey) {
      return this.mockChat(messages)
    }

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.config.model || 'llama3-8b-8192',
          messages: messages,
          max_tokens: 300,
          temperature: 0.8,
          stream: false
        })
      })

      if (response.ok) {
        const data = await response.json()
        const content = data.choices?.[0]?.message?.content
        if (content && content.length > 50) {
          return content
        }
      }
    } catch (error) {
      console.warn('Groq API failed:', error)
    }

    return this.mockChat(messages)
  }

  private async chatWithTogether(messages: ChatMessage[]): Promise<string> {
    if (!this.config.apiKey) {
      return this.mockChat(messages)
    }

    try {
      const response = await fetch('https://api.together.xyz/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.config.model || 'meta-llama/Llama-2-7b-chat-hf',
          messages: messages,
          max_tokens: 300,
          temperature: 0.8,
          stream: false
        })
      })

      if (response.ok) {
        const data = await response.json()
        const content = data.choices?.[0]?.message?.content
        if (content && content.length > 50) {
          return content
        }
      }
    } catch (error) {
      console.warn('Together AI failed:', error)
    }

    return this.mockChat(messages)
  }

  private mockChat(messages: ChatMessage[]): string {
    const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || ''
    
    // Enhanced responses with more personality and detail
    const responses = {
      workout: [
        "🔥 Here's a killer workout plan for you! **Push Day**: Bench Press 4x8, Overhead Press 3x10, Incline Dumbbell Press 3x12, Dips 3x15, Lateral Raises 3x15. **Pull Day**: Deadlifts 4x6, Barbell Rows 4x8, Pull-ups 3x8, Lat Pulldowns 3x12, Bicep Curls 3x15. **Legs Day**: Squats 4x8, Romanian Deadlifts 3x10, Leg Press 3x12, Lunges 3x15 each leg, Calf Raises 4x20. Rest 2-3 minutes between compound movements, 1-2 minutes for isolation. Start with weights you can handle with perfect form! 💪 What's your current fitness level?",
        
        "💪 Let's build some serious strength! **Full Body Split (3x/week)**: Day 1: Squats 5x5, Bench Press 5x5, Bent-Over Rows 3x8, Planks 3x60s. Day 2: Deadlifts 5x5, Overhead Press 5x5, Pull-ups 3x8, Russian Twists 3x20. Day 3: Front Squats 4x8, Incline Press 4x8, T-Bar Rows 4x8, Side Planks 3x45s each. Focus on progressive overload - add weight when you hit all reps with good form! 🎯 What's your main goal - strength or muscle building?",
        
        "⚡ HIIT Cardio + Strength Combo! **Circuit Training**: 30 seconds each exercise, 15 seconds rest between, 3 rounds: Burpees, Mountain Climbers, Jump Squats, Push-ups, Plank Jacks, High Knees. Then hit the weights: Deadlifts 4x6, Squats 4x8, Bench Press 4x8, Rows 4x8. This burns fat while building muscle! 🔥 How many days can you commit to training?"
      ],
      
      diet: [
        "🥗 Here's your complete nutrition plan! **Breakfast**: 1 cup oatmeal + 1 scoop protein powder + 1/2 cup berries + 1 tbsp almond butter. **Snack**: Greek yogurt + 1/4 cup nuts. **Lunch**: 6oz grilled chicken + 1 cup quinoa + 2 cups mixed vegetables + 1 tbsp olive oil. **Pre-workout**: Banana + 1 tbsp peanut butter. **Post-workout**: Protein shake + 1 cup fruit. **Dinner**: 6oz salmon + 1 medium sweet potato + 2 cups broccoli. **Daily**: 2-3L water, 0.8-1g protein per lb bodyweight. 🎯 What's your current weight and activity level?",
        
        "🍽️ **Muscle Building Diet Plan**: **Meal 1**: 3 eggs + 2 slices whole grain toast + 1 cup spinach. **Meal 2**: Protein shake + 1 cup mixed berries. **Meal 3**: 8oz lean beef + 1 cup brown rice + 2 cups vegetables. **Meal 4**: 1 cup cottage cheese + 1/4 cup almonds. **Meal 5**: 6oz chicken + 1 medium sweet potato + 1 cup green beans. **Meal 6**: Casein protein + 1 tbsp peanut butter. **Macros**: 40% protein, 40% carbs, 20% fats. Eat every 3-4 hours! 💪 Are you trying to gain muscle or lose fat?",
        
        "🔥 **Fat Loss Meal Plan**: **Breakfast**: 3 egg whites + 1 whole egg + 1/2 cup oats + 1/2 cup berries. **Snack**: 1 cup Greek yogurt + 10 almonds. **Lunch**: 5oz turkey + 1 cup quinoa + unlimited vegetables. **Snack**: Protein shake + 1 apple. **Dinner**: 6oz fish + 1 cup cauliflower rice + 2 cups vegetables. **Daily**: 2-3L water, create 300-500 calorie deficit. High protein keeps you full! 🎯 What's your target weight loss goal?"
      ],
      
      supplement: [
        "💊 **Essential Supplements Stack**: **Whey Protein**: 1-2 scoops post-workout for muscle recovery. **Creatine Monohydrate**: 5g daily (loading phase: 20g for 5 days, then 5g maintenance). **Multivitamin**: Daily for overall health. **Omega-3**: 1-2g daily for joint health and recovery. **Vitamin D3**: 2000-4000 IU daily if you don't get much sun. **Pre-workout**: Caffeine 200-400mg, Beta-Alanine 3-5g, Citrulline Malate 6-8g. Start with protein and creatine, add others gradually! 🏋️ What's your current supplement routine?",
        
        "⚡ **Pre-Workout Formula**: Mix 200mg caffeine + 5g creatine + 6g citrulline malate + 3g beta-alanine + 2g taurine. Take 30 minutes before training. **Post-Workout**: 30g whey protein + 30g fast carbs (dextrose or banana) within 30 minutes. **Daily**: Multivitamin, fish oil, vitamin D. **Before Bed**: Casein protein or cottage cheese for slow-release protein. Quality over quantity - invest in third-party tested brands! 💪 What's your training schedule like?"
      ],
      
      weight: [
        "🏋️ **Progressive Overload Strategy**: Week 1: Start with 70% of your 1RM. Week 2: Add 5-10 lbs to compound movements. Week 3: Increase reps by 1-2. Week 4: Add another 5-10 lbs. **Example**: If you bench 135x8, next week try 145x8, then 145x10, then 155x8. Track everything in a workout log! **Key Movements**: Deadlifts, Squats, Bench Press, Overhead Press, Rows. Focus on form first, then add weight! 💪 What's your current strength level?",
        
        "💪 **Strength Building Program**: **Week 1-4**: 5x5 on main lifts, 3x8 on accessories. **Week 5-8**: 3x5 on main lifts, 4x8 on accessories. **Week 9-12**: 5x3 on main lifts, 3x10 on accessories. **Rest Periods**: 3-5 minutes for compounds, 1-2 minutes for isolation. **Progressive Overload**: Add 5-10 lbs when you complete all sets with perfect form. Consistency is key! 🔥 What's your weakest lift?"
      ],
      
      motivation: [
        "🔥 **Motivation Boosters**: Set SMART goals - Specific, Measurable, Achievable, Relevant, Time-bound. Track your progress with photos, measurements, and strength gains. Find a workout buddy for accountability. Join our group classes for community support. Celebrate small wins - every workout completed is a victory! Remember why you started. Some days will be hard, but showing up is 80% of success. 💪 What's your biggest motivation for getting fit?",
        
        "🎯 **Goal Setting Strategy**: Write down your 3-month, 6-month, and 1-year goals. Break them into weekly targets. Create a vision board with your ideal physique. Track your workouts and celebrate progress. Find a role model who inspires you. Join our fitness challenges for extra motivation. Remember: consistency beats perfection every time! 🔥 What's your ultimate fitness goal?"
      ],
      
      membership: [
        "💎 **Premium Membership Benefits**: **Basic ($29/month)**: Full gym access, basic equipment, locker rooms. **Premium ($59/month)**: Everything in Basic + group classes, nutrition guidance, trainer consultations, mobile app access. **Elite ($99/month)**: Everything in Premium + unlimited personal training, custom meal plans, priority booking, exclusive events. All plans include 7-day free trial! 🎯 What's your budget and fitness goals?",
        
        "🏋️ **Elite Membership Perks**: Unlimited 1-on-1 personal training sessions, custom meal plans designed by our nutritionists, priority booking for all classes, exclusive member events, advanced fitness assessments, recovery sessions, and 24/7 gym access. Perfect for serious athletes and those with specific goals! 💪 Are you looking for personal training or group classes?"
      ],
      
      nutrition: [
        "🍎 **Complete Nutrition Guide**: **Protein**: 0.8-1g per lb bodyweight (more if building muscle). **Carbs**: 1-2g per lb (higher on training days). **Fats**: 0.3-0.5g per lb. **Meal Timing**: Eat every 3-4 hours, protein with every meal. **Pre-workout**: Carbs + protein 1-2 hours before. **Post-workout**: Protein + carbs within 30 minutes. **Hydration**: 8-10 glasses water daily, more if training hard. 🎯 What's your current eating schedule like?",
        
        "🥗 **Meal Prep Master Plan**: **Sunday Prep**: Cook 2lbs chicken breast, 2 cups quinoa, 2 cups brown rice, roast 4 cups vegetables. **Storage**: Portion into containers, refrigerate for 5 days. **Quick Meals**: Overnight oats, protein smoothies, Greek yogurt bowls. **Snacks**: Hard-boiled eggs, nuts, protein bars, fruit. **Hydration**: Carry a water bottle, add lemon/cucumber for flavor. Consistency in nutrition = faster results! 💪 How much time can you dedicate to meal prep?"
      ],
      
      detailed: [
        "🔥 **COMPLETE WORKOUT PLAN** 🏋️\n\n**Monday - Push Day**:\n• Bench Press: 4 sets x 8 reps (rest 3 min)\n• Overhead Press: 3 sets x 10 reps (rest 2 min)\n• Incline Dumbbell Press: 3 sets x 12 reps (rest 2 min)\n• Dips: 3 sets x 15 reps (rest 1 min)\n• Lateral Raises: 3 sets x 15 reps (rest 1 min)\n• Tricep Extensions: 3 sets x 15 reps (rest 1 min)\n\n**Tuesday - Pull Day**:\n• Deadlifts: 4 sets x 6 reps (rest 4 min)\n• Barbell Rows: 4 sets x 8 reps (rest 2 min)\n• Pull-ups: 3 sets x 8 reps (rest 2 min)\n• Lat Pulldowns: 3 sets x 12 reps (rest 1 min)\n• Bicep Curls: 3 sets x 15 reps (rest 1 min)\n• Face Pulls: 3 sets x 15 reps (rest 1 min)\n\n**Wednesday - Rest/Cardio**:\n• 30 min light cardio or stretching\n\n**Thursday - Legs Day**:\n• Squats: 4 sets x 8 reps (rest 3 min)\n• Romanian Deadlifts: 3 sets x 10 reps (rest 2 min)\n• Leg Press: 3 sets x 12 reps (rest 2 min)\n• Walking Lunges: 3 sets x 15 each leg (rest 1 min)\n• Calf Raises: 4 sets x 20 reps (rest 1 min)\n• Planks: 3 sets x 60 seconds (rest 1 min)\n\n**Friday - Rest/Cardio**:\n• 30 min light cardio or stretching\n\n**Saturday - Full Body**:\n• Deadlifts: 3 sets x 6 reps\n• Bench Press: 3 sets x 8 reps\n• Pull-ups: 3 sets x 8 reps\n• Overhead Press: 3 sets x 10 reps\n• Squats: 3 sets x 10 reps\n\n**Sunday - Complete Rest**\n\n💪 **Progressive Overload**: Add 5-10 lbs when you complete all sets with perfect form!\n🎯 What's your current strength level?",
        
        "🥗 **DETAILED NUTRITION PLAN** 📊\n\n**Daily Macros**:\n• Protein: 0.8-1g per lb bodyweight\n• Carbs: 1-2g per lb (higher on training days)\n• Fats: 0.3-0.5g per lb\n• Calories: Calculate your TDEE and adjust based on goals\n\n**Meal Plan**:\n\n**Breakfast (7 AM)**:\n• 1 cup oatmeal + 1 scoop protein powder\n• 1/2 cup mixed berries\n• 1 tbsp almond butter\n• 1 cup coffee\n\n**Snack (10 AM)**:\n• 1 cup Greek yogurt\n• 1/4 cup mixed nuts\n• 1 medium apple\n\n**Lunch (1 PM)**:\n• 6oz grilled chicken breast\n• 1 cup quinoa or brown rice\n• 2 cups mixed vegetables\n• 1 tbsp olive oil\n• Herbs and spices for flavor\n\n**Pre-Workout (4 PM)**:\n• 1 medium banana\n• 1 tbsp peanut butter\n• 1 cup green tea\n\n**Post-Workout (6 PM)**:\n• 1 scoop whey protein\n• 1 cup mixed berries\n• 1 cup almond milk\n• 1 tbsp honey\n\n**Dinner (8 PM)**:\n• 6oz salmon or lean beef\n• 1 medium sweet potato\n• 2 cups broccoli or asparagus\n• 1 tbsp olive oil\n• Herbs and spices\n\n**Before Bed (10 PM)**:\n• 1 cup cottage cheese\n• 1 tbsp almond butter\n• Optional: casein protein shake\n\n**Hydration**:\n• 8-10 glasses of water daily\n• More if training hard\n• Add lemon or cucumber for flavor\n\n💪 **Tips**:\n• Meal prep on Sundays\n• Eat every 3-4 hours\n• Protein with every meal\n• Stay consistent!\n\n🎯 What's your current weight and activity level?"
      ]
    }

    // Enhanced keyword detection
    let category = 'general'
    
    // Check for detailed requests
    if (lastMessage.includes('detailed') || lastMessage.includes('complete') || lastMessage.includes('full')) {
      category = 'detailed'
    } else if (lastMessage.includes('workout') || lastMessage.includes('exercise') || lastMessage.includes('training') || lastMessage.includes('routine')) {
      category = 'workout'
    } else if (lastMessage.includes('diet') || lastMessage.includes('nutrition') || lastMessage.includes('meal') || lastMessage.includes('food') || lastMessage.includes('eat')) {
      category = 'diet'
    } else if (lastMessage.includes('supplement') || lastMessage.includes('protein') || lastMessage.includes('vitamin')) {
      category = 'supplement'
    } else if (lastMessage.includes('weight') || lastMessage.includes('strength') || lastMessage.includes('lift')) {
      category = 'weight'
    } else if (lastMessage.includes('motivation') || lastMessage.includes('goal') || lastMessage.includes('inspire')) {
      category = 'motivation'
    } else if (lastMessage.includes('membership') || lastMessage.includes('plan') || lastMessage.includes('subscription')) {
      category = 'membership'
    } else if (lastMessage.includes('nutrition') || lastMessage.includes('macro') || lastMessage.includes('calorie')) {
      category = 'nutrition'
    }

    const categoryResponses = responses[category as keyof typeof responses] || [
      "🔥 Hey there! I'm FitBot, your personal fitness coach! 💪 I'm here to help you crush your fitness goals with personalized workout plans, nutrition advice, and motivation. What would you like to work on today - strength training, cardio, nutrition, or something else? Let's get you started on your fitness journey! 🎯",
      
      "💪 Awesome! I love helping people transform their fitness! 🏋️ I can create personalized workout plans, design nutrition programs, recommend supplements, and keep you motivated throughout your journey. What's your main fitness goal right now? Are you looking to build muscle, lose fat, improve strength, or just get healthier overall? 🔥",
      
      "🎯 Let's make your fitness dreams a reality! 💪 I'm here to guide you through workouts, nutrition, recovery, and motivation. Whether you're a beginner or advanced, I'll create a plan that fits your lifestyle and goals. What aspect of fitness would you like to focus on first? Workouts, nutrition, or goal setting? Let's get started! 🔥"
    ]

    return categoryResponses[Math.floor(Math.random() * categoryResponses.length)]
  }
}

export const aiService = new AIService()

// Helper function to get available providers
export function getAvailableProviders(): { id: AIProvider; name: string; description: string; requiresKey: boolean }[] {
  return [
    {
      id: 'mock',
      name: 'Demo Mode',
      description: 'Smart responses without API (works offline)',
      requiresKey: false
    },
    {
      id: 'huggingface',
      name: 'Hugging Face',
      description: 'Free AI models (requires free account)',
      requiresKey: true
    },
    {
      id: 'groq',
      name: 'Groq',
      description: 'Fast Llama models (free tier available)',
      requiresKey: true
    },
    {
      id: 'together',
      name: 'Together AI',
      description: 'Open-source models (free credits)',
      requiresKey: true
    }
  ]
}
