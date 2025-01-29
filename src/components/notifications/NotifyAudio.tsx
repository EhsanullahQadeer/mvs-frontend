import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import user from "../../assets/img/artistImg.png";
import audios from "../../assets/img/voice.svg";
import { CiCircleCheck } from "react-icons/ci";
import { FiMusic } from "react-icons/fi";

const Notification = () => {
  const { type } = useParams(); // Get notification type dynamically
  const [read, setRead] = useState(false);
  const [viewed, setViewed] = useState(false);
  const [download, setDownload] = useState(false);
  const [liked, setLiked] = useState(false);
  const [isFollowRequest, setIsFollowRequest] = useState(false);
  const [audio, setAudio] = useState(false);
  const [tagged, setTagged] = useState(false);
  const [requestAccepted, setRequestAccepted] = useState(false);
  const [isFollow, setIsFollow] = useState(false);
  const [connectAccepted, setConnectAccepted] = useState(false);
  const [audioUpdated, setAudioUpdated] = useState(false);
  const [feedback ,setFeedback] = useState(false)
  const [collabAdded , setCollabAdded] = useState(false)
  useEffect(() => {
    setDownload(type === "downloaded-file");
    setViewed(type === "viewed-demo");
    setLiked(type === "liked-file");
    setAudio(type === "audio-shared");
    setTagged(type === "tagged-in-the-demo");
    setIsFollowRequest(type === "connect-request");
    setIsFollow(type === "follow");
    setRequestAccepted(type === "collaboration-request-accepted");
    setConnectAccepted(type === "connection-request-accepted");
    setAudioUpdated(type === "audio-updated");
    setFeedback(type=== "feedback-provided")
    setCollabAdded(type=== "new-collaborator-added")
  }, [type]);
  if (
    ![
      "downloaded-file",
      "tagged-in-the-demo",
      "viewed-demo",
      "liked-file",
      "connect-request",
      "follow",
      "audio-shared",
      "connection-request-accepted",
      "audio-updated",
      "collaboration-request-accepted",
      "feedback-provided",
      "new-collaborator-added"
    ].includes(type)
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
                !read ? "bg-[#2E70E8]" : "bg-transparent"
              }`}
            ></div>
          </div>
        <div className="flex gap-2 items-center">
          {(audioUpdated || collabAdded) && (
              <div className="w-fit">
                <div className="w-12 h-12 relative bg-black flex items-center justify-center rounded-full">
                  <FiMusic className="text-white" />
                </div>
              </div>
            )}
          {(!audioUpdated && !collabAdded) && (
            <div className="w-fit">
              <div className="w-12 h-12 relative rounded-full">
                <img
                  src={user}
                  className="w-full h-full object-cover rounded-full"
                  alt="User"
                />
                {(tagged || requestAccepted || feedback) && (
                  <div className="w-2.5 h-2.5 absolute bg-[#12B76A] border-[1.5px] rounded-full bottom-[6px] right-[1px] border-white"></div>
                )}
              </div>
            </div>
          )}

          <div>
            {requestAccepted &&(
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
            )} { (isFollowRequest || isFollow || connectAccepted ) && (
              <>
                <p className="text-[12px] mb-2 text-[#999999]">
                  <span className="font-semibold text-white">Poobear</span>
                  {isFollowRequest
                    ? "  sent you a connect request."
                    : isFollow
                    ? " is now following you."
                    : connectAccepted
                    ? " has accepted your connection request and you’ve unlocked exclusive content."
                    : " "}
                </p>
                <div className="flex gap-2">
                  {isFollowRequest && (
                    <>
                      <button className="px-3 py-2 text-[12px] rounded-full bg-[#9EFF00] text-black font-semibold">
                        Accept
                      </button>
                      <button className="px-3 py-2 text-[12px] rounded-full border border-[#E5E5E5] text-[#E5E5E5]">
                        Decline
                      </button>
                    </>
                  )}
                  {isFollow && (
                    <>
                      <button className="px-3 py-2 text-[12px] rounded-full bg-[#9EFF00] text-black font-semibold">
                        Follow Back
                      </button>
                      <button className="px-3 py-2 text-[12px] rounded-full border border-[#E5E5E5] text-[#E5E5E5]">
                        View Profile
                      </button>
                    </>
                  )}
                  {connectAccepted && (
                    <>
                      <button className="px-3 py-2 text-[12px] rounded-full bg-[#9EFF00] text-black font-semibold">
                        View Profile
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
            {(audioUpdated || feedback || collabAdded) &&

            <>
                            <p className="text-[12px] mb-1 text-[#999999]">
                            <span className="font-semibold text-white pr-[5px]">Soundboyz</span>
                            {audioUpdated
                    ? "   has updated the audio file"
                    : feedback
                    ? " has provided feedback on your audio demo "
                    : connectAccepted
                    ? " has accepted your connection request and you’ve unlocked exclusive content"
                    : collabAdded
                    ?  " has added a new collaborator to File "
                    : " "}
                            <span className="text-[#2E70E8] font-semibold">
                    "Sunset Serenade"
                  </span> {" "} 
                  {audioUpdated && 
                  <span> View latest version.</span>}
                            </p>
                            {(audioUpdated || collabAdded)  && 
                  <button className="px-3 py-2 text-[12px] rounded-full bg-[#9EFF00] text-black ">
                  View Details
                </button>}
                     {feedback && 
                  <button className="px-3 py-2 text-[12px] rounded-full bg-[#9EFF00] text-black ">
                  View Feedback
                </button>}

            </>}
            {tagged && (
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
            {!requestAccepted &&
              !tagged &&
              !isFollowRequest &&
              !isFollow &&
              !connectAccepted &&
              !audioUpdated &&
              !feedback &&
              !collabAdded && (
                <>
                  <p className="text-[12px] flex text-[#999999]">
                    <span className="text-white pr-[4px]">Poobear</span>
                    {liked
                      ? " liked your file."
                      : download
                      ? " downloaded your file."
                      : viewed
                      ? " viewed a demo."
                      : audio
                      ? " has shared an audio file with you."
                      : " "}
                    {(liked || download || viewed) && (
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
                  {audio &&   <button className="px-3 py-2 mt-1 w-fit text-[12px] rounded-full bg-[#9EFF00]">
                  View File
                </button>}
                </>
              )}
          </div>
        </div>
        </div>

        <div className="flex flex-col gap-1 pb-4 justify-between items-end">
          {!read && (
            <span
              className="p-2 bg-black rounded-md opacity-0 hover:opacity-100 cursor-pointer"
              onClick={() => setRead(true)}
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
