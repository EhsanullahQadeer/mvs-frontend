import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

import axios from '../../api/axios';
import { CircularProgress } from "@mui/material";

interface DemoStripeProps {
  onPaymentComplete: (paymentIntentId: string) => void;
  amount: number;
  recipientId: string;
  onClose: () => void;
}

function DemoStripe(props: DemoStripeProps) {
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
    const paymentIntent = await axios.post('stripe/payment-intent-for-demo',{tokenId: confirmationToken.id,amount: props.amount,recipientId: props.recipientId});
    if (paymentIntent.data.paymentIntent.status === 'requires_action') {
      await stripe.handleNextAction({
        clientSecret: paymentIntent.data.paymentIntent.clientSecret
      });
    }
    props.onPaymentComplete(paymentIntent.data.paymentIntent.id);
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <div className="flex bottom-0 sticky bg-darkGray justify-end pb-6 pt-1 gap-4">  
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
              ) 
              :(<button
              type="submit"
              onClick={handleSubmit}
              className="bg-limeGreen text-sm text-jetBlack font-semibold py-[12px] px-5 rounded-full"
            >
              Send Demo
            </button>)}
        <button type="button" onClick={props.onClose}  className="border border-charcoalGray bg-jetBlack text-sm text-white font-semibold py-[12px] w-[86px] flex justify-center items-center rounded-full">Close</button>
      </div>
    </form>
  );
}

export default DemoStripe;