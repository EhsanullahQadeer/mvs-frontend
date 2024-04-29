import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

const AudioPlayer = ({ link, id, setPlaying, playerType, volume}) => {
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
                    height: playerType === "sample" ? 20 : 40,  // Simplified conditional logic
                    cursorWidth: playerType === "sample" ? 0 : 3.5,
                    cursorColor: "lightgray",
                    barWidth: playerType === "sample" ? 3 : 3,
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
            });

            wavesurfer.current.on('error', (error) => {
                if (error?.message === 'The user aborted a request.') {
                  console.log('Load aborted');
                } else {
                  console.error('Error in WaveSurfer:', error);
                }
              });

              return () => {
                try {
                    wavesurfer.current.destroy();
                } catch (error) {
                  if (error.message !== 'The user aborted a request.') {
                    console.error('Error while destroying WaveSurfer:', error);
                  }
                }
              };
        }
    }, [link, playerType]);

    useEffect(() => {
        if (wavesurfer.current) {
            wavesurfer.current.setVolume(volume / 100); // Set the volume based on the state
        }
    }, [volume]);
    useEffect(() => {
        if (setPlaying) {
          console.log("Starting playback for sample ID:", id);
        } else {
          console.log("Stopping playback for sample ID:", id);
        }
      }, [setPlaying, id]); // Depend on playing state and ID to control playback


      
    useEffect(() => {
        if (wavesurfer.current) {
            const playAudio = async () => {
                try {
                    if (setPlaying) {
                        console.log("Current playing audio");
                        await wavesurfer.current.play();
                    } else {
                        console.log("Current pausing audio");
                        wavesurfer.current.pause();
                    }
                } catch (error) {
                    console.error("Error playing audio:", error);
                }
            };
            playAudio();
        }
    }, [setPlaying]);

    function formatTime(seconds) {
        const roundSeconds = Math.round(seconds);
        const minutes = Math.floor(roundSeconds / 60);
        const remainingSeconds = roundSeconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', minWidth: "175px" }} id={`id-${id}`} className="audio">
            {playerType === "player" && (
                <div style={{ marginRight: '10px', marginLeft: '10px', color: 'white', fontWeight: 'bold' }}>
                    <span>{formatTime(currentTime)}</span>
                </div>
            )}
            <div ref={waveformRef} style={{ flexGrow: 1 }}></div>
            {playerType === "player" && (
                <div style={{ marginLeft: '10px', color: 'white', fontWeight: 'bold' }}>
                    <span>{formatTime(duration)}</span>
                </div>
            )}
        </div>
    );
};

export default AudioPlayer;