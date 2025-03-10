import { useCallback } from "react";
import axiosInstance from "api/axios";
import { IToggleMessageRead } from "../objects/api.interfaces";
import { toggleMessageRead } from "../index";


export const useToggleMessageIsRead = () => {
  return useCallback(async (payload: IToggleMessageRead): Promise<any> => {
    try {
      await toggleMessageRead(payload);
    } catch (error) {
      console.error("Error toggling message read status:", error);
      throw error;
    }
  }, []);
};
