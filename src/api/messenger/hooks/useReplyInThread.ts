import { useCallback } from "react";
import axiosInstance from "api/axios";

export interface IReplyInThread {
  parentMessageId: number;
  replyContent: string;
  audioMediaId?: number;
}

export const useReplyInThread = () => {
  return useCallback(async (payload: IReplyInThread): Promise<void> => {
    try {
      console.log('useReplyInThread payload:', payload);
      const response = await axiosInstance.post('/messenger/message/reply', payload);
      return response.data;
    } catch (error) {
      console.error("Error replying in thread:", error);
      throw error;
    }
  }, []);
};


