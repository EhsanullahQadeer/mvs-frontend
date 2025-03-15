import React from "react";

// Define the ButtonProps type to handle all possible props
interface ButtonProps {
  isRead?: boolean; // Custom styles passed from the parent component
}

const readBubble: React.FC<ButtonProps> = ({
  isRead = false, // Default to an empty string if no className is passed
}) => {
  return (
    <div
      className={`w-[8px] h-[8px] mr-2 rounded-full ${isRead ? 'bg-transparent' : 'bg-[#2E70E8]'}`} // Change background based on isRead
    />
  );
};

export default readBubble;