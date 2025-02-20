import React from 'react';

interface CheckmarkButtonProps {
  onClick: () => void; // Function to handle marking the notification as read
}

const CheckmarkButton: React.FC<CheckmarkButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-[36px] h-[36px] bg-[#1C1C1C] flex items-center justify-center rounded"
      aria-label="Mark as read" // Accessibility label
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    </button>
  );
};

export default CheckmarkButton;