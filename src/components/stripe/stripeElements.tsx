import {Elements} from '@stripe/react-stripe-js';
import {loadStripe, StripeElementsOptions} from '@stripe/stripe-js';
import {config} from 'config/ConfigManager';
import DemoStripe from './demoStripe';

import axios from '../../api/axios';
import { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';


const stripePromise = loadStripe(config.get('STRIPE.PUBLISHABLE_KEY'));

interface StripeElementsProps {
  onPaymentComplete: (paymentIntentId: string) => void;
  amount: number;
  recipientId: string;
  onClose: () => void;
}

function StripeElements(props: StripeElementsProps) {
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
          currency: 'usd',
          amount: Number(props.amount.toFixed(2))*100,
          customerSessionClientSecret: customerSession?.clientSecret,
          appearance: {
            theme: 'night',
            labels: 'floating'
          },
        }}>
          <DemoStripe onPaymentComplete={props.onPaymentComplete} amount={Number(props.amount.toFixed(2))*100} recipientId={props.recipientId} onClose={props.onClose} />
        </Elements>
      ) : (
        <div className="flex items-center">
          <CircularProgress
            sx={{
              width: "30px !important",
              height: "30px !important",
              color: "#9EFF00",
            }}
          />
        </div>
        )}
    </>
  );
}

export default StripeElements;