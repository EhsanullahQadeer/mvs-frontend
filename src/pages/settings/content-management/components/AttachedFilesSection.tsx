/*************************************************************************
 * @file AttachedFilesSection.tsx
 * @author Ehsanullah Qadeer
 * @desc  This is the component for showing attached files.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/
/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import AttachedFilesTable from "./AttachedFilesTable";
import { deleteSampleAPI, getUserSamplesAPI } from "api/sounds";
import AlertDialog from "components/util/AlertDialog";
import { ICurrentUser, ISample,ISampleSearchConstraints, IGetUserSamplesResponse } from "./types";
import UpdateSamplePopup from "./UpdateSamplePopup";

type Props = {
  setLoading: (value: boolean) => void;
  currentUserInfo: ICurrentUser;
  isNewUser?: boolean;
};

const tableTabs = [
  { label: "View all", value: "all", func: () => {} },
  { label: "Your files", value: "owner", func: () => {} },
  { label: "Shared files", value: "collaborator", func: () => {} },
];

const defaultSampleSearchConstraints: ISampleSearchConstraints = {
  skip: 0,
  take: 10,
};

const AttachedFilesSection = (props: Props) => {
  const { setLoading, currentUserInfo, isNewUser } = props;
  const [selectedTab, setSelectedTab] = useState("all");
  const [sampleSearchConstraints, setSampleSearchConstraints] = useState(defaultSampleSearchConstraints);
  const [getUserSamplesResponse, setGetUserSamplesResponse] = useState<IGetUserSamplesResponse>();

  const handleTabClick = (value: string, clickFunc: () => void) => {
    setSelectedTab(value);
    clickFunc();
  };

  useEffect(() => {
    if (!isNewUser) {
      getSamplesData();
    }
  }, [selectedTab,sampleSearchConstraints]);

  const getSamplesData = async () => {
    setLoading(true);
    try {
      const response = await getUserSamplesAPI({
        user_id: currentUserInfo.id,
        skip: sampleSearchConstraints.skip,
        take: sampleSearchConstraints.take,
        filter: selectedTab,
      });
      console.log("response here!!!", response);
      const samples:IGetUserSamplesResponse = response.data.results;
      setGetUserSamplesResponse(samples);
    } catch (error) {
      console.log("error while fetching samples data: ", error);
    } finally {
      setLoading(false);
    }
  };

  const [sampleToEdit, setSampleToEdit] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditPopup, setOpenEditPopup] = useState(false);

  const handleOpenDialog = (action: string, sample: ISample) => {
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
          getSamplesData();
          handleCloseDialog();
        }
      } catch (error) {
        console.log("error while delete the sample file: ", error);
      }
    }
  };

  return (
    <div>
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

      <UpdateSamplePopup
        {...{
          open: openEditPopup,
          handleClose: handleCloseDialog,
          sampleToEdit,
          currentUserInfo,
        }}
      />

      <div className="py-3 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-platinum">Attached files</h3>
        <p className="text-sm font-normal text-coolGray">
          Files Associated with This Profile
        </p>
      </div>

      <div className="my-2 p-4 bg-darkGray rounded-lg flex items-center">
        {tableTabs.map((tab, idx) => {
          const { label, value, func } = tab;
          return (
            <button
              key={label + idx}
              onClick={() => handleTabClick(value, func)}
              className={`py-3 px-4 text-xs font-semibold flex items-center justify-center border border-eclipseGray ${
                selectedTab === value
                  ? "text-silver bg-eerieBlack"
                  : "text-charcoalGray bg-jetBlack"
              } ${idx === 0 && "rounded-l-lg border-r-0"} ${
                idx === 2 && "rounded-r-lg border-l-0"
              } transition duration-300`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {getUserSamplesResponse &&(
      <div>
        <AttachedFilesTable
          {...{
            getUserSamplesResponse,
            handleOpenDialog,
            sampleSearchConstraints,
            setSampleSearchConstraints
          }}
        />
      </div>)}
    </div>
  );
};

export default AttachedFilesSection;
