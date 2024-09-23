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
import MessagesDetail from "./MessagesDetail";
import searchIcon from "../../../assets/icons/searchIcon.svg";
import { ReactComponent as ArrowDown } from "../../../assets/icons/arrowDown.svg";
import { ReactComponent as ArchieveIcon } from "../../../assets/icons/archieveIcon.svg";
import { ReactComponent as AlertOctagonIcon } from "../../../assets/icons/alertOctagon.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/icons/deleteIcon.svg";
import { ReactComponent as MailOpenIcon } from "../../../assets/icons/mailOpenIcon.svg";
import { ReactComponent as FolderInputIcon } from "../../../assets/icons/folderInputIcon.svg";
import { ReactComponent as MenuIcon } from "../../../assets/icons/menuIcon.svg";
import { Conversations } from "./Conversations";
import {
  getConversationsById,
  getConversationsList,
  getConversationNotes,
} from "api/messenger";
import moment from "moment";
import { IMessage, INotes } from "./types";
import { CircularProgress } from "@mui/material";

const MessagesList = () => {
  const [conversations, setConversations] = useState([]);

  const [activeConversation, setActiveConversation] = useState(null);

  const [messages, setMessages] = useState([]);

  const [notes, setNotes] = useState<INotes[]>([]);
  const [loading, setLoading] = useState(false);

  const [total, setTotal] = useState(0);

  const [loading_conversations, setLoadingConversations] = useState(false);

  useEffect(() => {
    getConversationList();
  }, []);

  const getConversationList = async () => {
    try {
      setLoadingConversations(true);
      const response = await getConversationsList({
        searchTerm: "",
        order: true,
        skip: 0,
        take: 10,
        limit: 10,
      });

      setTotal(response.data.count);
      setConversations(response.data.conversations);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoadingConversations(false);
    }
  };

  const getConversationMessages = async (
    conversation: IMessage,
    conversation_id: string
  ) => {
    setActiveConversation(conversation);
    const _msgs = await getConversationsById(
      {
        limit: 10,
      },
      conversation_id
    );

    const results = _msgs.data.messages;

    for (var i = 0; i < results.length; i++) {
      results[i].date = moment(results[i].Timestamp).format("YYYY-MM-DD");
    }

    const groups = results.reduce((groups, message) => {
      const date = message.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
      return groups;
    }, {});

    const groupArrays = Object.keys(groups).map((date) => {
      return {
        date,
        messages: groups[date],
      };
    });

    setMessages(groupArrays);
  };

  const getNotes = async (conversation_id: string) => {
    const response = await getConversationNotes({
      conversation_id,
      ascending: true,
    });

    setNotes(response.data);
  };

  const getMessagesNotes = async (
    selectedConvo: IMessage,
    selectedConvoId: string
  ) => {
    setLoading(true);
    await getConversationMessages(selectedConvo, selectedConvoId);
    await getNotes(selectedConvoId);
    setLoading(false);
  };

  return (
    <React.Fragment>
      <div className="flex flex-1 overflow-hidden flex-col pt-4 bg-[#08090a] relative">
        <div className="flex flex-col justify-center px-3 w-full text-sm leading-none bg-[#08090a] sticky top-0">
          <div className="flex flex-col justify-center items-start w-full">
            <div className="flex items-center pl-4 max-w-full rounded-full bg-[#1c1c1c] min-h-[40px] w-[271px]">
              <div className="flex flex-1 shrink gap-2 items-center self-stretch my-auto w-full basis-0">
                <img
                  loading="lazy"
                  src={searchIcon}
                  className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
                  alt="search-icon"
                />
                <div className="flex-1 shrink gap-2.5 self-stretch my-auto">
                  <input
                    style={{ boxShadow: "none" }}
                    type="text"
                    className="rounded-full outline-none bg-transparent border-none w-full py-2.5 text-sm font-normal text-[#989898]"
                    placeholder="search anyone..."
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-between items-center py-2 w-full">
            <div className="flex flex-1 gap-2 items-center">
              <div className="flex justify-center items-center gap-1 h-8 w-[52px] bg-eerieBlack rounded">
                <div className="flex justify-center items-center w-8 h-8">
                  <div className="w-4 h-4 rounded border-slateGray-2 border-[1.5px]" />
                </div>
                <div className="flex justify-center items-center h-full w-4 text-slateGray-2">
                  <ArrowDown className="w-4 h-4" />
                </div>
              </div>
              <div className="flex gap-1 items-center">
                <div className="flex justify-center items-center w-8 h-8 rounded bg-[#242424] text-white">
                  <ArchieveIcon className="w-4 h-4" />
                </div>
                <div className="flex justify-center items-center w-8 h-8 rounded bg-eerieBlack text-slateGray-2">
                  <AlertOctagonIcon className="w-4 h-4" />
                </div>
                <div className="flex justify-center items-center w-8 h-8 rounded bg-eerieBlack text-slateGray-2">
                  <DeleteIcon className="w-4 h-4" />
                </div>
                <div className="flex justify-center items-center w-8 h-8 rounded bg-eerieBlack text-slateGray-2">
                  <MailOpenIcon className="w-4 h-4" />
                </div>
                <div className="flex justify-center items-center w-8 h-8 rounded bg-eerieBlack text-slateGray-2">
                  <FolderInputIcon className="w-4 h-4" />
                </div>
                <div className="flex justify-center items-center w-8 h-8 rounded bg-eerieBlack text-slateGray-2">
                  <MenuIcon className="w-4 h-4" />
                </div>
              </div>
            </div>
            <div className="flex gap-3 items-center self-stretch my-auto">
              <div className="gap-2.5 self-stretch p-2.5 my-auto text-sm leading-none text-neutral-400">
                1-{total > 20 ? 20 : total} of {total}
              </div>
              <div className="flex gap-2 justify-center items-center self-stretch my-auto">
                <img
                  loading="lazy"
                  src="https://assets.mvssive.net/cursor-left.svg"
                  className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square cursor-pointer"
                  alt="cursor-left"
                />
                <img
                  loading="lazy"
                  src="https://assets.mvssive.net/cursor-right.svg"
                  className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square cursor-pointer"
                  alt="cursor-right"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-1 w-full flex-1 overflow-y-auto overflow-x-hidden custom-dropdown">
          <div className="flex flex-col pb-1 w-full flex-1 relative">
            {/* List Item */}

            {loading_conversations ? (
              <>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999px]">
                  <CircularProgress
                    sx={{
                      width: "50px !important",
                      height: "50px !important",
                      color: "#9EFF00",
                    }}
                  />
                </div>
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
                              getMessagesNotes,
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
      <div className="flex-1">
        {activeConversation && (
          <MessagesDetail
            {...{
              messages,
              conversation: activeConversation,
              loading,
              getConversationMessages,
              getNotes,
              notes,
            }}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default MessagesList;
