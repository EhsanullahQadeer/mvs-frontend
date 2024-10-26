import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import sharpline from "../../assets/img/sharpline.png";
import { resendInvitationCodeAPI } from "api/user"; // Import the resend API

const WaitMessageCreators: React.FC = () => {
  const navigate = useNavigate();
  const [isCooldown, setIsCooldown] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(60);
  const [attempts, setAttempts] = useState(0);

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

  const handleResendEmail = async () => {
    if (!isCooldown && email) {
      try {
        await resendInvitationCodeAPI( email );
        setIsCooldown(true);
        setAttempts((prev) => prev + 1);
        console.log("Resend email successful");
      } catch (error) {
        console.error("Error resending email", error);
      }
    }
  };

  const handleButton = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="flex text-center gap-5 flex-col h-screen overflow-hidden justify-center items-center fixed w-screen">
        <div className="flex text-center gap-5 flex-col h-screen overflow-hidden justify-center items-center w-1/2">
          <div className="rotate-[deg] absolute top-6 overflow-hidden left-[-560px] ">
            <img src={sharpline} alt="" />
          </div>
          <h1 className="text-[34px] font-semibold text-[#FFFFFF] tracking-[-1.36px] px-8">
            Almost There! Check Your Email
          </h1>
          <p className="text-[#b2b2b2]">
            We've sent you an email with further instructions to complete your registration as a MVSSIVE Creator. 
            If you haven't received it, you can resend the email using the button below. 
            For any additional questions or support, feel free to contact our <span className="text-[#9EFF00]">support team</span>.
          </p>

          <button
            onClick={handleResendEmail}
            className="bg-[#9EFF00] rounded-full text-sm px-5 py-3 flex justify-center items-center font-semibold"
            disabled={isCooldown || attempts >= 3} // Disable based on cooldown or max attempts
          >
            {isCooldown ? `Resend in ${cooldownTime}s` : "Resend Email"}
          </button>
          {attempts >= 3 && (
            <p className="text-xs text-red-500">
              You've reached the maximum resend attempts.
            </p>
          )}

          <button
            onClick={handleButton}
            className="bg-[#9EFF00] rounded-full text-sm px-5 py-3 flex justify-center items-center font-semibold mt-4"
          >
            Back to Home
          </button>

          <div className="rotate-[300deg] absolute top-56 right-[-470px] overflow-hidden">
            <img src={sharpline} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default WaitMessageCreators;