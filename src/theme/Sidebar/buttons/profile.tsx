import { useLocation } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useHeaderHooks } from "theme/Header/Header.hooks";

const ProfileButton = (props: {
  isExpanded: boolean;
  setIsExpanded: (isExpanded: boolean) => void;
  sidebarWidth: string;
  headerHeight: string;
  iconColor: string;
  textHoverIconColor: string;
  selectedButtonColor: string;
}) => {

  const { isExpanded, setIsExpanded, sidebarWidth, headerHeight, iconColor, textHoverIconColor, selectedButtonColor } = props;
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const { state } = useHeaderHooks();
  const destination = `/profile/${state?.auth?.user?.username}`;

  return (
    <div>
      {/* My Profile button */}
      <div
        className={`w-[100%] pt-[6px] pb-[6px] pl-[8px] flex flex-row ${isExpanded ? 'items-center pl-[12px] justify-start' : 'items-center'}`}
      >
        <button
        onClick={() => {
          navigate(destination);
        }}
          className={`cursor-pointer rounded-[8px] ${isExpanded ? 'w-[100%] gap-[8px]' : 'h-[40px] w-[40px]'} p-[8px] flex 
                  ${pathname === destination
              ? `bg-[${selectedButtonColor}] text-[#000]`
              : `hover:bg-[#B4FF15] text-[#FFFFFF] hover:text-[#000]`
            }`}
        >
          {/* Icon and text container */}
          <div className={`flex flex-row items-center ${isExpanded ? 'gap-[8px] w-full' : ''}`}>
            {/* Icon and text */}
            <div className={`flex flex-row items-center ${isExpanded ? 'gap-[8px]' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke={pathname === destination ? `${textHoverIconColor}` : `${iconColor}`} className="size-6 transition-none">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
              {isExpanded && <span className={`pt-[4px] text-[12px] font-["Mona-Sans-S"] text-[${pathname === destination ? `${textHoverIconColor}` : `${iconColor}`}] whitespace-nowrap min-w-[fit-content]`}>
                My Profile
              </span>}
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ProfileButton;
