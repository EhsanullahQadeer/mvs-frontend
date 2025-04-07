import axiosInstance from "api/axios";
import { useState } from "react";

import { useRef } from "react";

interface UploadOptions {
  onProgress?: (progress: number) => void;
  onComplete?: (key: string) => void;
  onError?: (error: Error) => void;
}

export async function uploadContent(file: File, options: UploadOptions = {}) {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('directory', file.type.startsWith('audio/') ? 'audio' : 'images');

    const { url, key } = await axiosInstance
      .post('users/content/upload', formData)
      .then(res => res.data);

    return new Promise<string>((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded * 100) / event.total);
          options.onProgress?.(percentComplete);
        }
      });

      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          options.onComplete?.(key);
          resolve(key);
        } else {
          const error = new Error(`Upload failed with status: ${xhr.status}`);
          options.onError?.(error);
          reject(error);
        }
      });

      xhr.addEventListener('error', () => {
        const error = new Error('Upload failed');
        options.onError?.(error);
        reject(error);
      });

      xhr.addEventListener('abort', () => {
        const error = new Error('Upload aborted');
        options.onError?.(error);
        reject(error);
      });

      xhr.open('PUT', url);
      xhr.setRequestHeader('Content-Type', file.type);
      xhr.send(file);

      return xhr;
    });
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Upload failed');
    options.onError?.(err);
    throw err;
  }
}