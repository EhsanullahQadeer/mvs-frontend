/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import AudioPlayer from "./player";
import { FiDownload } from "react-icons/fi";
import { loadAsset } from "utils/dateUtils";
import DropDown from "components/util/dropdown";
import { AudioTrackType } from "../player-container";
import { AudioTrack, useWaveform } from "./waveform";
import { AnimatedWaveGraphic } from "./wave-graphic";
import playIcon from "../../../assets/icons/playIcon.svg";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io"
import musicBeam from "../../../assets/icons/musicBeam.svg";
import ConsideringModal from "components/modals/considering";
import { useCallback, useEffect, useRef, useState } from "react";
import {ReactComponent as MusicIcon} from "../../../assets/icons/musicIcon.svg";
import Thumbnail from "components/ui/Header/atoms/notificationAtoms/thumbnailAvatar";
import { getSampleConsidering, saveSampleDownloadAPI, sampleLikeAPI } from "api/sounds";

const SampleTable = (props: {
  samples: any[];
  setSamples?: (samples: any[]) => void;
  fetchAllUserSamples?: () => void;
  likedSamples?: Record<number, boolean>;
  setLikedSamples?: (likes: Record<number, boolean>) => void;
  chatOpen?: boolean;
  isConnect?: boolean;
}) => {
  const { samples, setSamples, fetchAllUserSamples, likedSamples = {}, setLikedSamples, chatOpen, isConnect } = props;
  const [consideringData, setConsideringData] = useState<Record<number, any[]>>({});
  const [considering, setConsidering] = useState(false);
  const [selectedSampleId, setSelectedSampleId] = useState<number | null>(null);
  const [currPlayingId, setCurrentPlaying] = useState(0);
  const [currPlayingIdx, setCurrentPlayingIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currTrack, setTrack] = useState(null);
  const [Play, setPlay] = useState(false);
  const [localLikedStatus, setLocalLikedStatus] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (samples && setLikedSamples) {
      const initialLikes: Record<number, boolean> = {};
      samples.forEach(sample => {
        initialLikes[sample.id] = sample.userInfo?.isLiked || false;
      });
      setLikedSamples(initialLikes);
    }
  }, [samples, setLikedSamples]);

  useEffect(() => {
    if (samples) {
      const fetchConsideringData = async (sampleId: number) => {
        try {
          const response = await getSampleConsidering(sampleId);
          setConsideringData(prev => ({
            ...prev,
            [sampleId]: response.data
          }));
        } catch (error) {
          console.error('Error fetching considering data:', error);
          setConsideringData(prev => ({
            ...prev, 
            [sampleId]: []
          }));
        }
      };

      Object.values(samples).forEach((sample: any) => {
        fetchConsideringData(sample.id);
      });
    }
  }, [samples]);

  const rowRefs = useRef<Array<HTMLTableRowElement | null>>([]);
  const formatDuration = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const paddedMinutes = minutes.toString().padStart(2, "0");
    const paddedSeconds = seconds.toString().padStart(2, "0");

    if (hours > 0) {
      return `${hours}:${paddedMinutes}:${paddedSeconds}`; // Show hours only if they are greater than 0
    }

    return `${minutes}:${paddedSeconds}`; // If no hours, show MM:SS
  };

  const {
    loadTracks,
    armTrack,
    tracks,
    current,
    loading,
    playTrack,
    pauseTrack,
    setCurrent,     // Add these setters directly
    setLoading,     // without the _ object
    setPlayState,
    setTracks
  } = useWaveform();
  // const { currentTrack, playTrack, isPaused, pauseTrack } = useContext(PlayerContext);

  // Load all the tracks at once when the component mounts to show their waveforms
  useEffect(() => {
    const trackSources = Object.values(samples).map((sample: any) => ({
      id: sample.id,
      src: sample.mp3_s3_key ? sample.mp3_s3_key : sample.s3_key,
      duration: sample.duration,
    }));
    loadTracks(trackSources, { reset: true });
  }, [samples, loadTracks]);

  const handlePlayToggle = (
    sample: AudioTrackType,
    clickedSampleIndex: number
  ) => {
    // Create an updated sample with the transformed URL
    const updatedSample = {
      ...sample,
      mp3_s3_key: sample.mp3_s3_key ? loadAsset(sample.mp3_s3_key) : loadAsset(sample.s3_key),
      s3_key: sample.s3_key ? loadAsset(sample.s3_key) : loadAsset(sample.mp3_s3_key)
    };

    const audio_track: AudioTrack = {
      id: sample.id,
      src: updatedSample.mp3_s3_key || updatedSample.s3_key,
    };

    if (!current || current.id !== sample.id) {
      setCurrentPlaying(sample.id);
      setCurrentPlayingIndex(clickedSampleIndex);
      setCurrent(audio_track);
      armTrack(sample.id);
      setTrack(updatedSample); // Now passing the updated sample with transformed URLs
      playTrack(audio_track);
      setIsPlaying(true);
      setPlay(true);
    } else {
      if (isPlaying) {
        pauseTrack();
      } else {
        playTrack(audio_track);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handlePrevTrack = () => {
    if (currPlayingIdx > 0) {
      const prevIndex = currPlayingIdx - 1;
      const prevSample = Object.values(samples)[prevIndex] as AudioTrackType;
      const audio_track: AudioTrack = {
        id: prevSample.id,
        src: prevSample.mp3_s3_key ? prevSample.mp3_s3_key : prevSample.s3_key,
      };

      setCurrentPlaying(prevSample.id); // Set the previous track as the current one
      setCurrentPlayingIndex(prevIndex);
      setTrack(prevSample); // Update the current track in state
      armTrack(prevSample.id); // Arm the track
      playTrack(audio_track); // Play the previous track
      setIsPlaying(true);
    }
  };

  const handleNextTrack = () => {
    if (currPlayingIdx < Object.values(samples).length - 1) {
      const nextIndex = currPlayingIdx + 1;
      const nextSample = Object.values(samples)[nextIndex] as AudioTrackType;
      const audio_track: AudioTrack = {
        id: nextSample.id,
        src: nextSample.mp3_s3_key ? nextSample.mp3_s3_key : nextSample.s3_key,
      };

      setCurrentPlaying(nextSample.id); // Set the next track as the current one
      setCurrentPlayingIndex(nextIndex);
      setTrack(nextSample); // Update the current track in state
      armTrack(nextSample.id); // Arm the track
      playTrack(audio_track); // Play the next track
      setIsPlaying(true);
    }
  };

  const handleKeyDown = useCallback(
    (event) => {
      const handleTrackSwitch = (sample: AudioTrackType, index: number) => {
        const audio_track: AudioTrack = {
          id: sample.id, // Set the id from currentSample
          src: sample.mp3_s3_key ? sample.mp3_s3_key : sample.s3_key, // Set the src from currentSample
        };
        setCurrentPlaying(sample.id); // Set the current playing track ID
        setCurrentPlayingIndex(index); // Update the playing index
        armTrack(sample.id); // Arm the track
        setTrack(sample); // Set the track for the UI to update
        playTrack(audio_track); // Play the track
        setIsPlaying(true); // Update play state to true
        // Scroll the current row into view
        if (rowRefs.current[index]) {
          rowRefs.current[index]?.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
        }
      };

      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        event.preventDefault();
        if (event.key === "ArrowUp") {
          if (currPlayingIdx > 0) {
            const prevIndex = currPlayingIdx - 1;
            const prevSample = Object.values(samples)[
              prevIndex
            ] as AudioTrackType;

            if (isPlaying) {
              pauseTrack(); // Pause the current track first
              setIsPlaying(false); // Ensure UI reflects the paused state
              setTimeout(() => handleTrackSwitch(prevSample, prevIndex), 0); // Switch after pausing
            } else {
              handleTrackSwitch(prevSample, prevIndex); // Directly switch if no track is playing
            }
          }
        } else if (event.key === "ArrowDown") {
          if (currPlayingIdx < Object.values(samples).length - 1) {
            const nextIndex = currPlayingIdx + 1;
            const nextSample = Object.values(samples)[
              nextIndex
            ] as AudioTrackType;

            if (isPlaying) {
              pauseTrack(); // Pause the current track first
              setIsPlaying(false); // Ensure UI reflects the paused state
              setTimeout(() => handleTrackSwitch(nextSample, nextIndex), 0); // Switch after pausing
            } else {
              handleTrackSwitch(nextSample, nextIndex); // Directly switch if no track is playing
            }
          }
        }
      } else if ((event.code === "Space" || event.key === " ") && !chatOpen) {
        // Check if the active element is an input, textarea, or contenteditable element
        const activeElement = document.activeElement;
        const isInputFocused =
          activeElement instanceof HTMLElement &&
          (activeElement.tagName === "INPUT" ||
            activeElement.tagName === "TEXTAREA" ||
            activeElement.isContentEditable);

        // Only handle space if we're not focused on an input element
        if (!isInputFocused) {
          // Prevent the default scroll behavior of the spacebar
          event.preventDefault();

          const currentSample = Object.values(samples)[
            currPlayingIdx
          ] as AudioTrackType;
          const audio_track: AudioTrack = {
            id: currentSample.id,
            src: currentSample.mp3_s3_key ? currentSample.mp3_s3_key : currentSample.s3_key,
          };
          if (isPlaying) {
            pauseTrack();
            setIsPlaying(false);
          } else {
            armTrack(currentSample.id);
            playTrack(audio_track);
            setIsPlaying(true);
          }
        }
      }
    },
    [
      currPlayingIdx,
      isPlaying,
      samples,
      pauseTrack,
      handlePlayToggle,
      armTrack,
      playTrack,
    ]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleMusicRowClick = (e, sample, idxValue) => {
    e.stopPropagation();
    setCurrentPlaying(sample.id);
    setCurrentPlayingIndex(idxValue);
    handlePlayToggle(sample, idxValue);
  };

  const handleDownload = async (e: React.MouseEvent, sample: any) => {
    e.preventDefault();
    if (!isConnect) return;
    e.stopPropagation();
    
    try {
      if (!sample.userInfo.isOwner) {
        await saveSampleDownloadAPI(sample.id);
      }
      const link = document.createElement('a');
      link.href = loadAsset(sample.s3_key);
      link.download = sample.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const handleLike = async (e: React.MouseEvent, sample: any) => {
    e.preventDefault();
    if (!isConnect) return;
    try {
      await sampleLikeAPI(sample.id);
      
      // Update local state immediately
      setLocalLikedStatus(prev => ({
        ...prev,
        [sample.id]: !prev[sample.id]
      }));

    } catch (error) {
      console.error('Like action failed:', error);
    }
  };

  useEffect(() => {
    const initialStatus: Record<number, boolean> = {};
    samples.forEach(sample => {
      initialStatus[sample.id] = sample.userInfo?.isLiked || false;
    });
    setLocalLikedStatus(initialStatus);
  }, [samples]);

  return (
    <>
      <table
        className="divide-y divide-[#1F1F1F] border-t border-[#1F1F1F] w-full"
        style={{ width: "100%" }}
      >
        <thead>
          <tr>
            <th
              scope="col"
              className="py-3.5 pl-4 pr-3 text-left text-sm font-normal text-softGray sm:pl-4"
            >
              Sample
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-normal text-softGray"
            >
              Filename
            </th>
            {/* <th scope="col" className="px-3 py-3.5 text-left text-sm font-normal text-softGray"></th> */}
            <th
              scope="col"
              className="meta-sample px-3 py-3.5 text-center text-sm font-normal text-softGray"
            >
              Time
            </th>
            <th
              scope="col"
              className="meta-sample px-3 py-3.5 text-center text-sm font-normal text-softGray"
            >
              Key
            </th>
            <th
              scope="col"
              className="meta-sample px-3 py-3.5 text-center text-sm font-normal text-softGray"
            >
              BPM
            </th>
            {/* <th
              scope="col"
              className="meta-sample px-3 py-3.5 text-left text-sm font-normal text-softGray"
            >
              Status
            </th> */}
            <th
              scope="col"
              className="considering-avatar px-3 py-3.5 text-center text-sm font-normal text-softGray"
            >
              Considering
            </th>
            <th
              scope="col"
              className="px-3 py-3.5 text-left text-sm font-normal text-softGray"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="">
          {samples &&
            Object.values(samples).map((sample: any, map_index) => {
              return (
                  <tr
                    id="play-button"
                    ref={(el) => (rowRefs.current[map_index] = el)}
                    key={map_index}
                    style={{ height: '52px' }}
                    className={`border-b border-[#1F1F1F] hover:bg-[#1F1F1F] ${
                      currPlayingId === sample.id ? "bg-[#1F1F1F]" : ""
                    }`}
                    onClick={(e) => {
                      if (isConnect){
                        const target =
                          e.target instanceof Element ? e.target : null;
                        const clickedTd = target?.closest("td");
                        if (
                          clickedTd &&
                          clickedTd.classList.contains("playable-td")
                        ) {
                          handleMusicRowClick(e, sample, map_index);
                        }
                    }
                    }}
                  >
                    {/* Thumbnail */}
                    <td className="onboard-5 whitespace-nowrap px-3 py-4 text-sm playable-td">
                      <div className="flex items-center gap-5">
                        <div className="w-8 h-8 rounded-[4px] flex justify-center items-center border border-charcoalGray bg-gunMetal text-charcoalGray">
                          <MusicIcon />
                        </div>
                        <div className="relative w-4 h-4 cursor-pointer group">
                          {/* Play icon - shown on hover */}
                          <img
                            src={playIcon}
                            alt="Play"
                            className="absolute top-0 left-0 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                          />
                          {/* Wave or beam icon - hidden on hover */}
                          <div className="absolute top-0 left-0 w-4 h-4 group-hover:opacity-0 transition-opacity duration-200">
                            {currPlayingId === sample.id ? (
                              <AnimatedWaveGraphic
                                playing={
                                  isPlaying && currPlayingId === sample.id
                                }
                              />
                            ) : (
                              <img
                                src={musicBeam}
                                alt="Music"
                                className="w-4 h-4"
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Sample info */}
                    <td
                      className={`playable-td row-play px-3 py-4 text-xs text-mediumGray font-['Mona-Sans-M'] max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap ${
                        currPlayingId === sample.id
                          ? "text-white"
                          : "text-mediumGray "
                      }`}
                      data-index={map_index}
                      onClick={() => {}}
                    >
                      {sample.filename}
                      <br />
                      <span className="text-[10px] font-semibold text-coolGray">
                        {sample?.collaborators?.find(
                          (composer) => composer.id === sample.owner_id
                        )?.professional_name || ""}
                      </span>
                    </td>

                    {/* Sample Duration */}
                    <td
                      className={`playable-td meta-sample whitespace-nowrap px-3 py-4 text-sm text-center font-normal ${
                        currPlayingId === sample.id
                          ? "text-white"
                          : "text-mediumGray "
                      }`}
                    >
                      {formatDuration(sample?.length)}
                    </td>
                    {/* Sample Key */}
                    <td className="meta-sample whitespace-nowrap px-3 py-4 text-sm text-mediumGray text-center font-normal">
                      {sample?.key || "--"}
                    </td>
                    {/* Sample BPM */}
                    <td className="meta-sample whitespace-nowrap px-3 py-4 text-sm text-mediumGray text-center font-normal">
                      {sample?.bpm || "--"}
                    </td>

                    {/* Considering List */}
                    <td className="considering-avatar whitespace-nowrap text-sm text-mediumGray text-center px-3 py-4">
                      {consideringData[sample.id]?.length > 0 ? (
                        <div className="flex flex-wrap items-center justify-center gap-2.5 ">
                          <div className="flex items-center justify-center">
                            {consideringData[sample.id]
                              .slice(0, 3)
                              .map((person: any, index: number) => (
                                <div className={`flex border-[0.5px] rounded-full border-[#292929] ${index === 0 ? 'ml-0' : '-ml-[8px]'}`}>
                                  <Thumbnail professionalName={person.user.professional_name} thumbnail={person.user.thumbnail} userId={person.user.id} size="24"/>
                                </div>
                              ))}
                          </div>
                          {consideringData[sample.id].length > 3 && (
                            <span
                              onClick={() => {
                                setSelectedSampleId(sample.id);
                                setConsidering(true);
                              }}
                              className="cursor-pointer text-xs text-dimGray font-['Mona-Sans-M']"
                            >
                              View All
                            </span>
                          )}
                        </div>
                      ) : (
                        "--"
                      )}
                    </td>

                    <td
                      className={
                        "whitespace-nowrap px-3 py-4 text-sm text-gray-300"
                      }
                    >
                      <div className="flex items-center gap-4">
                        
                        <span 
                          onClick={(e) => handleLike(e, sample)}
                          className={`${!isConnect ? 'opacity-40 pointer-events-none' : ''}`}
                          title={!isConnect ? "Connect wallet to like" : ""}
                        >
                          {localLikedStatus[sample.id] ? (
                            <IoMdHeart
                              className={`text-[16px] cursor-pointer ${
                                currPlayingId === sample.id
                                  ? "text-white"
                                  : "text-mediumGray"
                              }`}
                            />
                          ) : (
                            <IoMdHeartEmpty
                              className={`text-[16px] cursor-pointer ${
                                currPlayingId === sample.id
                                  ? "text-white"
                                  : "text-mediumGray"
                              }`}
                            />
                          )}
                        </span>
                        <a 
                          href={sample.s3_key} 
                          onClick={(e) => handleDownload(e, sample)}
                          className={`${!isConnect ? 'opacity-40 pointer-events-none' : ''}`}
                          title={!isConnect ? "Connect wallet to download" : ""}
                        >
                          <FiDownload
                            className={`text-[16px] cursor-pointer  ${
                              currPlayingId === sample.id
                                ? "text-white"
                                : "text-mediumGray "
                            }`}
                          />
                        </a>

                        <div className={`dropdown-container z-0 ${!isConnect ? 'opacity-40 pointer-events-none' : ''}`}>
                          <DropDown
                            {...{
                              sample,
                              play: true,
                              index: map_index,
                              getSamples: "getSamples",
                              fetchAllUserSamples,
                              is_owner: sample?.userInfo?.isOwner,
                              // page={current_page}
                              // sound={sound}
                              disabled: !isConnect
                            }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
              );
            })}
        </tbody>
      </table>

      <ConsideringModal
        considering={considering}
        setConsidering={setConsidering}
        sampleId={selectedSampleId}
      />

      <div className="pb-[42px]"></div>
      {currTrack && (
        <AudioPlayer
          currTrack={currTrack}
          isPlaying={isPlaying}
          onPlayToggle={() => handlePlayToggle(currTrack, currPlayingIdx)} // Pass the parameters
          onPrevClick={() => handlePrevTrack()} // Handle previous track
          onNextClick={() => handleNextTrack()} // Handle next track
        />
      )}
    </>
  );
};

export default SampleTable;
