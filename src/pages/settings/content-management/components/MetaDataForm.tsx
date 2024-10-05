import React, { useEffect, useState } from "react";
import { updateFileMetadata, uploadedFileMetadata } from "api/sounds";
import { Form, Formik } from "formik";
import { ISample, IUserProfile } from "./types";
import AlertDialog from "components/util/AlertDialog";
import ContributersTable from "./ContributersTable";
import UploadingFileMetaData from "./UploadingFileMetaData";

type Props = {
  fileRedisKey?: string;
  handleCancel?: () => void;
  isEditSample?: boolean;
  handleClose?: () => void;
  sampleToEdit?: ISample;
};

const MetaDataForm = (props: Props) => {
  const {
    fileRedisKey,
    handleCancel,
    isEditSample,
    handleClose,
    sampleToEdit,
  } = props;

  const {
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

  const [selectedComposer, setSelectedComposer] = useState([]);

  const [privacyValue, setPrivacyValue] = useState(
    is_private ? "private" : "public"
  );
  const [midiFile, setMidiFile] = useState(null);

  console.log("sampleToEdit ", sampleToEdit);

  const initialValues = {
    songName: name ? name : "",
    songBpm: bpm ? bpm : "",
    songType: type ? type : "",
    songTags: tags ? tags : "",
    sampleKey: key ? key : "",
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
        ...(isEditSample && {
          sample_id: editFileId,
          s3_key,
          mime_type,
          length,
        }),
      };

      if (fileRedisKey) {
        const response = await uploadedFileMetadata(fileRedisKey, body);
        if (response.status === 200) {
          handleCancel();
        }
        console.log("saveMetadata ", response.data);
      } else if (editFileId) {
        const response = await updateFileMetadata(editFileId, body);
        if (response.status === 200) {
          handleClose();
        }
        console.log("updateMetadata ", response.data);
      }
    } catch (error) {
      console.log("error ", error);
    }
  };

  const [composerToDelete, setComposerToDelete] = useState(null);
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

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {() => (
          <Form>
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
                  }}
                />
              </div>

              {selectedComposer.length > 0 && (
                <div className={`${isEditSample && "px-5"} my-2`}>
                  <ContributersTable
                    {...{
                      composerData,
                      setComposerData,
                      handleOpenDeleteDialog,
                      isEditSample,
                    }}
                  />
                </div>
              )}

              <div
                className={`py-5 ${
                  isEditSample ? "px-5" : "px-2.5"
                } flex justify-end`}
              >
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
    </>
  );
};

export default MetaDataForm;
