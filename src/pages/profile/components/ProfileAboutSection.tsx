import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { GoDotFill } from "react-icons/go";
import { RootState } from "redux/reducers";
import { MdVerified } from "react-icons/md";
import { IArtistProfileData } from "./types";
import { requestConncetAPI } from "api/user";
import { LuDollarSign } from "react-icons/lu";
import { useMessenger } from "api/messenger/context";
import Chatbox from "pages/Inbox/components/Chatbox";
import avatarImg from "../../../assets/img/avatar.svg";
import { getConversationsWithUser } from "api/messenger";
import playIcon from "../../../assets/img/player/play-circle.svg";
import pauseIcon from "../../../assets/img/player/pause-circle.svg";
import { FiInfo, FiUserPlus } from "react-icons/fi";
import { ChatboxProvider } from "pages/Inbox/components/Chatbox/context";
import { ConversationProvider } from "pages/Inbox/components/Directory/context";
import { IGetConversationsWithUser } from "api/messenger/objects/api.interfaces";
import ProfileSectionButton from "components/ui/Header/atoms/profileAboutSectionAtoms/profileSectionButton";

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
    getConversationMessages
  } = useMessenger();

  const { artistData, creditsData, connectionDetail, setConnectionDetail, setChatOpen } =
    props;
  const [hoveredRow, setHoveredRow] = useState<number | null>(null); // State to track hovered row
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState<number | null>(
    null
  ); // Track the currently playing index
  const audioRef = useRef<HTMLAudioElement | null>(null); // Ref for the audio element
  const [showChat, setShowChat] = useState(false);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: RootState) => state);
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
    country,
    region,
    primary_role,
    secondary_role,
  } = artistData?.available ?? artistData ?? {};
  console.log('Artist Data: ', artistData);
  const truncatedBio =
    bio && (bio.length > 255 ? bio.slice(0, 255) + "..." : bio);

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
        getConversationMessages({ conversationId: response.data.conversation_id });
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
          <div className="flex flex-col gap-2">
            <h1 className={`text-lg flex items-center gap-1 font-semibold`}>
              {professional_name}
              <MdVerified className="text-[#9EFF00]" />
            </h1>
            <div className="flex">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.6673 8.33366C16.6673 13.3337 10.0007 18.3337 10.0007 18.3337C10.0007 18.3337 3.33398 13.3337 3.33398 8.33366C3.33398 6.56555 4.03636 4.86986 5.28661 3.61961C6.53685 2.36937 8.23254 1.66699 10.0007 1.66699C11.7688 1.66699 13.4645 2.36937 14.7147 3.61961C15.9649 4.86986 16.6673 6.56555 16.6673 8.33366Z" stroke="#B2B2B2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10.0007 10.8337C11.3814 10.8337 12.5007 9.71437 12.5007 8.33366C12.5007 6.95295 11.3814 5.83366 10.0007 5.83366C8.61994 5.83366 7.50065 6.95295 7.50065 8.33366C7.50065 9.71437 8.61994 10.8337 10.0007 10.8337Z" stroke="#B2B2B2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span className="text-base font-normal text-coolGray ml-1">
                {region}, {country}
              </span>
            </div>
          </div>

          <div className="flex gap-1 mt-3">
            {primary_role &&
              <div className="bg-eclipseGray text-dimGray rounded-md px-2 py-1 text-sm font-normal">
                {primary_role}
              </div>
            }
            {secondary_role &&
              <div className="bg-eclipseGray text-dimGray rounded-md px-2 py-1 text-sm font-normal">
                {secondary_role}
              </div>
            }
          </div>

          <div className="my-3 flex items-center gap-2 text-silver text-xs flex-wrap">
            <span className="font-semibold">2 followers</span>
            <span className="font-semibold">
              <GoDotFill className="w-1.5 h-1.5" />
            </span>
            <span className="font-semibold text-[#0185FF]">
              500+ connections
            </span>
          </div>

          {/* Only show buttons row if not viewing own profile */}
          {user.auth.user.id !== artistData?.id && (
            <div className="flex gap-1">
              <ProfileSectionButton tabName="Message" icon={<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.1673 1.83301L10.5007 15.1663L7.83398 9.16634M15.1673 1.83301L1.83398 6.49967L7.83398 9.16634M15.1673 1.83301L7.83398 9.16634" stroke="#B2B2B2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                } onClick={handleMessageClick}/>

                {connectionDetail === true ? (
                  <ProfileSectionButton tabName="Connected" icon={<svg width="17" height="17" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                    <path fill-rule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd" />
                  </svg>} onClick={handleConnectFunction} disabled={true}/>
                ) : (
                  <ProfileSectionButton tabName={`${isConnectionPending ? "Pending" : "Connect"}`} icon={isConnectionPending ? <svg width="17" height="17" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                   : <svg width="17" height="17" viewBox="0 0 17 17" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.1673 14.5V13.1667C11.1673 12.4594 10.8864 11.7811 10.3863 11.281C9.88617 10.781 9.2079 10.5 8.50065 10.5H4.50065C3.79341 10.5 3.11513 10.781 2.61503 11.281C2.11494 11.7811 1.83398 12.4594 1.83398 13.1667V14.5" fill="white"/>
                    <path d="M6.50065 7.83333C7.97341 7.83333 9.16732 6.63943 9.16732 5.16667C9.16732 3.69391 7.97341 2.5 6.50065 2.5C5.02789 2.5 3.83398 3.69391 3.83398 5.16667C3.83398 6.63943 5.02789 7.83333 6.50065 7.83333Z" fill="white"/>
                    <path d="M11.1673 14.5V13.1667C11.1673 12.4594 10.8864 11.7811 10.3863 11.281C9.88617 10.781 9.2079 10.5 8.50065 10.5H4.50065C3.79341 10.5 3.11513 10.781 2.61503 11.281C2.11494 11.7811 1.83398 12.4594 1.83398 13.1667V14.5M13.1673 5.83333V9.83333M15.1673 7.83333H11.1673M9.16732 5.16667C9.16732 6.63943 7.97341 7.83333 6.50065 7.83333C5.02789 7.83333 3.83398 6.63943 3.83398 5.16667C3.83398 3.69391 5.02789 2.5 6.50065 2.5C7.97341 2.5 9.16732 3.69391 9.16732 5.16667Z" stroke="#CCCCCC" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    } onClick={handleConnectFunction}/>
                )}

                <ProfileSectionButton tabName="Share" icon={<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.16602 8.49967V13.833C3.16602 14.1866 3.30649 14.5258 3.55654 14.7758C3.80659 15.0259 4.14573 15.1663 4.49935 15.1663H12.4993C12.853 15.1663 13.1921 15.0259 13.4422 14.7758C13.6922 14.5258 13.8327 14.1866 13.8327 13.833V8.49967M11.166 4.49967L8.49935 1.83301M8.49935 1.83301L5.83268 4.49967M8.49935 1.83301V10.4997" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                } onClick={handleMessageClick}/>

                <ProfileSectionButton width="w-[112px]" icon={<svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.99935 11.333C10.4596 11.333 10.8327 10.9599 10.8327 10.4997C10.8327 10.0394 10.4596 9.66634 9.99935 9.66634C9.53911 9.66634 9.16602 10.0394 9.16602 10.4997C9.16602 10.9599 9.53911 11.333 9.99935 11.333Z" stroke="#B2B2B2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9.99935 5.49967C10.4596 5.49967 10.8327 5.12658 10.8327 4.66634C10.8327 4.2061 10.4596 3.83301 9.99935 3.83301C9.53911 3.83301 9.16602 4.2061 9.16602 4.66634C9.16602 5.12658 9.53911 5.49967 9.99935 5.49967Z" stroke="#B2B2B2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9.99935 17.1663C10.4596 17.1663 10.8327 16.7932 10.8327 16.333C10.8327 15.8728 10.4596 15.4997 9.99935 15.4997C9.53911 15.4997 9.16602 15.8728 9.16602 16.333C9.16602 16.7932 9.53911 17.1663 9.99935 17.1663Z" stroke="#B2B2B2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                } onClick={handleMessageClick}/>

            </div>
          )}
          <div className="w-full h-[41px] hover:text-white rounded-md text-xs font-semibold flex items-center justify-center cursor-pointer text-jetBlack hover:bg-transparent bg-limeGreen transition-all duration-200 my-2">
          <span className='mr-1'>
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.83333 1.83301V4.49967M11.1667 1.83301V4.49967M2.5 7.16634H14.5M3.83333 3.16634H13.1667C13.903 3.16634 14.5 3.76329 14.5 4.49967V13.833C14.5 14.5694 13.903 15.1663 13.1667 15.1663H3.83333C3.09695 15.1663 2.5 14.5694 2.5 13.833V4.49967C2.5 3.76329 3.09695 3.16634 3.83333 3.16634Z" stroke="#0F0F0F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg></span>
            Book a Meeting
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
