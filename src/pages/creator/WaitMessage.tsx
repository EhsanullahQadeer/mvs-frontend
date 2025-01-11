import React from "react";
import { useNavigate } from "react-router-dom";
import sharpline from "../../assets/img/sharpline.png";

const WaitMessage: React.FC = () => {
  const navigate = useNavigate();
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
       <h1 className="text-[34px] font-semibold text-[#FFFFFF] tracking-[-1.36px] px-8">
            Hang Tight! Your Partner Application is Still in the Works
          </h1>
          <p className="text-[#b2b2b2]">
            Your application is still pending as we review it to become a
            MVSSIVE Partner. Thank you for your patience! We’ll notify you via
            email with any updates. If you have any questions or need
            assistance, please contact our{" "}
            <span className="text-[#9EFF00]">support team.</span>
          </p>

          <button
            onClick={handleButton}
            className="bg-[#9EFF00] rounded-full text-sm px-5 py-3 flex justify-center items-center font-semibold"
          >
            Back
          </button>
          <div className=" rotate-[300deg] absolute top-56 right-[-470px] overflow-hidden ">
        <img src={sharpline} alt="" />
      </div>
        </div>

       
      </div>
    </>
  );
};

export default WaitMessage;
