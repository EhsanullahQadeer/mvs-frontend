/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import DropDown from "components/util/dropdown";
import AudioPlayer from "./player";
import { useCallback, useEffect, useRef, useState } from "react";
import musicBeam from "../../../assets/icons/musicBeam.svg";
import playIcon from "../../../assets/icons/playIcon.svg";
import musicIcon from "../../../assets/icons/musicIcon.svg";
import { AudioTrackType } from "../player-container";
import { AudioTrack, useWaveform } from "./waveform";
import { AnimatedWaveGraphic } from "./wave-graphic";
import { Avatar } from "@mui/material";
import artistimg from "../../../assets/img/artistImg.png";
import { IoMdHeartEmpty } from "react-icons/io";
import { FiDownload } from "react-icons/fi";

const sampleData = [
  { image: artistimg },
  { image: artistimg },
  { image: artistimg },
  { image: artistimg },
  { image: artistimg },
];
const SampleTable = (props: any) => {
  const { samples, fetchAllUserSamples } = props;

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
  } = useWaveform();
  // const { currentTrack, playTrack, isPaused, pauseTrack } = useContext(PlayerContext);

  const [currPlayingId, setCurrentPlaying] = useState(0);
  const [currPlayingIdx, setCurrentPlayingIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currTrack, setTrack] = useState(null);
  const [Play, setPlay] = useState(false);

  // Load all the tracks at once when the component mounts to show their waveforms
  useEffect(() => {
    const trackSources = Object.values(samples).map((sample: any) => ({
      id: sample.id,
      src: sample.s3_key,
      duration: sample.duration,
    }));
    loadTracks(trackSources, { reset: true });
  }, [samples, loadTracks]);

  const handlePlayToggle = (
    sample: AudioTrackType,
    clickedSampleIndex: number
  ) => {
    const audio_track: AudioTrack = {
      id: sample.id, // Set the id from currentSample
      src: sample.s3_key, // Set the src from currentSample
    };
    if (!current || current.id !== sample.id) {
      // If no track is currently playing, or a new track is selected
      setCurrentPlaying(sample.id);
      setCurrentPlayingIndex(clickedSampleIndex);
      armTrack(sample.id); // Arm the track first
      setTrack(sample); // Set the track for the UI to update
      playTrack(audio_track); // Play the track after arming
      setIsPlaying(true);
      setPlay(true);
    } else {
      // Toggle play/pause for the currently selected track
      if (isPlaying) {
        pauseTrack(); // Pause if the track is currently playing
      } else {
        playTrack(audio_track); // Play the track after arming
      }
      setIsPlaying(!isPlaying); // Toggle the isPlaying state
    }
  };

  const handlePrevTrack = () => {
    if (currPlayingIdx > 0) {
      const prevIndex = currPlayingIdx - 1;
      const prevSample = Object.values(samples)[prevIndex] as AudioTrackType;
      const audio_track: AudioTrack = {
        id: prevSample.id,
        src: prevSample.s3_key,
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
        src: nextSample.s3_key,
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
          src: sample.s3_key, // Set the src from currentSample
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
      } else if (event.code === "Space" || event.key === " ") {
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
            src: currentSample.s3_key,
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
              className="considering-avatar px-3 py-3.5 text-left text-sm font-normal text-softGray"
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
              const considering_list =
                samples[map_index]?.considering?.split(",") || [];
              return (
                <>
                  <tr
                    key={sample.id}
                    id={`sample-item-${sample.id}`}
                    className={`whitespace-nowrap px-3 py-4 text-sm text-gray-300 row-hover ${
                      currPlayingId === sample.id ? "active-sample" : ""
                    }`}
                    ref={(el) => (rowRefs.current[map_index] = el)}
                    onClick={(e) => {
                      const target =
                        e.target instanceof Element ? e.target : null;
                      const clickedTd = target?.closest("td");

                      if (
                        clickedTd &&
                        clickedTd.classList.contains("playable-td")
                      ) {
                        handleMusicRowClick(e, sample, map_index);
                      }
                    }}
                  >
                    {/* Thumbnail */}
                    <td className="onboard-5 whitespace-nowrap px-3 py-4 text-sm playable-td">
                      <div className="flex items-center gap-5">
                        <div className="w-8 h-8 rounded-[4px] flex justify-center items-center border border-charcoalGray bg-gunMetal">
                          <img src={musicIcon} alt="musicIcon" />
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
                        {sample.collaborators.find(
                          (composer) => composer.id === sample.owner_id
                        )?.professional_name || ""}
                      </span>
                    </td>

                    {/* Waveform */}
                    {/* <td className="meta-sample whitespace-nowrap px-3 py-4 text-sm text-gray-300 text-center">
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="h-[50px]">
                        {tracks.find((t) => t.id === sample.id) && (
                            <Waveform
                            track={tracks.find((t) => t.id === sample.id)}
                            trackDuration={sample.length}
                            columns={60}
                            hover_cursor={false}
                            options={{
                              colors: {
                                default: 'white',
                              },
                              activeHeight: '0%',
                              radius: '5px',
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </td> */}

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
                      {sample?.keys || "--"}
                    </td>
                    {/* Sample BPM */}
                    <td className="meta-sample whitespace-nowrap px-3 py-4 text-sm text-mediumGray text-center font-normal">
                      {sample?.bpm || "--"}
                    </td>

                    {/* <td className="meta-sample whitespace-nowrap px-3 py-4 text-sm text-mediumGray text-center">
                      <span className="bg-blackMarbel border-[1px] border-[#222222] rounded-lg text-white px-2 py-1 flex gap-1.5 w-max items-center">
                        <div
                          className={`w-[7px] h-[7px] rounded-full bg-[#25BA00]`}
                        ></div>
                        <span className="text-xs font-semibold text-mediumGray">
                          Available
                        </span>
                      </span>
                    </td> */}

                    {/* Considering List */}
                    <td className="considering-avatar whitespace-nowrap text-sm text-mediumGray text-center px-3 py-4">
                      <div className="flex flex-wrap items-center justify-center gap-2.5">
                        <div className="flex items-center justify-center">
                          {considering_list.length > 0
                            ? considering_list
                                .slice(0, 3)
                                .map((person, index) => {
                                  return (
                                    <Avatar
                                      key={index}
                                      className={`flex cursor-pointer ${
                                        index === 0 ? "ml-0" : "-ml-[8px]"
                                      }`}
                                      sx={{
                                        width: "24px",
                                        height: "24px",
                                        border: "0.5px solid #292929",
                                      }}
                                      src={person.image}
                                      onClick={() => {
                                        // setSample(x);
                                        // setConsidering(true);
                                      }}
                                    />
                                  );
                                })
                            : sampleData.slice(0, 3).map((person, index) => (
                                <Avatar
                                  key={index}
                                  className={`flex cursor-pointer ${
                                    index === 0 ? "ml-0" : "-ml-[8px]"
                                  }`}
                                  sx={{
                                    width: "24px",
                                    height: "24px",
                                    border: "0.5px solid #292929",
                                  }}
                                  src={person.image}
                                />
                              ))}
                        </div>
                        <span
                          onClick={() => {
                            // setSample(x);
                            // setConsidering(true);
                          }}
                          className="cursor-pointer text-xs text-dimGray font-['Mona-Sans-M']"
                        >
                          View All
                        </span>
                      </div>
                    </td>

                    <td
                      className={
                        "whitespace-nowrap px-3 py-4 text-sm text-gray-300"
                      }
                    >
                      <div className="flex items-center gap-4">
                        {/* <div className="onboard-7 toggle-container">
                        {parseInt(sample.is_liked) === 1 ? (
                          <Toggle is_liked={true} sample={x} />
                        ) : (
                          <Toggle is_liked={false} sample={x} />
                        )}
                      </div> */}

                        {/* <a
                        href="#"
                        className="onboard-8 download-link cursor-pointer"
                        onClick={async (e) => {
                          // e.preventDefault();
                          // const FileSaver = require("file-saver");
                          // await saveSampleDownloadAPI(x.id);
                          // FileSaver.saveAs(sample.sample_src, sample.filename);
                        }}
                        rel="noreferrer"
                        download
                        target="_blank">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none">
                          <path
                            d="M12 8V16M12 16L8 12M12 16L16 12M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                            stroke="#CDCDCD"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"/>
                        </svg>
                      </a> */}
                        <span>
                          <IoMdHeartEmpty
                            className={`text-[16px] cursor-pointer  ${
                              currPlayingId === sample.id
                                ? "text-white"
                                : "text-mediumGray "
                            }`}
                          />
                        </span>
                        <a href={sample.s3_key} download={sample.filename}>
                          <FiDownload
                            className={`text-[16px] cursor-pointer  ${
                              currPlayingId === sample.id
                                ? "text-white"
                                : "text-mediumGray "
                            }`}
                          />
                        </a>

                        <div className="dropdown-container">
                          <DropDown
                            {...{
                              sample,
                              play: true,
                              index: map_index,
                              getSamples: "getSamples",
                              fetchAllUserSamples,
                              // page={current_page}
                              // sound={sound}
                            }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>

      <div className="pb-[42px]"></div>
      {/* `Show Considering` Button Clicked */}
      {/* {ConsideringModal && (
        <ConsideringModal
          openModal={considering}
          setModal={setConsidering}
          sample={sample}
        />
      )}
      {/* Bottom audio player */}
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
