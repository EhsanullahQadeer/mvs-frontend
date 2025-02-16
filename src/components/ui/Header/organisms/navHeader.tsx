/*************************************************************************
 * @file Header.tsx
 * @author End Quote
 * @desc Provides layout and navigation for the application.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* IMPORTS */
import { useNavigate } from "react-router-dom";
import { getUserNotifications } from "api/user";
import React, { useEffect, useState } from "react";
import { UserData } from "theme/Header/Header.types";
import HeaderNavMenu from "../molecules/headerNavMenu";
import ProfileButton from "theme/Sidebar/ProfileButton";
import NotificationPopUpWindow from "./NotificationsManager";
import { useNotification } from "services/WebSocket/useNotification.hook";
import NotificationButton from "../atoms/notificationAtoms/notificationBellButton";
import notificationSound from "../../../../assets/audio/notification.mp3";
import { TNotificationData } from "../molecules/notifications/Notification";
import NotificationBellButton from "../atoms/notificationAtoms/notificationBellButton";

const NOTIFICATION_GROUPS = {
  social: [
    'CONNECTION_REQUEST',
    'CONNECTION_RESPONSE',
    'COLLABORATION_REQUEST',
    'COLLABORATION_ACCEPT',
    'FEEDBACK_PROVIDED',
    'NEW_COLLABORATOR',
    'AUDIO_SHARE',
  ],
  activity: [
    'FOLLOW',
    'LIKE',
    'AUDIO_UPDATE',
    'DOWNLOAD_FILE',
    'VIEW_PROFILE',
    'VIEW_DEMO',
  ]
} as const;

const NavHeader: React.FC<UserData> = ({ name }) => {
  const navigate = useNavigate();
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
  
  const fetchNotifications = async () => {
    const notifications = await getUserNotifications();
    console.log('notifications', notifications);
    setNotifications(notifications?.data);
  };

  const handleNotification = (rawData: any) => {
    const formattedNotification: TNotificationData = {
      id: Date.now(), // SNS messages don't include an id, so we generate one
      type: rawData.type,
      created_at: rawData.data.created_at,
      is_read: rawData.data.is_read,
      sender: {
        id: rawData.data.sender.id,
        displayName: rawData.data.sender.displayName,
        thumbnail: rawData.data.sender.thumbnail,
        username: rawData.data.sender.username,
      },
      sample: rawData.data.sampleId ? {
        id: Number(rawData.data.sampleId),
        name: rawData.data.sampleName,
        filename: rawData.data.sampleFilename,
      } : null,
      media: rawData.data.mediaId ? {
        id: Number(rawData.data.mediaId),
        name: rawData.data.mediaName,
      } : null,
      metadata: rawData.data.metadata || {},
    };

    setNotifications(prev => {
      if (window.isNotificationInCurrentTab?.(formattedNotification.type)) {
        return [formattedNotification, ...prev];
      }
      return prev;
    });
    playSound();
  };

  const playSound = () => {
    const audio = new Audio(notificationSound);
    audio.play().catch(err => {
      console.warn('Could not play notification sound:', err);
    });
  };

  // Register each notification type individually
  useNotification('CONNECTION_REQUEST', handleNotification);
  useNotification('CONNECTION_RESPONSE', handleNotification);
  useNotification('COLLABORATION_REQUEST', handleNotification);
  useNotification('COLLABORATION_ACCEPT', handleNotification);
  useNotification('FEEDBACK_PROVIDED', handleNotification);
  useNotification('NEW_COLLABORATOR', handleNotification);
  useNotification('AUDIO_SHARE', handleNotification);
  useNotification('FOLLOW', handleNotification);
  useNotification('LIKE', handleNotification);
  useNotification('AUDIO_UPDATE', handleNotification);
  useNotification('DOWNLOAD_FILE', handleNotification);
  useNotification('VIEW_PROFILE', handleNotification);
  useNotification('VIEW_DEMO', handleNotification);

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    console.log('notifications', notifications);
    // Check for unread notifications
    const unreadExists = notifications.some(notification => !notification.is_read);
    console.log("Unread Notifications: ", unreadExists);
    setHasUnreadNotifications(unreadExists); // Update the state based on the check
  }, [notifications]);


  const handleNotifClick = () => {
    setIsPopUpVisible((prev) => !prev);
  };

  const menuItems = [
    {
      label: "Home",
      onClick: () => navigate('/home'),
      icon: (
        <svg width="20" height="23" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 21.5V11.5H13V21.5M1 8.5L10 1.5L19 8.5V19.5C19 20.0304 18.7893 20.5391 18.4142 20.9142C18.0391 21.2893 17.5304 21.5 17 21.5H3C2.46957 21.5 1.96086 21.2893 1.58579 20.9142C1.21071 20.5391 1 20.0304 1 19.5V8.5Z"
            stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      ),
      pathname: "/home"
    },
    // {
    //   label: "Browse",
    //   onClick: () => navigate('/inbox'),
    //   icon: (
    //     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
    //       <path stroke-linecap="round" stroke-linejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    //     </svg>

    //   ),
    //   pathname: "/inbox"
    // },
    {
      label: "Samples",
      onClick: () => navigate('/library'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
        </svg>

      ),
      pathname: "/library"
    },
    // {
    //   label: "Marketplace",
    //   onClick: () => navigate('/settings'),
    //   icon: (
    //     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
    //       <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
    //     </svg>
    //   ),
    //   pathname: "/settings"
    // },
  ];
  
  return (
    <>
      <HeaderNavMenu menuItems={menuItems}></HeaderNavMenu>
      <NotificationBellButton onClick={handleNotifClick} unreadNotifications={hasUnreadNotifications}/>
      <ProfileButton></ProfileButton>

      {isPopUpVisible && (
        <NotificationPopUpWindow
        notifications={notifications}
        isOpen={isPopUpVisible}
        setIsOpen={setIsPopUpVisible}
        setNotifications={setNotifications}
        />
      )}
    </>    
  );
};

export default NavHeader;