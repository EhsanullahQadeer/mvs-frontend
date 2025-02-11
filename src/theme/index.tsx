/*************************************************************************
 * @file index.tsx
 * @author End Quote
 * @desc Layout for the application.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* LOCAL IMPORTS */
import Header from "./Header";
import Sidebar from "./Sidebar";
import mvssive_text from "../assets/img/massive_text.svg";
import mvssive_mini from "../assets/img/M-logo.png";
import NavHeader from "components/ui/Header/organisms/navHeader";

interface ThemeProps {
  isOverflowHidden?: boolean;
  children?: React.ReactNode;
  headerTitle?: string; // Add the `text` prop here to pass to Header
}

const Theme = (props: ThemeProps) => {
  return (
    <div className="grid grid-rows-[90px,1fr] grid-cols-[90px,1fr] h-screen bg-[#08090A]">
      <div
        className="row-start-1 col-start-1 bg-[#08090A] border-b-2 border-r-2 border-[#1F1F1F]
         flex items-center justify-center"
        onClick={() => (window.location.href = "/home")}
        style={{ cursor: "pointer" }}
      >
        <svg
          width="18"
          height="15"
          viewBox="0 0 18 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.872337 0.454545H5.22603L8.91921 9.46023H9.08967L12.7828 0.454545H17.1365V15H13.7132V6.06534H13.5925L10.0982 14.9077H7.91069L4.41637 6.01562H4.29563V15H0.872337V0.454545Z"
            fill="#9EFF00"
          />
        </svg>
      </div>
      {/* Header */}
      {/* <div className="onboard-14 row-start-1 col-start-2 border-b-2 border-[#1F1F1F] flex items-center pl-[20px]">
        <Header headerTitle={props.headerTitle} />
      </div> */}

      {/* Nav Header */}
      <div className="onboard-14 row-start-1 col-start-2 border-b-2 border-[#1F1F1F] flex items-center pl-[20px]">
        <NavHeader name="navHeader" id="1" username="someUsername" email="test@test.com" />
      </div>

      {/* Sidebar */}
      <div className="row-start-2 col-start-1 overflow-y-auto custom-dropdown border-r-2 border-[#1F1F1F]">
        <Sidebar />
      </div>

      {/* Main content */}
      <div
        className={`row-start-2 col-start-2 flex flex-col ${
          props.isOverflowHidden ? "overflow-hidden" : "overflow-auto"
        }`}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Theme;
