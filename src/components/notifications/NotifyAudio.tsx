import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CiCircleCheck } from "react-icons/ci";
import NotificationContent from "./NotificationContent";
import NotificationIcon from "./NotificationIcon";

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  if (!Object.keys(notificationTypes).includes(type)) {
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
            <NotificationIcon state={state} />
            <NotificationContent state={state} />
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
