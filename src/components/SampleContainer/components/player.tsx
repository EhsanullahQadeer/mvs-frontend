/*************************************************************************
 * @file SampleContainer/components/sample-player.tsx
 * @author End Quote
 * @desc Audio player component for sample tracks with waveform visualization
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import skipBack from "../../../assets/img/player/skip-back.svg";
import skipNext from "../../../assets/img/player/skip-forward.svg";
import pauseButton from "../../../assets/img/player/pause-circle.svg";
import playButton from "../../../assets/img/player/play-circle.svg";
import { waveformCtx } from "./waveform";
import { AnimatedWaveGraphic } from "./wave-graphic";
import "./player.scss";

const AudioPlayer = ({
  currTrack,
  isPlaying,
  onPlayToggle,
  onPrevClick,
  onNextClick,
  compact = false,
}) => {
  const { collaborators, filename } = currTrack || {};
  const bottomAudioPlayerRef = useRef<HTMLDivElement>(null);
  const [trackId, setTrackId] = useState<number | null>(null);
  const [changingTrack, setChangingTrack] = useState<boolean>(false);
  const [idle, setIdle] = useState<boolean>(true);
  const [playbackEnded, setPlaybackEnded] = useState<boolean>(false);
  const [volume, setVolume] = useState(0.5);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [prevVol, setPrevVol] = useState(0.5);
  const { audioRef, current } = useContext(waveformCtx);
  const [sampleNameVisible, setSampleNameVisible] = useState(true);
  const [sampleTitleWidth, setSampleTitleWidth] = useState(0);
  const sampleTitleWidthRef = useRef(sampleTitleWidth); // Ref to hold the latest value

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(prevVol);
      if (audioRef.current) {
        audioRef.current.volume = prevVol;
      }
    } else {
      setPrevVol(volume);
      setVolume(0);
      if (audioRef.current) {
        audioRef.current.volume = 0;
      }
    }
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    let animationFrameId: number;

    const updateProgress = () => {
      if (audioRef.current) {
        if (audioRef.current.duration > 0) {
          const currentTime = audioRef.current.currentTime;
          setProgress((currentTime / audioRef.current.duration) * 100);
        }

        animationFrameId = requestAnimationFrame(updateProgress);
      }
    };

    const startProgressUpdate = () => {
      if (audioRef.current && !audioRef.current.paused) {
        animationFrameId = requestAnimationFrame(updateProgress);
      }
    };

    const stopProgressUpdate = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
    if (audioRef.current) {
      audioRef.current.addEventListener("play", startProgressUpdate);
      audioRef.current.addEventListener("pause", stopProgressUpdate);
      audioRef.current.addEventListener("ended", stopProgressUpdate);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("play", startProgressUpdate);
        audioRef.current.removeEventListener("pause", stopProgressUpdate);
        audioRef.current.removeEventListener("ended", stopProgressUpdate);
      }
      stopProgressUpdate();
    };
  }, [audioRef, current]);

  // Needed to reset the progress bar in the bottom audio player
  const changeTrack = useCallback(() => {
    const current = bottomAudioPlayerRef.current;
    if (current) {
      current.style.setProperty("--progress-animation", "none");
      current.style.setProperty("--progress-content", "none");
    }
    setChangingTrack(true);
    setPlaybackEnded(false);
    setIdle(true);
    setProgress(0);
    setTimeout(() => {
      if (current) {
        current.style.setProperty("--progress-content", "");
        current.style.setProperty(
          "--progress-animation",
          "audio-progress-line"
        );
      }
      setChangingTrack(false);
    });
  }, [bottomAudioPlayerRef]);

  // Needed to reset the progress bar in the bottom audio player
  useEffect(() => {
    if (currTrack && currTrack.id !== trackId) {
      setTrackId(currTrack?.id);
      changeTrack();
    }
  }, [changeTrack, currTrack, trackId]);

  // Left & Right Arrow Key Functionality
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (audioRef.current && audioRef.current.duration > 0) {
        let currentTime = audioRef.current.currentTime;

        if (event.key === "ArrowLeft") {
          currentTime -= audioRef.current.duration * 0.07;
          if (currentTime < 0) {
            currentTime = 0;
          }
        } else if (event.key === "ArrowRight") {
          currentTime += audioRef.current.duration * 0.07;
          if (currentTime > audioRef.current.duration) {
            currentTime = audioRef.current.duration;
          }
        }
        audioRef.current.currentTime = currentTime;
        setProgress((currentTime / audioRef.current.duration) * 100);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [audioRef]);

  // Updates the CSS property for song progress so that bottom audio player progress bar syncs properly
  useEffect(() => {
    const current = bottomAudioPlayerRef.current;
    if (current) {
      current.style.setProperty("--progress-width", `${progress}%`);
    }
  }, [progress]);

  // Sets variables for idling
  useEffect(() => {
    let current = audioRef.current || null;

    if (current) {
      current.addEventListener("ended", () => {
        setPlaybackEnded(true);
      });
      current.addEventListener("play", () => {
        // Sets the sample name width globally, this will be used for window resizing. Dynamic and changes with each song.
        setSampleTitleWidth(
          document.getElementById("trackInfo").getBoundingClientRect().width
        );
        setIdle(false);
      });
    }

    return () => {
      current = null;
    };
  }, [audioRef, sampleTitleWidth, current]);

  // Horizontal window resize handler. Will only hide the sample name. Keeps control buttons and volume control.
  const handleResize = () => {
    if (sampleTitleWidthRef.current !== 0) {
      setSampleNameVisible(
        window.innerWidth >= sampleTitleWidthRef.current + 303
      );
    } else {
      setSampleNameVisible(window.innerWidth >= sampleTitleWidth + 303);
    }
  };

  // This effect will run whenever `sampleTitleWidth` changes
  // For window resize handling
  useEffect(() => {
    setSampleTitleWidth(sampleTitleWidth);
    sampleTitleWidthRef.current = sampleTitleWidth;
  }, [sampleTitleWidth]); // Only run when sampleTitleWidth changes

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize(); // Check visibility on initial mount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const className = [
    compact ? "" : "bottom-audio-player",
    ...(isPlaying ? ["bottom-audio-player--playing"] : []),
    ...(changingTrack ? ["bottom-audio-player--switch"] : []),
    ...(playbackEnded ? ["bottom-audio-player--completed"] : []),
    ...(idle ? ["bottom-audio-player--idle"] : []),
  ].join(" ");

  return (
    <div
      className={className}
      ref={bottomAudioPlayerRef}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: compact ? "600px" : "100%",
        marginRight: compact ? "20px" : "0",
        position: compact ? "relative" : "fixed",
        bottom: compact ? "auto" : 0,
        left: compact ? "auto" : 0,
        right: compact ? "auto" : 0,
        backgroundColor: compact ? "transparent" : "#1A1A1A"
      }}
    >
      {/* Control buttons */}
      <div className="control-container">
        <button className="control-button pr-2" onClick={onPrevClick}>
          <img className="object-cover" src={skipBack} alt="Previous" />
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

      {/* Track Info and Waveform */}
      <div
        className="border-l border-r border-eclipseGFray p-4 flex gap-2 items-center"
        style={{
          display: sampleNameVisible ? "flex" : "none",
          alignItems: "center",
        }}
        id="trackInfo"
      >
        <div className="h-8 w-8">
          {currTrack?.thumbnail && (
            <img
              src={currTrack.thumbnail}
              alt="thumbnail"
              className="w-full h-full"
            />
          )}
        </div>

        <div className="h-6 w-6">
          <AnimatedWaveGraphic playing={isPlaying} />
        </div>

        <div>
          <div className="text-white text-sm font-normal">{filename}</div>
          <div className="text-dimGray text-sm font-normal">
            {/* {collaborators[0]?.artist_name} */}
          </div>
        </div>
      </div>

      {/* Volume Control */}
      <div
        className="volume-container mx-5 max-w-max"
        style={{ display: "flex", alignItems: "center" }}
      >
        <button className="volume-button" id="muteButton" onClick={toggleMute}>
          {isMuted || volume === 0 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
              />
            </svg>
          )}
        </button>
        <div className="volume-slider-wrapper">
          <input
            id="volume-level"
            type="range"
            min="0"
            max="1"
            step="0.02"
            onChange={handleVolumeChange}
            value={volume}
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
