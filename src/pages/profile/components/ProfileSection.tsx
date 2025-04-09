import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { GoDotFill } from "react-icons/go";
import { RootState } from "redux/reducers";
import { MdVerified } from "react-icons/md";
import { IArtistProfileData } from "./types";
import { LuDollarSign } from "react-icons/lu";
import { useMessenger } from "api/messenger/context";
import avatarImg from "../../../assets/img/avatar.svg";
import { FiInfo } from "react-icons/fi";

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

const ProfileSection = (props: Props) => {
  const { 
    setActiveConversation,
    activeConversation,
    getConversationMessages
  } = useMessenger();

  const { artistData, creditsData, connectionDetail, setConnectionDetail, setChatOpen } =
    props;
 // Track the currently playing index
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: RootState) => state);


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



     

  return (
    <div className="bg-jetBlack">
      <div className="w-full h-[60px] bg-[#1a1a1a]"></div>
      <div className="px-4">
        <div className="rounded-full p-1 bg-jetBlack w-[80px] h-[80px]  -translate-y-1/2">
          <img
            src={thumbnail || avatarImg}
            alt="Profile"
            className="h-full w-full rounded-full object-cover"
          />
        </div>

        <div className="text-white flex flex-col mt-[-30px] ">
          <div className="flex flex-col gap-2">
            <h1 className={`text-sm flex items-center gap-1 font-semibold`}>
              {professional_name}
              <MdVerified className="text-[#9EFF00]" />
            </h1>
            <div className="flex items-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.6673 8.33366C16.6673 13.3337 10.0007 18.3337 10.0007 18.3337C10.0007 18.3337 3.33398 13.3337 3.33398 8.33366C3.33398 6.56555 4.03636 4.86986 5.28661 3.61961C6.53685 2.36937 8.23254 1.66699 10.0007 1.66699C11.7688 1.66699 13.4645 2.36937 14.7147 3.61961C15.9649 4.86986 16.6673 6.56555 16.6673 8.33366Z" stroke="#B2B2B2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M10.0007 10.8337C11.3814 10.8337 12.5007 9.71437 12.5007 8.33366C12.5007 6.95295 11.3814 5.83366 10.0007 5.83366C8.61994 5.83366 7.50065 6.95295 7.50065 8.33366C7.50065 9.71437 8.61994 10.8337 10.0007 10.8337Z" stroke="#B2B2B2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span className="text-[12px] font-normal text-coolGray ml-1">
                {region}, {country}
              </span>
            </div>
          </div>

          <div className="flex gap-1 mt-3">
            {primary_role &&
              <div className="bg-eclipseGray text-dimGray rounded-md px-2 py-1 text-[10px] font-normal">
                {primary_role}
              </div>
            }
            {secondary_role &&
              <div className="bg-eclipseGray text-dimGray rounded-md px-2 py-1 text-[10px] font-normal">
                {secondary_role}
              </div>
            }
          </div>

          <div className="my-3 flex items-center gap-2 text-silver text-[10px] flex-wrap">
            <span className="font-semibold">2 followers</span>
            <span className="font-semibold">
              <GoDotFill className="w-1.5 h-1.5" />
            </span>
            <span className="font-semibold text-[#0185FF]">
              500+ connections
            </span>
          </div>

        
            <div className="w-full h-[33px] text-white rounded-md text-xs font-semibold flex items-center justify-center cursor-pointer hover:text-jetBlack hover:bg-limeGreen border border-white hover:border-transparent bg-transparent  transition-all duration-200 mb-1">
          <span className='mr-1'>
            
         </span>
          Share on
          </div>
          <div className="w-full h-[33px] hover:text-white rounded-md text-xs font-semibold flex items-center justify-center cursor-pointer text-jetBlack hover:bg-transparent bg-limeGreen transition-all duration-200 my-2">
         
          Make a Post
          </div>
        </div>
      
      </div>

        <div className="px-5 py-3 pb-5 border-t border-eclipseGray">
        <h3 className="md:text-base text-sm text-platinum font-semibold mb-1">About</h3>
        <p className="mb-2 text-sm text-mediumGray font-normal">
          {truncatedBio}
        </p>

        <span className="md:text-base text-[14px] text-platinum font-semibold">
          Publisher / Label
        </span>

        <div className="mt-1.5 flex max-lg:flex-wrap items-center gap-1">
          <div className="px-2 py-1 bg-transparent text-dimGray rounded md:text-sm text-xs font-normal border border-charcoalGray whitespace-nowrap">
            Warner Chappell
          </div>

          <div className="px-2 py-1 bg-transparent text-dimGray rounded  md:text-sm text-xs font-normal border border-charcoalGray whitespace-nowrap">
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

    </div>
  );
};

export default ProfileSection;
