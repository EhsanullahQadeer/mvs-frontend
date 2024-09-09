/*************************************************************************
 * @file list.tsx
 * @author Zohaib Ahmad
 * @desc Showing Incoming / outgoing messages list
 *
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* eslint-disable @typescript-eslint/no-unused-vars */

/* IMPORTS */
import { useEffect, useRef, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInboxMessages } from "redux/actions";
import ActionType from "redux/types";
import moment from "moment";
import { getConversationsById } from "api/inbox";
import MessagesDetail from "./detail";

interface RootState {
  auth: any;
  inbox: any;
}

const InboxLoader = () => {
  return (
    <>
      <div
        role="status"
        className="max-w-md p-4 space-y-4  divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
          </div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
        </div>
        <div className="flex items-center justify-between pt-4">
          <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
          </div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
        </div>
        <div className="flex items-center justify-between pt-4">
          <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
          </div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
        </div>
        <div className="flex items-center justify-between pt-4">
          <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
          </div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
        </div>
        <div className="flex items-center justify-between pt-4">
          <div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
          </div>
          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" />
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    </>
  );
};

const Conversations = (props: any) => {
  
    const getConversationMessages = async (conversation_id) => {

        const _msgs =  await getConversationsById({
         limit: 10
        },conversation_id);
 
        console.log("=== Messages ===");
        // console.log(_msgs.data.messages)

        const results = _msgs.data.messages;

        for(var i = 0; i < results.length; i++) {

            results[i].date = moment(results[i].Timestamp).format('YYYY-MM-DD')
            console.log(results[i])
        }

        const groups = results.reduce((groups, message) => {
            const date = message.date
            if (!groups[date]) {
            groups[date] = [];
            }
            groups[date].push(message);
            return groups;
        }, {});
        
        const groupArrays = Object.keys(groups).map((date) => {
            return {
            date,
            messages: groups[date]
            };
        });

        console.log(groupArrays);



        console.log(results)

        props.setMessages(groupArrays)

   }
  return (
    <>
      <div 
        className="cursor-pointer hover:bg-neutral-800 cursor-pointer  flex justify-between items-center px-3 py-2 w-full border-b border-gray-500 border-opacity-20 max-md:max-w-full">
        <div className="flex flex-wrap flex-1 shrink gap-3 items-center self-stretch my-auto w-full basis-0 min-w-[240px] max-md:max-w-full">
          <div className="flex gap-2 self-stretch my-auto min-w-[240px]">
            <div className="flex gap-2 items-center h-full min-w-[240px]">
              <div className="flex gap-1 self-stretch my-auto rounded min-h-[32px]">
                <div className="flex justify-center items-center px-1 my-auto w-8 rounded min-h-[32px]">
                  <div className="flex overflow-hidden justify-center items-center self-stretch my-auto w-6 min-h-[24px]">
                    <div className="flex self-stretch my-auto w-4 h-4">
                        <input type="checkbox" className="rounded border-solid border-[1.5px] border-zinc-500 min-h-[16px] bg-transparent cursor-pointer"/>
                    </div>
                  </div>
                </div>
                {props.conversation.UnreadCount > 0 && (
                  <>
                    <div className="flex overflow-hidden flex-col justify-center items-center py-2 w-4">
                      <div className="flex w-2 h-2 bg-lime-300 rounded-full min-h-[8px]" />
                    </div>
                  </>
                )}
              </div>
              <div className="flex gap-1 items-center self-stretch my-auto"
              
              onClick={ async () => {
                  props.setLoading(true);
                  props.setActiveConversation(props.conversation)
                  await getConversationMessages(props.conversation.conversation_id)
                  props.setLoading(false);
              }}
              
              >
                <div className="flex overflow-hidden flex-col justify-center items-center self-stretch p-2 my-auto w-8">
                    <img
                        loading="lazy"
                        src="https://assets.mvssive.net/featured.svg"
                        className="object-contain w-4 aspect-square"
                    />
                </div>
                <div className="flex gap-2 items-center self-stretch my-auto">
                  <div className="flex gap-2.5 items-start self-stretch my-auto w-[52px]">
                    <img
                      loading="lazy"
                      src={props.conversation.thumbnail}
                      className="object-contain aspect-square w-[52px] rounded-full"
                    />
                  </div>
                  <div className="flex flex-col justify-center self-stretch my-auto font-semibold w-[100px]">
                    <div className="text-sm leading-none text-white">
                      {props.conversation.displayName}
                    </div>
                    <div className="self-start px-1 py-0.5 mt-1 text-xs tracking-wide leading-tight text-lime-400 whitespace-nowrap bg-lime-800 rounded border border-lime-400 border-solid min-h-[16px]">
                                            $434.99
                                        </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1 shrink justify-center items-start self-stretch my-auto text-white basis-6 min-w-[240px]">
            <div className="flex-1 shrink gap-2.5 self-stretch p-2.5 max-w-full text-sm font-semibold leading-none w-[150px]">
              {props.conversation.LastMessageSummary}
            </div>
            <div className="flex gap-4 items-center px-2 text-xs leading-none w-[75px]">
              <div className="self-stretch my-auto w-[59px]">{moment(props.conversation.LastUpdatedTimestamp).format('h:mm A')}</div>
            </div>
          </div>
          {props.conversation.UnreadCount > 0 && (
            <>
              <div className="self-stretch px-3 py-1 my-auto text-xs font-semibold leading-none text-white whitespace-nowrap bg-red-400 rounded-3xl">
                {props.conversation.UnreadCount}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

const MessagesList = (props) => {
  const dispatch: any = useDispatch();

  const [conversations, setConversations] = useState([]);

  const [activeConversation,setActiveConversation] = useState(null);

  const [messages,setMessages] = useState([]);

  const [loading,setLoading] = useState(false);

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
          skip:0,
          take:10,
          limit:10
        })
      );

  }


  useEffect(() => {
    console.log("====== Inbox State ======");

    if (state.inbox.type === "CONVERSATONS_MESSAGES_LIST") {
      setTotal(state.inbox.conversations_list.count);
      setConversations(state.inbox.conversations_list.conversations);

      setLoadingConversations(false);
    } else if ((state.inbox.type === "CONVERSATONS_MESSAGES_LIST_FAILED")) {
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
              <div className="flex items-center px-4 py-2.5 max-w-full rounded-3xl bg-zinc-900 min-h-[40px] w-[271px]">
                <div className="flex flex-1 shrink gap-2 items-center self-stretch my-auto w-full basis-0">
                  <img
                    loading="lazy"
                    src="https://assets.mvssive.net/search.svg"
                    className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
                  />
                  <div className="flex-1 shrink gap-2.5 self-stretch my-auto">
                    <input
                      type="text"
                      className=" rounded-full !outline-none outline-none bg-zinc-950 border-none"
                      value=""
                      placeholder="search anything..."
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

            <div className="flex overflow-hidden flex-col pb-1 w-full h-[799px] max-md:max-w-full">
              {/* List Item */}

              {loading_conversations ? (
                <>
                  <InboxLoader />
                </>
              ) : (
                <>
                  {conversations.length ? (
                    <>
                      {conversations.map((c) => {
                        return (
                          <>
                            <Conversations setLoading={setLoading} conversation={c} setActiveConversation={setActiveConversation} setMessages={setMessages}  />
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
         <MessagesDetail messages={messages} conversation={activeConversation} loading={loading}/>
      )}
    </React.Fragment>
  );
};

export default MessagesList;
