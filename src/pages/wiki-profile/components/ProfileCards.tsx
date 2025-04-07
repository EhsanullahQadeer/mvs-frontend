/*************************************************************************
 * @file ProfileCards.tsx
 * @author Ehsanullah Qadeer
 * @desc Profile card for artist profile page.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

import React, { useRef, useState } from "react";
import playIcon from '../../../assets/img/player/play-circle.svg';
import pauseIcon from '../../../assets/img/player/pause-circle.svg';
import Thumbnail from "components/ui/Header/atoms/notificationAtoms/notificationThumbnail";

// Define a TypeScript interface for props
interface ProfileCardsProps {
  thumbnail: string;
  trackName: string;
  artist: any;
  collaborators: any;
  previewUrl: string;
}

const ProfileCards: React.FC<ProfileCardsProps> = (props) => {
  const {
    thumbnail,
    trackName,
    artist,
    collaborators,
    previewUrl,
  } = props;
  console.log('props', props);
  const professional_name = artist;
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayClick = () => {
    if (!previewUrl || !audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <div
        className={`w-[310px] h-[108px] cursor-grab rounded-md p-3 border-[1px] border-eclipseGray bg-darkGray`}
      >
        <div className="flex gap-3 rounded-md items-center justify-between">
          <div className="flex gap-3">
            <Thumbnail thumbnail={thumbnail} size="84" round={false}/>
            <div className="flex flex-col gap-0.5">
              <h2 className="text-white font-semibold text-xs text-wrap">{trackName}</h2>
              <div className="overflow-hidden w-[200px] group">
                <p className="text-platinum text-[10px] font-medium whitespace-nowrap [&:not(:hover)]:group-[[scrollWidth>clientWidth]]:animate-scroll">
                  {professional_name}
                </p>
              </div>
              <div className="overflow-hidden w-[200px] group">
                <div className="flex gap-1 whitespace-nowrap [&:not(:hover)]:group-[[scrollWidth>clientWidth]]:animate-scroll">
                  {collaborators.map((collaborator: any, index: number) => (
                    <p key={collaborator} className="text-platinum text-[10px] font-medium">
                      {index > 0 && "• "}{collaborator}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div 
            className="w-[28px] h-[28px] flex items-center justify-center cursor-pointer bg-red-500"
            onClick={handlePlayClick}
          >
            <img
              src={isPlaying ? pauseIcon : playIcon}
              alt={isPlaying ? "Pause" : "Play"}
              className="w-full h-full"
              onError={(e) => console.log('Image failed to load:', e)}
            />
          </div>
        </div>
      </div>
      <audio 
        ref={audioRef}
        src={previewUrl}
        onEnded={() => setIsPlaying(false)}
      />
    </>
  );
};

export default ProfileCards;
