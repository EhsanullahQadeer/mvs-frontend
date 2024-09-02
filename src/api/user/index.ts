/*************************************************************************
 * @file index.ts
 * @author End Quote
 * @desc Provides API functions for user-related operations.
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* LOCAL IMPORTS */
import axiosInstance from '../axios';
import { IgetUsersByTagParms } from './types';

export async function requestInvitationCodeWithEmailAPI(data: any) {
  return axiosInstance.post('/users/request/access', data);
}

export async function checkUsernameAvailabilityAPI(username: string) {
  return axiosInstance.post(`/users/validate-username?username=${username}`);
}

export async function validateEmailAPI(email?: string) {
  return axiosInstance.post(`/users/validate-email?email=${email}`);
}

export async function verifyCodeAPI(data: any) {
  return axiosInstance.post('/users/verify/code', data);
}

export async function redirectUserAPI(data: any) {
  return axiosInstance.post('/users/redirect', data);
}

export async function createNewUserAPI(params: any) {
  return axiosInstance.post('/users/new', params);
}

export async function updateUserAPI(params: any, id: any) {
  return axiosInstance.post(`/users/update/${id}`, params);
}

export async function updateUserPasswordAPI(params: any) {
  return axiosInstance.post('/users/update/password', params);
}

export async function verifyCouponAPI(params: any) {
  return axiosInstance.post('/user/confirm/coupon', params);
}

export async function confirmSignupAPI(params: any) {
  return axiosInstance.post('/user/confirm/signup', params);
}
export async function getUsersByTag(params: IgetUsersByTagParms) {
  return axiosInstance.get(`/users/by-tag`, { params });
}
