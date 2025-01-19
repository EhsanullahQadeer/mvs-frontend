import React, { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import PauseDefault from '../../../assets/img/PauseD.svg';
import PlayDefault from '../../../assets/img/PlayD.svg';
import PlayHover from '../../../assets/img/PlayHover.svg';
import PauseHover from '../../../assets/img/PauseHover.svg';
import VolumeIcon from '../../../assets/img/volume.svg';
import VolumeMuteIcon from '../../../assets/img/volume-x.svg';

interface RecordedAudioPlayerProps {
  audioUrl: string;
  onDelete?: () => void;
}

const RecordedAudioPlayer: React.FC<RecordedAudioPlayerProps> = ({ audioUrl, onDelete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    let isDestroyed = false;

    const initializeWaveSurfer = async () => {
      if (!waveformRef.current || !audioUrl) return;
      
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
      }

      const ws = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#4E4E4E',
        progressColor: '#B2B2B2',
        cursorColor: '#848484',
        barWidth: 2,
        barRadius: 2,
        cursorWidth: 1,
        height: 32,
        barGap: 1,
        normalize: true,
        minPxPerSec: 50,
        fillParent: true,
        backend: 'MediaElement',
        mediaControls: false,
        fetchParams: {
          cache: 'default',
          mode: 'cors',
          credentials: 'same-origin'
        }
      });

      wavesurfer.current = ws;

      ws.on('ready', () => {
        if (isDestroyed) return;
        setDuration(ws.getDuration() || 0);
      });

      ws.on('audioprocess', (time: number) => {
        if (isDestroyed) return;
        setCurrentTime(time);
      });

      ws.on('pause', () => {
        if (isDestroyed) return;
        setIsPlaying(false);
      });

      ws.on('finish', () => {
        if (isDestroyed) return;
        setIsPlaying(false);
        setCurrentTime(0);
      });

      ws.on('error', (err) => {
        if (isDestroyed) return;
        console.error('WaveSurfer error:', err);
        setError('Failed to load audio');
      });

      try {
        await ws.load(audioUrl);
      } catch (err) {
        console.error('Error loading audio:', err);
        setError('Failed to load audio');
      }
    };

    initializeWaveSurfer();

    const resizeObserver = new ResizeObserver(() => {
      const timeoutId = setTimeout(() => {
        if (containerRef.current) {
          const width = containerRef.current.offsetWidth;
          const waveformContainer = waveformRef.current;
          
          if (width < 200) {
            if (waveformContainer) {
              waveformContainer.style.display = 'none';
            }
          } else {
            if (waveformContainer) {
              waveformContainer.style.display = 'block';
              initializeWaveSurfer();
            }
          }
        }
      }, 100);
      
      return () => clearTimeout(timeoutId);
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      isDestroyed = true;
      resizeObserver.disconnect();
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
        wavesurfer.current = null;
      }
    };
  }, [audioUrl]);

  const handlePlayPause = () => {
    if (wavesurfer.current) {
      if (isPlaying) {
        wavesurfer.current.pause();
      } else {
        wavesurfer.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleMuteToggle = () => {
    if (wavesurfer.current) {
      wavesurfer.current.setMuted(!isMuted);
      setIsMuted(!isMuted);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="flex items-center w-full bg-[#1C1C1C] rounded-full px-3 py-3 relative group border border-[#3D3D3D]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button 
        onClick={handlePlayPause}
        className="group w-8 h-8 flex items-center justify-center flex-shrink-0"
      >
        {isPlaying ? (
          <>
            <img src={PauseDefault} alt="Pause" className="w-8 h-8 group-hover:hidden" />
            <img src={PauseHover} alt="Pause" className="w-8 h-8 hidden group-hover:block" />
          </>
        ) : (
          <>
            <img src={PlayDefault} alt="Play" className="w-8 h-8 group-hover:hidden" />
            <img src={PlayHover} alt="Play" className="w-8 h-8 hidden group-hover:block" />
          </>
        )}
      </button>

      <div className="flex-1 mx-4 min-w-0">
        <div ref={waveformRef} className="waveform w-full" />
      </div>
      
      <span className="text-sm text-[#848484] min-w-[40px] flex-shrink-0">
        {isPlaying || currentTime > 0 ? `${formatTime(currentTime)}` : formatTime(duration)}
      </span>

      <button 
        onClick={handleMuteToggle}
        className="w-5 h-5 flex items-center justify-center flex-shrink-0 mr-2 hover:opacity-80"
      >
        <img 
          src={isMuted ? VolumeMuteIcon : VolumeIcon} 
          alt={isMuted ? "Unmute" : "Mute"} 
          className="w-5 h-5"
        />
      </button>

      {onDelete && (
        <div className="absolute -top-3 -right-3">
          <button 
            onClick={onDelete}
            className={`w-[32px] h-[32px] flex items-center justify-center rounded-full bg-[#3D3D3D] hover:bg-[#2A2A2A] transition-opacity duration-200 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M1 13L13 1" stroke="#848484" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default React.memo(RecordedAudioPlayer);
