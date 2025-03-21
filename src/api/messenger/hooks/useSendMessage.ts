import { useCallback } from "react";
import axiosInstance from "api/axios";

export interface ISendMessage {
  conversationId: string;
  message: string;
  messageType: string;
  audioMediaId?: number | null;
  creditPaymentAmount?: number | null;
  stripePaymentIntentId?: string | null;
}

export const useSendMessage = () => {
  return useCallback(async (payload: ISendMessage): Promise<void> => {
    try {
      console.log("useSendMessage payload", payload);
      const response = await axiosInstance.post('/messenger/message', payload);
      console.log("useSendMessage response", response);
      return response.data;
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  }, []);
};