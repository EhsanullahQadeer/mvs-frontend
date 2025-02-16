import NotificationButton from "components/ui/Header/atoms/notificationAtoms/NotificationsButton";
import { TNotificationBase } from "./notification_base.type";
import { TNotificationData } from "../Notification";

export type TFollowNotifData = TNotificationData & {
  filename?: string;
  sampleId?: string;
  sampleName?: string;
}

const FollowNotifContent = ({ notification }: { notification: TFollowNotifData }) => {
  return (
    <div className="flex-grow">
      <p className="text-[12px] text-[#999999] pb-[6px]">
        <span className="font-semibold pr-[4px] text-white">
          {notification.sender.displayName}
        </span>
        <span>is now following you.</span>
      </p>
      <div className=" flex items-center gap-2 pt-[4px]">
        <NotificationButton
          buttonName="Follow Back"
          bgColor="bg-[#9EFF00]"
          textColor="text-black"
          borderColor="border-transparent"
          onClick={() => console.log("Now Following")}
        />
        <NotificationButton
          buttonName="View Profile"
          bgColor="bg-transparent"
          textColor="text-white"
          borderColor="border-white"
          onClick={() => console.log("Redirecting to View Profile")}
        />
      </div>
    </div>
  );
};

export default FollowNotifContent;