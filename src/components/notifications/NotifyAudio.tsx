import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import user from "../../assets/img/artistImg.png";
import audios from "../../assets/img/voice.svg";
import { CiCircleCheck } from "react-icons/ci";
import { FiMusic } from "react-icons/fi";

const Notification = () => {
  const { type } = useParams();
  const [state, setState] = useState({
    read: false,
    viewed: false,
    download: false,
    liked: false,
    isFollowRequest: false,
    audio: false,
    tagged: false,
    requestAccepted: false,
    isFollow: false,
    connectAccepted: false,
    audioUpdated: false,
    feedback: false,
    collabAdded: false,
  });

  const notificationTypes = {
    "downloaded-file": "download",
    "viewed-demo": "viewed",
    "liked-file": "liked",
    "audio-shared": "audio",
    "tagged-in-the-demo": "tagged",
    "connect-request": "isFollowRequest",
    "follow": "isFollow",
    "collaboration-request-accepted": "requestAccepted",
    "connection-request-accepted": "connectAccepted",
    "audio-updated": "audioUpdated",
    "feedback-provided": "feedback",
    "new-collaborator-added": "collabAdded",
  };

  useEffect(() => {
    const newState = { ...state };
    Object.keys(notificationTypes).forEach((key) => {
      newState[notificationTypes[key]] = type === key;
    });
    setState(newState);
  }, [type]);

  if (
    !Object.keys(notificationTypes).includes(type)
  ) {
    return null;
  }

  return (
    <div className="flex justify-center">
      <div className="py-5 pr-5 pl-3 flex bg-eerieBlack hover:bg-[#242424] w-[534px] justify-between items-center rounded-md">
        <div className="flex gap-2 items-center">
          <div className="w-fit">
            <div
              className={`w-2 h-2 rounded-full ${
                !state.read ? "bg-[#2E70E8]" : "bg-transparent"
              }`}
            ></div>
          </div>
        <div className="flex gap-2 items-center">
          {(state.audioUpdated || state.collabAdded) && (
              <div className="w-fit">
                <div className="w-12 h-12 relative bg-black flex items-center justify-center rounded-full">
                  <FiMusic className="text-white" />
                </div>
              </div>
            )}
          {(!state.audioUpdated && !state.collabAdded) && (
            <div className="w-fit">
              <div className="w-12 h-12 relative rounded-full">
                <img
                  src={user}
                  className="w-full h-full object-cover rounded-full"
                  alt="User"
                />
                {(state.tagged || state.requestAccepted || state.feedback) && (
                  <div className="w-2.5 h-2.5 absolute bg-[#12B76A] border-[1.5px] rounded-full bottom-[6px] right-[1px] border-white"></div>
                )}
              </div>
            </div>
          )}

          <div>
            {state.requestAccepted &&(
              <>
                <p className="text-[12px] text-[#999999]">
                  <span className="font-semibold pr-[4px] text-white">
                    Poobear
                  </span>
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
            )} { (state.isFollowRequest || state.isFollow || state.connectAccepted ) && (
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
            {(state.audioUpdated || state.feedback || state.collabAdded) &&

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
                    ?  " has added a new collaborator to File "
                    : " "}
                            <span className="text-[#2E70E8] font-semibold">
                    "Sunset Serenade"
                  </span> {" "} 
                  {state.audioUpdated && 
                  <span> View latest version.</span>}
                            </p>
                            {(state.audioUpdated || state.collabAdded)  && 
                  <button className="px-3 py-2 text-[12px] rounded-full bg-[#9EFF00] text-black ">
                  View Details
                </button>}
                     {state.feedback && 
                  <button className="px-3 py-2 text-[12px] rounded-full bg-[#9EFF00] text-black ">
                  View Feedback
                </button>}

            </>}
            {state.tagged && (
              <>
                <p className="text-[12px] text-[#999999]">
                  <span className="font-semibold pr-[4px] text-white">
                    Poobear
                  </span>{" "}
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
            {!state.requestAccepted &&
              !state.tagged &&
              !state.isFollowRequest &&
              !state.isFollow &&
              !state.connectAccepted &&
              !state.audioUpdated &&
              !state.feedback &&
              !state.collabAdded && (
                <>
                  <p className="text-[12px] flex text-[#999999]">
                    <span className="text-white pr-[4px]">Poobear</span>
                    {state.liked
                      ? " liked your file."
                      : state.download
                      ? " downloaded your file."
                      : state.viewed
                      ? " viewed a demo."
                      : state.audio
                      ? " has shared an audio file with you."
                      : " "}
                    {(state.liked || state.download || state.viewed) && (
                      <span className="text-[#2E70E8] font-semibold">
                        {" "}
                        "Sunset Serenade"
                      </span>
                    )}
                  </p>
                  <div className="font-semibold flex items-center text-[10px] text-[#B2B2B2]">
                    <img src={audios} alt="Audio Icon" />
                    <span className="px-1">sunset-serenadeV2.pdf</span>
                    <span className="font-normal text-[#666666]">2.2MB</span>
                  </div>
                  {state.audio &&   <button className="px-3 py-2 mt-1 w-fit text-[12px] rounded-full bg-[#9EFF00]">
                  View File
                </button>}
                </>
              )}
          </div>
        </div>
        </div>

        <div className="flex flex-col gap-1 pb-4 justify-between items-end">
          {!state.read && (
            <span
              className="p-2 bg-black rounded-md opacity-0 hover:opacity-100 cursor-pointer"
              onClick={() => setState({ ...state, read: true })}
            >
              <CiCircleCheck className="text-white" />
            </span>
          )}
          <div className="text-[12px] text-[#848484] pr-1">15h</div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
