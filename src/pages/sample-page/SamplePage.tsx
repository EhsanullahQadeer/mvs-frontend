import AudioPlayer from "components/SampleContainer/components/player";
import { useCallback, useEffect, useState } from "react";
import { FiDownload } from "react-icons/fi";
import { FaLink } from "react-icons/fa6";
import { PiCornersOutFill, PiUploadSimple } from "react-icons/pi";
import { CircularProgress } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { checkIfSoundHasPass, getSoundMetaData, soundStream } from "api/sounds";
import logo from "../../assets/img/M-logo.png";
import linesImg from "../../assets/img/lines.png";
import publicLinksBg from "../../assets/img/publicLinksBg.png";
import defaultImg from "../../assets/img/artistImg.png";
import EnterPasswordPage from "./EnterPasswordPage";
import BlurCircle from "../../assets/img/blur-circle.png";
import musicIcon from "../../assets/icons/musicIcon.svg";

import {
  useWaveform,
  WaveformProvider,
} from "components/SampleContainer/components/waveform";
import cookie from "js-cookie";
import { useHeaderHooks } from "theme/Header/Header.hooks";
import Avatar from "react-avatar";
import { toast } from "react-toastify";
import { getUserByIdAPI } from "api/user";
import thunk from "redux-thunk";
import ProfileButton from "theme/Sidebar/ProfileButton";

export interface ISoundMetaData {
  bpm: string;
  filename: string;
  key: string;
  length: number;
  mimeType: string;
  name: string | null;
  tags: string[] | null;
  thumbnailBase64: string;
  type: string;
  owner_id: string;
  is_public_active: boolean;
  is_downloadable: boolean;
  require_logged_in: boolean;
}

const SamplePageChilds = () => {
  const { id } = useParams();
  const token = cookie.get("token");
  const { state } = useHeaderHooks();
  const navigate = useNavigate();

  const { loadTracks, armTrack, current, playTrack, pauseTrack } =
    useWaveform();

  const [isPasswordPage, setIsPasswordPage] = useState(false);
  const [isResponseCome, setIsResponseCome] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [metaData, setMetaData] = useState<ISoundMetaData | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [audioSrc, setAudioSrc] = useState<string>("");
  const [user, setUser] = useState<any | null>(null);

  const getUserById = async (id: string) => {
    const response = await getUserByIdAPI(id);
    setUser(response.data);
  };

  useEffect(() => {
    if (metaData?.owner_id) {
      getUserById(metaData.owner_id);
    }
  }, [metaData]);

  const handleGetSound = async (password?: string) => {
    const bodySoundStream = {
      publicId: id,
      range: "0-",
    };
    if (password) {
      bodySoundStream["password"] = password;
    }

    const soundStreamResponse = await soundStream(id, bodySoundStream);
    if (!soundStreamResponse.ok) {
      const errorData = await soundStreamResponse.json();
      throw errorData;
    }

    // const metadataResponse = await getSoundMetaData(id, { code: id, password: password });
    setIsPasswordPage(false);
    // setMetaData(metadataResponse.metadata);

    const arrayBuffer = await soundStreamResponse.arrayBuffer();

    const blob = new Blob([arrayBuffer], { type: "audio/mpeg" });
    const url = URL.createObjectURL(blob);
    setAudioSrc(url);
    const trackSources = [
      {
        id,
        src: url,
      },
    ];
    loadTracks(trackSources, { reset: true });
  };

  useEffect(() => {
    const getMetadata = async () => {
      const metadataResponse = await getSoundMetaData(id, { code: id });
      setMetaData(metadataResponse.metadata);
    };
    getMetadata();
  }, [metaData]);


  const checkPassword = async () => {
    try {
      setIsLoading(true);
      const isPass = await checkIfSoundHasPass({ code: id });
      setIsPasswordPage(isPass);
      if (!isPass) {
        await handleGetSound();
      }
      setIsResponseCome(true);
    } catch (error) {
      toast.error(error.message, {
        theme: "colored",
        position: "top-center",
        autoClose: false,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkPassword();
  }, [id]);

  const handlePasswordPage = () => {
    setIsPasswordPage(true);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!', {
      position: "top-center",
      autoClose: 2000,
    });
  };

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = audioSrc;
    a.download = "sample.mp3";
    a.click();
  };

  const audio_track = {
    id: id,
    src: audioSrc,
  };

  const handlePlayToggle = () => {
    if (!current || current.id !== id) {
      armTrack(id);
      playTrack(audio_track);

      setIsPlaying(true);
    } else {
      if (isPlaying) {
        pauseTrack();
      } else {
        playTrack(audio_track);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleKeyDown = useCallback(
    (event) => {
      if ((event.code === "Space" || event.key === " ") && audioSrc) {
        event.preventDefault();
        handlePlayToggle();
      }
    },
    [audioSrc, isPlaying, current]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, audioSrc, isPlaying, current]);

  useEffect(() => {
    console.log('print here', user);
  }, [user?.id]);

  const imgSrc = metaData && (metaData?.thumbnailBase64 || defaultImg);

  return (
    <>
      {isLoading && (
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
      {isResponseCome &&
        (isPasswordPage ? (
          <EnterPasswordPage {...{ setIsLoading, handleGetSound, user, require_logged_in: metaData?.require_logged_in, isLoggedIn: !!token }} />
        ) : (
          <>
            <header className="flex px-5 py-2 justify-between items-center">
              <div 
                className="h-5 w-14 cursor-pointer" 
                onClick={() => navigate('/home')}
              >
                <img src={logo} alt="" className="w-full h-full" />
              </div>
              <div className="flex items-center">
                <div className="flex items-center gap-4 text-white">
                  {metaData?.is_downloadable && (
                    <div
                      onClick={handleDownload}
                      className="text-silver cursor-pointer"
                    >
                      <FiDownload />
                    </div>
                  )}
                  <div
                    onClick={handleCopyLink}
                    className="text-silver cursor-pointer"
                  >
                    <FaLink />
                  </div>
                  {/* <div className="text-silver cursor-pointer">
                    <PiUploadSimple />
                  </div> */}
                </div>

                <span className="w-px h-[23px] bg-charcoalGray mx-5"></span>

                {token ? (
                  <ProfileButton direction="left" />
                ) : (
                  <div className="gap-2 flex items-center">
                    <button className="px-4 py-2 bg-limeGreen text-jetBlack w-fit whitespace-nowrap text-xs font-normal rounded-full">
                      Sign Up
                    </button>
                    <button
                      onClick={handlePasswordPage}
                      className="px-4 border border-silver py-2 text-silver w-full whitespace-nowrap text-xs font-normal rounded-full"
                    >
                      Login
                    </button>
                  </div>
                )}
              </div>
            </header>

            <div
              className="flex-1 overflow-hidden relative"
              style={{ backgroundImage: `url(${publicLinksBg})` }}
            >
              <img src={linesImg} alt="linesImg" className="w-full h-full" />

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div
                  className="w-[260px]  h-[260px]  bg-center  bg-contain"
                  style={{
                    backgroundImage: `url(${BlurCircle})`,
                    backdropFilter: "blur(22px)",
                  }}
                >
                  <div className="w-[260px] h-[260px] flex justify-center items-center">
                    <div className="w-[220px] h-[220px] bg-darkGray border border-eerieBlack rounded-lg p-[45px]">
                      <div className="w-full h-full rounded-full relative">
                        <img
                          src={user?.thumbnail}
                          alt=""
                          className="rounded-full w-full h-full object-cover"
                        />
                        {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-charcoalGray rounded-full"></div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-[66px] w-full">
              <AudioPlayer
                currTrack={{
                  id,
                  audioSrc,
                  thumbnail: musicIcon,
                  filename: metaData?.filename,
                }}
                isPlaying={isPlaying}
                onPlayToggle={() => handlePlayToggle()}
                onPrevClick={() => {}}
                onNextClick={() => {}}
              />
            </div>
          </>
        ))}
    </>
  );
};

const SamplePage = () => {
  const { id } = useParams();
  const [metadata, setMetadata] = useState<ISoundMetaData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        setIsLoading(true);
        const response = await getSoundMetaData(id, { code: id });
        setMetadata(response.metadata);
      } catch (error) {
        console.error('Error fetching metadata:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetadata();
  }, [id]);

  if (isLoading) {
    return (
      <div className="h-svh flex items-center justify-center bg-jetBlack">
        <div className="text-dimGray">Loading...</div>
      </div>
    );
  }

  if (!metadata?.is_public_active) {
    return (
      <div className="h-svh flex items-center justify-center bg-jetBlack">
        <div className="text-center">
          <h2 className="text-white text-xl mb-2">Sample not found</h2>
          <p className="text-dimGray">This sample is not available for public access.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-svh flex flex-col">
      <WaveformProvider>
        <SamplePageChilds />
      </WaveformProvider>
    </div>
  );
};

export default SamplePage;
