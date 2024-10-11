import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import MetaDataForm from "./MetaDataForm";
import { ICurrentUser, ISample } from "./types";

interface Props {
  open: boolean;
  handleClose: () => void;
  sampleToEdit: ISample;
  currentUserInfo: ICurrentUser;
}

export default function UpdateSamplePopup(props: Props) {
  const { open, handleClose, sampleToEdit, currentUserInfo } = props;

  const isEditSample = true;
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
          <MetaDataForm
            {...{ isEditSample, handleClose, sampleToEdit, currentUserInfo }}
          />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
