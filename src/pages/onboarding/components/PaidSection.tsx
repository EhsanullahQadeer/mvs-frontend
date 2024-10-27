import { ReactComponent as MvsLogo } from "../../../assets/icons/mvsLogo.svg";
import { ReactComponent as StripeLogo } from "../../../assets/icons/stripeLogo.svg";
import { BsArrowLeftRight } from "react-icons/bs";

type Props = {
  markSectionAsCompleted: () => void;
};

const PaidSection = (props: Props) => {
  const { markSectionAsCompleted } = props;

  const handleSubmit = () => {
    
  };

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

            <div
              onClick={handleSubmit}
              className="mt-3 bg-limeGreen text-black w-full rounded-3xl py-2 cursor-pointer font-semibold text-base text-center"
            >
              Next
            </div>
            <div className="flex justify-between mt-3">
            <button
              onClick={markSectionAsCompleted}
              className="bg-gray-500 text-white py-2 px-4 rounded"
            >
              Skip
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaidSection;