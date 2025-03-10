import { useEffect, useState } from "react";
import { useMessenger } from "api/messenger/context";

export const useUnreadCount = () => {
  const { 
    getTotalConversationUnread,
    totalPriorityInboxUnread,
    totalGeneralInboxUnread,
    totalIcebreakerInboxUnread,
  } = useMessenger();
  
  const [unreadCount, setUnreadCount] = useState(0);

  const refreshUnreadCount = () => {
    getTotalConversationUnread({
      types: ["priority", "general", "icebreaker"]
    }).then(() => {
      setUnreadCount(
        totalPriorityInboxUnread + 
        totalGeneralInboxUnread + 
        totalIcebreakerInboxUnread
      );
    });
  };

  useEffect(() => {
    console.log("useEffect in useUnreadCount");
    refreshUnreadCount();
  }, [totalPriorityInboxUnread, totalGeneralInboxUnread, totalIcebreakerInboxUnread]);

  return { unreadCount, refreshUnreadCount };
}; 