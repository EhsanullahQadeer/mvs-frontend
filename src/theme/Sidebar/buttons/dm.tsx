import { useLocation } from "react-router-dom";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "redux/reducers";

const DMButton = (props: {
  isExpanded: boolean;
  setIsExpanded: (isExpanded: boolean) => void;
  sidebarWidth: string;
  headerHeight: string;
  iconColor: string;
  textHoverIconColor: string; 
  unreadCount: number;
  selectedButtonColor: string;
}) => {
  const { isExpanded, setIsExpanded, sidebarWidth, headerHeight, iconColor, textHoverIconColor, unreadCount, selectedButtonColor } = props;
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  const destination = "/inbox";

  return (
    <div>
      {/* DMs / inbox button */}
      <div
        className={`relative w-[100%] pt-[6px] pb-[6px] flex flex-row ${isExpanded ? 'items-center pl-[12px] justify-start' : 'items-center justify-center'}`}
      >
        <button
        onClick={() => {
          navigate(destination);
        }}
          className={`cursor-pointer rounded-[8px] ${isExpanded ? 'w-[100%]' : 'h-[40px] w-[40px]'} p-[8px] flex 
            ${pathname === destination
              ? `bg-[${selectedButtonColor}] text-[#000]`
              : `hover:bg-[#B4FF15] text-[#FFFFFF] hover:text-[#000]`
            }`}
        >
          <div
            id="inbox-and-red-dot"
            className={`relative ${isExpanded ? 'flex flex-row items-center justify-between w-full' : ''}`}
          >
            {/* Left-aligned icon and text */}
            <div className={`flex flex-row items-center ${isExpanded ? 'gap-[8px]' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke={pathname === destination ? `${textHoverIconColor}` : `${iconColor}`} className="size-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
              {isExpanded &&
                <span className={`pt-[4px] text-[12px] font-["Mona-Sans-S"] text-[${pathname === destination ? `${textHoverIconColor}` : `${iconColor}`}] whitespace-nowrap min-w-[fit-content]`}>
                  DMs
                </span>}
            </div>

            {/* Right-aligned unread count when expanded */}
            {unreadCount > 0 && isExpanded &&
              <div
                id="unread-count"
                className={`w-[28px] h-[20px] rounded-[12px] bg-[#FF3B30E5] flex items-center justify-center text-white text-[70%]`}
              >
                {unreadCount > 99 ? '99+' : unreadCount}
              </div>
            }

            {/* Centered unread count when collapsed */}
            {unreadCount > 0 && !isExpanded &&
              <div
                id="unread-count"
                className="absolute translate-x-1/2 -translate-y-1/2 w-[22px] h-[22px]
                  rounded-full bg-[#FF3B30E5] flex items-center justify-center text-white text-[70%]"
              >
                {unreadCount > 99 ? '99+' : unreadCount}
              </div>
            }
          </div>
        </button>
      </div>
    </div>
  );
};

export default DMButton;
