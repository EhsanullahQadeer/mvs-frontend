import { useCallback } from "react";
import axiosInstance from "api/axios";

export interface IAddReaction {
  messageId: number;
  emoji: string;
}

export const useAddReactionMessage = () => {
  return useCallback(async (payload: IAddReaction): Promise<any> => {
    try {
      await axiosInstance.post(`messenger/message/reactions/${payload.messageId}`, { emoji: payload.emoji });
    } catch (error) {
      console.error("Error adding a reaction:", error);
      throw error;
    }
  }, []);
};
