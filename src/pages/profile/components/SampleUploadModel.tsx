import { CircularProgress, Dialog } from "@mui/material";
import { useEffect, useState } from "react";
import { ReactComponent as CancelIcon } from "../../../assets/icons/cancelIcon.svg";
import AlertDialog from "components/util/AlertDialog";
import { Form, Formik } from "formik";
import { storeSample } from "api/sounds";
import { LuUserPlus } from "react-icons/lu";
import SampleMetadata from "pages/settings/ContentManager/components/Uploader/SampleMetadata";
import ContributersTable from "pages/settings/ContentManager/components/Uploader/Collaborators/ContributersTable";
import { useContentManager } from "pages/settings/ContentManager/context";

const UploadingSampleDetailsModal = ({ open, handleClose }) => {
  const [activeTab, setActiveTab] = useState("File Metadata");
  const [selectedComposer, setSelectedComposer] = useState([]);
  const [composerToDelete, setComposerToDelete] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [composerData, setComposerData] = useState([]);

  const [percentError, setPercentError] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { fileS3Key, handleCancelUpload } = useContentManager();

  const initialValues = {
    songName: "",
    songBpm: "",
    songType: "sample",
    songTags: "",
    sampleKey: "",
  };

  useEffect(() => {
    if (!selectedComposer?.length) return;

    setComposerData((prevComposerData) => {
      return selectedComposer.map((composer) => {
        const contribution = parseFloat((100 / selectedComposer.length).toFixed(2));
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
  }, [selectedComposer]);

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

      const body = {
        s3Key: fileS3Key,
        sampleName: songName,
        filename: songName,
        bpm: songBpm,
        sampleKey: sampleKey,
        type: songType?.value || songType,
        tags: formattedTags,
        isPrivate: false,
        collaborators: composerData.map(collaborator => ({
          id: collaborator.id,
          contribution: collaborator.contribution,
          roles: collaborator.roles || [],
          user: {
            id: collaborator.user?.id,
            professional_name: collaborator.user?.professional_name,
            thumbnail: collaborator.user?.thumbnail,
            is_owner: collaborator.user?.is_owner,
            primary_role: collaborator.user?.primary_role,
            secondary_role: collaborator.user?.secondary_role,
          }
        }))
      };

      await storeSample(body);
      handleClose();
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
        (composer) => composer.user.id !== composerToDelete.user.id
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
          <h2 className="text-softGray">Upload Sample</h2>
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
                        <SampleMetadata
                          {...{
                            selectedComposer,
                            setSelectedComposer,
                            handleClose
                          }}
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
                              collaborators: []
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
                            onClick={(e) => {
                              e.preventDefault();
                              setActiveTab("Contributor");
                            }}
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

      {isSaving && (
        <>
          <div className="absolute top-0 left-0 z-[9999] bg-black opacity-40 pointer-events-none w-full h-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999]">
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
    </Dialog>
  );
};

export default UploadingSampleDetailsModal;