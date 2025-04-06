import { useCallback } from "react";
import axiosInstance from "api/axios";

export interface IToggleConversationIsArchived {
  conversationIds: number[];
}

export const useToggleConversationIsArchive = () => {
  return useCallback(async (payload: IToggleConversationIsArchived): Promise<void> => {
    try {
      await axiosInstance.post(`/messenger/conversations/toggle-archive`, payload);
    } catch (error) {
      console.error("Error toggling conversation archive status:", error);
      throw error;
    }
  }, []);
};