import { useCallback } from "react";
import axiosInstance from "api/axios";

export interface IGetTotalConversationUnread {
  types: string[];
}

export const useGetTotalConversationUnread = (
  setTotalPriorityInboxUnread: React.Dispatch<React.SetStateAction<number>>,
  setTotalGeneralInboxUnread: React.Dispatch<React.SetStateAction<number>>,
  setTotalIcebreakerInboxUnread: React.Dispatch<React.SetStateAction<number>>,
) => {
  return useCallback(async (payload: IGetTotalConversationUnread): Promise<void> => {
    try {
      const response = await axiosInstance.get(`/messenger/conversations/unread`, { params: payload });
      setTotalPriorityInboxUnread(response.data?.results?.priority || 0);
      setTotalGeneralInboxUnread(response.data?.results?.general || 0);
      setTotalIcebreakerInboxUnread(response.data?.results?.icebreaker || 0);
    } catch (error) {
      console.error("Error getting total conversation unread:", error);
      throw error;
    }
  }, []);
};