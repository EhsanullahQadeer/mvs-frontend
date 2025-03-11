import { useCallback } from "react";
import axiosInstance from "api/axios";
import { IConversation } from "../../../pages/Inbox/components/types";

export interface IGetSpamConversations {
  skip: number;
  take: number;
}

export const useGetSpamConversations = (
  setConversations: React.Dispatch<React.SetStateAction<IConversation[]>>,
  setTotalConversations?: React.Dispatch<React.SetStateAction<number>>
) => {
  return useCallback(async (payload: IGetSpamConversations) => {
    try {
      const response = await axiosInstance.get(`/messenger/conversations/spam`, { params: payload });
      console.log('Get Spam Convo Response', response);
      setConversations(response?.data || []);
      return response.data;
    } catch (error) {
      console.error("Error fetching favorited conversations:", error);
      throw error;
    }
  }, [setConversations, setTotalConversations]);
};