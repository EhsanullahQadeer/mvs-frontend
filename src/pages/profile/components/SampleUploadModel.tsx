import { Dialog } from "@mui/material";
import React, { useState } from "react";
import { ReactComponent as CancelIcon } from "../../../assets/icons/cancelIcon.svg";
import MetaDataForm from "pages/settings/content-management/components/MetaDataForm";
import ContributersTable from "pages/settings/content-management/components/ContributersTable";

const SampleUploadModel = ({
  open,
  fileRedisKey,
  handleCancel,
  isEditSample,
  handleCloses,
  sampleToEdit,
  currentUserInfo,
  collaborators,
  setUpdateData,
}) => {
  const [activeTab, setActiveTab] = useState("File Metadata");
  const [composerData, setComposerData] = useState([]);
  const [percentError, setPercentError] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [composerToDelete, setComposerToDelete] = useState(null);

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
      setComposerData(updatedComposerData);
      handleCloseDeleteDialog();
    }
  };

  return (
    <Dialog
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: "#131313",
          padding: "16px 20px",
          maxWidth: "767px",
          border: "1px solid #242424",
          borderRadius: "12px",
        },
      }}
      open={open}
      onClose={handleCloses}
      className="fixed scrollbar-custom   inset-0 flex items-center justify-center z-50 rounded-xl"
    >
      <div className="relative scrollbar-custom flex flex-col gap-2.5">
        <div className="flex mt-[-6px] justify-between text-lg text-gray-300 items-center font-semibold">
          {isEditSample ?           <h2 className="text-[#CCCCCC]">Edit Sample</h2>
:
                    <h2 className="text-[#CCCCCC]">Upload Sample</h2>
}
          <div
            onClick={handleCloses}
            className="rounded-full w-6 h-6 flex justify-center items-center bg-eclipseGray cursor-pointer text-coolGray"
          >
            <CancelIcon className="w-2 h-2" />
          </div>
        </div>

        {/* Tab Navigation */}
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

        {/* Tab Content */}
        <div className="flex-1 py-4 flex flex-col overflow-hidden">
          <div className="flex-1 w-[710px] overflow-y-auto custom-dropdown">
            {activeTab === "File Metadata" && (
              <MetaDataForm
                {...{
                  fileRedisKey,
                  handleCancel,
                  currentUserInfo,
                  setUpdateData,
                  sampleToEdit,
                  isEditSample,
                  collaborators,
                }}
                isLoginProfile={true}
              />
            )}
            {activeTab === "Contributor" && (
              <ContributersTable
                composerData={composerData}
                setComposerData={setComposerData}
                handleOpenDeleteDialog={handleOpenDeleteDialog}
                percentError={percentError}
                setPercentError={setPercentError}
                collaborators={collaborators}
              />
            )}
          </div>
        </div>

        <div className="flex justify-end pt-1 gap-2">
          <button className="bg-limeGreen text-black py-1 px-5 rounded-full">
            Next
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default SampleUploadModel;
