import {
  artistPublicProfileAPI,
  getPublicSpotifyArtistTopTracks,
} from "api/user";
import mvssiveLogo from "../../assets/icons/mvssive-logo.svg";
import ProfileInfo from "./components/ProfileInfo";
import ProfileRightSection from "./components/ProfileRightSection";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IArtistProfileData } from "./components/types";
import { CircularProgress } from "@mui/material";
import { currentUserAPI } from "api/auth";

const PublicProfile = () => {
  const { username } = useParams();
  const [currentUserInfo, setCurrentUserInfo] = useState(null);
  const [artistData, setArtistData] = useState<IArtistProfileData | null>(null);
  const [creditsData, setCreditsData] = useState([]);
  const [loader, setLoader] = useState<boolean>(true);

  const getArtistData = async () => {
    try {
      setLoader(true);
      let response = null;
      if (username) {
        response = await artistPublicProfileAPI(username);
      }
      if (response && response.data) {
        setArtistData(response.data);
        const { spotify_artist_id, spotify_id } =
          response.data?.available ?? response.data;
        const id = spotify_artist_id ?? spotify_id;
        getCredits(id);
      }
    } catch (e) {
      console.log("error while fetching profile data: ", e);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getArtistData();
    getCurrentUser();
  }, []);

  const getCredits = async (spotifyId: string) => {
    try {
      const response = await getPublicSpotifyArtistTopTracks({
        spotifyId: spotifyId,
        skip: 0,
        limit: 10,
        take: 10,
      });
      setCreditsData(response.data.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getCurrentUser = async () => {
    try {
      const response = await currentUserAPI();
      setCurrentUserInfo(response.data);
      console.log("user info ", response);
    } catch (error) {
      console.error("Error in user info:", error);
    }
  };

  return (
    <div className="h-svh flex flex-col overflow-hidden">
      {loader ? (
        <>
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
      ) : (
        <>
          <div className="flex px-10 py-3 justify-between items-center">
            <img
              src={mvssiveLogo}
              alt="mvssiveLogo"
              className="w-[123px] h-[17px]"
            />

            <div className="bg-limeGreen w-[176px] h-[42px] rounded-full cursor-pointer text-sm font-semibold text-jetBlack flex justify-center items-center">
              Join MVSSIVE today
            </div>
          </div>

          <div className="flex-1 flex overflow-hidden">
            <div className="flex-[25%] border-r border-eclipseGray bg-jetBlack flex">
              <ProfileInfo {...{ artistData, creditsData }} />
            </div>
            <div className="flex-[75%] flex">
              <ProfileRightSection 
              {...{ artistData,
                currentUserInfo,
                isLoginUser: false,
                user: null,
                tabs: [], 
                hasSampleType: {}, 
                selectedTab: "", 
                setSelectedTab: () => {}, 
                isConnect: false, 
                chatOpen: false, 
                setChatOpen: () => {}, 
                isPublicProfile: true 
              }} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PublicProfile;
