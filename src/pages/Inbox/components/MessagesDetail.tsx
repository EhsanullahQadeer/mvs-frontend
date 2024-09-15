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
import { useEffect, useState } from "react";
import React from "react";
import { sendMessage } from "api/inbox";
import menuIcon from "../assets/icons/menuIcon.svg";
import MessagesSection from "./MessagesSection";
import Footer from "./Footer";
import { IMessage, IMessagesData } from "./types";
import InfoSection from "./InfoSection";
import NotesSection from "./NotesSection";

const headerTabs = [
  { label: "Messages", value: 0 },
  { label: "Info", value: 1 },
  { label: "Notes", value: 2 },
];

type Props = {
  conversation: IMessage;
  loading: boolean;
  messages: IMessagesData;
};

const MessagesDetail = (props: Props) => {
  const {
    conversation: { conversation_id, thumbnail, displayName, recipient },
    loading,
    messages,
  } = props;

  console.log(" ==== Message Detail Props ====");
  console.log(props);

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
      conversation_id: conversation_id,
      message,
    };
    const _newMessage = await sendMessage(payload);
    console.log("=== New Message ===");
    console.log(_newMessage);
    setMessage("");
  };

  console.log("messages", messages);

  return (
    <React.Fragment>
      <div className="w-full border-l border-[#1C1C1C] bg-[#101113]">
        <div className="flex flex-col justify-between pt-2">
          <div className="flex flex-col w-full max-md:max-w-full">
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
              <div className="flex justify-center items-center w-9 h-9 rounded bg-[#242424] cursor-pointer">
                <img
                  alt=""
                  loading="lazy"
                  src={menuIcon}
                  className="object-contain w-5 h-5"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2 items-center px-4 py-4 w-full border-y border-[#1C1C1C]">
              {headerTabs.map((headerTab) => {
                const { label, value } = headerTab;
                return (
                  <div
                    key={value}
                    onClick={() => setTab(value)}
                    className={`gap-2.5 px-3 py-2 font-semibold rounded-[35px] cursor-pointer ${
                      tab === value
                        ? "text-[#0F0F0F] bg-[#9EFF00] text-xs"
                        : "text-[#848484] bg-[#242424] text-[10px]"
                    }`}
                  >
                    {label}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex overflow-hidden flex-col flex-1 justify-center py-3 px-4 w-full">
            <div className="flex flex-col flex-1 w-full">
              {tab === 0 && (
                <>
                  <MessagesSection {...{ loading, messages }} />
                </>
              )}

              {tab === 1 && (
                <>
                  <InfoSection />
                </>
              )}

              {tab === 2 && (
                <>
                  <NotesSection />
                </>
              )}
            </div>
          </div>

          <Footer
            {...{
              message,
              setMessage,
              newMessage,
              conversation: props.conversation,
            }}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default MessagesDetail;
