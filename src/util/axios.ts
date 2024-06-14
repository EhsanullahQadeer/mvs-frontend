// src/util/axios.ts
import axios from 'axios';
import cookie from 'js-cookie';
import config from '../config/config'; // Adjust the path as necessary

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: config.defaults.api_url, // Use the base URL from the config
  headers: {
    'Content-Type': 'application/json',
  },
});

// Set up the request interceptor
axiosInstance.interceptors.request.use(
  async (config: any) => {
    const token = localStorage.getItem('token') || cookie.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Export the Axios instance with the name 'axios'
export default axiosInstance as typeof axios;
