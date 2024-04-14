/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import { useNavigate } from "react-router-dom";
import Theme from "components/theme";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
interface RootState {
  auth: any;
  sounds: any;
}

const DropDown = (props: any) => {
  const navigate = useNavigate();
  const state = useSelector((state: RootState) => state);

  return (
    <React.Fragment>
      <div className="bg-[#141414]">
        <Menu as="div" className="relative ml-[15px] bg-black text-white">
          <div>
            <Menu.Button>
              <EllipsisVerticalIcon
                className="-mr-1 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute border border-[#545454] rounded-[8px] top-[0px] right-[20px] w-[230px] bg-[#111] h-[341px] p-[10px]">
              <div className="">
                <Menu.Item>
                  <div className="flex items-center hover:bg-[#0014CD] cursor-pointer py-[8px] px-[12px]">
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
                    <p className="text-[14px] ml-[8px] font-['Mona-Sans-M'] text-[#CECFDA]">
                      Add to Like
                    </p>
                  </div>
                </Menu.Item>
                <Menu.Item>
                  <div className="flex items-center hover:bg-[#0014CD] cursor-pointer py-[8px] px-[12px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                        stroke="#CECFDA"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="text-[14px] ml-[8px] font-['Mona-Sans-M'] text-[#CECFDA]">
                      Sample Info
                    </p>
                  </div>
                </Menu.Item>
              </div>
              <div className="">
                <Menu.Item>
                  <div className="flex items-center hover:bg-[#0014CD] cursor-pointer py-[8px] px-[12px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M14 2V6C14 6.53043 14.2107 7.03914 14.5858 7.41421C14.9609 7.78929 15.4696 8 16 8H20M8 13H10M14 13H16M8 17H10M14 17H16M15 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V7L15 2Z"
                        stroke="#DDDDDD"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="text-[14px] ml-[8px] font-['Mona-Sans-M'] text-[#CECFDA]">
                      Download MIDI
                    </p>
                  </div>
                </Menu.Item>
                <Menu.Item>
                  <div className="flex items-center cursor-pointer hover:bg-[#0014CD] rounded-[4px] py-[8px] px-[12px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M4 22H20C20.5304 22 21.0391 21.7893 21.4142 21.4142C21.7893 21.0391 22 20.5304 22 20V4C22 3.46957 21.7893 2.96086 21.4142 2.58579C21.0391 2.21071 20.5304 2 20 2H8C7.46957 2 6.96086 2.21071 6.58579 2.58579C6.21071 2.96086 6 3.46957 6 4V20C6 20.5304 5.78929 21.0391 5.41421 21.4142C5.03914 21.7893 4.53043 22 4 22ZM4 22C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V11C2 9.9 2.9 9 4 9H6M18 14H10M15 18H10M10 6H18V10H10V6Z"
                        stroke="#DDDDDD"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="text-[14px] ml-[8px] underline font-['Mona-Sans-M'] text-[#CECFDA]">
                      Request Split Sheet
                    </p>
                  </div>
                </Menu.Item>
              </div>
              <div className="">
                <Menu.Item>
                  <div className="flex hover:bg-[#0014CD] cursor-pointer border-x-0 border-t-0 border-b border-[#4E4E4E80] pt-[10px] pb-[15px] px-[12px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M15 17L20 12M20 12L15 7M20 12H8C6.93913 12 5.92172 12.4214 5.17157 13.1716C4.42143 13.9217 4 14.9391 4 16V18"
                        stroke="#CECFDA"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="text-[14px] ml-[8px] font-['Mona-Sans-M'] text-[#CECFDA]">
                      Forward Sample
                    </p>
                  </div>
                </Menu.Item>
                <Menu.Item>
                  <div>
                    <p className="text-[14px] px-[12px] py-[8px] font-['Mona-Sans-M'] text-[#575757]">
                      Add to collection
                    </p>
                  </div>
                </Menu.Item>
                <Menu.Item>
                  <div className="flex hover:bg-[#0014CD] cursor-pointer py-[8px] px-[12px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={20}
                      height={20}
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path d="M17.5 12.5V5V12.5Z" fill="#CECFDA" />
                      <path
                        d="M15.4167 15C15.9692 15 16.4991 14.7805 16.8898 14.3898C17.2805 13.9991 17.5 13.4692 17.5 12.9167C17.5 12.3641 17.2805 11.8342 16.8898 11.4435C16.4991 11.0528 15.9692 10.8333 15.4167 10.8333C14.8641 10.8333 14.3342 11.0528 13.9435 11.4435C13.5528 11.8342 13.3333 12.3641 13.3333 12.9167C13.3333 13.4692 13.5528 13.9991 13.9435 14.3898C14.3342 14.7805 14.8641 15 15.4167 15Z"
                        fill="#CECFDA"
                      />
                      <path d="M10 10H2.5H10Z" fill="#CECFDA" />
                      <path d="M13.3333 5H2.5H13.3333Z" fill="#CECFDA" />
                      <path d="M10 15H2.5H10Z" fill="#CECFDA" />
                      <path
                        d="M17.5 12.5V5M10 10H2.5M13.3333 5H2.5M10 15H2.5M15.4167 15C15.9692 15 16.4991 14.7805 16.8898 14.3898C17.2805 13.9991 17.5 13.4692 17.5 12.9167C17.5 12.3641 17.2805 11.8342 16.8898 11.4435C16.4991 11.0528 15.9692 10.8333 15.4167 10.8333C14.8641 10.8333 14.3342 11.0528 13.9435 11.4435C13.5528 11.8342 13.3333 12.3641 13.3333 12.9167C13.3333 13.4692 13.5528 13.9991 13.9435 14.3898C14.3342 14.7805 14.8641 15 15.4167 15Z"
                        stroke="#CECFDA"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="text-[14px] ml-[8px] font-['Mona-Sans-M'] text-[#CECFDA]">
                      Reggaeton Guitars
                    </p>
                  </div>
                </Menu.Item>
              </div>
              <div className="">
                <Menu.Item>
                  <div className="flex hover:bg-[#0014CD] cursor-pointer py-[8px] px-[12px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M5 12H19M12 5V19"
                        stroke="#CECFDA"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="text-[14px] ml-[8px] font-['Mona-Sans-M'] text-[#CECFDA]">
                      See All.....
                    </p>
                  </div>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </React.Fragment>
  );
};

export default DropDown;
