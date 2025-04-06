import { useCallback } from "react";
import axiosInstance from "api/axios";
import { toast } from "react-toastify";

export interface IDeleteConversations {
  conversationIds: number[];
}

export const useDeleteConversations = (
  onSuccess?: () => void,
  onError?: (error: any) => void
) => {
  return useCallback(async (payload: IDeleteConversations): Promise<void> => {
    try {
      const response = await axiosInstance.delete(`/messenger/conversations`, { 
        data: payload 
      });
      
      if (response.status === 200) {
        toast.success("Conversations deleted successfully");
        if (onSuccess) {
          onSuccess();
        }
      } else {
        throw new Error("Failed to delete conversations");
      }
    } catch (error) {
      toast.error("Error deleting conversations");
      console.error("Error deleting conversations:", error);
      if (onError) {
        onError(error);
      }
      throw error;
    }
  }, [onSuccess, onError]);
};