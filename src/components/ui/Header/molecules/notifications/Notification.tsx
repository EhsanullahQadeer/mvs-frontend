import { useEffect, useState } from "react";
import { toggleNotificationAsRead } from "api/notifier";
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

export type TRecipient = {
  id: number;
  displayName: string;
  thumbnail: string;
  username: string;
}

export type TNotificationData = {
  createdAt: string;
  id: number;
  isRead: boolean;
  recipient: TRecipient;
  sample: {
    id: number;
    name: string;
    filename: string;
  };
  media: {
    id: number;
    name: string;
  };
  sender: TSender;
  type: string;
  connectionRequest: {
    id: number;
    status: boolean;
  }
  collaborationRequest: {
    id: number;
    roles: string[];
    status: string;
  }
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

const Notification = ({ notification, unreadNotifCount, setUnreadNotifCount }: { notification: TNotificationData, unreadNotifCount: number, setUnreadNotifCount: any }) => {
  const [isClosing, setIsClosing] = useState(false); // New state for closing animation

  const NotificationContent = 
    NOTIFICATION_COMPONENTS[notification.type as keyof typeof NOTIFICATION_COMPONENTS];

  const handleMarkAsRead = async () => {
    try {
      await toggleNotificationAsRead(notification.id);
      if(notification.isRead) {
        setUnreadNotifCount(unreadNotifCount + 1);
      } else {
        setUnreadNotifCount(unreadNotifCount - 1);
        setIsClosing(true);  // THIS DOES NOTHING
      }
      notification.isRead = !notification.isRead;
      setTimeout(() => {
      }, 300); // Match this duration with your CSS transition duration
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  return (
    <div 
      className={"flex group"} >
      <div className="py-10 pr-5 pl-3 flex flex-grow bg-[#1C1C1C] hover:bg-[#242424] border-b-2 border-b-[#242424]">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <ReadBubble isRead={notification.isRead} />
            <div className="mr-2">
              <Thumbnail thumbnail={notification.sender.thumbnail} />
            </div>
          </div>
          <div className="flex-grow">
            {NotificationContent && <NotificationContent notification={notification} />}
          </div>
          <div className="flex items-center max-w-[36px] ml-2 ">
            <div className="hidden group-hover:flex">
              <CheckmarkButton onClick={handleMarkAsRead} />
            </div>
            <div className="flex group-hover:hidden">
              <NotifTimestamp
                isRead={notification.isRead}
                id={notification.id}
                createdAt={notification.createdAt}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;