import NotificationButton from "components/ui/Header/atoms/notificationAtoms/NotificationsButton";
import { TNotificationData } from "../Notification";

export type TFeedbackProvidedNotifData = TNotificationData & {
  filename?: string;
  sampleId?: string;
  sampleName?: string;
  sampleFilename?: string;
  mediaName?: string;
}

const FeedbackProvidedNotifContent = ({ notification }: { notification: TFeedbackProvidedNotifData }) => {
  return (
    <div className="flex-grow">
      <p className="text-[12px] text-[#999999] pb-[6px]">
        <span className="font-semibold pr-[4px] text-white">
          {notification.sender.displayName}
        </span>
        <span>has provided feedback on your audio demo </span>
        <span className="font-semibold pr-[4px] text-[#0185FF]">
            "{notification.mediaName}"
          </span>
      </p>
      <div className=" flex items-center gap-2 pt-[4px]">
        <NotificationButton
          buttonName="View Feedback"
          bgColor="bg-[#9EFF00]"
          textColor="text-black"
          borderColor="border-transparent"
          onClick={() => console.log("Viewing Feedback")}
        />
      </div>
    </div>
  );
};

export default FeedbackProvidedNotifContent;