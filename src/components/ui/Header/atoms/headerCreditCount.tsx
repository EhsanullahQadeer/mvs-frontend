import React from "react";

// Define the ButtonProps type to handle all possible props
interface HeaderCreditCountProps {
  creditCount?: number;
}

const HeaderCreditCount: React.FC<HeaderCreditCountProps> = ({
  creditCount = 0,
}) => {
  return (
    <div className="w-[105px] h-[41px] flex items-center justify-center border-l border-[#1C1C1C] text-[12px] text-[#9EFF00] font-semibold">
      {creditCount > 9999 ?
      "9999+ credits"
      :
      `${creditCount} credits`
      }
    </div>
  );
};

export default HeaderCreditCount;
