import { MdVerified } from "react-icons/md";
import avatarImg from "../../../assets/img/avatar.svg";
import { IoLocationOutline } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { FiUpload, FiInfo } from "react-icons/fi";
import { FaUserPlus } from "react-icons/fa6";
import { LuCalendar } from "react-icons/lu";
import { LuDollarSign } from "react-icons/lu";
import CreditsInfo from "./CreditsInfo";

const creditsData = [
  {
    thumbnail: avatarImg,
    track_name: "Earned It",
    artists: [{ professional_name: "The Weeknd" }],
    preview_url: "",
  },
  {
    thumbnail: avatarImg,
    track_name: "Earned It",
    artists: [{ professional_name: "The Weeknd" }],
    preview_url: "",
  },
  {
    thumbnail: avatarImg,
    track_name: "Earned It",
    artists: [{ professional_name: "The Weeknd" }],
    preview_url: "",
  },
  {
    thumbnail: avatarImg,
    track_name: "Earned It",
    artists: [{ professional_name: "The Weeknd" }],
    preview_url: "",
  },
  {
    thumbnail: avatarImg,
    track_name: "Earned It",
    artists: [{ professional_name: "The Weeknd" }],
    preview_url: "",
  },
  {
    thumbnail: avatarImg,
    track_name: "Earned It",
    artists: [{ professional_name: "The Weeknd" }],
    preview_url: "",
  },
];

const ProfileInfo = () => {
  return (
    <div className="flex-1 overflow-y-auto custom-dropdown">
      <div className="w-full h-[80px] bg-[#1a1a1a]"></div>
      <div className="px-4">
        <div className="rounded-full p-1 bg-jetBlack w-[108px] h-[108px] relative -translate-y-1/2">
          <img
            src={avatarImg}
            alt="Profile"
            className="h-full w-full rounded-full object-cover"
          />
        </div>

        <div className="text-white flex flex-col -mt-12">
          <div className="flex flex-col gap-2 mb-2">
            <h1 className={`text-lg flex items-center gap-1 font-semibold`}>
              DannyBoyStyles
              <MdVerified className="text-limeGreen" />
            </h1>
          </div>

          <div className="text-silver flex items-center gap-1 mb-3">
            <IoLocationOutline className="w-5 h-5" />
            <span className="text-base font-medium text-coolGray">
              City, State
            </span>
          </div>

          <div className="flex items-center gap-1 mb-3">
            <div className="px-2 py-1 bg-eclipseGray text-dimGray rounded-md text-sm font-normal">
              Artist
            </div>

            <div className="px-2 py-1 bg-eclipseGray text-dimGray rounded-md text-sm font-normal">
              Songwriter
            </div>
          </div>

          <div className="mb-3.5 flex items-center gap-2 text-silver text-xs flex-wrap">
            <span className="font-semibold">2,992 followers</span>
            <span className="font-semibold">
              <GoDotFill className="w-1.5 h-1.5" />
            </span>
            <span className="font-semibold text-[#0185FF]">
              500+ connections
            </span>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1 px-3 py-2 bg-transparent text-white rounded-md text-xs font-semibold flex items-center justify-center gap-1 border border-dimGray cursor-pointer hover:text-jetBlack hover:bg-limeGreen transition-all duration-200">
              <FiUpload />
              Share
            </div>

            <div className="flex-1 px-3 py-2 bg-transparent text-white rounded-md text-xs font-semibold flex items-center justify-center gap-1 border border-dimGray cursor-pointer hover:text-jetBlack hover:bg-limeGreen transition-all duration-200">
              <FaUserPlus />
              Follow
            </div>
          </div>

          <div className="mb-2 w-full p-3 bg-limeGreen text-[#203300] rounded-lg text-sm font-semibold flex items-center justify-center gap-1 cursor-pointer">
            <LuCalendar />
            Book a Meeting
          </div>
        </div>
      </div>

      <div className="px-5 py-3 pb-5 border-t border-eclipseGray">
        <h3 className="text-base text-platinum font-semibold mb-1">About</h3>
        <p className="mb-2 text-sm text-mediumGray font-normal">
          Danyboystyles, Grammy-winning producer behind hits for The Weeknd,
          Belly, and more, blending cinematic sounds with modern R&B to craft
          global chart-toppers.
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

      <div className="px-5 py-4 pb-6 border-t border-eclipseGray text-silver text-sm flex flex-col gap-5">
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
            <LuCalendar />
            <span className="font-normal leading-[18px]">
              Next availability
            </span>
          </div>

          <span className="font-semibold">11:00 am Today</span>
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

      <CreditsInfo {...{ creditsData }} />
    </div>
  );
};

export default ProfileInfo;
