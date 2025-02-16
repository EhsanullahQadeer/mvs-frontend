import { truncateFilename } from 'utils/dateUtils';
import FileMediaAttachment from '../FileMediaAttachment';
import audioIcon from "../../../../../../assets/img/voice.svg";
import { TNotificationData } from "../Notification";

export type TViewDemoNotifData = TNotificationData & {
  filename?: string;
  sampleId?: string;
  sampleName?: string;
  sampleFilename?: string;
  mediaName?: string;
}

const ViewDemoNotifContent = ({ notification }: { notification: TViewDemoNotifData }) => {
  return (
    <div className="flex-grow">
      <p className="text-[12px] text-[#999999] pb-[6px]">
        <span className="font-semibold pr-[4px] text-white">
          {notification.sender.displayName}
        </span>
        <span>viewed a demo </span>
        <span className="font-semibold pr-[4px] text-[#0185FF]">
          "{notification.sample.name}"
        </span>
      </p>
      <FileMediaAttachment
        icon={audioIcon}
        mediaName={truncateFilename(notification.sample.filename)}
        //mediaSize={data.mediaSize || ''}
      />
    </div>
  );
};

export default ViewDemoNotifContent;