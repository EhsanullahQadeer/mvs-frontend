import { useLocation } from "react-router-dom";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "redux/reducers";

const DashboardButton = (props: {
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
  const destination = "/dashboard";

  return (
    <div className="hidden">
      {/* Dashboard button */}
      <div
        className={`w-[100%] pt-[6px] pb-[6px] flex flex-row ${isExpanded ? 'items-center pl-[12px] justify-start' : 'items-center justify-center'}`}
      >
        <button
          onClick={() => {
            //navigate(destination);
          }}
          className={`cursor-pointer rounded-[8px] ${isExpanded ? 'w-[100%] p-[8px]' : 'h-[40px] w-[40px] justify-center'} flex items-center
                ${pathname === destination
              ? `bg-[${selectedButtonColor}] text-[#000]`
              : `hover:bg-[#B4FF15] text-[#FFFFFF] hover:text-[#000]`
            }`}
        >
          <div
            id="dashboard-icon"
            className={`relative ${isExpanded ? 'flex flex-row items-center justify-between w-full' : ''}`}
          >
            {/* Left-aligned icon and text */}
            <div id="A" className={`flex flex-row items-center justify-center ${isExpanded ? 'gap-[8px]' : ''}`}>
              <svg className="size-6 justify-center items-center" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(4,2)">
                  <path d="M7 17V7M13 17V1M1 17V13" stroke={pathname === destination ? `${textHoverIconColor}` : `${iconColor}`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </g>
              </svg>
              {isExpanded &&
                <span className={`pt-[4px] text-[12px] font-["Mona-Sans-S"] text-[${pathname === destination ? `${textHoverIconColor}` : `${iconColor}`}] whitespace-nowrap min-w-[fit-content]`}>
                  Dashboard
                </span>}
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default DashboardButton;
