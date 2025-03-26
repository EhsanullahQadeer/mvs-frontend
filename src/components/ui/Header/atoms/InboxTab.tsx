import React from 'react';
import MessageCountBubble from './inboxMessageCountBubble';

interface InboxTabProps {
  tabName: string;
  icon?: React.ReactNode; // Optional icon prop
  currentTab: string;
  tabValue: string;
  onClick: () => void;
  unreadMessageCount?: number;
  color?: string;
  classname?: string;
}

const InboxTab: React.FC<InboxTabProps> = ({ tabName, icon, currentTab, tabValue, onClick, classname, unreadMessageCount, color }) => {
  const isActive = currentTab === tabValue;
  
  return (
    <div className={`bg-[#08090a] cursor-pointer h-[59px] ${classname} flex items-center justify-center ${
      isActive 
        ? 'text-white border-b-2 border-[#3D3D3D]' 
        : 'text-[#666666] border-b-2 border-transparent hover:border-b-2 hover:border-[#5e5e5e]'
    }`}
    onClick={onClick}>
      {icon && <span className="mr-2">{icon}</span>} {/* Render icon if provided */}
      <span>{tabName}</span>
      {unreadMessageCount > 0 && (
        <MessageCountBubble unreadMessages={unreadMessageCount} color={color} isSelected={isActive}/>
      )}
    </div>
  );
};

export default InboxTab;