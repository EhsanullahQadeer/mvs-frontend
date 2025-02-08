import { useRef, useState } from "react";
import pauseIcon from "../../../assets/img/player/pause-circle.svg";
import playIcon from "../../../assets/img/player/play-circle.svg";

interface IProps {
  creditsData?: any;
}

const CreditsInfo = (props: IProps) => {
  const { creditsData } = props;
  const [hoveredRow, setHoveredRow] = useState<number | null>(null); // State to track hovered row
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState<number | null>(
    null
  ); // Track the currently playing index
  const audioRef = useRef<HTMLAudioElement | null>(null); // Ref for the audio element

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
    <>
      {creditsData && creditsData.length > 0 && (
        <div className="px-3 py-3 pb-5 border-t border-e-eclipseGray">
          <h2 className={`text-white mb-3.5 text-base font-normal`}>Credits</h2>

          <div className="flex flex-col max-h-36 overflow-y-auto custom-dropdown">
            {creditsData.map((value, index) => {
              const { thumbnail, track_name, artists, preview_url } = value;
              const { professional_name } = artists[0];
              return (
                <div
                  key={index}
                  className={`p-2 flex gap-3 items-center relative hover:bg-eerieBlack rounded-lg`} // Added relative for positioning
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
                      {professional_name}
                    </p>
                  </div>

                  {/* Show play/pause button for hovered row or currently playing row */}
                  {(hoveredRow === index || currentPlayingIndex === index) && (
                    <div
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 cursor-pointer"
                      onClick={() => handlePlayClick(preview_url, index)} // Play the track on click
                    >
                      <img
                        src={
                          currentPlayingIndex === index ? pauseIcon : playIcon
                        } // Toggle play/pause icon based on state
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
      )}
    </>
  );
};

export default CreditsInfo;
