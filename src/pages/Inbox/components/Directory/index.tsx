/* eslint-disable @typescript-eslint/no-unused-vars */

/* IMPORTS */
import Chatbox from "../Chatbox";
import React, { useEffect } from "react";
import { useConversation } from "./context";
import InboxHeader from "./components/header";
import { CircularProgress } from "@mui/material";
import { useMessenger } from "api/messenger/context";
import { ChatboxProvider } from "../Chatbox/context";
import { Conversation } from "./components/conversation";
import InboxTab from "components/ui/Header/atoms/InboxTab";
import searchIcon from "../../../../assets/icons/searchIcon.svg";
import { IConversation } from "api/messenger/objects/states.types";
import NoMessagesYet from "pages/Inbox/components/Directory/templates/noMessagesYet";
import { ReactComponent as SnowflakeIcon } from "../../../../assets/icons/snowflakeIcon.svg";

const InboxDirectory = () => {
  const {
    loadingConversations,
    conversations,
    searchMessages,
    setSearchMessages,
    getTotalConversationUnread,
    totalPriorityInboxUnread,
    totalGeneralInboxUnread,
    totalIcebreakerInboxUnread,
  } = useMessenger();

  const {
    inboxTab,
    setInboxTab,
    activeConversation,
    setActiveConversation,
    handleConversationSelect,
    loadConversations,
    searchTerm,
    setSearchTerm,
    handleInboxTabClick,
    setArchiveSpamFav,
    setSelectedConversations,
    setSelectedMenuItem,
  } = useConversation();

  const initialize = () => {
    loadConversations();
    getTotalConversationUnread({
      types: ["priority", "general", "icebreaker"]
    });
  };

  useEffect(() => {
    initialize();
  }, [inboxTab, loadConversations]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === ""){
      handleClearSearch();
    }
    else {
      setSearchTerm(value);
      setInboxTab("search");
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setSearchMessages([]);
    setInboxTab('priority');
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
            {conversations.length > 0
              ? conversations.map((conversation) => (
                <Conversation
                  key={conversation.conversation_id}
                  conversation={conversation as IConversation}
                  onClick={() => handleConversationSelect(conversation as IConversation)}
                />
              )) : (
                <div className="flex items-center justify-center h-full">
                  <NoMessagesYet />
                </div>
              )}
          </>
        )}
      </div>
    );
  };

  const renderSearchConversations = () => {
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
            {searchTerm && searchMessages && searchMessages.length > 0 ? (
              searchMessages.map((conversation) => (
                <Conversation
                  key={conversation.id + "search"}
                  conversation={conversation.conversation as IConversation}
                  onClick={() => handleConversationSelect(conversation.conversation as IConversation)}
                  searchTerm={searchTerm}
                  sender={conversation.sender}
                  searchContent={conversation.content}
                  searchCreatedAt={conversation.created_at}
                />
              ))
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-400">
                  {searchTerm ? "No search results found" : "Enter a search term"}
                </p>
              </div>
            )} 
          </>
        )}
      </div>
    );
  };

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
                <div className="flex-1 shrink gap-2.5 self-stretch my-auto relative">
                  <input
                    style={{ boxShadow: "none" }}
                    type="text"
                    className="rounded-full outline-none bg-transparent border-none w-full py-2.5 text-sm font-normal text-[#989898]"
                    placeholder="Search"
                    onChange={handleSearch}
                    value={searchTerm || ""}
                  />
                  {searchTerm && (
                    <button 
                      onClick={handleClearSearch}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer"
                      aria-label="Clear search"
                    >
                      <span className="text-[#989898]">x</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <InboxHeader />
        </div>
        <div className="scrollbar-hidden flex-1 overflow-y-auto">
          <div className="bg-[#08090a] sticky top-0">
            {!searchTerm && (
              <div className="flex items-center w-full border-b border-eerieBlack">
                <InboxTab tabName="Connections" currentTab={inboxTab} tabValue="connections" onClick={() => {
                  handleInboxTabClick("connections");
                  setArchiveSpamFav("");
                  setSelectedConversations([]);
                  setSelectedMenuItem("")
                }} unreadMessageCount={totalPriorityInboxUnread} color="bg-[#FF3B40]" classname="w-[200px]"/>
                <InboxTab tabName="Priority" currentTab={inboxTab} tabValue="priority" onClick={() => {
                  handleInboxTabClick("priority");
                  setArchiveSpamFav("");
                  setSelectedConversations([]);
                  setSelectedMenuItem("")
                }} unreadMessageCount={totalPriorityInboxUnread} color="bg-[#FF3B40]" classname="w-[200px]"/>
                <InboxTab tabName="General" currentTab={inboxTab} tabValue="general" onClick={() => {
                  handleInboxTabClick("general");
                  setArchiveSpamFav("");
                  setSelectedConversations([]);
                  setSelectedMenuItem("")
                }} unreadMessageCount={totalGeneralInboxUnread} color="bg-[#242424]" classname="w-[200px]"/>
                <InboxTab tabName="Ice Breaker" currentTab={inboxTab} tabValue="icebreaker" onClick={() => {
                  handleInboxTabClick("icebreaker");
                  setArchiveSpamFav("");
                  setSelectedConversations([]);
                  setSelectedMenuItem("")
                }} unreadMessageCount={totalIcebreakerInboxUnread} color="bg-[#0185FF]" icon={<SnowflakeIcon/>} classname="w-[200px]"/>
              </div>
            )}
            {inboxTab === "search" && searchTerm ? (
              <div className={`bg-[#08090a] cursor-pointer h-[59px] w-[200px] flex items-center justify-center text-white border-b-2 border-[#3D3D3D]`}>
                  Search Results
              </div>
              
            ) : null}
            </div>
          <div className="">
            {loadingConversations ? (
              <div className="flex items-center justify-center h-full">
                <CircularProgress sx={{ color: "#9EFF00" }} />
              </div>
            ) : (
              inboxTab === "search" ? renderSearchConversations() : renderConversations()
            )}
          </div>
        </div>
      </div>

      {activeConversation && (
        <div className="flex-1 h-full flex flex-col">
          <div className="flex-1 h-full animate-slide-in">
            <ChatboxProvider>
              <Chatbox onClose={() => setActiveConversation(null)} />
            </ChatboxProvider>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default InboxDirectory;