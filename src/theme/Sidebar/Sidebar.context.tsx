import { createContext, useContext } from "react";
import { useUnreadCount } from "./useUnreadCount";

type SidebarContextType = {
  unreadCount: number;
  refreshUnreadCount: () => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const { unreadCount, refreshUnreadCount } = useUnreadCount();

  return (
    <SidebarContext.Provider value={{ unreadCount, refreshUnreadCount }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}; 