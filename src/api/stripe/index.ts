import { CardElement } from "@stripe/react-stripe-js";
import { Stripe, StripeElements } from '@stripe/stripe-js';
import axios from "api/axios";

export const handleConnectWithStripe = async (
  userId: number,
  origin: string
) => {
  try {
    const response = await axios.post(`/stripe/connect?userId=${userId}&origin=${origin}`);
    const url = response.data.url;
    if (url) {
      return url;
    } else {
      console.error('Stripe URL not received.');
      return null;
    }
  } catch (error) {
    console.error('Error initiating Stripe Connect:', error);
    return null;
  }
};

export const handlePaymentIntentAPI = async (
  stripe: Stripe | null,
  elements: StripeElements | null,
  amount: number
) => {
  const cardElement = elements.getElement( CardElement );
  if (!cardElement) {
    return;
  }

  const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
    type: 'card',
    card: cardElement,
  });

  if (paymentMethodError) {
    console.error('Error creating payment method:', paymentMethodError);
    return null;
  }

  try {
    const response = await axios.post(
      `/stripe/create-payment-intent`, 
      { amount, paymentMethodId: paymentMethod.id }
    );

    if (response.data) {
      return {
        clientSecret: response.data.client_secret,
        paymentIntentId: response.data.id,
      };
    } else {
      return {
        clientSecret: undefined,
        paymentIntentId: undefined,
      };
    }
  } catch (err) {
    console.error('Error creating payment intent:', err);
    return {
      clientSecret: undefined,
      paymentIntentId: undefined,
    };
  }
};

export const handleRefundAPI = async (
  amount: number, 
  paymentIntentId: string
) => {
  try {
    const response = await axios.post(
      `/stripe/refund-payment`, { amount, paymentIntentId }
    );
    console.log('Refund successful:', response);
  } catch (err) {
    console.error('Error refunding payment:', err);
  }
};

export const handlePaymentConfirmAPI = async () => {

}