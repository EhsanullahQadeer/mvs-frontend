import React from "react";
import { timeAgo } from "utils/dateUtils";

// Define the ButtonProps type to handle all possible props
interface NotifTimestampData {
  isRead?: boolean;
  id?: number;
  createdAt?: string;
}

const notifTimestamp: React.FC<NotifTimestampData> = ({
  createdAt = "",
}) => {
  return (
    <div className="w-[36px] text-[12px] text-[#848484] flex flex-grow items-center justify-center">
    {createdAt ? timeAgo(new Date(createdAt)) : null}
    </div>
  )
};

export default notifTimestamp;