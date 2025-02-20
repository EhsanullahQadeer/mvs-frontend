import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TNotificationData } from "../Notification";
import { checkIfFollowing, handleFollowUsers } from "api/user";
import NotificationButton from "components/ui/Header/atoms/notificationAtoms/NotificationsButton";

const FollowNotifContent = ({ notification }: { notification: TNotificationData }) => {
  const navigate = useNavigate();
  const [following, setFollowing] = useState<boolean>();

  const handleFollow = () => {
    setFollowing(true);
  };

  useEffect(() => {
    const fetchFollowingStatus = async () => {
      const isFollowing = await checkIfFollowing(notification.sender.id); // Await the API call
      if(isFollowing) {console.log("You are following them...");}
      else {console.log("Youre not following them...")}
      setFollowing(isFollowing); // Set the state with the result
    };

    fetchFollowingStatus(); // Call the async function
  }, [notification.sender.id]); // Add dependency to re-run if sender ID changes


  return (
    <div className="flex-grow">
      <p className="text-[12px] text-[#999999] pb-[6px]">
        <span className="font-semibold pr-[4px] text-white">
          {notification.sender.displayName}
        </span>
        <span>is now following you.</span>
      </p>
      <div className=" flex items-center gap-2 pt-[4px]">
        {following && (
          <NotificationButton
          buttonName="Following"
          bgColor="bg-[#5F990033]"
          textColor="text-[#7ECC00]"
          borderColor="border-[#9EFF00]"
          onClick={() => {}}
          icon={
            <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.00065 7.4987L7.33398 8.83203L10.0007 6.16536M14.6673 7.4987C14.6673 11.1806 11.6825 14.1654 8.00065 14.1654C4.31875 14.1654 1.33398 11.1806 1.33398 7.4987C1.33398 3.8168 4.31875 0.832031 8.00065 0.832031C11.6825 0.832031 14.6673 3.8168 14.6673 7.4987Z" stroke="#7ECC00" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          }
        />
        )}
        {!following && (
          <NotificationButton
            buttonName="Follow Back"
            bgColor="bg-[#9EFF00]"
            textColor="text-black"
            borderColor="border-transparent"
            onClick={() => {handleFollow(); handleFollowUsers([notification.sender.id]); }}
            icon={null}
          />
        )}
        <NotificationButton
          buttonName="View Profile"
          bgColor="bg-transparent"
          textColor="text-white"
          borderColor="border-white"
          onClick={() => navigate(`/profile/${notification.sender.username}`)}
          icon={null}
        />
      </div>
    </div>
  );
};

export default FollowNotifContent;