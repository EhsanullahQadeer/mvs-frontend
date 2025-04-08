/*************************************************************************
 * @file MetaDataForm.tsx
 * @author Ehsanullah Qadeer
 * @desc  This is the component for the mui dropdown to select one element.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { sanitizeInput } from "utils/stringUtils";
import ContributersTable from "./ContributersTable";
import AlertDialog from "components/util/AlertDialog";
import UploadingFileMetaData from "./UploadingFileMetaData";
import { updateFileMetadata, uploadedFileMetadata } from "api/sounds";
import { ICollaborator, ICurrentUser, ISample, IUserProfile } from "./types";

type Props = {
  fileRedisKey?: string;
  setUploadingFile?: (file: File) => void;
  handleCancel?: () => void;
  uploadProgress?: number;
  isEditSample?: boolean;
  handleClose?: () => void;
  sampleOwner?: IUserProfile;
  sampleToEdit?: ISample;
  currentUserInfo?: ICurrentUser;
  collaborators?: ICollaborator[];
  setUpdateData?: (event: any) => void;
};

const validationSchema = Yup.object().shape({
  songName: Yup.string().required('Sample name is required'),
});

const MetaDataForm = (props: Props) => {
  const {
    fileRedisKey,
    handleCancel,
    setUploadingFile,
    uploadProgress,
    isEditSample,
    handleClose,
    sampleToEdit,
    currentUserInfo,
    collaborators,
    setUpdateData,
  } = props;

  const {
    filename,
    name,
    bpm,
    key,
    type,
    tags,
    is_private,
    id: editFileId,
    s3_key,
    mime_type,
    length,
  } = sampleToEdit || {};

  const [selectedComposer, setSelectedComposer] = useState(() => collaborators);
  const [composerToDelete, setComposerToDelete] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [composerData, setComposerData] = useState(
    selectedComposer?.map((composer) => ({
      user: {
        id: composer?.user?.id,
        thumbnail: composer?.user?.thumbnail,
        professional_name: composer?.user?.professional_name,
        is_owner: composer?.user?.is_owner,
        primary_role: composer?.user?.primary_role,
        secondary_role: composer?.user?.secondary_role,
      },
      contribution: composer.contribution,
      id: composer.id,
      roles: [],
      isEditable: false,
    }))
  );

  const [privacyValue, setPrivacyValue] = useState(
    is_private ? "private" : "public"
  );
  const [midiFile, setMidiFile] = useState(null);
  const [percentError, setPercentError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const initialValues = {
    filename: filename ? sanitizeInput(filename) : "",
    songName: name ? name : "",
    songBpm: bpm ? bpm : "",
    songType: type ? type : "sample",
    songTags: tags ? tags : "",
    sampleKey: key ? key : "",
  };

  useEffect(() => {
    setComposerData((prevComposerData) => {
      const updatedComposerData = selectedComposer?.map((composer) => {
        const existingComposer = prevComposerData?.find(
          (existing) => existing.user.id === composer.user.id
        );

        const initialCollaborator = collaborators?.find(
          (collab) => collab.id === composer.id
        );

        const percentValue = initialCollaborator?.contribution
          ? initialCollaborator.contribution
          : parseFloat((100 / selectedComposer?.length).toFixed(2));

        if (existingComposer) {
          return {
            ...composer,
            roles: existingComposer.roles,
            percentValue,
            isEditable: existingComposer.isEditable || false,
          };
        }

        return {
          ...composer,
          roles: [],
          percentValue,
          isEditable: false,
        };
      });

      return updatedComposerData;
    });
    setPercentError(false);
  }, [selectedComposer, collaborators]);

  const handleSubmit = async (values) => {
    setIsSaving(true);
    try {
      const {
        songName, 
        songBpm,
        sampleKey,
        songType, 
        songTags 
      } = values;

      const formattedTags = songTags
        .split(" ")
        .filter((tag) => tag.trim())
        .map((tag) => (tag.startsWith("#") ? tag.slice(1) : tag))
        .filter((tag, index, self) => self.indexOf(tag) === index);

      const percentSum = composerData.reduce((sum, composer) => {
        return sum + composer.contribution;
      }, 0);

      if (Math.ceil(percentSum) !== 100) {
        setPercentError(true);
        return;
      }

      const collaborators = composerData
        .filter((data) => data.id !== currentUserInfo.id)
        .map((composer) => ({
          id: composer.id,
          contribution: composer.contribution,
          roles: composer.roles,
          sampleId: props.sampleToEdit?.id,
          user: {
            id: composer.user?.id,
            professional_name: composer.user?.professional_name,
            thumbnail: composer.user?.thumbnail,
            is_owner: composer.user?.is_owner,
            primary_role: composer.user?.primary_role,
            secondary_role: composer.user?.secondary_role,
          },
        }));

      const body = {
        name: songName,
        bpm: songBpm,
        key: sampleKey,
        type: songType?.value || songType,
        tags: formattedTags,
        is_private: privacyValue === "private",
        collaborators: JSON.stringify(collaborators),
        ...(isEditSample && {
          sample_id: sampleToEdit?.id,
          s3_key,
          mime_type,
          length,
        }),
      };

      console.log("Attempting save with:", {
        isEditSample,
        editFileId: sampleToEdit?.id,
        fileRedisKey,
        body,
      });

      if (fileRedisKey) {
        const response = await uploadedFileMetadata(fileRedisKey, body);
        console.log("Upload response:", response);
        setUpdateData && setUpdateData(Date.now());
        setUploadingFile && setUploadingFile(null);
        return;
      }

      if (isEditSample && sampleToEdit?.id) {
        const response = await updateFileMetadata(sampleToEdit.id, body);
        console.log("Update response:", response);
        setUpdateData && setUpdateData(Date.now());
        setUploadingFile && setUploadingFile(null);
        return;
      }

      console.error("No valid file key or sample ID for update");
    } catch (error) {
      console.error("Save error:", error);
    } finally {
      setIsSaving(false);
    }
  };

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
        (composer) => composer.user.id !== composerToDelete.user.id
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

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ handleSubmit, errors, touched }) => (
          <Form onSubmit={handleSubmit}>
            <>
              <div>
                <UploadingFileMetaData
                  {...{
                    privacyValue,
                    setPrivacyValue,
                    midiFile,
                    setMidiFile,
                    selectedComposer,
                    setSelectedComposer,
                    isEditSample,
                    handleClose,
                    sample: sampleToEdit,
                  }}
                />
                {errors.songName && touched.songName && (
                  <div className="text-red-500 text-xs mt-1 ml-4">
                    {errors.songName}
                  </div>
                )}
              </div>

              {selectedComposer?.length > 0 && (
                <div className={`${isEditSample && "px-5"} my-2`}>
                  <ContributersTable
                    {...{
                      composerData,
                      setComposerData,
                      handleOpenDeleteDialog,
                      percentError,
                      setPercentError,
                      collaborators,
                    }}
                  />
                </div>
              )}

              <div
                className={`py-5 ${
                  isEditSample ? "px-5" : "px-2.5"
                } flex justify-end gap-4`}
              >
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-transparent border border-limeGreen w-[151px] flex justify-center items-center py-3 text-limeGreen text-sm font-semibold rounded-[60px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploadProgress < 100}
                  className="bg-limeGreen w-[151px] flex justify-center items-center py-3 text-jetBlack text-sm font-semibold rounded-[60px]"
                >
                  {isSaving || uploadProgress < 100 ? "Saving..." : "Save Changes"}
                </button>
              </div>

              {errors.songType && touched.songType && (
                <div className="text-red-500 text-xs mt-1">
                  {errors.songType}
                </div>
              )}
            </>
          </Form>
        )}
      </Formik>

      {isSaving && (
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

export default MetaDataForm;
