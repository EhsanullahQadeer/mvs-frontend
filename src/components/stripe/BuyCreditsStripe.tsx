import { PaymentElement } from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";

import axios from '../../api/axios';
import { CircularProgress } from "@mui/material";

interface BuyCreditsStripeProps {
  amount: number;
  onClose: () => void;
  creditsAmount: number;
}
function BuyCreditsStripe(props: BuyCreditsStripeProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const handleError = (error) => {
    setIsLoading(false);
    setErrorMessage(error.message);
  }

  const handleSubmit =async  (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    const {error: submitError} = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }
    const { error, confirmationToken} = await stripe.createConfirmationToken({elements})

    if (error) {
      handleError(error);
      return;
    }

    const paymentIntent = await axios.post('stripe/payment-intent-for-credits',{
      tokenId: confirmationToken.id,amount: props.amount,creditsAmount: props.creditsAmount });
      if (paymentIntent.data.intent.status === 'requires_action') {
        await stripe.handleNextAction({
          clientSecret: paymentIntent.data.intent.client_secret
        });
      }
      else{
        props.onClose()
      }
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {isLoading?(
        <div className="flex items-center">
          <CircularProgress
            sx={{
              width: "30px !important",
              height: "30px !important",
              color: "#9EFF00",
            }}
          />
        </div>
      ) : (
        <div className="flex mt-2 justify-end">
          <button type="submit" className="bg-limeGreen text-sm text-jetBlack font-semibold py-[12px] px-5 rounded-full">Buy Credits</button>
        </div>
      )}
    </form>
  )
}

export default BuyCreditsStripe;