/*****************************************************************************************
 * @file ArtistWikiProfile.tsx
 * @author Ehsanullah Qadeer
 * @desc Main component ArtistWikiProfile for artist wiki profile page.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *****************************************************************************************/

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

/* LOCAL IMPORTS */
import Theme from "theme";
import ProfileHeader from "./components/ProfileHeader";
import ScrollableContainer from "components/util/scrollable-container";
import ProfileCards from "./components/ProfileCards";

import { useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getSpotifyArtistTopTracks, getUserBySpotifyId } from "api/user";
import {
  IArtistProfileData,
  // MusicTableArr
} from "./components/types";
import { CircularProgress } from "@mui/material";
// import { getUserSamplesAPI } from "api/sounds";

const WikiPage = () => {
  const location = useLocation();
  const { spotify_artist_id } = useParams();
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
      if (spotify_artist_id) {
        response = await getUserBySpotifyId(spotify_artist_id);
        console.log('response', response);
      }
      if (response && response.data) {
        console.log('response.data', response.data);
        setArtistData(response.data);
        const { spotify_artist_id, spotify_id } =
          response.data?.available ?? response.data;
        const id = spotify_artist_id ?? spotify_id;
        getCredits(id);
      }
    } catch (e) {
      return;
    }
  }, [spotify_artist_id]);



  const getCredits = async (
    spotifyId: string
  ) => {
    try {
      const response = await getSpotifyArtistTopTracks({
        spotifyId,
        skip: 0,
        limit: 10,
        take: 10,
      });
      setCreditsData(response.data.results);
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

  if (!artistData?.is_claimed) {
    return (
      <Theme>
        {!isLoading ? (
          <>
            <div className={`relative flex flex-col gap-2 m-3`}>
              <ProfileHeader {...{ setIsConnect, isConnect, artistData }} />
              <section
                className={`px-5 py-3 rounded-t-lg border border-[#242424] block bg-eerieBlack`}
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
                  <p dangerouslySetInnerHTML={{ __html: artistData?.bio }} />
                </div>
              </section>
              <section
                className={`px-5 py-3 rounded-b-lg border border-[#242424] bg-eerieBlack`}
              >
                <div className="flex justify-between items-center">
                  <h2 className={`text-gainsBoro mb-3 text-base font-semibold`}>
                    Credits
                  </h2>
                  <span className={`text-coolGray text-sm cursor-pointer hidden`}>
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
  }
};

export default WikiPage;
