import { useLocation } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const LicenseButton = (props: {
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
  const destination = `/settings/account/1`;

  return (
    <div className="hidden">
      {/* License button */}
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
              <svg className="size-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.5 7.00024C15.7761 7.00024 16 6.77639 16 6.50024C16 6.2241 15.7761 6.00024 15.5 6.00024C15.2239 6.00024 15 6.2241 15 6.50024C15 6.77639 15.2239 7.00024 15.5 7.00024Z" fill="#B58F8F" />
                <path d="M1 17.0002V20.0002C1 20.6002 1.4 21.0002 2 21.0002H6V18.0002H9V15.0002H11L12.4 13.6002C13.7898 14.0843 15.3028 14.0825 16.6915 13.5949C18.0801 13.1074 19.2622 12.163 20.0444 10.9163C20.8265 9.66957 21.1624 8.19433 20.9971 6.7319C20.8318 5.26946 20.1751 3.90641 19.1344 2.86573C18.0938 1.82505 16.7307 1.16834 15.2683 1.00305C13.8058 0.837755 12.3306 1.17366 11.0839 1.9558C9.83716 2.73795 8.89279 3.92003 8.40525 5.30868C7.91771 6.69733 7.91586 8.21033 8.4 9.60016L1 17.0002Z" stroke={pathname === destination ? `${textHoverIconColor}` : `${iconColor}`} stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M15.5 7.00024C15.7761 7.00024 16 6.77639 16 6.50024C16 6.2241 15.7761 6.00024 15.5 6.00024C15.2239 6.00024 15 6.2241 15 6.50024C15 6.77639 15.2239 7.00024 15.5 7.00024Z" stroke={pathname === destination ? `${textHoverIconColor}` : `${iconColor}`} stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
              </svg>

              {isExpanded && <span className={`pt-[4px] text-[12px] font-["Mona-Sans-S"] text-[${pathname === destination ? `${textHoverIconColor}` : `${iconColor}`}] whitespace-nowrap min-w-[fit-content]`}>
                License
              </span>}
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default LicenseButton;
