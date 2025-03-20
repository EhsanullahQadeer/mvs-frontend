import moment from "moment";
import WaveSurfer from "wavesurfer.js";
import { useChatbox } from "../context";
import { useSelector } from "react-redux";
import TipMessage from "../../TipMessage";
import { RootState } from "redux/reducers";
import { formatTime } from "utils/dateUtils";
import VolumeIcon from '../../../../../assets/img/volume.svg';
import { formatMediaDetails } from "../../../handlers/mediaUtils";
import VolumeMuteIcon from '../../../../../assets/img/volume-x.svg';
import React, { useCallback, useEffect, useRef, useState } from "react";
import PlayPauseButton from "components/ui/Header/atoms/chatboxPlayPauseButton";
import { ReactComponent as AudioFileIcon } from "../../../../../assets/icons/audioFile.svg";
import { MEDIA_TYPE, TRANSACTION_STATUS, IMessage, MESSAGE_TYPES, TRANSACTION_TYPE } from "api/messenger/objects/states.types";

interface MessageProps {
  message: IMessage;
  index: number;
  prevMessageDate?: string;
}

const Message: React.FC<MessageProps> = ({
  message,
  index,
  prevMessageDate,
}) => {
  const {
    id,
    content,
    created_at,
    sender,
    media,
    transaction,
  } = message;
  
  const { 
    handleLoadThread,
    activeConversation,
    setIsThread,
    markMessageAsRead
  } = useChatbox();
  
  let is_read = message?.is_read;
  const intersectionRef = React.useRef(null);

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

  React.useEffect(() => {
    if (!intersectionRef.current) return;
    observer.observe(intersectionRef.current);
  }, [])

  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const claimed = transaction?.status === TRANSACTION_STATUS.COMPLETED;
  const authUserId = useSelector((state: RootState) => state.auth?.user?.id);
  const isDemoSender = authUserId === sender.id;
  const details = formatMediaDetails(
    media?.duration,
    media?.file_size_bytes
  );
  const currentMessageDate = moment(created_at).format("dddd, MMMM D, YYYY");
  const currentDateFormatted = moment(created_at).format("YYYY-MM-DD");
  const prevDateFormatted = prevMessageDate ? moment(prevMessageDate).format("YYYY-MM-DD") : null;
  // Only show date if it's the first message or if date is different from previous message
  const shouldShowDate = index === 0 || currentDateFormatted !== prevDateFormatted;
  
  // WaveSurfer vars
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const audioUrl = media?.url || null;

  // Progress Bar Vars
  const progressBarRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [progress, setProgress] = useState<number>(0);

  function renderTipMessage() {
    return <TipMessage amount={message?.transaction?.amount} message={message?.content} />
  }
  
  function handleMessagedAsRead(){
    if (is_read === true || sender.id === activeConversation.user.id) return;
    markMessageAsRead(id);
    is_read = true;
  }
  function renderDemoMessage() {
    return (
      <>
        <div className="bg-gunMetal border border-eerieBlack rounded-lg p-3.5 flex flex-col gap-3 w-[294px]">
            <div
              className={`overflow-hidden rounded-lg  flex flex-col gap-2.5 ${message?.threadStats?.replyCount === 1 
                  ? " border border-[#57AEFF] bg-[#002C55] p-3"
                  : ""
                }`}
            >
              <div
                className={`flex flex-row w-full text-coolGray border rounded-lg p-3 ${message?.threadStats?.replyCount === 1
                    ? "border border-[#57AEFF] bg-[#002C55]"
                    : "border-charcoalGray text-coolGray"
                  }`}
              >
                <div className={"flex border-dimGray text-dimGray border p-2.5 rounded-lg mr-2"}>
                  <AudioFileIcon />
                </div>

                <div>
                  <p className="font-normal text-sm text-silver flex">
                    <span>"</span>
                    <span className="line-clamp-1">
                      {media?.file_name}
                    </span>
                    <span>"</span>
                  </p>

                  <div className="px-1.5 text-dimGray font-normal text-[10px]">
                    {details.duration} ({details.size})
                  </div>
                </div>
              </div>


            { message?.threadStats?.replyCount === 1 &&
              message?.sender?.id === authUserId && (
              <div className="text-center mt-1 text-sm">
                <p className="text-white font-semibold py-2">
                  Feedback received on your demo!
                </p>
                <p className="text-coolGray font-normal">
                  Your audio has been reviewed, and the creator has
                  left their comments.
                </p>
              </div>
            )}
          </div>
          
          {message?.threadStats?.replyCount === 1 &&
              message?.sender?.id === authUserId && (
              <button
                onClick={() => {
                  setIsThread(true);
                  handleLoadThread(message?.id);
                }}                  
                className="bg-limeGreen py-3 px-4 w-full text-jetBlack text-sm font-semibold rounded-full mt-3">
                Review Feedback
              </button>)}

          {!(claimed || isDemoSender) && (
            <button
              onClick={() => {
                setIsThread(true);
                handleLoadThread(message?.id);
              }}
              className="bg-limeGreen py-3 px-4 w-full text-[#203300] text-sm font-semibold rounded-full"
            >
              Tap to earn ${transaction?.amount}{" "}
              {transaction?.amount > 6 ? "" : "- Tap to Unlock"}
            </button>
          )}
        </div>
        { (message.threadStats?.replyCount > 1 || (message.threadStats?.replyCount === 1 && message.sender.id !== authUserId)) && (
          <div className="flex gap-2.5 items-center pt-2">
            <div
              className="flex gap-1.5 items-center cursor-pointer w-max"
              onClick={() => {
                setIsThread(true);
                handleLoadThread(message?.id);
              }}
            >
              <div className="w-6 h-6 rounded-full bg-[#151515] border-[0.5px] border-[#343434] p-[1px]">
                <img
                  src={message?.threadStats?.lastReplierThumbnail}
                  alt="thumbnail"
                  className="w-full h-full rounded-full"
                />
              </div>
              <span className="text-[10px] text-secondaryBlue font-normal cursor-pointer">
                {message?.threadStats?.replyCount} reply
              </span>

              {/* <span className="text-mediumGray text-[10px] font-normal group-hover:hidden">
                {lastMsgTimeStamp(message?.threadStats?.updated_at)}
              </span> */}

              <span className="text-mediumGray text-[10px] font-normal hidden group-hover:flex">
                See Thread
              </span>
            </div>
          </div>
        )}
      </>
    )
  }

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

  useEffect(() => {
    // Preload or set up audioRef and progressBarRef if necessary
    // For example, you might want to load the audio source here
    // audioRef.current = new Audio('your-audio-source.mp3');
    audioRef.current = new Audio(audioUrl);
  }, []);

  const handlePlayPause = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    if (wavesurfer.current) {
      if (isPlaying) {
        wavesurfer.current.pause();
      } else {
        wavesurfer.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);

  const handleDemoPlayPause = useCallback((event: React.MouseEvent) => {
    console.log('Current Progress: ', progress);
    if (isPlaying) {
      console.log('Pausing...');
      setIsPlaying(false);
      audioRef.current?.pause();
    } else {
      console.log('Playing...');
      setIsPlaying(true);
      //audioRef.current = new Audio(media?.url);
      audioRef.current.play();

      audioRef.current.ontimeupdate = () => {
        if (audioRef.current) {
          //console.log('audioRef currentTime: ', audioRef.current.currentTime);
          const percentage = (audioRef.current.currentTime / audioRef.current.duration) * 100;
          //console.log('Percentage: ', percentage);
          setProgress(percentage);
        }
      };

      audioRef.current.onended = () => {
        setIsPlaying(false);
        setProgress(0);
      };
    }
  }, [progress]); // Add dependencies as needed
  

  const handleMuteToggle = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    if (wavesurfer.current) {
      wavesurfer.current.setMuted(!isMuted);
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  function renderAudioRecordingMessage() {
    return (
      <div className="bg-[#242424] h-[56px] w-[234px] border border-[#3D3D3D] box-border rounded-full">
        <div className="mx-3 h-full flex justify-between items-center">
          <PlayPauseButton isPlaying={isPlaying} onClick={handlePlayPause}/>
          <div className="flex-1 mx-4">
            <div 
              ref={waveformRef} 
              className="waveform w-full max-w-full overflow-hidden"
              style={{ maxWidth: '100%' }}
            />
          </div>
          <div className="items-end">
            <span className="text-[14px] text-[#848484] min-w-[40px] flex-shrink-0 mr-3">
              {formatTime(media?.duration)}
            </span>
          </div>
          <button 
            onClick={handleMuteToggle}
            className="w-6 h-6 flex items-center justify-center flex-shrink-0 mr-2 hover:opacity-80"
          >
            <img 
              src={isMuted ? VolumeMuteIcon : VolumeIcon} 
              alt={isMuted ? "Unmute" : "Mute"} 
              className="w-6 h-6"
            />
          </button>
        </div>
      </div>
    )
  }

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log('Before return');
    if (!audioRef.current || !progressBarRef.current) return;
    console.log('After return');

    const rect = progressBarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    const time = (percentage / 100) * audioRef.current.duration;
    
    audioRef.current.currentTime = time;
    console.log('Setting Progress: ', percentage);
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
                "Soundboyz - Bidi Bam"
              </span>
              <div className="flex">
                <span className="text-[10px] text-[#666666] mx-[6px]">
                    {formatTime(media?.duration)}
                </span>
                <span className="text-[10px] text-[#666666]">
                    (20 MB)
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
                    {formatTime(media?.duration)}
                </span>
            </div>
          </div>


        </div>
      </div>
    )
  }
  
  // async function emojiPassthrough(id:number, emoji:any){
  //   const userId = user.id;
  //   const emojiUsage: {id:number,name:string}[] = reactions[emoji]?.users ?? [];
  //   if(emojiUsage.length > 0 && emojiUsage.filter((val)=>val.id===userId).length > 0) {
  //     await deleteReactionMessage({messageId:id,emoji})
  //   }
  //   else{
  //     await addReactionMessage({messageId:id,emoji});      
  //   }
  //   // refreshMessages();
  // }

  // function handleEmojiSelect(id: number, emoji:any):void{
  //   console.log('test', id, emoji);
  //   console.log('reactions', reactions);
  //   emojiPassthrough(id, emoji);
  // }

  return (
    <div ref={intersectionRef}>
      {shouldShowDate && (
        <div className="flex items-center w-full justify-between px-4">
          <div className="flex-1 p-2.5 text-coolGray">
            <hr />
          </div>
          <div className="p-2.5 text-sm font-normal text-silver">
            {currentMessageDate}
          </div>
          <div className="flex-1 p-2.5 text-coolGray">
            <hr />
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2 px-4 py-2 w-full relative group hover:bg-gunMetal">
        <div className="absolute -top-8 left-28 mt-2 mr-2 hidden group-hover:flex transition-opacity duration-200">
          {/* <MessageReactions
            // handleEmojiSelect = {handleEmojiSelect}
            id={id}
            isDemoSender={isDemoSender}
            isOwner={isDemoSender}
          /> */}
        </div>

        <div className="flex rounded-full p-0.5 w-12 h-12">
          <div className="w-full h-full rounded-full border-[2px] border-[#151515]">
            <div
              style={{ backgroundImage: `url("${sender.thumbnail}")` }}
              className="w-full h-full rounded-full bg-cover bg-center"
            ></div>
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-4 items-start">
            <div className="font-semibold text-sm text-white">
              {sender.professional_name}
            </div>
            <div className="text-grayBlue text-sm">{moment(created_at).format("h:mm A")}</div>
          </div>

          {message?.transaction?.type === TRANSACTION_TYPE.TIP && (
            <div className="flex flex-col gap-2">
              {renderTipMessage()}
              <div className="text-sm text-[#CACCCD] break-all whitespace-normal max-w-full w-full">{content}</div>
            </div>
          )}
          {message?.message_type === MESSAGE_TYPES.DEMO ? (
            <div className="flex flex-col gap-2">
              <div className="text-sm text-[#CACCCD] break-all whitespace-normal max-w-full w-full">{content}</div>
              {renderDemoMessage()}
            </div>

          ) : media?.type === MEDIA_TYPE.RECORDING ? (
            <div
            id="2"
            className="flex relative gap-1 items-center self-start rounded-2xl h-full w-auto audio-2 mt-3"
            >
              {renderDemoInFeebackThreadMessage()}
            </div>
          ) : null}
          <div className={`text-sm text-[#CACCCD] break-all whitespace-normal overflow-hidden max-w-full w-full ${
            (() => {
              const isValidMessage = message &&
                typeof message === 'object' &&
                'message_type' in message &&
                message.message_type === MESSAGE_TYPES.MESSAGE;
              return isValidMessage ? "" : "hidden";
            })()
          }`}>
            {typeof message?.content === 'string' ? message?.content : ''}
          </div>
          {/* {Object.entries(reactions).length > 0 && (<div className="mt-1 bg-eclipseGray border border-charcoalGray flex px-2 py-1 justify-center items-center w-fit rounded-full gap-1">
          {
            Object.entries(reactions).map((emoji)=>{
              return (
                <span key={emoji[0]} className="text-xl">
                  {emoji[0]}
                  <span className="ml-2 text-sm text-white">{emoji[1].count}</span>
                </span>
              );
            })
          }
          </div>)} */}
        </div>
      </div>
    </div>
  );
};

export default Message;
