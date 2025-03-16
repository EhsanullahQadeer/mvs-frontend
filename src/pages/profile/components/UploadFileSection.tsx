import { uploadFile } from "api/sounds";
import DropFilesSection from "pages/settings/content-management/components/DropFilesSection";
import UploadingFilesSection from "pages/settings/content-management/components/UploadingFilesSection";
import { useEffect, useState } from "react";

const UploadFileSection = (props) => {
  const { user } = props;
  const [currentUserInfo, setCurrentUserInfo] = useState(user);
  const [uploadingFile, setUploadingFile] = useState<File>(null);
  const [fileRedisKey, setFileRedisKey] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [updateData, setUpdateData] = useState(0);

  const handleCancel = () => {
    setUploadProgress(0);
    setUploadingFile(null);
    setFileRedisKey("");
  };

  function trackUploadProgress(sessionId: string) {
    const eventSource = new EventSource(
      `${process.env.REACT_APP_API_URL}/sounds/upload/sample/progress/${sessionId}`
    );

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
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
  useEffect(() => {
    if (uploadingFile !== null) {
      handleUploadFile();
      if (fileRedisKey) {
        trackUploadProgress(fileRedisKey);
      }
    }
  }, [uploadingFile]);

  return (
    <div>
      (
      <div>
        <div className="px-3">
          <DropFilesSection
            {...{
              uploadingFile,
              setUploadingFile,
              currentUserInfo,
            }}
            isLoginProfile={true}
          />

          {uploadingFile && (
            <UploadingFilesSection
              {...{
                uploadingFile,
                setUploadingFile,
                fileRedisKey,
                uploadProgress,
                handleCancel,
                currentUserInfo,
                setUpdateData,
              }}
              isLoginProfile={true}
            />
          )}
        </div>
      </div>
      )
    </div>
  );
};

export default UploadFileSection;
