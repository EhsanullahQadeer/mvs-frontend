/*************************************************************************
 * @file index.ts
 * @author End Quote
 * @desc Provides API functions for sound-related operations.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* LOCAL IMPORTS */
import axiosInstance from "../axios";
import { config } from "config/ConfigManager";
import { ISoundMetaData } from "pages/sample-page/SamplePage";

export async function getSoundAPI(id: any) {
  return axiosInstance.get(`/sounds/${id}`);
}

export async function getLikedSamplesAPI(params: any) {
  return axiosInstance.get("/sounds/likes", { params });
}

export async function getDownloadedSamplesAPI(params: any) {
  return axiosInstance.get("/sounds/downloads", { params });
}

export async function getSoundSamplesAPI(id: any, params: any) {
  return axiosInstance.get(`/sounds/samples/${id}`, { params });
}

export async function getSampleDownloadsAPI(id: any, params: any) {
  return axiosInstance.get(`/sounds/sample/${id}/downloads`, { params });
}

export async function getUserSamplesAPI(params: any) {
  return axiosInstance.get(`/sounds/get-user-samples`, { params });
}

export async function getUserSamplesByTypeAPI(params: any) {
  return axiosInstance.get(`/sounds/get-user-samples-by-type`, { params });
}



export async function getSoundMetaData(id: string, params: { code: String }): Promise<{ metadata: ISoundMetaData }> {
  const response = await axiosInstance.get<{ metadata: ISoundMetaData }>(`/sounds/metadata/${id}`, { params });
  return response.data;
}
export async function checkIfSoundHasPass(params: { code: String }): Promise<boolean> {
  const response = await axiosInstance.get<boolean>(`/sounds/sample/has-password`, { params });
  return response.data;
}

export async function soundStream(publicId: any, params: any) {
  const queryParams = new URLSearchParams(params).toString();

  const url = `${config.get("API")}/sounds/stream/${publicId}?${queryParams}`;

  return fetch(url);
}

export async function sampleLikeAPI(id: any) {
  return axiosInstance.post(`/sounds/sample/${id}/like`);
}

export async function submitSplitSheetRequestAPI(params: any) {
  return axiosInstance.post("/sounds/request/sheet/submit", params);
}

export async function sampleUnlikeAPI(id: any) {
  return axiosInstance.post(`/sounds/sample/${id}/unlike`);
}

export async function saveSampleDownloadAPI(id: any) {
  return axiosInstance.post(`/sounds/sample/${id}/download`);
}

export async function uploadAudioFile(
  selectedFile: File
): Promise<string | null> {
  if (!selectedFile) return null;
  const formData = new FormData();
  formData.append("file", selectedFile);

  try {
    const response = await axiosInstance.post(
      "/sounds/upload-audio-file",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data.fileUrl;
  } catch (error) {
    console.error("Error uploading file:", error);
    return null;
  }
}

export async function uploadFile(payload: any, configs: any) {
  return axiosInstance.post("/sounds/upload/sample", payload, configs);
}

export async function uploadedFileMetadata(redisKey: string, payload: any) {
  return axiosInstance.post(
    `/sounds/sample/${redisKey}/save-metadata`,
    payload
  );
}

export async function soundPublicUrl(id: number, payload: any) {
  return axiosInstance.post(`/sounds/public-url/${id}`, payload);
}

export async function updateFileMetadata(id: any, payload: any) {
  return axiosInstance.put(`/sounds/sample/${id}`, payload);
}

export async function deleteSampleAPI(id: any) {
  return axiosInstance.delete(`/sounds/delete/${id}`);
}

export async function getSamplePublicUrl(uniqueId: string) {
  return axiosInstance.get(`/sounds/sample/${uniqueId}/public-url`);
}

export async function updateSampleSettings(sampleId: string, settings: any) {
  return axiosInstance.put(`/sounds/sample/${sampleId}/settings`, settings);
}

export async function setSamplePassword(sampleId: string, password: string) {
  return axiosInstance.put(`/sounds/sample/${sampleId}/password`, { password });
}

export async function getSamplePassword(sampleId: string) {
  return axiosInstance.get(`/sounds/sample/${sampleId}/password`);
}
