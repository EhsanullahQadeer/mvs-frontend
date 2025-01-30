import React from "react";
import { IoIosCheckmark } from "react-icons/io";
import { AiOutlineQuestionCircle } from "react-icons/ai";

interface PlanCardProps {
  planName: string;
  price: string;
  features: string[];
  buttonText: string;
  onButtonClick: () => void;
  isSelected: boolean; 
}

const PlanCard: React.FC<PlanCardProps> = ({
  planName,
  price,
  features,
  buttonText,
  onButtonClick,
  isSelected,
}) => {
  return (
    <div
    className={`bg-[#0F0F0F] border ${
      isSelected ? "border-grayBlue" : "border-[#1C1C1C]"
    } rounded-xl p-6 text-white w-full max-w-sm transition-all`}
  >      <h2 className=" text-[#D5FF92]">{planName}</h2>
    
      <p className="text-3xl font-semibold mt-2">{price} <span className="text-dimGray font-normal">/mo</span> </p>
      <div className="mt-[16px]">
        <h3 className="text-[12px] font-semibold">Includes:</h3>
        <ul className="mt-3 text-[12px] text-mediumGray space-y-1">
          {features.map((feature, index) => (
            <li key={index} className="flex gap-0.5  items-center">
              <div className="flex items-center gap-0.5">
                <IoIosCheckmark className="text-[#C8FF6D] text-[18px]" />
                {feature}
              </div>
              {index === 1 && (
                <AiOutlineQuestionCircle className="text-[#C8FF6D] " />
              )}
            </li>
          ))}
        </ul>
      </div>
      <button
        onClick={onButtonClick}
        className={`mt-6 w-full  py-2 px-4 border ${      isSelected ? "border-[#3D3D3D] text-[#3D3D3D] " : "border-dimGray text-mediumGray"
        }  rounded-full text-sm  hover:text-[#3D3D3D] hover:border-[#3D3D3D] transition-all`}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default PlanCard;
