/*************************************************************************
 * @file ArtistProfile.tsx
 * @author Ehsanullah Qadeer
 * @desc Main component ArtistProfile for artist profile page.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* LOCAL IMPORTS */
import Theme from "theme";
import ProfileHeader from "./components/ProfileHeader";
import ScrollableContainer from "components/util/scrollable-container";
import ProfileCards from "./components/ProfileCards";
import { Data, musicTableData } from "./sampleData/sampleData";
import cardpic from "./sampleData/download.png";
import getMuiStyles from "styles/getMuiStyles";
import MusicTable from "./components/MusicTable";

// THIRD PARTY IMPORTS
import { InputAdornment, TextField } from "@mui/material";
import { FiSearch } from "react-icons/fi";

import { useState } from "react";
import { useLocation } from "react-router-dom";

const ArtistProfile = () => {
  const location = useLocation();
  const isWikiProfile = location.pathname.includes("artist-wiki-profile");
  const [selectedTab, setSelectedTab] = useState("Instrumentals");
  const [selectedRole, setSelectedRole] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMusicType, setSelectedMusicType] = useState("");
  const [isConnect, setIsConnect] = useState(false);

  const tabs = ["Instrumentals", "Samples", "Full Songs"];
  const roles = [
    "Composer",
    "Lyricist",
    "Primary Artist",
    "Vocals",
    "Guitar",
    "Publisher",
    "Featured Artist",
    "Background Vocals",
    "Instruemental",
    "Remixed",
  ];

  const musicType = ["reggaeton", "synth", "guitar", "dark"];

  // hook for mui styles
  const muiStyles = getMuiStyles();

  return (
    <Theme>
      <div className={`${isWikiProfile ? "flex flex-col gap-2 m-3" : ""}`}>
        <ProfileHeader
          isWikiProfile={isWikiProfile}
          setIsConnect={setIsConnect}
          isConnect={isConnect}
        />
        <section
          style={{
            border: "1px solid var(--Neutral-700, #242424)",
          }}
          className={`px-5 py-3 ${
            isWikiProfile ? "block bg-eerieBlack" : "hidden"
          }`}
        >
          <h2
            style={{
              borderBottom: "1px solid var(--Neutral-700, #242424)",
            }}
            className="text-gainsBoro pb-3 text-base font-semibold"
          >
            About
          </h2>
          <div
            className="flex flex-col gap-2 font-normal text-coolGray text-sm"
          >
            <p>
              Becky Hill is a British singer and songwriter known for her
              powerful vocals and energetic performances. Born Rebecca Hill on
              February 14, 1994, in Bewdley, Worcestershire, she first gained
              recognition in 2012 when she competed in the UK reality TV show
              The Voice. Although she didn’t win, her talent caught the
              attention of the music industry.
            </p>
            <p>
              Becky Hill’s breakthrough came with her collaboration on the 2014
              hit single “Gecko (Overdrive)” with DJ/producer Oliver Heldens.
              This track topped the UK Dance Chart and was a significant
              commercial success. She further solidified her place in the music
              scene with her debut single “Losing” and continued to release
              successful singles such as “Rude Love” and “Back to My Love.”
            </p>
          </div>
        </section>
        <section
          style={{
            border: isWikiProfile
              ? "1px solid var(--Neutral-700, #242424)"
              : "",
          }}
          className={`px-5 py-3 ${isWikiProfile ? "bg-eerieBlack" : ""}`}
        >
          <div className="flex justify-between items-center">
            <h2
              className={`text-gainsBoro mb-3 ${
                isWikiProfile ? " text-base font-semibold " : ""
              }`}
            >
              Credits
            </h2>
            <span
              className={`text-coolGray text-sm ${isWikiProfile ? "" : "hidden"}`}
            >
              {" "}
              View All
            </span>
          </div>
          <ScrollableContainer
            {...{
              showScrollArrows: false,
            }}
          >
            <div className="flex gap-2">
              {Data.map((value, index) => (
                <ProfileCards
                  isWikiProfile={isWikiProfile}
                  key={index}
                  imageurl={cardpic}
                  title={value.title}
                  singer={value.singer}
                  date={value.date}
                  p1={value.p1}
                  p2={value.p2}
                  p3={value.p3}
                />
              ))}
            </div>
          </ScrollableContainer>
        </section>
        <section
          className={`px-5 py-3 mb-8 ${isWikiProfile ? "bg-eerieBlack" : ""}`}
        >
          <div
            className={`text-coolGray flex flex-col ${
              isWikiProfile ? "hidden" : "flex"
            }`}
          >
            <h2 className="text-gainsBoro mb-3 font-bold">Library</h2>
            <div className="flex gap-4 w-fit border-b border-coolGray">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`text-white py-2 pb-3 text-sm flex  items-center justify-center ${
                    selectedTab === tab
                      ? "border-b border-white text-white"
                      : "text-gray-400"
                  } hover:text-white transition duration-300`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div
            className={`text-coolGray flex flex-col ${
              !isWikiProfile ? "hidden" : "flex"
            }`}
          >
            <h3 className={"text-lg text-lightGray font-semibold "}>Roles</h3>
            <div className="flex gap-2 py-4">
              {roles.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedRole(tab)}
                  className={`whitespace-nowrap text-sm px-2 py-1 border-[1.5px] rounded-lg ${
                    selectedRole === tab
                      ? " text-white border-hoveredparrot bg-[#C4FF4840]"
                      : "text-[#C9C9C9] border-[#2B2B2B] bg-[#161616]"
                  } hover:text-white transition duration-300`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className={`${isWikiProfile ? "hidden" : "block"} px-5`}>
          <div className="flex gap-2 mb-4">
            <div className="w-44">
              <TextField
                placeholder="search anything..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FiSearch />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                sx={muiStyles.searchInputTextField}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                fullWidth
              />
            </div>

            <div className="flex gap-2">
              {musicType.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedMusicType(tab)}
                  className={`whitespace-nowrap text-sm px-2 py-1 border-[1px] rounded-md ${
                    selectedMusicType === tab
                      ? " text-white border-hoveredparrot bg-[#C4FF4840]"
                      : "text-dimGray border-eerieBlack bg-eerieBlack"
                  } hover:text-white transition duration-300`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          <div
            className="relative"
            style={{ filter: !isConnect ? "blur(5px)" : "none" }}
          >
            {!isConnect && (
              <div className="absolute w-full h-full z-10 bg-[#101010] opacity-30"></div>
            )}
            <div className="text-xs font-medium text-[#9C9C9C] mb-3">
              {musicTableData.length} results
            </div>

            <MusicTable />
          </div>
        </section>
      </div>
    </Theme>
  );
};

export default ArtistProfile;
