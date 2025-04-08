import { ReactComponent as MLogo } from "../../assets/icons/MLogo.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/searchIcon.svg";
import { ReactComponent as HambergerIcon } from "../../assets/icons/hambergerIcon.svg";
import { ReactComponent as HomeIcon } from "../../assets/icons/homeIcon.svg";
import { ReactComponent as MailIcon } from "../../assets/icons/mailIcon.svg";
import { ReactComponent as BellIcon } from "../../assets/icons/notificationBellIcon.svg";
import { ReactComponent as SettingsIcon } from "../../assets/icons/settingsIcon.svg";
import { ReactComponent as ProfileIcon } from "../../assets/icons/profileIcon.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useHeaderHooks } from "../Header/Header.hooks";
import { useState } from "react";

const MobileTheme = () => {
  const { state } = useHeaderHooks();

  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const [menuOpen, setMenuOpen] = useState(false);

  const headerMenuBtns = [
    { icon: HomeIcon, label: "Home", destination: "/home" },
    {
      icon: ProfileIcon,
      label: "My Profile",
      destination: `/profile/${state?.auth?.user?.username}`,
    },
    { icon: MailIcon, label: "DMs", destination: "/inbox" },
  ];

  const footerBtns = [
    { icon: HomeIcon, destination: "/home" },
    { icon: MailIcon, destination: "/inbox" },
    { icon: BellIcon, destination: "/home" },
    { icon: SettingsIcon, destination: "/settings" },
  ];
  return (
    <>
      {/* mobile version header */}
      <div className="md:hidden flex items-center justify-between px-4 border-b border-eerieBlack bg-black fixed top-0 w-full z-[99]">
        <div
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 text-silver cursor-pointer"
        >
          <HambergerIcon height={24} width={24} />
        </div>
        <div
          className="w-[70px] h-[70px] flex items-center justify-center cursor-pointer"
          onClick={() => (window.location.href = "/home")}
          style={{ cursor: "pointer" }}
        >
          <MLogo />
        </div>
        <div className="p-2 cursor-pointer">
          <SearchIcon height={24} width={24} />
        </div>

        {/* mobile version menubar */}

        <nav
          className={`${
            menuOpen ? "max-h-[400px] py-4" : "max-h-0 py-0"
          } transition-all duration-500 ease-in-out flex flex-col absolute left-0 top-full w-full z-[99] bg-darkGray backdrop-blur-[7.5px] overflow-hidden px-5`}
        >
          {headerMenuBtns.map(({ icon: Icon, label, destination }, index) => (
            <div
              key={index}
              onClick={() => {
                navigate(destination);
                setMenuOpen(false);
              }}
              className={`text-sm font-semibold leading-[16px] tracking-[-0.07px] py-4 px-2.5 flex items-center gap-2 hover:text-ocean-glow transition rounded-lg ${
                pathname === destination
                  ? "text-black bg-limeGreen"
                  : "text-coolGray bg-none"
              }`}
            >
              <Icon height={24} width={24} />
              <span>{label}</span>
            </div>
          ))}
        </nav>
      </div>

      {/* mobile version footer */}
      <div className="md:hidden flex items-center justify-between px-6 py-5 border-t border-charcoalGray bg-darkGray fixed bottom-0 w-full z-[99] backdrop-blur-[7.5px]">
        {footerBtns.map((btn, index) => {
          const { icon: Icon, destination } = btn;
          return (
            <div
              key={index}
              onClick={() => {
                navigate(destination);
              }}
              className={`p-2.5 text-coolGray`}
            >
              <Icon height={24} width={24} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MobileTheme;
