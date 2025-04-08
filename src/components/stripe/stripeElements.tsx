import {Elements} from '@stripe/react-stripe-js';
import {loadStripe, StripeElementsOptions} from '@stripe/stripe-js';
import {config} from 'config/ConfigManager';
import DemoStripe from './demoStripe';
import PaymentMethodStripe from './PaymentMethodStripe';
import BuyCreditsStripe from './BuyCreditsStripe';

import axios from '../../api/axios';
import { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';



const stripePromise = loadStripe(config.get('STRIPE.PUBLISHABLE_KEY'));

interface StripeElementsProps {
  demoStripeProps?: DemoStripeProps;
  paymentMethodComponentProps?: PaymentMethodComponentProps;
  buyCreditsComponentProps?: BuyCreditsComponentProps;
}

interface DemoStripeProps {
  onPaymentComplete: (paymentIntentId: string) => void;
  amount: number;
  recipientId: string;
  onClose: () => void;
}

interface PaymentMethodComponentProps {
}

interface BuyCreditsComponentProps {
  amount: number;
  onClose: () => void;
  creditsAmount: number;
}


function StripeElements(props: StripeElementsProps) {
  const [customerSession, setCustomerSession] = useState<any>(null);
  const [setupIntent, setSetupIntent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  
  const appearance = {
    theme: 'night' as const,
    labels: 'floating' as const
  }
  
  async function getCustomerSession() {
    try {
      setIsLoading(true);
      const customerSession = await axios.post('stripe/create-customer-session');
      setCustomerSession(customerSession.data);
    } catch (err) {
      console.error('Error creating customer session:', err);
      setError('Failed to initialize payment system');
    } finally {
      setIsLoading(false);
    }
  }
  
  async function getSetupIntent() {
    try {
      setIsLoading(true);
      const setupIntent = await axios.post('stripe/create-setup-intent');
      setSetupIntent(setupIntent.data);
    } catch (err) {
      console.error('Error creating setup intent:', err);
      setError('Failed to initialize payment method setup');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if(props.paymentMethodComponentProps){
      getSetupIntent();
    }
    getCustomerSession();
  }, []);


  function StripeDemoComponent(){
    return (
      <Elements stripe={stripePromise} options={{
        mode: 'payment',
        currency: 'usd',
        capture_method: 'manual',
        amount: Number((props.buyCreditsComponentProps.amount*100).toFixed(0)),
        customerSessionClientSecret: customerSession?.clientSecret,
        appearance: appearance,
      }}>
        <DemoStripe 
          onPaymentComplete={props.demoStripeProps.onPaymentComplete} 
          amount={Number((props.buyCreditsComponentProps.amount*100).toFixed(0))} 
          recipientId={props.demoStripeProps.recipientId} 
          onClose={props.demoStripeProps.onClose} 
        />
      </Elements>
    );
  }
  function StripePaymentComponent(){
    return (
      <Elements stripe={stripePromise} options={{
        clientSecret: setupIntent?.clientSecret,
        customerSessionClientSecret: customerSession?.clientSecret,
        appearance: appearance,
      }}>
        <PaymentMethodStripe />
      </Elements>
    )
  }
  function StripeBuyCreditsComponent(){
    return (
      <Elements stripe={stripePromise} options={{
        mode: 'payment',
        amount: Number((props.buyCreditsComponentProps.amount*100).toFixed(0)),
        currency: 'usd',
        customerSessionClientSecret: customerSession?.clientSecret,
        appearance: appearance,
      }}>
        <BuyCreditsStripe amount={ Number((props.buyCreditsComponentProps.amount*100).toFixed(0))} onClose={props.buyCreditsComponentProps.onClose} creditsAmount={props.buyCreditsComponentProps.creditsAmount} />
      </Elements>
    )
  }
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-4">
        <CircularProgress sx={{ color: "#9EFF00" }} />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-red-500 p-4 text-center">
        {error}
      </div>
    );
  }
  
  return (
    <>
      {props.demoStripeProps && customerSession ? <StripeDemoComponent /> : ""}
      {props.paymentMethodComponentProps && setupIntent && customerSession ? <StripePaymentComponent /> : ""}
      {props.buyCreditsComponentProps && customerSession ? <StripeBuyCreditsComponent /> : ""}
    </>
  );
}

export default StripeElements;