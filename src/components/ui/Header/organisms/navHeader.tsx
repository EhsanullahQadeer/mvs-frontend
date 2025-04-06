/*************************************************************************
 * @file Header.tsx
 * @author End Quote
 * @desc Provides layout and navigation for the application.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* IMPORTS */
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import { UserData } from "theme/Header/Header.types";
import HeaderNavMenu from "../molecules/headerNavMenu";
import ProfileButton from "theme/Sidebar/ProfileButton";
import { useHeaderHooks } from "theme/Header/Header.hooks";
import HeaderCreditCount from "../atoms/headerCreditCount";
import NotificationPopUpWindow from "./NotificationsManager";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { getUserNotifications, toggleMuteNotifications } from "api/user";
import { useNotification } from "services/WebSocket/useNotification.hook";
import notificationSound from "../../../../assets/audio/notification.mp3";
import { TNotificationData } from "../molecules/notifications/Notification";
import messageSound from "../../../../assets/audio/message-notification.mp3";
import NotificationBellButton from "../atoms/notificationAtoms/notificationBellButton";
import { useNotificationAnimation , NotificationAnimationProvider } from "../context/NotificationAnimationContext";

const NavHeader: React.FC<UserData> = () => {
  const navigate = useNavigate();
  const { state } = useHeaderHooks();
  const [credits, setCredits] = useState<number>(0);
  const [notifications, setNotifications] = useState([]);
  const [muteNotifications, setMuteNotifications] = useState<boolean>(false);
  const { triggerAnimation } = useNotificationAnimation();
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const [unreadNotifCount, setUnreadNotifCount] = useState<number>(0);
  const [allowLoading, setAllowLoading] = useState<boolean>(true);
  const notificationAudioRef = useRef<HTMLAudioElement | null>(null);
  const messageAudioRef = useRef<HTMLAudioElement | null>(null);
  const audioLoadedRef = useRef<boolean>(false);

  // Initialize audio refs with better loading handling
  useEffect(() => {
    setMuteNotifications(state?.auth?.user?.settings.mute_notifications);
    const initAudio = async () => {
      try {
        // Initialize notification audio
        notificationAudioRef.current = new Audio(notificationSound);
        notificationAudioRef.current.crossOrigin = "anonymous";
        notificationAudioRef.current.preload = "auto";
        
        // Initialize message audio
        messageAudioRef.current = new Audio(messageSound);
        messageAudioRef.current.crossOrigin = "anonymous";
        messageAudioRef.current.preload = "auto";

        audioLoadedRef.current = true;
        console.log('Audio initialized normally');

      } catch (error) {
        console.error('Error initializing audio:', error);
      }
    };

    initAudio();
    
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
    console.log('=== Sound Debug ===');
    console.log(`Type: ${type}`);
    console.log(`Audio loaded: ${audioLoadedRef.current}`);
    console.log(`Audio refs exist:`, {
      notification: !!notificationAudioRef.current,
      message: !!messageAudioRef.current
    });
    
    const audioRef = type === 'NEW_MESSAGE' ? messageAudioRef : notificationAudioRef;
    
    if (audioRef.current) {
      try {
        console.log('Attempting to play sound...');
        console.log('Audio state:', {
          paused: audioRef.current.paused,
          currentTime: audioRef.current.currentTime,
          volume: audioRef.current.volume,
          readyState: audioRef.current.readyState
        });

        audioRef.current.currentTime = 0;
        audioRef.current.volume = 1.0;
        
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('Sound played successfully');
            })
            .catch(error => {
              console.error('Detailed play error:', {
                name: error.name,
                message: error.message,
                stack: error.stack
              });
            });
        }
      } catch (error) {
        console.error('Caught error during play:', error);
      }
    } else {
      console.error('Audio ref not available');
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
    if (muteNotifications) {
      debouncedPlaySound(formattedNotification.type);
    }
    
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

  const toggleMuteNotifs = async () => {
    setMuteNotifications((prev) => !prev);
    await toggleMuteNotifications();
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
    console.log('User Object', state?.auth?.user);
  }, [state?.auth?.user?.credits]);  

  useEffect(() => {
    fetchNotifications();
  }, []);

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
  useNotification('NEW_MESSAGE', handleNotification);
  
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
        muteNotifications={muteNotifications}
        toggleMuteNotifications={toggleMuteNotifs}
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