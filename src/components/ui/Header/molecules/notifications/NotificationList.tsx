import React from "react";
import Notification, { TNotificationData } from "./Notification";

interface NotificationProps {
  data: Array<{
    type: string;
    [key: string]: any;
  }>;
  setNotifIdForIsRead: (id: number) => void;
  unreadNotifCount: number;
  setUnreadNotifCount: any;
}

const NotificationList: React.FC<NotificationProps> = ({ data, unreadNotifCount, setUnreadNotifCount }) => {
  //console.log("Notif List Unread count: ", unreadNotifCount);
  return (
    <div className="notification-list">
      {data.map((element, index) => {
        return (
          <Notification 
            key={index} 
            notification={element as TNotificationData}
            unreadNotifCount={unreadNotifCount}
            setUnreadNotifCount={setUnreadNotifCount}/>
        )
      })}
    </div>
  );
};

export default NotificationList;