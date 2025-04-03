import { toast } from "react-toastify";
import { Menu } from "@headlessui/react";
import { currentUserAPI } from "api/auth";
import { GoDotFill } from "react-icons/go";
import { useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";
import { useParams } from "react-router-dom";
import { LuDollarSign } from "react-icons/lu";
import { CircularProgress } from "@mui/material";
import { artistPublicProfileAPI } from "api/user";
import CreatorLogin from "pages/creator/CreatorLogin";
import { IArtistProfileData } from "./components/types";
import mvssiveLogo from "../../assets/icons/mvssive-logo.svg";
import ProfileRightSection from "./components/ProfileRightSection";
import { ReactComponent as MapPinIcon } from "../../assets/icons/mapPin.svg";
import { ReactComponent as UserPlusIcon } from "../../assets/icons/userPlusIcon.svg";
import { ReactComponent as CalendarIcon } from "../../assets/icons/calendarIcon.svg";
import { ReactComponent as PaperPlaneIcon } from "../../assets/icons/paperPlane.svg";
import Thumbnail from "components/ui/Header/atoms/notificationAtoms/notificationThumbnail";
import { ReactComponent as UpArrowTrayIcon } from "../../assets/icons/upArrowTrayIcon.svg";
import { ReactComponent as ElipsesVerticalIcon } from "../../assets/icons/threeVerticalDotsIcon.svg";
import ProfileSectionButton from "components/ui/Header/atoms/profileAboutSectionAtoms/profileSectionButton";

const PublicProfile = () => {
  const { username } = useParams();
  const [currentUserInfo, setCurrentUserInfo] = useState(null);
  const [artistData, setartistData] = useState<IArtistProfileData | null>(null);
  const [loader, setLoader] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State for modal visibility
  const [menuSection, setMenuSection] = useState<boolean>(false);

  const getartistData = async () => {
    try {
      setLoader(true);
      let response = null;
      if (username) {
        response = await artistPublicProfileAPI(username);
      }
      if (response && response.data) {
        console.log('Getting Artist data: ', response);
        setartistData(response.data);
      }
    } catch (e) {
      console.log("error while fetching profile data: ", e);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getartistData();
    getCurrentUser();
  }, []);

  useEffect(() => {
    console.log('Artist Data: ', artistData);
  }, [artistData]);

  const getCurrentUser = async () => {
    try {
      const response = await currentUserAPI();
      setCurrentUserInfo(response.data);
      console.log("user info ", response);
    } catch (error) {
      console.error("Error in user info:", error);
    }
  };

  const handleSignUpModalClick = async () => {
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleShareClick = async () => {
    const urlToShare = window.location.href; // Get the current URL
    try {
      await navigator.clipboard.writeText(urlToShare); // Copy the URL to clipboard
      toast.success("URL Copied to Clipboard");
    } catch (error) {
      toast.error("Error deleting conversations");
    }
  };

  const handleMenuSection = () => {
    setMenuSection(!menuSection);
  };

  return (
    <div className="h-svh flex flex-col overflow-hidden">
      {loader ? (
        <>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999px]">
            <CircularProgress
              sx={{
                width: "80px !important",
                height: "80px !important",
                color: "#9EFF00",
              }}
            />
          </div>
        </>
      ) : (
        <>
          <div className="flex px-10 py-3 justify-between items-center">
            <img
              src={mvssiveLogo}
              alt="mvssiveLogo"
              className="w-[123px] h-[17px]"
            />

            <div className="bg-limeGreen w-[176px] h-[42px] rounded-full cursor-pointer text-sm font-semibold text-jetBlack flex justify-center items-center">
              Join MVSSIVE today
            </div>
          </div>

          <div className="flex-1 flex overflow-hidden">
            <div className="bg-jetBlack w-[340px]">
              <div className="h-[88px] bg-[#1a1a1a]"></div>
              <div className="px-4">
                <div className="p-1 relative -translate-y-1/2">
                  <Thumbnail professionalName={artistData.professional_name} thumbnail={artistData.thumbnail} size="108" userId={artistData.id}/>
                </div>

                <div className="text-white flex flex-col -mt-10">
                  <div className="flex flex-col gap-2">
                    <h1 className={`text-lg flex items-center gap-1 font-semibold`}>
                      {artistData?.professional_name}
                      <MdVerified className="text-[#9EFF00]" />
                    </h1>
                    <div className="flex">
                      <MapPinIcon/>
                      <span className="text-base font-normal text-coolGray ml-1">
                        {artistData?.region}, {artistData?.country}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-1 mt-3">
                    {artistData?.primary_role &&
                      <div className="bg-eclipseGray text-dimGray rounded-md px-2 py-1 text-sm font-normal">
                        {artistData?.primary_role}
                      </div>
                    }
                    {artistData?.secondary_role &&
                      <div className="bg-eclipseGray text-dimGray rounded-md px-2 py-1 text-sm font-normal">
                        {artistData?.secondary_role}
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
                  <div className="flex gap-1">
                    <ProfileSectionButton tabName="Message" icon={<PaperPlaneIcon/>} onClick={handleSignUpModalClick}/>
                    <ProfileSectionButton tabName="Connect" icon={<UserPlusIcon/>} onClick={handleSignUpModalClick}/>
                    <ProfileSectionButton tabName="Share" icon={<UpArrowTrayIcon/>} onClick={handleShareClick}/>

                    <Menu as="div" className="user">
                      <Menu.Button>
                        <ProfileSectionButton width="w-[32px]" icon={<ElipsesVerticalIcon/>} onClick={handleMenuSection}/>
                      </Menu.Button>
                      <Menu.Items 
                        className="zindex fixed mt-2 left-45 w-[130px] bg-[#1C1C1C] border border-[#3D3D3D] rounded-[8px] p-[10px]"
                        onMouseDown={(event) => event.stopPropagation()}
                      >
                        {/* Menu Items */}
          
                        {/* Follow Unfollow */}
                        <Menu.Item>
                          {({ active }) => (
                            <div
                            className={`flex items-center px-[12px] py-[8px] rounded-[8px] cursor-pointer ${active ? "bg-[#242424] text-white" : "text-[#b2b2b2]"}`}
                            onClick={(event) => {
                              handleSignUpModalClick();
                            }}>
                              <UserPlusIcon/>
                              <p className=" font-['Mona-Sans-M'] text-[14px] pl-[8px]">
                                Follow
                              </p>
                            </div>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Menu>
                  </div>
                  <div className="w-full h-[41px] rounded-md text-xs font-semibold flex items-center justify-center cursor-pointer text-jetBlack hover:bg-transparent hover:text-white bg-limeGreen transition-all duration-200 my-2" onClick={handleSignUpModalClick}>
                    <CalendarIcon/>
                    <span className='ml-1'>Book a Meeting</span>
                  </div>
                </div>
              </div>

              <div className="px-5 py-3 pb-5 border-t border-eclipseGray">
                <h3 className="text-base text-platinum font-semibold mb-1">About</h3>
                <p className="mb-2 text-sm text-mediumGray font-normal">
                  {artistData?.bio}
                </p>

                <span className="text-base text-platinum font-semibold">
                  Publisher
                </span>

                <div className="mt-1.5 flex max-lg:flex-wrap items-center gap-1">
                  <div className="px-2 py-1 bg-transparent text-dimGray rounded text-sm font-normal border border-charcoalGray whitespace-nowrap">
                    {artistData?.publisher}
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
                    {"$" + artistData?.demo_fee || "$0"}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex-[75%] flex">
              <ProfileRightSection 
              {...{ artistData,
                currentUserInfo,
                isLoginUser: false,
                user: null,
                tabs: [], 
                hasSampleType: {}, 
                selectedTab: "", 
                setSelectedTab: () => {}, 
                isConnect: false, 
                chatOpen: false, 
                setChatOpen: () => {}, 
                isPublicProfile: true 
              }} />
            </div>
          </div>
        </>
      )}

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-500" onClick={closeModal}>
          <div className="flex items-center justify-center h-full">

            <div className="p-4 rounded-[12px] shadow-lg z-600 bg-[#0F0F0F] border border-[#242424]" onClick={(e) => e.stopPropagation()}>

              <div className="flex h-[60px] items-center justify-between px-2">
                <span className="text-lg font-semibold text-[#CCCCCC]">Log in to subscribe</span>
                <button className="bg-[#242424] text-[#848484] rounded-full" onClick={closeModal}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 6L6 14M6 6L14 14" stroke="#848484" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>

              <div className="flex">
                <div className="flex h-auto rounded-[8px] border border-[#242424] overflow-hidden">
                  <div className="bg-jetBlack w-[391px]">
                    <div className="h-[88px] bg-[#1a1a1a]"></div>
                    <div className="px-4">
                      <div className="p-1 relative -translate-y-1/2">
                        <Thumbnail professionalName={artistData.professional_name} thumbnail={artistData.thumbnail} size="100" userId={artistData.id}/>
                      </div>
                      <div className="text-white flex flex-col -mt-10">
                        <div className="flex flex-col gap-2">
                          <h1 className={`text-lg flex items-center gap-1 font-semibold`}>
                            {artistData?.professional_name}
                            <MdVerified className="text-[#9EFF00]" />
                          </h1>
                          <div className="flex">
                            <MapPinIcon/>
                            <span className="text-base font-normal text-coolGray ml-1">
                              {artistData?.region}, {artistData?.country}
                            </span>
                          </div>
                          <h1 className={`text-lg flex items-center gap-1 font-semibold`}>
                            Subscribe and get these benefits:
                          </h1>
                          <div className="flex flex-col gap-3">
                            <div className="flex">
                              <div className="bg-[#242424] h-[24px] w-[24px] rounded-full flex items-center justify-center">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M13.3337 4L6.00033 11.3333L2.66699 8" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </div>
                              <span className="text-[14px] font-normal text-coolGray ml-1">
                                Direct messaging and collaboration opportunities
                              </span>
                            </div>
                            <div className="flex">
                              <div className="bg-[#242424] h-[24px] w-[24px] rounded-full flex items-center justify-center">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M13.3337 4L6.00033 11.3333L2.66699 8" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </div>
                              <span className="text-[14px] font-normal text-coolGray ml-1">
                                Priority demo reviews and feedback sessions
                              </span>
                            </div>
                            <div className="flex">
                              <div className="bg-[#242424] h-[24px] w-[24px] rounded-full flex items-center justify-center">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M13.3337 4L6.00033 11.3333L2.66699 8" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </div>
                              <span className="text-[14px] font-normal text-coolGray ml-1">
                                Access to subscriber-only posts
                              </span>
                            </div>
                            <div className="flex">
                              <div className="bg-[#242424] h-[24px] w-[24px] rounded-full flex items-center justify-center">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M13.3337 4L6.00033 11.3333L2.66699 8" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </div>
                              <span className="text-[14px] font-normal text-coolGray ml-1">
                                Cancel anytime, no commitments
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rounded-[8px] overflow-hidden">
                  <CreatorLogin/>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicProfile;
