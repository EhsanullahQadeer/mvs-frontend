import React, { useState } from "react";
import engineer from "../../../assets/img/engineer-profile.png";
import { LiaEllipsisVSolid } from "react-icons/lia";
import { FaShareAlt, FaUserFriends } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { MdOutlinePrivacyTip } from "react-icons/md";

const actions = [
  { id: 1, label: "Follow", icon: <FiPlus className="mr-2" /> },
  { id: 2, label: "Connect", icon: <FaUserFriends className="mr-2" /> },
  {
    id: 3,
    label: "Report User",
    icon: <MdOutlinePrivacyTip className="mr-2" />,
  },
  { id: 4, label: "Share Profile", icon: <FaShareAlt className="mr-2" /> },
];
const singers = ["Justin Bieber", "Kid Laro", "Lady Goga", "Jeniffer gopez"];
const SelectedProfile = () => {
  const [selectedAction, setSelectedAction] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleActionSelect = (id: any) => {
    setSelectedAction(id);
  };
  return (
    <>
      <header>
        <div
          style={{
            backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 72.31%, #000 100%), linear-gradient(90deg, #000 0%, rgba(0, 0, 0, 1.00) 8.17%, rgba(0, 0, 0, 0.80) 32.58%, rgba(0, 0, 0, 0.00) 62.11%), url(${engineer})`,
            backgroundSize: "cover",
          }}
          className={`relative border-b border-eclipseGray bg-[${engineer}] bg-center  flex items-center w-full py-[110px] px-[55px] 
      }`}
        >
          <div className="flex flex-col justify-center ">
            <h2 className="text-[48px] text-white font-bold uppercase italic">
              Paris Lee
            </h2>
            <span className="text-[#FFFFFF] text-[16px] mt- ">Los Angelas,CA</span>
            <div className="flex gap-2 my-[12px] text-[12px]">
              <span className="py-[6px] flex  gap-1 justify-center items-center border rounded-full border-charcoalGray px-[8px]">
                <span className="w-[8px] h-[8px] rounded-full bg-green"></span>
                <span className="text-gray">Mastering</span>
              </span>
              <span className="py-[6px] flex gap-1 justify-center items-center border rounded-full border-charcoalGray px-[8px]">
                <span className="w-[8px] h-[8px] rounded-full bg-green"></span>
                <span className="text-gray">Mixer</span>
              </span>
            </div>
            <div className="flex gap-2  mb-[12px]">
              {singers.map((v, i) => (
                <span
                  key={i}
                  className="text-gray whitespace-nowrap py-[6px] text-[12px] flex bg-eclipseGray gap-1 justify-center items-center border rounded-md border-eclipseGray px-[8px]"
                >
                  {v}
                </span>
              ))}
            </div>
            <div className="flex relative gap-2 items-center w-full">
              <button className="flex justify-center w-full text-center font-semibold items-center   bg-green-500 text-jetBlack text-sm rounded-full  transition py-[12px] px-[16px] bg-limeGreen">
                Subscribe
              </button>
              <button className="flex  justify-center w-auto whitespace-nowrap  text-sm items-center bg-transparent border-platinum border text-platinum  cursor-pointer rounded-full transition py-[12px] px-[16px]">
                Send Message
              </button>
              <button
                onClick={toggleMenu}
                className="bg-eerieBlack   text-coolGray p-2 w-auto h-10 rounded-lg hover:bg-gray-700 transition border-[1px] border-eclipseGray"
              >
                <LiaEllipsisVSolid className="text-xl font-semibold" />
              </button>
              <div className="relative">
                {isMenuOpen && (
                  <div className="absolute z-50 bg-eerieBlack top-[-23px]  p-1 bg-gray-800 shadow-md rounded-lg w-48">
                    {actions.map((action) => (
                      <button
                        onClick={() => handleActionSelect(action.id)}
                        key={action.id}
                        className={`flex items-center w-full text-left px-4 py-2 text-sm rounded-md ${
                          selectedAction === action.id
                            ? "bg-eclipseGray text-white"
                            : "text-coolGray  hover:text-white"
                        }`}
                      >
                        {action.icon}
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default SelectedProfile;
