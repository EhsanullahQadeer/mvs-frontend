import axiosInstance from "api/axios";

interface UploadOptions {
  onProgress?: (progress: number) => void;
  onComplete?: (key: string) => void;
  onError?: (error: Error) => void;
  directory?: 'audio' | 'images';
  setFileS3Key?: (key: string) => void;
  setUploadProgress?: (progress: number) => void;
}

export async function uploadContent(file: File, options: UploadOptions = {}) { 
  try {
    const fileInfo = {
      originalname: file.name,
      mimetype: file.type,
      size: file.size,
      directory: options.directory || (file.type.startsWith('audio/') ? 'audio' : 'images')
    };

    const { url, key, expires_in, max_size } = await axiosInstance
      .post('users/content/upload', fileInfo)
      .then(res => res.data);

    if (file.size > max_size) {
      const error = new Error(`File size exceeds maximum allowed size of ${max_size / (1024 * 1024)}MB`);
      options.onError?.(error);
      throw error;
    }

    return new Promise<{ xhr: XMLHttpRequest, key: string }>((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded * 100) / event.total);
          options.onProgress?.(percentComplete);
          options.setUploadProgress?.(percentComplete);
        }
      });
      xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
          options.onComplete?.(key);
          options.setFileS3Key?.(key);
          resolve({ xhr, key });
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
    });
  } catch (error) {
    const err = error instanceof Error ? error : new Error('Upload failed');
    options.onError?.(err);
    throw err;
  }
}