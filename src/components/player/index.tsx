/* eslint-disable @typescript-eslint/no-unused-vars */
import AudioPlayer, {
  ActiveUI,
  PlayerPlacement,
  PlayListPlacement,
  ProgressUI,
  VolumeSliderPlacement
} from "react-modern-audio-player";
import { useEffect, useRef, useState } from "react";
import Editor from "./editor";
import React from "react";

type InitialStates = Omit<
  React.AudioHTMLAttributes<HTMLAudioElement>,
  "autoPlay"
> & {
	isPlaying?: false;
};

interface PlayerProps {
  playlist: any[]; // Replace `any` with a more specific type if possible
  currentSampleIndex: number;
  isPlaying: boolean;
  take: number;
}


export default React.memo(function Player(props: PlayerProps) {
  const [progressType, setProgressType] = useState<ProgressUI>("waveform");
  const [playerPlacement, setPlayerPlacement] = useState<PlayerPlacement>(
    "bottom-left"
  );
  const [interfacePlacement, setInterfacePlacement] = useState<
    any
  >({
        artwork: "row1-1",
        trackInfo: "row1-2",
        trackTimeCurrent: "row1-3",
        trackTimeDuration: "row1-4",
        progress: "row1-5",
  });
  const [playListPlacement, setPlayListPlacement] = useState<PlayListPlacement>(
    "bottom"
  );
  const [volumeSliderPlacement, setVolumeSliderPlacement] = useState<
    VolumeSliderPlacement
  >();
  const [theme, setTheme] = useState<"dark" | "light" | undefined>();
  const [width, setWidth] = useState("100%");
  const [activeUI, setActiveUI] = useState<ActiveUI>();
  const [audioKey, setAudioKey] = useState(props.currentSampleIndex);


useEffect(() => {
  console.log("Playlist or player state changed");
  console.log("props.currentSampleIndex: ", props.currentSampleIndex );
}, [props.playlist, props.currentSampleIndex, props.isPlaying]);

  useEffect(() => {
    // Code to handle updated playlist or reset the player state based on new data
    console.log("Playlist updated", props.playlist);
    // Perhaps reset the player or handle new playback logic here
  }, [props.playlist]);
  console.log('currentSampleIndex : ', props.currentSampleIndex+1);

  return (
    <div className="App">
      <div className="player-container">
        {props.playlist && (
          <AudioPlayer
          key={audioKey}
          playList={props.playlist}
            audioInitialState={{
              repeatType: "ONE",
              curPlayId: props.currentSampleIndex+1,
            }}
            activeUI={{
              ...activeUI,
              artwork: true,
              playButton: true,
              prevNnext: true,
              volume: true,
              volumeSlider: true,
              trackTime: true,
              trackInfo: true,
              progress: progressType
            }}

            placement={{
              player: playerPlacement,
              interface: {
                templateArea: interfacePlacement
              },
              volumeSlider: volumeSliderPlacement
            }}
            
            rootContainerProps={{
              colorScheme: theme,
              width
            }}
            
          />
        )}
      </div>

      <Editor
        setPlayerPlacement={setPlayerPlacement}
        setProgressType={setProgressType}
        setInterfacePlacement={setInterfacePlacement}
        setPlayListPlacement={setPlayListPlacement}
        setVolumeSliderPlacement={setVolumeSliderPlacement}
        setTheme={setTheme}
        setActiveUI={setActiveUI}
        setWidth={setWidth}
      />
    </div>
  );
}, arePropsEqual);

function arePropsEqual(prevProps: PlayerProps, nextProps: PlayerProps) {
  return (
    prevProps.currentSampleIndex === nextProps.currentSampleIndex &&
    prevProps.isPlaying === nextProps.isPlaying &&
    prevProps.playlist === nextProps.playlist
  );
}

