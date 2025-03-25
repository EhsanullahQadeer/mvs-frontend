import React from "react";
import InboxTab from "../../../../../components/ui/Header/atoms/InboxTab";
import { useConversation } from "pages/Inbox/components/Directory/context";

interface InboxMessageTabListProps {
  unreadMessageCount: number[];
}

const InboxTabs: React.FC<InboxMessageTabListProps> = ({ unreadMessageCount }) => {
  const { 
    inboxTab, 
    handleInboxTabClick,
    setArchiveSpamFav,
    setSelectedConversations,
    setSelectedMenuItem
  } = useConversation();

  return (
    <div className="flex items-center w-full border-b border-eerieBlack">
      <InboxTab 
        tabName="Connections" 
        currentTab={inboxTab} 
        tabValue="connections" 
        unreadMessageCount={unreadMessageCount[0]} 
        color="bg-[#FF3B40]"
        onClick={() => {
          handleInboxTabClick("connections");
          setArchiveSpamFav("");
          setSelectedConversations([]);
          setSelectedMenuItem("")
        }}
      />      
      <InboxTab 
        tabName="Priority" 
        currentTab={inboxTab} 
        tabValue="priority" 
        unreadMessageCount={unreadMessageCount[0]} 
        color="bg-[#FF3B40]" 
        onClick={() => {
          handleInboxTabClick("priority");
          setArchiveSpamFav("");
          setSelectedConversations([]);
          setSelectedMenuItem("")
        }}
      />
      <InboxTab 
        tabName="General"
        currentTab={inboxTab} 
        tabValue="general" 
        unreadMessageCount={unreadMessageCount[1]}  
        color="bg-[#242424]" 
        onClick={() => {
          handleInboxTabClick("general");
          setArchiveSpamFav("");
          setSelectedConversations([]);
          setSelectedMenuItem("")
        }}
      />
      <InboxTab 
        tabName="Ice Breaker" 
        currentTab={inboxTab} 
        tabValue="icebreaker" 
        unreadMessageCount={unreadMessageCount[2]} 
        color="bg-[#0185FF]" 
        onClick={() => {
          handleInboxTabClick("icebreaker");
          setArchiveSpamFav("");
          setSelectedConversations([]);
          setSelectedMenuItem("")
        }}
        icon={
          <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 12.5H22M12 2.5V22.5M20 16.5L16 12.5L20 8.5M4 8.5L8 12.5L4 16.5M16 4.5L12 8.5L8 4.5M8 20.5L12 16.5L16 20.5" stroke="#B2B2B2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>        
        }
      />
    </div>
  );
};

export default InboxTabs;