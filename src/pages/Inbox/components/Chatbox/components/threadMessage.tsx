import moment from "moment";
import { AudioPlayer } from "react-audio-play";
import { useState, useEffect, useRef, useCallback } from "react";
import { useChatbox } from "../context";
import { IMessage, MEDIA_TYPE, MESSAGE_TYPES } from "api/messenger/objects/states.types";
import AudioFileIcon from "@mui/icons-material/AudioFile";

import { FiUnlock } from "react-icons/fi";
import PlayPauseButton from "components/ui/Header/atoms/chatboxPlayPauseButton";
import { formatBytes, formatTime, truncateFilename, truncateFilenameByWidth } from "utils/dateUtils";

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

  // Progress Bar Vars
  const progressBarRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  
  const { message, index, isDemo, details } = props;
  const {
    id, 
    media, 
    sender,
    created_at, 
    content,
    message_type,
    transaction,
  } = message;

  const { 
    activeConversation,
    markMessageAsRead
  } = useChatbox();

  let is_read = message?.is_read;
  const audioUrl = media?.url || null;
  const requiresFeedback = message_type === MESSAGE_TYPES.DEMO && 
    transaction?.status !== "completed";

  const onIntersection = (entries, observer) => {
    for (const { isIntersecting, target } of entries) {
      if (isIntersecting) {
        handleMessagedAsRead();
        observer.unobserve(target);
      }
    }
  };
  const observer = new IntersectionObserver(onIntersection, {
    root: null,
    rootMargin: '0px',
    threshold: 1
  });

  useEffect(() => {
    audioRef.current = new Audio(audioUrl);
    audioRef.current.currentTime = 0;
    console.log('Audio ref Curr Time: ', audioRef.current.currentTime);
    if (!intersectionRef.current) return;
    observer.observe(intersectionRef.current);
  }, [])

  function handleMessagedAsRead(){
    if (is_read === true || sender.id === activeConversation.user.id) return;
    markMessageAsRead(id);
    is_read = true;
  }    

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

  const handleDemoPlayPause = useCallback((event: React.MouseEvent) => {
    if (isPlaying) {
      setIsPlaying(false);
      audioRef.current?.pause();
    } else {
      setIsPlaying(true);
      audioRef.current.play();

      audioRef.current.ontimeupdate = () => {
        if (audioRef.current) {
          const percentage = (audioRef.current.currentTime / audioRef.current.duration) * 100;
          setProgress(percentage);
        }
      };

      audioRef.current.onended = () => {
        setIsPlaying(false);
        setProgress(0);
        audioRef.current.currentTime = 0;
      };
    }
  }, [progress]); // Add dependencies as needed

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !progressBarRef.current) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    const time = (percentage / 100) * audioRef.current.duration;
    
    audioRef.current.currentTime = time;
    setProgress(percentage);
  };

  function renderDemoInFeebackThreadMessage() {
    return (
      <div className="bg-[#181A1D] h-[105px] w-[282px] border border-[#1C1C1C] box-border rounded-[8px] flex items-center justify-center">
        <div className="flex-col bg-[#202327] h-[85px] w-[262px] border border-[#3D3D3D] box-border rounded-[8px]">
          <div className="flex bg-[#202327] w-auto mx-[10px] mt-[10px] rounded-[8px]">
            <div className="flex">
              <PlayPauseButton isPlaying={isPlaying} onClick={handleDemoPlayPause}/>
            </div>
            <div className="ml-2 w-full flex-start">
              <span className="text-[14px] text-[#848484] min-w-[40px] w-full">
              "{truncateFilename(media?.file_name)}"
              {/* "{truncateFilenameByWidth("MMMMMMMMMMMMMMMMMMMMMMMMMMM", 262)}" */}
              
              </span>
              <div className="flex">
                <span className="text-[10px] text-[#666666] mx-[6px]">
                    {formatTime(media?.duration)}
                </span>
                <span className="text-[10px] text-[#666666]">
                    ({formatBytes(media.file_size_bytes)})
                </span>
              </div>
            </div>
            {/* Inner content can go here */}
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
                  {audioRef.current?.currentTime ? formatTime(audioRef.current.currentTime) : "0:00"}
                </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

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
                {renderDemoInFeebackThreadMessage()}
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
