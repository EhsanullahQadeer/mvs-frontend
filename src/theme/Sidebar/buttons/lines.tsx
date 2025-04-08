import { useLocation } from "react-router-dom";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "redux/reducers";
import { useHeaderHooks } from "theme/Header/Header.hooks";
import { ReactComponent as HambergerIcon } from "../../../assets/icons/hambergerIcon.svg";

const LinesButton = (props: {
  isExpanded: boolean;
  setIsExpanded: (isExpanded: boolean) => void;
  sidebarWidth: string;
  headerHeight: string;
  iconColor: string;
  textHoverIconColor: string;
  selectedButtonColor: string;
}) => {
  const {
    isExpanded,
    setIsExpanded,
    sidebarWidth,
    headerHeight,
    iconColor,
    textHoverIconColor,
    selectedButtonColor,
  } = props;
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  return (
    <div>
      {/* Lines button */}
      <button
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
        className={`cursor-pointer w-[100%] h-[76px] pb-[6px] pl-[8px] flex flex-row ${
          isExpanded ? "items-center pl-[12px] justify-start" : "items-center"
        }`}
      >
        <div
          id="sidebar-toggle"
          className={`rounded-[8px] h-[40px] w-[40px] p-[8px] flex items-center justify-center text-[#FFFFFF]`}
        >
          <HambergerIcon />
        </div>
      </button>
    </div>
  );
};

export default LinesButton;
