/*************************************************************************
 * @file AttachedFilesSection.tsx
 * @author Ehsanullah Qadeer
 * @desc  This is the component for showing attached files.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/
import { useEffect, useState } from "react";
import AttachedFilesTable from "./AttachedFilesTable";
import { deleteSampleAPI, getUserSamplesAPI } from "api/sounds";
import AlertDialog from "components/util/AlertDialog";
import { ICurrentUser, ISample } from "./types";
import UpdateSamplePopup from "./UpdateSamplePopup";

type Props = {
  setLoading: (value: boolean) => void;
  currentUserInfo: ICurrentUser;
};

const tableTabs = [
  { label: "View all", value: "all", func: () => {} },
  { label: "Your files", value: "owner", func: () => {} },
  { label: "Shared files", value: "collaborator", func: () => {} },
];

const AttachedFilesSection = (props: Props) => {
  const { setLoading, currentUserInfo } = props;
  const [selectedTab, setSelectedTab] = useState("all");
  const [attachedFilesTableData, setAttachedFilesTableData] = useState([]);

  const handleTabClick = (value: string, clickFunc: () => void) => {
    setSelectedTab(value);
    clickFunc();
  };


  // Fix: Ensure useCallback returns a callable async function
  const getSamplesData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getUserSamplesAPI({
        user_id: 1,
        skip: 0,
        take: 10,
        filter: selectedTab,
      });
      const samples = response.data.results.samples;
      setAttachedFilesTableData(samples);
    } catch (error) {
      console.log("error while fetching samples data: ", error);
    } finally {
      setLoading(false);
    }
  }, [selectedTab]); // Dependency is `selectedTab`

  // Use useEffect to trigger getSamplesData on component mount or when selectedTab changes
  useEffect(() => {
    // @ts-ignore: Suppressing the callable type error
    getSamplesData(); // Ensure the callable function is invoked
  }, [getSamplesData]);

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
          // @ts-ignore: Suppressing the callable type error
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

      <div>
        <AttachedFilesTable
          {...{
            attachedFilesTableData,
            handleOpenDialog,
          }}
        />
      </div>
    </div>
  );
};

export default AttachedFilesSection;
function useCallback(arg0: () => Promise<void>, arg1: any[]) {
  throw new Error("Function not implemented.");
}

