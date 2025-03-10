/*************************************************************************
 * @file index.tsx
 * @author Zohaib Ahmed
 * @desc Provides sidebar navigation for the application.
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* IMPORTS */
import * as React from "react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useHeaderHooks } from "theme/Header/Header.hooks";
import { useGetTotalConversationUnread } from "api/messenger/hooks/useGetTotalConversationUnread";
import { useMessenger } from "api/messenger/context";
import { useNotification } from "services/WebSocket/useNotification.hook";
import { SidebarProvider, useSidebar } from './Sidebar.context';
import "./styles/sidebar.css";

// Import buttons
import DashboardButton from "./buttons/dashboard";
import LinesButton from "./buttons/lines";
import CollectionsButton from "./buttons/collections";
import DMButton from "./buttons/dm";
import HomeButton from "./buttons/home";
import LibraryButton from "./buttons/library";
import LicenseButton from "./buttons/license";

interface SidebarProps {
  isExpanded: boolean;
  setIsExpanded: (isExpanded: boolean) => void;
  sidebarWidth: string;
  headerHeight: string;
}

const SidebarContent = ({ isExpanded, setIsExpanded, sidebarWidth, headerHeight }: SidebarProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  /* States and Hooks (copied from Header.tsx) */
  const {
    state,
    contact_us,
    setContactUs,
    user_settings,
    setUserSettings,
    onboardGuide,
    LogOut,
  } = useHeaderHooks();

  const {
    totalPriorityInboxUnread,
    totalGeneralInboxUnread,
    totalIcebreakerInboxUnread,
  } = useMessenger();
  
  const { unreadCount, refreshUnreadCount } = useSidebar();
  const iconColor = "#666666";
  const textHoverIconColor = "#0F0F0F";
  const selectedButtonColor = "#9EFF00";

  useEffect(() => {
    console.log("useEffect in sidebar");
    refreshUnreadCount();
  }, []);

  useEffect(() => {
    console.log("unreadCount", unreadCount);
  }, [unreadCount]);

  useNotification("NEW_MESSAGE", () => {
    console.log("NEW_MESSAGE from sidebar");
    refreshUnreadCount();
  });

  return (
      <div 
        className="sidebar py-[12px] px-[12px] bg-[#08090A] overflow-y-auto z-[1000] relative"
        style={{
          height: `calc(100vh - ${headerHeight})`,
          overflowX: 'hidden',
        }}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div className="flex-grow overflow-hidden transition-all duration-300">
          {/* Main Sidebar Icons */}
          <div className="flex-grow">

          <LinesButton
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            sidebarWidth={sidebarWidth} 
            headerHeight={headerHeight}
            iconColor={iconColor}
            textHoverIconColor={textHoverIconColor}
            selectedButtonColor={selectedButtonColor}
          />

          <HomeButton
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            sidebarWidth={sidebarWidth} 
            headerHeight={headerHeight}
            iconColor={iconColor}
            textHoverIconColor={textHoverIconColor}
            selectedButtonColor={selectedButtonColor}
          />

          <DashboardButton 
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            sidebarWidth={sidebarWidth} 
            headerHeight={headerHeight}
            iconColor={iconColor}
            textHoverIconColor={textHoverIconColor}
            selectedButtonColor={selectedButtonColor}
          />

          <DMButton
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            sidebarWidth={sidebarWidth} 
            headerHeight={headerHeight}
            iconColor={iconColor}
            textHoverIconColor={textHoverIconColor}
            unreadCount={unreadCount}
            selectedButtonColor={selectedButtonColor}
          />

          <LicenseButton
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            sidebarWidth={sidebarWidth} 
            headerHeight={headerHeight}
            iconColor={iconColor}
            textHoverIconColor={textHoverIconColor}
            selectedButtonColor={selectedButtonColor}
          />          

          <div className="h-[1px] bg-[#333333] mt-[6px] mb-[6px]"></div>
          

          <LibraryButton
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            sidebarWidth={sidebarWidth} 
            headerHeight={headerHeight}
            iconColor={iconColor}
            textHoverIconColor={textHoverIconColor}
            selectedButtonColor={selectedButtonColor}
          />

          <CollectionsButton
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            sidebarWidth={sidebarWidth} 
            headerHeight={headerHeight}
            iconColor={iconColor}
            textHoverIconColor={textHoverIconColor}
            selectedButtonColor={selectedButtonColor}
          />
          </div >
        </div>
      </div>
  );
};

const Sidebar = (props: SidebarProps) => {
  return (
    <SidebarProvider>
      <SidebarContent {...props} />
    </SidebarProvider>
  );
};

export default Sidebar;
