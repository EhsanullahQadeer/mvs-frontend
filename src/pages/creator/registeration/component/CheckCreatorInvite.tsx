import React, { useState, useEffect } from "react";
import EmailIcon from "../../../../assets/icons/checkEmail.svg";
import { useNavigate } from "react-router-dom";
import { resendInvitationCodeAPI } from "api/user";

const CheckCreatorInvite: React.FC = () => {
  const [isCooldown, setIsCooldown] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(60);
  const [attempts, setAttempts] = useState(0); 
  const navigate = useNavigate();

  // Retrieve email from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const email = user?.email;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCooldown) {
      timer = setInterval(() => {
        setCooldownTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);

      if (cooldownTime === 0) {
        setIsCooldown(false);
        setCooldownTime(60); // Reset cooldown
      }
    }

    return () => {
      clearInterval(timer);
    };
  }, [isCooldown, cooldownTime]);

  const handleResendInvite = async () => {
    if (!isCooldown && email) {
      try {
        await resendInvitationCodeAPI(email); // Call your API to resend the code
        console.log("Resend invitation code successful");

        setIsCooldown(true);
        setAttempts((prev) => prev + 1);
      } catch (error) {
        console.error("Error resending invitation code", error);
      }
    }
  };

  const handleGoBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <>
      <div className="flex flex-col w-full items-center justify-center text-white">
        <img src={EmailIcon} alt="" />
        <div className="flex pt-[30px] justify-center flex-col items-center">
          <h2 className="text-3xl p-2.5 font-semibold tracking-tighter">
            Check your Email
          </h2>
          <p className="text-mediumGray w-[55%] p-2.5 text-center text-sm">
            Please follow the instructions in the email sent to complete the process.
          </p>
          <button
            type="button"
            className="w-72 my-5 border text-platinum border-platinum text-sm font-semibold py-3 rounded-full"
            onClick={handleResendInvite}
            disabled={isCooldown}
          >
            {isCooldown ? `Re-send in ${cooldownTime}s` : "Re-send Invite Code"}
          </button>

          <button
            type="button"
            className="w-72 my-3 border text-limeGreen border-limeGreen text-sm font-semibold py-3 rounded-full"
            onClick={handleGoBack}
          >
            Go Back
          </button>
        </div>
        <p className="w-72 px-2 text-center text-xs text-softGray">
          By submitting your information, you agree to our{" "}
          <span className="text-limeGreen">Terms of Service</span> and{" "}
          <span className="text-limeGreen">Privacy Policy</span>
        </p>
      </div>
    </>
  );
};

export default CheckCreatorInvite;