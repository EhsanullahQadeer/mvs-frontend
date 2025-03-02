import { Dialog } from "@mui/material";
import { useEffect, useState } from "react";
import { ReactComponent as CancelIcon } from "../../../assets/icons/cancelIcon.svg";
import ContributersTable from "pages/settings/content-management/components/ContributersTable";
import UploadingFileMetaData from "pages/settings/content-management/components/UploadingFileMetaData";
import AlertDialog from "components/util/AlertDialog";
import { Form, Formik } from "formik";
import { updateFileMetadata, uploadedFileMetadata } from "api/sounds";
import { LuUserPlus } from "react-icons/lu";

const SampleUploadModel = ({
  open,
  fileRedisKey,
  handleCancel,
  isEditSample,
  handleClose,
  sampleToEdit,
  currentUserInfo,
  collaborators,
  setUpdateData,
}) => {
  const [activeTab, setActiveTab] = useState("File Metadata");
  const {
    filename,
    bpm,
    key,
    type,
    tags,
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

  const [percentError, setPercentError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const initialValues = {
    songName: filename ? filename : "",
    songBpm: bpm ? bpm : "",
    songType: type ? type : "sample",
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
          roles: composer.roles || [],
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
      const { songName, songBpm, sampleKey, songType, songTags } = values;

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
          sampleId: sampleToEdit?.id,
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
        filename: songName,
        bpm: songBpm,
        key: sampleKey,
        type: songType?.value || songType,
        tags: formattedTags,
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
        handleCancel?.();
        return;
      }

      if (isEditSample && sampleToEdit?.id) {
        const response = await updateFileMetadata(sampleToEdit.id, body);
        console.log("Update response:", response);
        setUpdateData && setUpdateData(Date.now());
        handleClose?.();
        return;
      }

      console.error("No valid file key or sample ID for update");
    } catch (error) {
      console.error("Save error:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleOpenDeleteDialog = (composer) => {
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
    <Dialog
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: "#08090A",
          padding: "16px 20px",
          maxWidth: "100%",
          border: "1px solid #3D3D3D",
          borderRadius: "12px",
        },
      }}
      open={open}
      onClose={handleClose}
      className="fixed scrollbar-custom inset-0 flex items-center justify-center z-50 rounded-xl"
    >
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

      <div className="relative scrollbar-custom flex flex-col gap-2.5">
        <div className="flex mt-[-6px] justify-between text-lg text-gray-300 items-center font-semibold">
          {isEditSample ? (
            <h2 className="text-softGray">Edit Sample</h2>
          ) : (
            <h2 className="text-softGray">Upload Sample</h2>
          )}
          <div
            onClick={handleClose}
            className="rounded-full w-6 h-6 flex justify-center items-center bg-eclipseGray cursor-pointer text-coolGray"
          >
            <CancelIcon className="w-2 h-2" />
          </div>
        </div>

        <div className="flex w-full items-center">
          {["File Metadata", "Contributor"].map((tab) => (
            <span
              key={tab}
              className={`cursor-pointer text-white flex items-center justify-center flex-1 py-5 ${
                activeTab === tab
                  ? "font-semibold border-b-2 border-charcoalGray"
                  : "border-b border-eerieBlack"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </span>
          ))}
        </div>

        <div className="flex-1 pt-4 flex flex-col overflow-hidden">
          <div className="flex-1 min-w-[710px] overflow-y-auto custom-dropdown">
            <Formik
              initialValues={initialValues}
              onSubmit={(values) => handleSubmit(values)}
            >
              {({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <>
                    <div>
                      {activeTab === "File Metadata" && (
                        <UploadingFileMetaData
                          {...{
                            selectedComposer,
                            setSelectedComposer,
                            isEditSample,
                            handleClose,
                            sample: sampleToEdit,
                          }}
                          isLoginProfile={true}
                        />
                      )}

                      {activeTab === "Contributor" &&
                        (selectedComposer?.length > 0 ? (
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
                        ) : (
                          <div className="flex flex-col gap-3 items-center">
                            <div className="text-darkGray">
                              <LuUserPlus size={100} />
                            </div>

                            <h3 className="text-white text-lg font-semibol">
                              No collaborators added
                            </h3>

                            <p className="max-w-96 text-dimGray text-base font-normal text-center">
                              You can add contributors to credit their work or
                              skip this step. To add them, go back to{" "}
                              <span className="underline text-silver">
                                File Metadata
                              </span>
                              .
                            </p>
                          </div>
                        ))}

                      <div className="mt-5 flex justify-end">
                        {activeTab === "File Metadata" ? (
                          <button
                            type="button"
                            onClick={() => setActiveTab("Contributor")}
                            className="bg-limeGreen text-black py-1 px-5 rounded-full"
                          >
                            Next
                          </button>
                        ) : (
                          <button
                            type="submit"
                            className="bg-limeGreen text-black py-1 px-5 rounded-full"
                          >
                            Post
                          </button>
                        )}
                      </div>
                    </div>
                  </>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default SampleUploadModel;
