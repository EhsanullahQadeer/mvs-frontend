import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import MetaDataForm from "./MetaDataForm";
import { ISample } from "./types";

interface Props {
  open: boolean;
  handleClose: () => void;
  sampleToEdit: ISample;
}

export default function UpdateSamplePopup(props: Props) {
  const { open, handleClose, sampleToEdit } = props;

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
          <MetaDataForm {...{ isEditSample, handleClose, sampleToEdit }} />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
