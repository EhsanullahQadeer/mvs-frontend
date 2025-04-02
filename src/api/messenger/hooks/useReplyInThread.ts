import { useCallback } from "react";
import axiosInstance from "api/axios";
import { IMessage } from "../objects/states.types";

export interface IReplyInThread {
  parentMessageId: number;
  replyContent: string;
  audioMediaId?: number;
}

export const useReplyInThread = (
  setThreadMessages: React.Dispatch<React.SetStateAction<IMessage[]>>,
) => {
  return useCallback(async (payload: IReplyInThread): Promise<void> => {
    try {
      const response = await axiosInstance.post('/messenger/message/reply', payload);
      if (response.data?.replyMessage) {
        setThreadMessages(prevMessages => [...(prevMessages || []), response.data.replyMessage]);
      }
      return response.data;
    } catch (error) {
      console.error("Error replying in thread:", error);
      throw error;
    }
  }, [setThreadMessages]);
};


