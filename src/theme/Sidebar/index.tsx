/*************************************************************************
 * @file index.tsx
 * @author Zohaib Ahmed
 * @desc Provides sidebar navigation for the application.
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* IMPORTS */
import "./styles/sidebar.css";
import { useEffect } from "react";
import { SidebarProvider, useSidebar } from './Sidebar.context';
import { useNotification } from "services/WebSocket/useNotification.hook";

// Import buttons
import DMButton from "./buttons/dm";
import HomeButton from "./buttons/home";
import LinesButton from "./buttons/lines";
import LibraryButton from "./buttons/library";
import LicenseButton from "./buttons/license";
import DashboardButton from "./buttons/dashboard";
import CollectionsButton from "./buttons/collections";
import ProfileButton from "./buttons/profile";

interface SidebarProps {
  isExpanded: boolean;
  setIsExpanded: (isExpanded: boolean) => void;
  sidebarWidth: string;
  headerHeight: string;
}

const SidebarContent = ({ isExpanded, setIsExpanded, sidebarWidth, headerHeight }: SidebarProps) => {
  /* States and Hooks (copied from Header.tsx) */
  
  const { unreadCount, refreshUnreadCount } = useSidebar();
  const iconColor = "#666666";
  const textHoverIconColor = "#0F0F0F";
  const selectedButtonColor = "#9EFF00";

  useEffect(() => {
    //console.log("useEffect in sidebar");
    refreshUnreadCount();
  }, []);

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

          <ProfileButton
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
