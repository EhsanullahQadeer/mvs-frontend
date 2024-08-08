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

const Theme = (
  props:any
) => {
  return (
    <div className="grid grid-rows-[auto,1fr] grid-cols-[auto,1fr] h-screen">
      <div
        className="row-start-1 col-start-1 bg-[#141414] w-[240px] border-b-2 border-r-2 border-[#1F1F1F] flex items-center justify-center"
        onClick={() => window.location.href = "/home"}
        style={{ cursor: "pointer" }}
      >
        <img src={mvssive_text} alt="Site Logo" className="h-auto" />
      </div>
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
  );
}

export default Theme;
