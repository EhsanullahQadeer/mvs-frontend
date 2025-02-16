import React from "react";

// Define the ButtonProps type to handle all possible props
interface ButtonProps {
  onClick?: () => void; // Optional click handler
  unreadNotifications?: boolean; // New prop for unread notifications
}

const NotificationBellButton: React.FC<ButtonProps> = ({
  onClick,
  unreadNotifications, // Destructure the new prop
}) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-full border border-transparent hover:border-[#1c1c1c] ml-auto relative`}
    >
      <svg width="24" height="24" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.30005 20.5C8.46743 20.8044 8.7135 21.0583 9.01254 21.2352C9.31158 21.412 9.65263 21.5053 10 21.5053C10.3475 21.5053 10.6885 21.412 10.9876 21.2352C11.2866 21.0583 11.5327 20.8044 11.7 20.5M4 7.5C4 5.9087 4.63214 4.38258 5.75736 3.25736C6.88258 2.13214 8.4087 1.5 10 1.5C11.5913 1.5 13.1174 2.13214 14.2426 3.25736C15.3679 4.38258 16 5.9087 16 7.5C16 14.5 19 16.5 19 16.5H1C1 16.5 4 14.5 4 7.5Z"
          stroke="#B2B2B2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      {unreadNotifications && ( // Conditionally render the red circle
        <div className={"absolute w-[10px] h-[10px] bottom-0 right-3 translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500"} />
      )}
    </button>
  );
};

export default NotificationBellButton;