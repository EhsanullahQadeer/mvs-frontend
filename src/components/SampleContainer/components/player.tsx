/*************************************************************************
 * @file SampleContainer/components/sample-player.tsx
 * @author End Quote
 * @desc Audio player component for sample tracks with waveform visualization
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import WaveformPlayer from "components/AudioPlayer/audio-player";
import { useContext, useEffect, useState, useCallback } from "react";
import { PlayerContext } from "../player-container";
import skipBack from '../../../assets/img/player/skip-back.svg';
import skipNext from '../../../assets/img/player/skip-forward.svg';
import pauseButton from '../../../assets/img/player/pause-circle.svg';
import playButton from '../../../assets/img/player/play-circle.svg';
import musicBeam from "../../../assets/icons/musicBeam.svg";
import { useWaveform, Waveform, waveformCtx } from "./waveform";

const AudioPlayer = ({ audio_track, currTrack, isPlaying, onPlayToggle, onPrevClick, onNextClick }) => {
  // const { currentTrack, isPlaying, playTrack, pauseTrack } = useContext(PlayerContext);

  // States for handling playback and volume
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [currentSampleIndex, setCurrentSampleIndex] = useState(0);

  // Handlers for skipping tracks
  const handlePrevClick = () => {
    console.log('Previous track');
    // Logic to switch to the previous track
  };

  const handleNextClick = () => {
    console.log('Next track');
    // Logic to switch to the next track
  };

  // Volume control
  const handleVolumeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newVolume = parseInt(event.target.value);
    setVolume(newVolume);
    // Update the audio volume here, e.g., using audio element or context
  };

  // Handlers for dragging the volume slider
  const handleMouseMove = (
    event: MouseEvent
  ) => {
    const slider = document.querySelector('.volume-slider')!.getBoundingClientRect();
    const newVolume = Math.max(0, Math.min(100, ((event.clientX - slider.left) / slider.width) * 100));
    setVolume(newVolume);
  };
  const [progress, setProgress] = useState(0); // State to track audio progress percentage
  const [duration, setDuration] = useState(0); // To store the actual duration

  const handleMouseDown = () => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };
  const { audioRef, metadata } = useContext(waveformCtx); // Get audioRef and metadata from context

  const handleMouseUp = () => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    // Clean up listeners on unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseUp]);

  // Update progress using requestAnimationFrame for smooth updates
  const updateProgress = () => {
    if (audioRef.current && audioRef.current.duration > 0) {
      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      setProgress((currentTime / duration) * 100); // Calculate percentage
      setDuration(duration); // Set the correct duration
    }
    requestAnimationFrame(updateProgress); // Continuously update using requestAnimationFrame
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('loadedmetadata', () => {
        if (audioRef.current) {
          setDuration(audioRef.current.duration); // Set duration when metadata is loaded
        }
      });

      // Start progress updates with requestAnimationFrame
      requestAnimationFrame(updateProgress);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('loadedmetadata', () => {});
      }
    };
  }, [audioRef]);

  const segments = 10000; // Number of segments for the progress bar
  const segmentArray = Array.from({ length: segments }, (_, i) => i);


  return (
    <div className="bottom-audio-player" style={{ borderTop: '2px solid #1F1F1F', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

         {/* Control buttons and waveform */}
         <div className="mx-5" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {/* Previous, Play/Pause, and Next buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
          <div className="control-container">
            <button className="control-button pr-2" onClick={onPrevClick}>
              <img src={skipBack} alt="Previous" />
            </button>
            <button className="control-button" onClick={onPlayToggle}>
              {isPlaying ? (
                <img src={pauseButton} alt="Pause" />
              ) : (
                <img src={playButton} alt="Play" />
              )}
            </button>
            <button className="control-button pl-2" onClick={onNextClick}>
              <img src={skipNext} alt="Next" />
            </button>
          </div>
        </div>

      {/* Segmented progress bar */}

      <div
        >

      </div>

      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '3px',
          backgroundColor: '#ccc',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        {segmentArray.map((segment) => {
          const segmentWidth = 100 / segments; // Width of each segment in percentage
          const segmentProgress = (segment / segments) * 100; // Progress represented by this segment

          // Determine the color based on the progress
          const backgroundColor = progress >= segmentProgress ? '#9EFF00' : '#101113';

          return (
            <div
              key={segment}
              style={{
                width: `${segmentWidth}%`, // Equal width for each segment
                height: '100%',
                backgroundColor,
              }}
            />
          );
        })}
      </div>

      {/* Audio Player Component */}
      {/* <div className="h-[50px]" style={{ marginLeft: '20px' }}>
        <Waveform
          track={audio_track}
          columns={120}
          hover_cursor={true}
          options={{
            colors: {
              default: 'white',
            },
            activeHeight: '0%',
            radius: '50px',
          }}
        />
      </div> */}
    </div>

    <div className="border-l border-r border-eclipseGray p-4 flex gap-2 items-center">
      <div className="h-8 w-8">
        <img src={currTrack?.thumbnail} alt="thumbnail" className="w-full h-full" />
      </div>

      <div className="h-6 w-6">
        <img src={musicBeam} alt="musicBeam" className="w-full h-full" />
      </div>

      <div>
      <div className="text-white text-sm font-normal">
          {currTrack?.filename}
        </div>
        <div className="text-dimGray text-sm font-normal">
          {/* {currTrack?.collaborators[0].artist_name} */}
        </div>
      </div>
    </div>
      
      {/* <div style={{ position: 'sticky', left: 0 }}>
        <div className="sample-container">
          <div className="album-art">
            <img src={currTrack?.thumbnail || ''} alt="Album Art" />
          </div>
          <div className="album-details">
            <div className="album-name">{currTrack?.filename}</div>
            <div className="album-author">{currTrack?.composers[0].artist_name}</div>
          </div>
        </div>
      </div> */}

    {/* <div style={{ paddingLeft: '70px' }}></div> */}

   

      {/* Volume Control */}
        <div className="volume-container mx-5 max-w-max">
          {/* Volume Button */}
          <button className="volume-button">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
            </svg>
          </button>
          <div className="volume-slider-wrapper">
            <input type="range" min="0" max="100" className="volume-input" onChange={handleVolumeChange} value={volume} />
            <div className="volume-slider" onMouseDown={handleMouseDown}>
              <div className="volume-level" style={{ width: `${volume}%` }}></div>
            </div>
          </div>
        </div>

    </div>
  );
};

export default AudioPlayer;