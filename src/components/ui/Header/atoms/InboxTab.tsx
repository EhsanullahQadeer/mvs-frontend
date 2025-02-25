import React from 'react';

interface InboxTabProps {
  tabName: string;
  icon?: React.ReactNode; // Optional icon prop
  currentTabIndex: number;
  tabIndex: number;
  onClick: () => void;
}

const InboxTab: React.FC<InboxTabProps> = ({ tabName, icon, currentTabIndex, onClick, tabIndex }) => {
  return (
    <div className={`bg-[#08090a] cursor-pointer h-[59px] w-[200px] flex items-center justify-center ${currentTabIndex === tabIndex ? 'text-white border-b-2 border-[#3D3D3D]' : 'text-[#666666] border-b-2 border-transparent hover:border-b-2 hover:border-[#5e5e5e]'}`}
    onClick={onClick}>
      {icon && <span className="mr-2">{icon}</span>} {/* Render icon if provided */}
      <span>{tabName}</span>
    </div>
  );
};

export default InboxTab;