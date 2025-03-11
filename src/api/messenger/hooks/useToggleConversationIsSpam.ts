import { useCallback } from "react";
import axiosInstance from "api/axios";

export interface IToggleConversationIsSpam {
  conversationIds: number[];
}

export const useToggleConversationIsSpam = () => {
  return useCallback(async (payload: IToggleConversationIsSpam): Promise<any> => {
    try {
      console.log('Trying to mark convo as spam');
      await axiosInstance.post(`/messenger/conversations/toggle-spam`, payload);
    } catch (error) {
      console.error("Error toggling conversation spam status:", error);
      throw error;
    }
  }, []);
};
