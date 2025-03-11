import { useCallback } from "react";
import axiosInstance from "api/axios";
import { IConversation } from "../../../pages/Inbox/components/types";

export interface IGetConversations {
  ascending: boolean;
  skip: number;
  take: number;
  afterDate?: string | null;
  sortByTime: boolean;
  hasActiveIcebreaker: boolean;
  conversationType: string;
  getArchived: boolean;
  getSpam: boolean;
  getFavorited: boolean;
}

export const useGetConversations = (
  setConversations: React.Dispatch<React.SetStateAction<IConversation[]>>,
  setTotalConversations: React.Dispatch<React.SetStateAction<number>>
) => {
  return useCallback(async (payload: IGetConversations) => {
    try {
      const response = await axiosInstance.get(`messenger/conversations`, { params: payload });
      console.log("response, ", response);
      console.log("Length, ", response.data?.conversations.length);
      setConversations(response.data?.conversations || []);
      setTotalConversations(response.data?.pagination.total || 0);
    } catch (error) {
      console.error("Error fetching conversations:", error);
      throw error;
    }
  }, [setConversations, setTotalConversations]);
};