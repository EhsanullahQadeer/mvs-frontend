import { useCallback } from "react";
import axiosInstance from "api/axios";
import { INotes } from "../objects/states.types";

export interface IAddConversationNote {
  conversationId: number;
  noteContent: string;
}

export const useAddConversationNote = (
  setConversationNotes?: React.Dispatch<React.SetStateAction<INotes[]>>
) => {  
  return useCallback(async (payload: IAddConversationNote) => {
    try {
      await axiosInstance.post(`/messenger/notes`, payload);
    } catch (error) {
      console.error("Error adding conversation note:", error);
      throw error;
    }
  }, [setConversationNotes]);
};