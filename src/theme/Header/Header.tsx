/*************************************************************************
 * @file Header.tsx
 * @author End Quote
 * @desc Provides layout and navigation for the application.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* IMPORTS */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Avatar from "react-avatar";

/* LOCAL IMPORTS */
import UserSettingsModal from "components/modals/user-settings";
import ContactModal from "components/modals/contact-us";
import { useHeaderHooks } from "./Header.hooks";
import { classNames, HeaderProps } from "./Header.types";
import { useLambdaEvent } from "services/WebSocket/useLambdaEvent.hook";

const Header: React.FC<HeaderProps> = () => {
  /* States and Hooks */
  const {
    state,
    contact_us,
    setContactUs,
    user_settings,
    setUserSettings,
    onboardGuide,
    LogOut,
  } = useHeaderHooks();

  /**
   * TEMPORARY CODE: Depicted here for demonstrative purposes
   */
  // State for highlighting notification button
  const [isHighlighted, setIsHighlighted] = useState(false);

  // Handle NEW_MESSAGE event
  useLambdaEvent("NEW_MESSAGE", () => {
    setIsHighlighted(true);
    console.log("NOTIFICATION RECEIVED!!");
    setTimeout(() => {
      setIsHighlighted(false);
    }, 10000); // 10 seconds
  });
  /* END TEMPORARY CODE */

  const navigate = useNavigate();

  return (
    <Fragment>
      <div className="topbar w-[100%] py-[12px] bg-[#141414] flex justify-between">
        <div className="search ml-0 ml-[19px] ">
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative w-[400px]">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={25}
                viewBox="0 0 24 25"
                fill="none"
              >
                <path
                  d="M21 21.5L16.7 17.2M19 11.5C19 15.9183 15.4183 19.5 11 19.5C6.58172 19.5 3 15.9183 3 11.5C3 7.08172 6.58172 3.5 11 3.5C15.4183 3.5 19 7.08172 19 11.5Z"
                  stroke="#4C4C4C"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <input
              type="text"
              id="simple-search"
              className="bg-jetBlack font-['Mona-Sans-M'] border border-[#191919] text-[#4c4c4c] text-sm rounded-[100px] w-[400px] h-[45px] pl-10 py-2.5"
              placeholder="search guitars, synths, and more..."
            />
          </div>
        </div>

        <div className="flex items-center space-x-4 px-[40px]">
          <button
            className={`relative bg-transparent rounded-full ${
              isHighlighted ? "bg-red-900" : "bg-blue-900"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
              />
            </svg>
          </button>

          <Menu as="div" className="user relative">
            <Menu.Button>
              {state?.auth?.user?.thumbnail ? (
                <Avatar
                  src={state?.auth?.user?.thumbnail}
                  size="30"
                  round={true}
                />
              ) : (
                <Avatar name={state?.auth?.user?.name} size="40" round={true} />
              )}
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="zindex absolute right-[30px] top-[30px] w-[230px] bg-[#111] border border-[#545454] rounded-[8px] p-[10px]">
                {/* Menu Items */}
                <Menu.Item>
                  {({ active }) => (
                    <div
                      onClick={() => navigate("/")}
                      className={classNames(
                        active
                          ? "flex items-center px-[12px] py-[8px] cursor-pointer bg-[#0014CD]"
                          : "hover:bg-[#0014CD] rounded-[8px] flex items-center px-[12px] py-[8px] cursor-pointer"
                      )}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M9 22V12H15V22M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                          stroke="#BBBBBB"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="text-[#BBBBBB] font-['Mona-Sans-M'] text-[14px] pl-[8px]">
                        Home
                      </p>
                    </div>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <div
                      onClick={() => {
                        navigate(`/artist-profile/${state?.auth?.user?.username}`);
                      }}
                      className={classNames(
                        active
                          ? "flex items-center px-[12px] py-[8px] cursor-pointer bg-[#0014CD]"
                          : "hover:bg-[#0014CD] rounded-[8px] flex items-center px-[12px] py-[8px] cursor-pointer"
                      )}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M9 22V12H15V22M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                          stroke="#BBBBBB"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="text-[#BBBBBB] font-['Mona-Sans-M'] text-[14px] pl-[8px]">
                        Profile
                      </p>
                    </div>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <div
                      onClick={() => navigate("/settings/")}
                      className={classNames(
                        active
                          ? "flex items-center px-[12px] py-[8px] cursor-pointer bg-[#0014CD]"
                          : "hover:bg-[#0014CD] rounded-[8px] flex items-center px-[12px] py-[8px] cursor-pointer"
                      )}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12.22 2H11.78C11.2496 2 10.7409 2.21071 10.3658 2.58579C9.99072 2.96086 9.78 3.46957 9.78 4V4.18C9.77964 4.53073 9.68706 4.87519 9.51154 5.17884C9.33602 5.48248 9.08374 5.73464 8.78 5.91L8.35 6.16C8.04596 6.33554 7.70108 6.42795 7.35 6.42795C6.99893 6.42795 6.65404 6.33554 6.35 6.16L6.2 6.08C5.74107 5.81526 5.19584 5.74344 4.684 5.88031C4.17217 6.01717 3.73555 6.35154 3.47 6.81L3.25 7.19C2.98526 7.64893 2.91345 8.19416 3.05031 8.706C3.18717 9.21783 3.52154 9.65445 3.98 9.92L4.13 10.02C4.43228 10.1945 4.68362 10.4451 4.85905 10.7468C5.03448 11.0486 5.1279 11.391 5.13 11.74V12.25C5.1314 12.6024 5.03965 12.949 4.86405 13.2545C4.68844 13.5601 4.43521 13.8138 4.13 13.99L3.98 14.08C3.52154 14.3456 3.18717 14.7822 3.05031 15.294C2.91345 15.8058 2.98526 16.3511 3.25 16.81L3.47 17.19C3.73555 17.6485 4.17217 17.9828 4.684 18.1197C5.19584 18.2566 5.74107 18.1847 6.2 17.92L6.35 17.84C6.65404 17.6645 6.99893 17.5721 7.35 17.5721C7.70108 17.5721 8.04596 17.6645 8.35 17.84L8.78 18.09C9.08374 18.2654 9.33602 18.5175 9.51154 18.8212C9.68706 19.1248 9.77964 19.4693 9.78 19.82V20C9.78 20.5304 9.99072 21.0391 10.3658 21.4142C10.7409 21.7893 11.2496 22 11.78 22H12.22C12.7504 22 13.2591 21.7893 13.6342 21.4142C14.0093 21.0391 14.22 20.5304 14.22 20V19.82C14.2204 19.4693 14.3129 19.1248 14.4885 18.8212C14.664 18.5175 14.9163 18.2654 15.22 18.09L15.65 17.84C15.954 17.6645 16.2989 17.5721 16.65 17.5721C17.0011 17.5721 17.346 17.6645 17.65 17.84L17.8 17.92C18.2589 18.1847 18.8042 18.2566 19.316 18.1197C19.8278 17.9828 20.2645 17.6485 20.53 17.19L20.75 16.8C21.0147 16.3411 21.0866 15.7958 20.9497 15.284C20.8128 14.7722 20.4785 14.3356 20.02 14.07L19.87 13.99C19.5648 13.8138 19.3116 13.5601 19.136 13.2545C18.9604 12.949 18.8686 12.6024 18.87 12.25V11.75C18.8686 11.3976 18.9604 11.051 19.136 10.7455C19.3116 10.4399 19.5648 10.1862 19.87 10.01L20.02 9.92C20.4785 9.65445 20.8128 9.21783 20.9497 8.706C21.0866 8.19416 21.0147 7.64893 20.75 7.19L20.53 6.81C20.2645 6.35154 19.8278 6.01717 19.316 5.88031C18.8042 5.74344 18.2589 5.81526 17.8 6.08L17.65 6.16C17.346 6.33554 17.0011 6.42795 16.65 6.42795C16.2989 6.42795 15.954 6.33554 15.65 6.16L15.22 5.91C14.9163 5.73464 14.664 5.48248 14.4885 5.17884C14.3129 4.87519 14.2204 4.53073 14.22 4.18V4C14.22 3.46957 14.0093 2.96086 13.6342 2.58579C13.2591 2.21071 12.7504 2 12.22 2Z"
                          stroke="#CECFDA"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                          stroke="#CECFDA"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="text-[#BBBBBB] font-['Mona-Sans-M'] text-[14px] pl-[8px]">
                        Settings
                      </p>
                    </div>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <div
                      onClick={() => navigate("/terms-of-service")}
                      className={classNames(
                        active
                          ? "flex items-center px-[12px] py-[8px] cursor-pointer bg-[#0014CD]"
                          : "hover:bg-[#0014CD] rounded-[8px] flex items-center px-[12px] py-[8px] cursor-pointer"
                      )}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M14 8H8M16 12H8M13 16H8M4 2V22L6 21L8 22L10 21L12 22L14 21L16 22L18 21L20 22V2L18 3L16 2L14 3L12 2L10 3L8 2L6 3L4 2Z"
                          stroke="#D3D3D3"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="text-[#BBBBBB] font-['Mona-Sans-M'] text-[14px] pl-[8px]">
                        Terms of service
                      </p>
                    </div>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <div
                      onClick={() => setContactUs(true)}
                      className={classNames(
                        active
                          ? "flex items-center px-[12px] py-[8px] cursor-pointer bg-[#0014CD]"
                          : "flex hover:bg-[#0014CD] rounded-[8px] items-center px-[12px] py-[8px] cursor-pointer"
                      )}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M22 7L13.03 12.7C12.7213 12.8934 12.3643 12.996 12 12.996C11.6357 12.996 11.2787 12.8934 10.97 12.7L2 7M4 4H20C21.1046 4 22 4.89543 22 6V18C22 19.1046 21.1046 20 20 20H4C2.89543 20 2 19.1046 2 18V6C2 4.89543 2.89543 4 4 4Z"
                          stroke="#B9B9B9"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="text-[#BBBBBB] font-['Mona-Sans-M'] text-[14px] pl-[8px]">
                        Contact Us
                      </p>
                    </div>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <div
                      onClick={onboardGuide}
                      className={classNames(
                        active
                          ? "flex items-center px-[12px] py-[8px] cursor-pointer bg-[#0014CD]"
                          : "hover:bg-[#0014CD] rounded-[8px] flex items-center px-[12px] py-[8px] cursor-pointer"
                      )}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M9.08997 9.00008C9.32507 8.33175 9.78912 7.76819 10.3999 7.40921C11.0107 7.05024 11.7289 6.91902 12.4271 7.03879C13.1254 7.15857 13.7588 7.52161 14.215 8.06361C14.6713 8.60561 14.921 9.2916 14.92 10.0001C14.92 12.0001 11.92 13.0001 11.92 13.0001M12 17H12.01M7.9 20C9.80858 20.9791 12.0041 21.2443 14.0909 20.7478C16.1777 20.2514 18.0186 19.0259 19.2818 17.2922C20.545 15.5586 21.1474 13.4308 20.9806 11.2922C20.8137 9.15366 19.8886 7.14502 18.3718 5.62824C16.855 4.11146 14.8464 3.1863 12.7078 3.01946C10.5693 2.85263 8.44147 3.45509 6.70782 4.71829C4.97417 5.98149 3.74869 7.82236 3.25222 9.90916C2.75575 11.996 3.02094 14.1915 4 16.1L2 22L7.9 20Z"
                          stroke="#CECFDA"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="text-[#BBBBBB] font-['Mona-Sans-M'] text-[14px] pl-[8px]">
                        Onboarding Guide
                      </p>
                    </div>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <div
                      onClick={LogOut}
                      className={classNames(
                        active
                          ? "flex items-center px-[12px] py-[8px] cursor-pointer bg-[#0014CD] rounded-[8px]"
                          : "flex hover:bg-[#FF0000] rounded-[8px] items-center px-[12px] py-[8px] cursor-pointer"
                      )}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M13 4H16C16.5304 4 17.0391 4.21071 17.4142 4.58579C17.7893 4.96086 18 5.46957 18 6V20M2 20H5M5 20L11.758 21.689C11.9054 21.7257 12.0592 21.7284 12.2078 21.6968C12.3564 21.6653 12.4958 21.6003 12.6155 21.5068C12.7352 21.4133 12.8321 21.2938 12.8987 21.1573C12.9653 21.0207 13 20.8708 13 20.719V4.56195C12.9998 4.25813 12.9304 3.95735 12.797 3.68437C12.6637 3.41138 12.4699 3.17237 12.2303 2.98547C11.9908 2.79857 11.7118 2.66869 11.4146 2.60571C11.1174 2.54272 10.8098 2.54828 10.515 2.62195L6.515 3.62195C6.08232 3.73011 5.69821 3.97978 5.42371 4.33128C5.1492 4.68279 5.00007 5.11596 5 5.56195V20ZM13 20H22M10 12V12.01"
                          stroke="white"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <button className="text-[#fff] font-['Mona-Sans-M'] text-[14px] pl-[8px]">
                        Logout
                      </button>
                    </div>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>

      {contact_us && (
        <ContactModal openModal={contact_us} setModal={setContactUs} />
      )}

      {user_settings && (
        <UserSettingsModal
          openModal={user_settings}
          setModal={setUserSettings}
        />
      )}
    </Fragment>
  );
};

export default Header;
