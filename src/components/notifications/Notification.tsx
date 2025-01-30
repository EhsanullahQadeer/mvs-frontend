import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { CiCircleCheck } from "react-icons/ci";
import NotificationContent from "./NotificationContent";
import NotificationIcon from "./NotificationIcon";
import { NotificationType, notificationTypes } from "./NotificationData";

export interface NotificationState {
  type: NotificationType;
  status: "read" | "unread";
}

const Notification = () => {
  const { type } = useParams();

  const [state, setState] = useState<NotificationState>({
    type: notificationTypes[type as keyof typeof notificationTypes] || null,
    status: "unread",
  });

  // Function to mark as read
  const markAsRead = () => {
    setState((prev) => ({ ...prev, status: "read" }));
  };

  if (!Object.keys(notificationTypes).includes(type)) {
    return null;
  }

  return (
    <div className="flex justify-center group">
      <div className="py-5 pr-5 pl-3 flex bg-eerieBlack hover:bg-[#242424] w-[534px] justify-between items-center rounded-md">
        <div className="flex gap-2 items-center">
          <div className="w-fit">
            <div
              className={`w-2 h-2 rounded-full ${
                state.status === "unread" ? "bg-[#2E70E8]" : "bg-transparent"
              }`}
            ></div>
          </div>
          <div className="flex gap-2 items-center">
            <NotificationIcon state={state} />
            <NotificationContent state={state} />
          </div>
        </div>
        <div className="flex flex-col gap-1 pb-4 justify-between items-end">
          {state.status === "read" && (
            <span
              className="p-2 bg-eerieBlack rounded-md transition-opacity duration-300 transition-lg opacity-0 group-hover:opacity-100 cursor-pointer"
              onClick={markAsRead}
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
