import { useCallback } from "react";
import { IMessage } from "api/messenger/objects/states.types";
import axiosInstance from "api/axios";

export interface ISearchMessagesParams {
  searchTerm: string;
  skip?: number | null;
  take?: number | null;
}

export const useGetSearchMessages = (
  setSearchMessages: React.Dispatch<React.SetStateAction<IMessage[]>>,
  setTotalSearchMessages: React.Dispatch<React.SetStateAction<number>>
) => {
  return useCallback(async (payload: ISearchMessagesParams): Promise<void> => {
    try {
      if (!payload.searchTerm) {
        setSearchMessages([]);
        return;
      }
      console.log("useGetSearchMessages payload", payload);
      const response = await axiosInstance.get(`/messenger/search/messages`, { 
        params: payload 
      });
      console.log("useGetSearchMessages response", response);
      setSearchMessages(response.data?.messages || []);
      setTotalSearchMessages(response.data?.pagination.total || 0);
    } catch (error) {
      console.error("Error fetching conversation messages:", error);
      throw error;
    }
  }, [setSearchMessages]);
};