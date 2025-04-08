import React, { useState } from "react";
import uploadFileIcon from "../../../../../assets/icons/uploadSheetIcon.svg";

const MAX_FILE_SIZE_MB = 50;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

type Props = {
  uploadingFile: File | null;
  setUploadingFile: (file: File | null) => void;
  isLoginProfile?: boolean;
};

const FileDropper = (props: Props) => {
  const { 
    uploadingFile, 
    setUploadingFile, 
    isLoginProfile 
  } = props;
  
  const [errorMessage, setErrorMessage] = useState<string>("");
  
  const validateFile = (file: File) => {
    setErrorMessage("");

    if (!file.type.startsWith("audio/")) {
      setErrorMessage(`"${file.name}" is not an audio file.`);
      return null;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setErrorMessage(`"${file.name}" exceeds the 50MB limit.`);
      return null;
    }

    return file;
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setErrorMessage("");

    const droppedFile = e.dataTransfer.files[0];
    const validFile = validateFile(droppedFile);

    if (validFile) {
      setUploadingFile(validFile);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage("");
    const selectedFile = e.target.files ? e.target.files[0] : null;
    const validFile = selectedFile ? validateFile(selectedFile) : null;
    if (validFile) {
      setUploadingFile(validFile);
    }
    e.target.value = "";
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className={`${uploadingFile
          ? "border-2 border-[#0185FF] border-solid"
          : "border border-coolGray border-dashed"
        } bg-richBlack text-center my-3 rounded-lg`}
    >
      <input
        accept="audio/*"
        type="file"
        onChange={handleFileUpload}
        className="hidden"
        id="file-upload"
      />

      <label
        htmlFor="file-upload"
        className="cursor-pointer flex flex-col gap-2 items-center px-5 py-5"
      >
        <div className="md:w-[74px] w-[33px] h-[41px] md:h-[88px]">
          <img
            src={uploadFileIcon}
            alt="uploadFileIcon"
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <div className=" flex md:flex-row flex-col">
            <span className="text-softGray font-semibold md:text-sm text-[10px] underline">
              Click to upload
            </span>
            <span className="text-coolGray md:text-sm text-[10px]  font-normal">
              {" "}
              or drag and drop
            </span>
          </div>

          <p className="md:text-sm text-[10px] text-dimGray font-normal">
            Maximum file size 50MB.
          </p>
          {!isLoginProfile &&
            <p className="text-red-300 text-base">Only ".WAV" and ".MP3"</p>
          }
        </div>

        {(errorMessage || uploadingFile) && (
          <div className="mt-4">
            {errorMessage && (
              <div className="text-red-500 text-sm">{errorMessage}</div>
            )}

            {uploadingFile && (
              <div className="text-coolGray text-sm font-normal">
                {uploadingFile.name}
              </div>
            )}
          </div>
        )}
      </label>
    </div>
  );
};

export default FileDropper;
