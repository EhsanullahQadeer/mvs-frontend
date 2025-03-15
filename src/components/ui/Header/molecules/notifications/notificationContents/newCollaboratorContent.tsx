import { useNavigate } from "react-router-dom";
import { TNotificationData } from "../Notification";
import { useHeaderHooks } from "theme/Header/Header.hooks";
import NotificationButton from "components/ui/Header/atoms/notificationAtoms/NotificationsButton";

const NewCollaboratorNotifContent = ({ notification }: { notification: TNotificationData }) => {
  const navigate = useNavigate();
  const { state } = useHeaderHooks();

  return (
    <div className="flex-grow">
      <p className="text-[12px] text-[#999999] pb-[6px]">
        <span className="font-semibold pr-[4px] text-white">
          {notification.sender.displayName}
        </span>
        <span>has added a new collaborator to file </span>
        <span className="font-semibold pr-[4px] text-[#0185FF]">
            "{notification.sample.filename}"
          </span>
      </p>
      <div className=" flex items-center gap-2 pt-[4px]">
        <NotificationButton
          buttonName="View Details"
          bgColor="bg-[#9EFF00]"
          textColor="text-black"
          borderColor="border-transparent"
          onClick={() => navigate(`/settings/content-management/${state?.auth?.user?.id}`)}
          icon={null}
        />
      </div>
    </div>
  );
};

export default NewCollaboratorNotifContent;