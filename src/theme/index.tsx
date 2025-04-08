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
import { ReactComponent as MLogo } from "../assets/icons/MLogo.svg";
import MobileTheme from "./MobileTheme";

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
      <div className="flex flex-col h-screen w-full bg-[#08090A]">
        {/* Header Row - stays fixed */}
        <div className="md:flex hidden h-[80px] border-b-2 border-[#1F1F1F]">
          {/* M Logo */}
          <div
            className="w-[80px] border-r-2 border-[#1F1F1F] flex items-center justify-center"
            onClick={() => (window.location.href = "/home")}
            style={{ cursor: "pointer" }}
          >
            <MLogo />
          </div>

          {/* Nav Header */}
          <div className="flex-1 flex items-center pl-[20px]">
            <NavHeader
              name="navHeader"
              id="1"
              username="someUsername"
              email="test@test.com"
            />
          </div>
        </div>

        {/* Content Row - adjusts with sidebar */}
        <div
          className="md:grid md:flex-1 md:overflow-hidden"
          style={{
            gridTemplateColumns: `${
              isExpanded ? largeSidebarWidth : sidebarWidth
            } 1fr`,
            transition: "grid-template-columns 0.15s ease-in-out",
          }}
        >
          {/* Sidebar */}
          <div className="overflow-y-auto hidden md:flex custom-dropdown border-r-2 border-[#1F1F1F]">
            <Sidebar
              isExpanded={isExpanded}
              setIsExpanded={setIsExpanded}
              sidebarWidth={sidebarWidth}
              headerHeight={headerHeight}
            />
          </div>

          {/* for mobile */}
          <MobileTheme />

          {/* Main content */}
          <div
            className={`flex flex-col scrollbar-hidden max-md:mt-[71px] max-md:mb-[85px] ${
              props.isOverflowHidden ? "overflow-hidden" : "overflow-auto"
            }`}
          >
            {props.children}
          </div>
        </div>
      </div>
    </MessengerProvider>
  );
};

export default Theme;
