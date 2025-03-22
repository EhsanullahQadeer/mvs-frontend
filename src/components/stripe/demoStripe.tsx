import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

import axios from '../../api/axios';

function DemoStripe() {
  const stripe = useStripe();
  const elements = useElements();
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();


  const handleError = (error) => {
    setIsLoading(false);
    setErrorMessage(error.message);
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const {error: submitError} = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }
    const { error, confirmationToken} = await stripe.createConfirmationToken({
      elements
    })

    if (error) {
      handleError(error);
      return;
    }
    const paymentIntent = await axios.post('stripe/payment-intent-for-demo',{tokenId: confirmationToken.id,tip:10,recipientId: '351'});
    // TODO: Handle server-side response if there's an error with the payment intent creation
    // TODO: Set a state to stop showing this component
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" disabled={!stripe || isLoading}>Pay</button>
    </form>
  );
}

export default DemoStripe;