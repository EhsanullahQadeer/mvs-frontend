import { Dialog } from "@mui/material";
import { FaRegCircleCheck } from "react-icons/fa6";

const SampleUpdatedModel = ({ open, handleClose, message }) => {
  return (
    <Dialog
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: "#08090A",
          padding: "16px",
          width: "274px",
          border: "1px solid #3D3D3D",
          borderRadius: "12px",
        },
      }}
      open={open}
      onClose={handleClose}
    >
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="mb-2">
          <FaRegCircleCheck className="text-6xl font-thin text-dimGray" />
        </div>
        <div className="!text-white text-sm">{message}</div>
      </div>
    </Dialog>
  );
};

export default SampleUpdatedModel;
