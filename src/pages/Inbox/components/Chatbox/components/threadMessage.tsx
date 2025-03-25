import moment from "moment";
import WaveSurfer from "wavesurfer.js";
import { useChatbox } from "../context";
import { FiUnlock } from "react-icons/fi";
import { useState, useEffect, useRef, useCallback } from "react";
import { IMessage, MEDIA_TYPE, MESSAGE_TYPES } from "api/messenger/objects/states.types";
import RecordedAudioMessagePlayer from "components/ui/Header/molecules/chatboxMolecules/recordedAudioMessage";
import DemoPlayerFeedbackThread from "components/ui/Header/molecules/chatboxMolecules/audioDemoPlayerFeedbackThread";

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

  // WaveSurfer vars
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  
  const { message } = props;
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
    if (!intersectionRef.current) return;
    observer.observe(intersectionRef.current);
  }, [])

  useEffect(() => {
    if (!waveformRef.current || !audioUrl) return;

    const ws = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: '#B2B2B2',
      progressColor: '#9EFF00',
      cursorColor: '#848484',
      barWidth: 2,
      barRadius: 1,
      cursorWidth: 0,
      height: 16,
      barGap: 4,
      normalize: true,
      fillParent: true,
      fetchParams: {
        cache: 'default',
        mode: 'cors',
      }
    });

    wavesurfer.current = ws;

    ws.on('pause', () => {
      setIsPlaying(false);
    });

    ws.on('finish', () => {
      setIsPlaying(false);
    });

    ws.on('error', (err) => {
      console.error('WaveSurfer error:', err);
    });

    ws.load(audioUrl);

    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy();
        wavesurfer.current = null;
      }
    };
  }, [audioUrl]);

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

  const handleDemoPlayPause = useCallback(() => {
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
  }, []); // Add dependencies as needed

  const handleRecordedAudioPlayPause = useCallback(() => {
    if (wavesurfer.current) {
      if (isPlaying) {
        wavesurfer.current.pause();
      } else {
        wavesurfer.current.play();
      }
      setIsPlaying(prev => !prev);
    }
  }, []);

  const handleRecordedAudioMuteToggle = useCallback(() => {
    if (wavesurfer.current) {
      wavesurfer.current.setMuted(!isMuted);
      setIsMuted(prev => !prev);
    }
  }, []);

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !progressBarRef.current) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    const time = (percentage / 100) * audioRef.current.duration;
    
    audioRef.current.currentTime = time;
    setProgress(percentage);
  };

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
                <DemoPlayerFeedbackThread isPlaying={isPlaying} duration={media?.duration} fileName={media?.file_name} fileSizeBytes={media?.file_size_bytes} handlePlayPause={handleDemoPlayPause} progressBarRef={progressBarRef} handleProgressBarClick={handleProgressBarClick} progress={progress} currentTime={audioRef.current?.currentTime}/>
              </div>
              {requiresFeedback && renderActionRequired()}
            </>
          ) : media?.type === MEDIA_TYPE.RECORDING ? (
            <div className="flex mt-2">
              <RecordedAudioMessagePlayer isMuted={isMuted} waveformRef={waveformRef} isPlaying={isPlaying} duration={media?.duration} handleMuteToggle={handleRecordedAudioMuteToggle} handlePlayPause={handleRecordedAudioPlayPause}/>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ThreadMessage;