// Local Imports
import UploadFileSection from "./UploadFileSection";
import searchIcon from "assets/icons/searchIcon.svg";
import SamplesContainer from "components/SampleContainer/player-container";
import ProfileRightSection from "../../publicProfile/components/ProfileRightSection";
type Props = {
  isLoginUser: boolean,
  user: any,
  tabs: any[],
  hasSampleType: any,
  selectedTab: string,
  setSelectedTab: (tab: string) => void,
  isConnect: boolean,
  artistData: any,
  chatOpen: boolean,
  setChatOpen: (open: boolean) => void,
};
const ProfileLibrary = (props: Props) => {
  const { isLoginUser, user, tabs, hasSampleType, selectedTab, setSelectedTab, isConnect, artistData, chatOpen, setChatOpen } = props;

  return (
    <section className="flex-1 min-w-[780px] flex flex-col overflow-x-hidden overflow-y-auto custom-dropdown">
      {isLoginUser && <UploadFileSection {...{ user }} />}

      <div className={`text-coolGray flex flex-col py-3 mb-2 px-4 `}>
        <h2 className="text-gainsBoro mb-3 font-bold">Library</h2>
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
                  className={`py-2 px-3 text-sm flex items-center justify-center border border-eclipseGray ${selectedTab === tab.value
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

      <div
        className="relative flex-1 flex flex-col"
        style={{ filter: !isConnect ? "blur(5px)" : "none" }}
      >
        {!isConnect && (
          <div className="absolute w-full h-full z-10 bg-[#101010] opacity-30"></div>
        )}

        {/* <MusicTable /> */}
        <div className="relative">
          <SamplesContainer
            user_id={artistData?.id}
            selectedTab={selectedTab}
            chatOpen={chatOpen}
          />
        </div>
      </div>
    </section>
  );
};

export default ProfileLibrary;


