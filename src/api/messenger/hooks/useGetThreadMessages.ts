import { useCallback } from "react";
import axiosInstance from "api/axios";
import { IMessage } from "../objects/states.types";

export interface IGetThreadMessages {
  parentMessageId: number;
}

export const useGetThreadMessages = (
  setThreadMessages: React.Dispatch<React.SetStateAction<IMessage[]>>,
) => {
  return useCallback(async (payload: IGetThreadMessages): Promise<void> => {
    try {
      const response = await axiosInstance.get(`/messenger/thread`, { params: payload });
      console.log("thread response", response);
      setThreadMessages(response.data?.messages || []);
    } catch (error) {
      console.error("Error getting thread messages:", error);
      throw error;
    }
  }, []);
};