import React from "react";
import Button from "../../../../../components/ui/Header/atoms/headerNavButton";

interface MessageInfoNotesTabMenuProps {
  tab: string;
  setter: (value: string) => void;
}

const ChatboxTabs: React.FC<MessageInfoNotesTabMenuProps> = ({ tab, setter }) => {

  const headerTabs = [
    { label: "Messages" },
    { label: "Info" },
    { label: "Notes" },
  ];

  const handleButtonClick = (value: string) => {
    setter(value);
  };

  return (
    <div className="border-2 border-[#1c1c1c] w-full p-2 rounded-3xl flex  items-center h-[59px]">
      {headerTabs.map((headerTab) => {
        return <Button
        key={headerTab.label}
        onClick={() => handleButtonClick(headerTab.label.toLowerCase())}
          className={`flex items-center text-[12px] space-x-2 mx-1 
            ${headerTab.label.toLowerCase() === tab
              ? 'text-black bg-[#9dff00]'
              : 'text-dimGray bg-transparent hover:border-[#1c1c1c]'
            }`}
        >
          <span>{headerTab.label}</span>
        </Button>
      })}
    </div>
  );
};

export default ChatboxTabs;