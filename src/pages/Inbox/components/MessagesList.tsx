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
import React from "react";
import { IConversation } from "./types";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MessagesDetail from "./MessagesDetail";
import FeedbackThread from "./FeedbackThread";
import { Conversations } from "./Conversations";
import { CircularProgress } from "@mui/material";
import useMessageList from "../hooks/useMessageList";
import MsgListHeaderOptions from "./MsgListHeaderOptions";
import searchIcon from "../../../assets/icons/searchIcon.svg";
import useGetMessagesNotes from "../hooks/useGetMessagesNotes";
import { toggleFavoriteCovoApi } from "api/messenger";
import { useNotification } from "services/WebSocket/useNotification.hook";
import NoMessagesYetPrompt from "components/ui/Header/molecules/noMessagesYet";
import InboxMessageTabList from "components/ui/Header/molecules/inboxMessageTabList";

const MessagesList = () => {
  const { id, thread } = useParams();
  const user = useSelector((state: RootState) => state);
  const currentUserInfo = user.auth.user;

  const [tab, setTab] = useState(1);
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
    localMessages,
    notes,
    loading,
    getConversationMessages,
    getNotes,
    getMessagesNotes,
    setLocalMessages,
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

    if (conversationId === Number(id)) {
      setConversations(prevConversations => 
        prevConversations.map((convo) =>
          convo.id === conversationId ? { ...convo, ...updates } : convo
        )
      );
    }
  };

  const renderConversations = () => {
    return (
      <div className="flex flex-col h-full">
          {loadingConversations ? (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999]">
              <CircularProgress
                sx={{
                  width: "50px !important",
                  height: "50px !important",
                  color: "#9EFF00",
                }}
              />
            </div>
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
                  )) : (
                  <div className="flex items-center justify-center h-full">
                    <NoMessagesYetPrompt></NoMessagesYetPrompt>
                  </div>
              )}
            </>
          )}
      </div>
    );
  };

  useNotification("NEW_MESSAGE", (event) => {
    console.log('[debug] Received NEW_MESSAGE event:', event);
    try {
      const { conversationId, sender, message, timestamp } = event.data;
      console.log('[debug] Extracted event data:', { conversationId, sender, message, timestamp });
      
      const timeoutId = setTimeout(async () => {
        console.log('[debug] Starting timeout handler');
        try {
          if (id === String(conversationId)) {
            console.log('[debug] Conversation ID matches current ID');
            const newMessage = {
              conversation_id: conversationId,
              Timestamp: timestamp || new Date().toISOString(),
              message_content: message,
              sender_id: sender
            };
            console.log('[debug] Created new message object:', newMessage);
            setLocalMessages((prevMessages) => {
              console.log('[debug] Previous messages:', prevMessages);
              return [...prevMessages, newMessage];
            });
            // await getMessages(conversationId);
          }
          
          const conversation = conversations.find(c => c.id === Number(conversationId));
          console.log('[debug] Found conversation:', conversation);
          
          if (conversation) {
            console.log('[debug] Processing conversation update');
            // If current user is the recipient, increment their unread count
            const isUserA = currentUserInfo.id === conversation.user_a.id;
            console.log('[debug] Is user A:', isUserA);
            
            const unreadCountUpdate = sender !== currentUserInfo.id ? {
              [isUserA ? 'unread_count_a' : 'unread_count_b']: 
                (isUserA ? conversation.unread_count_a : conversation.unread_count_b) + 1
            } : {};
            console.log('[debug] Unread count update:', unreadCountUpdate);

            updateConversationStats(Number(conversationId), {
              last_message_summary: event.data.message,
              ...unreadCountUpdate
            });
            console.log('[debug] Updated conversation stats');
          }
          
        } catch (error) {
          console.error('[debug] Error refreshing data:', error);
        }
      }, 300);
      
      return () => {
        console.log('[debug] Clearing timeout');
        clearTimeout(timeoutId);
      }
      
    } catch (error) {
      console.error('[debug] Error processing new message event:', error);
    }
  });

  return (
    <React.Fragment>
      <div className="flex flex-1 overflow-hidden flex-col pt-4 bg-[#08090a] relative">
        <div className="flex flex-col justify-center px-3 w-full text-sm leading-none bg-[#08090a]">
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
              setActiveConversation,
            }}
          />
        </div>

        {showArchivedConvos || showFavoriteConvos ? (
          <>{renderConversations()}</>
        ) : (
          <>
          {/* TODO: Remove hard coded values on unreadMessageCount values and replace with api call returned values */}
          <InboxMessageTabList setTab={setTab} tab={tab} unreadMessageCount={[999, 3, 15]}></InboxMessageTabList>
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
                messages: localMessages,
                currentUserInfo,
                getConversationMessages,
              }}
            />
          ) : (
            activeConversation && (
              <div className="h-full animate-slide-in">
                <MessagesDetail
                  {...{
                    messages: localMessages,
                    conversation: activeConversation,
                    loading: false,
                    getConversationMessages,
                  getNotes,
                  notes,
                  userInfo: currentUserInfo.id === activeConversation.user_a?.id ? activeConversation.user_b : activeConversation.user_a,
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
