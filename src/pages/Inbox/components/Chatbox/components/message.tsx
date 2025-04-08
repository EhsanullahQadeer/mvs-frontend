import moment from "moment";
import WaveSurfer from "wavesurfer.js";
import { useChatbox } from "../context";
import { useSelector } from "react-redux";
import TipMessage from "../../TipMessage";
import { RootState } from "redux/reducers";
import MessageOptions from "./messageOptions";
import { formatMediaDetails } from "../../../handlers/mediaUtils";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Thumbnail from "components/ui/Header/atoms/notificationAtoms/notificationThumbnail";
import { ReactComponent as AudioFileIcon } from "../../../../../assets/icons/audioFile.svg";
import RecordedAudioMessagePlayer from "components/ui/Header/molecules/chatboxMolecules/recordedAudioMessage";
import { MEDIA_TYPE, TRANSACTION_STATUS, IMessage, MESSAGE_TYPES, TRANSACTION_TYPE } from "api/messenger/objects/states.types";
import SampleMessage from "../../SampleMessage";


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
  console.log('Message: ', message);
  
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
              message?.sender?.id === authUserId && message.threadStats.hasUnreadMessage && (
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
        { (message.threadStats?.replyCount >= 1) && (
          <div className="flex gap-2.5 items-center pt-2">
            <div
              className="flex gap-1.5 items-center cursor-pointer w-full"
              onClick={() => {
                setIsThread(true);
                handleLoadThread(message?.id);
              }}
            >
              <Thumbnail professionalName={message?.threadStats?.professionalName} thumbnail={message?.threadStats?.lastReplierThumbnail} userId={message?.threadStats?.id} size="23"/>
              <span className="text-[10px] text-secondaryBlue font-normal cursor-pointer">
                {message?.threadStats?.replyCount} reply
              </span>

              {/* <span className="text-mediumGray text-[10px] font-normal group-hover:hidden">
                {lastMsgTimeStamp(message?.threadStats?.updated_at)}
              </span> */}

              <span className="text-mediumGray text-[10px] font-normal hidden group-hover:flex">
                See Thread
              </span>
              <div className="flex items-center gap-1 w-[30%]">
                {message?.threadStats?.hasUnreadMessage && (
                  <>
                    <div className="w-full h-[1px] bg-[#EF4444] rounded-full"></div>
                    <div className="text-[10px] text-[#EF4444] font-normal cursor-pointer">NEW</div>
                  </>
                )}
              </div>
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

  const handlePlayPauseClick = useCallback(() => {
    if (wavesurfer.current) {
      if (isPlaying) {
        wavesurfer.current.pause();
      } else {
        wavesurfer.current.play();
      }
      setIsPlaying(prev => !prev);
    }
  }, []);

  const handleMuteToggleClick = useCallback(() => {
    if (wavesurfer.current) {
      wavesurfer.current.setMuted(!isMuted);
      setIsMuted(prev => !prev);
    }
  }, []);

  
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

  useEffect(() => {
    if (message?.message_type === MESSAGE_TYPES.SAMPLE) {
      console.log('Message sample data:', {
        messageId: message.id,
        sample: message.sample,
        content: message.content,
        messageType: message.message_type
      });
    }
  }, [message]);

  return (
    <div ref={intersectionRef} className="overflow-visible">
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

      <div className="flex flex-wrap gap-2 px-4 py-2 w-full relative group hover:bg-gunMetal overflow-visible">
        <div 
          className="absolute -top-8 left-28 mt-2 mr-2 hidden group-hover:flex transition-opacity duration-200"
          style={{
            zIndex: 9999,
            position: 'absolute',
            pointerEvents: 'auto'
          }}
        >
          <MessageOptions
            id={id}
            isDemoSender={isDemoSender}
            isOwner={isDemoSender}
            handleEmojiSelect={() => {}}
          />
        </div>

        <div className="p-1">
          <Thumbnail professionalName={sender.professional_name} thumbnail={sender.thumbnail} size="40" userId={sender.id}/>
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
              <TipMessage amount={message?.transaction?.amount} message={message?.content}/>
              <div className="text-sm text-[#CACCCD] break-all whitespace-normal max-w-full w-full">{content}</div>
            </div>
          )}
          {message?.message_type === MESSAGE_TYPES.DEMO ? (
            <div className="flex flex-col gap-2">
              <div className="text-sm text-[#CACCCD] break-all whitespace-normal max-w-full w-full">{content}</div>
              {renderDemoMessage()}
            </div>
          ) : message?.message_type === MESSAGE_TYPES.SAMPLE ? (
            <div className="flex flex-col gap-2">
                <SampleMessage 
                  sample={message?.sample}
                  displayName={sender.professional_name}
                />
            </div>
          ) : media?.type === MEDIA_TYPE.RECORDING ? (
            <div id="2" className="flex mt-3">
              <RecordedAudioMessagePlayer isMuted={isMuted} waveformRef={waveformRef} isPlaying={isPlaying} duration={media?.duration} handleMuteToggle={handleMuteToggleClick} handlePlayPause={handlePlayPauseClick}/>
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
