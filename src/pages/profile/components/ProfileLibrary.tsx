// Local Imports
import LockedContent from "./LockedContent";
import UploadFileSection from "./UploadFileSection";
import SamplesContainer from "components/SampleContainer/player-container";
import { useEffect } from "react";

type Props = {
  isLoginUser: boolean,
  user: any,
  tabs: any[],
  hasSampleType: any,
  connectionDetail: any,
  selectedTab: string,
  setSelectedTab: (tab: string) => void,
  isConnect: boolean | undefined | "pending",
  artistData: any,
  chatOpen: boolean,
  setChatOpen: (open: boolean) => void,
};
const ProfileLibrary = (props: Props) => {
  const { isLoginUser, user, tabs, hasSampleType, selectedTab, setSelectedTab, isConnect, artistData, chatOpen } = props;

  // Add useEffect to select the first visible tab when component mounts or tabs/hasSampleType changes
  useEffect(() => {
    const visibleTabs = tabs.filter(t => hasSampleType[t.value]);
    if (visibleTabs.length > 0 && !selectedTab) {
      setSelectedTab(visibleTabs[0].value);
    }
  }, [tabs, hasSampleType, selectedTab, setSelectedTab]);

  console.log('IsConnect var: ', isConnect);
  return (
    <section className="flex-1 md:min-w-[780px] flex flex-col overflow-x-hidden overflow-y-auto custom-dropdown">
      {isLoginUser && <UploadFileSection {...{ user }} />}

      <div className={`text-coolGray flex flex-col py-3 mb-2 px-4 `}>
        <h2 className="text-gainsBoro md:block hidden mb-3 font-bold">Library</h2>
        <div className="flex justify-between items-center">
          <div className="flex">
            {tabs.map((tab) => {
              if (!hasSampleType[tab.value]) return null;

              // Get array of visible tabs
              const visibleTabs = tabs.filter(t => hasSampleType[t.value]);
              const isFirst = visibleTabs[0].value === tab.value;
              const isLast = visibleTabs[visibleTabs.length - 1].value === tab.value;

              return (
                <button
                  key={tab.value}
                  onClick={() => setSelectedTab(tab.value)}
                  className={`md:py-2 md:px-3 px-2 py-1 text-[10px] md:text-sm flex items-center justify-center border border-eclipseGray ${selectedTab === tab.value
                    ? "text-softGray bg-eerieBlack"
                    : "text-charcoalGray bg-darkGray"
                    } ${isFirst && "rounded-l-md border-r-0"} ${isLast && "rounded-r-md border-l-0"
                    } transition duration-300`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="relative flex-1 flex flex-col">
        <div
          className="relative flex-1 flex flex-col"
          style={{ filter: isConnect !== true ? "blur(3px)" : "none" }}
        >

          {isConnect !== true && (
            <div className="absolute w-full h-full z-10 bg-[#101010] opacity-30"></div>
          )}

          {/* <MusicTable /> */}
          <div className="relative">
            <SamplesContainer
              user_id={artistData?.id}
              selectedTab={selectedTab}
              chatOpen={chatOpen}
              isConnect={isConnect}
              isLoginUser={isLoginUser}
            />
          </div>
        </div>
        {/* {isConnect !== true && (
          <LockedContent />
        )} */}
      </div>
    </section>
  );
};

export default ProfileLibrary;


