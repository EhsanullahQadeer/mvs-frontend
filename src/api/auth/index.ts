/*************************************************************************
 * @file index.ts
 * @author End Quote
 * @desc Provides API functions for authentication-related operations.
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* LOCAL IMPORTS */
import axiosInstance from '../axios';

/* POST */
export async function registerAPI(params: any) {
  return axiosInstance.post('/auth/register', params);
}

export async function confirmCodeAPI(params: any) {
  return axiosInstance.post('/auth/confirm', params);
}

export async function resendCodeAPI(params: any) {
  return axiosInstance.post('/auth/resend/code', params);
}

export async function sendVerificationEmailAPI(data: any) {
  return axiosInstance.post('/auth/send-email-address-verification-email', data);
}

export async function updateUserPassword(userData: {
  email: string;
  newPassword: string;
}): Promise<{ errorCode?: string; message?: string; error?: boolean }> {
  try {
    const response = await axiosInstance.post('/auth/update/user-password', userData);
    return response.data; // Ensure the backend sends a proper response with errorCode
  } catch (error) {
    if (error.response && error.response.data) {
      return {
        error: true,
        errorCode: error.response.data.errorCode, // This should come from the backend
        message: error.response.data.message,
      };
    } else {
      return {
        error: true,
        message: 'An unknown error occurred',
      };
    }
  }
}

export async function forgotPasswordAPI(data: any) {
  return axiosInstance.post('/auth/forgot/password', data);
}

export async function confirmEmailAPI(data: any) {
  return axiosInstance.post('/auth/confirm', data);
}

/* GET */
export async function currentUserAPI() {
  return axiosInstance.get('/auth/me');
}

/* PUT */
export async function updateProfileAPI(data: any) {
  return axiosInstance.put('/auth/profile', data);
}

export async function changePasswordAPI(data: any) {
  return axiosInstance.put('/auth/change-password', data);
}

export async function verifyEmailAPI(data: any) {
  return axiosInstance.put('/auth/verify-email', data);
}