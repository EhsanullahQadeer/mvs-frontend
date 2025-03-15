import React from "react";
import { useNotificationAnimation } from "../../context/NotificationAnimationContext";

interface ButtonProps {
  onClick?: () => void;
  unreadNotifications?: boolean;
}

const NotificationBellButton: React.FC<ButtonProps> = ({
  onClick,
  unreadNotifications,
}) => {
  const { isAnimating } = useNotificationAnimation();

  return (
    <button
      onClick={onClick}
      className={`p-2 w-[42px] h-[42px] rounded-full border border-transparent hover:border-[#1c1c1c] ml-auto relative`}
    >
      {unreadNotifications ? (
        <div className={isAnimating ? "animate-shake" : ""}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.4 14.9C20.2 16.4 21 17 21 17H3C3 17 6 15 6 8C6 4.7 8.7 2 12 2C12.7 2 13.3 2.1 13.9 2.3M10.3 21C10.4674 21.3044 10.7135 21.5583 11.0125 21.7352C11.3116 21.912 11.6526 22.0053 12 22.0053C12.3475 22.0053 12.6885 21.912 12.9876 21.7352C13.2866 21.5583 13.5327 21.3044 13.7 21M21 8C21 9.65685 19.6569 11 18 11C16.3431 11 15 9.65685 15 8C15 6.34315 16.3431 5 18 5C19.6569 5 21 6.34315 21 8Z" stroke="#B2B2B2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="18" cy="8" r="4" fill="#DC2626"/>
        </svg>
        </div>
      ) : (
        <div className={isAnimating ? "animate-shake" : ""}>
          <svg width="24" height="24" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg" >
            <path d="M8.30005 20.5C8.46743 20.8044 8.7135 21.0583 9.01254 21.2352C9.31158 21.412 9.65263 21.5053 10 21.5053C10.3475 21.5053 10.6885 21.412 10.9876 21.2352C11.2866 21.0583 11.5327 20.8044 11.7 20.5M4 7.5C4 5.9087 4.63214 4.38258 5.75736 3.25736C6.88258 2.13214 8.4087 1.5 10 1.5C11.5913 1.5 13.1174 2.13214 14.2426 3.25736C15.3679 4.38258 16 5.9087 16 7.5C16 14.5 19 16.5 19 16.5H1C1 16.5 4 14.5 4 7.5Z" stroke="#B2B2B2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </button>
  );
};

export default NotificationBellButton;