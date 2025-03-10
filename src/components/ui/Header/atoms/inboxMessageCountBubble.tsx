import React from "react";

// Define the ButtonProps type to handle all possible props
interface InboxMessageCountBubbleProps {
  unreadMessages?: number; // Custom styles passed from the parent component
  color: string;
  isSelected: boolean;
}

const MessageCountBubble: React.FC<InboxMessageCountBubbleProps> = ({
  unreadMessages = 0, // Default to 0 if no notifications are passed
  color = "",
  isSelected = false,
}) => {
  // Determine the display value
  const displayCount = unreadMessages > 99 ? "99+" : unreadMessages;

  return (
    <div className={`flex items-center justify-center px-2 py-1 text-[12px] ${color} text-white rounded-full ml-[10px] ${isSelected ? 'font-semibold' : 'font-normal'}`}>
      {displayCount}
    </div>
  );
};

export default MessageCountBubble;