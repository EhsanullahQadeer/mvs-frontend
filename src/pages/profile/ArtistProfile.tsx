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
import ProfileHeader from "./components/ProfileHeader";
import ScrollableContainer from "components/util/scrollable-container";
import ProfileCards from "./components/ProfileCards";
import { musicTableData } from "./sampleData/sampleData";
import MusicTable from "./components/MusicTable";

import { useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { artistProfileAPI, getArtistCredits, getArtistInfo } from "api/user";
import {
  IArtistProfileData,
  // MusicTableArr
} from "./components/types";
import { CircularProgress } from "@mui/material";
import SamplesContainer from "components/SampleContainer/player-container";
// import { getUserSamplesAPI } from "api/sounds";

const ArtistProfile = () => {
  const location = useLocation();
  const { username, spotify_artist_id } = useParams();
  const isWikiProfile = location.pathname.includes("artist-wiki-profile");
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
      if (isWikiProfile && spotify_artist_id) {
        response = await getArtistInfo({ spotify_artist_id });
      } else if (username) {
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
  }, [isWikiProfile, spotify_artist_id, username]);

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



  console.log('artist',artistData)
  return (
    <Theme>
      {!isLoading ? (
        <>
          <div
            className={`relative ${
              isWikiProfile ? "flex flex-col gap-2 m-3" : ""
            }`}
          >
            <ProfileHeader
              {...{ isWikiProfile, setIsConnect, isConnect, artistData }}
            />
            <section
              className={`px-5 py-3 rounded-t-lg border border-[#242424] ${
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
              <div className="pt-4 pb-1 flex flex-col gap-2 font-normal text-coolGray text-sm">
                <p dangerouslySetInnerHTML={{ __html: bio }} />
              </div>
            </section>
            <section
              className={`px-5 py-3 rounded-b-lg ${
                isWikiProfile ? "border border-[#242424] bg-eerieBlack" : ""
              }`}
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
                  className={`text-coolGray text-sm cursor-pointer ${
                    isWikiProfile ? "" : "hidden"
                  }`}
                >
                  View All
                </span>
              </div>
              <ScrollableContainer
                {...{
                  showScrollArrows: false,
                }}
              >
                <div className="flex gap-2">
                  {creditsData.map((value, index) => (
                    <ProfileCards {...value} />
                  ))}
                </div>
              </ScrollableContainer>
            </section>
            <section
              className={`px-5 py-3 mb-8 ${isWikiProfile ? "hidden" : ""}`}
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
            </section>

            <section className={`${isWikiProfile ? "hidden" : "block"} px-5`}>
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

                {/* <MusicTable /> */}
                <SamplesContainer user_id={artistData?.id}/>
              </div>
            </section>
          </div>{" "}
        </>
      ) : (
        <>
          <div className="absolute top-0 left-0 z-50 bg-black opacity-40 pointer-events-none w-full h-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999px]">
            <CircularProgress
              color="success"
              sx={{ width: "80px !important", height: "80px !important" }}
            />
          </div>
        </>
      )}
    </Theme>
  );
};

export default ArtistProfile;
