import axiosInstance from "api/axios";
import { ReactComponent as MvsLogo } from "../../../assets/icons/mvsLogo.svg";
import { ReactComponent as StripeLogo } from "../../../assets/icons/stripeLogo.svg";
import { BsArrowLeftRight } from "react-icons/bs";
import { handleConnectWithStripe } from "api/stripe";
import { useNavigate } from "react-router-dom";

type Props = {
  user: { results?: { user?: { id?: number } } };
  handleSkip: () => void;
  markSectionAsCompleted: () => void;
};

const PaidSection = (
  props: Props
) => {

  const { markSectionAsCompleted, user, handleSkip } = props; 

  const handleSubmit = async () => {
    const url = await handleConnectWithStripe(user.results?.user.id);
    if (url) {
      window.location.href = url;
    } else {
      console.error("Failed to retrieve Stripe URL");
    }
  };

  const navigate = useNavigate();

  return (
    <div>
      <p className="text-sm font-normal text-mediumGray">
        Connect with Stripe for secure and fast payments. Click below to
        complete the final step!
      </p>
      <div className="w-full mt-10 flex justify-center">
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

            <div className="flex gap-3 mt-3">
              <div
                onClick={handleSkip}
                className="flex-1 bg-transparent border border-limeGreen text-limeGreen rounded-3xl py-2 cursor-pointer font-semibold text-base text-center"
              >
                Skip
              </div>
              <div
                onClick={handleSubmit}
                className="flex-1 bg-limeGreen text-black rounded-3xl py-2 cursor-pointer font-semibold text-base text-center"
              >
                Next
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaidSection;