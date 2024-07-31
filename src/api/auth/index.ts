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

export async function resetPasswordAPI(data: any) {
  return axiosInstance.post('/auth/confirm/password', data);
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