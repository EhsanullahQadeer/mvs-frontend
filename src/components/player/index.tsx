/* eslint-disable @typescript-eslint/no-unused-vars */
import AudioPlayer, {
  ActiveUI,
  PlayerPlacement,
  PlayListPlacement,
  ProgressUI,
  VolumeSliderPlacement
} from "react-modern-audio-player";
import { useState } from "react";
import Editor from "./editor";

type InitialStates = Omit<
  React.AudioHTMLAttributes<HTMLAudioElement>,
  "autoPlay"
> & {
	isPlaying?: true;
};

export default function Player(props: any) {
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
  const [activeUI, setActiveUI] = useState<ActiveUI>({ all: true });

  return (
    <div className="App">
      <div className="player-container">
        {props.playlist && (

          <AudioPlayer
            playList={props.playlist}
            
            activeUI={{
              ...activeUI,
              progress: progressType
            }}
            placement={{
              player: playerPlacement,
              interface: {
                templateArea: interfacePlacement
              },
              playList: playListPlacement,
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
}
