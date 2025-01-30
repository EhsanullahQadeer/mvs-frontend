import { FiMusic } from "react-icons/fi";
import user from "../../assets/img/artistImg.png";

const NotificationIcon = ({ state }) => {
  return (
    <>
      {(state.audioUpdated || state.collabAdded) && (
        <div className="w-fit">
          <div className="w-12 h-12 relative bg-black flex items-center justify-center rounded-full">
            <FiMusic className="text-white" />
          </div>
        </div>
      )}
      {(!state.audioUpdated && !state.collabAdded) && (
        <div className="w-fit">
          <div className="w-12 h-12 relative rounded-full">
            <img
              src={user}
              className="w-full h-full object-cover rounded-full"
              alt="User"
            />
            {(state.tagged || state.requestAccepted || state.feedback) && (
              <div className="w-2.5 h-2.5 absolute bg-[#12B76A] border-[1.5px] rounded-full bottom-[6px] right-[1px] border-white"></div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationIcon;
