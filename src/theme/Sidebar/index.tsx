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

          {/* My Profile button */}
          <button
            onClick={() => {
              navigate(`/profile/${state?.auth?.user?.username}`);
            }}
            className="cursor-pointer w-[100%] h-[76px] flex flex-col items-center justify-center"
          >
            {/* Change color of button based on the current path and hover */}
            <div
              className={`rounded-[8px] h-[40px] w-[40px] p-[8px] flex items-center justify-center 
              ${pathname === `/profile/${state?.auth?.user?.username}`
                  ? 'bg-[#9EFF00] text-[#000]'
                  : 'bg-[#1C1C1C] hover:bg-[#B4FF15] text-[#FFFFFF] hover:text-[#000]'
                }`}
            >
              {/* Coloring issues if imported from assets, so hardcoding icons */}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </div>
            <span className={`pt-[4px] text-[12px] font-["Mona-Sans-S"] text-[#FFFFFF]`}>
              My Profile
            </span>
          </button>

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
                navigate('/library');
              }}
              className="cursor-pointer w-[100%] h-[76px] flex flex-col items-center justify-center"
            >
              <div
                className={`rounded-[8px] h-[40px] w-[40px] p-[8px] flex items-center justify-center 
              ${pathname.startsWith('/library')
                    ? 'bg-[#9EFF00] text-[#000]'
                    : 'bg-[#1C1C1C] hover:bg-[#B4FF15] text-[#FFFFFF] hover:text-[#000]'
                  }`}
              >
                <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 8.5V11.5M5 4.5V15.5M9 1.5V19.5M13 6.5V13.5M17 3.5V16.5M21 8.5V11.5"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <span className={`pt-[4px] text-[12px] font-["Mona-Sans-S"] text-[#FFFFFF]`}>
                Library
              </span>
            </button>
          </div>
        </div >
      </div>
  );
};

export default Sidebar;
