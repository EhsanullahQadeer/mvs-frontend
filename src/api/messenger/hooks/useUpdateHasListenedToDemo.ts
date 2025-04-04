import { useCallback } from "react";
import axiosInstance from "api/axios";

export interface IUpdatePlayedThrough {
  mediaId: number;
}

export const useUpdateHasListenedToDemo = () => {
  return useCallback(async (payload: IUpdatePlayedThrough): Promise<void> => {
    try {
      const response = await axiosInstance.post('/messenger/media/played', payload);
    } catch (error) {
      console.error("Error updating play_through flag: ", error);
      throw error;
    }
  }, []);
};
