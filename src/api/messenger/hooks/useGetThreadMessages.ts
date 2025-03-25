import { useCallback } from "react";
import axiosInstance from "api/axios";
import { IMessage } from "../objects/states.types";

export interface IGetThreadMessages {
  parentMessageId: number;
  limit?: number;
  cursor?: number;
}

export interface ThreadMessagesResponse {
  message: string;
  results: {
    messages: IMessage[];
    parentMessageId: number;
    cursor: number | null;
    totalCount: number;
    hasMore: boolean;
  };
}

export const useGetThreadMessages = (
  setThreadMessages: React.Dispatch<React.SetStateAction<IMessage[]>>,
) => {
  return useCallback(async (payload: IGetThreadMessages): Promise<ThreadMessagesResponse> => {
    try {
      const response = await axiosInstance.get<ThreadMessagesResponse>(`/messenger/thread`, {
        params: {
          parentMessageId: payload.parentMessageId,
          limit: payload.limit || 20,
          cursor: payload.cursor,
        }
      });

      setThreadMessages(prevMessages => 
        payload.cursor ? [...prevMessages, ...response.data.results.messages] : response.data.results.messages
      );

      return response.data;
    } catch (error) {
      console.error("Error getting thread messages:", error);
      throw error;
    }
  }, []);
};