/*************************************************************************
 * @file UploadSampleSection.tsx
 * @author Ehsanullah Qadeer
 * @desc  This is the component for UploadSampleSection of the user while registeration.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

import { currentUserAPI } from "api/auth";
import { uploadFile } from "api/sounds";
import AttachedFilesSection from "pages/settings/content-management/components/AttachedFilesSection";
import DropFilesSection from "pages/settings/content-management/components/DropFilesSection";
import UploadingFilesSection from "pages/settings/content-management/components/UploadingFilesSection";
import { useEffect, useState } from "react";

type Props = {};

const UploadSampleSection = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [currentUserInfo, setCurrentUserInfo] = useState(null);
  const [uploadingFile, setUploadingFile] = useState<File>(null);
  const [fileRedisKey, setFileRedisKey] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const handleCancel = () => {
    setUploadProgress(0);
    setUploadingFile(null);
    setFileRedisKey("");
  };

  useEffect(() => {
    if (uploadingFile !== null) {
      handleUploadFile();
      if (fileRedisKey) {
        trackUploadProgress(fileRedisKey);
      }
    }
  }, [uploadingFile]);

  const handleUploadFile = async () => {
    try {
      const formData = new FormData();
      formData.append("file", uploadingFile);

      const uploadResponse = await uploadFile(formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          console.log(
            `Client-to-Backend Upload Progress: ${percentCompleted}%`
          );
          setUploadProgress(percentCompleted);
        },
      });
      setFileRedisKey(uploadResponse.data.redis_key);
    } catch (error) {
      console.log("error ", error);
    }
  };

  function trackUploadProgress(sessionId: string) {
    const eventSource = new EventSource(
      `${process.env.REACT_APP_API_URL}/sounds/upload/sample/progress/${sessionId}`
    );

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Event data received:", data);
      if (data.progress === 100) {
        console.log("Upload complete!");
        eventSource.close();
      } else if (data.progress === -1) {
        console.error("Upload failed!");
        eventSource.close();
      } else {
        console.log(`Progress: ${data.progress}%`);
      }
    };

    eventSource.onerror = (error) => {
      console.error("Error in EventSource:", error);
      eventSource.close();
    };
  }

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    try {
      const response = await currentUserAPI();
      setCurrentUserInfo(response.data);
      console.log("user info ", response);
    } catch (error) {
      console.error("Error in user info:", error);
    }
  };

  return (
    <div>
      <p className="text-sm font-normal text-mediumGray">
        This is how it works: Your profile and content remain private by
        default. Public users won’t be able to see your profile, but Partners
        can request access to unlock your content. By uploading samples, you’re
        not only securing your work but also setting up your profile for
        potential collaborations and opportunities.
      </p>
      <div className="mt-[40px]">
        <DropFilesSection {...{ uploadingFile, setUploadingFile }} />
        {uploadingFile && (
          <UploadingFilesSection
            {...{
              uploadingFile,
              fileRedisKey,
              uploadProgress,
              handleCancel,
              currentUserInfo,
            }}
          />
        )}
        <AttachedFilesSection {...{ setLoading, currentUserInfo }} />
      </div>
    </div>
  );
};

export default UploadSampleSection;
