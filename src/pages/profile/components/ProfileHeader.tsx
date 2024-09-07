import profileImage from "../sampleData/Ellipse 730.png";
import { FaEnvelope } from "react-icons/fa";
import { FiEdit3, FiUserPlus } from "react-icons/fi";
import { MdVerified } from "react-icons/md";
import { LiaEllipsisVSolid } from "react-icons/lia";
import { IoLocationOutline } from "react-icons/io5";
import { LuCake, LuHome } from "react-icons/lu";

interface ProfileHeaderProps {
  isWikiProfile?: boolean;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ isWikiProfile }) => {
  return (
    <>
      <header
        style={{
          background:
            "linear-gradient(to right,  rgb(74, 12, 140),black  , rgb(0, 91, 190) )",
        }}
        className={`relative flex  items-start  w-full    py-7 ${
          isWikiProfile ? "justify-center rounded-lg " : "justify-between  px-5"
        } `}
      >
        <div
          className={`flex items-center ${
            isWikiProfile ? "flex-col text-cente  gap-2 " : "flex-row  gap-5 "
          }  `}
        >
          <div
            className={`rounded-full  p-0.5 bg-gradient-to-r from-blue-500 to-lime-500 ${
              isWikiProfile ? "w-32 h-32" : "w-48 h-48 "
            } `}
          >
            <img
              src={profileImage}
              alt="Profile"
              className="h-full w-full rounded-full object-cover border-4 border-gray-900"
            />
          </div>

          <div
            className={`text-white flex flex-col gap-1 ${
              isWikiProfile ? "w-full text-center" : " w-1/3"
            }  `}
          >
            <h1
              className={`text-2xl flex items-center font-bold ${
                isWikiProfile ? "justify-center font-semibold" : ""
              } `}
            >
              Becky Hill
              <MdVerified
                className={`ml-1 text-lime-400  ${
                  isWikiProfile ? "hidden" : "flex"
                } `}
              />
            </h1>
            {!isWikiProfile ? (
              <span
                style={{
                  color: "#DADADA",
                }}
                className="text-xs font-semibold"
              >
                @heckyhill
              </span>
            ) : (
              <div
                style={{
                  fontSize: "12px",

                  color: "rgba(229, 229, 229, 1)",
                }}
                className="flex gap-5 justify-center"
              >
                <span className="flex gap-1 item-center">
                  <IoLocationOutline className="text-xs  " />
                  London, UK
                </span>
                <span className="flex gap-1 item-center ">
                  <LuCake className="text-xs  " /> Mar 28th, 1986{" "}
                  <span
                    style={{
                      color: "rgba(132, 132, 132, 1)",
                    }}
                  >
                    (38 Years)
                  </span>
                </span>
                <span className="flex gap-1 item-center">
                <LuHome className="text-xs  " />

                  <span>Polydor Records</span>
                </span>
              </div>
            )}

            <p
              style={{
                color: "#BEBEBE",
              }}
              className={`text-sm text-gray-200  my-2 ${
                isWikiProfile ? "hidden" : "flex"
              } `}
            >
              Becky Hill is a British singer-songwriter known for her powerful
              vocals and hit singles like "Wish You Well" and "Better Off
              Without You." She's a former "The Voice UK" contestant.{" "}
            </p>

            <div className={`space-x-2 ${isWikiProfile ? "hidden" : "flex"} `}>
              <button
                style={{
                  padding: "12px 16px",
                }}
                className="flex text-sm  items-center bg-transparent text-white border  border-white  rounded-lg cursor-pointer transition"
              >
                <FiUserPlus className="mr-2 text-xl" />
                Connect
              </button>

              <button
                style={{
                  padding: "12px 16px",
                  width: "unset",
                  background: "#9EFF00",
                }}
                className="flex w-28 font-medium items-center   bg-green-500 text-black  text-sm rounded-lg  transition"
              >
                Send Message
              </button>

              <button
                style={{
                  background: " #1C1C1C",
                  border: "1px solid #242424",
                }}
                className="bg-black text-coolGray p-2 w-10 h-10 rounded-lg hover:bg-gray-700 transition"
              >
                <LiaEllipsisVSolid className="text-xl font-semibold" />
              </button>
            </div>
            <div
              className={`gap-1.5 text-center justify-center ${
                !isWikiProfile ? "hidden" : "flex"
              } `}
            >
              <button
                style={{
                  padding: "10px",
                  background: "#9EFF00",
                }}
                className="flex font-medium px-3 py-2 items-center text-xs   bg-green-500 text-black  rounded-lg  transition"
              >
                Singer/Songwriter
              </button>
              <button
                style={{
                  padding: "8px 12px",
                }}
                className="flex gap-2 px-3 py-2 items-center   bg-transparent text-white border text-xs  border-white  rounded-lg cursor-pointer transition"
              >
                <FiUserPlus className=" text-base" />
                <span>Follow</span>
              </button>
              <button
                style={{
                  padding: "8px 12px",
                }}
                className="flex gap-2 px-3    py-2 items-center bg-transparent text-white border text-xs border-white  rounded-lg cursor-pointer transition"
              >
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
        {!isWikiProfile && (
          <button>
            <FiEdit3 className="text-coolGray text-xl" />
          </button>
        )}
      </header>
    </>
  );
};

export default ProfileHeader;
