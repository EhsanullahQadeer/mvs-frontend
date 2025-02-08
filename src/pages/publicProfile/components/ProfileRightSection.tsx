import { useState } from "react";
import Posts from "./Posts";

const ProfileRightSection = () => {
  const [activeTab, setActiveTab] = useState("Posts");

  return (
    <div className="w-full">
      <div className="flex w-full   items-center    border-b border-eerieBlack ">
        {["Posts", "Fanwall", "Library"].map((tab) => (
          <span
            key={tab}
            className={`cursor-pointer text-white flex items-center justify-center flex-1  py-5 px-7 ${
              activeTab === tab
                ? "font-semibold  border-b border-charcoalGray"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </span>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-5">
        {activeTab === "Posts" && <Posts/> }
        {activeTab === "Fanwall" && <div>Fanwall Content</div>}
        {activeTab === "Library" && <div>Library Content</div>}
      </div>
    </div>
  );
};

export default ProfileRightSection;
