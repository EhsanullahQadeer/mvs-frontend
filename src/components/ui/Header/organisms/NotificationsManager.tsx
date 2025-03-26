import { getUserNotifications } from 'api/user';
import { CircularProgress } from "@mui/material";
import React, { useState, useEffect, useRef } from 'react';
import NotificationList from '../molecules/notifications/NotificationList';
import NotificationManagerTab from '../molecules/notificationMolecules/notificationTabs';
import NoNotificationsYetPrompt from '../molecules/notificationMolecules/noNotificationsYet';

declare global {
  interface Window {
    isNotificationInCurrentTab?: (type: string) => boolean;
  }
}

type NotificationBody = {
  id: number,
  type: string,
  data: JSON,
  created_at: Date,
  is_read: boolean,
  owner: any,
}

interface NotificationManagerProps {
  notifications: NotificationBody[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setNotifications: React.Dispatch<React.SetStateAction<NotificationBody[]>>;
  unreadNotifCount: number;
  setUnreadNotifCount: React.Dispatch<React.SetStateAction<number>>;
  allowLoading: boolean;
  setAllowLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

type NotificationType = 'CONNECTION_REQUEST' | 'CONNECTION_RESPONSE' | 'COLLABORATION_REQUEST' | 
  'COLLABORATION_ACCEPT' | 'FEEDBACK_PROVIDED' | 'NEW_COLLABORATOR' | 'AUDIO_SHARE' | 
  'FOLLOW' | 'LIKE' | 'AUDIO_UPDATE' | 'DOWNLOAD_FILE' | 'VIEW_PROFILE' | 'VIEW_DEMO';

const NOTIFICATION_GROUPS = {
  social: [
    'CONNECTION_REQUEST',
    'CONNECTION_RESPONSE',
    'COLLABORATION_REQUEST',
    'COLLABORATION_ACCEPT',
    'FEEDBACK_PROVIDED',
    'NEW_COLLABORATOR',
    'AUDIO_SHARE',
  ] as NotificationType[],
  activity: [
    'FOLLOW',
    'LIKE',
    'AUDIO_UPDATE',
    'DOWNLOAD_FILE',
    'VIEW_PROFILE',
    'VIEW_DEMO',
  ] as NotificationType[],
  archive: [] as NotificationType[]
} as const;

const NotificationsManager: React.FC<NotificationManagerProps> = ({ 
  notifications, 
  isOpen, 
  setIsOpen, 
  setNotifications,
  unreadNotifCount,
  setUnreadNotifCount,
  allowLoading,
  setAllowLoading,
}) => {
  let skip = 0;
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const [notifIdForIsRead, setNotifIdForIsRead] = useState<number>();
  const [selectedTab, setSelectedTab] = useState<'all' | keyof typeof NOTIFICATION_GROUPS>('all');
  const refreshRef = useRef(null);

  const onIntersection = (entries) => {
    for (const {isIntersecting} of entries) {
      if (isIntersecting) {
        loadMoreNotifications()
      }
    }
  };

  const observer = new IntersectionObserver(onIntersection, {
    root: null,
    rootMargin: '0px',
    threshold: .9
  });

  useEffect(() => {
    if(!refreshRef.current) return;
      observer.observe(refreshRef.current);
    }, [])

  const handleToggle = () => {
    setIsToggled(!isToggled);
  }

  useEffect(() => {
    if (notifIdForIsRead !== undefined) {
      setNotifications((prevNotifications) => 
        prevNotifications.map(notification => 
          notification.id === notifIdForIsRead 
            ? { ...notification, is_read: !notification.is_read } // Update the is_read status
            : notification
        )
      );
    }
  }, [notifIdForIsRead]);

  const handleTabClick = async (tab: 'all' | keyof typeof NOTIFICATION_GROUPS) => {
    skip = 0;
    setAllowLoading(true);
    setSelectedTab(tab);
    try {
      let response;
      if (tab === "archive") {
        response = await getUserNotifications(NOTIFICATION_GROUPS[tab], true, skip);
      } else {
        response = await getUserNotifications(NOTIFICATION_GROUPS[tab], false, skip);
      }
      if (response.data.length < 10) {setAllowLoading(false)}
      setNotifications(response.data); // Update notifications with the new data
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const loadMoreNotifications = async () => {
    if (!allowLoading) return;
    try {
      skip += 10;
      const response = await getUserNotifications(NOTIFICATION_GROUPS[selectedTab], false, skip);
      if (response.data.length < 10) {setAllowLoading(false)}
      setNotifications((prev) => [...prev, ...response.data]);
    } catch (error) {
      console.error("Error loading more notifications:", error);
    }
  };

  const isNotificationInCurrentTab = (type: string) => {
    if (selectedTab === 'all') return true;
    return selectedTab in NOTIFICATION_GROUPS && NOTIFICATION_GROUPS[selectedTab as keyof typeof NOTIFICATION_GROUPS].includes(type as NotificationType);
  };

  useEffect(() => {
    window.isNotificationInCurrentTab = isNotificationInCurrentTab;
  }, [selectedTab]);

  
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[51]" onClick={() => setIsOpen(false)} /> // Overlay (Chatbox is at 50, set overlay to 51 and Notification Manager to 52)
      )}
      {isOpen && (
        <div className='fixed w-[418px] h-[621px] top-[80px] right-[320px] shadow-lg rounded-[12px] z-[52] bg-[#131313] overflow-hidden border border-[#3D3D3D]'>
          <div className="pt-[10px] px-5">
            <div className="flex justify-between items-center pb-[21px]">
              <h2 className="text-[18px] font-semibold text-white pt-5">Notifications</h2>
              <div className='pt-5'>
                <span className="text-[14px] font-[400] text-[#666666] mr-2">Disable Alerts</span>
                <label htmlFor="toggle" className="relative inline-block w-12 h-6">
                  <input
                    id="toggle"
                    type="checkbox"
                    className="opacity-0 w-0 h-0"
                    checked={isToggled}
                    onChange={handleToggle}
                  />
                  <span
                    className={`slider round ${isToggled ? 'bg-blue-500' : 'bg-gray-300'}`}
                    aria-checked={isToggled ? 'true' : 'false'}
                  ></span>
                </label>
              </div>
            </div>
            <div className="flex justify-between items-center h-[45px]">
              <div className="flex">
                <NotificationManagerTab tabName={"All"} selectedTab={selectedTab} handleTabClick={handleTabClick} unreadNotifCount={unreadNotifCount}></NotificationManagerTab>
                <NotificationManagerTab tabName={"Social"} selectedTab={selectedTab} handleTabClick={handleTabClick} unreadNotifCount={null}></NotificationManagerTab>
                <NotificationManagerTab tabName={"Activity"} selectedTab={selectedTab} handleTabClick={handleTabClick} unreadNotifCount={null}></NotificationManagerTab>
                <NotificationManagerTab tabName={"Archive"} selectedTab={selectedTab} handleTabClick={handleTabClick} unreadNotifCount={null}></NotificationManagerTab>
              </div>
            </div>
          </div>

          {notifications.length === 0 ? 
            <NoNotificationsYetPrompt/>
            :
            <div className="flex flex-col overflow-y-auto h-[calc(621px-120px)] scrollbar-hidden">
              <NotificationList data={notifications} setNotifIdForIsRead={setNotifIdForIsRead} unreadNotifCount={unreadNotifCount} setUnreadNotifCount={setUnreadNotifCount}/>
                <div ref={refreshRef} className={`h-[100px] pb-1 ${allowLoading ? "": "hidden"}`}>
                <div className="w-full flex justify-center items-center bg-black opacity-40 z-[999px] h-[50px]">
                  <CircularProgress
                    sx={{
                      width: "30px !important",
                      height: "30px !important",
                      color: "#9EFF00",
                    }}
                  />
                </div>
              </div>
            </div>
          }
        </div>
      )}
    </>
  );
};

export default NotificationsManager;