import { useState } from "react";
import NotifTimestamp from "../../atoms/notificationAtoms/notifTimestamp";
import ReadBubble from "components/ui/Header/atoms/notificationAtoms/readOrUnreadBubble";
import CheckmarkButton from "../../atoms/notificationAtoms/markNotificationAsReadButton";
import Thumbnail from "components/ui/Header/atoms/notificationAtoms/notificationThumbnail";

import { toggleNotificationAsRead } from "api/notifier";

export interface NotificationData {
  created_at?: string;
  id?: number;
  is_read?: boolean;
  media?: {
    id?: string;
    name?: string;
  };
  sample?: string;
  sender?: {
    displayName?: string;
    id?: number;
    thumbnail?: string;
    username?: string;
  };
  type?: string;
}

const Notification = ({ notification, markAsRead }: { notification: NotificationData, markAsRead: () => void }) => {
  let notificationContentType;

  const [isHovered, setIsHovered] = useState(false); // State to track hover

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  switch (notification.type) {
    // case "LIKE":
    //   notificationContentType = <LikeNotifContent notification={notification} />;
    //   break;
    // case "COLLABORATION_REQUEST":
    //   notificationContentType = <CollaborationRequestNotifContent notification={notification} />;
    //   break;
    // case "COLLABORATION_ACCEPT":
    //   notificationContentType = <CollaborationAcceptNotifContent notification={notification} />;
    //   break;
    // case "NEW_COLLABORATOR":
    //   notificationContentType = <NewCollaboratorNotifContent notification={notification} />;
    //   break;
    // case "DOWNLOAD_FILE":
    //   notificationContentType = <DownloadFileNotifContent notification={notification} />;
    //   break;
    // case "AUDIO_UPDATE":
    //   notificationContentType = <AudioUpdateNotifContent notification={notification} />;
    //   break;
    // case "AUDIO_SHARE":
    //   notificationContentType = <AudioShareNotifContent notification={notification} />;
    //   break;
    // case "FEEDBACK_PROVIDED":
    //   notificationContentType = <FeedbackProvidedNotifContent notification={notification} />;
    //   break;
    // case "FOLLOW":
    //   notificationContentType = <FollowNotifContent notification={notification} />;
    //   break;
    // case "CONNECTION_REQUEST":
    //   notificationContentType = <ConnectionRequestNotifContent notification={notification} />;
    //   break;
    // case "CONNECTION_RESPONSE":
    //   notificationContentType = <ConnectionResponseNotifContent notification={notification} />;
    //   break;
    // case "VIEW_DEMO":
    //   notificationContentType = <ViewDemoNotifContent notification={notification} />;
    //   break;
    // case "VIEW_PROFILE":
    //   notificationContentType = <ViewProfileNotifContent notification={notification} />;
    //   break;
    // Add other cases as needed
    default:
      notificationContentType = null;
      break;
  }
  
  return (
    <div className="flex" onMouseEnter={handleMouseEnter} // Set hover state on mouse enter
    onMouseLeave={handleMouseLeave} // Reset hover state on mouse leave
  >
      <div className="py-10 pr-5 pl-3 flex flex-grow bg-[eerieBlack] hover:bg-[#242424] border-b-2 border-b-[#242424] ">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center flex-shrink-0">
            <ReadBubble isRead={notification.is_read}></ReadBubble>
            <div className="mr-2">
              <Thumbnail thumbnail={notification.sender.thumbnail}></Thumbnail>
            </div>
          </div>
          <div className="flex-grow">
            {notificationContentType}          
          </div>
          <div className="flex items-center max-w-[36px] ml-2">
            {/* {isHovered && !isRead ? ( */}
            {isHovered ? (
              <CheckmarkButton onClick={() => {
                toggleNotificationAsRead(notification.id).then(() => markAsRead());
              }} />
            ) : (
              <NotifTimestamp isRead={notification.is_read} id={notification.id} createdAt={notification.created_at} ></NotifTimestamp>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;