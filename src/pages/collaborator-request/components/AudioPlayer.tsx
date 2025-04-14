import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import stars from "../../../assets/img/stars.svg";

interface AudioPlayerProps {
  audioUrl: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl }) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (waveformRef.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#363A3F",
        progressColor: "#D0D8E3",
        cursorColor: "transparent",
        barWidth: 3,
        barGap: 3,
        height: 88,
        barRadius: 0,
        normalize: true,
        backend: "WebAudio",
        fillParent: true,
        minPxPerSec: 1,
        interact: true,
        hideScrollbar: true,
        barAlign: 'bottom'
      });

      wavesurfer.current.load(audioUrl);

      const updateProgress = () => {
        if (wavesurfer.current) {
          const currentTime = wavesurfer.current.getCurrentTime();
          const duration = wavesurfer.current.getDuration() || 1;
          setProgress((currentTime / duration) * 100);
        }
      };

      wavesurfer.current.on("timeupdate", updateProgress);

      // @ts-ignore - WaveSurfer types are incomplete for these events
      wavesurfer.current.on("seek", (progress: number) => {
        setProgress(progress * 100);
      });

      // Handle seeking and clicking on waveform
      wavesurfer.current.on("interaction", () => {
        updateProgress();
        wavesurfer.current.playPause();
      });

      return () => {
        if (wavesurfer.current) {
          wavesurfer.current.destroy();
        }
      };
    }
  }, [audioUrl]);

  return (
    <div
      style={{
        backgroundImage: `url(${stars})`,
        backgroundSize: "cover",
      }}
      className=" rounded-lg w-full"
    >
      <div className="relative">
        <div className="h-[177px] relative">
          <div 
            ref={waveformRef} 
            className="absolute bottom-0 left-0 right-0 [&>wave]:absolute [&>wave]:bottom-0" 
          />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{
          background: `linear-gradient(to right, #D0D8E3 ${progress}%, #363A3F ${progress}%)`
        }} />
      </div>
    </div>
  );
};

export default AudioPlayer;
