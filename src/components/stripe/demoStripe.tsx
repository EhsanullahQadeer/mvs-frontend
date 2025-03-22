import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

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
    // TODO: Send confirmationToken to backend
    // TODO: Handle server-side response if there's an error with the payment intent creation
    
  }

  return (
    <form onSubmit={handleSubmit}>
        <PaymentElement />
        <button type="submit" disabled={!stripe || isLoading}>Pay</button>
      </form>
  );
}

export default DemoStripe;