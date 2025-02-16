import { useState } from "react";
import { markNotificationAsRead } from "api/user";
import NotifTimestamp from "../../atoms/notificationAtoms/notifTimestamp";
import AudioShareNotifContent from "./notificationContents/audioShareContent";
import ReadBubble from "components/ui/Header/atoms/notificationAtoms/readOrUnreadBubble";
import CheckmarkButton from "../../atoms/notificationAtoms/markNotificationAsReadButton";
import Thumbnail from "components/ui/Header/atoms/notificationAtoms/notificationThumbnail";
import LikeNotifContent from "components/ui/Header/molecules/notifications/notificationContents/likeContent";
import FollowNotifContent from "components/ui/Header/molecules/notifications/notificationContents/followContent";
import ViewDemoNotifContent from "components/ui/Header/molecules/notifications/notificationContents/viewDemoContent";
import AudioUpdateNotifContent from "components/ui/Header/molecules/notifications/notificationContents/audioUpdateContent";
import ViewProfileNotifContent from "components/ui/Header/molecules/notifications/notificationContents/viewProfileContent";
import DownloadFileNotifContent from "components/ui/Header/molecules/notifications/notificationContents/downloadFileContent";
import NewCollaboratorNotifContent from "components/ui/Header/molecules/notifications/notificationContents/newCollaboratorContent";
import FeedbackProvidedNotifContent from "components/ui/Header/molecules/notifications/notificationContents/feedbackProvidedContent";
import ConnectionRequestNotifContent from "components/ui/Header/molecules/notifications/notificationContents/connectionRequestContent";
import ConnectionResponseNotifContent from "components/ui/Header/molecules/notifications/notificationContents/connectionResponseContent";
import CollaborationAcceptNotifContent from "components/ui/Header/molecules/notifications/notificationContents/collaborationAcceptContent";
import CollaborationRequestNotifContent from "components/ui/Header/molecules/notifications/notificationContents/collaborationRequestContent";

export type TSender = {
  id: number;
  displayName: string;
  thumbnail: string;
  username: string;
}

export type TNotificationData = {
  created_at: string;
  sender: TSender;
  id: number;
  is_read: boolean;
  type: string;
  metadata: any,
  media: {
    id: number;
    name: string;
  };
  sample: {
    id: number;
    name: string;
    filename: string;
  };
}

const NOTIFICATION_COMPONENTS = {
  LIKE: LikeNotifContent,
  COLLABORATION_REQUEST: CollaborationRequestNotifContent,
  COLLABORATION_ACCEPT: CollaborationAcceptNotifContent,
  NEW_COLLABORATOR: NewCollaboratorNotifContent,
  DOWNLOAD_FILE: DownloadFileNotifContent,
  AUDIO_UPDATE: AudioUpdateNotifContent,
  AUDIO_SHARE: AudioShareNotifContent,
  FEEDBACK_PROVIDED: FeedbackProvidedNotifContent,
  FOLLOW: FollowNotifContent,
  CONNECTION_REQUEST: ConnectionRequestNotifContent,
  CONNECTION_RESPONSE: ConnectionResponseNotifContent,
  VIEW_DEMO: ViewDemoNotifContent,
  VIEW_PROFILE: ViewProfileNotifContent,
} as const;

const Notification = ({ notification }: { notification: TNotificationData }) => {
  const [isHovered, setIsHovered] = useState(false);

  const NotificationContent = 
    NOTIFICATION_COMPONENTS[notification.type as keyof typeof NOTIFICATION_COMPONENTS];

  const handleMarkAsRead = async () => {
    try {
      await markNotificationAsRead(notification.id);
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  return (
    <div 
      className="flex" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="py-10 pr-5 pl-3 flex flex-grow bg-[eerieBlack] hover:bg-[#242424] border-b-2 border-b-[#242424]">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center flex-shrink-0">
            <ReadBubble isRead={notification.is_read} />
            <div className="mr-2">
              <Thumbnail thumbnail={notification.sender.thumbnail} />
            </div>
          </div>
          <div className="flex-grow">
            {NotificationContent && <NotificationContent notification={notification} />}
          </div>
          <div className="flex items-center max-w-[36px] ml-2">
            {isHovered ? (
              <CheckmarkButton onClick={handleMarkAsRead} />
            ) : (
              <NotifTimestamp
                isHovered={isHovered}
                isRead={notification.is_read}
                id={notification.id}
                createdAt={notification.created_at}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;