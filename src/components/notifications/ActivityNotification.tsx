import React from "react";
import { NotificationState } from "./NotificationContent";

interface ActivityNotificationProps {
  state: NotificationState;
  audios: string;
}

const ActivityNotification: React.FC<ActivityNotificationProps> = ({
  state,
  audios,
}) => {
  const isMatchingType = [
    "requestAccepted",
    "tagged",
    "isFollowRequest",
    "isFollow",
    "connectAccepted",
    "audioUpdated",
    "feedback",
    "collabAdded",
    "viewed",
  ].includes(state.type);

  if (!isMatchingType) return null;
  return (
    <div className="font-semibold flex items-center text-[10px] text-[#B2B2B2]">
      <img src={audios} alt="Audio Icon" />
      <span className="px-1">sunset-serenadeV2.pdf</span>
      <span className="font-normal text-[#666666]">2.2MB</span>
    </div>
  );
};

export default ActivityNotification;
