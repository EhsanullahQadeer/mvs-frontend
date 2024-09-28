/*************************************************************************
 * @file CustomFileDropper.tsx
 * @author Ehsanullah Qadeer
 * @desc  This is the component for uploading files.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/
import React, { useState } from "react";
import uploadFileIcon from "../../../../assets/icons/uploadSheetIcon.svg";

const MAX_FILE_SIZE_MB = 50;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

type Props = {
  files: File[];
  setFiles: (event: any) => void;
};

const CustomFileDropper = (props: Props) => {
  const { files, setFiles } = props;

  const [errorMessage, setErrorMessage] = useState<string>("");

  const validateFiles = (selectedFiles: File[]) => {
    const validFiles: File[] = [];

    selectedFiles.forEach((file) => {
      const isDuplicate = files.some(
        (existingFile) =>
          existingFile.name === file.name && existingFile.size === file.size
      );

      if (isDuplicate) {
        setErrorMessage(`"${file.name}" has already been selected.`);
        return;
      }

      if (file.type.startsWith("audio/")) {
        if (file.size <= MAX_FILE_SIZE_BYTES) {
          validFiles.push(file);
        } else {
          setErrorMessage(`"${file.name}" exceeds the 50MB limit.`);
        }
      } else {
        setErrorMessage(`"${file.name}" is not an audio file.`);
      }
    });

    return validFiles;
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setErrorMessage("");

    const droppedFiles = Array.from(e.dataTransfer.files);
    const validDroppedFiles = validateFiles(droppedFiles);
    setFiles((prevFiles) => [...prevFiles, ...validDroppedFiles]);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage("");

    const selectedFiles = Array.from(e.target.files || []);
    const validUploadedFiles = validateFiles(selectedFiles);
    setFiles((prevFiles) => [...prevFiles, ...validUploadedFiles]);

    e.target.value = "";
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="border border-dashed border-coolGray bg-richBlack text-center my-3 rounded-lg"
    >
      <input
        accept="audio/*"
        type="file"
        onChange={handleFileUpload}
        className="hidden"
        id="file-upload"
        multiple
      />

      <label
        htmlFor="file-upload"
        className="cursor-pointer flex flex-col gap-2 items-center px-5 py-10"
      >
        <div className="w-[74px] h-[88px]">
          <img
            src={uploadFileIcon}
            alt="uploadFileIcon"
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <div className="mb-2">
            <span className="text-softGray font-semibold text-sm underline">
              Click to upload
            </span>
            <span className="text-coolGray text-sm font-normal">
              {" "}
              or drag and drop
            </span>
          </div>

          <p className="text-sm text-dimGray font-normal">
            Maximum file size 50MB.
          </p>
        </div>

        {(errorMessage || files.length > 0) && (
          <div className="mt-4">
            {errorMessage && (
              <div className="text-red-500 text-sm">{errorMessage}</div>
            )}

            {files.length > 0 && (
              <div className="">
                <ul className="text-coolGray text-sm font-normal">
                  {files.map((file, idx) => (
                    <li key={idx}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </label>
    </div>
  );
};

export default CustomFileDropper;
