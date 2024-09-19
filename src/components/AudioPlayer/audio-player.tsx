/*************************************************************************
 * @file audio-player.tsx
 * @author End Quote
 * @desc Component for audio playback with WaveSurfer.js integration.
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* IMPORTS */
import { 
  useEffect, 
  useRef, 
  useState 
} from "react";
import WaveSurfer from "wavesurfer.js";

const AudioPlayer = ({ 
  link, 
  id, 
  playing, 
  setPlaying, 
  playerType, 
  volume
}) => {
    const waveformRef = useRef(null);  // This ref should be used as the container for the waveform
    const wavesurfer = useRef(null);
    const [currentTime, setCurrentTime] = useState(0); // State for current playback time
    const [duration, setDuration] = useState(0);
    
    useEffect(() => {
        if (waveformRef.current) {  // Make sure you're checking waveformRef here
            const createWaveSurfer = () => {
                return WaveSurfer.create({
                    container: waveformRef.current,  // Use waveformRef.current as the container
                    waveColor: "grey",
                    progressColor: "#c4ff48",
                    height: playerType === "sample" ? 20 : 35,  // Simplified conditional logic
                    cursorWidth: playerType === "sample" ? 0 : 3,
                    cursorColor: "lightgray",
                    barWidth: playerType === "sample" ? 1.5 : 1.5,
                    normalize: true,
                    fillParent: true,
                    backend: "MediaElement",
                    mediaControls: false,
                });
            };
        

            if (playerType === "sample") {
                wavesurfer.current = createWaveSurfer();
                wavesurfer.current.setVolume(0);
            } else if (playerType === "player") {
                wavesurfer.current = createWaveSurfer();
            }

            const handleKeyDown = (event) => {
                if (event.key === "ArrowLeft") {
                  // Go back 2 seconds
                  event.preventDefault();
                  if (wavesurfer.current && wavesurfer.current.isPlaying()) {
                    const currentTime = wavesurfer.current.getCurrentTime();
                    const newTime = Math.max(0, currentTime - 2);  // Ensure time doesn't go below 0
                    wavesurfer.current.seekTo(newTime / wavesurfer.current.getDuration());  // Calculate the ratio for seeking
                    console.log("newTime: ", newTime);
                  }
                } else if (event.key === "ArrowRight") {
                  // Go forward 2 seconds
                  event.preventDefault();
                  if (wavesurfer.current && wavesurfer.current.isPlaying()) {
                    const currentTime = wavesurfer.current.getCurrentTime();
                    const duration = wavesurfer.current.getDuration();
                    const newTime = Math.min(duration, currentTime + 2);  // Ensure time doesn't exceed the duration
                    wavesurfer.current.seekTo(newTime / duration);  // Calculate the ratio for seeking
                    console.log("newTime: ", newTime);
                  }
                }
              };

            window.addEventListener("keydown", handleKeyDown);

            const loadTrack = async () => {
                try {
                  await wavesurfer.current.load(link);
                } catch (error) {
                  if (error.name !== 'AbortError') {
                    console.error("Failed to load the track:", error);
                  }
                }
              };
            loadTrack();

            wavesurfer.current.on("ready", () => {
                setDuration(wavesurfer.current.getDuration());
            });

            wavesurfer.current.on("audioprocess", () => {
                const currentTime = wavesurfer.current.getCurrentTime();
                setCurrentTime(currentTime);
            });

            wavesurfer.current.on("finish", () => {
                wavesurfer.current.seekTo(0);
                wavesurfer.current.pause();
                setPlaying(false);
            });

            wavesurfer.current.on('error', (error) => {
                if (error?.message === 'The user aborted a request.') {
                  console.log('Load aborted');
                } else {
                  console.error('Error in WaveSurfer:', error);
                }
              });

              return () => {
                window.removeEventListener("keydown", handleKeyDown); // Remove the event listener
                try {
                    wavesurfer.current.destroy();
                } catch (error) {
                  if (error.message !== 'The user aborted a request.') {
                    console.error('Error while destroying WaveSurfer:', error);
                  }
                }
              };
        }
    }, [link, playerType, setPlaying]);


    useEffect(() => {
      if (wavesurfer.current) {
          wavesurfer.current.setVolume(volume / 100); // Set the volume based on the state
      }
  }, [volume]);


  useEffect(() => {
    if (wavesurfer.current && playerType !== "sample") {
      const playAudio = async () => {
        try {
          if (playing) { // Changed `setPlaying` to `playing`
            console.log("Current playing audio");
            await wavesurfer.current.play();
          } else {
            console.log("Current pausing audio");
            wavesurfer.current.pause();
            // setPlaying(false);
          }
        } catch (error) {
          console.error("Error playing audio:", error);
        }
      };
      
      playAudio();
    }
  }, [playing, id, playerType]); // Use `playing` as the dependency



    function formatTime(seconds) {
        const roundSeconds = Math.round(seconds);
        const minutes = Math.floor(roundSeconds / 60);
        const remainingSeconds = roundSeconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    return (
          <div
            style={
              playerType !== 'sample'
                ? { display: 'flex', alignItems: 'center' }
                : {}
            }
            className="audio"
          >
          {playerType === "player" && (
              <div style={{ marginRight: '10px', marginLeft: '10px', color: 'white', fontWeight: 'bold' }}>
                  <span>{formatTime(currentTime)}</span>
              </div>
          )}
          <div
            ref={waveformRef}
            className={playerType === 'player' ? 'w-[250px] flex-grow-0' : ''}
          ></div>
          {playerType === "player" && (
              <div style={{ marginLeft: '10px', color: 'white', fontWeight: 'bold' }}>
                  <span>{formatTime(duration)}</span>
              </div>
          )}
      </div>
  );
};

export default AudioPlayer;