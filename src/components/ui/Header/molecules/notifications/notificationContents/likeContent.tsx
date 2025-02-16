import { truncateFilename } from 'utils/dateUtils';
import FileMediaAttachment from '../FileMediaAttachment';
import audioIcon from "../../../../../../assets/img/voice.svg";
import { TNotificationBase } from "./notification_base.type";
import { TNotificationData } from '../Notification';

export type TLikeNotifData = TNotificationData & {
  filename?: string;
  sampleId?: string;
  sampleName?: string;
}

const LikeNotifContent = ({ notification }: { notification: TLikeNotifData }) => {
  console.log('like notification', notification);
  return (
    <div>
      <p className="text-[12px] text-[#999999] pb-[6px]">
        <span className="font-semibold pr-[4px] text-white">
          {notification.sender.displayName}
        </span>
        <span>liked your file </span>
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

export default LikeNotifContent;