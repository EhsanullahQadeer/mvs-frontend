/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./header";
import Sidebar from "./sidebar";
import mvssive_text from "../../assets/img/massive_text.svg";
import ReactJoyride, { ACTIONS, EVENTS, Step } from "react-joyride";
import logo from "../../assets/img/mvssive-logo.png";
import royal_logo from "../../assets/img/royalty-icon.svg";
import { RootState } from "redux/reducers/combine";
import { useSelector } from "react-redux";
import Onboarding from "../onBoarding/onboard";

const Theme = (props:any) => {
 

  return (
    <React.Fragment>
      <Onboarding />
      <div className="grid grid-rows-[auto,1fr] grid-cols-[auto,1fr] h-screen">
        <div
          className="row-start-1 col-start-1 bg-[#141414] w-[240px] border-b-2 border-r-2 border-[#1F1F1F] flex items-center justify-center"
          onClick={() => window.location.href = "/sounds"}
          style={{ cursor: "pointer" }}
          >
          {/* Adjust the content inside the new container */}
          <img src={mvssive_text} alt="Site Logo" className="h-auto" />
        </div>

        {/* Header, next to the logo */}
        <div className="onboard-14 row-start-1 col-start-2 border-b-2 border-[#1F1F1F]">
            <Header />
        </div>

        {/* Sidebar */}
        <div className="row-start-2 col-start-1">
            <Sidebar />
        </div>

        {/* Main content */}
        <div className="row-start-2 col-start-2 overflow-auto">
            {props.children}
        </div>
      </div>
    
    </React.Fragment> 
  );
}

export default Theme;
