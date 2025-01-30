import React, { useEffect, useRef, useState, useCallback } from 'react';
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

const RecordedAudioPlayer: React.FC<RecordedAudioPlayerProps> = React.memo(({ audioUrl, onDelete }) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isMuted, setIsMuted] = useState(false);
  const animationFrameId = useRef<number | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastUpdateTime = useRef<number>(0);

  useEffect(() => {
    if (!waveformRef.current || !audioUrl) return;

    const ws = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: '#4E4E4E',
      progressColor: '#B2B2B2',
      cursorColor: '#848484',
      barWidth: 1,
      barRadius: 1,
      cursorWidth: 1,
      height: 28,
      barGap: 1,
      normalize: true,
      fillParent: true,
      fetchParams: {
        cache: 'default',
        mode: 'cors',
      }
    });

    wavesurfer.current = ws;

    ws.on('ready', () => {
      setDuration(ws.getDuration() || 0);
    });

    ws.on('audioprocess', (time: number) => {
      setCurrentTime(time);
    });

    ws.on('pause', () => {
      setIsPlaying(false);
    });

    ws.on('finish', () => {
      setIsPlaying(false);
      setCurrentTime(0);
    });

    ws.on('error', (err) => {
      console.error('WaveSurfer error:', err);
    });

    ws.load(audioUrl);

    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
        wavesurfer.current = null;
      }
    };
  }, [audioUrl]);

  const handlePlayPause = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    if (wavesurfer.current) {
      if (isPlaying) {
        wavesurfer.current.pause();
      } else {
        wavesurfer.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const handleMuteToggle = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    if (wavesurfer.current) {
      wavesurfer.current.setMuted(!isMuted);
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div 
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

      <div className="flex-1 mx-4">
        <div 
          ref={waveformRef} 
          className="waveform w-full max-w-full overflow-hidden"
          style={{ maxWidth: '100%' }}
        />
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
            onClick={(event) => {
              event.stopPropagation();
              onDelete();
            }}
            className={`w-[32px] h-[32px] flex items-center justify-center rounded-full bg-[#3D3D3D] hover:bg-[#2A2A2A] transition-opacity duration-200`}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M1 13L13 1" stroke="#848484" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
});

export default RecordedAudioPlayer;