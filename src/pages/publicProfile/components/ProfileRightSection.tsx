import FanWall from "./FanWall";
import { useState } from "react";
import { IArtistProfileData, ICurrentUser } from "./types";
import { IUserData } from "pages/profile/components/types";
import LockedContent from "pages/profile/components/LockedContent";
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
  // const [activeTab, setActiveTab] = useState(isPublicProfile ? "Posts" : "Library");
  const [activeTab, setActiveTab] = useState("Fanwall");

  const fanwallKey = `fanwall-${JSON.stringify(artistData?.id)}`;

  const publicTabs = [
    // {
    //   label: "Posts",
    //   component: <Posts isPublicProfile={isPublicProfile} />,
    // },
    {
      label: "Fanwall",
      component: <FanWall key={fanwallKey} {...{ artistData, currentUserInfo }} />,
    },
    // {
    //   label: "Gallery",
    //   component: <div>Gallery Content</div>,
    // },
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
      component: <FanWall key={fanwallKey} {...{ artistData, currentUserInfo }} />
    }
  ];

  const topTabs = isPublicProfile ? publicTabs : normalTabs;

  return (
    <div id="profile-right-section" className="h-screen w-full flex flex-col overflow-hidden relative">
      <div className="flex items-center">
        {topTabs.map((tab) => (
          <span
            key={tab.label}
            className={` text-white flex items-center justify-center flex-1 py-5 ${activeTab === tab.label
                ? "font-semibold border-b-2 border-[#1c1c1c]"
                : "border-b border-eerieBlack"
              }`}
            onClick={() => setActiveTab(tab.label)}
          >
            {tab.label}
          </span>
        ))}
      </div>

      {/* Tab Content */}
      <div className=" pt-5 flex flex-col ">
        <div className="flex-1 px-5 overflow-y-auto custom-dropdown">
          {topTabs.find((tab) => tab.label === activeTab)?.component}
        </div>
      </div>

      {!isConnect && !isLoginUser && activeTab === "Library" && (
        <div><LockedContent/></div>
      )}
    </div>
  );
};

export default ProfileRightSection;
