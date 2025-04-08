import { Component } from "react";
import { AudioPlayer } from "react-audio-play";

// Define the props interface
interface FooterRecordedAudioPlayerProps {
  src?: Blob; // Optional string type for the src prop
}

class FooterRecordedAudioPlayer extends Component<FooterRecordedAudioPlayerProps> {
  shouldComponentUpdate(nextProps) {
    // Check if the uploadedAudioFile prop has changed
    if (this.props.src !== nextProps.src) {
      return true; // Re-render if the uploadedAudioFile has changed
    }
    return false; // Prevent re-render for other prop changes
  }

  render() {
    return (
      <AudioPlayer
        src={URL.createObjectURL(this.props.src)}
        color="#B2B2B2"
        sliderColor="#B7B7B7"
        style={{
          background: "#242424",
          borderRadius: "40px",
        }}
        className="border border-[#3D3D3D] rounded-full [&_.rap-pp-icon_path]:!fill-[#1C1C1C] [&_.rap-volume]:hidden [&_.rap-controls]:!mx-2 [&_.rap-slider]:!mx-2  [&_.rap-slider]:!bg-[#4B4B4B] [&_.rap-slider]:!h-[2px]"
      />
    );
  }
}

export default FooterRecordedAudioPlayer;