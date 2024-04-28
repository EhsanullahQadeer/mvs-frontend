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

  const audioRef = useRef<HTMLAudioElement>(null); // Direct reference to the audio element
  const [isPlaying, setIsPlaying] = useState(false);



  interface ErrorBoundaryState {
    hasError: boolean;
  }
  
  class ErrorBoundary extends React.Component<any, ErrorBoundaryState> {
    constructor(props: any) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error: any) {
      return { hasError: true };
    }
  
    componentDidCatch(error: any, errorInfo: any) {
      console.log(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        return <h1>Algo salió mal.</h1>;
      }
      return this.props.children;
    }
  }

  const handlePlay = () => {
    // Logic to start playing the music
    console.log("Play button clicked");
  };

  type InitialStates = Omit<
  React.AudioHTMLAttributes<HTMLAudioElement>,
  "autoPlay"
  > & {
    isPlaying?: false;
  };

  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlaying] = useState(false);

  const handlePlayPause = () => {
    setPlaying(!playing);
    wavesurfer.current.playPause();
};

useEffect(() => {
  console.log("Playlist or player state changed");
  console.log("props.currentSampleIndex: ", props.currentSampleIndex );
}, [props.playlist, props.currentSampleIndex, props.isPlaying]);

  console.log("is playing? ", props.isPlaying);
  return (
    <div className="App">
      <div className="player-container">
      <div className="audio-player-container" style={{ position: 'fixed', bottom: 0, width: '100%', padding: '10px', backgroundColor: '#282828' }}>
            <div id={`https://mvssive-content.s3.amazonaws.com/1713051479.952-5eac5879-33c2-4e67-a1b8-c1478af18bdc.wav`} ref={waveformRef}></div>
            <button onClick={handlePlayPause}>{playing ? 'Pause' : 'Play'}</button>
        </div>
        {/* {props.playlist && (
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
        )} */}
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

