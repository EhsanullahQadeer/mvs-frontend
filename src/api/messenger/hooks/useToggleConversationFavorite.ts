import { useCallback } from "react";
import axiosInstance from "api/axios";

export interface IToggleConversationFavorite {
  conversationId: string;
}

export const useToggleConversationFavorite = (
  setFavoriteConversationIds?: React.Dispatch<React.SetStateAction<string[]>>
) => {
  return useCallback(async (payload: IToggleConversationFavorite) => {
    try {
      await axiosInstance.post(`/messenger/conversation/favorite`, payload);
    } catch (error) {
      console.error("Error toggling conversation favorite status:", error);
      throw error;
    }
  }, [setFavoriteConversationIds]);
};