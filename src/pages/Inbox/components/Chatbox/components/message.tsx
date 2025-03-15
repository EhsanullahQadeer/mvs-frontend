import moment from "moment";
import { useChatbox } from "../context";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import TipMessage from "../../TipMessage";
import { RootState } from "redux/reducers";
import { formatTime } from "utils/dateUtils";
import { useMessenger } from "api/messenger/context";
import MessageReactions from "../../MessageReactions";
import { formatMediaDetails } from "../../../handlers/mediaUtils";
import PlayPauseButton from "components/ui/Header/atoms/chatboxPlayPauseButton";
import { ReactComponent as AudioFileIcon } from "../../../../../assets/icons/audioFile.svg";
import { MEDIA_TYPE, TRANSACTION_STATUS, IMessage, MESSAGE_TYPES, TRANSACTION_TYPE } from "api/messenger/objects/states.types";
import { AudioTrack, Waveform } from "components/SampleContainer/components/waveform";

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
    reactions
  } = message;

  const {
    addReactionMessage,
    deleteReactionMessage,
  } = useMessenger();
  
  const { 
    handleLoadThread,
    activeConversation,
    isThread,
    setIsThread,
    refreshMessages,
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

  // Function to toggle the isPlaying state
  const togglePlayPause = () => {
    setIsPlaying(prev => !prev);
  };

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
              className={`overflow-hidden rounded-lg  flex flex-col gap-2.5 ${message?.threadStats?.replyCount == 1 
                  ? " border border-[#57AEFF] bg-[#002C55] p-3"
                  : ""
                }`}
            >
              <div
                className={`flex flex-row w-full text-coolGray border rounded-lg p-3 ${message?.threadStats?.replyCount == 1
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

  function renderAudioRecordingMessage() {
    console.log('Recorded Audio Message: ', message);
    // Create the AudioTrack object from the media object
    const audioTrack: AudioTrack = {
      id: media?.id || 0, // Use media.id or a default value
      src: media?.url || '', // Use media.url or an empty string
    };

    console.log('Audio Track: ', audioTrack);
    return (
      <div className="bg-[#242424] h-[56px] w-[234px] border border-[#3D3D3D] box-border rounded-full mt-2">
        <div className="mx-3 h-full flex justify-between items-center">
        <PlayPauseButton isPlaying={isPlaying} onClick={togglePlayPause}/>
        <div className="h-[32px]">
          <Waveform 
          track={audioTrack}
          trackDuration={media?.duration}
          columns={60}
          hover_cursor={true}
          options={{
            colors: {
              default: 'white'
            },
            activeHeight: '0%',
            radius: '5px',
          }}
          />
        </div>
        <div className="items-end">
        <span className="text-[14px] text-[#848484] min-w-[40px] flex-shrink-0">
          {formatTime(media?.duration)}
        </span>
        </div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.54 8.45972C16.4774 9.39736 17.004 10.6689 17.004 11.9947C17.004 13.3205 16.4774 14.5921 15.54 15.5297M19.0701 4.92969C20.9448 6.80496 21.9979 9.34805 21.9979 11.9997C21.9979 14.6513 20.9448 17.1944 19.0701 19.0697M11 4.99976L6 8.99976H2V14.9998H6L11 18.9998V4.99976Z" stroke="#B2B2B2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
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
            className="flex relative gap-1 items-center self-start rounded-2xl h-full w-auto audio-2 mt-2"
            >
              {renderAudioRecordingMessage()}
              {/* <audio
                controls
                className="h-10 rounded-full bg-[#242424] border border-[#3D3D3D] [&::-webkit-media-controls-panel]{background-color:#242424} [&::-webkit-media-controls-current-time-display]:text-[#9EFF00] [&::-webkit-media-controls-time-remaining-display]:text-[#9EFF00] [&::-webkit-media-controls-timeline]:text-[#9EFF00] [&::-webkit-media-controls-play-button]:text-[#9EFF00] [&::-webkit-media-controls-timeline]{accent-color:#9EFF00}"
                src={media?.url}
                preload="metadata"
              >
                <source src={media?.url} type={media?.mime_type || 'audio/webm'} />
                Your browser does not support the audio element.
              </audio> */}
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
