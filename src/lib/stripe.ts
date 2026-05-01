import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string);

export async function redirectToCheckout(cart: any[], customerDetails: any, deliveryData: any) {
  if (!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY) {
    alert("Stripe keys are missing. Please add VITE_STRIPE_PUBLISHABLE_KEY to your Secrets.");
    return;
  }

  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart, customerDetails, deliveryData }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create session');
    }

    const session = await response.json();
    const stripe = await stripePromise;
    if (!stripe) throw new Error('Stripe failed to load');

    // @ts-ignore
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) throw new Error(result.error.message);
  } catch (error: any) {
    console.error("Checkout error:", error);
    alert("Checkout error: " + error.message);
    throw error;
  }
}
