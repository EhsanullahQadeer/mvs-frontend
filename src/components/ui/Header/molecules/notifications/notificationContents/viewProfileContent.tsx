import NotificationButton from "components/ui/Header/atoms/notificationAtoms/NotificationsButton";
import { TNotificationBase } from "./notification_base.type";
import { TNotificationData } from "../Notification";
import { useNavigate } from "react-router-dom";

export type TViewProfileNotifData = TNotificationData & {
  filename?: string;
  sampleId?: string;
  sampleName?: string;
  sampleFilename?: string;
  mediaName?: string;
}

const ViewProfileNotifContent = ({ notification }: { notification: TViewProfileNotifData }) => {
  const navigate = useNavigate();
  return (
    <div className="flex-grow">
      <p className="text-[12px] text-[#999999] pb-[6px]">
        <span className="font-semibold pr-[4px] text-white">
          {notification.sender.displayName}
        </span>
        <span>viewed your profile </span>
      </p>
      <div className=" flex items-center gap-2 pt-[4px]">
        <NotificationButton
          buttonName="View Profile"
          bgColor="bg-[#9EFF00]"
          textColor="text-black"
          borderColor="border-transparent"
          onClick={() => navigate(`/profile/${notification.sender.username}`)}
        />
      </div>
    </div>
  );
};

export default ViewProfileNotifContent;