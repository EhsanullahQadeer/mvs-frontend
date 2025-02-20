import { useNavigate } from 'react-router-dom';
import { truncateFilename } from 'utils/dateUtils';
import { TNotificationData } from '../Notification';
import FileMediaAttachment from '../FileMediaAttachment';
import audioIcon from "../../../../../../assets/img/voice.svg";
import NotificationButton from 'components/ui/Header/atoms/notificationAtoms/NotificationsButton';

const AudioShareNotifContent = ({ notification }: { notification: TNotificationData }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex-grow">
      <p className="text-[12px] text-[#999999] pb-[6px]">
        <span className="font-semibold pr-[4px] text-white">
          {notification.sender.displayName}
        </span>
        <span>has shared an audio file with you.</span>
      </p>
      <FileMediaAttachment
          icon={audioIcon}
          mediaName={truncateFilename(notification.media.name)}
        />
      <div className=" flex items-center gap-2 pt-[4px]">
        <NotificationButton
          buttonName="View File"
          bgColor="bg-[#9EFF00]"
          textColor="text-black"
          borderColor="border-transparent"
          onClick={() => navigate(`/inbox`)}
          icon={null}
        />
      </div>
    </div>
  );
};

export default AudioShareNotifContent;