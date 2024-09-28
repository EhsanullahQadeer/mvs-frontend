/*************************************************************************
 * @file UploadingFilesSection.tsx
 * @author Ehsanullah Qadeer
 * @desc  This is the main wrapper for the files that are uploading.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

import React, { useEffect, useState } from "react";
import waveformIcon from "../../../../assets/icons/waveformIcon.svg";
import { ReactComponent as CancelIcon } from "../../../../assets/icons/cancelIcon.svg";
import UploadingFileMetaData from "./UploadingFileMetaData";
import { Form, Formik } from "formik";
import { composersArr } from "../sample-data/sampleData";
import ContributersTable from "./ContributersTable";

type Props = {
  files: File[];
  setFiles: (event: any) => void;
};

const UploadingFilesSection = (props: Props) => {
  const { files, setFiles } = props;
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedComposer, setSelectedComposer] = useState([composersArr[0]]);
  const [privacyValue, setPrivacyValue] = useState("private");
  const [midiFile, setMidiFile] = useState(null);

  function formatFileSize(sizeInBytes: number): string {
    const sizeInMB = sizeInBytes / (1024 * 1024);
    return `${sizeInMB.toFixed(0)} Mb`;
  }

  const handleDeleteFile = (fileToDelete) => {
    const updatedFiles = files.filter(
      (file) => file.name !== fileToDelete.name
    );
    setFiles(updatedFiles);
  };

  const startUpload = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);
      if (progress >= 100) clearInterval(interval);
    }, 200);
  };

  useEffect(() => {
    startUpload();
  }, []);

  const initialValues = {
    songName: "",
    songBpm: "",
    songType: "",
    songTags: "",
    sampleKey: "",
  };

  const [composerData, setComposerData] = useState(
    selectedComposer.map((composer) => ({
      ...composer,
      percentValue: 0,
      isEditable: false,
    }))
  );

  useEffect(() => {
    setComposerData(
      selectedComposer.map((composer) => ({
        ...composer,
        percentValue: 0,
        isEditable: false,
      }))
    );
  }, [selectedComposer]);

  const handleDeleteComposer = (composerToDelete) => {
    const updatedComposerData = composerData.filter(
      (composer) => composer.id !== composerToDelete.id
    );

    setSelectedComposer(updatedComposerData);
  };

  const handleSubmit = () => {};

  return (
    <div className="border-b border-eclipseGray">
      <div className="py-3 flex flex-col gap-2">
        <h3 className="text-[28px] font-semibold text-white -tracking-[0.56px] leading-[34px]">
          Your files are uploading!
        </h3>
        <p className="text-sm font-normal text-mediumGray">
          Please enter the file information below.
        </p>
      </div>

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values }) => (
          <Form>
            <>
              <div className="my-2 p-5 bg-eerieBlack border border-eclipseGray rounded-lg flex gap-4 items-stretch">
                <div className="rounded bg-[#282B30] w-[50px] flex justify-center items-center">
                  <div className="w-4 h-4">
                    <img
                      src={waveformIcon}
                      alt="waveformIcon"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-platinum text-sm font-semibold">
                      {files[0].name}
                    </h4>

                    <div
                      onClick={() => handleDeleteFile(files[0])}
                      className="bg-[#41404066] text-white rounded-[30px] w-6 h-6 cursor-pointer flex justify-center items-center"
                    >
                      <CancelIcon className="w-3 h-3" />
                    </div>
                  </div>

                  <span className="text-dimGray text-sm font-normal">
                    {formatFileSize(files[0].size)}
                  </span>

                  <div className="flex items-center gap-3 py-1">
                    <div className="flex-1 bg-charcoalGray rounded-full h-2 relative overflow-hidden">
                      <div
                        className="absolute top-0 left-0 h-full bg-limeGreen"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>

                    <div className="w-[33px] flex">
                      <span className="text-silver text-sm font-semibold">
                        {uploadProgress}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <UploadingFileMetaData
                  {...{
                    privacyValue,
                    setPrivacyValue,
                    midiFile,
                    setMidiFile,
                    selectedComposer,
                    setSelectedComposer,
                    composersArr,
                  }}
                />
              </div>

              {selectedComposer.length > 0 && (
                <div className="my-2">
                  <ContributersTable
                    {...{ composerData, setComposerData, handleDeleteComposer }}
                  />
                </div>
              )}

              <div className="py-5 px-2.5 flex justify-end">
                <button
                  type="submit"
                  className="bg-limeGreen w-[151px] flex justify-center items-center py-3 text-jetBlack text-sm font-semibold rounded-[60px]"
                >
                  Save Changes
                </button>
              </div>
            </>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UploadingFilesSection;
