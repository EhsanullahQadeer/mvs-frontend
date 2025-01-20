/*************************************************************************
 * @file MetaDataForm.tsx
 * @author Ehsanullah Qadeer
 * @desc  This is the component for the mui dropdown to select one element.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

import { useEffect, useState } from "react";
import { getSampleCollaborators, updateFileMetadata, uploadedFileMetadata } from "api/sounds";
import { Form, Formik } from "formik";
import { ICollaborator, ICurrentUser, ISample, IUserProfile } from "./types";
import AlertDialog from "components/util/AlertDialog";
import ContributersTable from "./ContributersTable";
import UploadingFileMetaData from "./UploadingFileMetaData";

type Props = {
  fileRedisKey?: string;
  handleCancel?: () => void;
  isEditSample?: boolean;
  handleClose?: () => void;
  sampleOwner?: IUserProfile;
  sampleToEdit?: ISample;
  currentUserInfo?: ICurrentUser;
  collaborators?: ICollaborator[];
  setUpdateData?: (event: any) => void;
};

const MetaDataForm = (
  props: Props
) => {

  const {
    fileRedisKey,
    handleCancel,
    isEditSample,
    handleClose,
    sampleToEdit,
    currentUserInfo,
    collaborators,
    setUpdateData,
  } = props;

  console.log("MetaDataForm - received composer:", collaborators);

  const {
    filename,
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
      roles: composer.roles,
      isEditable: false,
    }))
  );

  const [privacyValue, setPrivacyValue] = useState(
    is_private ? "private" : "public"
  );
  const [midiFile, setMidiFile] = useState(null);
  const [percentError, setPercentError] = useState(false);
  const initialValues = {
    songName: filename ? filename : "",
    songBpm: bpm ? bpm : "",
    songType: type ? type : "",
    songTags: tags ? tags : "",
    sampleKey: key ? key : "",
  };

  useEffect(() => {
    setComposerData((prevComposerData) => {
      const updatedComposerData = selectedComposer?.map((composer) => {
        const existingComposer = prevComposerData?.find(
          (existing) => existing.id === composer.id
        );
        
        const initialCollaborator = collaborators?.find( 
          collab => collab.id === composer.id
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
          roles: composer.roles || [],
          percentValue,
          isEditable: false,
        };
      });

      return updatedComposerData;
    });
    setPercentError(false);
  }, [selectedComposer, collaborators]);

  const handleSubmit = async (
    values
  ) => {

    const { 
      songName, 
      songBpm,
      sampleKey,
      songType, 
      songTags 
    } = values;

    const formattedTags = songTags
      .split(' ')
      .filter(tag => tag.trim())
      .map(tag => tag.startsWith('#') ? tag.slice(1) : tag)
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

    const ownerObj = composerData.find(
      (data) => data.id === currentUserInfo.id
    );

    try {
      const body = {
        filename: songName,
        bpm: songBpm,
        key: sampleKey,
        type: songType?.value || songType,
        tags: formattedTags,
        is_private: privacyValue === "private",
        collaborators: JSON.stringify(collaborators),
        ...(isEditSample && {
          sample_id: props.sampleToEdit?.id,
          s3_key,
          mime_type,
          length,
        }),
      };

      // console.log('body here', body);
      // return;

      if (sampleToEdit) {
        sampleToEdit.tags = formattedTags;
      }
      
      if (fileRedisKey) {
        const response = await uploadedFileMetadata(fileRedisKey, body);
        if (response.status === 200) {
          handleCancel();
        }
      } else if (editFileId) {
        const response = await updateFileMetadata(editFileId, body);
        if (response.status === 200) {
          handleClose();
        }
      }
      setUpdateData && setUpdateData(Date.now());
    } catch (error) {
      console.log("error ", error);
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

      <Formik 
        initialValues={initialValues} 
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ handleSubmit }) => (
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
