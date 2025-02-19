import React, { useState, useEffect } from "react";
import EmailIcon from "../../../assets/icons/checkEmail.svg";
import { forgotPasswordAPI } from "api/auth"; // Import your forgotPasswordAPI
import { useNavigate } from "react-router-dom";

const CheckEmail: React.FC = () => {
  const [isCooldown, setIsCooldown] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(60);
  const [attemptsLock, setAttemptsLock] = useState(false);
  const navigate = useNavigate();
  
  // Retrieve email from localStorage (from your previous flow)
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
        const response = await forgotPasswordAPI({ email });
        //console.log("Resend email successful", response.data.error);

        setIsCooldown(true);
        setAttemptsLock(response.data.error);
      } catch (error) {
        console.error("Error resending email", error);
      }
    }
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
            className=" w-72  my-5  border text-platinum border-platinum text-sm font-semibold py-3 rounded-full "
            onClick={handleResendEmail}
            disabled={isCooldown || attemptsLock} // Disable during cooldown or if max attempts reached
          >
            {attemptsLock 
              ? "Please try again at another time"
              : isCooldown 
                ? `Re-send in ${cooldownTime}s` 
                : "Re-send Email"
            }
          </button>
        </div>
        <p className="py-3.5 w-72 px-2 text-center text-xs text-softGray">
          By submitting your information, you agree to our{" "}
          <span className="text-limeGreen">Terms of Service</span> and{" "}
          <span className="text-limeGreen">Privacy Policy</span>
        </p>
        {attemptsLock && (
          <p className="text-xs text-red-500">You've reached the maximum resend attempts. Please wait 24 hours before trying again.</p>
        )}
      </div>
    </>
  );
};

export default CheckEmail;