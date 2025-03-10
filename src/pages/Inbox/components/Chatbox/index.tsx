/* eslint-disable @typescript-eslint/no-unused-vars */

/* IMPORTS */
import { useChatbox } from "./context";
import Footer from "./components/footer";
import NotesSection from "../NotesSection";
import Message from "./components/message";

import InfoSection from "./components/infoTab";
import { useNavigate } from "react-router-dom";
import { GrShareOption } from "react-icons/gr";
import { CircularProgress } from "@mui/material";
import { FiUser, FiUserX } from "react-icons/fi";
import { useEffect, useRef, useState, useCallback } from "react";
import { getConversationNotes } from "api/messenger";
import { useMessenger } from "api/messenger/context";
import ChatboxTabs from "pages/Inbox/components/Chatbox/components/tabs";
import { LuShieldAlert, LuBellOff } from "react-icons/lu";
import { useNotification } from "services/WebSocket/useNotification.hook";
import { useUnreadCount } from "theme/Sidebar/useUnreadCount";
import InboxDropdownMenu from "../ActionMenu";
import TipMessage from "../TipMessage";
import { useConversation } from "../Directory/context";
import ThreadMessage from "./components/threadMessage";
import { AudioRecordingProvider } from "./components/audioRecorder";
import CheckerIcon from "../../../../assets/icons/checker.svg";
import { IMessage } from "api/messenger/objects/states.types";
import { ReactComponent as MenuIcon } from "../../../../assets/icons/menuIcon.svg";

import notificationSound from "../../../../assets/audio/mvssive-message-notification.mp3";

const Chatbox = ({ onClose }: { onClose: () => void }) => {
  const {
    getConversationInfo,
    recipient,
    refreshMessages,
    isThread,
    setIsThread
  } = useChatbox();
  const {
    activeConversation,
    setActiveConversation,
  } = useConversation();
  const {
    messages,
    conversationNotes,
    getTotalConversationUnread,
    setThreadMessages,
    threadMessages
  } = useMessenger();

  const [menuSection, setMenuSection] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("messages");
  const [prevIsThread, setPrevIsThread] = useState(isThread);
  const [isAnimating, setIsAnimating] = useState(false);

  const messagesRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (prevIsThread !== isThread) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setPrevIsThread(isThread);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [isThread, prevIsThread]);
  
  // Determine animation classes based on transition state
  const getAnimationClass = () => {
    if (!isAnimating) return '';
    
    if (isThread) {
      return 'animate-slide-left';
    } else {
      return 'animate-slide-right';
    }
  };

  function initialize() {
    getConversationInfo();
    getConversationNotes({
      conversationId: activeConversation?.id,
      ascending: true
    });
  }

  useEffect(() => {
    if (activeConversation) {
      console.log("activeConversation", activeConversation);
      initialize();
    }
  }, [activeConversation]);

  const { refreshUnreadCount } = useUnreadCount();

  useEffect(() => {
    audioRef.current = new Audio(notificationSound);
    audioRef.current.load();
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playSound = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Audio played successfully
          })
          .catch(err => {
            console.warn('Could not play notification sound:', err);
          });
      }
    }
  }, []);

  useNotification("NEW_MESSAGE", (data) => {
    if (!document.hasFocus()) {
      playSound();
    }
    
    refreshMessages();
    refreshUnreadCount();
  });

  useEffect(() => {
    if (messages !== null && messages !== undefined) {
      setLoading(false);
    }
  }, [messages]);

  useEffect(() => {
    setTimeout(() => {
      const messageContainer = messagesRef.current;
      if (messageContainer) {
        messageContainer.scrollTop = messageContainer.scrollHeight;
      }
    });
  }, [messages, conversationNotes]);

  // const handleDemoBtn = (msgId: number) => {
  //   localStorage.setItem("msgId", msgId.toString());
  //   navigate(`/inbox/${id}/thread`);
  // };

  // const handleReviewBtn = async (msgId: number) => {
  //   localStorage.setItem("msgId", msgId.toString());
  //   navigate(`/inbox/${id}/thread`);
  //   try {
  //     await toggleMessageRead({ messageId: msgId });
  //     await getConvMessages(conversation);
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  // const handleThreadReply = (msgId: number) => {
  //   localStorage.setItem("msgId", msgId.toString());
  //   navigate(`/inbox/${id}/thread`);
  // };

  // const findThreadReplyObj = (msgId: number) => {
  //   if (Array.isArray(messages)) {
  //     return messages.filter((msg: IMessage) => msg.reply_to?.id === msgId);
  //   } else if (messages && typeof messages === 'object') {
  //     const messagesArray = Object.values(messages);
  //     if (messagesArray.length > 0 && Array.isArray(messagesArray[0])) {
  //       return messagesArray.flat().filter((msg: IMessage) => msg.reply_to?.id === msgId);
  //     } else {
  //       return messagesArray.filter((msg: IMessage) => msg.reply_to?.id === msgId);
  //     }
  //   }
  //   return [];
  // };

  const handleMenuSection = () => {
    setMenuSection(!menuSection);
  };

  const dropdownMenuOptions = [
    {
      label: "Go to Profile",
      icon: <FiUser />,
      func: () => {navigate(`/profile/${activeConversation?.recipient?.username}`)},
    },
    {
      label: "Share Profile",
      icon: <GrShareOption />,
      func: () => { },
    },
    {
      label: "Report User",
      icon: <LuShieldAlert />,
      func: () => { },
    },
    {
      label: "Mute Notifications",
      icon: <LuBellOff />,
      func: () => { },
    },
    {
      label: "Block User",
      icon: <FiUserX />,
      func: () => { },
    },
  ];

  return (
    <div className="flex flex-col h-full w-full border-l border-eerieBlack bg-richBlack relative">
      <div className="flex flex-col h-full">
        <div className="flex flex-col w-full max-md:max-w-full bg-richBlack">

          <div className="flex text-white items-center p-2 border-b border-[#1F1F1F]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={onClose} className="cursor-pointer transform scale-x-[-1]">
              <path d="M18 7L13 12L18 17M11 7L6 12L11 17" stroke="#666666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div className="flex flex-wrap gap-5 justify-between items-center p-4 w-full">
            <div className="flex gap-2 items-center">
              <div className="flex rounded-full p-0.5 w-12 h-12 aspect-square">
                <div className="w-full h-full rounded-full border-[2px] border-[#151515]">
                  <div
                    style={{ backgroundImage: `url("${recipient?.thumbnail}")` }}
                    className="w-full h-full rounded-full bg-cover bg-center"
                  ></div>
                </div>
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="text-sm font-semibold text-white">
                  {recipient?.name}
                </div>
                <div className="text-xs text-silver font-normal">
                  {recipient?.country}, {recipient?.region}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div
                onClick={handleMenuSection}
                className="flex justify-center items-center w-9 h-9 rounded bg-[#242424] cursor-pointer text-silver relative"
              >
                <MenuIcon className="w-5 h-5" />

                {menuSection && (
                  <InboxDropdownMenu {...{ setMenuSection, dropdownMenuOptions}} />
                )}
              </div>
            </div>
          </div>
          <div className="flex px-4 py-2 w-full">
            <ChatboxTabs tab={activeTab} setter={setActiveTab} />
          </div>
        </div>
        <div className="flex flex-col flex-1 relative overflow-hidden">
          {messages === null ? (
            <div className="absolute top-0 left-0 bottom-0 right-0 w-full h-full flex justify-center items-center">
              <CircularProgress
                sx={{
                  width: "40px !important",
                  height: "40px !important",
                  color: "#9EFF00",
                }}
              />
            </div>
          ) : (
            <div
              ref={messagesRef}
              className="flex flex-col flex-1 py-3 overflow-y-auto overflow-x-hidden w-full custom-dropdown"
            >
              {activeTab === "messages" && (
                <>
                  {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center px-4">
                      <div className="text-limeGreen text-xl mb-2">
                        Start your conversation!
                      </div>
                      <p className="text-coolGray text-sm max-w-md">
                        Send a message to begin connecting with {recipient?.name}.
                      </p>
                    </div>
                  ) : (
                    <div className={`flex flex-col flex-1 w-full overflow-x-hidden overflow-y-auto ${getAnimationClass()}`}>
                      {isThread ? (
                        <>
                          <div className="sticky top-0 z-10 bg-[#131313] border-b border-[#242424] px-4 py-2 flex items-center justify-between">
                            <div className="flex items-center">
                              <span className="text-white text-sm font-medium">Thread</span>
                            </div>
                            <button 
                              onClick={() => {
                                setIsThread(false);
                                setThreadMessages(null);
                              }}
                              className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-[#242424] transition-colors"
                            >
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13 1L1 13" stroke="#9EFF00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M1 1L13 13" stroke="#9EFF00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </button>
                          </div>
                          {threadMessages && threadMessages?.length > 0 ? (
                            <div className="w-full overflow-x-hidden overflow-y-auto">
                              {threadMessages?.map((message: IMessage, index) => (
                                <>
                                  <ThreadMessage
                                    key={message.id}
                                    message={message}
                                    index={index}
                                  />
                                  {index === 1 && threadMessages.length > 1 && (
                                    <div className="my-4 w-full text-charcoalGray flex items-center justify-center">
                                      <div className="h-px w-full m-2 bg-charcoalGray"></div>
                                      <div className="flex gap-2 text-sm font-medium items-center text-[#CACACA]">
                                        <div className="w-5 h-5">
                                          <img
                                            className="w-full h-full object-cover"
                                            src={CheckerIcon}
                                            alt=""
                                          />
                                        </div>
                                        <h4>Completed!</h4>
                                      </div>
                                      <div className="h-px w-full m-2 bg-charcoalGray"></div>
                                    </div>
                                  )}
                                </>
                              ))}
                            </div>
                          ) : (
                            <div className="relative w-full h-full flex-1 overflow-hidden">
                              <div className="absolute inset-0 flex justify-center items-center">
                                <CircularProgress
                                  sx={{
                                    width: "40px !important",
                                    height: "40px !important",
                                    color: "#9EFF00",
                                  }}
                                />
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="w-full overflow-x-hidden">
                          {messages.map((message: IMessage, index) => (
                            <Message
                              key={message.id}
                              message={message}
                              index={index}
                              prevMessageDate={index > 0 ? messages[index - 1].created_at : undefined}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
              {activeTab === "info" && (
                <InfoSection />
              )}
              {activeTab === "notes" && (
                <NotesSection />
              )}
            </div>
          )}
        </div>
        <AudioRecordingProvider>
          <Footer />
        </AudioRecordingProvider>
      </div>
    </div>
  );
};

export default Chatbox;