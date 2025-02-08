import { Dialog } from "@mui/material";
import { ReactComponent as CancelIcon } from "../../../assets/icons/cancelIcon.svg";
interface UnlockContentModelProps {
  open: boolean;
  onClose: () => void;
  onAuthClick: () => void; // Function to open Auth Modal
}
const UnlockContentModel: React.FC<UnlockContentModelProps> = ({
  open,
  onClose,
  onAuthClick, // Function to handle Sign In/Sign Up click
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        zIndex: 9999,
        "& .MuiPaper-root": {
          backgroundColor: "#131313",
          padding: "0 24px",
          border: "1px solid #242424",
          borderRadius: "12px",
          overflow: "hidden",
        },
      }}
    >
      <div className="relative flex flex-col gap-2.5 overflow-hidden z-[100]">
        <div className="flex flex-col gap-2.5 sticky pt-[24px] z-40 pb-1 top-0 bg-darkGray">
          <div className="flex justify-between text-[20px] text-softGray items-center font-semibold">
            <h2>Log in or Sign up to Unlock Content</h2>
            <div
              onClick={onClose}
              className="rounded-full w-6 h-6 flex justify-center items-center bg-eclipseGray cursor-pointer text-coolGray"
            >
              <CancelIcon className="w-2 h-2" />
            </div>
          </div>
          <p className="text-[12px] text-grayishSilver">
            You are about to pay the Partner's fee to unlock their inbox. This
            transaction allows you to submit one audio demo for the Partner to
            review.
          </p>
        </div>

        <div className="flex items-center bottom-0 sticky bg-darkGray justify-end pb-4 pt-1 gap-2">
          <button
            onClick={onAuthClick} // Trigger onAuthClick to open SendMessageModel
            className="border border-charcoalGray bg-jetBlack text-sm text-white font-semibold py-2 px-3 flex justify-center items-center rounded-full"
          >
            Sign In
          </button>
          <button
            onClick={onAuthClick} // Trigger onAuthClick to open SendMessageModel
            className="bg-limeGreen text-sm text-jetBlack font-semibold py-2 px-3 rounded-full"
          >
            Sign Up
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default UnlockContentModel;
