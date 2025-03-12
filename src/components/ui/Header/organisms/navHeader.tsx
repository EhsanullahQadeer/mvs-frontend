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
import { UserData } from "theme/Header/Header.types";
import HeaderNavMenu from "../molecules/headerNavMenu";
import ProfileButton from "theme/Sidebar/ProfileButton";
import { useHeaderHooks } from "theme/Header/Header.hooks";
import HeaderCreditCount from "../atoms/headerCreditCount";
import NotificationPopUpWindow from "./NotificationsManager";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNotification } from "services/WebSocket/useNotification.hook";
import { TNotificationData } from "../molecules/notifications/Notification";
import NotificationBellButton from "../atoms/notificationAtoms/notificationBellButton";
import { useNotificationAnimation , NotificationAnimationProvider } from "../context/NotificationAnimationContext";
import { debounce } from "lodash";

const NOTIFICATION_SOUND_URL = process.env.REACT_APP_CDN_URL + '/audio/notification.mp3';
const MESSAGE_NOTIFICATION_SOUND_URL = process.env.REACT_APP_CDN_URL + '/audio/mvssive-message-notification.mp3';

const NavHeader: React.FC<UserData> = () => {
  const navigate = useNavigate();
  const { state } = useHeaderHooks();
  const [credits, setCredits] = useState<number>(0);
  const [notifications, setNotifications] = useState([]);
  const { triggerAnimation } = useNotificationAnimation();
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [unreadNotifCount, setUnreadNotifCount] = useState<number>(0);
  const [allowLoading, setAllowLoading] = useState<boolean>(true);

  const notificationAudioRef = useRef<HTMLAudioElement | null>(null);
  const messageAudioRef = useRef<HTMLAudioElement | null>(null);
  const audioLoadedRef = useRef<boolean>(false);

  // Initialize audio refs with better loading handling
  useEffect(() => {
    const initAudio = async () => {
      try {
        // Create and configure notification audio
        notificationAudioRef.current = new Audio(NOTIFICATION_SOUND_URL);
        notificationAudioRef.current.crossOrigin = "anonymous";
        notificationAudioRef.current.preload = "auto";
        
        // Create and configure message audio
        messageAudioRef.current = new Audio(MESSAGE_NOTIFICATION_SOUND_URL);
        messageAudioRef.current.crossOrigin = "anonymous";
        messageAudioRef.current.preload = "auto";

        // Wait for both audio files to load
        await Promise.all([
          new Promise(resolve => {
            if (notificationAudioRef.current) {
              notificationAudioRef.current.addEventListener('canplaythrough', resolve, { once: true });
              notificationAudioRef.current.load();
            }
          }),
          new Promise(resolve => {
            if (messageAudioRef.current) {
              messageAudioRef.current.addEventListener('canplaythrough', resolve, { once: true });
              messageAudioRef.current.load();
            }
          })
        ]);

        audioLoadedRef.current = true;
        console.log('Audio files loaded successfully');

      } catch (error) {
        console.error('Error initializing audio:', error);
      }
    };

    initAudio();

    // Cleanup
    return () => {
      [notificationAudioRef, messageAudioRef].forEach(ref => {
        if (ref.current) {
          ref.current.pause();
          ref.current.src = '';
          ref.current = null;
        }
      });
      audioLoadedRef.current = false;
    };
  }, []);

  const playSound = useCallback(async (type: string) => {
    // Don't try to play if audio isn't loaded or tab is focused
    if (!audioLoadedRef.current || document.hasFocus()) {
      return;
    }

    const audioRef = type === 'NEW_MESSAGE' ? messageAudioRef : notificationAudioRef;
    
    if (audioRef.current) {
      try {
        // Stop any current playback
        audioRef.current.pause();
        audioRef.current.currentTime = 0;

        // Try to play with user interaction check
        await audioRef.current.play();
      } catch (error) {
        if (error instanceof DOMException && error.name === 'NotAllowedError') {
          console.warn('Audio playback requires user interaction first');
        } else {
          console.error('Error playing notification sound:', error);
        }
      }
    }
  }, []);

  // Create a debounced version of playSound to prevent rapid-fire sounds
  const debouncedPlaySound = useCallback(
    debounce((type: string) => playSound(type), 1000, { leading: true, trailing: false }),
    [playSound]
  );

  const handleNotification = useCallback((rawData: any) => {
    const formattedNotification: TNotificationData = {
      id: rawData?.id,
      type: rawData?.type,
      createdAt: rawData?.createdAt,
      isRead: rawData?.isRead,
      sender: {
        id: rawData?.sender?.id,
        displayName: rawData?.sender?.displayName,
        thumbnail: rawData?.sender?.thumbnail,
        username: rawData?.sender?.username,
      },
      recipient: {
        id: rawData?.recipient?.id,
        displayName: rawData?.recipient?.displayName,
        thumbnail: rawData?.recipient?.thumbnail,
        username: rawData?.recipient?.username,
      },
      sample: rawData?.sample ? {
        id: Number(rawData?.sample?.id),
        name: rawData?.sample?.name,
        filename: rawData?.sample?.filename,
      } : null,
      media: rawData?.media ? {
        id: Number(rawData?.media?.id),
        name: rawData?.media?.name,
      } : null,
      connectionRequest: rawData?.connectionRequest ? {
        id: rawData?.connectionRequest?.id,
        status: rawData?.connectionRequest?.status
      } : null,
      collaborationRequest: rawData?.collaborationRequest ? {
        id: rawData?.collaborationRequest?.id,
        roles: rawData?.collaborationRequest?.roles,
        status: rawData?.collaborationRequest?.status
      } : null,
    };

    setNotifications(prev => {
      if (window.isNotificationInCurrentTab?.(formattedNotification.type)) {
        return [formattedNotification, ...prev];
      }
      return prev;
    });

    // Use debounced play sound
    debouncedPlaySound(formattedNotification.type);
    
    triggerAnimation();
    setUnreadNotifCount(unreadNotifCount + 1);
  }, [debouncedPlaySound, triggerAnimation, unreadNotifCount]);

  const fetchNotifications = async () => {
    const notifications = await getUserNotifications([
      'CONNECTION_REQUEST',
      'CONNECTION_RESPONSE',
      'COLLABORATION_REQUEST',
      'COLLABORATION_ACCEPT',
      'FEEDBACK_PROVIDED',
      'NEW_COLLABORATOR',
      'AUDIO_SHARE',
      'FOLLOW',
      'LIKE',
      'AUDIO_UPDATE',
      'DOWNLOAD_FILE',
      'VIEW_PROFILE',
      'VIEW_DEMO',
      'NEW_MESSAGE',
    ], false, 0);
    setNotifications(notifications?.data);
  };

  const handleNotifClick = () => {
    fetchNotifications();
    setAllowLoading(true);
    setIsPopUpVisible((prev) => !prev);
  };

  const menuItems = [
    {
      label: "Home",
      onClick: () => navigate('/home'),
      icon: (
        <svg width="20" height="23" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 21.5V11.5H13V21.5M1 8.5L10 1.5L19 8.5V19.5C19 20.0304 18.7893 20.5391 18.4142 20.9142C18.0391 21.2893 17.5304 21.5 17 21.5H3C2.46957 21.5 1.96086 21.2893 1.58579 20.9142C1.21071 20.5391 1 20.0304 1 19.5V8.5Z"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      pathname: "/home"
    },
    {
      label: "Samples",
      onClick: () => navigate('/library'),
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
        </svg>

      ),
      pathname: "/library"
    },
  ];

  useEffect(() => {
    setUnreadNotifCount(state?.auth?.user?.unread_notification_count);
  }, [state?.auth?.user?.unread_notification_count]);

  useEffect(() => {
    setCredits(state?.auth?.user?.credits);
  }, [state?.auth?.user?.credits]);  

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    console.log("notifications ", notifications);
  }, [notifications]);

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
  
  return (
    <>
      <HeaderNavMenu menuItems={menuItems}/>
      <NotificationBellButton 
        onClick={handleNotifClick} 
        unreadNotifications={unreadNotifCount > 0}
      />
      <ProfileButton/>
      <HeaderCreditCount creditCount={credits}/>

      {isPopUpVisible && (
        <NotificationPopUpWindow
        notifications={notifications}
        isOpen={isPopUpVisible}
        setIsOpen={setIsPopUpVisible}
        setNotifications={setNotifications}
        unreadNotifCount={unreadNotifCount}
        setUnreadNotifCount={setUnreadNotifCount}
        allowLoading={allowLoading}
        setAllowLoading={setAllowLoading}
        />
      )}
    </>    
  );
};

export default function WrappedNavHeader(props: UserData) {
  return (
    <NotificationAnimationProvider>
      <NavHeader {...props} />
    </NotificationAnimationProvider>
  );
}