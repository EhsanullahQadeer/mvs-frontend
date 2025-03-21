import { useLocation } from "react-router-dom";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "redux/reducers";
import { useHeaderHooks } from "theme/Header/Header.hooks";

const HomeButton = (props: {
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
  const destination = "/home";

  return (
    <div className="onboard-2">
      {/* Home button */}
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
          <div className={`flex flex-row items-center ${isExpanded ? 'gap-[8px] w-full' : ''}`}>
            <div className={`flex flex-row items-center ${isExpanded ? 'gap-[8px]' : ''}`}>
              <svg className="size-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(2.5,2)">
                  <path d="M7 21V11H13V21M1 8L10 1L19 8V19C19 19.5304 18.7893 20.0391 18.4142 20.4142C18.0391 20.7893 17.5304 21 17 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8Z" stroke={pathname === destination ? `${textHoverIconColor}` : `${iconColor}`} stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                </g>
              </svg>
              {isExpanded && <span className={`pt-[4px] text-[12px] font-["Mona-Sans-S"] text-[${pathname === destination ? `${textHoverIconColor}` : `${iconColor}`}] whitespace-nowrap min-w-[fit-content]`}>
                Home
              </span>}
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default HomeButton;
