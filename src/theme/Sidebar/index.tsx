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

const Sidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <React.Fragment>
      <div className="sidebar py-[12px] border-b-2 border-r-2 border-[#1F1F1F] w-full h-full px-[12px] bg-[#0F0F0F]">

        {/* Home button */}
        <button
          onClick={() => {
            // @TODO this should be redirected to the "home" page, not "sounds"
            navigate('/home');
          }}
          // Change color of button based on the current path and hover
          className={`cursor-pointer rounded-[8px] w-[100%] h-[52px] px-[24px] flex items-center
          justify-start ${pathname === '/home'
              ? 'bg-[#C4FF48] text-[#000] font-["Mona-Sans-S"]'
              : 'hover:bg-[#B4FF15] text-[#CECFDA] hover:text-[#000] font-["Mona-Sans-S"]'
            }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round"
              strokeWidth={2}
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
            <span className="pl-[8px]">Home</span>
        </button>

        {/* Dashboard button */}
        <button
          onClick={() => {
            // @TODO this should be redirected to the "home" page, not "sounds"
            navigate('/home');
          }}
          // Change color of button based on the current path and hover
          className={`cursor-pointer rounded-[8px] w-[100%] h-[52px] px-[24px] flex items-center
          justify-start ${pathname === '/dashboard'
              ? 'bg-[#C4FF48] text-[#000] font-["Mona-Sans-S"]'
              : 'hover:bg-[#B4FF15] text-[#CECFDA] hover:text-[#000] font-["Mona-Sans-S"]'
            }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
          </svg>

            <span className="pl-[8px]">Dashboard</span>
        </button>

        {/* Inbox button */}
        <button
          onClick={() => {
            // @TODO this should be redirected to the "home" page, not "sounds"
            navigate('/inbox');
          }}
          // Change color of button based on the current path and hover
          className={`cursor-pointer rounded-[8px] w-[100%] h-[52px] px-[24px] flex items-center
          justify-start ${pathname === '/inbox'
              ? 'bg-[#C4FF48] text-[#000] font-["Mona-Sans-S"]'
              : 'hover:bg-[#B4FF15] text-[#CECFDA] hover:text-[#000] font-["Mona-Sans-S"]'
            }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
          </svg>
          <span className="pl-[8px]">Inbox</span>
        </button>

        {/* Network Request button */}
        <button
          onClick={() => {
            // @TODO this should be redirected to the "home" page, not "sounds"
            navigate('/home');
          }}
          // Change color of button based on the current path and hover
          className={`cursor-pointer rounded-[8px] w-[100%] h-[52px] px-[24px] flex items-center
          justify-start ${pathname === '/network-request'
              ? 'bg-[#C4FF48] text-[#000] font-["Mona-Sans-S"]'
              : 'hover:bg-[#B4FF15] text-[#CECFDA] hover:text-[#000] font-["Mona-Sans-S"]'
            }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
          </svg>

            <span className="pl-[8px]">Network Request</span>
        </button>

        {/* Documents button */}
        <button
          onClick={() => {
            // @TODO this should be redirected to the "home" page, not "sounds"
            navigate('/home');
          }}
          // Change color of button based on the current path and hover
          className={`cursor-pointer rounded-[8px] w-[100%] h-[52px] px-[24px] flex items-center
          justify-start ${pathname === '/documents'
              ? 'bg-[#C4FF48] text-[#000] font-["Mona-Sans-S"]'
              : 'hover:bg-[#B4FF15] text-[#CECFDA] hover:text-[#000] font-["Mona-Sans-S"]'
            }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
          </svg>

            <span className="pl-[8px]">Documents</span>
        </button>

        {/* License Request button */}
        <button
          onClick={() => {
            // @TODO this should be redirected to the "home" page, not "sounds"
            navigate('/home');
          }}
          // Change color of button based on the current path and hover
          className={`cursor-pointer rounded-[8px] w-[100%] h-[52px] px-[24px] flex items-center
          justify-start ${pathname === '/license-request'
              ? 'bg-[#C4FF48] text-[#000] font-["Mona-Sans-S"]'
              : 'hover:bg-[#B4FF15] text-[#CECFDA] hover:text-[#000] font-["Mona-Sans-S"]'
            }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
          </svg>
            <span className="pl-[8px]">License Request</span>
        </button>

        {/* Library Section */}
        <div>
          <div className="font-['Mona-Sans-M']">
            <p className="text-[16px] mt-[16px] mb-[16px] font-['Mona-Sans-S'] text-[#7b7b7b] mb-[4px]">Library</p>
          </div>
          <div className="border border-x-0 border-t border-b-0 border-[#28282880] mt-[0]"></div>
        </div>

        <div className="onboard-2">
          {/* Downloads button */}
          <button
            onClick={() => {
              navigate('/my/downloads');
            }}
            className={`cursor-pointer rounded-[8px] w-[100%] h-[52px] px-[24px] flex items-center 
            justify-start ${pathname === '/my/downloads'
                ? 'bg-[#C4FF48] text-[#000] font-["Mona-Sans-M"]'
                : 'hover:bg-[#B4FF15] text-[#CECFDA] hover:text-[#000] font-["Mona-Sans-M"]'
              }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 20 20"
              fill="none">
              <path
                d="M1.66675 8.33333V10.8333M5.00008 5V14.1667M8.33342 2.5V17.5M11.6667 6.66667V12.5M15.0001 4.16667V15M18.3334 8.33333V10.8333"
                stroke="#CECFDA"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="pl-[8px]">Downloads</p>
          </button>

          {/* Open Projects */}
          <button
            onClick={() => {
              navigate('/my/likes');
            }}
            className={`cursor-pointer rounded-[8px] w-[100%] h-[52px] px-[24px] flex items-center justify-start ${pathname === '/my/likes'
                ? 'bg-[#C4FF48] text-[#000] font-["Mona-Sans-M"]'
                : 'hover:bg-[#B4FF15] text-[#CECFDA] hover:text-[#000] font-["Mona-Sans-M"]'
              }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
            </svg>

            <p className="pl-[8px]">Open Projects</p>
          </button>
        </div>

        {/* Collections Section */}
        <div>
          <div className="font-['Mona-Sans-M']">
            <p className="text-[16px] mt-[16px] mb-[16px] font-['Mona-Sans-S'] text-[#7b7b7b] mb-[4px]">Collections</p>
          </div>
          <div className="border border-x-0 border-t border-b-0 border-[#28282880] mt-[0]"></div>
        </div>
        {/* New Collection */}
        <button
            onClick={() => {
              navigate('/my/likes');
            }}
            className={`cursor-pointer rounded-[8px] w-[100%] h-[52px] px-[24px] flex items-center justify-start ${pathname === '/my/likes'
                ? 'bg-[#C4FF48] text-[#000] font-["Mona-Sans-M"]'
                : 'hover:bg-[#B4FF15] text-[#CECFDA] hover:text-[#000] font-["Mona-Sans-M"]'
              }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <p className="pl-[8px]">New Collection</p>
          </button>
        <button
            onClick={() => {
              navigate('/my/likes');
            }}
            className={`cursor-pointer rounded-[8px] w-[100%] h-[52px] px-[24px] flex items-center justify-start ${pathname === '/my/likes'
                ? 'bg-[#C4FF48] text-[#000] font-["Mona-Sans-M"]'
                : 'hover:bg-[#B4FF15] text-[#CECFDA] hover:text-[#000] font-["Mona-Sans-M"]'
              }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 20 20"
              fill="none">
              <path
                d="M15.8337 11.6667C17.0753 10.45 18.3337 8.99167 18.3337 7.08333C18.3337 5.86776 17.8508 4.70197 16.9912 3.84243C16.1317 2.98289 14.9659 2.5 13.7503 2.5C12.2837 2.5 11.2503 2.91667 10.0003 4.16667C8.75033 2.91667 7.71699 2.5 6.25033 2.5C5.03475 2.5 3.86896 2.98289 3.00942 3.84243C2.14988 4.70197 1.66699 5.86776 1.66699 7.08333C1.66699 9 2.91699 10.4583 4.16699 11.6667L10.0003 17.5L15.8337 11.6667Z"
                fill="#CECFDA"
              />
            </svg>
            <p className="pl-[8px]">Likes</p>
          </button>

      </div>

    </React.Fragment>
  );
};

export default Sidebar;
