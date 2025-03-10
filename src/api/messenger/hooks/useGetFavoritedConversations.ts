import { useCallback } from "react";
import { IConversation } from "../../../pages/Inbox/components/types";
import axiosInstance from "api/axios";

export interface IGetFavoritedConversations {
  skip: number;
  take: number;
}

export const useGetFavoritedConversations = (
  setConversations: React.Dispatch<React.SetStateAction<IConversation[]>>,
  setTotalConversations?: React.Dispatch<React.SetStateAction<number>>
) => {
  return useCallback(async (payload: IGetFavoritedConversations) => {
    try {
      console.log('payload', payload);
      const response = await axiosInstance.get(`/messenger/conversations/favorited`, { params: payload });
      console.log('response', response);
      setConversations(response.data?.results?.conversations || []);
      return response.data;
    } catch (error) {
      console.error("Error fetching favorited conversations:", error);
      throw error;
    }
  }, [setConversations, setTotalConversations]);
};