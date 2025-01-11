import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import sharpline from "../../../../assets/img/sharpline.png";
import { resendInvitationCodeAPI } from "api/user"; // Import the resend API

interface ThankyouProps {
  submittedApplication: boolean | null;
  setSubmittedApplication: (value: boolean | null) => void;
}

const RegistrationCreatorThankYou: React.FC = () => {
  const navigate = useNavigate();
  const [isCooldown, setIsCooldown] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(60);
  const [attempts, setAttempts] = useState(0);

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

  const handleResendEmail = async () => {
    if (!isCooldown && email) {
      try {
        await resendInvitationCodeAPI(email); // Call API to resend email
        console.log("Resend email successful");
        setIsCooldown(true);
        setAttempts((prev) => prev + 1);
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
          <div className=" rotate-[deg] absolute top-6 overflow-hidden left-[-560px] ">
            <img src={sharpline} alt="" />
          </div>
          <h1 className="text-[34px] font-semibold text-[#FFFFFF] tracking-[-1.36px] px-8  ">
            Thank you for joining the{" "}
            <span className="text-[#9EFF00]">MVSSIVE </span>Community!
          </h1>
          <p className="text-[#b2b2b2]">
            Thank you for submitting your application. To proceed, please verify
            your email address. If you haven't received the email, you can resend it below.
            If you have any questions or need assistance, feel free to contact our support team.
          </p>

          <button
            onClick={handleButton}
            className="bg-[#9EFF00] rounded-full text-sm px-5 py-3 flex justify-center items-center font-semibold"
          >
            Back
          </button>

          <button
            onClick={handleResendEmail}
            className="bg-[#9EFF00] rounded-full text-sm px-5 py-3 flex justify-center items-center font-semibold"
            disabled={isCooldown}
          >
            {isCooldown ? `Re-send in ${cooldownTime}s` : "Re-send Email"}
          </button>

          <div className=" rotate-[300deg] absolute top-56 right-[-470px] overflow-hidden ">
            <img src={sharpline} alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationCreatorThankYou;