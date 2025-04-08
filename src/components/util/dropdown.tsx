/*************************************************************************
 * @file dropdown.tsx
 * @author Zohaib Ahmed
 * @desc Provides dropdown functionality for interacting with samples.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* IMPORTS */
import { useLocation } from "react-router-dom";
import React, { useState } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { ToastContainer } from "react-toastify";

/* LOCAL IMPORTS */
import RequestSplitSheetModal from "components/modals/request-split-sheet";
import SampleInfoModal from "components/modals/sample-info";
import { FiDownload, FiEdit3 } from "react-icons/fi";
import { GoShareAndroid } from "react-icons/go";
import { RiDeleteBinLine } from "react-icons/ri";
import AlertDialog from "./AlertDialog";
import UpdateSamplePopup from "pages/settings/content-management/components/UpdateSamplePopup";
import { RootState } from "redux/reducers";
import { useSelector } from "react-redux";
import ShareSetting from "./ShareSetting";
import { deleteSampleAPI } from "api/sounds";
import { saveSampleDownloadAPI } from "api/sounds";
import ShareModal from "pages/profile/components/ShareModal";
import { useToast } from "shared/toasts/ToastProvider";

const DropDown = (props: any) => {
  const { addToast } = useToast();

  const { sample, play, fetchAllUserSamples, is_owner } = props;
  const [isSharing, setIsSharing] = useState(false);

  const [request_split_sheet, setRequestSplitSheet] = useState(false);
  const [sample_info, setSampleInfo] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const shouldOpenDropdown = queryParams.get("view") === "secondStep";

  const [isOpenShareDialog, setIsOpenShareDialog] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const [sampleToEdit, setSampleToEdit] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditPopup, setOpenEditPopup] = useState(false);

  const handleOpenDialog = (action, sample) => {
    if (action === "delete") {
      setOpenDeleteDialog(true);
    } else {
      setOpenEditPopup(true);
    }
    setSampleToEdit(sample);
  };

  const handleCloseDialog = () => {
    setOpenDeleteDialog(false);
    setOpenEditPopup(false);
    setSampleToEdit(null);
  };

  const handleDeleteComposer = async () => {
    if (sampleToEdit) {
      try {
        const response = await deleteSampleAPI(sampleToEdit.id);
        if (response.status === 200) {
          fetchAllUserSamples();
        }
      } catch (error) {
        console.log("error while delete the sample file: ", error);
      } finally {
        handleCloseDialog();
      }
    }
  };

  const handleCloseShareDialog = () => {
    setIsOpenShareDialog(false);
  };

  const handleDownload = async (e: React.MouseEvent, sample: any) => {
    e.preventDefault();
    try {
      const response = await saveSampleDownloadAPI(sample.id);
    } catch (error) {
      addToast({state: "failedToDownloadSample", actionFunction: () => handleDownload(e, sample)});
    } finally {
      addToast({state: "downloadComplete", actionFunction: () => {
        window.open(sample.s3_key, '_blank');
      }});
    }
  };

  return (
    <React.Fragment>
      {is_owner && (
        <AlertDialog
          {...{
            open: openDeleteDialog,
            handleClose: handleCloseDialog,
            title: "Are you sure you want to delete the sample file?",
            desciption: "Please confirm if you want to proceed!",
            button1: "Cancel",
            button2: "Delete sample",
            onConfirm: handleDeleteComposer,
          }}
        />
      )}

      {is_owner && (
        <UpdateSamplePopup
          {...{
            open: openEditPopup,
            handleClose: handleCloseDialog,
            sampleToEdit,
            currentUserInfo: user,
          }}
        />
      )}

      {is_owner && (
        <ShareSetting
          {...{
            isOpen: isOpenShareDialog,
            onClose: handleCloseShareDialog,
            sample,
          }}
        />
      )}

      <div className="bg-transparent">
        <Menu
          as="div"
          className={`relative bg-transparent ${
            play ? "text-white" : "text-slateGray-2"
          }`}
        >
          <div>
            <Menu.Button>
              <EllipsisVerticalIcon
                className="onboard-9 -mr-5 text-[14px] mt-[4px]"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            show={(shouldOpenDropdown && props.index === 0) || undefined}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="onboard-9 zindex absolute border border-[#3a3a3a] rounded-[8px] top-[0px] right-[20px] w-[235px] bg-[#262626] h-auto p-[10px]">
              <div className="">
                {is_owner && (
                  <Menu.Item>
                    <div
                      onClick={() => handleOpenDialog("edit", sample)}
                      className="onboard-10 flex items-center hover:bg-eclipseGray cursor-pointer py-[8px] px-[12px]"
                  >
                    <FiEdit3 className="text-[18px]" />
                    <p className=" ml-[8px] font-['Mona-Sans-M'] text-[#a3a3a4]">
                      Edit
                    </p>
                    </div>
                  </Menu.Item>
                )}
                <Menu.Item>
                  <div 
                    onClick={(e) => handleDownload(e, sample)} 
                    className="onboard-11 flex items-center hover:bg-eclipseGray cursor-pointer py-[8px] px-[12px]"
                  >
                    <FiDownload className="text-[18px]" />
                    <button className="ml-[8px] font-['Mona-Sans-M'] text-[#a3a3a4]">
                      Download
                    </button>
                  </div>
                </Menu.Item>
              </div>
              <div className="">

                {is_owner && (
                  <Menu.Item>
                    <div
                      className="onboard-12 flex items-center  hover:bg-eclipseGray cursor-pointer py-[8px] px-[12px]"
                      onClick={() => {
                        setIsOpenShareDialog(true);
                      }}
                    >
                      <GoShareAndroid className="text-[18px]" />
                      <p className="ml-[8px] font-['Mona-Sans-M'] text-[#a3a3a4]">
                        Share Settings
                      </p>
                    </div>
                  </Menu.Item>
                )}
                    <Menu.Item>
  <div
    className="onboard-12 md:hidden flex items-center hover:bg-eclipseGray cursor-pointer py-[8px] px-[12px]"
    onClick={() => setIsSharing(true)}  // ✅ This opens ShareModal
  >
    <GoShareAndroid className="text-[18px]" />
    <p className="ml-[8px]  font-['Mona-Sans-M'] text-[#a3a3a4]">
      Share Sample
    </p>
  </div>
</Menu.Item>

                {is_owner && (
                  <Menu.Item>
                    <div
                      // onClick={() => setRequestSplitSheet(true)}
                    className="onboard-13 flex items-center cursor-pointer  hover:bg-eclipseGray rounded-[4px] py-[8px] px-[12px]"
                  >
                    <GoShareAndroid className="text-[18px]" />
                    <button className=" ml-[8px] font-['Mona-Sans-M'] text-[#a3a3a4]">
                      Sample Analytics
                    </button>
                    </div>
                  </Menu.Item>
                )}
                
                {is_owner && (
                  <Menu.Item>
                    <div
                      onClick={() => handleOpenDialog("delete", sample)}
                      className="onboard-13 flex items-center cursor-pointer hover:bg-eclipseGray rounded-[4px] py-[8px] px-[12px]"
                  >
                    <RiDeleteBinLine className="text-[18px]" />
                    <button className="ml-[8px] font-['Mona-Sans-M'] text-[#a3a3a4]">
                      Delete Track
                    </button>
                    </div>
                  </Menu.Item>
                )}
              </div>
              <div className="">
                {/* <Menu.Item>
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
                </Menu.Item> */}
                {/* <Menu.Item>
                  <div>
                    <p className="text-[14px] px-[12px] py-[8px] font-['Mona-Sans-M'] text-[#575757]">
                      Add to collection
                    </p>
                  </div>
                </Menu.Item> */}
                {/* <Menu.Item>
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
                </Menu.Item> */}
              </div>
              <div className="">
                {/* <Menu.Item>
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
                </Menu.Item> */}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <ShareModal open={isSharing} onClose={() => setIsSharing(false)} />

      {request_split_sheet && (
        <RequestSplitSheetModal
          sample={props.sample}
          openModal={request_split_sheet}
          setModal={setRequestSplitSheet}
          getSamples={props.getSamples}
        />
      )}
      {sample_info && (
        <SampleInfoModal
          sample={props.sample}
          openModal={sample_info}
          setModal={setSampleInfo}
        />
      )}

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="dark"
        icon={false}
        toastStyle={{ backgroundColor: "#3f3d3d" }}
      />
    </React.Fragment>
  );
};

export default DropDown;
