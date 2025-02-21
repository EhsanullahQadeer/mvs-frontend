import React from "react";
import Notification, { NotificationData } from "./Notification";

interface NotificationProps {
  data: Array<{
    type: string;
    [key: string]: any;
  }>;
  setNotifIdForIsRead: (id: number) => void;
}

const NotificationList: React.FC<NotificationProps> = ({ data, setNotifIdForIsRead }) => {
  
  console.log("Notifications List: ", data);
  return (
    <div className="notification-list">
      {data.map((notification, index) => {
        return <Notification key={index} notification={notification as NotificationData} markAsRead={()=> setNotifIdForIsRead(notification.id)}></Notification>
        })}
    </div>
  );
};

export default NotificationList;