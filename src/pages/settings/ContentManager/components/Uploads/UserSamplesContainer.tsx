import { useEffect, useState } from "react";
import { deleteSampleAPI, getUserSamplesAPI } from "api/sounds";
import AlertDialog from "components/util/AlertDialog";
import {
  ISample,
  ISampleSearchConstraints,
  IGetUserSamplesResponse,
} from "../types";
import { RootState } from "redux/reducers";
import { useSelector } from "react-redux";
import UserSamplesTable from "./UserSamplesTable";
import { useToast } from "shared/toasts/ToastProvider";
import UpdateSamplePopup from "../Uploader/UpdateSamplePopup";

type Props = {
  setLoading: (value: boolean) => void;
  isNewUser?: boolean;
  updateData?: number;
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

const UserSamplesContainer = (props: Props) => {
  const user = useSelector((state: RootState) => state.auth?.user);
  const { setLoading, isNewUser, updateData } = props;
  const [selectedTab, setSelectedTab] = useState("all");
  const [sampleToEdit, setSampleToEdit] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openSampleEditPopup, setOpenSampleEditPopup] = useState(false);

  const [sampleSearchConstraints, setSampleSearchConstraints] = useState(
    defaultSampleSearchConstraints
  );

  const [getUserSamplesResponse, setGetUserSamplesResponse] =
    useState<IGetUserSamplesResponse>();
  const { addToast } = useToast();

  const handleTabClick = (value: string, clickFunc: () => void) => {
    setSelectedTab(value);
    clickFunc();
  };

  useEffect(() => {
    if (!isNewUser) {
      getSamplesData();
    }
  }, [selectedTab, sampleSearchConstraints]);
  
  useEffect(() => {
    getSamplesData();
  }, [updateData]);

  const getSamplesData = async () => {
    setLoading(true);
    try {
      const response = await getUserSamplesAPI({
        user_id: user.id,
        skip: sampleSearchConstraints.skip,
        take: sampleSearchConstraints.take,
        filter: selectedTab,
      });
      const samples: IGetUserSamplesResponse = response.data.results;
      setGetUserSamplesResponse(samples);
    } catch (error) {
      console.log("error while fetching samples data: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (action: string, sample: ISample) => {
    if (action === "delete") {
      setOpenDeleteDialog(true);
    } else {
      setOpenSampleEditPopup(true);
    }
    setSampleToEdit(sample);
  };

  const handleCloseDialog = () => {
    setOpenDeleteDialog(false);
    setOpenSampleEditPopup(false);
    setSampleToEdit(null);
  };

  const handleDeleteComposer = async () => {
    if (sampleToEdit) {
      try {
        const response = await deleteSampleAPI(sampleToEdit.id);
        if (response.status === 200) {
          getSamplesData();
          handleCloseDialog();
          addToast({ state: 'fileDeleted' })
        }
      } catch (error) {
        console.log("error while delete the sample file: ", error);
        addToast({ state: 'failedToDeleteFile', actionFunction: () => handleDeleteComposer() })
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
      {openSampleEditPopup && (
        <UpdateSamplePopup
          {...{
            handleClose: handleCloseDialog,
            sampleToEdit,
            user,
            }}
        />
      )}

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

      {getUserSamplesResponse && (
        <div>
          <UserSamplesTable
            {...{
              getUserSamplesResponse,
              handleOpenDialog,
              sampleSearchConstraints,
              setSampleSearchConstraints,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default UserSamplesContainer;
