import { formatTime } from "shared/utils/dateUtils";
import VolumeIcon from '../../../../../assets/img/volume.svg';
import PlayPauseButton from "../../atoms/chatboxPlayPauseButton";
import VolumeMuteIcon from '../../../../../assets/img/volume-x.svg';

export interface RecordedAudioMessagePlayerProps {
  isPlaying?: boolean;
  waveformRef?: React.RefObject<HTMLDivElement>; // Updated to use RefObject
  duration?: number;
  isMuted?: boolean;
  handlePlayPause?: () => void; // Added
  handleMuteToggle?: () => void; // Added
}

const RecordedAudioMessagePlayer: React.FC<RecordedAudioMessagePlayerProps> = ({ isPlaying, waveformRef, duration, isMuted, handlePlayPause, handleMuteToggle }) => {
  return (
    <div className="bg-[#242424] h-[56px] w-[234px] border border-[#3D3D3D] box-border rounded-full">
      <div className="mx-3 h-full flex justify-between items-center">
        <PlayPauseButton isPlaying={isPlaying} onClick={handlePlayPause}/>
        <div className="flex-1 mx-4">
          <div ref={waveformRef} className="waveform w-full max-w-full overflow-hidden" style={{ maxWidth: '100%' }}/>
        </div>
        <div className="items-end">
          <span className="text-[14px] text-[#848484] min-w-[40px] flex-shrink-0 mr-3">
            {formatTime(duration)}
          </span>
        </div>
        <button onClick={handleMuteToggle} className="w-6 h-6 flex items-center justify-center flex-shrink-0 mr-2 hover:opacity-80">
          <img 
            src={isMuted ? VolumeMuteIcon : VolumeIcon} 
            alt={isMuted ? "Unmute" : "Mute"} 
            className="w-6 h-6"
          />
        </button>
      </div>
    </div>
  )
};

export default RecordedAudioMessagePlayer;