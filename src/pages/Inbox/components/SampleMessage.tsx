import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ReactComponent as PlayIcon } from '../../../assets/icons/SampleMessageIcons/Play.svg';
import { ReactComponent as PauseIcon } from '../../../assets/icons/SampleMessageIcons/Pause.svg';
import { ReactComponent as DownloadIcon } from '../../../assets/icons/SampleMessageIcons/download.svg';
import { ReactComponent as MoreIcon } from '../../../assets/icons/SampleMessageIcons/more-horizontal.svg';
import { ISenderSample } from 'api/messenger/objects/states.types';

interface SampleMessageProps {
  sample: ISenderSample;
  displayName: string;
}

const SampleMessage: React.FC<SampleMessageProps> = ({
  sample,
  displayName
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Initialize audio when component mounts
  useEffect(() => {
    if (!sample?.s3_key) {
      console.log('No sample or s3_key available');
      return;
    }

    setIsLoading(true);
    const audio = new Audio(`https://assets.mvssive.net/${sample.s3_key}`);
    audioRef.current = audio;

    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
      setIsLoading(false);
      setIsReady(true);
    });

    audio.addEventListener('timeupdate', () => {
      requestAnimationFrame(() => {
        setCurrentTime(audio.currentTime);
      });
    });

    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setCurrentTime(0);
    });

    audio.addEventListener('error', () => {
      setIsLoading(false);
      console.error('Error loading audio');
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, [sample?.s3_key]);

  const handlePlayPause = () => {
    if (!audioRef.current || !sample?.s3_key) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => {
        console.error('Error playing audio:', error);
        setIsPlaying(false);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !audioRef.current || !sample?.s3_key) return;

    const rect = progressRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const truncateFilename = (filename: string, maxLength: number = 20): string => {
    if (!filename) return 'Untitled Sample';
    
    // Remove the extension for display
    const name = filename.substring(0, filename.lastIndexOf('.'));
    if (!name) return filename; // In case there's no extension
    
    if (name.length <= maxLength) return name;
    return `${name.substring(0, maxLength - 3)}...`;
  };

  const handleDownload = async (e: React.MouseEvent, sample: any) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!sample?.s3_key || !sample?.filename) {
      console.error('No sample data available for download');
      return;
    }

    try {
      const response = await fetch(`https://assets.mvssive.net/${sample.s3_key}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = sample.filename || 'Untitled Sample';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div className="bg-gunMetal border border-eerieBlack rounded-lg p-4 w-[294px]">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={handlePlayPause}
              className="w-10 h-10 flex items-center justify-center border border-[#3D3D3D] bg-[#1C1C1C] rounded-lg transition-all duration-200 hover:bg-[#242424]"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-coolGray border-t-white rounded-full animate-spin" />
              ) : isPlaying ? (
                <PauseIcon className="w-4 h-4 text-white" />
              ) : (
                <PlayIcon className="w-4 h-4 text-white" />
              )}
            </button>
            <div>
              <h3 className="text-white font-medium text-sm">{truncateFilename(sample?.filename) || 'Untitled Sample'}</h3>
              <p className="text-coolGray text-xs">{displayName}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={(e) => handleDownload(e, sample)}
              className="w-8 h-8 flex items-center justify-center hover:bg-[#242424] rounded-lg transition-colors"
            >
              <DownloadIcon className="w-4 h-4 text-coolGray" />
            </button>
            <button 
              onClick={() => {}}
              className="w-8 h-8 flex items-center justify-center hover:bg-[#242424] rounded-lg transition-colors"
            >
              <MoreIcon className="w-4 h-4 text-coolGray" />
            </button>
          </div>
        </div>
        {isPlaying && (
          <div className="flex flex-col gap-2">
            <div 
              ref={progressRef}
              onClick={handleProgressClick}
              className="w-full h-1 bg-[#3D3D3D] rounded-full cursor-pointer overflow-hidden"
            >
              <div 
                className="h-full bg-[#9EFF00] rounded-full transition-transform duration-100 ease-linear"
                style={{ 
                  transform: `translateX(${((currentTime / duration) * 100) - 100}%)`,
                  width: '100%'
                }}
              />
            </div>
            <div className="flex justify-between text-xs text-coolGray">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SampleMessage;
