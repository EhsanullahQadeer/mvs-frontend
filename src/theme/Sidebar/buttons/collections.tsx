import { useLocation } from "react-router-dom";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "redux/reducers";
import { useHeaderHooks } from "theme/Header/Header.hooks";
import { useState } from "react";

const CollectionsButton = (props: {
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
  const destination = "/collections";
  const dropdownOptions = [];
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  return (
    <div className="onboard-2">
      {/* Collections button */}
      <div
        className={`w-[100%] pt-[6px] pb-[6px] flex flex-row ${isExpanded ? 'items-center pl-[12px] justify-start' : 'items-center justify-center'}`}
      >
        <button
          onClick={() => {
            //navigate(destination);
            setIsDropdownOpen(!isDropdownOpen);
          }}
          className={`cursor-pointer rounded-[8px] ${isExpanded ? 'w-[100%] gap-[8px]' : 'h-[40px] w-[40px]'} p-[8px] flex 
                ${pathname === destination
              ? `bg-[${selectedButtonColor}] text-[#000]`
              : `hover:bg-[#B4FF15] text-[#FFFFFF] hover:text-[#000]`
            }`}
        >
          <div className={`flex flex-row items-center ${isExpanded ? 'gap-[8px] w-full' : ''}`}>
            <div className={`flex flex-row items-center justify-between ${isExpanded ? 'gap-[8px] w-full' : ''}`}>
              <div className={`flex flex-row items-center ${isExpanded ? 'gap-[8px]' : ''}`}>
                <svg className="size-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g transform="translate(4,4)">
                    <path d="M1 8H15M8 1V15" stroke={pathname === destination ? `${textHoverIconColor}` : `${iconColor}`} stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                  </g>
                </svg>
                {isExpanded && <span className={`pt-[4px] text-[12px] font-["Mona-Sans-S"] text-[${pathname === destination ? `${textHoverIconColor}` : `${iconColor}`}] whitespace-nowrap min-w-[fit-content]`}>
                  Collections
                </span>}
              </div>
              {isExpanded && (
                <svg
                  className={`w-4 h-4 transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke={pathname.startsWith(destination) ? textHoverIconColor : iconColor}
                >
                  <path d="M5 7.5L10 12.5L15 7.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          </div>
        </button>
      </div>

      {/* Dropdown menu */}
      {isExpanded && isDropdownOpen && (
        <div className="flex flex-col w-full pl-[12px]">
          <div>
            {dropdownOptions.map((option) => (
              <button
                key={option.label}
                onClick={option.onClick}
                className={`w-full h-[40px] px-4 py-2 text-[12px] font-["Mona-Sans-S"] text-left text-[${iconColor}] hover:bg-[#B4FF15] p-[8px] pl-[32px] rounded-[8px]
                    ${pathname === option.path
                    ? `text-[${selectedButtonColor}] hover:text-[#000]`
                    : `text-[${iconColor}]`
                  }`}
              >
                {option.label}

              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionsButton;
