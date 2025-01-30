/* eslint-disable react-hooks/exhaustive-deps */

import DropFilesSection from "./components/DropFilesSection";
import AttachedFilesSection from "./components/AttachedFilesSection";
import UploadingFilesSection from "./components/UploadingFilesSection";
import { useEffect, useState } from "react";
import { cancelUploadAPI, uploadFile } from "api/sounds";
import { CircularProgress } from "@mui/material";
import { currentUserAPI } from "api/auth";
import { useDispatch } from "react-redux";
import { popBreadcrumb, setBreadcrumbs } from "redux/actions/breadcrumb.actions";

type Props = {};

const ContentManagement = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [currentUserInfo, setCurrentUserInfo] = useState(null);
  const [uploadingFile, setUploadingFile] = useState<File>(null);
  const [fileRedisKey, setFileRedisKey] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [updateData,setUpdateData] = useState(0);

  const handleCancel = () => {
    // const response = cancelUploadAPI(fileRedisKey);
    setUploadProgress(0);
    setUploadingFile(null);
    setFileRedisKey("");
  };
  
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(
        setBreadcrumbs([
          { name: 'Settings', path: '/settings' },
          { name: 'Content Management', path: '/settings/content-management' }
        ]));
        return () => {
          // Pop current breadcrumb on unmount
          dispatch(popBreadcrumb());
        }; 
    }, [dispatch]);

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
    <>
      {currentUserInfo &&
      (<div>
        <h2 className="text-white px-3 py-4 text-xl font-semibold border-b border-eclipseGray">
          Content Management
        </h2>

        <div className="px-3">
          <DropFilesSection
            {...{
              uploadingFile, 
              setUploadingFile,
              currentUserInfo
            }} 
          />
          {uploadingFile && (
            <UploadingFilesSection
              {...{
                uploadingFile,
                fileRedisKey,
                uploadProgress,
                handleCancel,
                currentUserInfo,
                setUpdateData,
              }}
            />
          )}
          <AttachedFilesSection {...{ setLoading, currentUserInfo, updateData }} />
        </div>
      </div>)
      }

      {loading && (
        <>
          <div className="absolute top-0 left-0 z-50 bg-black opacity-40 pointer-events-none w-full h-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999px]">
            <CircularProgress
              sx={{
                width: "80px !important",
                height: "80px !important",
                color: "#9EFF00",
              }}
            />
          </div>
        </>
      )}
    </>
  );
};

export default ContentManagement;
