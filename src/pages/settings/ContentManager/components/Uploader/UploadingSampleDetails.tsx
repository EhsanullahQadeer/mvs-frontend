import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { sanitizeInput } from "shared/utils/stringUtils";
import AlertDialog from "components/util/AlertDialog";
import { storeSample, updateSampleData } from "api/sounds";
import { ICollaborator, ISample, IUserProfile } from "../types";
import SampleMetadata from "./SampleMetadata";
import ContributersTable from "./Collaborators/ContributersTable";
import { useContentManager } from "../../context";

interface CollaboratorUserDTO {
  id: number;
  thumbnail?: string;
  professional_name: string;
  is_owner?: boolean;
  primary_role?: string;
  secondary_role?: string;
}

export interface CollaboratorDTO {
  id: number;
  contribution: number;
  roles: string[];
  user: CollaboratorUserDTO;
  sampleId?: number;
  isOwner?: boolean;
}

interface StoreSampleDTO {
  s3Key: string;
  sampleName: string;
  filename: string;
  mimetype: string;
  duration: number;
  bpm?: string;
  sampleKey?: string;
  tags?: string[];
  isPrivate?: boolean;
  collaborators?: CollaboratorDTO[];
  type?: string;
}

type Props = {
  setUploadingFile?: (file: File) => void;
  handleCancel?: () => void;
  uploadProgress?: number;
  isEditSample?: boolean;
  handleClose?: () => void;
  sampleOwner?: IUserProfile;
  sampleToEdit?: ISample;
  collaborators?: ICollaborator[];
  setUpdateData?: (event: any) => void;
};

const validationSchema = Yup.object().shape({
  songName: Yup.string().required('Sample name is required'),
});

const UploadingSampleDetails = (props: Props) => {
  const {
    handleCancel,
    setUploadingFile,
    uploadProgress,
    isEditSample,
    handleClose,
    sampleToEdit,
    collaborators,
    setUpdateData,
  } = props;

  const {
    handleCancelUpload,
    fileS3Key
  } = useContentManager();

  const [selectedComposer, setSelectedComposer] = useState(() => collaborators);
  const [composerToDelete, setComposerToDelete] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [composerData, setComposerData] = useState(
    selectedComposer?.map((composer) => ({
      contribution: composer.contribution,
      id: composer.id,
      roles: composer.roles || [],
      isEditable: false,
      user: {
        id: composer?.user?.id,
        thumbnail: composer?.user?.thumbnail,
        professional_name: composer?.user?.professional_name,
        is_owner: composer?.user?.is_owner,
        primary_role: composer?.user?.primary_role,
        secondary_role: composer?.user?.secondary_role,
      },
    }))
  );

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
    if (!selectedComposer?.length) return;

    setComposerData((prevComposerData) => {
      return selectedComposer.map((composer) => {
        const contribution = (() => {
          const existingCollaborator = collaborators?.find(
            (collab) => collab.id === composer.id
          );
          return existingCollaborator?.contribution || 
            parseFloat((100 / selectedComposer.length).toFixed(2));
        })();
    
        const existingData = prevComposerData?.find(
          (existing) => existing.user?.id === composer.user?.id
        );
    
        return {
          ...composer,
          contribution,
          roles: existingData?.roles || composer.roles || [],
          isEditable: existingData?.isEditable || false,
        };
      });
    });

    setPercentError(false);
  }, [selectedComposer, collaborators]);

  const handleSubmit = async (values) => {
    setIsSaving(true);
    console.log("handleSubmit", values);
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

      const collaborators = composerData.map((composer) => ({
        id: composer.id,
        contribution: composer.contribution,
        roles: composer.roles || [],
        user: {
          id: composer.user?.id,
          professional_name: composer.user?.professional_name,
          thumbnail: composer.user?.thumbnail,
          is_owner: composer.user?.is_owner,
        }
      }));

      console.log("collaborators", collaborators);

      if (isEditSample) {
        console.log("isEditSample", isEditSample);
        const updateBody = {
          sampleId: sampleToEdit?.id,
          s3Key: s3_key,
          sampleName: songName,
          filename: songName,
          mimetype: mime_type || 'audio/mpeg',
          bpm: songBpm,
          sampleKey: sampleKey,
          type: songType?.value || songType,
          tags: formattedTags,
          isPrivate: privacyValue === "private",
          collaborators: collaborators.map(collab => ({
            id: collab.id,
            contribution: collab.contribution,
            roles: collab.roles || [],
            user: collab.user,
          }))
        };
        await updateSampleData(sampleToEdit?.id, updateBody);
        handleClose && handleClose();
        return;
      }

      const storeBody = {
        s3Key: fileS3Key,
        sampleName: songName,
        filename: songName,
        mimetype: mime_type || 'audio/mpeg',
        duration: length,
        bpm: songBpm,
        sampleKey: sampleKey,
        type: songType?.value || songType,
        tags: formattedTags,
        isPrivate: privacyValue === "private",
        collaborators: collaborators.map(collab => ({
          id: collab.user?.id,
          contribution: collab.contribution,
          roles: collab.roles || [],
          isOwner: collab.user?.is_owner
        }))
      } as StoreSampleDTO;

      await storeSample(storeBody);
      setUpdateData && setUpdateData(Date.now());
      setUploadingFile && setUploadingFile(null);
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
                <SampleMetadata
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
                      setPercentError,
                      percentError,
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
                  onClick={handleCancelUpload}
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

export default UploadingSampleDetails;
