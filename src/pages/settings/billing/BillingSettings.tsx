import BalanceBilling from "./context/BalanceBilling";
import PaymentMethodBilling from "./context/PaymentMethodBilling";
import BillingHistoryBilling from "./context/BillingHistoryBilling";
import { useEffect, useState } from "react";
import { checkUserHasStripeConnectedAccount } from "api/user";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { ReactComponent as MvsLogo } from "../../../assets/icons/mvsLogo.svg";
import { ReactComponent as StripeLogo } from "../../../assets/icons/stripeLogo.svg";
import { BsArrowLeftRight } from "react-icons/bs";
import { handleConnectWithStripe } from "api/stripe";

const BillingSettings = () => {
  const [isUserStripeConnected, setIsUserStripeConnected] = useState(false);
  const user = useSelector((state: RootState) => state.auth?.user);

  useEffect(() => {
    const fetchUserStripeConnected = async () => {
      if (user?.id) {
        const response = await checkUserHasStripeConnectedAccount(user?.id);
        console.log("response here man", response);
        setIsUserStripeConnected(response.data);
      }
    };
    fetchUserStripeConnected();
  }, [user]);

  const handleConnectStripe = async () => {
    const url = await handleConnectWithStripe(user.id, 'billing');
    if (url) {
      window.location.href = url;
    } else {
      console.error("Failed to retrieve Stripe URL");
    }
  };

  return (
    <div className="relative">
      <div className={`flex flex-col ${!isUserStripeConnected ? 'blur-sm pointer-events-none' : ''}`}>
        <h2 className="text-white px-3 py-4 text-xl font-semibold border-b border-eclipseGray">
          Billing
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          <div className="w-full h-full">
            <div className="h-full">
              <BalanceBilling />
            </div>
          </div>
          <div className="w-full h-full">
            <div className="h-full">
              <PaymentMethodBilling />
            </div>
          </div>
        </div>
        <div className="px-4 mt-4">
          <BillingHistoryBilling />
        </div>
      </div>

      {/* Stripe Connect Overlay */}
      {!isUserStripeConnected && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1/3 bg-[#1B1A1A] border border-eclipseGray rounded-[20px] p-5">
            <div className="bg-darkGray rounded-2xl w-full py-[100px] flex gap-5 justify-center items-center">
              <div className="bg-eerieBlack border border-eclipseGray w-[80px] h-[80px] flex justify-center items-center rounded-2xl">
                <MvsLogo />
              </div>

              <div className="text-dimGray w-[30px] h-[30px]">
                <BsArrowLeftRight className="w-full h-full" />
              </div>

              <div className="bg-eerieBlack border border-eclipseGray w-[80px] h-[80px] flex justify-center items-center rounded-2xl">
                <StripeLogo />
              </div>
            </div>

            <div className="mt-4 text-sm">
              <p className="text-coolGray">
                <span className="text-white">MVSSIVE </span>
                automatically keeps your account in sync with your Stripe account.
                By continuing you are agreeing to MVSSIVE's{" "}
                <span className="text-limeGreen">terms and conditions.</span>
              </p>

              <p className="mt-4 text-coolGray">
                Need help? Please contact{" "}
                <span className="text-limeGreen">support</span>
              </p>

              <div className="mt-4 w-full text-coolGray">
                <hr />
              </div>

              <div className="flex justify-center mt-3">
                <button
                  onClick={handleConnectStripe}
                  className="w-full bg-limeGreen text-black rounded-3xl py-2 cursor-pointer font-semibold text-base"
                >
                  Connect with Stripe
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingSettings;

