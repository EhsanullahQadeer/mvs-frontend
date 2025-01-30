import audios from "../../assets/img/voice.svg";
import ActivityNotification from "./ActivityNotification";
import { getNotificationContent } from "./NotificationData";
import NotificationButton from "./NotificationsButton";

const NotificationContent = ({ state }) => {
  const notificationContent = getNotificationContent(state);

  return (
    <div>
      {notificationContent.map((notification, index) => (
        <div key={index}>
          <p className="text-[12px] text-[#999999]">
            <span className="font-semibold pr-[4px] text-white">
              {" "}
              {notification.collaboratorName ||
                notification.collaboratorProfile}
            </span>
            <span>{notification.message}</span>
            {notification.userType && (
              <>
                <button className="px-[8px] py-[4px] text-[#999999] border border-[#999999] rounded-full">
                  {" "}
                  {notification.userType}
                </button>
                <span className=" pl-[3px]">{notification.remaining}</span>
              </>
            )}
            {notification.demoTitle && (
              <span className="text-[#2E70E8] px-0.5 font-semibold">
                {notification.demoTitle}
              </span>
            )}
          </p>
          <ActivityNotification state={state} audios={audios} />

          <div className=" flex items-center gap-2 mt-1">
            {notification.btnName && (
              <NotificationButton
                buttonName={notification.btnName}
                bgColor="bg-[#9EFF00]"
                textColor="text-black"
                borderColor="border-transparent"
                onClick={notification.action}
              />
            )}

            {notification.btnName2 && (
              <NotificationButton
                buttonName={notification.btnName2}
                bgColor="bg-transparent"
                textColor="text-white"
                borderColor="border-white"
                onClick={notification.action2}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationContent;
