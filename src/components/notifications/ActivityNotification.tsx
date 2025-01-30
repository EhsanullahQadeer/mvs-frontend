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

  const getActivityMessage = () => {
    if (state.liked) return " liked your file.";
    if (state.download) return " downloaded your file.";
    if (state.viewed) return " viewed a demo.";
    if (state.audio) return " has shared an audio file with you.";
    return "";
  };

  if (!isEligibleForNotification()) return null;

  return (
    <div>
      <p className="text-[12px] flex text-[#999999]">
        <span className="text-white pr-[4px]">Poobear</span>
        {getActivityMessage()}
        {(state.liked || state.download || state.viewed) && (
          <span className="text-[#2E70E8] font-semibold"> "Sunset Serenade"</span>
        )}
      </p>
      <div className="font-semibold flex items-center text-[10px] text-[#B2B2B2]">
        <img src={audios} alt="Audio Icon" />
        <span className="px-1">sunset-serenadeV2.pdf</span>
        <span className="font-normal text-[#666666]">2.2MB</span>
      </div>
      {state.audio && (
        <button className="px-3 py-2 mt-1 w-fit text-[12px] rounded-full bg-[#9EFF00]">
          View File
        </button>
      )}
    </div>
  );
};

export default ActivityNotification;
