import { formatBytes, formatTime } from "shared/utils/dateUtils";
import PlayPauseButton from "../../atoms/chatboxPlayPauseButton";

export interface DemoPlayerFeedbackThreadProps {
  isPlaying?: boolean;
  duration?: number;
  fileName?: string;
  fileSizeBytes?: number;
  progress?: number;
  currentTime?: number;
  handlePlayPause?: () => void; // Added
  handleProgressBarClick?: (e) => void; // Added
  progressBarRef?: React.RefObject<HTMLDivElement>; // Updated to use RefObject
  hasListened?: boolean;
}

const DemoPlayerFeedbackThread: React.FC<DemoPlayerFeedbackThreadProps> = ({ isPlaying, duration, fileName, fileSizeBytes, handlePlayPause, progressBarRef, handleProgressBarClick, progress, currentTime, hasListened}) => {
  return (
    <div className="bg-[#181A1D] h-[105px] w-[282px] border border-[#1C1C1C] box-border rounded-[8px] flex items-center justify-center">
      <div className="flex-col bg-[#202327] h-[85px] w-[262px] border border-[#3D3D3D] box-border rounded-[8px]">
        <div className="flex bg-[#202327] w-auto mx-[10px] mt-[10px] rounded-[8px]">
          <div className="flex">
            <PlayPauseButton isPlaying={isPlaying} onClick={handlePlayPause}/>
          </div>
          <div className="ml-2 w-full overflow-hidden whitespace-nowrap text-ellipsis text-[#848484]">
            <span className="text-[14px] min-w-[40px]">
              {fileName}
            </span>
            <div className="flex">
              <span className="text-[10px] text-[#666666] mx-[6px]">
                {formatTime(duration)}
              </span>
              <span className="text-[10px] text-[#666666]">
                ({formatBytes(fileSizeBytes)})
              </span>
            </div>
          </div>
          {hasListened && ( // Conditionally render the check mark
            <div className="top-2 right-2 text-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#9EFF00" className="size-6">
                <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
              </svg>
            </div> // Check mark element
          )}
        </div>
        <div className="flex items-center mt-[11px]">
          <div 
            ref={progressBarRef}
            className="flex relative justify-center w-full  ml-[30px] cursor-pointer"
            onClick={(e) => handleProgressBarClick(e)}
          >
            <div className="w-full h-[2px] bg-zinc-700">
              <div 
                className="h-full bg-lime-400 transition-all duration-100"
                style={{ 
                  width: `${progress}%` 
                }}
              />
            </div>
            <div 
              className="flex absolute top-2/4 z-0 w-2.5 h-2.5 rounded-full -translate-y-2/4 bg-lime-400 min-h-[10px]"
              style={{ 
                left: `${progress}%` ,
                transform: `translateX(-50%) translateY(-50%)`
              }}
            />
          </div>
          <div className="flex">
              <span className="text-[10px] text-[#666666] mr-[20px] ml-[10px]">
                {currentTime ? formatTime(currentTime) : "0:00"}
              </span>
          </div>
        </div>
      </div>
    </div>
  )
};

export default DemoPlayerFeedbackThread;