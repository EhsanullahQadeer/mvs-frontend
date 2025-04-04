import { useCallback } from "react";
import axiosInstance from "api/axios";

export interface IDeleteMessage {
  messageId: number;
}

export const useDeleteMessage = () => {
  return useCallback(async (payload: IDeleteMessage): Promise<any> => {
    try {
      const response = await axiosInstance.delete(`/messenger/message/${payload.messageId}`);
      return { data: response.data };
    } catch (error) {
      throw error;
    }
  }, []);
};