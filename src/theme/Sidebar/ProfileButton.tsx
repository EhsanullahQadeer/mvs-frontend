/*************************************************************************
 * @file ProfileButton.tsx
 * @author Karla Zamora
 * @desc Profile button with dropdown menu for the sidebar.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* IMPORTS */
import { Fragment, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";

/* LOCAL IMPORTS */
import ContactModal from "components/modals/contact-us";
import { useHeaderHooks } from "../Header/Header.hooks";
import UserSettingsModal from "components/modals/user-settings";
import FeedbackContactModal from "components/modals/feedback-contact";
import { ReactComponent as CaratIcon } from "../../assets/icons/caratIcon.svg";
import Thumbnail from "components/ui/Header/atoms/notificationAtoms/thumbnailAvatar";

const ProfileButton = () => {
  /* States and Hooks */
  const {
    state,
    contact_us,
    setContactUs,
    user_settings,
    setUserSettings,
    LogOut,
    feedback_modal,
    setFeedbackModal,
  } = useHeaderHooks();

  const navigate = useNavigate();
  const buttonRef = useRef<HTMLDivElement>(null);

  return (
    <Fragment>
      <div className="flex items-center justify-center relative z-100" ref={buttonRef}>
        <Menu as="div" className="user">
          <Menu.Button>
            <div className="border-2 border-[#1c1c1c] py-2 px-4 ml-2 mr-6 rounded-3xl flex items-center h-16 hover:border-[#3b3b3b] cursor-pointer">
              <Thumbnail professionalName={state?.auth?.user?.professional_name} thumbnail={state?.auth?.user?.thumbnail} size="38" userId={Number(state?.auth?.user?.id)} />
              {state?.auth?.user?.professional_name && (
                <span className="text-white text-[12px] font-[600] pr-9 pl-2">{state?.auth?.user?.professional_name}</span>
              )}
              {/* Caret Icon */}
              <CaratIcon/>
            </div>
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
            <Menu.Items className="zindex fixed mt-2 w-[230px] bg-[#1C1C1C] border border-[#3D3D3D] rounded-[8px] p-[10px]">
              {/* Menu Items */}

              {/* My Profile */}
              <Menu.Item>
                {({ active }) => (
                  <div
                  onClick={() => {
                    navigate(`/profile/${state?.auth?.user?.username}`);
                  }}
                  className={`flex items-center px-[12px] py-[8px] rounded-[8px] cursor-pointer ${active ? "bg-[#242424] text-white" : "text-[#b2b2b2]"}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={`${active ? "1.5" : "1"}`} stroke={`${active ? "#FFF" : "#B2B2B2"}`} className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                    <p className=" font-['Mona-Sans-M'] text-[14px] pl-[8px]">
                      My Profile
                    </p>
                  </div>
                )}
              </Menu.Item>

              {/* Account Settings */}
              <Menu.Item>
                {({ active }) => (
                  <div
                  onClick={() => navigate("/settings/account")}
                  className={`flex items-center px-[12px] py-[8px] rounded-[8px] cursor-pointer ${active ? "bg-[#242424] text-white" : "text-[#b2b2b2]"}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke={`${active ? "#FFF" : "#B2B2B2"}`}
                        strokeWidth={`${active ? "1.5" : "1"}`} className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>

                    <p className=" font-['Mona-Sans-M'] text-[14px] pl-[8px]">
                      Account Settings
                    </p>
                  </div>
                )}
              </Menu.Item>

              {/* Privacy Settings - Removed for Production */}
              {/* <Menu.Item>
                {({ active }) => (
                  <div
                  onClick={() => navigate("/settings/privacy")}
                  className={`flex items-center px-[12px] py-[8px] rounded-[8px] cursor-pointer ${active ? "bg-[#242424] text-white" : "text-[#b2b2b2]"}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke={`${active ? "#FFF" : "#B2B2B2"}`}
                        strokeWidth={`${active ? "1.5" : "1"}`}  className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                    </svg>


                    <p className=" font-['Mona-Sans-M'] text-[14px] pl-[8px]">
                      Privacy Settings
                    </p>
                  </div>
                )}
              </Menu.Item> */}

              {/* Payment & Billing */}
              <Menu.Item>
                {({ active }) => (
                  <div
                  onClick={() => navigate("/settings/billing")}
                  className={`flex items-center px-[12px] py-[8px] rounded-[8px] cursor-pointer ${active ? "bg-[#242424] text-white" : "text-[#b2b2b2]"}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke={`${active ? "#FFF" : "#B2B2B2"}`}
                        strokeWidth={`${active ? "1.5" : "1"}`} className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                    </svg>
                    <p className=" font-['Mona-Sans-M'] text-[14px] pl-[8px]">
                      Payment & Billing
                    </p>
                  </div>
                )}
              </Menu.Item>

              {/* Support */}
              {/* <Menu.Item>
                {({ active }) => (
                  <div
                  onClick={() => setContactUs(true)}
                  className={`flex items-center px-[12px] py-[8px] rounded-[8px] cursor-pointer ${active ? "bg-[#242424] text-white" : "text-[#b2b2b2]"}`}
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
                        stroke={`${active ? "#FFF" : "#B2B2B2"}`}
                        strokeWidth={`${active ? "1.5" : "1"}`}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className=" font-['Mona-Sans-M'] text-[14px] pl-[8px]">
                      Support
                    </p>
                  </div>
                )}
              </Menu.Item> */}

              {/* Feedback */}
              <Menu.Item>
                {({ active }) => (
                  <div
                  onClick={() => setFeedbackModal(true)}
                  className={`flex items-center px-[12px] py-[8px] rounded-[8px] cursor-pointer ${active ? "bg-[#242424] text-white" : "text-[#b2b2b2]"}`}
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
                        stroke={`${active ? "#FFF" : "#B2B2B2"}`}
                        strokeWidth={`${active ? "1.5" : "1"}`}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className=" font-['Mona-Sans-M'] text-[14px] pl-[8px]">
                      Feedback & Support
                    </p>
                  </div>
                )}
              </Menu.Item>

              {/* Terms of Service */}
              <Menu.Item>
                {({ active }) => (
                  <div
                  onClick={() => navigate("/terms-of-service")}
                  className={`flex items-center px-[12px] py-[8px] rounded-[8px] cursor-pointer ${active ? "bg-[#242424] text-white" : "text-[#b2b2b2]"}`}
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
                        stroke={`${active ? "#FFF" : "#B2B2B2"}`}
                        strokeWidth={`${active ? "1.5" : "1"}`}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <p className=" font-['Mona-Sans-M'] text-[14px] pl-[8px]">
                      Terms of Service
                    </p>
                  </div>
                )}
              </Menu.Item>

              <hr className="border-t border-[#242424]" />

              {/* Logout*/}
              <Menu.Item>
                {({ active }) => (
                  <div
                  onClick={LogOut}
                  className={`flex items-center px-[12px] py-[8px] rounded-[8px] cursor-pointer ${active ? "bg-[#242424] text-white" : "text-[#b2b2b2]"}`}
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
                        stroke={`${active ? "#FFF" : "#B2B2B2"}`}
                        strokeWidth={`${active ? "1.5" : "1"}`}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <p className=" font-['Mona-Sans-M'] text-[14px] pl-[8px]">
                      Logout
                    </p>
                  </div>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
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

      {feedback_modal && (
        <FeedbackContactModal openModal={feedback_modal} setModal={setFeedbackModal} />
      )}
    </Fragment>
  );
};

export default ProfileButton;