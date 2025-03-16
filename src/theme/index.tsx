/*************************************************************************
 * @file index.tsx
 * @author End Quote
 * @desc Layout for the application.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* LOCAL IMPORTS */
import Sidebar from "./Sidebar";
import { useState } from "react";
import { MessengerProvider } from "api/messenger/context";
import NavHeader from "components/ui/Header/organisms/navHeader";

interface ThemeProps {
  isOverflowHidden?: boolean;
  children?: React.ReactNode;
}

const Theme = (props: ThemeProps) => {
  // size in pixels but should be changed to rems/vw once we refactor the design
  const sidebarWidth = "80px"; // when not expanded
  const largeSidebarWidth = "250px";
  const headerHeight = "80px";
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <MessengerProvider>
    <div className="flex flex-col h-screen bg-[#08090A]">
      {/* Header Row - stays fixed */}
      <div className="flex h-[80px] border-b-2 border-[#1F1F1F]">
        {/* M Logo */}
        <div
          className="w-[80px] border-r-2 border-[#1F1F1F] flex items-center justify-center"
          onClick={() => (window.location.href = "/home")}
          style={{ cursor: "pointer" }}
        >
          <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.872337 0.454545H5.22603L8.91921 9.46023H9.08967L12.7828 0.454545H17.1365V15H13.7132V6.06534H13.5925L10.0982 14.9077H7.91069L4.41637 6.01562H4.29563V15H0.872337V0.454545Z"
              fill="#9EFF00"
            />
          </svg>
        </div>

        {/* Nav Header */}
        <div className="flex-1 flex items-center pl-[20px]">
          <NavHeader name="navHeader" id="1" username="someUsername" email="test@test.com" />
        </div>
      </div>

      {/* Content Row - adjusts with sidebar */}
      <div className="flex-1 grid overflow-hidden"
        style={{
          gridTemplateColumns: `${isExpanded ? largeSidebarWidth : sidebarWidth} 1fr`,
          transition: 'grid-template-columns 0.15s ease-in-out'
        }}>
        
        {/* Sidebar */}
        <div className="overflow-y-auto custom-dropdown border-r-2 border-[#1F1F1F]">
          <Sidebar
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            sidebarWidth={sidebarWidth}
            headerHeight={headerHeight} />
        </div>

        {/* Main content */}
        <div className={`flex flex-col scrollbar-hidden ${
          props.isOverflowHidden ? "overflow-hidden" : "overflow-auto"
        }`}>
          {props.children}
        </div>
      </div>
    </div>
    </MessengerProvider>
  );
};

export default Theme;
