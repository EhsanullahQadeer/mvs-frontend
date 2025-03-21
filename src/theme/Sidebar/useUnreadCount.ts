import { useEffect, useState } from "react";
import { useMessenger } from "api/messenger/context";
import { currentUserAPI } from "api/auth";
export const useUnreadCount = () => {
  const { 
    getTotalConversationUnread,
    totalPriorityInboxUnread,
    totalGeneralInboxUnread,
    totalIcebreakerInboxUnread,
  } = useMessenger();
  
  const [unreadCount, setUnreadCount] = useState(0);

  const refreshUnreadCount = async () => {
    try {
      const isLoggedIn = await currentUserAPI();
      console.log("isLoggedIn", isLoggedIn);
      if (isLoggedIn) {
        getTotalConversationUnread({
          types: ["priority", "general", "icebreaker"]
        }).then(() => {
          setUnreadCount(
            totalPriorityInboxUnread +
            totalGeneralInboxUnread +
            totalIcebreakerInboxUnread
          );
        });
      }
    } catch (error) {
      // not logged in (public profile)
    }
  };

  useEffect(() => {
    refreshUnreadCount();
  }, [totalPriorityInboxUnread, totalGeneralInboxUnread, totalIcebreakerInboxUnread]);

  return { unreadCount, refreshUnreadCount };
}; 