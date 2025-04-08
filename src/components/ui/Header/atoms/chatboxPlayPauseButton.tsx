// src/components/ui/Header/atoms/chatboxPlayPauseButton.tsx
import React from 'react';

interface PlayPauseButtonProps {
    isPlaying: boolean; // New prop to determine play or pause state
    onClick?: ((event: React.MouseEvent) => void)
}

const PlayPauseButton: React.FC<PlayPauseButtonProps> = ({ isPlaying, onClick }) => {  
  return (
    <button
    onClick={onClick}
    className="rounded-full flex items-center justify-center w-[32px] h-[32px] bg-[#9EFF00] cursor-pointer"
    >
      {isPlaying ? (
        // Render Pause icon
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
          <path fill-rule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clip-rule="evenodd" />
        </svg>
      ) : (
        // Render Play icon
        <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 6.26795C13.3333 7.03775 13.3333 8.96225 12 9.73205L3 14.9282C1.66667 15.698 -7.31543e-07 14.7358 -6.64245e-07 13.1962L-2.09983e-07 2.80385C-1.42685e-07 1.26425 1.66667 0.301995 3 1.0718L12 6.26795Z" fill="#1C1C1C"/>
        </svg>
      )}
    </button>
  );
};

export default PlayPauseButton;