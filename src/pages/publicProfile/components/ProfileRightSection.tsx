import { useState } from "react";
import Posts from "./Posts";
import FanWall from "./FanWall";
import { IArtistProfileData, ICurrentUser } from "./types";

interface IProps {
  artistData: IArtistProfileData | null;
  currentUserInfo: ICurrentUser | null;
}

const ProfileRightSection = (props: IProps) => {
  const { artistData, currentUserInfo } = props;
  const [activeTab, setActiveTab] = useState("Posts");

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex w-full items-center">
        {["Posts", "Fanwall", "Library"].map((tab) => (
          <span
            key={tab}
            className={`cursor-pointer text-white flex items-center justify-center flex-1 py-5 ${
              activeTab === tab
                ? "font-semibold border-b-2 border-charcoalGray"
                : "border-b border-eerieBlack"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </span>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 py-5 flex flex-col overflow-hidden">
        <div className="flex-1 px-5 overflow-y-auto custom-dropdown">
          {activeTab === "Posts" && <Posts />}
          {activeTab === "Fanwall" && (
            <FanWall {...{ artistData, currentUserInfo }} />
          )}
          {activeTab === "Library" && <div>Library Content</div>}
        </div>
      </div>
    </div>
  );
};

export default ProfileRightSection;
