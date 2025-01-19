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
import { Conversations } from "./Conversations";
import { getMessages, toggleFavoriteCovoApi } from "api/messenger";
import { CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import FeedbackThread from "./FeedbackThread";
import MsgListHeaderOptions from "./MsgListHeaderOptions";
import useMessageList from "../hooks/useMessageList";
import { RootState } from "redux/reducers";
import { useSelector } from "react-redux";
import useGetMessagesNotes from "../hooks/useGetMessagesNotes";
import { IConversation } from "./types";
import { useLambdaEvent } from "services/WebSocket/useLambdaEvent.hook";

const headerTabs = [
  {
    label: "General Inbox",
    value: 0,
  },
  {
    label: "Priority Inbox",
    value: 1,
  },
];

const MessagesList = () => {
  const { id, thread } = useParams();
  const user = useSelector((state: RootState) => state);
  const currentUserInfo = user.auth.user;

  const [tab, setTab] = useState(0);
  const [showArchivedConvos, setShowArchivedConvos] = useState(false);
  const [showFavoriteConvos, setShowFavoriteConvos] = useState(false);
  const [filteredConversations, setFilteredConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);

  const [selectedConversations, setSelectedConversations] = useState<number[]>(
    []
  );
  const [favoriteConversationIds, setFavoriteConversationIds] = useState<
    number[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const {
    loadingConversations,
    conversations,
    archivedConversations,
    getConversationList,
    favoriteConversations,
    setConversations,
  } = useMessageList();

  useEffect(() => {
    if (currentUserInfo && !conversations.length) {
      getConversationList();
    }
  }, [currentUserInfo]);

  useEffect(() => {
    if (favoriteConversations.length) {
      console.log("favoriteConversations...", favoriteConversations);

      const favoriteIds = favoriteConversations.map(
        (conversation) => conversation.id
      );

      setFavoriteConversationIds(favoriteIds);
    }
  }, [favoriteConversations]);

  const {
    messages,
    notes,
    loading,
    getConversationMessages,
    getNotes,
    getMessagesNotes,
  } = useGetMessagesNotes(setActiveConversation);

  useEffect(() => {
    if (id && conversations.length > 0) {
      const conversation = conversations.find(
        (convo) => convo.id === Number(id)
      );

      if (conversation) {
        getMessagesNotes(conversation);
      }
    }
  }, [id, conversations]);

  useEffect(() => {
    const filtered =
      tab === 0
        ? conversations.filter((convo) => convo.is_priority)
        : conversations.filter((convo) => !convo.is_priority);

    setFilteredConversations(filtered);
    setCurrentPage(1);
  }, [tab, conversations]);

  const paginatedConversations = (
    showArchivedConvos
      ? archivedConversations
      : showFavoriteConvos
      ? favoriteConversations
      : filteredConversations
  ).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleCheckboxChange = (id: number, isChecked: boolean) => {
    setSelectedConversations((prev) =>
      isChecked
        ? [...prev, id]
        : prev.filter((conversationId) => conversationId !== id)
    );
  };

  const handleSelectAllCheckbox = (isChecked: boolean) => {
    setSelectedConversations(() =>
      isChecked ? paginatedConversations.map((convo) => convo.id) : []
    );
  };

  const handleApiSuccessfull = () => {
    setSelectedConversations([]);
    getConversationList();
  };

  const handleToggleFavoriteConvo = async (id: number) => {
    try {
      const body = {
        conversationId: id,
      };
      const response = await toggleFavoriteCovoApi(body);
      if (response.status === 201) {
        getConversationList();
      }
    } catch (error) {
      console.log("error while marking the conversation as favorite: ", error);
    }
  };

  const updateConversationStats = (
    conversationId: number,
    updates: Partial<IConversation>
  ) => {
    setFilteredConversations((prevConversations) =>
      prevConversations.map((convo) =>
        convo.id === conversationId ? { ...convo, ...updates } : convo
      )
    );

    setConversations(prevConversations => 
      prevConversations.map((convo) =>
        convo.id === conversationId ? { ...convo, ...updates } : convo
      )
    );
  };

  const renderConversations = () => {
    return (
      <div className="flex flex-col w-full flex-1 overflow-y-auto overflow-x-hidden custom-dropdown">
        <div className="flex flex-col pb-1 w-full flex-1 relative">
          {loadingConversations ? (
            <>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999]">
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
              {paginatedConversations.length > 0
                ? paginatedConversations.map((conversation) => (
                    <Conversations
                      key={conversation.id}
                      {...{
                        conversation,
                        activeConversation,
                        getMessagesNotes,
                        handleCheckboxChange,
                        selectedConversations,
                        favoriteConversationIds,
                        handleToggleFavoriteConvo,
                        currentUserInfo,
                        updateConversationStats,
                      }}
                    />
                  ))
                : null}
            </>
          )}
        </div>
      </div>
    );
  };

  useLambdaEvent("NEW_MESSAGE", (event) => {
    try {
      const { conversationId } = event.data;
      
      // Debounce the updates to prevent multiple rapid requests
      const timeoutId = setTimeout(async () => {
        try {
          // If this conversation is currently active, refresh its messages
          if (id === String(conversationId)) {
            await getMessages(activeConversation);
          }
          
          // Refresh the conversations list
          await getConversationList();
        } catch (error) {
          console.error('Error refreshing data:', error);
        }
      }, 300); // 300ms debounce
      
      return () => clearTimeout(timeoutId);
      
    } catch (error) {
      console.error('Error processing new message event:', error);
    }
  });

  useEffect(() => {
    const handleNewMessage = (event: CustomEvent) => {
      const { conversationId } = event.detail;
      
      // If this conversation is currently active, refresh its messages
      if (id === String(conversationId)) {
        getMessages(activeConversation);
      }
      
      // Refresh the conversations list
      getConversationList();
    };

    window.addEventListener('newMessage', handleNewMessage as EventListener);
    
    return () => {
      window.removeEventListener('newMessage', handleNewMessage as EventListener);
    };
  }, [id, activeConversation, getMessages, getConversationList]);

  return (
    <React.Fragment>
      <div className="flex flex-1 overflow-hidden flex-col pt-4 bg-[#08090a] relative">
        <div className="flex flex-col justify-center px-3 w-full text-sm leading-none bg-[#08090a] border-b border-eerieBlack">
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

          <MsgListHeaderOptions
            {...{
              selectedConversations,
              handleApiSuccessfull,
              itemsPerPage,
              currentPage,
              setCurrentPage,
              total: showArchivedConvos
                ? archivedConversations.length
                : showFavoriteConvos
                ? favoriteConversations.length
                : filteredConversations.length,
              handleSelectAllCheckbox,
              paginatedConversations,
              tab,
              setTab,
              setShowArchivedConvos,
              setShowFavoriteConvos,
            }}
          />
        </div>

        {showArchivedConvos || showFavoriteConvos ? (
          <>{renderConversations()}</>
        ) : (
          <>
            <div className="flex flex-wrap gap-2 items-center px-4 py-4 w-full border-b border-eerieBlack">
              {headerTabs.map((headerTab) => {
                const { label, value } = headerTab;
                return (
                  <div
                    key={value}
                    onClick={() => {
                      setTab(value);
                      setCurrentPage(1);
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
            {renderConversations()}
          </>
        )}
      </div>
      <div className="flex-1">
        {id &&
          (thread ? (
            <FeedbackThread
              {...{
                conversation: activeConversation,
                messages,
                currentUserInfo,
                getConversationMessages,
              }}
            />
          ) : (
            activeConversation && (
              <div className="h-full animate-slide-in">
                <MessagesDetail
                  {...{
                    messages,
                    conversation: activeConversation,
                    loading,
                    getConversationMessages,
                  getNotes,
                  notes,
                  currentUserInfo,
                  onClose: () => {
                    setActiveConversation(null);
                  },
                  }}
                />
              </div>
            )
          ))}
      </div>
    </React.Fragment>
  );
};

export default MessagesList;
