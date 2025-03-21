import { IArtistProfileData } from "./types";
import { MdVerified } from "react-icons/md";
import { FiInfo, FiSend, FiUpload, FiUserPlus } from "react-icons/fi";
import { LiaEllipsisHSolid } from "react-icons/lia";
import { useRef, useState } from "react";
import pauseIcon from "../../../assets/img/player/pause-circle.svg";
import playIcon from "../../../assets/img/player/play-circle.svg";
import { RootState } from "redux/reducers";
import { useSelector } from "react-redux";
import {
  createNewConversation,
  getConversationsWithUser
} from "api/messenger";
import Chatbox from "pages/Inbox/components/Chatbox";
import { requestConncetAPI } from "api/user";
import avatarImg from "../../../assets/img/avatar.svg";
import { useNotification } from "services/WebSocket/useNotification.hook";
import { useMessages } from "../../../pages/profile/messageContextProvider";
import { GoDotFill } from "react-icons/go";
import { LuCalendar, LuDollarSign } from "react-icons/lu";
import { ICreateNewConversation, IGetConversationsWithUser } from "api/messenger/objects/api.interfaces";
import { ChatboxProvider } from "pages/Inbox/components/Chatbox/context";
import { useNavigate } from "react-router-dom";
import { useMessenger } from "api/messenger/context";
import { ConversationProvider } from "pages/Inbox/components/Directory/context";

type Props = {
  artistData: IArtistProfileData | null;
  creditsData: {
    thumbnail: string;
    track_name: string;
    artists: any;
    preview_url: any;    
  }[];
  connectionDetail: any;
  setConnectionDetail: (value: any) => void;
  chatOpen: boolean;
  setChatOpen: (chatOpen: boolean) => void;
};

const ProfileAboutSection = (props: Props) => {


  const { 
    setActiveConversation,
    activeConversation,
    setMessages,
    messages,
    getConversationMessages
  } = useMessenger();

  const { artistData, creditsData, connectionDetail, setConnectionDetail, chatOpen, setChatOpen } =
    props;
  const [hoveredRow, setHoveredRow] = useState<number | null>(null); // State to track hovered row
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState<number | null>(
    null
  ); // Track the currently playing index
  const audioRef = useRef<HTMLAudioElement | null>(null); // Ref for the audio element
  const [showChat, setShowChat] = useState(false);
  const [chatData, setChatData] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: RootState) => state);
  const navigate = useNavigate();
  const isConnectionPending =
    connectionDetail === false ||
    connectionDetail === null ||
    connectionDetail === "pending";

  const {
    id,
    username,
    thumbnail,
    professional_name,
    bio,
    primary_label,
    sub_label,
  } = artistData?.available ?? artistData ?? {};
  const truncatedBio =
    bio && (bio.length > 255 ? bio.slice(0, 255) + "..." : bio);

    // useNotification("NEW_MESSAGE", (event) => {
    //   try {
    //     const { conversationId, sender, message, timestamp } = event.data;
    
    //     const timeoutId = setTimeout(async () => {
    //       try {
    //         if (chatData.id === Number(conversationId)) {
    //           // const newMessage = {
    //           //   conversation_id: conversationId,
    //           //   Timestamp: timestamp || new Date().toISOString(),
    //           //   message_content: message,
    //           //   sender_id: sender
    //           // };
    //           // const formatMessages = [
    //           //   {
    //           //     date: new Date().toISOString().split("T")[0],
    //           //     messages: [...messages[0]?.messages || [], newMessage]
    //           //   }
    //           // ]
    //           //setMessages(formatMessages);
    //           getConversationMessages(chatData);
    //         }
    //       } catch (error) {
    //         console.error('Error refreshing data:', error);
    //       }
    //     }, 300);
    
    //     return () => clearTimeout(timeoutId);
    
    //   } catch (error) {
    //     console.error('Error processing new message event:', error);
    //   }
    // });

  const handlePlayClick = (previewUrl: string, index: number) => {
    if (!previewUrl) return;
    if (audioRef.current) {
      if (currentPlayingIndex === index) {
        // If the clicked track is already playing, pause it
        audioRef.current.pause();
        setCurrentPlayingIndex(null);
      } else {
        // Play the new track
        audioRef.current.src = previewUrl;
        audioRef.current.play();
        setCurrentPlayingIndex(index);
      }
    }
  };

  const handleMessageClick = async () => {
    if (!artistData?.id) return;

    try {
      setLoading(true);

      const payload: IGetConversationsWithUser = {userId: artistData?.id};
      const response = await getConversationsWithUser(payload);

      let conversation;
      if (response.data) {
        conversation = {
          id: response.data.id,
          thumbnail: artistData.thumbnail,
          displayName: artistData.professional_name,
          sender: user.auth.user.id,
          recipient_id: artistData.id,
          conversation_id: response.data.id,
        };
        setActiveConversation(response.data);
        getConversationMessages({ conversationId: response.data.conversation_id, limit: 10, cursor: 0 });
        setChatOpen(true);
        setShowChat(true);
      }
    } catch (error) {
      console.error("Error opening chat:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleConnectFunction = async () => {
    try {
      const payload = {
        recipientUserIds: [id],
      };

      const response = await requestConncetAPI(payload);
      setConnectionDetail("pending");
    } catch (error) {
      console.log("error while connecting with the user ", error);
    }
  };

  if (showChat && activeConversation) {
    return (
      <div className="fixed right-0 top-[70px] w-[500px] h-[calc(100vh-70px)] bg-richBlack overflow-hidden z-50">
        <ConversationProvider>
          <ChatboxProvider>
            <Chatbox
              onClose={() => {setShowChat(false); setChatOpen(false)}}
            />
          </ChatboxProvider>
        </ConversationProvider>
      </div>
    );
  }

  return (
    <div className="bg-jetBlack">
      <div className="w-full h-[88px] bg-[#1a1a1a]"></div>
      <div className="px-4">
        <div className="rounded-full p-1 bg-jetBlack w-[108px] h-[108px] relative -translate-y-1/2">
          <img
            src={thumbnail || avatarImg}
            alt="Profile"
            className="h-full w-full rounded-full object-cover"
          />
        </div>

        <div className="text-white flex flex-col -mt-10">
          <div className="flex flex-col gap-2 mb-3">
            <h1 className={`text-lg flex items-center gap-1 font-semibold`}>
              {professional_name}
              <MdVerified className="text-[#9EFF00]" />
            </h1>

            <span className="text-base font-normal text-coolGray">
              @{username}
            </span>
          </div>

          <div className="flex gap-1">
            <div className="bg-eclipseGray text-dimGray rounded-md px-2 py-1 text-sm font-normal">
              {primary_label}
            </div>

            <div className="bg-eclipseGray text-dimGray rounded-md px-2 py-1 text-sm font-normal">
              {sub_label}
            </div>
          </div>

          {/* Only show buttons row if not viewing own profile */}
          {user.auth.user.id !== artistData?.id && (
            <div className="mt-[22px] mb-2 flex justify-between flex-wrap gap-2">
              <div className="gap-2 flex items-center flex-wrap">
                {connectionDetail === true ? (
                  <></>
                ) : (
                  <button
                    onClick={handleConnectFunction}
                    className={`flex items-center bg-transparent text-dimGray border border-dimGray text-sm rounded-full transition py-2 px-4 font-normal ${
                      isConnectionPending
                        ? "cursor-default pointer-events-none"
                        : "cursor-pointer pointer-events-auto"
                    }`}
                  >
                    {isConnectionPending ? (
                      <span>Connection Pending</span>
                    ) : (
                      <div className="flex gap-2 items-center">
                        <FiUserPlus className="w-4 h-4" />
                        <span>Connect</span>
                      </div>
                    )}
                  </button>
                )}

                <button
                  onClick={handleMessageClick}
                  style={{
                    width: "unset",
                  }}
                  className="flex font-normal items-center text-jetBlack text-sm rounded-full transition py-2 px-4 bg-limeGreen cursor-pointer"
                >
                  <div className="flex gap-2 items-center">
                    <FiSend className="w-4 h-4" />
                    <span>Message</span>
                  </div>
                </button>
              </div>

              <div>
                <button className="bg-eerieBlack text-coolGray p-2 rounded-lg hover:bg-gray-700 transition border border-eerieBlack">
                  <LiaEllipsisHSolid className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className=" border-b border-eclipseGray px-2.5 py-2">
        
                  <div className="mb-3.5 flex items-center gap-2 text-silver text-xs flex-wrap">
                    <span className="font-semibold">2 followers</span>
                    <span className="font-semibold">
                      <GoDotFill className="w-1.5 h-1.5" />
                    </span>
                    <span className="font-semibold text-[#0185FF]">
                      500+ connections
                    </span>
                  </div>
        
                  <div className="flex flex-col items-center gap-2 mb-2">
                    <div className="flex-1 w-full px-3 py-2 bg-transparent text-white rounded-md text-xs font-semibold flex items-center justify-center gap-1 border border-dimGray cursor-pointer hover:text-jetBlack hover:bg-limeGreen transition-all duration-200">
                      <FiUpload />
                      Share
                    </div>
        
                    <div className="flex-1 w-full px-3 py-2 hover:text-white rounded-md text-xs font-semibold flex items-center justify-center gap-1 border border-dimGray cursor-pointer text-jetBlack hover:bg-transparent bg-limeGreen transition-all duration-200">
                      Make  a post
                    </div>
                  </div>
        
                </div>
                <div className="px-5 py-3 pb-5 border-t border-eclipseGray">
        <h3 className="text-base text-platinum font-semibold mb-1">About</h3>
        <p className="mb-2 text-sm text-mediumGray font-normal">
          {truncatedBio}
        </p>

        <span className="text-base text-platinum font-semibold">
          Publisher / Label
        </span>

        <div className="mt-1.5 flex max-lg:flex-wrap items-center gap-1">
          <div className="px-2 py-1 bg-transparent text-dimGray rounded text-sm font-normal border border-charcoalGray whitespace-nowrap">
            Warner Chappell
          </div>

          <div className="px-2 py-1 bg-transparent text-dimGray rounded text-sm font-normal border border-charcoalGray whitespace-nowrap">
            Polydor Records
          </div>
        </div>
      </div>
        <div className="px-5 py-4 pb-20 border-t border-eclipseGray text-silver text-sm flex flex-col gap-5">
              <div className="flex items-center justify-between max-lg:flex-wrap gap-1">
                <div className="flex items-center gap-1">
                  <LuDollarSign />
                  <span className="font-normal leading-[18px]">
                    Demo submission starting at
                  </span>
                </div>
      
                <span className="font-semibold border border-mediumGray rounded-full px-2 py-0.5">
                  $25
                </span>
              </div>
             
              <div className="flex items-center justify-between max-lg:flex-wrap gap-1">
                <div className="flex items-center gap-1">
                  <FiInfo />
                  <span className="font-normal leading-[18px]">
                    Cancellation policy
                  </span>
                </div>
      
                <span className="font-semibold text-[#7ECC00]">Flexible</span>
              </div>
            </div>

      {creditsData && creditsData.length > 0 && (
        <div className={`px-3 py-3`}>
          <h2 className={`text-white mb-3.5 text-base font-normal`}>Credits</h2>

          <div className="flex flex-col overflow-y-auto">
            {creditsData.map((value, index) => {
              const { thumbnail, track_name, artists, preview_url } = value;
              const { professional_name } = artists[0];
              return (
                <div
                  key={index}
                  className={`p-2 flex gap-3 items-center relative`} // Added relative for positioning
                  onMouseEnter={() => setHoveredRow(index)} // Set hovered row on hover
                  onMouseLeave={() => setHoveredRow(null)} // Reset on mouse leave
                >
                  <div className="w-12 h-12">
                    <img
                      src={thumbnail}
                      alt="credits"
                      className="w-full h-full object-contain rounded-[4px]"
                    />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <h2 className="text-white font-semibold text-xs text-wrap">
                      {track_name}
                    </h2>
                    <p className="text-platinum text-[10px] font-medium">
                      {professional_name}
                    </p>
                  </div>

                  {/* Show play/pause button for hovered row or currently playing row */}
                  {(hoveredRow === index || currentPlayingIndex === index) && (
                    <div
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 cursor-pointer"
                      onClick={() => handlePlayClick(preview_url, index)} // Play the track on click
                    >
                      <img
                        src={currentPlayingIndex === index ? pauseIcon : playIcon} // Toggle play/pause icon based on state
                        alt="Play/Pause"
                        className="w-full h-full"
                      />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Audio element for playing preview_url */}
            <audio ref={audioRef} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileAboutSection;
