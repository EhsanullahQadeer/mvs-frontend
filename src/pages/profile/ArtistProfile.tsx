/*************************************************************************
 * @file ArtistProfile.tsx
 * @author Ehsanullah Qadeer
 * @desc Main component ArtistProfile for artist profile page.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

/* LOCAL IMPORTS */
import Theme from "theme";
import ScrollableContainer from "components/util/scrollable-container";
import MusicTable from "./components/MusicTable";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { artistProfileAPI, getArtistCredits, getArtistInfo } from "api/user";
import {
  IArtistProfileData,
  // MusicTableArr
} from "./components/types";
import { CircularProgress } from "@mui/material";
import SamplesContainer from "components/SampleContainer/player-container";
import ProfileAboutSection from "./components/ProfileAboutSection";
import searchIcon from "../../assets/icons/searchIcon.svg";
import { musicTableData } from "./sampleData/sampleData";
// import { getUserSamplesAPI } from "api/sounds";

const ArtistProfile = () => {
  const { username } = useParams();
  const [selectedTab, setSelectedTab] = useState("Instrumentals");
  const [isConnect, setIsConnect] = useState(true);
  const [artistData, setArtistData] = useState<IArtistProfileData | null>(null);
  const [isLoading, setLoading] = useState(true);
  const { bio } = artistData?.available || {};

  // const [musicTableArr, setMusicTableArr] = useState<MusicTableArr | null>(
  //   null
  // );

  const [creditsData, setCreditsData] = useState([]);

  const tabs = ["Instrumentals", "Samples", "Full Songs"];

  const getArtistData = useCallback(async () => {
    try {
      let response = null;
      if (username) {
        response = await artistProfileAPI(username);
      }
      if (response && response.data) {
        setArtistData(response.data);
        const { spotify_artist_id, spotify_id } =
          response.data?.available ?? response.data;
        const id = spotify_artist_id ?? spotify_id;
        getCredits(id);
      }
    } catch (e) {
      return;
    }
  }, [username]);

  const getCredits = async (spotifyId: string) => {
    try {
      const response = await getArtistCredits({
        spotify_artist_id: spotifyId,
        skip: 0,
        limit: 10,
        take: 10,
      });
      setCreditsData(response.data.data);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getArtistData();
  }, [getArtistData]);

  // useEffect(() => {
  //   if (artistData) {
  //     getMusicTableData(artistData.cognito_id);
  //   }
  // }, [artistData]);

  // const getMusicTableData = async (cognito_id: string) => {
  //   try {
  //     const response = await getUserSamplesAPI({ cognito_id });
  //     if (response.data) {
  //       console.log("getMusicTableData", response.data.results);
  //       setMusicTableArr(response.data.results);
  //       return;
  //     }
  //   } catch (e) {
  //     return;
  //   }
  // };

  console.log("artist", artistData);
  return (
    <Theme>
      {!isLoading ? (
        <>
          <div className="relative flex overflow-hidden">
            <section className="flex-1 min-w-[780px] flex flex-col overflow-x-hidden overflow-y-auto custom-dropdown">
              <div className={`text-coolGray flex flex-col py-3 mb-2 px-4 `}>
                <h2 className="text-gainsBoro mb-3 font-bold">Library</h2>
                <div className="flex justify-between items-center">
                  <div className="flex">
                    {tabs.map((tab, index) => (
                      <button
                        key={tab}
                        onClick={() => setSelectedTab(tab)}
                        className={`py-2 px-3 text-sm flex items-center justify-center border border-eclipseGray ${
                          selectedTab === tab
                            ? "text-[#CCCCCC] bg-eerieBlack"
                            : "text-charcoalGray bg-darkGray"
                        } ${index === 0 && "rounded-l-md border-r-0"} ${
                          index === 2 && "rounded-r-md border-l-0"
                        } transition duration-300`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center pl-4 max-w-full rounded-lg bg-[#1c1c1c] min-h-[33px] w-[149px]">
                    <div className="flex flex-1 shrink gap-2 items-center self-stretch my-auto w-full basis-0">
                      <img
                        loading="lazy"
                        src={searchIcon}
                        className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
                        alt="search-icon"
                      />
                      <div className="flex-1 shrink gap-2.5 self-stretch my-auto">
                        <input
                          style={{ boxShadow: "none" }}
                          type="text"
                          className="rounded-full outline-none bg-transparent border-none w-full py-2.5 pl-0 text-xs font-normal text-charcoalGray"
                          placeholder="search anything..."
                        />
                      </div>
                    </div>
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
                <div className="text-xs font-medium text-[#9C9C9C] py-4 px-3 border-t border-[#1F1F1F]">
                  {musicTableData.length} results
                </div>

                {/* <MusicTable /> */}
                <div className="relative">
                  <SamplesContainer user_id={artistData?.id} />
                </div>
              </div>
            </section>

            <section className="border-l border-eclipseGray max-w-[375px] overflow-x-hidden overflow-y-auto custom-dropdown">
              <ProfileAboutSection {...{ artistData, creditsData }} />
            </section>
          </div>{" "}
        </>
      ) : (
        <>
          <div className="absolute top-0 left-0 z-50 bg-black opacity-40 pointer-events-none w-full h-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999px]">
            <CircularProgress
              sx={{
                width: "80px !important",
                height: "80px !important",
                color: "#9EFF00",
              }}
            />
          </div>
        </>
      )}
    </Theme>
  );
};

export default ArtistProfile;
