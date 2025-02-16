import { truncateFilename } from 'utils/dateUtils';
import FileMediaAttachment from '../FileMediaAttachment';
import audioIcon from "../../../../../../assets/img/voice.svg";
import { TNotificationData } from '../Notification';

export type TDownloadFileNotifData = TNotificationData & {
  filename?: string;
  sampleId?: string;
  sampleName?: string;
  sampleFilename?: string;
}

const DownloadFileNotifContent = ({ notification }: { notification: TDownloadFileNotifData }) => {
  return (
    <div className="flex-grow">
      <div>
        <p className="text-[12px] text-[#999999] pb-[6px]">
          <span className="font-semibold pr-[4px] text-white">
            {notification.sender.displayName}
          </span>
          <span>downloaded your file </span>
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
    </div>
  );
};

export default DownloadFileNotifContent;