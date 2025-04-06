import { useCallback } from "react";
import { INotes } from "../objects/states.types";
import axiosInstance from "api/axios";

export interface IGetConversationNotes {
  conversationId: number;
  ascending: boolean;
}

export const useGetConversationNotes = (
  setConversationNotes: React.Dispatch<React.SetStateAction<INotes[]>>,
) => {
  return useCallback(async (payload: IGetConversationNotes): Promise<void> => {
    try {
      const { data } = await axiosInstance.get(`messenger/notes`, { params: payload });
      setConversationNotes(data || []);
    } catch (error) {
      console.error("Error fetching conversation notes:", error);
      throw error;
    }
  }, [setConversationNotes]);
};