import { useState, useEffect, useRef } from "react";
import { IConversation } from "./types";
import { getConversationFilesInfo } from "api/messenger";
import { FiDownload } from "react-icons/fi";

type Props = {
  conversation: IConversation;
};

const InfoSection = (props: Props) => {
  const { conversation } = props;

  const { 
    displayName, 
    recipient_id,
    user_a, 
    user_b,
    total_payments_a,
    total_payments_b,
  } = conversation;
  const splitName = displayName.trim().split(" ");
  const firstName = displayName
    ? splitName.length > 0
      ? splitName[0]
      : "..."
    : "...";
  const lastName = displayName
    ? splitName.length > 1
      ? splitName.slice(1).join(" ")
      : "..."
    : "...";

  const recipientUser = user_b?.id === recipient_id ? user_b : user_a;

  const totalPayment = recipientUser?.id === user_a?.id ? total_payments_a : total_payments_b;

  const [filesInfo, setFilesInfo] = useState<any[]>([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const filesContainerRef = useRef<HTMLDivElement>(null);
  const TAKE = 10;
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const getConversationInfo = async () => {
    try {
      const response = await getConversationFilesInfo(conversation.id, skip, TAKE);
      const newFiles = response.data.data;
      console.log("newFiles... here", newFiles);
      setFilesInfo(prev => [...prev, ...newFiles]);
      setHasMore(newFiles.length === TAKE);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  useEffect(() => {
    // Reset states when conversation changes
    setFilesInfo([]);
    setSkip(0);
    setHasMore(true);
    // Stop any playing audio
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayingAudio(null);
      setProgress(0);
    }
  }, [conversation.id]);

  // Add cleanup effect to stop audio when component unmounts
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        setPlayingAudio(null);
        setProgress(0);
      }
    };
  }, []);

  useEffect(() => {
    getConversationInfo();
  }, [skip, conversation.id]); // Add conversation.id as dependency

  const handleScroll = () => {
    const container = filesContainerRef.current;
    if (!container || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    if (scrollHeight - scrollTop <= clientHeight + 100) { // 100px before bottom
      setSkip(prev => prev + TAKE);
    }
  };

  const handlePlayPause = (index: number, url: string) => {
    if (playingAudio === index) {
      audioRef.current?.pause();
      setPlayingAudio(null);
    } else {
      audioRef.current?.pause();
      audioRef.current = new Audio(url);
      audioRef.current.play();
      setPlayingAudio(index);

      audioRef.current.ontimeupdate = () => {
        if (audioRef.current) {
          const percentage = (audioRef.current.currentTime / audioRef.current.duration) * 100;
          setProgress(percentage);
        }
      };

      audioRef.current.onended = () => {
        setPlayingAudio(null);
        setProgress(0);
      };
    }
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (playingAudio !== index || !audioRef.current || !progressBarRef.current) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    const time = (percentage / 100) * audioRef.current.duration;
    
    audioRef.current.currentTime = time;
    setProgress(percentage);
  };

  return (
    <div className="flex flex-col w-[100%] px-4">
      <div className="flex gap-4 justify-center items-center w-full">
        <div className="flex flex-col flex-1 shrink self-stretch my-auto basis-0">
          <div className="gap-2.5 self-stretch py-2.5 w-full text-xs font-semibold leading-none text-white">
            First Name
          </div>
          <div className="gap-2 self-stretch px-3.5 py-2.5 w-full text-sm leading-none text-center whitespace-nowrap rounded-lg border border-solid border-neutral-200 text-neutral-200">
            {firstName}
          </div>
        </div>
        <div className="flex flex-col flex-1 shrink self-stretch my-auto basis-0">
          <div className="gap-2.5 self-stretch py-2.5 w-full text-xs font-semibold leading-none text-white">
            Last Name
          </div>
          <div className="gap-2 self-stretch px-3.5 py-2.5 w-full text-sm leading-none text-center whitespace-nowrap rounded-lg border border-solid border-neutral-200 text-neutral-200">
            {lastName}
          </div>
        </div>
      </div>
      <div className="flex gap-4 justify-center items-center mt-4 w-full">
        <div className="flex flex-col flex-1 shrink self-stretch my-auto basis-0">
          <div className="gap-2.5 self-stretch py-2.5 w-full text-xs font-semibold leading-none text-white">
            User Role
          </div>
          <div className="gap-2 self-stretch px-3.5 py-2.5 w-full text-sm leading-none text-center whitespace-nowrap rounded-lg border border-solid border-neutral-200 text-neutral-200">
            {recipientUser?.primary_role ? recipientUser?.primary_role : "..."}
          </div>
        </div>
      </div>
      <div className="flex gap-4 justify-center items-center mt-4 w-full">
        <div className="flex flex-col flex-1 shrink self-stretch my-auto basis-0">
          <div className="gap-2.5 self-stretch p-2.5 w-full text-xs font-semibold leading-none text-white">
            Amount Spent
          </div>
          <div className="gap-2 self-stretch px-3.5 py-2.5 w-full text-sm leading-none text-center whitespace-nowrap bg-lime-400 rounded-lg text-stone-950">
            ${totalPayment}
          </div>
        </div>
        <div className="flex flex-col flex-1 shrink self-stretch my-auto basis-0">
          <div className="gap-2.5 self-stretch p-2.5 w-full text-xs font-semibold leading-none text-white">
            Files Submitted
          </div>
          <div className="gap-2 self-stretch px-3.5 py-2.5 w-full text-sm leading-none text-center whitespace-nowrap rounded-lg border border-solid border-neutral-200 text-neutral-200">
            {filesInfo.length}
          </div>
        </div>
      </div>
      <div className="border mt-5 border-solid bg-stone-500 border-stone-500 w-[100%] min-h-[1px]" />

      <div className="mt-5 w-[100%]">
        <div className="flex gap-2.5 items-center px-4 py-2 text-sm font-semibold leading-none max-w-[397px]">
          <div className="overflow-hidden gap-2.5 self-stretch p-2 my-auto text-black bg-lime-400 rounded">
            Files History
          </div>
        </div>
      </div>

      <div 
        ref={filesContainerRef}
        className="mt-5 history w-[100%] max-h-[400px] overflow-y-auto"
        onScroll={handleScroll}
      >
        {filesInfo?.map((file, index) => (
          <div key={index} className="flex items-center px-4 py-3 border-b border-stone-900">
            <div className="flex flex-1 shrink gap-3 justify-between items-center self-stretch my-auto w-full basis-0 min-w-[240px]">
              <div className="flex items-center self-stretch my-auto font-semibold whitespace-nowrap w-[145px]">
                <div className="flex flex-col justify-center self-stretch my-auto w-[129px]">
                  <div className="text-sm leading-none text-white">
                    {file?.file_name?.length > 20 
                      ? `${file?.file_name?.slice(0, 20)}...` 
                      : file?.file_name}
                  </div>
                  <div className="self-start text-xs text-neutral-400">
                    {new Date(file?.created_at).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-neutral-400">
                    {(file?.file_size_bytes / 1024 / 1024).toFixed(2)} MB
                  </div>
                </div>
              </div>
              <div className="flex overflow-hidden gap-1 items-center self-stretch px-3 py-2.5 my-auto w-40 rounded-2xl border border-solid bg-neutral-800 border-neutral-700 min-h-[44px]">
                <div className="flex gap-2.5 justify-center items-center self-stretch my-auto w-6">
                  <button 
                    onClick={() => handlePlayPause(index, file?.url)}
                    className="w-6 h-6 bg-lime-400 rounded-full flex items-center justify-center"
                  >
                    {playingAudio === index ? (
                      <div className="flex gap-[3px] items-center justify-center">
                        <div className="w-[3px] h-[10px] bg-black"></div>
                        <div className="w-[3px] h-[10px] bg-black"></div>
                      </div>
                    ) : (
                      <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-black border-b-[6px] border-b-transparent ml-1" />
                    )}
                  </button>
                </div>
                <div 
                  ref={progressBarRef}
                  className="flex relative flex-col flex-1 shrink justify-center self-stretch px-2.5 py-2.5 my-auto basis-0 cursor-pointer"
                  onClick={(e) => handleProgressBarClick(e, index)}
                >
                  <div className="w-full h-[2px] bg-zinc-700">
                    <div 
                      className="h-full bg-lime-400 transition-all duration-100"
                      style={{ 
                        width: `${playingAudio === index ? progress : 0}%` 
                      }}
                    />
                  </div>
                  <div 
                    className="flex absolute top-2/4 z-0 w-2.5 h-2.5 rounded-full -translate-y-2/4 bg-lime-400 min-h-[10px]"
                    style={{ 
                      left: `${playingAudio === index ? progress : 0}%`,
                      transform: `translateX(-50%) translateY(-50%)`
                    }}
                  />
                </div>
                <div className="gap-2.5 self-stretch my-auto text-xs leading-none whitespace-nowrap text-zinc-400">
                  {file?.duration}s
                </div>
              </div>
              <div className="flex gap-2.5 justify-center items-center self-stretch my-auto w-9 h-9 bg-zinc-900 min-h-[36px]">
                <a href={file?.url} target="_blank" rel="noopener noreferrer" className="flex self-stretch my-auto min-h-[16px]">
                  <FiDownload className="w-4 h-4 text-lime-400" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoSection;
