import audios from "../../assets/img/voice.svg";
import ActivityNotification from "./ActivityNotification";

const NotificationContent = ({ state }) => {
  return (
    <div>
      {state.requestAccepted && (
        <>
          <p className="text-[12px] text-[#999999]">
            <span className="font-semibold pr-[4px] text-white">Poobear</span>
            has accepted your collaboration request as a
            <span className="px-2 py-[4px] rounded-full mx-1 border text-[10px] border-[#666666] text-[#999999]">
              Singer
            </span>
            on the demo{" "}
            <span className="text-[#2E70E8] font-semibold">
              "Sunset Serenade"
            </span>
          </p>
          <button className="px-[12px] py-[8px] mt-2 w-fit text-[12px] rounded-full bg-[#9EFF00]">
            View Details
          </button>
        </>
      )}
      {(state.isFollowRequest || state.isFollow || state.connectAccepted) && (
        <>
          <p className="text-[12px] mb-2 text-[#999999]">
            <span className="font-semibold text-white">Poobear</span>
            {state.isFollowRequest
              ? "  sent you a connect request."
              : state.isFollow
              ? " is now following you."
              : state.connectAccepted
              ? " has accepted your connection request and you’ve unlocked exclusive content."
              : " "}
          </p>
          <div className="flex gap-2">
            {state.isFollowRequest && (
              <>
                <button className="px-3 py-2 text-[12px] rounded-full bg-[#9EFF00] text-black font-semibold">
                  Accept
                </button>
                <button className="px-3 py-2 text-[12px] rounded-full border border-[#E5E5E5] text-[#E5E5E5]">
                  Decline
                </button>
              </>
            )}
            {state.isFollow && (
              <>
                <button className="px-3 py-2 text-[12px] rounded-full bg-[#9EFF00] text-black font-semibold">
                  Follow Back
                </button>
                <button className="px-3 py-2 text-[12px] rounded-full border border-[#E5E5E5] text-[#E5E5E5]">
                  View Profile
                </button>
              </>
            )}
            {state.connectAccepted && (
              <>
                <button className="px-3 py-2 text-[12px] rounded-full bg-[#9EFF00] text-black font-semibold">
                  View Profile
                </button>
              </>
            )}
          </div>
        </>
      )}
      {(state.audioUpdated || state.feedback || state.collabAdded) && (
        <>
          <p className="text-[12px] mb-1 text-[#999999]">
            <span className="font-semibold text-white pr-[5px]">Soundboyz</span>
            {state.audioUpdated
              ? "   has updated the audio file"
              : state.feedback
              ? " has provided feedback on your audio demo "
              : state.connectAccepted
              ? " has accepted your connection request and you’ve unlocked exclusive content"
              : state.collabAdded
              ? " has added a new collaborator to File "
              : " "}
            <span className="text-[#2E70E8] font-semibold">
              "Sunset Serenade"
            </span>{" "}
            {state.audioUpdated && <span> View latest version.</span>}
          </p>
          {(state.audioUpdated || state.collabAdded) && (
            <button className="px-3 py-2 text-[12px] rounded-full bg-[#9EFF00] text-black ">
              View Details
            </button>
          )}
          {state.feedback && (
            <button className="px-3 py-2 text-[12px] rounded-full bg-[#9EFF00] text-black ">
              View Feedback
            </button>
          )}
        </>
      )}
      {state.tagged && (
        <>
          <p className="text-[12px] text-[#999999]">
            <span className="font-semibold pr-[4px] text-white">Poobear</span>{" "}
            has tagged you as a
            <span className="px-2 py-[4px] rounded-full mx-1 border text-[10px] border-[#666666] text-[#999999]">
              Producer
            </span>
            on the demo{" "}
            <span className="text-[#2E70E8] font-semibold">
              "Sunset Serenade"
            </span>
          </p>
          <button className="px-3 py-2 mt-1 w-fit text-[12px] rounded-full bg-[#9EFF00]">
            View File
          </button>
        </>
      )}
        <ActivityNotification state={state} audios={audios} />

    </div>
  );
};

export default NotificationContent;
