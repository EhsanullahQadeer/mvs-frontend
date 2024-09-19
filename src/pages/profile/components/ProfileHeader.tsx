/*************************************************************************
 * @file ProfileHeader.tsx
 * @author Ehsanullah Qadeer
 * @desc Profile header for artist profile page.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* LOCAL IMPORTS */
// import profileImage from "../sampleData/Ellipse 730.png";
import {
  // FiEdit3,
  FiUserPlus,
} from "react-icons/fi";
import { MdVerified } from "react-icons/md";
import { LiaEllipsisVSolid } from "react-icons/lia";
import { FiSend } from "react-icons/fi";
import { IArtistProfileData } from "./types";

interface ProfileHeaderProps {
  isWikiProfile?: boolean;
  setIsConnect: (value: boolean) => void;
  isConnect: boolean;
  artistData: IArtistProfileData | null;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = (props) => {
  const { isWikiProfile, setIsConnect, isConnect, artistData } = props;

  const handleConnect = () => {
    setIsConnect(true);
  };

  const { username, thumbnail, artist_name, bio } =
    artistData?.available ?? artistData ?? {};
  const truncatedBio =
    bio && (bio.length > 255 ? bio.slice(0, 255) + "..." : bio);
  return (
    <>
      <header
        style={{
          background:
            "linear-gradient(to right,rgb(74, 12, 140),black, rgb(0, 91, 190))",
        }}
        className={`relative flex items-start w-full py-7 ${
          isWikiProfile ? "justify-center rounded-lg" : "justify-between px-5"
        } `}
      >
        <div
          className={`flex items-center ${
            isWikiProfile ? "flex-col text-cente gap-2" : "flex-row  gap-5"
          }`}
        >
          <div
            className={`rounded-full  p-0.5 bg-gradient-to-r from-blue-500 to-lime-500 ${
              isWikiProfile ? "w-32 h-32" : "w-48 h-48"
            } `}
          >
            <img
              src={thumbnail}
              alt="Profile"
              className="h-full w-full rounded-full object-cover border-4 border-gray-900"
            />
          </div>

          <div
            className={`text-white flex flex-col gap-1 ${
              isWikiProfile ? "w-full text-center" : "w-1/3"
            }`}
          >
            <h1
              className={`text-2xl flex items-center font-bold ${
                isWikiProfile ? "justify-center font-semibold" : ""
              }`}
            >
              {artist_name}
              <MdVerified
                className={`ml-1 text-lime-400  ${
                  isWikiProfile ? "hidden" : "flex"
                } `}
              />
            </h1>
            {!isWikiProfile ? (
              <span className="text-xs font-semibold text-[#DADADA]">
                @{username}
              </span>
            ) : (
              <></>
            )}

            <p
              className={`text-sm text-gray-200 text-[#BEBEBE] my-2 ${
                isWikiProfile ? "hidden" : "flex"
              } `}
            >
              {truncatedBio}
            </p>

            <div
              className={`space-x-2 ${
                isWikiProfile ? "hidden" : "flex items-center"
              } `}
            >
              {!isConnect && (
                <button
                  onClick={handleConnect}
                  className="flex text-sm items-center bg-transparent text-white border border-white rounded-lg cursor-pointer transition px-3 py-4"
                >
                  <FiUserPlus className="mr-2 text-xl" />
                  Connect
                </button>
              )}

              <button
                style={{
                  width: "unset",
                }}
                className="flex w-28 font-normal items-center   bg-green-500 text-[#0F0F0F] text-sm rounded-full  transition py-3 px-4 bg-limeGreen"
              >
                {isConnect ? (
                  <div className="flex gap-2 items-center">
                    <FiSend className="w-6 h-6" />
                    <span>Message</span>
                  </div>
                ) : (
                  <span>Send Message</span>
                )}
              </button>

              <button className="bg-eerieBlack text-coolGray p-2 w-10 h-10 rounded-lg hover:bg-gray-700 transition border-[1px] border-eclipseGray">
                <LiaEllipsisVSolid className="text-xl font-semibold" />
              </button>
            </div>
            <div
              className={`gap-1.5 text-center justify-center ${
                !isWikiProfile ? "hidden" : "flex"
              } `}
            >
              <button className="flex gap-2 px-3 py-2 items-center   bg-transparent text-white border text-xs border-white  rounded-full cursor-pointer transition">
                <FiUserPlus className="text-base" />
                <span>Follow</span>
              </button>
              <button className="flex gap-2 px-3 py-2 items-center bg-transparent text-white border text-xs border-white  rounded-full cursor-pointer transition">
                <svg
                  className="text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 17"
                  fill="none"
                >
                  <path
                    d="M5.33333 1.83337V4.50004M10.6667 1.83337V4.50004M14 9.16671V4.50004C14 4.14642 13.8595 3.80728 13.6095 3.55723C13.3594 3.30718 13.0203 3.16671 12.6667 3.16671H3.33333C2.97971 3.16671 2.64057 3.30718 2.39052 3.55723C2.14048 3.80728 2 4.14642 2 4.50004V13.8334C2 14.187 2.14048 14.5261 2.39052 14.7762C2.64057 15.0262 2.97971 15.1667 3.33333 15.1667H8.66667M2 7.16671H14M10.6667 13.1667H14.6667M12.6667 11.1667V15.1667"
                    stroke="white"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span>Join Waitlist</span>
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default ProfileHeader;
