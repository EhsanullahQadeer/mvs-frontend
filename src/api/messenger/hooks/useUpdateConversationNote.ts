import { useCallback } from "react";
import axiosInstance from "api/axios";

export interface IUpdateConversationNote {
  noteId: number;
  content: string;
}

export const useUpdateConversationNote = () => {
  return useCallback(async (payload: IUpdateConversationNote) => {
    try {
      const response = await axiosInstance.put(`/messenger/notes?noteId=${payload.noteId}&content=${payload.content}`);
    } catch (error) {
      console.error("Error updating conversation note:", error);
      throw error;
    }
  }, []);
};
