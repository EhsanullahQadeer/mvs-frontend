import moment from "moment";
import { AudioPlayer } from "react-audio-play";
import { useState, useEffect, useRef } from "react";
import { IMessage, MEDIA_TYPE, MESSAGE_TYPES } from "api/messenger/objects/states.types";
import AudioFileIcon from "@mui/icons-material/AudioFile";

import { FiUnlock } from "react-icons/fi";

type Props = {
  message: IMessage;
  index?: number;
  isDemo?: boolean;
  details?: {
    duration: string;
    size: string;
  };
};

const ThreadMessage = (props: Props) => {
  const [needsConversion, setNeedsConversion] = useState(false);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const intersectionRef = useRef(null);
  
  const { message, index, isDemo, details } = props;
  const { 
    media, 
    sender,
    created_at, 
    content,
    message_type,
    transaction
  } = message;

  const requiresFeedback = message_type === MESSAGE_TYPES.DEMO && 
    transaction?.status !== "completed";

  useEffect(() => {
    if (!media?.url) return;

    // Test if the audio is playable
    const audio = new Audio(media.url);
    audio.addEventListener('error', () => {
      console.log('Audio format not supported, needs conversion');
      setNeedsConversion(true);
    });
    
    audio.addEventListener('canplaythrough', () => {
      console.log('Audio format is supported');
      setNeedsConversion(false);
    });
  }, [media?.url]);

  useEffect(() => {
    const convertAudioFormat = async (url: string) => {
      const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
      if (!isSafari) return url;

      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const mpegBlob = new Blob([blob], { type: 'audio/mpeg' });
        return URL.createObjectURL(mpegBlob);

      } catch (error) {
        console.error('Audio conversion failed:', error);
        return url;
      }
    };

    if (media?.url && !convertedUrl) {
      convertAudioFormat(media.url).then(setConvertedUrl);
    }
  }, [media?.url, convertedUrl]);

  function renderActionRequired() {
    return (
      <div className="flex justify-center w-full mt-3">
        <div className="bg-[#002C5580] border border-[#57AEFF] rounded-xl p-4 text-center flex flex-col items-center gap-1 w-80">
          <div className="w-8 h-8 text-white flex justify-center items-center">
            <FiUnlock className="w-7 h-7" />
          </div>

          <div className="text-white text-base font-semibold">
            Action Required
          </div>

          <div className="text-coolGray text-sm font-normal w-64">
            To receive your payment, please provide your feedback on the demo.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={intersectionRef} className="w-full overflow-hidden">
      <div className="flex flex-wrap gap-2 px-4 py-2 w-full relative group hover:bg-gunMetal overflow-hidden">
        <div className="flex-shrink-0 rounded-full p-0.5 w-12 h-12">
          <div className="w-full h-full rounded-full border-[2px] border-[#151515]">
            <div
              style={{ backgroundImage: `url("${sender.thumbnail}")` }}
              className="w-full h-full rounded-full bg-cover bg-center"
            ></div>
          </div>
        </div>
        
        <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
          <div className="flex justify-between w-full items-start">
            <div className="font-semibold text-sm text-white truncate max-w-[70%]">
              {sender.professional_name}
            </div>
            <div className="text-grayBlue text-sm flex-shrink-0">
              {moment(created_at).format("h:mm A")}
            </div>
          </div>
          
          {content && (
            <div className="text-sm text-[#CACCCD] break-words whitespace-pre-wrap overflow-hidden w-full">
              {content}
            </div>
          )}

          {message_type === MESSAGE_TYPES.DEMO ? (
            <>
              <div className="mt-2">
                <AudioPlayer
                  src={needsConversion ? convertedUrl || media?.url : media?.url}
                  color="#1C1C1C"
                  sliderColor="#9EFF00"
                  style={{
                    background: "#242424",
                    borderRadius: "40px",
                  }}
                  className="border border-[#3D3D3D] rounded-full"
                />
              </div>
              {requiresFeedback && renderActionRequired()}
            </>
          ) : media?.type === MEDIA_TYPE.RECORDING ? (
            <div
              className="flex relative gap-1 items-center self-start rounded-2xl h-full w-auto audio-2 mt-2"
            >
              <AudioPlayer
                src={needsConversion ? convertedUrl || media.url : media.url}
                color="#1C1C1C"
                sliderColor="#9EFF00"
                style={{
                  background: "#242424",
                  borderRadius: "40px",
                }}
                className="border border-[#3D3D3D] rounded-full"
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ThreadMessage;
