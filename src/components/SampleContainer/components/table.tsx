/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import DropDown from "components/util/dropdown";
import AudioPlayer from "./player";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import playButton from '../../../assets/img/player/play-circle.svg'
import pauseButton from '../../../assets/img/player/pause-circle.svg'
import { AudioTrackType } from "../player-container";
import { AudioTrack, useWaveform, Waveform } from "./waveform";
import Avatar from "react-avatar"; 


const SampleTable = ( 
  samples
) => {

  const rowRefs = useRef<Array<HTMLTableRowElement | null>>([]);
  const formatDuration = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const paddedMinutes = minutes.toString().padStart(2, '0');
    const paddedSeconds = seconds.toString().padStart(2, '0');
  
    if (hours > 0) {
      return `${hours}:${paddedMinutes}:${paddedSeconds}`; // Show hours only if they are greater than 0
    }
    
    return `${minutes}:${paddedSeconds}`; // If no hours, show MM:SS
  };  

  const { loadTracks, armTrack, tracks, current, loading, playTrack, pauseTrack } = useWaveform();
  // const { currentTrack, playTrack, isPaused, pauseTrack } = useContext(PlayerContext);

  const [currPlayingId, setCurrentPlaying] = useState(0);
  const [currPlayingIdx, setCurrentPlayingIndex] = useState(0);
  const [isPlaying, setPlaying] = useState(false); 
  const [currTrack, setTrack] = useState(null);

  // Load all the tracks at once when the component mounts to show their waveforms
  useEffect(() => {
    const trackSources = Object.values(samples.samples).map((sample: any) => ({
      id: sample.id,
      src: sample.s3_key,
      duration: sample.duration
    }));
    loadTracks(trackSources, { reset: true });
  }, [samples, loadTracks]);

  
  const handlePlayToggle = (
    sample: AudioTrackType, 
    clickedSampleIndex: number
  ) => {
    const audio_track: AudioTrack = {
      id: sample.id,        // Set the id from currentSample
      src: sample.s3_key    // Set the src from currentSample
    };
    if (!current || current.id !== sample.id) {
      // If no track is currently playing, or a new track is selected
      setCurrentPlaying(sample.id);
      setCurrentPlayingIndex(clickedSampleIndex);
      armTrack(sample.id); // Arm the track first
      setTrack(sample); // Set the track for the UI to update
      playTrack(audio_track); // Play the track after arming
      setPlaying(true);
    } else {
      // Toggle play/pause for the currently selected track
      if (isPlaying) {
        pauseTrack(); // Pause if the track is currently playing
      } else {
        playTrack(audio_track); // Play the track after arming
      }
      setPlaying(!isPlaying); // Toggle the isPlaying state
    }
  };

  const handlePrevTrack = () => {
    if (currPlayingIdx > 0) {
      const prevIndex = currPlayingIdx - 1;
      const prevSample = Object.values(samples.samples)[prevIndex] as AudioTrackType;
      const audio_track: AudioTrack = {
        id: prevSample.id,
        src: prevSample.s3_key,
      };
  
      setCurrentPlaying(prevSample.id); // Set the previous track as the current one
      setCurrentPlayingIndex(prevIndex);
      setTrack(prevSample); // Update the current track in state
      armTrack(prevSample.id); // Arm the track
      playTrack(audio_track);  // Play the previous track
      setPlaying(true);
    }
  };

  const handleNextTrack = () => {
    if (currPlayingIdx < Object.values(samples.samples).length - 1) {
      const nextIndex = currPlayingIdx + 1;
      const nextSample = Object.values(samples.samples)[nextIndex] as AudioTrackType;
      const audio_track: AudioTrack = {
        id: nextSample.id,
        src: nextSample.s3_key,
      };
  
      setCurrentPlaying(nextSample.id); // Set the next track as the current one
      setCurrentPlayingIndex(nextIndex);
      setTrack(nextSample); // Update the current track in state
      armTrack(nextSample.id); // Arm the track
      playTrack(audio_track);  // Play the next track
      setPlaying(true);
    }
  };

  const handleKeyDown = useCallback(
    (event) => {
      const handleTrackSwitch = (
        sample: AudioTrackType, 
        index: number
      ) => {
        const audio_track: AudioTrack = {
          id: sample.id,        // Set the id from currentSample
          src: sample.s3_key    // Set the src from currentSample
        };
        setCurrentPlaying(sample.id); // Set the current playing track ID
        setCurrentPlayingIndex(index); // Update the playing index
        armTrack(sample.id); // Arm the track
        setTrack(sample); // Set the track for the UI to update
        playTrack(audio_track); // Play the track
        setPlaying(true); // Update play state to true
        // Scroll the current row into view
        if (rowRefs.current[index]) {
          rowRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      };
  
      if (event.key === "ArrowUp" || event.key === "ArrowDown"){
        event.preventDefault();
        if (event.key === "ArrowUp") {
          if (currPlayingIdx > 0) {
            const prevIndex = currPlayingIdx - 1;
            const prevSample = Object.values(samples.samples)[prevIndex] as AudioTrackType;
    
            if (isPlaying) {
              pauseTrack(); // Pause the current track first
              setPlaying(false); // Ensure UI reflects the paused state
              setTimeout(() => handleTrackSwitch(prevSample, prevIndex), 0); // Switch after pausing
            } else {
              handleTrackSwitch(prevSample, prevIndex); // Directly switch if no track is playing
            }
          }
        } else if (event.key === "ArrowDown") {
          if (currPlayingIdx < Object.values(samples.samples).length - 1) {
            const nextIndex = currPlayingIdx + 1;
            const nextSample = Object.values(samples.samples)[nextIndex] as AudioTrackType;
    
            if (isPlaying) {
              pauseTrack(); // Pause the current track first
              setPlaying(false); // Ensure UI reflects the paused state
              setTimeout(() => handleTrackSwitch(nextSample, nextIndex), 0); // Switch after pausing
            } else {
              handleTrackSwitch(nextSample, nextIndex); // Directly switch if no track is playing
            }
          }
        }
      } else if (event.code === "Space" || event.key === " ") {
        // Prevent the default scroll behavior of the spacebar
        event.preventDefault();
  
        const currentSample = Object.values(samples.samples)[currPlayingIdx] as AudioTrackType;
        const audio_track: AudioTrack = {
          id: currentSample.id,        // Set the id from currentSample
          src: currentSample.s3_key    // Set the src from currentSample
        };
        if (isPlaying) {
          pauseTrack(); // Pause the current track
          setPlaying(false); // Update UI to show pause button
        } else {
          armTrack(currentSample.id);     // Arm the track when spacebar is pressed
          playTrack(audio_track);         // Play the sample using the created AudioTrack object
          setPlaying(true); 
        }
      }
    },
    [currPlayingIdx, isPlaying, samples, pauseTrack, handlePlayToggle, armTrack, playTrack]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return(
    <>
      <table
        className="divide-y divide-[#1F1F1F] border-t border-[#1F1F1F] w-full"
        style={{ width: '100%' }}
      >
        <thead>
          <tr>
            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-4">Sample</th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Filename</th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white"></th>
            <th scope="col" className="meta-sample px-3 py-3.5 text-center text-sm font-semibold text-white">Time</th>
            <th scope="col" className="meta-sample px-3 py-3.5 text-center text-sm font-semibold text-white">Key</th>
            <th scope="col" className="meta-sample px-3 py-3.5 text-center text-sm font-semibold text-white">BPM</th>
            <th scope="col" className="considering-avatar px-3 py-3.5 text-center text-sm font-semibold text-white">Considering</th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">Actions</th>
          </tr>
          {samples && Object.values(samples.samples).map((sample: any, map_index) => {
            const considering_list = samples[map_index]?.considering?.split(',') || [];
            return(
              <>
                <tr
                  key={sample.id}
                  id={`sample-item-${sample.id}`}
                  className={`whitespace-nowrap px-3 py-4 text-sm text-gray-300 row-hover ${currPlayingId === sample.id ? 'active-sample' : ''}`}
                  ref={(el) => (rowRefs.current[map_index] = el)}  // Attach ref to each row
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentPlaying(sample.id);
                    setCurrentPlayingIndex(map_index);  
                    handlePlayToggle(sample, map_index);
                  }}
                >
                  {/* Thumbnail */}
                  <td className="onboard-5 whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'start',
                        alignItems: 'center',
                      }}
                    >
                      <div className="thumbnail-container">
                        <img
                          className={
                            currPlayingId !== sample.id
                              ? "thumbnail cursor-pointer mr-[32px]" 
                              : "play-pause-icon cursor-pointer mr-[32px]"
                          }
                          style={
                            currPlayingId !== sample.id
                              ? { width: '32px', height: '32px', borderRadius: '4px' }
                              : { width: '15px', height: '15px', borderRadius: '4px' }
                          }
                          src={
                            currPlayingId === sample.id
                              ? (isPlaying
                                  ? pauseButton
                                  : playButton )
                              : sample?.thumbnail
                          }
                          alt={
                            currPlayingId === sample.id
                              ? "Playing"
                              : "Thumbnail"
                          } 
                          onClick={async (e) => {
                          }}
                        />
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={20}
                        height={20}
                        viewBox="0 0 20 20"
                        fill="none">
                        <path
                          d="M1.66675 8.33333V10.8333M5.00008 5V14.1667M8.33342 2.5V17.5M11.6667 6.66667V12.5M15.0001 4.16667V15M18.3334 8.33333V10.8333"
                          stroke="#CECFDA"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </td>

                  {/* Sample info */}
                  <td
                    className="row-play whitespace-nowrap px-3 py-4 text-[14px] text-[#CECFDA] font-['Mona-Sans-M']"
                    data-index={map_index}
                    onClick={()=>{
                    }}
                    style={{
                      maxWidth: '252px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {sample.filename}
                    <br />
                    <span className="text-[12px] text-[#6f6f6f]">
                      {sample.composers.find(composer => composer.id === sample.owner_id)?.artist_name || ''}
                    </span>
                  </td>
                  
                  {/* Waveform */}
                  <td className="meta-sample whitespace-nowrap px-3 py-4 text-sm text-gray-300 text-center">
                    <div className="flex flex-col items-center justify-center h-full">
                      <div className="h-[50px]">
                        {tracks.find((t) => t.id === sample.id) && (
                          <Waveform
                            track={tracks.find((t) => t.id === sample.id)}
                            columns={120}
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
                  </td>

                  {/* Sample Duration */}
                  <td className="meta-sample whitespace-nowrap px-3 py-4 text-sm text-gray-300 text-center">
                    {formatDuration(sample?.length)}
                  </td>
                  {/* Sample Key */}
                  <td className="meta-sample whitespace-nowrap px-3 py-4 text-sm text-gray-300 text-center">
                    {sample?.keys}
                  </td>
                  {/* Sample BPM */}
                  <td className="meta-sample whitespace-nowrap px-3 py-4 text-sm text-gray-300 text-center">
                    {sample?.bpm}
                  </td>

                  {/* Considering List */}
                  <td className="considering-avatar whitespace-nowrap text-sm text-gray-300 text-center">
                    {
                      considering_list.length > 0 &&
                      considering_list.slice(0, 3).map((person, idx) => {
                        return (
                          <Avatar
                            key={idx}
                            name={person}
                            round={true}
                            title={person}
                            size="30"
                            className="flex ml-[5px] mb-[3px] cursor-pointer"
                            onClick={() => {
                              // setSample(x);
                              // setConsidering(true);
                            }}
                          />
                        );
                      })
                    }
                     <span
                      onClick={() => {
                        // setSample(x);
                        // setConsidering(true);
                      }}
                      className="cursor-pointer text-[10px] ml-[10px] mt-[10px] text-[#929292] underline font-['Mona-Sans-M']"
                      >
                        View All
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
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

                      <div className="dropdown-container">
                        <DropDown
                          sample={sample} 
                          index={map_index}
                          getSamples={"getSamples"}
                          // page={current_page}
                          // sound={sound}
                        /> 
                      </div>
                    </div>
                  </td>
                </tr>
              </>
            )
          })}
        </thead>
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
          audio_track={current}
          currTrack={currTrack}          
          isPlaying={isPlaying}
          onPlayToggle={() => handlePlayToggle(currTrack, currPlayingIdx)}  // Pass the parameters
          onPrevClick={() => handlePrevTrack()}  // Handle previous track
          onNextClick={() => handleNextTrack()}  // Handle next track
          />
      )}
    </>
  )
}

export default SampleTable;