/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <React.Fragment>
      <div className="sidebar py-[50px] w-[276px] px-[12px] bg-[#0F0F0F]">
        <button 
         onClick={(() => {
          navigate('/sounds')
         })}
        className="hover:bg-[#1E34F9] cursor-pointer rounded-[8px] pl-[32px] text-left w-[100%] h-[52px] font-['Mona-Sans-S'] text-[#ddd] text-[14px]">
          Browse
        </button>
        <div className="border border-x-0 border-t border-b-0 border-[#28282880] mt-[49px]"></div>
        <div className="py-[16px] font-['Mona-Sans-M']">
          <p className="text-[14px] text-[#7b7b7b]">Your Library</p>
        </div>
        <button 
        onClick={(() => {
            navigate('/sounds')
        })}
        
        className={`${pathname === '/sounds' ? "w-full bg-[#1E34F9] cursor-pointer py-[16px] font-['Mona-Sans-M'] flex px-[24px]" : "w-full  cursor-pointer py-[16px] font-['Mona-Sans-M'] flex px-[24px]"}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M1.66675 8.33333V10.8333M5.00008 5V14.1667M8.33342 2.5V17.5M11.6667 6.66667V12.5M15.0001 4.16667V15M18.3334 8.33333V10.8333"
              stroke="#CECFDA"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-[#CECFDA] pl-[8px]">Sounds</p>
        </button>
        <button 
         onClick={(() => {
          navigate('/my/likes')
         })}
        
        className={`${pathname === '/my/likes' ? "w-full bg-[#1E34F9] cursor-pointer py-[16px] font-['Mona-Sans-M'] flex px-[24px]" : "w-full  cursor-pointer py-[16px] font-['Mona-Sans-M'] flex px-[24px]"}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M15.8337 11.6667C17.0753 10.45 18.3337 8.99167 18.3337 7.08333C18.3337 5.86776 17.8508 4.70197 16.9912 3.84243C16.1317 2.98289 14.9659 2.5 13.7503 2.5C12.2837 2.5 11.2503 2.91667 10.0003 4.16667C8.75033 2.91667 7.71699 2.5 6.25033 2.5C5.03475 2.5 3.86896 2.98289 3.00942 3.84243C2.14988 4.70197 1.66699 5.86776 1.66699 7.08333C1.66699 9 2.91699 10.4583 4.16699 11.6667L10.0003 17.5L15.8337 11.6667Z"
              fill="#CECFDA"
            />
          </svg>
          <p className="text-[#CECFDA] pl-[8px]">Likes</p>
        </button>
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
