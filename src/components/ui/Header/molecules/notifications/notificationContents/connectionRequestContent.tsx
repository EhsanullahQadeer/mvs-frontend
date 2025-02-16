import NotificationButton from "components/ui/Header/atoms/notificationAtoms/NotificationsButton";
import { TNotificationBase } from "./notification_base.type";
import { TNotificationData } from "../Notification";

export type TConnectionRequestNotifData = TNotificationData & {
  filename?: string;
  sampleId?: string;
  sampleName?: string;
  sampleFilename?: string;
}

const ConnectionRequestNotifContent = ({ notification }: { 
  notification: TConnectionRequestNotifData 
}) => {
  return (
    <div className="flex-grow">
      <p className="text-[12px] text-[#999999] pb-[6px]">
        <span className="font-semibold pr-[4px] text-white">
            {notification.sender.displayName}
        </span>
        <span>sent you a connect request.</span>
      </p>
      <div className=" flex items-center gap-2 pt-[4px]">
        <NotificationButton
          buttonName="Accept"
          bgColor="bg-[#9EFF00]"
          textColor="text-black"
          borderColor="border-transparent"
          onClick={() => console.log("Now Connected")}
        />
        <NotificationButton
          buttonName="Decline"
          bgColor="bg-transparent"
          textColor="text-white"
          borderColor="border-white"
          onClick={() => console.log("Declined Connection")}
        />
      </div>
    </div>
  );
};

export default ConnectionRequestNotifContent;