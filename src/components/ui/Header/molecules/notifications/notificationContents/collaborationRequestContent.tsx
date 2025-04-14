import { useState } from "react";
import { TNotificationData } from "../Notification";
import { handleCollaborationRequest } from "api/sounds";
import NotificationButton from "components/ui/Header/atoms/notificationAtoms/NotificationsButton";

const CollaborationRequestNotifContent = ({
  notification,
}: {
  notification: TNotificationData;
}) => {
  const [status, setStatus] = useState(
    notification.collaborationRequest.status
  );

  const handleAccept = () => {
    setStatus("ACTIVE");
  };

  const handleDeny = () => {
    setStatus("DECLINED");
  };

  return (
    <div className="flex-grow">
      <p className="text-[12px] text-[#999999] pb-[6px]">
        <span className="font-semibold pr-[4px] text-white">
          {notification.sender.displayName}
        </span>
        <span>has tagged you as a </span>
        <span className="font-semibold pr-[4px] text-white">
          {notification.collaborationRequest
            ? notification.collaborationRequest.roles[0]
            : ""}
        </span>
        <span>on the sample </span>
        <span className="font-semibold pr-[4px] text-[#0185FF]">
          "{notification.sample?.name}"
        </span>
      </p>
      <div className="flex items-center gap-2 pt-[4px]">
        {status === "PENDING" && (
          <>
            <NotificationButton
              buttonName="Accept"
              bgColor="bg-[#9EFF00]"
              textColor="text-black"
              borderColor="border-transparent"
              onClick={() => {
                handleAccept();
                handleCollaborationRequest({sampleId:notification.sample.id, action: true});
              }}
              icon={null}
            />
            <NotificationButton
              buttonName="Deny"
              bgColor="bg-transparent"
              textColor="text-white"
              borderColor="border-red"
              onClick={() => {
                handleDeny();
                handleCollaborationRequest({sampleId:notification.sample.id, action: false});
              }}
              icon={null}
            />
          </>
        )}
        {status === "ACTIVE" && (
          <NotificationButton
            buttonName="Approved"
            bgColor="bg-[#5F990033]"
            textColor="text-[#7ECC00]"
            borderColor="border-[#9EFF00]"
            onClick={() => {}}
            icon={
              <svg
                width="16"
                height="15"
                viewBox="0 0 16 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.00065 7.4987L7.33398 8.83203L10.0007 6.16536M14.6673 7.4987C14.6673 11.1806 11.6825 14.1654 8.00065 14.1654C4.31875 14.1654 1.33398 11.1806 1.33398 7.4987C1.33398 3.8168 4.31875 0.832031 8.00065 0.832031C11.6825 0.832031 14.6673 3.8168 14.6673 7.4987Z"
                  stroke="#7ECC00"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            }
          />
        )}
        {status === "DECLINED" && (
          <NotificationButton
            buttonName="Declined"
            bgColor="bg-[#991B1B33]"
            textColor="text-[#F87171]"
            borderColor="border-[#DC2626]"
            onClick={() => {}}
            icon={
              <svg
                width="16"
                height="15"
                viewBox="0 0 16 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.0007 5.4987L6.00065 9.4987M6.00065 5.4987L10.0007 9.4987M14.6673 7.4987C14.6673 11.1806 11.6825 14.1654 8.00065 14.1654C4.31875 14.1654 1.33398 11.1806 1.33398 7.4987C1.33398 3.8168 4.31875 0.832031 8.00065 0.832031C11.6825 0.832031 14.6673 3.8168 14.6673 7.4987Z"
                  stroke="#F87171"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            } // Add cancel icon
          />
        )}
      </div>
    </div>
  );
};

export default CollaborationRequestNotifContent;
