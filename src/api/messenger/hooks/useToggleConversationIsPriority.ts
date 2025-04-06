import { useCallback } from "react";
import axiosInstance from "api/axios";

export interface IToggleConversationIsPriority {
  conversationIds: number[];
}

export const useToggleConversationIsPriority = () => {
  return useCallback(async (payload: IToggleConversationIsPriority): Promise<any> => {
    try {
      await axiosInstance.post(`/messenger/conversations/toggle-priority`, payload);
    } catch (error) {
      console.error("Error toggling conversation priority status:", error);
      throw error;
    }
  }, []);
};