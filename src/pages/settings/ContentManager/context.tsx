// src/contexts/ContentUploadContext.tsx
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { uploadContent } from "shared/utils/uploadContent";

interface ContentManagerContextType {
  uploadingFile: File | null;
  editingFile: File | null;
  fileS3Key: string;
  uploadProgress: number;
  setUploadingFile: (file: File | null) => void;
  handleCancelUpload: () => void;
}

const ContentManagerContext = createContext<ContentManagerContextType | undefined>(undefined);

export function ContentManagerProvider({ children }: { children: React.ReactNode }) {
  const [uploadRequest, setUploadRequest] = useState<XMLHttpRequest | null>(null);
  const [uploadingFile, setUploadingFile] = useState<File | null>(null);
  const [editingFile, setEditingFile] = useState<File | null>(null);
  const [fileS3Key, setFileS3Key] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleCancelUpload = async () => {
    console.log('canceling upload')
    if (uploadRequest) {
      uploadRequest.abort();
      setUploadRequest(null);
    }
    setUploadProgress(0);
    setUploadingFile(null);
    setFileS3Key("");
  };

  const handleUploadFile = useCallback(async () => {
    try {
      if (uploadingFile) {
        const { xhr } = await uploadContent(uploadingFile, {
          setFileS3Key,
          setUploadProgress,
          onError: () => setUploadRequest(null)
        });
        setUploadRequest(xhr);
      }
    } catch (error) {
      setUploadRequest(null);
    }
  }, [uploadingFile, setFileS3Key, setUploadProgress]);

  useEffect(() => {
    if (uploadingFile) {
      handleUploadFile();
    }
  }, [uploadingFile, handleUploadFile]);

  const value = {
    uploadingFile,
    editingFile,
    fileS3Key,
    uploadProgress,
    setUploadingFile,
    handleCancelUpload,
  };

  return (
    <ContentManagerContext.Provider value={value}>
      {children}
    </ContentManagerContext.Provider>
  );
}

export function useContentManager() {
  const context = useContext(ContentManagerContext);
  if (context === undefined) {
    throw new Error('useContentManager must be used within a ContentManagerProvider');
  }
  return context;
}