/*************************************************************************
 * @file AlertDialog.tsx
 * @author Ehsanullah Qadeer
 * @desc  This is the popup for alert messages.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

interface Props {
  open: boolean;
  handleClose: () => void;
  title?: string;
  desciption?: string;
  button1?: string;
  button2?: string;
  onConfirm: () => void;
}
export default function AlertDialog(props: Props) {
  const { open, handleClose, title, desciption, button1, button2, onConfirm } =
    props;

  return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "#131313",
            paddingX: "24px",
            paddingY: "20px",
            border: "1px solid #242424",
          },
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            color: "white",
            p: 0,
            paddingBottom: "4px",
            marginBottom: "8px",
            borderBottom: "1px solid #242424",
            fontSize: "18px",
          }}
        >
          {title}
        </DialogTitle>
        <DialogContent
          sx={{
            color: "#666666",
            p: 0,
            paddingBottom: "20px",
            fontSize: "14px",
          }}
        >
          {desciption}
        </DialogContent>
        <DialogActions sx={{ p: 0 }}>
          <Button
            onClick={handleClose}
            sx={{
              border: "1px solid #242424",
              borderRadius: "30px",
              background: "transparent",
              width: "120px",
              color: "#666666",
              textTransform: "capitalize",
              "&:hover": {
                background: "transparent",
                cursor: "pointer",
              },
            }}
          >
            {button1}
          </Button>
          <Button
            onClick={onConfirm}
            sx={{
              border: "1px solid #9EFF00",
              borderRadius: "30px",
              background: "#9EFF00",
              width: "120px",
              color: "#242424",
              textTransform: "capitalize",
              "&:hover": {
                background: "#9EFF00",
                cursor: "pointer",
              },
            }}
          >
            {button2}
          </Button>
        </DialogActions>
      </Dialog>
  );
}
