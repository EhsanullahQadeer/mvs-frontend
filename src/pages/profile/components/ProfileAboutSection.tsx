import { IArtistProfileData } from "./types";
import { MdVerified } from "react-icons/md";
import { FiSend, FiUserPlus } from "react-icons/fi";
import { LiaEllipsisHSolid } from "react-icons/lia";
import { useRef, useState } from "react";
import pauseIcon from '../../../assets/img/player/pause-circle.svg';
import playIcon from '../../../assets/img/player/play-circle.svg';

type Props = {
  artistData: IArtistProfileData | null;
  creditsData: { thumbnail: string; track_name: string; artists: any, preview_url: any }[];
};

const ProfileAboutSection = (props: Props) => {
  const { artistData, creditsData } = props;
  const [hoveredRow, setHoveredRow] = useState<number | null>(null); // State to track hovered row
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState<number | null>(null); // Track the currently playing index
  const audioRef = useRef<HTMLAudioElement | null>(null); // Ref for the audio element

  const { username, thumbnail, artist_name, bio, primary_label, sub_label } =
    artistData?.available ?? artistData ?? {};
  const truncatedBio =
    bio && (bio.length > 255 ? bio.slice(0, 255) + "..." : bio);

  const handlePlayClick = (previewUrl: string, index: number) => {
    if (!previewUrl) return;
    if (audioRef.current) {
      if (currentPlayingIndex === index) {
        // If the clicked track is already playing, pause it
        audioRef.current.pause();
        setCurrentPlayingIndex(null);
      } else {
        // Play the new track
        audioRef.current.src = previewUrl;
        audioRef.current.play();
        setCurrentPlayingIndex(index);
      }
    }
  };

  return (
    <div className="bg-jetBlack">
      <div className="w-full h-[88px] bg-[#1a1a1a]"></div>
      <div className="px-4">
        <div className="rounded-full p-1 bg-jetBlack w-[108px] h-[108px] relative -translate-y-1/2">
          <img
            src={thumbnail}
            alt="Profile"
            className="h-full w-full rounded-full object-cover"
          />
        </div>

        <div className="text-white flex flex-col -mt-10">
          <div className="flex flex-col gap-2 mb-3">
            <h1 className={`text-lg flex items-center gap-1 font-semibold`}>
              {artist_name}
              <MdVerified className="text-[#9EFF00]" />
            </h1>

            <span className="text-base font-normal text-coolGray">
              @{username}
            </span>
          </div>

          <div className="flex gap-1">
            <div className="bg-eclipseGray text-dimGray rounded-md px-2 py-1 text-sm font-normal">
              {primary_label}
            </div>

            <div className="bg-eclipseGray text-dimGray rounded-md px-2 py-1 text-sm font-normal">
              {sub_label}
            </div>
          </div>

          <div className="mt-[22px] mb-2 flex justify-between flex-wrap gap-2">
            <div className="gap-2 flex items-center flex-wrap">
              <button className="flex items-center bg-transparent text-dimGray border border-dimGray text-sm rounded-full  transition py-2 px-4 cursor-pointer font-normal">
                <div className="flex gap-2 items-center">
                  <FiUserPlus className="w-4 h-4" />
                  <span>Connect</span>
                </div>
              </button>

              <button
                style={{
                  width: "unset",
                }}
                className="flex font-normal items-center text-jetBlack text-sm rounded-full  transition py-2 px-4 bg-limeGreen cursor-pointer"
              >
                <div className="flex gap-2 items-center">
                  <FiSend className="w-4 h-4" />
                  <span>Message</span>
                </div>
              </button>
            </div>

            <div>
              <button className="bg-eerieBlack text-coolGray p-2 rounded-lg hover:bg-gray-700 transition border border-eerieBlack">
                <LiaEllipsisHSolid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-b border-eclipseGray px-2.5 pb-6">
        <div className="px-4 pt-5 text-platinum font-semibold text-base">
          About
        </div>

        <div className="text-dimGray font-normal text-sm">{truncatedBio}</div>
      </div>

      <div className={`px-3 py-3`}>
        <h2 className={`text-white mb-3.5 text-base font-normal`}>Credits</h2>

        <div className="flex flex-col overflow-y-auto">
          {creditsData.map((value, index) => {
            const { thumbnail, track_name, artists, preview_url } = value;
            const { artist_name } = artists[0];
            return (
              <div
                key={index}
                className={`p-2 flex gap-3 items-center relative`} // Added relative for positioning
                onMouseEnter={() => setHoveredRow(index)} // Set hovered row on hover
                onMouseLeave={() => setHoveredRow(null)} // Reset on mouse leave
              >
                <div className="w-12 h-12">
                  <img
                    src={thumbnail}
                    alt="credits"
                    className="w-full h-full object-contain rounded-[4px]"
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  <h2 className="text-white font-semibold text-xs text-wrap">
                    {track_name}
                  </h2>
                  <p className="text-platinum text-[10px] font-medium">
                    {artist_name}
                  </p>
                </div>

                {/* Show play/pause button for hovered row or currently playing row */}
                {(hoveredRow === index || currentPlayingIndex === index) && (
                  <div
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 cursor-pointer"
                    onClick={() => handlePlayClick(preview_url, index)} // Play the track on click
                  >
                    <img
                      src={currentPlayingIndex === index ? pauseIcon : playIcon} // Toggle play/pause icon based on state
                      alt="Play/Pause"
                      className="w-full h-full"
                    />
                  </div>
                )}
              </div>
            );
          })}

          {/* Audio element for playing preview_url */}
          <audio ref={audioRef} />
        </div>
      </div>
    </div>
  );
};

export default ProfileAboutSection;