import { loadStripe } from '@stripe/stripe-js';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_publishable_key_here');

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export interface PaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
}

export interface PaymentConfirmationResponse {
  success: boolean;
  status: string;
  planName?: string;
  billing?: string;
}

export const stripeService = {
  // Create a payment intent
  async createPaymentIntent(amount: number, planName: string, billing: 'monthly' | 'yearly', userId?: string): Promise<PaymentIntentResponse> {
    const response = await fetch(`${API_BASE_URL}/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        currency: 'inr',
        planName,
        billing,
        userId
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create payment intent');
    }

    return response.json();
  },

  // Confirm payment
  async confirmPayment(paymentIntentId: string): Promise<PaymentConfirmationResponse> {
    const response = await fetch(`${API_BASE_URL}/confirm-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentIntentId
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to confirm payment');
    }

    return response.json();
  },

  // Get Stripe instance
  getStripe() {
    return stripePromise;
  }
};
