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
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  artistProfileAPI,
  checkPendingConnectAPI,
  getSpotifyArtistTopTracks,
  getUserByIdAPI,
} from "api/user";
import {
  IArtistProfileData,
  // MusicTableArr
} from "./components/types";
import { getCheckUserHasSampleType } from "api/sounds";
import { CircularProgress } from "@mui/material";
import ProfileAboutSection from "./components/ProfileAboutSection";
import { MessageContextProvider } from "./messageContextProvider";
import UploadFileSection from "./components/UploadFileSection";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import SampleUploadModel from "./components/SampleUploadModel";
import ProfileLibrary from "./components/ProfileLibrary";
import ProfileRightSection from "../publicProfile/components/ProfileRightSection";
import { ChatboxProvider } from "pages/Inbox/components/Chatbox/context";
// import { getUserSamplesAPI } from "api/sounds";

const ArtistProfile = () => {
  const { username } = useParams();
  const [isConnect, setIsConnect] = useState(true);
  const [artistData, setArtistData] = useState<IArtistProfileData | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [connectionDetail, setConnectionDetail] = useState();
  const [chatOpen, setChatOpen] = useState(false);

  const [isLoginUser, setIsLoginUser] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);

  const libraryTabs = [
    { label: "Instrumentals", value: "instrumental" },
    { label: "Samples", value: "sample" },
    { label: "Contributions", value: "contributions" },
    { label: "Full Songs", value: "full_song" },
  ];

  const [hasSampleType, setHasSampleType] = useState<Record<string, boolean>>({
    instrumental: false,
    sample: false,
    contribution: false,
    full_song: false
  });
  const [selectedTab, setSelectedTab] = useState('');
  const types = ["instrumental", "sample", "contribution", "full_song"];
  useEffect(() => {
    if (artistData && user) {
      if (artistData.id === user.id) {
        setIsLoginUser(true);
      }
    }
  }, [artistData, user]);

  const fetchSampleTypes = async () => {
    if (user && artistData) {
      const typeString = types.join(',');
      const response = await getCheckUserHasSampleType(typeString, artistData.id);
      console.log("response", response);
      console.log("response", user.id, artistData.id);
      setHasSampleType(response.data);
    }
  }

  useEffect(() => {
    // Reset states when user or artist changes
    setHasSampleType({
      instrumental: false,
      sample: false,
      contribution: false,
      full_song: false
    });
    setSelectedTab('');
    fetchSampleTypes();
  }, [artistData, user]);

  const [creditsData, setCreditsData] = useState([]);



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
      const response = await getSpotifyArtistTopTracks({
        spotifyId,
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

  const checkConnection = async () => {
    if (artistData) {
      try {
        const response = await checkPendingConnectAPI(artistData?.id);
        if (response.data.results.connectionDetails) {
          setConnectionDetail(
            response.data.results.connectionDetails.request_accepted
          );
        }

        // console.log(
        //   "response check connect",
        //   response.data.results.connectionDetails
        // );
      } catch (error) {
        console.log("error while checking connection", error);
      }
    }
  };

  useEffect(() => {
    getArtistData();
  }, [getArtistData]);

  useEffect(() => {
    checkConnection();
  }, [artistData]);

  useEffect(() => {
    setIsConnect(isLoginUser || connectionDetail);
  }, [connectionDetail, isLoginUser]);

  return (
    <Theme>
      {!isLoading ? (<>
        <div className="relative flex overflow-hidden">

          <div className={`flex-grow ${chatOpen ? 'max-w-[calc(100%-500px)]' : 'max-w-[calc(100%-374px)]'} transition-all duration-300`}>
            <ProfileRightSection
              artistData={artistData}
              currentUserInfo={user}
              hasSampleType={hasSampleType}
              connectionDetail={connectionDetail}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
              isConnect={isConnect}
              isLoginUser={isLoginUser}
              user={user}
              tabs={libraryTabs}
              chatOpen={chatOpen}
              setChatOpen={setChatOpen}
              isPublicProfile={false}
            />
          </div>

          <section className={`border-l border-eclipseGray ${chatOpen ? 'w-[500px]' : 'w-[374px]'} h-screen overflow-x-hidden overflow-y-auto custom-dropdown transition-all duration-300`}>
            <MessageContextProvider>
              <ChatboxProvider>
                <ProfileAboutSection
                  {...{ artistData, creditsData, connectionDetail, setConnectionDetail, chatOpen, setChatOpen }}
                />
              </ChatboxProvider>
            </MessageContextProvider>
          </section>
        </div>{" "}
      </>
      ) : (
        <>
          <div className="absolute top-0 left-0 z-[9999] bg-black opacity-40 w-full h-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999]">
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
