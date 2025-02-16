import NotificationButton from "components/ui/Header/atoms/notificationAtoms/NotificationsButton";
import { TNotificationData } from "../Notification";

export type TConnectionResponseNotifData = TNotificationData & {
  filename?: string;
  sampleId?: string;
  sampleName?: string;
  sampleFilename?: string;
  mediaName?: string;
}

const ConnectionResponseNotifContent = ({ notification }: { notification: TConnectionResponseNotifData }) => {
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
          onClick={() => console.log("Viewing Profile")}
        />
      </div>
    </div>
  );
};

export default ConnectionResponseNotifContent;