import React from "react";
import { useNavigate } from "react-router-dom";
import sharpline from '../../../../assets/img/sharpline.png'

const Thankyou: React.FC = () => {
    const navigate = useNavigate()
    const handleButton =() =>{
        navigate("/home")
    }
  return (
    <>
        <div className=" rotate-[deg] absolute top-6 left-[-560px] ">
            <img src={sharpline} alt="" />
        </div>
        <div className="flex text-center gap-5 flex-col justify-center items-center w-1/2">
          <h1 className="text-[34px] font-semibold text-[#FFFFFF] tracking-[-1.36px] px-8  ">Thank you for joining the  {" "} 
            <span className="text-[#9EFF00]">MVSSIVE </span>Community!
          </h1>
          <p className="text-[#b2b2b2]">Your application has been received and is currently under review. You will receive an email notification once your account has been approved and is ready for use. if you have any questions or need assistance, please contact our support team. </p>
          <button onClick={handleButton} className="bg-[#9EFF00] rounded-full text-sm px-5 py-3 flex justify-center items-center font-semibold">Back to Home</button>
        </div>
        <div className=" rotate-[300deg] absolute top-56 right-[-470px] ">
            <img src={sharpline} alt="" />
        </div>
    </>
  );
};

export default Thankyou;
