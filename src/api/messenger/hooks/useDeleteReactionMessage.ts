import { useCallback } from "react";
import axiosInstance from "api/axios";

export interface IDeleteReaction {
  messageId: number;
  emoji: string;
}

export const useDeleteReactionMessage = () => {
  return useCallback(async (payload: IDeleteReaction): Promise<any> => {
    try {
      await axiosInstance.delete(`messenger/message/reactions/${payload.messageId}`, { data: { emoji: payload.emoji } });
    } catch (error) {
      console.error("Error deleting a reaction:", error);
      throw error;
    }
  }, []);
};
