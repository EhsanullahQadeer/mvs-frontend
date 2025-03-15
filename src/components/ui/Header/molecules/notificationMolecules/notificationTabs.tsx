import NotificationCountBubble from "../../atoms/notificationAtoms/notificationCountBubble";

const NotificationManagerTab = ({ tabName, selectedTab, handleTabClick, unreadNotifCount }: { tabName: string, selectedTab: string, handleTabClick: any, unreadNotifCount: number }) => {
  const lowercaseTabName = tabName.toLowerCase();

  return (
    <div
      className={`flex items-center text-[14px] font-normal cursor-pointer px-[10px] py-[11px] 
        ${selectedTab === lowercaseTabName ? 
          'text-white border-b-2 border-dimGray' : 
          'text-[#666666] border-b-2 border-transparent hover:border-[#3D3D3D]'}`}
      onClick={() => handleTabClick(lowercaseTabName)}
    >
      {tabName}
      {unreadNotifCount > 0 && 
      <div >
        <NotificationCountBubble unreadNotifications={unreadNotifCount} />
      </div>
      }
    </div>
  );
};

export default NotificationManagerTab;