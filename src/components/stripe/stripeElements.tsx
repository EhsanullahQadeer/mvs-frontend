import {Elements} from '@stripe/react-stripe-js';
import {loadStripe, StripeElementsOptions} from '@stripe/stripe-js';
import {config} from 'config/ConfigManager';
import DemoStripe from './demoStripe';

import axios from '../../api/axios';
import { useState, useEffect } from 'react';


const stripePromise = loadStripe(config.get('STRIPE.PUBLISHABLE_KEY'));

function StripeElements() { 
  const [customerSession, setCustomerSession] = useState(null);
  async function getCustomerSession() {
    const customerSession = await axios.post('stripe/create-customer-session');
    setCustomerSession(customerSession.data);
  }
  useEffect(() => {
    getCustomerSession();
  }, []);
  return (
    <>
      {customerSession ? (
        <Elements stripe={stripePromise} options={{
          mode: 'payment' as const,
          amount: 1099,
          currency: 'usd',
          customerSessionClientSecret: customerSession?.clientSecret,
        }}>
          <DemoStripe />
        </Elements>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}

export default StripeElements;