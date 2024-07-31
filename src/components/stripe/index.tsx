/*************************************************************************
 * @file index.tsx
 * @author End Quote
 * @desc Handles payments using Stripe.
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* IMPORTS */
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { 
  Elements, 
  CardElement, 
  useStripe, 
  useElements 
} from '@stripe/react-stripe-js';

/* LOCAL IMPORTS */
import axios from '../../api/axios';
import { config } from 'config/ConfigManager';

const stripePromise = loadStripe( config.get('STRIPE.PUBLISHABLE_KEY') );


const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements) {
      setIsLoading(false);
      return;
    }

    try {
      const amountInCents = parseFloat(amount) * 100;
      if (isNaN(amountInCents) || amountInCents <= 0) {
        setMessage('Invalid amount');
        setIsLoading(false);
        return;
      }

      const { data } = await axios.post(`${config.get('API')}/stripe/create-payment-intent`, {
        amount: amountInCents, // Convert to cents
      });
      console.log('data', data);
      const clientSecret  = data.client_secret;
      console.log('client_secrets', clientSecret);
      if (!clientSecret) {
        setMessage('Missing client secret in response');
        setIsLoading(false);
        return;
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setMessage(result.error.message);
      } else {
        setMessage('Payment successful!');
      }
    } catch (error) {
      setMessage('Payment failed: ' + error.message);
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Request Payment</h2>
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        style={styles.input}
      />
      <CardElement options={cardElementOptions} />
      <button type="submit" disabled={!stripe || isLoading} style={styles.button}>
        {isLoading ? 'Processing...' : 'Pay'}
      </button>
      {message && <div className="" style={{color: 'black'}}>{message}</div>}
    </form>
  );
};

const App = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

// Inline styles for the component
const styles = {
  form: {
    maxWidth: '400px',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    background: '#f9f9f9',
  },
  heading: {
    marginBottom: '20px',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  cardElement: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
  button: {
    width: '100%',
    padding: '10px',
    background: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  message: {
    marginTop: '20px',
    textAlign: 'center',
  },
  disabledButton: {
    background: '#ccc',
  }
};

const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
};

export default App;
