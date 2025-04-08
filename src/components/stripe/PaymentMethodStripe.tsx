import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

function PaymentMethodStripe() {
  const stripe = useStripe();
  let elements = useElements();

  const [isReadytoSubmit, setIsReadytoSubmit] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return null;
    }
    const {error} = await stripe.confirmSetup({
      elements,
      confirmParams:{
        return_url: window.location.href,
      }
    });
  }
  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement
      onChange={(event)=>setIsReadytoSubmit(event.complete&&!event.value.payment_method)}
      options={{
        layout: "accordion",
      }} />
      <div className="flex justify-end pb-6 pt-4 gap-4">  
      {isReadytoSubmit ? (<button type="submit" className="bg-limeGreen text-sm text-jetBlack font-semibold py-[12px] px-5 rounded-full">Submit</button>):""}
      </div>
    </form>
  );
}

export default PaymentMethodStripe;