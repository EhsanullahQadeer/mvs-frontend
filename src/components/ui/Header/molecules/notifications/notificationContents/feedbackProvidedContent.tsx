import { useNavigate } from "react-router-dom";
import { TNotificationData } from "../Notification";
import NotificationButton from "components/ui/Header/atoms/notificationAtoms/NotificationsButton";

const FeedbackProvidedNotifContent = ({ notification }: { notification: TNotificationData }) => {
  const navigate = useNavigate();

  return (
    <div className="flex-grow">
      <p className="text-[12px] text-[#999999] pb-[6px]">
        <span className="font-semibold pr-[4px] text-white">
          {notification.sender.displayName}
        </span>
        <span>has provided feedback on your audio demo </span>
        <span className="font-semibold pr-[4px] text-[#0185FF]">
            "{notification.media.name}"
          </span>
      </p>
      <div className=" flex items-center gap-2 pt-[4px]">
        <NotificationButton
          buttonName="View Feedback"
          bgColor="bg-[#9EFF00]"
          textColor="text-black"
          borderColor="border-transparent"
          onClick={() => navigate(`/inbox`)}
          icon={null}
        />
      </div>
    </div>
  );
};

export default FeedbackProvidedNotifContent;