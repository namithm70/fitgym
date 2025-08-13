const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export interface OrderResponse {
  orderId: string;
  amount: number;
  currency: string;
  keyId: string;
}

export interface PaymentVerificationResponse {
  success: boolean;
  orderId?: string;
  paymentId?: string;
  error?: string;
}

export const razorpayService = {
  // Create a Razorpay order
  async createOrder(amount: number, planName: string, billing: 'monthly' | 'yearly' | 'daily', userId?: string): Promise<OrderResponse> {
    const response = await fetch(`${API_BASE_URL}/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        currency: 'INR',
        planName,
        billing,
        userId
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create order');
    }

    return response.json();
  },

  // Verify payment
  async verifyPayment(orderId: string, paymentId: string, signature: string): Promise<PaymentVerificationResponse> {
    const response = await fetch(`${API_BASE_URL}/verify-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        razorpay_order_id: orderId,
        razorpay_payment_id: paymentId,
        razorpay_signature: signature
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to verify payment');
    }

    return response.json();
  },

  // Initialize Razorpay payment
  async initializePayment(orderData: OrderResponse, userData: any, onSuccess: (response: any) => void, onError: (error: string) => void) {
    const options = {
      key: orderData.keyId,
      amount: orderData.amount,
      currency: orderData.currency,
      name: 'FitGym',
      description: 'Premium Fitness Membership',
      order_id: orderData.orderId,
      handler: async (response: any) => {
        try {
          const verification = await this.verifyPayment(
            response.razorpay_order_id,
            response.razorpay_payment_id,
            response.razorpay_signature
          );
          
          if (verification.success) {
            onSuccess(verification);
          } else {
            onError(verification.error || 'Payment verification failed');
          }
        } catch (error) {
          onError('Payment verification failed');
        }
      },
      prefill: {
        name: userData.name || '',
        email: userData.email || '',
        contact: userData.phone || ''
      },
      theme: {
        color: '#EF4444'
      }
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  }
};
