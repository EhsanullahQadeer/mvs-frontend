import { useState } from "react";
import Posts from "./Posts";
import FanWall from "./FanWall";
import { IArtistProfileData, ICurrentUser } from "./types";
import { IUserData } from "pages/profile/components/types";
import ProfileLibrary from "pages/profile/components/ProfileLibrary";

interface IProps {
  artistData: IArtistProfileData | IUserData | null;
  currentUserInfo: ICurrentUser | null;
  isLoginUser: boolean,
  user: any,
  tabs: any[],
  hasSampleType: any,
  connectionDetail?: any,
  selectedTab: string,
  setSelectedTab: (tab: string) => void,
  isConnect: boolean,
  chatOpen: boolean,
  setChatOpen: (open: boolean) => void,
  isPublicProfile: boolean,
}

const ProfileRightSection = (props: IProps) => {
  const 
  { artistData,
    currentUserInfo,
    isLoginUser,
    user,
    tabs,
    hasSampleType,
    connectionDetail,
    selectedTab,
    setSelectedTab,
    isConnect,
    chatOpen,
    setChatOpen,
    isPublicProfile,
  } = props;
  const [activeTab, setActiveTab] = useState(isPublicProfile ? "Posts" : "Library");

  const publicTabs = [
    {
      label: "Posts",
      component: <Posts isPublicProfile={isPublicProfile} />,
    },
    {
      label: "Fanwall",
      component: <FanWall {...{ artistData, currentUserInfo }} />,
    },
    {
      label: "Gallery",
      component: <div>Gallery Content</div>,
    },
  ];

  const normalTabs = [
    {
      label: "Library",
      component: <ProfileLibrary {...{ artistData, currentUserInfo, isLoginUser, user, tabs, hasSampleType, connectionDetail, selectedTab, setSelectedTab, isConnect, chatOpen, setChatOpen }} />
    },
    // {
    //   label: "Posts",
    //   component: <Posts isPublicProfile={isPublicProfile} />
    // },
    // {
    //   label: "Gallery",
    //   component: <div>Gallery Content</div>
    // },
    {
      label: "Fanwall",
      component: <FanWall {...{ artistData, currentUserInfo }} />
    }
  ];

  const topTabs = isPublicProfile ? publicTabs : normalTabs;

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex w-full items-center">
        {topTabs.map((tab) => (
          <span
            key={tab.label}
            className={`cursor-pointer text-white flex items-center justify-center flex-1 py-5 ${
              activeTab === tab.label
                ? "font-semibold border-b-2 border-charcoalGray"
                : "border-b border-eerieBlack"
            }`}
            onClick={() => setActiveTab(tab.label)}
          >
            {tab.label}
          </span>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 py-5 flex flex-col overflow-hidden">
        <div className="flex-1 md:px-5 overflow-y-auto custom-dropdown">
          {topTabs.find((tab) => tab.label === activeTab)?.component}
        </div>
      </div>
    </div>
  );
};

export default ProfileRightSection;
