import { toast } from "react-toastify";
import { FiInfo} from "react-icons/fi";
import { Menu } from "@headlessui/react";
import { useSelector } from "react-redux";
import { GoDotFill } from "react-icons/go";
import { RootState } from "redux/reducers";
import { MdVerified } from "react-icons/md";
import { IArtistProfileData } from "./types";
import { LuDollarSign } from "react-icons/lu";
import { useEffect, useRef, useState } from "react";
import { useMessenger } from "api/messenger/context";
import Chatbox from "pages/Inbox/components/Chatbox";
import avatarImg from "../../../assets/img/avatar.svg";
import { getConversationsWithUser } from "api/messenger";
import Tooltip from "components/ui/Header/atoms/tooltip";
import playIcon from "../../../assets/img/player/play-circle.svg";
import pauseIcon from "../../../assets/img/player/pause-circle.svg";
import { ChatboxProvider, useChatbox } from "pages/Inbox/components/Chatbox/context";
import { ReactComponent as MapPinIcon } from "../../../assets/icons/mapPin.svg";
import { ConversationProvider } from "pages/Inbox/components/Directory/context";
import { IGetConversationsWithUser } from "api/messenger/objects/api.interfaces";
import { checkIfFollowing, handleFollowUsers, requestConncetAPI } from "api/user";
import { ReactComponent as ClockIcon } from "../../../assets/icons/clockIcon.svg";
import { ReactComponent as UserPlusIcon } from "../../../assets/icons/userPlusIcon.svg";
import { ReactComponent as CalendarIcon } from "../../../assets/icons/calendarIcon.svg";
import { ReactComponent as PaperPlaneIcon } from "../../../assets/icons/paperPlane.svg";
import { ReactComponent as UserCheckIcon } from "../../../assets/icons/userCheckIcon.svg";
import { ReactComponent as UserMinusIcon } from "../../../assets/icons/userMinusIcon.svg";
import { ReactComponent as UpArrowTrayIcon } from "../../../assets/icons/upArrowTrayIcon.svg";
import { ReactComponent as ElipsesVerticalIcon } from "../../../assets/icons/threeVerticalDotsIcon.svg";
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

  const {
    LIMIT_MESSAGES
  } = useChatbox();

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
  const [menuSection, setMenuSection] = useState<boolean>(false);

  const isConnectionPending =
    connectionDetail === false ||
    connectionDetail === null ||
    connectionDetail === "pending";

  const {
    id,
    thumbnail,
    professional_name,
    bio,
    country,
    region,
    primary_role,
    secondary_role,
  } = artistData?.available ?? artistData ?? {};
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const truncatedBio =
    bio && (bio.length > 255 ? bio.slice(0, 255) + "..." : bio);

  useEffect(() => {
    const fetchFollowingStatus = async () => {
      const isFollowing = await checkIfFollowing(artistData.id); // Await the API call
      setIsFollowing(isFollowing); // Set the state with the result
    };

    fetchFollowingStatus(); // Call the async function
  }, []);

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
        getConversationMessages({ conversationId: response.data.conversation_id, limit: LIMIT_MESSAGES, cursor: 0 });
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

  const handleShareClick = async () => {
    const urlToShare = window.location.href; // Get the current URL
    try {
      await navigator.clipboard.writeText(urlToShare); // Copy the URL to clipboard
      console.log("URL Copied to Clipboard");
      toast.success("URL Copied to Clipboard");
    } catch (error) {
      console.error("Failed to copy URL:", error);
      toast.error("Error deleting conversations");
    }
  };

  const handleMenuSection = () => {
    setMenuSection(!menuSection);
  };

  const handleFollowUnfollow = () => {
    if(isFollowing) {
      setIsFollowing(false);
    } else {
      setIsFollowing(true);
    }
    handleFollowUsers([artistData.id]);
  };

  if (showChat && activeConversation) {
    return (
      <div className="fixed right-0 top-[70px] w-[500px] h-[calc(100vh-70px)] bg-richBlack overflow-hidden z-50">
        <ConversationProvider>
          <Chatbox
            onClose={() => {setShowChat(false); setChatOpen(false)}}
          />
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
              <MapPinIcon/>
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
              <ProfileSectionButton tabName="Message" icon={<PaperPlaneIcon/>} onClick={handleMessageClick}/>
              {connectionDetail === true ? (
                <ProfileSectionButton tabName="Connected" icon={<UserCheckIcon/>} onClick={handleConnectFunction} disabled={true}/>
              ) : (
                <div className="relative w-full">
                  <Tooltip disappear={false} text={isConnectionPending ? "Connection" : ""}>
                    <ProfileSectionButton tabName={`${isConnectionPending ? "Pending" : "Connect"}`} icon={isConnectionPending ? <ClockIcon/> : <UserPlusIcon/>} onClick={handleConnectFunction}/>
                  </Tooltip>
                </div>
              )}
              <ProfileSectionButton tabName="Share" icon={<UpArrowTrayIcon/>} onClick={handleShareClick}/>

              <Menu as="div" className="user">
                <Menu.Button>
                  <ProfileSectionButton width="w-[32px]" icon={<ElipsesVerticalIcon/>} onClick={handleMenuSection}/>
                </Menu.Button>
                <Menu.Items 
                  className="zindex fixed mt-2 right-4 w-[130px] bg-[#1C1C1C] border border-[#3D3D3D] rounded-[8px] p-[10px]"
                  onMouseDown={(event) => event.stopPropagation()}
                >
                  {/* Menu Items */}
    
                  {/* Follow Unfollow */}
                  <Menu.Item>
                    {({ active }) => (
                      <div
                      className={`flex items-center px-[12px] py-[8px] rounded-[8px] cursor-pointer ${active ? "bg-[#242424] text-white" : "text-[#b2b2b2]"}`}
                      onClick={(event) => {
                        event.stopPropagation(); // Prevent menu from closing
                        handleFollowUnfollow();
                      }}>
                        {isFollowing ? <UserMinusIcon/> : <UserPlusIcon/>}
                        <p className=" font-['Mona-Sans-M'] text-[14px] pl-[8px]">
                          {isFollowing ? "Unfollow" : "Follow"}
                        </p>
                      </div>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            </div>
          )}
          <div className="w-full h-[41px] rounded-md text-xs font-semibold flex items-center justify-center cursor-pointer text-jetBlack hover:bg-transparent hover:text-white bg-limeGreen transition-all duration-200 my-2">
            <CalendarIcon/>
            <span className='ml-1'>Book a Meeting</span>
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