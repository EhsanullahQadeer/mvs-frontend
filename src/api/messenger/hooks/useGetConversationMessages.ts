import { useCallback } from "react";
import { IMessage } from "api/messenger/objects/states.types";
import axiosInstance from "api/axios";

export interface IGetConversationMessages {
  conversationId: string;
  limit: number;
  cursor: number;
}

export const useGetConversationMessages = (
  setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>
) => {
  return useCallback(async (payload: IGetConversationMessages): Promise<void> => {
    try {
      const response = await axiosInstance.get(`/messenger/conversation/${payload.conversationId}`, { 
        params: { payload } 
      });
      console.log('useGetConversationMessages', response);
      setMessages(response.data?.results.messages || []);
    } catch (error) {
      console.error("Error fetching conversation messages:", error);
      throw error;
    }
  }, [setMessages]);
};