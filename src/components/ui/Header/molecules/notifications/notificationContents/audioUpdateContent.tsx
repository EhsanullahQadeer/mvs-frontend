import NotificationButton from "components/ui/Header/atoms/notificationAtoms/NotificationsButton";
import { TNotificationData } from "../Notification";

export type TAudioUpdateNotifData = TNotificationData & {
  filename?: string;
  sampleId?: string;
  sampleName?: string;
  sampleFilename?: string;
}

const AudioUpdateNotifContent = ({ notification }: { notification: TAudioUpdateNotifData }) => {
  return (
    <div className="flex-grow">
      <p className="text-[12px] text-[#999999] pb-[6px]">
        <span className="font-semibold pr-[4px] text-white">
          {notification.sender.displayName}
        </span>
        <span>has updated the audio file </span>
        <span className="font-semibold pr-[4px] text-[#0185FF]">
            "{notification.sampleName}"
          </span>
        <span>View latest version. </span>
      </p>
      <div className=" flex items-center gap-2 pt-[4px]">
        <NotificationButton
          buttonName="View Details"
          bgColor="bg-[#9EFF00]"
          textColor="text-black"
          borderColor="border-transparent"
          onClick={() => console.log("Viewing Details")}
        />
      </div>
    </div>
  );
};

export default AudioUpdateNotifContent;