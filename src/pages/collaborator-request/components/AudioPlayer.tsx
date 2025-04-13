import React, { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import stars from "../../../assets/img/stars.svg";

interface AudioPlayerProps {
  audioUrl: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl }) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);

  useEffect(() => {
    if (waveformRef.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#363A3F", // Unplayed wave color
        progressColor: "#D0D8E3", // Played wave color
        cursorColor: "transparent",
        barWidth: 2,
        barGap: 1,
        height: 177,
        barRadius: 0,
        normalize: true,
        backend: "WebAudio",
      });

      wavesurfer.current.load(audioUrl);

      // Handle play/pause when clicking on the waveform
      wavesurfer.current.on("interaction", () => {
        wavesurfer.current?.playPause();
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
        backgroundPosition: "center",
      }}
      className="pt-[80px] md:pt-[120px] rounded-lg w-full"
    >
      <div ref={waveformRef} className="w-full cursor-pointer" />
    </div>
  );
};

export default AudioPlayer;
