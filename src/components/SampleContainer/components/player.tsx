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
import playButton from '../../../assets/img/player/play-circle.svg'
import { useWaveform, Waveform } from "./waveform";

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

  const handleMouseDown = () => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

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


  console.log('currtrack', currTrack);
  return (
    <div className="bottom-audio-player" style={{ borderTop: '2px solid #1F1F1F', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ position: 'sticky', left: 0 }}>
        <div className="sample-container">
          <div className="album-art">
            <img src={currTrack?.thumbnail || ''} alt="Album Art" />
          </div>
          <div className="album-details">
            <div className="album-name" title={currTrack?.filename}>{audio_track?.title ?? 'Album Name'}</div>
            <div className="album-author">{audio_track?.artists ?? 'Author Name'}</div>
          </div>
        </div>
      </div>

    {/* <div style={{ paddingLeft: '70px' }}></div> */}

      {/* Control buttons and waveform */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {/* Previous, Play/Pause, and Next buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '60px'}}>
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

      {/* Audio Player Component */}
      <div className="h-[50px]" style={{ marginLeft: '20px' }}>
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
      </div>
    </div>

      {/* Volume Control */}
      <div>
        <div className="volume-container" style={{ 
          paddingLeft: '100px', paddingRight: '250px', minWidth: '500px', maxWidth: '500px', 
          position: 'sticky'}}>
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

    </div>
  );
};

export default AudioPlayer;