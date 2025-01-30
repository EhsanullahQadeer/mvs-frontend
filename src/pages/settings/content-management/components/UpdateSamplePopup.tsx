import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import MetaDataForm from "./MetaDataForm";
import { ICollaborator, ICurrentUser, ISample, IUserProfile } from "./types";
import { getUserByIdAPI } from "api/user";
import { getSampleCollaborators } from "api/sounds";

interface Props {
  open: boolean;
  handleClose: () => void;
  sampleToEdit: ISample;
  currentUserInfo: ICurrentUser;
}

export default function UpdateSamplePopup(
  props: Props
) {
  const [collaborators, setCollaborators] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { open, handleClose, sampleToEdit, currentUserInfo } = props;
  const isEditSample = true;

  useEffect(() => {
    const fetchCollaborators = async () => {
      if (!sampleToEdit?.id) return;
      setIsLoading(true);
      try {
        const response = await getSampleCollaborators(sampleToEdit?.id);
        setCollaborators(response.data);
      } catch (error) {
        console.error('Error fetching collaborators:', error);
        setCollaborators([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCollaborators();
  }, [sampleToEdit?.id]);

  return (
    <React.Fragment>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiPaper-root.MuiDialog-paper": {
            backgroundColor: "#131313",
            maxWidth: "80%",
            minWidth: "65%",
          },
        }}
      >
        <DialogContent sx={{ p: 0 }}>
          {isLoading ? (
            <div className="flex justify-center items-center p-8">
              <div className="text-white">Loading collaborators...</div>
            </div>
          ) : (
            <MetaDataForm
              {...{
                isEditSample,
                handleClose,
                sampleToEdit,
                currentUserInfo,
                collaborators,
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
