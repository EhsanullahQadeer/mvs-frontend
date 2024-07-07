/*************************************************************************
 * @file index.ts
 * @author End Quote
 * @desc Provides API functions for sound-related operations.
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* LOCAL IMPORTS */
import axiosInstance from '../axios';

export async function getSoundAPI(id: any) {
  return axiosInstance.get(`/sounds/${id}`);
}

export async function getLikedSamplesAPI(params: any) {
  return axiosInstance.get('/sounds/likes', { params });
}

export async function getDownloadedSamplesAPI(params: any) {
  return axiosInstance.get('/sounds/downloads', { params });
}

export async function getSoundSamplesAPI(id: any, params: any) {
  return axiosInstance.get(`/sounds/samples/${id}`, { params });
}

export async function getSampleDownloadsAPI(id: any, params: any) {
  return axiosInstance.get(`/sounds/sample/${id}/downloads`, { params });
}

export async function sampleLikeAPI(id: any) {
  return axiosInstance.post(`/sounds/sample/${id}/like`);
}

export async function submitSplitSheetRequestAPI(params: any) {
  return axiosInstance.post('/sounds/request/sheet/submit', params);
}

export async function sampleUnlikeAPI(id: any) {
  return axiosInstance.post(`/sounds/sample/${id}/unlike`);
}

export async function saveSampleDownloadAPI(id: any) {
  return axiosInstance.post(`/sounds/sample/${id}/download`);
}
