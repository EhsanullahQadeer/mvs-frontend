/*************************************************************************
 * @file axios.ts
 * @author End Quote
 * @desc Axios instance with request and response interceptors.
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* IMPORTS */
import axios from 'axios';
import cookie from 'js-cookie';

/* LOCAL IMPORTS */
import { config } from '../config/ConfigManager';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: config.get('API'), // Use the base URL from the config
  headers: {
    'Content-Type': 'application/json',
  },
});

// Set up the request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
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

// Optional: Set up response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors globally
    if (error.response) {
      // Handle specific status codes if necessary
      switch (error.response.status) {
        case 401:
          // Handle unauthorized errors
          console.error('Unauthorized, logging out...');
          // Optionally, redirect to login page
          break;
        // Add more cases if needed
        default:
          console.error(`API error: ${error.response.statusText}`);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
