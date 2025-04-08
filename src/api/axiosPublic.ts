import axios from "axios";
import { config } from "../config/ConfigManager";

const axiosPublic = axios.create({
  baseURL: config.get("API"),
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add response interceptor if needed
axiosPublic.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error(`Public API error: ${error.response.statusText}`);
    }
    return Promise.reject(error);
  }
);

export default axiosPublic;
