import { getUserNotifications } from 'api/user';
import React, { useState, useEffect } from 'react';
import NotificationList from '../molecules/notifications/NotificationList';
import NotificationCountBubble from '../atoms/notificationAtoms/notificationCountBubble';
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
  ] as NotificationType[]
} as const;

const NotificationsManager: React.FC<NotificationManagerProps> = ({ 
  notifications, 
  isOpen, 
  setIsOpen, 
  setNotifications,
  unreadNotifCount,
  setUnreadNotifCount
}) => {
  const [selectedTab, setSelectedTab] = useState<'all' | keyof typeof NOTIFICATION_GROUPS>('all');
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const [notifIdForIsRead, setNotifIdForIsRead] = useState<number>();

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
    setSelectedTab(tab);
    const response = await getUserNotifications(NOTIFICATION_GROUPS[tab]);
    setNotifications(response.data);
  };

  const isNotificationInCurrentTab = (type: string) => {
    if (selectedTab === 'all') return true;
    return selectedTab in NOTIFICATION_GROUPS && NOTIFICATION_GROUPS[selectedTab as keyof typeof NOTIFICATION_GROUPS].includes(type as NotificationType);
  };

  // Export this for NavHeader to use
  useEffect(() => {
    window.isNotificationInCurrentTab = isNotificationInCurrentTab;
  }, [selectedTab]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[8]" onClick={() => setIsOpen(false)} /> // Overlay
      )}
      {isOpen && (
        <div className='fixed w-[418px] h-[621px] top-[80px] right-[320px] shadow-lg rounded-[12px] z-[10] bg-[#131313] overflow-hidden border border-[#3D3D3D]'>
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
                <div
                  className={`flex text-[14px] font-normal cursor-pointer px-[10px] py-[11px] ${selectedTab === 'all' ? 'text-white border-b-2 border-[#3D3D3D]' : 'text-[#666666] hover:border-b-2 hover:border-gray-300'}`}
                  onClick={() => handleTabClick('all')}
                >
                  All
                  <NotificationCountBubble unreadNotifications={unreadNotifCount}/>
                </div>
                <div
                  className={`text-[14px] font-normal cursor-pointer px-[10px] py-[11px] ${selectedTab === 'social' ? 'text-white border-b-2 border-[#3D3D3D]' : 'text-[#666666] hover:border-b-2 hover:border-gray-300'}`}
                  onClick={() => handleTabClick('social')}
                >
                  Social
                </div>
                <div
                  className={`text-[14px] font-normal cursor-pointer px-[10px] py-[11px] ${selectedTab === 'activity' ? 'text-white border-b-2 border-[#3D3D3D]' : 'text-[#666666] hover:border-b-2 hover:border-gray-300'}`}
                  onClick={() => handleTabClick('activity')}
                >
                  Activity
                </div>
              </div>
            </div>
          </div>

          {notifications.length === 0 ? 
            <NoNotificationsYetPrompt/>
            :
            <div className="flex flex-col overflow-y-auto h-[calc(621px-120px)] scrollbar-hidden">
              <NotificationList data={notifications} setNotifIdForIsRead={setNotifIdForIsRead} unreadNotifCount={unreadNotifCount} setUnreadNotifCount={setUnreadNotifCount}/>
            </div>
          }
        </div>
      )}
    </>
  );
};

export default NotificationsManager;
