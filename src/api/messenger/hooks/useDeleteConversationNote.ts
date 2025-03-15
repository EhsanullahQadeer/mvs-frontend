import { useCallback } from "react";
import axiosInstance from "api/axios";

export interface IDeleteConversationNote {
  noteId: number;
}

export const useDeleteConversationNote = () => {
  return useCallback(async (payload: IDeleteConversationNote) => {
    try {
      const response = await axiosInstance.delete(`/messenger/notes/`, {params: payload});
      console.log("response", response);
    } catch (error) {
      console.error("Error deleting conversation note:", error);
      throw error;
    }
  }, []);
};
