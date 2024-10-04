/*************************************************************************
 * @file UploadingFilesSection.tsx
 * @author Ehsanullah Qadeer
 * @desc  This is the main wrapper for the files that are uploading.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

import { useEffect, useState } from "react";
import waveformIcon from "../../../../assets/icons/waveformIcon.svg";
import { ReactComponent as CancelIcon } from "../../../../assets/icons/cancelIcon.svg";
import UploadingFileMetaData from "./UploadingFileMetaData";
import { Form, Formik } from "formik";
import ContributersTable from "./ContributersTable";
import { uploadedFileMetadata } from "api/sounds";
import { FaCircleCheck } from "react-icons/fa6";
import { IUserProfile } from "./types";
import AlertDialog from "components/util/AlertDialog";

type Props = {
  uploadingFile: File;
  fileRedisKey: string;
  uploadProgress: number;
  handleCancel: () => void;
};

const UploadingFilesSection = (props: Props) => {
  const { uploadingFile, fileRedisKey, uploadProgress, handleCancel } = props;

  const [selectedComposer, setSelectedComposer] = useState([]);
  const [privacyValue, setPrivacyValue] = useState("private");
  const [midiFile, setMidiFile] = useState(null);
  const [composerToDelete, setComposerToDelete] = useState(null);

  function formatFileSize(sizeInBytes: number): string {
    const sizeInMB = sizeInBytes / (1024 * 1024);
    return `${sizeInMB.toFixed(0)} Mb`;
  }

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

  const handleSubmit = async (values) => {
    const { songName, songBpm, sampleKey, songType, songTags } = values;

    const collaborators = composerData.map((composer) => ({
      id: composer.id,
      contribution: composer.percentValue,
      roles: composer.roles,
    }));

    try {
      const body = {
        owner_roles: ["producer", "composer"],
        owner_contribution: 40,
        name: songName,
        bpm: songBpm,
        key: sampleKey,
        type: songType,
        tags: songTags,
        is_private: privacyValue === "private",
        collaborators: JSON.stringify(collaborators),
      };

      if (fileRedisKey) {
        const response = await uploadedFileMetadata(fileRedisKey, body);
        if (response.status === 200) {
          handleCancel();
        }
        console.log("saveMetadata ", response.data);
      }
    } catch (error) {
      console.log("error ", error);
    }
  };

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleOpenDeleteDialog = (composer: IUserProfile) => {
    setOpenDeleteDialog(true);
    setComposerToDelete(composer);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setComposerToDelete(null);
  };

  const handleDeleteComposer = () => {
    if (composerToDelete) {
      const updatedComposerData = composerData.filter(
        (composer) => composer.id !== composerToDelete.id
      );

      setSelectedComposer(updatedComposerData);
      handleCloseDeleteDialog();
    }
  };

  return (
    <>
      <AlertDialog
        {...{
          open: openDeleteDialog,
          handleClose: handleCloseDeleteDialog,
          title: "Are you sure you want to delete the sample information?",
          desciption: "Please confirm if you want to proceed!",
          button1: "Cancel",
          button2: "Delete",
          onConfirm: handleDeleteComposer,
        }}
      />

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
          {() => (
            <Form>
              <>
                <div className="my-2 p-5 bg-eerieBlack border border-eclipseGray rounded-lg">
                  <div className="flex gap-4 items-stretch">
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
                          {uploadingFile.name}
                        </h4>

                        <div
                          onClick={() => handleCancel()}
                          className="bg-[#41404066] text-white rounded-[30px] w-6 h-6 cursor-pointer flex justify-center items-center"
                        >
                          <CancelIcon className="w-3 h-3" />
                        </div>
                      </div>

                      <span className="text-dimGray text-sm font-normal">
                        {formatFileSize(uploadingFile.size)}
                      </span>

                      <div className="flex items-center gap-3 py-1">
                        {uploadProgress !== 100 && (
                          <>
                            <div className="flex-1 bg-charcoalGray rounded-full h-2 relative overflow-hidden">
                              <div
                                className="absolute top-0 left-0 h-full bg-limeGreen transition-all duration-300 ease-in-out"
                                style={{ width: `${uploadProgress}%` }}
                              ></div>
                            </div>

                            <div className="w-[33px] flex">
                              <span className="text-silver text-sm font-semibold h-5">
                                {uploadProgress}%
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {uploadProgress === 100 && (
                    <div className="mt-3 border border-slateGray rounded-lg p-2 bg-eerieBlack w-full flex items-center justify-between">
                      <div className="flex gap-2 items-center">
                        <div className="text-limeGreen w-5 h-5">
                          <FaCircleCheck className="w-full h-full" />
                        </div>
                        <span className="text-silver text-xs font-semibold">
                          File uploaded successfully
                        </span>
                      </div>

                      <span className="text-silver text-xs font-normal underline cursor-pointer">
                        Replace File
                      </span>
                    </div>
                  )}
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
                    }}
                  />
                </div>

                {selectedComposer.length > 0 && (
                  <div className="my-2">
                    <ContributersTable
                      {...{
                        composerData,
                        setComposerData,
                        handleOpenDeleteDialog,
                      }}
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
    </>
  );
};

export default UploadingFilesSection;
