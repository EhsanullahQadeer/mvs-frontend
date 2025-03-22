import {Elements} from '@stripe/react-stripe-js';
import {loadStripe, StripeElementsOptions} from '@stripe/stripe-js';
import {config} from 'config/ConfigManager';
import DemoStripe from './demoStripe';

const stripePromise = loadStripe(config.get('STRIPE.PUBLISHABLE_KEY'));

function StripeElements() {
  const options: StripeElementsOptions = {
    mode: 'payment' as const,
    amount: 1099,
    currency: 'usd',
    paymentMethodCreation: 'manual',
  }
  return (
    <Elements stripe={stripePromise} options={options}>
      <DemoStripe />
    </Elements>
  );
}

export default StripeElements;