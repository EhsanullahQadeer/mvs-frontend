import React from "react";

interface ActivityNotificationProps {
  state: {
    requestAccepted: boolean;
    tagged: boolean;
    isFollowRequest: boolean;
    isFollow: boolean;
    connectAccepted: boolean;
    audioUpdated: boolean;
    feedback: boolean;
    collabAdded: boolean;
    liked: boolean;
    download: boolean;
    viewed: boolean;
    audio: boolean;
  };
  audios: string;
}

const ActivityNotification: React.FC<ActivityNotificationProps> = ({ state, audios }) => {
  const isEligibleForNotification = () => {
    return !(
      state.requestAccepted ||
      state.tagged ||
      state.isFollowRequest ||
      state.isFollow ||
      state.connectAccepted ||
      state.audioUpdated ||
      state.feedback ||
      state.collabAdded
    );
  };

 
  if (!isEligibleForNotification()) return null;
  return (
      <div className="font-semibold flex items-center text-[10px] text-[#B2B2B2]">
        <img src={audios} alt="Audio Icon" />
        <span className="px-1">sunset-serenadeV2.pdf</span>
        <span className="font-normal text-[#666666]">2.2MB</span>
      </div>
  );
};

export default ActivityNotification;
