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
import { IMessage, IMessagesData, INotes } from "./types";
import InfoSection from "./InfoSection";
import NotesSection from "./NotesSection";
import { sendInboxMessage } from "api/messenger";
import { CircularProgress } from "@mui/material";

type Props = {
  conversation: IMessage;
  loading: boolean;
  messages: IMessagesData;
  getConversationMessages: (
    conversation: IMessage,
    conversation_id: string
  ) => Promise<void>;
  getNotes: (conversation_id: string) => void;
  notes: INotes[];
};

const MessagesDetail = (props: Props) => {
  const {
    loading,
    messages,
    getConversationMessages,
    getNotes,
    notes,
    conversation,
  } = props;
  const { conversation_id, thumbnail, displayName, recipient } = conversation;
  const [overlayLoading, setOverlayLoading] = useState<boolean>(false);
  const headerTabs = [
    {
      label: "Messages",
      value: 0,
    },
    { label: "Info", value: 1 },
    { label: "Notes", value: 2 },
  ];

  const [tip, setTip] = useState(0);
  const [message, setMessage] = useState("");
  const [tab, setTab] = useState(0);

  const validateTip = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setTip(value);
  };

  useEffect(() => {}, [props]);

  const newMessage = async () => {
    const key = messages[messages.length - 1]["messages"];
    const index = key.length - 1;
    const _msg = messages[messages.length - 1]["messages"].push(key[index]);

    messages[messages.length - 1]["messages"][index].message = message;

    const payload = {
      recipient_id: recipient,
      conversation_id,
      message,
    };
    setOverlayLoading(true);
    await sendInboxMessage(payload);
    setMessage("");
    await getConversationMessages(conversation, conversation_id);
    setOverlayLoading(false);
  };
  const messagesRef = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      const messageContainer = messagesRef.current;
      if (messageContainer) {
        messageContainer.scrollTop = messageContainer.scrollHeight;
      }
    });
  }, [messages, notes]);
  return (
    <React.Fragment>
      <div className="h-full w-full border-l border-eerieBlack bg-[#101113] relative">
        <div className="flex flex-col pt-2 h-full">
          <div className="flex flex-col w-full max-md:max-w-full sticky top-0 bg-[#101113]">
            <div className="flex flex-wrap gap-5 justify-between items-center p-4 pt-2 w-full">
              <div className="flex gap-2 items-center">
                <div
                  style={{
                    background:
                      "linear-gradient(141.84deg, #0258A5 4.32%, #9EFF00 94.89%)",
                  }}
                  className="flex rounded-full p-0.5 w-12 aspect-square"
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
                  <div className="text-xs text-[#B2B2B2] font-normal">
                    Los Angeles, CA
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center w-9 h-9 rounded bg-[#242424] cursor-pointer text-[#B2B2B2]">
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
                        ? "text-jetBlack bg-[#9EFF00] text-xs"
                        : "text-[#848484] bg-[#242424] text-[10px]"
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
                "flex flex-col px-4 flex-1 py-3  overflow custom-dropdown overflow-y-auto"
              }
            >
              {!loading && (
                <>
                  {tab === 0 && (
                    <>
                      <MessagesSection {...{ messages }} />
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
              message,
              setMessage,
              newMessage,
              conversation: conversation,
            }}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default MessagesDetail;
