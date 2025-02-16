import React from "react";
import Notification, { TNotificationData } from "./Notification";

interface NotificationProps {
  data: Array<{
    type: string;
    [key: string]: any;
  }>;
  setNotifIdForIsRead: (id: number) => void;
}

const NotificationList: React.FC<NotificationProps> = ({ data }) => {
  return (
    <div className="notification-list">
      {data.map((element, index) => {
        return (
          <Notification 
            key={index} 
            notification={element as TNotificationData}/>
        )
      })}
    </div>
  );
};

export default NotificationList;