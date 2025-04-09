import { truncateFilename } from 'shared/utils/dateUtils';
import { TNotificationData } from '../Notification';
import FileMediaAttachment from '../FileMediaAttachment';
import audioIcon from "../../../../../../assets/img/voice.svg";

const LikeNotifContent = ({ notification }: { notification: TNotificationData }) => {
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