import { truncateFilename } from 'utils/dateUtils';
import { TNotificationData } from "../Notification";
import FileMediaAttachment from '../FileMediaAttachment';
import audioIcon from "../../../../../../assets/img/voice.svg";

const ViewDemoNotifContent = ({ notification }: { notification: TNotificationData }) => {
  return (
    <div className="flex-grow">
      <p className="text-[12px] text-[#999999] pb-[6px]">
        <span className="font-semibold pr-[4px] text-white">
          {notification.sender.displayName}
        </span>
        <span>viewed your demo </span>
      </p>
      <FileMediaAttachment
        icon={audioIcon}
        mediaName={truncateFilename(notification.media.name)}
        //mediaSize={data.mediaSize || ''}
      />
    </div>
  );
};

export default ViewDemoNotifContent;