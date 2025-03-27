import { useEffect, useState } from "react";
import NotificationItem from "./NotificationItem";
import { IUserNotificationSettings } from "api/user/types";
import { getUserNotificationSettings, setUserNotificationSettings } from "api/user";

const EmailNotifications = () => {
  const [receiveNotifEmails, setReceiveNotifEmails] = useState<boolean>(true);
  const [notificationItemArr, setNotificationItemArr] = useState([
    {
      title: "Audio Share",
      value: "audio_share",
      desc: "Receive emails when someone shares an audio file with you.",
      active: null,
    },
    {
      title: "Connection Request",
      value: "connection_request",
      desc: "Receive an email when someone requests to connect with you.",
      active: null,
    },
    {
      title: "Connection Response",
      value: "connection_response",
      desc: "Receive an email when someone responds to your connection request.",
      active: null,
    },
    {
      title: "New Collaborator",
      value: "new_collaborator",
      desc: "Receive an email when someone is added as a collaborator to your project.",
      active: null,
    },
    {
      title: "Collaboration Request",
      value: "collaboration_request",
      desc: "Receive an email when someone requests to collaborate with you.",
      active: null,
    },
    {
      title: "Collaboration Accepted",
      value: "collaboration_accepted",
      desc: "Receive an email when someone accepts your collaboration request.",
      active: null,
    },
    {
      title: "Demo Payment",
      value: "demo_payment",
      desc: "Receive an email when someone pays for a demo.",
      active: null,
    },
    {
      title: "Like",
      value: "like",
      desc: "Receive an email when someone likes your sample.",
      active: null,
    },
    {
      title: "Follow",
      value: "follow",
      desc: "Receive an email when someone follows you.",
      active: null,
    },
    {
      title: "Download",
      value: "download",
      desc: "Receive an email when someone downloads your sample.",
      active: null,
    },
    {
      title: "Feedback Provided",
      value: "feedback_provided",
      desc: "Receive an email when someone provides feedback on your demo.",
      active: null,
    },
    {
      title: "Fanwall Post",
      value: "fanwall_post",
      desc: "Receive an email when someone posts on your fanwall.",
      active: null,
    },
  ]);

  const [notificationSettings, setNotificationSettings] = useState<IUserNotificationSettings>({});

  useEffect(() => {
    const fetchSettings = async () => {
      const response = await getUserNotificationSettings();
      const a = response.data;
      delete a.id;

      // Update the active fields based on the response data
      const updatedItems = notificationItemArr.map(item => ({
        ...item,
        active: response.data[item.value] || false, // Assuming response.data has keys matching the titles
      }));

      setNotificationItemArr(updatedItems);
      setNotificationSettings(a); // Update the notification settings object
      // Check if all settings are false
      const allSettingsFalse = Object.values(a).every(value => value === false);
      if (allSettingsFalse) {
        setReceiveNotifEmails(false); // Set receiveNotifEmails to false if all settings are false
      }
      
    };
    fetchSettings();
  }, []);

  useEffect(() => {
    setUserNotificationSettings(notificationSettings);
  }, [notificationSettings]);

  const handleToggle = (value: string) => {
    setNotificationItemArr(prevItems =>
      prevItems.map(item => {
        if (item.value === value) {
          const newActiveState = !item.active;
          // Update the notification settings object
          setNotificationSettings(prevSettings => ({
            ...prevSettings,
            [value]: newActiveState, // Update the specific setting
          }));
          return { ...item, active: newActiveState };
        }
        return item;
      })
    );
  };

  const handleDisableAll = () => {
    setReceiveNotifEmails(prev => {
      const newValue = !prev; // Toggle the disableAllNotifs state
      if (!newValue) {
        // If disabling all notifications, set all active fields to false
        setNotificationItemArr(prevItems =>
          prevItems.map(item => ({ ...item, active: false }))
        );
  
        // Update the notification settings object to set all to false
        setNotificationSettings(prevSettings => {
          const updatedSettings = { ...prevSettings };
          Object.keys(updatedSettings).forEach(key => {
            updatedSettings[key] = false; // Set each setting to false
          });
          return updatedSettings;
        });
      }
      return newValue;
    });
  };

  return (
    <div className="py-5">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-5">
          <div className="pt-2.5 px-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-lg text-white font-semibold">
                Email
              </p>
              <label htmlFor="toggle-all" className="relative inline-block w-12 h-6">
                <input
                  id="toggle-all"
                  type="checkbox"
                  className="opacity-0 w-0 h-0"
                  checked={receiveNotifEmails}
                  onChange={(e) => handleDisableAll()}
                />
                <span className="slider round"></span>
              </label>
            </div>

            <p className="text-sm font-normal text-coolGray">
              Receive emails to stay informed about what's happening when you're
              not on MVSSIVE. You can disable them at any time.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-[20px]">
          {notificationItemArr.map((item, idx) => {
            const { title, desc, active, value } = item;
            return (
              <div key={title + idx} className="border-t-2 border-eclipseGray pt-4">
                <NotificationItem
                  {...{
                    title,
                    desc,
                    active,
                    value,
                    onToggle: handleToggle,
                    isDisabled: !receiveNotifEmails, // Pass the disable state
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EmailNotifications;