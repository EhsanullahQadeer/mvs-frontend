import React from "react";
import Button from "../atoms/headerNavButton";

interface MessageInfoNotesTabMenuProps {
  headerTabs: { label: string; value: number }[]; 
  setTab: (value: number) => void;
  tab: number;
}

const MessageInfoNotesTabMenu: React.FC<MessageInfoNotesTabMenuProps> = ({ headerTabs, tab, setTab }) => {

  const handleButtonClick = (value: number) => {
    setTab(value);
  };

  return (
    <div className="border-2 border-[#1c1c1c] w-full p-2 rounded-3xl flex  items-center h-[59px]">
      {headerTabs.map((headerTab) => {
        return <Button
        key={headerTab.value}
        onClick={() => handleButtonClick(headerTab.value)}
          className={`flex items-center text-[12px] space-x-2 mx-1 
            ${headerTab.value === tab
              ? 'text-black bg-[#9dff00]'
              : 'text-dimGray bg-transparent hover:border-[#1c1c1c]'
            }`}
        >
          <span>{headerTab.label}</span> {/* Display the label */}
        </Button>
      })}
    </div>
  );
};

export default MessageInfoNotesTabMenu;