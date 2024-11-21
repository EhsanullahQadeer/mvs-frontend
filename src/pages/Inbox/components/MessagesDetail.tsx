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
import { ICurrentUser, IMessage, IMessagesData, INotes } from "./types";
import InfoSection from "./InfoSection";
import NotesSection from "./NotesSection";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toggleMessageToRead } from "api/messenger";

type Props = {
  conversation: IMessage;
  loading: boolean;
  messages: IMessagesData;
  getConversationMessages: (conversation: IMessage) => Promise<void>;
  getNotes: (conversation_id: string) => void;
  notes: INotes[];
  currentUserInfo: ICurrentUser;
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
  } = props;
  const navigate = useNavigate();
  const { id, thumbnail, displayName, conversation_id } = conversation;
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

  return (
    <React.Fragment>
      <div className="h-full w-full border-l border-eerieBlack bg-richBlack relative">
        <div className="flex flex-col pt-2 h-full">
          <div className="flex flex-col w-full max-md:max-w-full sticky top-0 bg-richBlack">
            <div className="flex flex-wrap gap-5 justify-between items-center p-4 pt-2 w-full">
              <div className="flex gap-2 items-center">
                <div
                  style={{
                    background:
                      "linear-gradient(141.84deg, #0258A5 4.32%, #9EFF00 94.89%)",
                  }}
                  className="flex rounded-full p-0.5 w-12 h-12 aspect-square"
                >
                  <img
                    alt=""
                    loading="lazy"
                    src={thumbnail}
                    className="object-contain w-full h-full rounded-full border-[2px] border-[#151515]"
                  />
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
              <div className="flex justify-center items-center w-9 h-9 rounded bg-[#242424] cursor-pointer text-silver">
                <MenuIcon className="w-5 h-5" />
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
                      <MessagesSection
                        {...{
                          messages,
                          handleDemoBtn,
                          handleReviewBtn,
                          handleThreadReply,
                          currentUserInfo,
                        }}
                      />
                    </>
                  )}

                  {tab === 1 && (
                    <>
                      <InfoSection />
                    </>
                  )}

                  {tab === 2 && (
                    <>
                      <NotesSection
                        {...{
                          notes,
                          conversation_id,
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
