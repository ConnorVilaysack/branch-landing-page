import { track } from '@vercel/analytics';

// Replace this with your Stripe Payment Link URL.
// Create one at https://dashboard.stripe.com/payment-links
export const STRIPE_PAYMENT_LINK = 'https://buy.stripe.com/00w6oH0Uy86F4Mv4JUdby01';

export function trackCTAClick(location: string) {
  track('cta_click', { location });
}
