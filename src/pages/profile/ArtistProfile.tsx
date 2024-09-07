import Theme from "theme";
import ProfileHeader from "./components/ProfileHeader";
import ScrollableContainer from "components/util/scrollable-container";
import ProfileCards from "./components/ProfileCards";
import { Data } from "./sampleData/sampleData";
import { useState } from "react";
import cardpic from "./sampleData/download.png";

const ArtistProfile = () => {
  const isWikiProfile = true;
  const [selectedTab, setSelectedTab] = useState("Instrumentals");
  const [selectedRole, setSelectedRole] = useState("");

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

  return (
    <Theme>
      <div className={`${isWikiProfile ? "flex flex-col gap-2 mx-3" : ""}`}>
        <ProfileHeader isWikiProfile={isWikiProfile} />
        <section
          style={{
            background: isWikiProfile ? "#1C1C1C" : "",
            border: "1px solid var(--Neutral-700, #242424)",
          }}
          className={`px-5 py-3 ${isWikiProfile ? "block" : "hidden"}`}
        >
          <h2
            style={{
              color: "#D1D1D1",
              borderBottom: "1px solid var(--Neutral-700, #242424)",
            }}
            className="text-white pb-3 text-base font-semibold  "
          >
            About
          </h2>
          <div
            style={{
              color: "#848484",
              fontSize: "14px",
            }}
            className="flex flex-col gap-2 font-normal"
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
            background: isWikiProfile ? "#1C1C1C" : "",
            border:isWikiProfile ?  "1px solid var(--Neutral-700, #242424)" : '' ,
          }}
          className="px-5 py-3"
        >
         <div className="flex justify-between items-center">
         <h2
            style={{
              color: " #D1D1D1",
            }}
            className={`text-white mb-3 ${
              isWikiProfile ? " text-base font-semibold " : ""
            }`}
          >
            Credits
          </h2>
          <span style={{
            color: "rgba(132, 132, 132, 1)"
          }} className={`text-sm ${isWikiProfile ? '' : "hidden"}`}> View All</span>
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
          style={{
            background: isWikiProfile ? "#1C1C1C" : "",
          }}
          className={`  px-5 py-3  mb-8`}
        >
          <div
            className={` text-coolGray   flex flex-col ${
              isWikiProfile ? "hidden" : "flex"
            }`}
          >
            <h2
              style={{
                color: " #D1D1D1",
              }}
              className="text-white mb-3  font-bold"
            >
              Library
            </h2>
            <div className="flex gap-4 w-fit border-b border-coolGray ">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`text-white  py-2  pb-3 text-sm flex  items-center justify-center   ${
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
            className={` text-coolGray   flex flex-col ${
              !isWikiProfile ? "hidden" : "flex"
            }`}
          >
            <h3 className={"text-lg text-lightGray font-semibold "}>Roles</h3>
            <div className="flex gap-2 py-4  ">
              {roles.map((tab) => (
                <button
                  style={{
                    borderRadius: " 8px",
                    border: " 1.5px solid #2B2B2B",
                    background: "#161616",
                    padding : "8px 16px",
                    color: "#C9C9C9",


                  }}
                  key={tab}
                  onClick={() => setSelectedRole(tab)}

                  className={`whitespace-nowrap  text-xs ${
                    selectedRole === tab ? " text-white border-hoveredparrot border-px" : "text-gray-400"
                  } hover:text-white transition duration-300`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Theme>
  );
};

export default ArtistProfile;
