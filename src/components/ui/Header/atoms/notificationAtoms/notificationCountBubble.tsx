import React from "react";

// Define the ButtonProps type to handle all possible props
interface NotificationCountBubbleProps {
  unreadNotifications?: number; // Custom styles passed from the parent component
}

const NotificationCountBubble: React.FC<NotificationCountBubbleProps> = ({
  unreadNotifications = 0, // Default to 0 if no notifications are passed
}) => {
  // Determine the display value
  const displayCount = unreadNotifications > 9 ? "9+" : unreadNotifications < 0 ? 0 : unreadNotifications;

  return (
    <div className="flex items-center justify-center w-[22px] h-[22px] bg-[#242424] text-white rounded-full ml-[10px]">
      {displayCount}
    </div>
  );
};

export default NotificationCountBubble;