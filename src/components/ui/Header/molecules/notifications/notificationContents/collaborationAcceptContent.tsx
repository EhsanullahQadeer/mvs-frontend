import NotificationButton from "components/ui/Header/atoms/notificationAtoms/NotificationsButton";
import { TNotificationData } from "../Notification";

export type TCollaborationAcceptNotifData = TNotificationData & {
  filename?: string;
  sampleId?: string;
  sampleName?: string;
  tag?: string[];
}

const CollaborationAcceptNotifContent = ({ notification }: { notification: TCollaborationAcceptNotifData }) => {
  return (
    <div className="flex-grow">
      <p className="text-[12px] text-[#999999] pb-[6px]">
        <span className="font-semibold pr-[4px] text-white">
          {notification.sender.displayName}
        </span>
        <span>has tagged you as a </span>
        <span className="font-semibold pr-[4px] text-white">
          {notification.metadata.tag}
          </span>
        <span>on the sample </span>
        <span className="font-semibold pr-[4px] text-[#0185FF]">
            "{notification.sample.name}"
          </span>
      </p>
      <div className=" flex items-center gap-2 pt-[4px]">
        <NotificationButton
          buttonName="View File"
          bgColor="bg-[#9EFF00]"
          textColor="text-black"
          borderColor="border-transparent"
          onClick={() => console.log("Viewing File")}
        />
      </div>
    </div>
  );
};

export default CollaborationAcceptNotifContent;