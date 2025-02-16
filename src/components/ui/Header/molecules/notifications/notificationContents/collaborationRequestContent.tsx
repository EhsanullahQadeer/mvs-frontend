import NotificationButton from "components/ui/Header/atoms/notificationAtoms/NotificationsButton";
import { TNotificationData } from "../Notification";

export type TCollaborationRequestNotifData = TNotificationData & {
  filename?: string;
  sampleId?: string;
  sampleName?: string;
  tag?: string[];
}

const CollaborationRequestNotifContent = ({ notification }: { 
  notification: TCollaborationRequestNotifData 
}) => {
  return (
    <div className="flex-grow">
      <p className="text-[12px] text-[#999999] pb-[6px]">
        <span className="font-semibold pr-[4px] text-white">
            {notification.sender.displayName}
        </span>
        <span>has tagged you as a </span>
        <span className="font-semibold pr-[4px] text-white">
          {notification.tag ? notification.tag[0] : ""}
        </span>
        <span>on the demo </span>
        <span className="font-semibold pr-[4px] text-[#0185FF]">
            "{notification.sample.name}"
          </span>
      </p>
      <div className=" flex items-center gap-2 pt-[4px]">
        <NotificationButton
          buttonName="Accept"
          bgColor="bg-[#9EFF00]"
          textColor="text-black"
          borderColor="border-transparent"
          onClick={() => console.log("Accepted Collaboration Request")}
        />
        <NotificationButton
          buttonName="Deny"
          bgColor="bg-transparent"
          textColor="text-white"
          borderColor="border-white"
          onClick={() => console.log("Denied Collaboration Request")}
        />
      </div>
    </div>
  );
};

export default CollaborationRequestNotifContent;