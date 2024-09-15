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
import { useDispatch, useSelector } from "react-redux";
import { getInboxMessages } from "redux/actions";
import MessagesDetail from "./MessagesDetail";
import searchIcon from "../assets/icons/searchIcon.svg";
import { Conversations } from "./Conversations";
import { InboxLoader } from "./InboxLoader";

interface RootState {
  auth: any;
  inbox: any;
}

const MessagesList = (props) => {
  const dispatch: any = useDispatch();

  const [conversations, setConversations] = useState([]);

  const [activeConversation, setActiveConversation] = useState(null);

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);

  const [total, setTotal] = useState(0);

  const [loading_conversations, setLoadingConversations] = useState(false);

  const state = useSelector((state: RootState) => state);

  useEffect(() => {
    getConversationList();
  }, [dispatch]);

  const getConversationList = async () => {
    setLoadingConversations(true);

    dispatch(
      getInboxMessages({
        paginateBackwards: 0,
        skip: 0,
        take: 10,
        limit: 10,
      })
    );
  };

  useEffect(() => {
    console.log("====== Inbox State ======");

    if (state.inbox.type === "CONVERSATONS_MESSAGES_LIST") {
      setTotal(state.inbox.conversations_list.count);
      setConversations(state.inbox.conversations_list.conversations);

      setLoadingConversations(false);
    } else if (state.inbox.type === "CONVERSATONS_MESSAGES_LIST_FAILED") {
      setLoadingConversations(false);
    }
  }, [state]);

  console.log("==== Conversations ====");
  console.log(conversations);

  return (
    <React.Fragment>
      <div>
        <div className="flex overflow-hidden flex-col pt-4 bg-zinc-950">
          <div className="flex flex-col justify-center px-3 w-full text-sm leading-none text-neutral-400 max-md:max-w-full">
            <div className="flex flex-col justify-center items-start w-full max-md:max-w-full">
              <div className="flex items-center pl-4 max-w-full rounded-full bg-[#1c1c1c] min-h-[40px] w-[271px]">
                <div className="flex flex-1 shrink gap-2 items-center self-stretch my-auto w-full basis-0">
                  <img
                    loading="lazy"
                    src={searchIcon}
                    className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
                  />
                  <div className="flex-1 shrink gap-2.5 self-stretch my-auto">
                    <input
                      style={{ boxShadow: "none" }}
                      type="text"
                      className="rounded-full outline-none bg-transparent border-none w-full py-2.5 text-sm font-normal text-[#989898]"
                      // value=""
                      placeholder="search anyone..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-1 w-full max-md:max-w-full">
            <div className="flex justify-between items-center px-3 py-2 w-full max-md:max-w-full">
              <div className="flex flex-wrap flex-1 shrink justify-between items-center self-stretch my-auto w-full basis-0 min-w-[240px] max-md:max-w-full">
                <div className="flex flex-1 shrink gap-2 items-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
                  <div className="flex gap-1 items-center self-stretch my-auto min-h-[32px]">
                    <div className="flex gap-1 items-center self-stretch my-auto rounded bg-zinc-900 min-h-[32px]">
                      <div className="flex justify-center items-center self-stretch px-1 my-auto w-8 rounded min-h-[32px]">
                        <div className="flex overflow-hidden justify-center items-center self-stretch my-auto w-6 min-h-[24px]">
                          <div className="flex self-stretch my-auto w-4 h-4 rounded border-gray-600 border-solid border-[1.5px] min-h-[16px]" />
                        </div>
                      </div>
                      <div className="flex justify-center items-center self-stretch py-2 my-auto w-4">
                        <img
                          loading="lazy"
                          src="https://assets.mvssive.net/arrow-down.svg"
                          className="object-contain self-stretch my-auto w-4 aspect-square"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1 items-center self-stretch my-auto">
                    <div className="flex gap-2.5 justify-center items-center self-stretch px-2 my-auto w-8 h-8 rounded bg-neutral-800">
                      <img
                        loading="lazy"
                        src="https://assets.mvssive.net/menu-5.svg"
                        className="object-contain self-stretch my-auto w-4 aspect-square"
                      />
                    </div>
                    <div className="flex gap-2.5 justify-center items-center self-stretch px-2 my-auto w-8 h-8 rounded bg-zinc-900">
                      <img
                        loading="lazy"
                        src="https://assets.mvssive.net/menu-4.svg"
                        className="object-contain self-stretch my-auto w-4 aspect-square"
                      />
                    </div>
                    <div className="flex gap-2.5 justify-center items-center self-stretch px-2 my-auto w-8 h-8 rounded bg-zinc-900">
                      <img
                        loading="lazy"
                        src="https://assets.mvssive.net/menu-3.svg"
                        className="object-contain self-stretch my-auto w-4 aspect-square"
                      />
                    </div>
                    <div className="flex gap-2.5 justify-center items-center self-stretch px-2 my-auto w-8 h-8 rounded bg-zinc-900">
                      <img
                        loading="lazy"
                        src="https://assets.mvssive.net/menu-2.svg"
                        className="object-contain self-stretch my-auto w-4 aspect-square"
                      />
                    </div>
                    <div className="flex gap-2.5 justify-center items-center self-stretch px-2 my-auto w-8 h-8 rounded bg-zinc-900">
                      <img
                        loading="lazy"
                        src="https://assets.mvssive.net/menu-1.svg"
                        className="object-contain self-stretch my-auto w-4 aspect-square"
                      />
                    </div>
                    <div className="flex gap-2.5 justify-center items-center self-stretch px-2 my-auto w-8 h-8 rounded bg-zinc-900">
                      <img
                        loading="lazy"
                        src="https://assets.mvssive.net/menu-list.svg"
                        className="object-contain self-stretch my-auto w-4 aspect-square"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 items-center self-stretch my-auto">
                  <div className="gap-2.5 self-stretch p-2.5 my-auto text-sm leading-none text-neutral-400">
                    1-20 of 43
                  </div>
                  <div className="flex gap-2 justify-center items-center self-stretch my-auto">
                    <img
                      loading="lazy"
                      src="https://assets.mvssive.net/cursor-left.svg"
                      className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square cursor-pointer"
                    />
                    <img
                      loading="lazy"
                      src="https://assets.mvssive.net/cursor-right.svg"
                      className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex overflow-hidden flex-col pb-1 w-full">
              {/* List Item */}

              {loading_conversations ? (
                <>
                  <InboxLoader />
                </>
              ) : (
                <>
                  {conversations.length ? (
                    <>
                      {conversations.map((conversation) => {
                        return (
                          <>
                            <Conversations
                              {...{
                                conversation,
                                activeConversation,
                                setActiveConversation,
                                setMessages,
                                setLoading,
                              }}
                            />
                          </>
                        );
                      })}
                    </>
                  ) : null}
                </>
              )}

              {/* End List Item */}
            </div>
          </div>
        </div>
      </div>
      {activeConversation && (
        <MessagesDetail
          messages={messages}
          conversation={activeConversation}
          loading={loading}
        />
      )}
    </React.Fragment>
  );
};

export default MessagesList;
