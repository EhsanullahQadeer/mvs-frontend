import { useCallback } from "react";
import axiosInstance from "api/axios";
import { IMessage } from "api/messenger/objects/states.types";

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
        params: { limit: payload.limit, cursor: payload.cursor } 
      });
      setMessages(response.data?.results.messages.reverse() || []);
    } catch (error) {
      console.error("Error fetching conversation messages:", error);
      throw error;
    }
  }, [setMessages]);
};