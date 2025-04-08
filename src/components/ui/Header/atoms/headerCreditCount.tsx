import React from "react";

// Define the ButtonProps type to handle all possible props
interface HeaderCreditCountProps {
  creditCount?: number;
}

const HeaderCreditCount: React.FC<HeaderCreditCountProps> = ({
  creditCount = 0,
}) => {
  const wholeCredits = Math.floor(creditCount);
  const decimalCredits = creditCount - wholeCredits;
  return (
    <div className="w-[105px] h-[41px] flex items-center justify-center border-l border-[#1C1C1C] text-[12px] text-[#9EFF00] font-semibold">
      <span>{creditCount > 9999 ? "9999+" : wholeCredits.toString()}</span>
      <span className="text-[10px] opacity-75">{decimalCredits>0 && creditCount < 9999?`${decimalCredits.toString().slice(1,4)}`:""}</span>
      <span>&nbsp;Credits</span>
    </div>
  );
};

export default HeaderCreditCount;
