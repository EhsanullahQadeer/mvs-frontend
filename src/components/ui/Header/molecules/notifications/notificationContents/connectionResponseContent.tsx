import { useNavigate } from "react-router-dom";
import { TNotificationData } from "../Notification";
import NotificationButton from "components/ui/Header/atoms/notificationAtoms/NotificationsButton";

const ConnectionResponseNotifContent = ({ notification }: { notification: TNotificationData }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex-grow">
      <p className="text-[12px] text-[#999999] pb-[6px]">
        <span className="font-semibold pr-[4px] text-white">
          {notification.sender.displayName}
        </span>
        <span>has accepted your connection request and you’ve unlocked exclusive content.</span>
      </p>
      <div className=" flex items-center gap-2 pt-[4px]">
        <NotificationButton
          buttonName="View Profile"
          bgColor="bg-[#9EFF00]"
          textColor="text-black"
          borderColor="border-transparent"
          onClick={() => navigate(`/profile/${notification.sender.username}`)}
          icon={null}
        />
      </div>
    </div>
  );
};

export default ConnectionResponseNotifContent;