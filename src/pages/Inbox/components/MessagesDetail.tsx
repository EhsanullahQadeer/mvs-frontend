/*************************************************************************
 * @file list.tsx
 * @author Ehsanullah
 * @desc Showing Incoming / outgoing messages list
 *
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* eslint-disable @typescript-eslint/no-unused-vars */

/* IMPORTS */
import { useEffect, useRef, useState } from "react";
import React from "react";
import { ReactComponent as MenuIcon } from "../../../assets/icons/menuIcon.svg";
import MessagesSection from "./MessagesSection";
import Footer from "./Footer";
import { IConversation, ICurrentUser, IMessagesData, INotes } from "./types";
import InfoSection from "./InfoSection";
import NotesSection from "./NotesSection";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toggleMessageToRead } from "api/messenger";
import ActionMenu from "./ActionMenu";
import { FiUser } from "react-icons/fi";
import { IoVideocamOutline } from "react-icons/io5";
import { HiOutlineEye } from "react-icons/hi";
import { FiUnlock } from "react-icons/fi";
import { GrShareOption } from "react-icons/gr";
import { LuShieldAlert } from "react-icons/lu";
import { LuBellOff } from "react-icons/lu";
import { FiUserX } from "react-icons/fi";

type Props = {
  conversation: IConversation;
  loading: boolean;
  messages: IMessagesData;
  getConversationMessages: (conversation: IConversation) => Promise<void>;
  getNotes: (id: number) => void;
  notes: INotes[];
  currentUserInfo: ICurrentUser;
  onClose: () => void;
};

const MessagesDetail = (props: Props) => {
  const {
    loading,
    messages,
    getConversationMessages,
    getNotes,
    notes,
    conversation,
    currentUserInfo,
    onClose,
  } = props;
  const navigate = useNavigate();
  const [menuSection, setMenuSection] = useState(false);
  const { id, thumbnail, displayName } = conversation;

  console.log("conversation...", conversation);

  const [overlayLoading, setOverlayLoading] = useState<boolean>(false);
  const headerTabs = [
    {
      label: "Messages",
      value: 0,
    },
    { label: "Info", value: 1 },
    { label: "Notes", value: 2 },
  ];

  const [tab, setTab] = useState(0);

  const messagesRef = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      const messageContainer = messagesRef.current;
      if (messageContainer) {
        messageContainer.scrollTop = messageContainer.scrollHeight;
      }
    });
  }, [messages, notes]);

  const handleDemoBtn = (msgId: number) => {
    localStorage.setItem("msgId", msgId.toString());
    navigate(`/inbox/${id}/thread`);
  };

  const handleReviewBtn = async (msgId: number) => {
    localStorage.setItem("msgId", msgId.toString());
    navigate(`/inbox/${id}/thread`);
    try {
      await toggleMessageToRead({ messageId: msgId });
      await getConversationMessages(conversation);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleThreadReply = (msgId: number) => {
    localStorage.setItem("msgId", msgId.toString());
    navigate(`/inbox/${id}/thread`);
  };

  const menuItems = [
    {
      label: "Go to Profile",
      icon: <FiUser />,
      func: () => {},
    },
    {
      label: "Schedule Meeting",
      icon: <IoVideocamOutline />,
      func: () => {},
    },
    {
      label: "Request Demo Review",
      icon: <HiOutlineEye />,
      func: () => {},
    },
    {
      label: "Unlock Inbox",
      icon: <FiUnlock />,
      func: () => {},
    },
    {
      label: "Share Profile",
      icon: <GrShareOption />,
      func: () => {},
    },
    {
      label: "Report User",
      icon: <LuShieldAlert />,
      func: () => {},
    },
    {
      label: "Mute Notifications",
      icon: <LuBellOff />,
      func: () => {},
    },
    {
      label: "Block User",
      icon: <FiUserX />,
      func: () => {},
    },
  ];

  const handleMenuSection = () => {
    setMenuSection(!menuSection);
  };

  return (
    <React.Fragment>
      <div className="h-full w-full border-l border-eerieBlack bg-richBlack relative">
        <div className="flex flex-col pt-2 h-full">
          <div className="flex flex-col w-full max-md:max-w-full bg-richBlack">
            <div className="flex flex-wrap gap-5 justify-between items-center p-4 pt-2 w-full">
              <div className="flex gap-2 items-center">
                <div
                  style={{
                    background:
                      "linear-gradient(141.84deg, #0258A5 4.32%, #9EFF00 94.89%)",
                  }}
                  className="flex rounded-full p-0.5 w-12 h-12 aspect-square"
                >
                  <div className="w-full h-full rounded-full border-[2px] border-[#151515]">
                    <div
                      style={{ backgroundImage: `url("${thumbnail}")` }}
                      className="w-full h-full rounded-full bg-cover bg-center"
                    ></div>
                  </div>
                </div>
                <div className="flex flex-col gap-0.5">
                  <div className="text-sm font-semibold text-white">
                    {displayName}
                  </div>
                  <div className="text-xs text-silver font-normal">
                    Los Angeles, CA
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div
                  onClick={handleMenuSection}
                  className="flex justify-center items-center w-9 h-9 rounded bg-[#242424] cursor-pointer text-silver relative"
                >
                  <MenuIcon className="w-5 h-5" />

                  {menuSection ? (
                    <ActionMenu {...{ menuItems, setMenuSection }} />
                  ) : (
                    <></>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="flex justify-center items-center w-9 h-9 rounded bg-[#242424] cursor-pointer text-silver hover:bg-[#2f2f2f]"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 items-center px-4 py-4 w-full border-y border-eerieBlack">
              {headerTabs.map((headerTab) => {
                const { label, value } = headerTab;
                return (
                  <div
                    key={value}
                    onClick={() => {
                      setTab(value);
                    }}
                    className={`gap-2.5 px-3 py-2 font-semibold rounded-[35px] cursor-pointer ${
                      tab === value
                        ? "text-jetBlack bg-limeGreen text-xs"
                        : "text-coolGray bg-eclipseGray text-[10px]"
                    }`}
                  >
                    {label}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col flex-1 relative overflow-hidden">
            {(loading || overlayLoading) && (
              <div
                className={`absolute top-0 left-0 bottom-0 right-0  w-full h-full flex justify-center items-center ${
                  overlayLoading ? "bg-black opacity-40" : ""
                }`}
              >
                <CircularProgress
                  sx={{
                    width: "40px !important",
                    height: "40px !important",
                    color: "#9EFF00",
                  }}
                />
              </div>
            )}
            <div
              ref={messagesRef}
              className={
                "flex flex-col flex-1 py-3 overflow custom-dropdown overflow-y-auto"
              }
            >
              {!loading && (
                <>
                  {tab === 0 && (
                    <>
                      {Array.isArray(messages) &&
                      messages.length > 0 &&
                      messages[0]?.messages?.length > 0 ? (
                        <MessagesSection
                          {...{
                            messages,
                            handleDemoBtn,
                            handleReviewBtn,
                            handleThreadReply,
                            currentUserInfo,
                            refreshMessages: () => getConversationMessages(conversation),
                            setOverlayLoading
                          }}
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center px-4">
                          <div className="text-limeGreen text-xl mb-2">
                            Start your conversation!
                          </div>
                          <p className="text-coolGray text-sm max-w-md">
                            Send a message to begin connecting with{" "}
                            {displayName}.
                          </p>
                        </div>
                      )}
                    </>
                  )}

                  {tab === 1 && (
                    <>
                      <InfoSection {...{ conversation }} />
                    </>
                  )}

                  {tab === 2 && (
                    <>
                      <NotesSection
                        {...{
                          notes,
                          id,
                          getNotes,
                          setOverlayLoading,
                        }}
                      />
                    </>
                  )}
                </>
              )}
            </div>
          </div>

          <Footer
            {...{
              conversation,
              setOverlayLoading,
              getConversationMessages,
              currentUserInfo,
            }}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default MessagesDetail;
