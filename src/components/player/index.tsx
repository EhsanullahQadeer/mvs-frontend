import AudioPlayer, {
  ActiveUI,
  PlayerPlacement,
  PlayListPlacement,
  ProgressUI,
  VolumeSliderPlacement
} from "react-modern-audio-player";
import { useState } from "react";
import { playList } from "./playlist";
import Editor from "./editor";

export default function Player() {
  const [progressType, setProgressType] = useState<ProgressUI>("bar");
  const [playerPlacement, setPlayerPlacement] = useState<PlayerPlacement>(
    "bottom-left"
  );
  const [interfacePlacement, setInterfacePlacement] = useState<
    any
  >();
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
        <AudioPlayer
          playList={playList}
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
