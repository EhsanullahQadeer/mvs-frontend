import { useCallback } from "react";
import axiosInstance from "api/axios";


export interface IToggleMessageRead {
  messageId: number[];
}

export const useToggleMessageIsRead = () => {
  return useCallback(async (payload: IToggleMessageRead): Promise<any> => {
    try {
      await axiosInstance.post('messenger/message/toggle-read', payload);
    } catch (error) {
      console.error("Error toggling message read status:", error);
      throw error;
    }
  }, []);
};
