import { useCallback } from "react";
import axiosInstance from "api/axios";
import { IMessage } from "../objects/states.types";

export interface ISendMessage {
  conversationId: string;
  message: string;
  messageType: string;
  audioMediaId?: number | null;
  creditPaymentAmount?: number | null;
  stripePaymentIntentId?: string | null;
}

export const useSendMessage = (
  setMessages: React.Dispatch<React.SetStateAction<IMessage[]>>,
) => {
  return useCallback(async (payload: ISendMessage): Promise<void> => {
    try {
      const response = await axiosInstance.post('/messenger/message', payload);
      if (response.data?.results?.message) {
        setMessages(prevMessages => [...(prevMessages || []), response.data.results.message]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  }, [setMessages]);
};