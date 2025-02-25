import React from "react";
import InboxTab from "../atoms/InboxTab";

interface InboxMessageTabListProps {
  // You can define an array of menu items with names and click actions
  setTab: any;
  tab: any;
}

const InboxMessageTabList: React.FC<InboxMessageTabListProps> = ({tab, setTab}) => {
  const handleTabClick = (value: number) => {
    setTab(value); // Set the current tab to the clicked tab name
  };

  return (
    <div className="flex items-center w-full border-b border-eerieBlack">
      <InboxTab tabName={"Priority"} currentTabIndex={tab} tabIndex={0} onClick={() => handleTabClick(0)}></InboxTab>
      <InboxTab tabName={"General"} currentTabIndex={tab} tabIndex={1} onClick={() => handleTabClick(1)}></InboxTab>
      <InboxTab tabName={"Ice Breaker"} currentTabIndex={tab} tabIndex={2} onClick={() => handleTabClick(2)} icon={
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 12.5H22M12 2.5V22.5M20 16.5L16 12.5L20 8.5M4 8.5L8 12.5L4 16.5M16 4.5L12 8.5L8 4.5M8 20.5L12 16.5L16 20.5" stroke="#B2B2B2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>        
      }></InboxTab>
      </div>
  );
};

export default InboxMessageTabList;