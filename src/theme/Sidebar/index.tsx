/*************************************************************************
 * @file index.tsx
 * @author Zohaib Ahmed
 * @desc Provides sidebar navigation for the application.
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* IMPORTS */
import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useHeaderHooks } from "theme/Header/Header.hooks";
import ProfileButton from "./ProfileButton";

const Sidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  /* States and Hooks (copied from Header.tsx) */
  const {
    state,
    contact_us,
    setContactUs,
    user_settings,
    setUserSettings,
    onboardGuide,
    LogOut,
  } = useHeaderHooks();

  return (
    <React.Fragment>
      <div className="sidebar py-[12px] w-full h-fit px-[12px] bg-[#08090A] overflow-y-auto pb-[60px]">
        {/* Main Sidebar Icons */}
        <div className="flex-grow">
          {/* Lines button */}
          <button
            onClick={() => {
              // @TODO check what this button does
              navigate('/home');
            }}
            className="cursor-pointer w-[100%] h-[76px] flex flex-col items-center justify-center"
          >
            {/* Change color of button based on the current path and hover */}
            <div
              className={`rounded-[8px] h-[40px] w-[40px] p-[8px] flex items-center justify-center 
              ${pathname === '/unknown'
                  ? 'bg-[#9EFF00] text-[#000]'
                  : 'hover:bg-[#B4FF15] text-[#FFFFFF] hover:text-[#000]'
                }`}
            >
              <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1H19M1 7H19M1 13H19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
          </button>

          {/* Home button */}
          <button
            onClick={() => {
              navigate('/home');
            }}
            className="cursor-pointer w-[100%] h-[76px] flex flex-col items-center justify-center"
          >
            {/* Change color of button based on the current path and hover */}
            <div
              className={`rounded-[8px] h-[40px] w-[40px] p-[8px] flex items-center justify-center 
              ${pathname === '/home'
                  ? 'bg-[#9EFF00] text-[#000]'
                  : 'bg-[#1C1C1C] hover:bg-[#B4FF15] text-[#FFFFFF] hover:text-[#000]'
                }`}
            >
              {/* Coloring issues if imported from assets, so hardcoding icons */}
              <svg width="20" height="23" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 21.5V11.5H13V21.5M1 8.5L10 1.5L19 8.5V19.5C19 20.0304 18.7893 20.5391 18.4142 20.9142C18.0391 21.2893 17.5304 21.5 17 21.5H3C2.46957 21.5 1.96086 21.2893 1.58579 20.9142C1.21071 20.5391 1 20.0304 1 19.5V8.5Z"
                  stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            <span className={`pt-[4px] text-[12px] font-["Mona-Sans-S"] text-[#FFFFFF]`}>
              Home
            </span>
          </button>

          {/* Dashboard button */}
          {/* <button
            onClick={() => {
              // @TODO dashboard page
              navigate('/home');
            }}
            className="cursor-pointer w-[100%] h-[76px] flex flex-col items-center justify-center"
          >
            <div
              className={`rounded-[8px] h-[40px] w-[40px] p-[8px] flex items-center justify-center 
              ${pathname === '/unknown'
                  ? 'bg-[#9EFF00] text-[#000]'
                  : 'bg-[#1C1C1C] hover:bg-[#B4FF15] text-[#FFFFFF] hover:text-[#000]'
                }`}
            >
              <svg width="14" height="19" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 17.5V7.5M13 17.5V1.5M1 17.5V13.5"
                  stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>

            </div>
            <span className={`pt-[4px] text-[12px] font-["Mona-Sans-S"] text-[#FFFFFF]`}>
              Dashboard
            </span>
          </button> */}

          {/* DMs / inbox button */}
          <button
            onClick={() => {
              // @TODO this should be redirected to the "home" page, not "sounds"
              navigate('/inbox');
            }}
            className="cursor-pointer w-[100%] h-[76px] flex flex-col items-center justify-center"
          >
            <div
              className={`rounded-[8px] h-[40px] w-[40px] p-[8px] flex items-center justify-center 
              ${pathname === '/inbox'
                  ? 'bg-[#9EFF00] text-[#000]'
                  : 'bg-[#1C1C1C] hover:bg-[#B4FF15] text-[#FFFFFF] hover:text-[#000]'
                }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
            </div>
            <span className={`pt-[4px] text-[12px] font-["Mona-Sans-S"] text-[#FFFFFF]`}>
              DMs
            </span>
          </button>

          {/* License Request button
          // <button
          //   onClick={() => {
          //     navigate('/home');
          //   }}
          //   className="cursor-pointer w-[100%] h-[76px] flex flex-col items-center justify-center"
          // >
          //   <div
          //     className={`rounded-[8px] h-[40px] w-[40px] p-[8px] flex items-center justify-center 
          //     ${pathname === '/license'
          //         ? 'bg-[#9EFF00] text-[#000]'
          //         : 'bg-[#1C1C1C] hover:bg-[#B4FF15] text-[#FFFFFF] hover:text-[#000]'
          //       }`}
          //   >
          //     <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          //       <path d="M15.5 7.50024C15.7761 7.50024 16 7.27639 16 7.00024C16 6.7241 15.7761 6.50024 15.5 6.50024C15.2239 6.50024 15 6.7241 15 7.00024C15 7.27639 15.2239 7.50024 15.5 7.50024Z"
          //         fill="black" />
          //       <path d="M1 17.5002V20.5002C1 21.1002 1.4 21.5002 2 21.5002H6V18.5002H9V15.5002H11L12.4 14.1002C13.7898 14.5843 15.3028 14.5825 16.6915 14.0949C18.0801 13.6074 19.2622 12.663 20.0444 11.4163C20.8265 10.1696 21.1624 8.69433 20.9971 7.2319C20.8318 5.76946 20.1751 4.40641 19.1344 3.36573C18.0938 2.32505 16.7307 1.66834 15.2683 1.50305C13.8058 1.33776 12.3306 1.67366 11.0839 2.4558C9.83716 3.23795 8.89279 4.42003 8.40525 5.80868C7.91771 7.19733 7.91586 8.71033 8.4 10.1002L1 17.5002Z"
          //         stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          //       <path d="M15.5 7.50024C15.7761 7.50024 16 7.27639 16 7.00024C16 6.7241 15.7761 6.50024 15.5 6.50024C15.2239 6.50024 15 6.7241 15 7.00024C15 7.27639 15.2239 7.50024 15.5 7.50024Z"
          //         stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          //     </svg>
          //   </div>
          //   <span className={`pt-[4px] text-[12px] font-["Mona-Sans-S"] text-[#FFFFFF]`}>
          //     License
          //   </span>
          // </button> */}

          {/* Notifications Button */}
          <button
            onClick={() => {
              // @TODO redirect to notifications page
              navigate('/home');
            }}
            className="cursor-pointer w-[100%] h-[76px] flex flex-col items-center justify-center"
          >
            <div
              className={`rounded-[8px] h-[40px] w-[40px] p-[8px] flex items-center justify-center 
              ${pathname === '/unknown'
                  ? 'bg-[#9EFF00] text-[#000]'
                  : 'bg-[#1C1C1C] hover:bg-[#B4FF15] text-[#FFFFFF] hover:text-[#000]'
                }`}
            >
              <svg width="20" height="23" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.30005 20.5C8.46743 20.8044 8.7135 21.0583 9.01254 21.2352C9.31158 21.412 9.65263 21.5053 10 21.5053C10.3475 21.5053 10.6885 21.412 10.9876 21.2352C11.2866 21.0583 11.5327 20.8044 11.7 20.5M4 7.5C4 5.9087 4.63214 4.38258 5.75736 3.25736C6.88258 2.13214 8.4087 1.5 10 1.5C11.5913 1.5 13.1174 2.13214 14.2426 3.25736C15.3679 4.38258 16 5.9087 16 7.5C16 14.5 19 16.5 19 16.5H1C1 16.5 4 14.5 4 7.5Z"
                  stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>

            </div>
            <span className={`pt-[4px] text-[12px] font-["Mona-Sans-S"] text-[#FFFFFF]`}>
              Notifications
            </span>
          </button>
          <div className="onboard-2">
            {/* Library button */}
            <button
              onClick={() => {
                navigate('/home');
              }}
              className="cursor-pointer w-[100%] h-[76px] flex flex-col items-center justify-center"
            >
              <div
                className={`rounded-[8px] h-[40px] w-[40px] p-[8px] flex items-center justify-center 
              ${pathname === '/unknown'
                    ? 'bg-[#9EFF00] text-[#000]'
                    : 'bg-[#1C1C1C] hover:bg-[#B4FF15] text-[#FFFFFF] hover:text-[#000]'
                  }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </div>
              <span className={`pt-[4px] text-[12px] font-["Mona-Sans-S"] text-[#FFFFFF]`}>
                Likes
              </span>
            </button>
          </div>

            {/* Library button */}
            <button
              onClick={() => {
                navigate('/home');
              }}
              className="cursor-pointer w-[100%] h-[76px] flex flex-col items-center justify-center"
            >
              <div
                className={`rounded-[8px] h-[40px] w-[40px] p-[8px] flex items-center justify-center 
              ${pathname === '/unknown'
                    ? 'bg-[#9EFF00] text-[#000]'
                    : 'bg-[#1C1C1C] hover:bg-[#B4FF15] text-[#FFFFFF] hover:text-[#000]'
                  }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" 
                  />
                </svg>
              </div>
              <span className={`pt-[4px] text-[12px] font-["Mona-Sans-S"] text-[#FFFFFF]`}>
                Downloads
              </span>
            </button>


          {/* Collections */}
          {/* <button
            onClick={() => {
              navigate('/home');
            }}
            className="cursor-pointer w-[100%] h-[76px] flex flex-col items-center justify-center"
          >
            <div
              className={`rounded-[8px] h-[40px] w-[40px] p-[8px] flex items-center justify-center 
              ${pathname === '/unknown'
                  ? 'bg-[#9EFF00] text-[#000]'
                  : 'bg-[#1C1C1C] hover:bg-[#B4FF15] text-[#FFFFFF] hover:text-[#000]'
                }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>
            <span className={`pt-[4px] text-[12px] font-["Mona-Sans-S"] text-[#FFFFFF]`}>
              Collections
            </span>
          </button> */}
        </div >
      </div>

      {/* Avatar Button (Fixed at Bottom) */}
      <div className="fixed bottom-0 left-0 w-[90px] flex justify-center pb-4 pt-1 bg-[#08090A] border-r-2 border-[#1F1F1F] z-10">
        <button className="relative w-[40px] h-[40px] rounded-full flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-lime-500 rounded-full p-[2px]">
            <div className="bg-[#1C1C1C] w-full h-full rounded-full flex items-center justify-center">
              <ProfileButton />
            </div>
          </div>
        </button>
      </div>

    </React.Fragment >
  );
};

export default Sidebar;
