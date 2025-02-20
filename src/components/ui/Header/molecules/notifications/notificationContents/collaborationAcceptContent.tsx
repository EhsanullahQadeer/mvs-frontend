import { TNotificationData } from "../Notification";

const CollaborationAcceptNotifContent = ({ notification }: { notification: TNotificationData }) => {
  return (
    <div className="flex-grow">
      <p className="text-[12px] text-[#999999] pb-[6px]">
        <span className="font-semibold pr-[4px] text-white">
          {notification.sender.displayName}
        </span>
        <span>has accepted your collaboration request as a </span>
        <span className="font-semibold pr-[4px] text-white">
          {notification.collaborationRequest? notification.collaborationRequest.roles[0] : ""}
          </span>
        <span>on the sample </span>
        <span className="font-semibold pr-[4px] text-[#0185FF]">
          "{notification.sample.name}"
        </span>
      </p>
    </div>
  );
};

export default CollaborationAcceptNotifContent;