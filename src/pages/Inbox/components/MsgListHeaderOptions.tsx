import { useState } from "react";
import { IMessage } from "./types";
import ActionMenu from "./ActionMenu";
import { toast } from "react-toastify";
import { FiInbox } from "react-icons/fi";
import { FaRegStar } from "react-icons/fa";
import { LuFileClock } from "react-icons/lu";
import { IoIosArrowBack } from "react-icons/io";
import AlertDialog from "components/util/AlertDialog";
import { IoChevronForwardOutline } from "react-icons/io5";
import { ReactComponent as MenuIcon } from "../../../assets/icons/menuIcon.svg";
import { ReactComponent as ArrowDown } from "../../../assets/icons/arrowDown.svg";
import { ReactComponent as DeleteIcon } from "../../../assets/icons/deleteIcon.svg";
import { ReactComponent as CircleAlert } from "../../../assets/icons/circleWarning.svg";
import { ReactComponent as ArchieveIcon } from "../../../assets/icons/archieveIcon.svg";
import { ReactComponent as MailOpenIcon } from "../../../assets/icons/mailOpenIcon.svg";
import { ReactComponent as AlertOctagonIcon } from "../../../assets/icons/alertOctagon.svg";
import { ReactComponent as FolderInputIcon } from "../../../assets/icons/folderInputIcon.svg";
import {
  deleteConversationsApi,
  markConvoReadApi,
  toggleSpamConvoApi,
  toggleArchiveConvoApi,
  toggleConvoPriorityApi,
} from "api/messenger";

import AlertDialog from "components/util/AlertDialog";
import { useState } from "react";
import { IMessage } from "./types";
import ActionMenu from "./ActionMenu";
import { FiInbox } from "react-icons/fi";
import { ReactComponent as CircleAlert } from "../../../assets/icons/circleWarning.svg";
import { FaRegStar } from "react-icons/fa";

interface Props {
  selectedConversations: number[];
  handleApiSuccessfull: () => void;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (value: number) => void;
  total: number;
  handleSelectAllCheckbox: (isChecked: boolean) => void;
  paginatedConversations: IMessage[];
  tab: number;
  setTab: (value: number) => void;
  setShowArchivedConvos: (value: boolean) => void;
  setShowFavoriteConvos: (value: boolean) => void;
  setActiveConversation: (conversation: any | null) => void;
}
const MsgListHeaderOptions = (props: Props) => {
  const {
    selectedConversations,
    handleApiSuccessfull,
    itemsPerPage,
    currentPage,
    setCurrentPage,
    total,
    handleSelectAllCheckbox,
    paginatedConversations,
    tab,
    setTab,
    setShowArchivedConvos,
    setShowFavoriteConvos,
    setActiveConversation,
  } = props;
  const [menuSection, setMenuSection] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(total / itemsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleDeleteConversations = async () => {
    if (selectedConversations.length) {
      try {
        const body = {
          conversationIds: selectedConversations,
        };
        const response = await deleteConversationsApi(body);
        if (response.status === 200) {
          setActiveConversation(null);
          handleCloseDialog();
          handleApiSuccessfull();
        }
      } catch (error) {
        console.log("error while delete the conversations: ", error);
      }
    }
  };

  const handleMarkConvoRead = async () => {
    if (selectedConversations.length === 1) {
      try {
        const body = {
          conversationId: selectedConversations[0],
        };
        const response = await markConvoReadApi(body);
        if (response.status === 201) {
          toast.success("Conversation is marked as read!", {
            position: "top-center",
            autoClose: 2000,
          });
          handleApiSuccessfull();
        }
      } catch (error) {
        console.log("error while marking the conversation as read: ", error);
      }
    }
  };

  const handleToggleSpamConvo = async () => {
    if (selectedConversations.length) {
      try {
        const body = {
          conversationIds: selectedConversations,
        };
        const response = await toggleSpamConvoApi(body);
        if (response.status === 201) {
          toast.success("Conversations are marked as spam!", {
            position: "top-center",
            autoClose: 2000,
          });
          handleApiSuccessfull();
        }
      } catch (error) {
        console.log("error while toggling the spam conversation: ", error);
      }
    }
  };

  const handleToggleArchiveConvo = async () => {
    if (selectedConversations.length) {
      try {
        const body = {
          conversationIds: selectedConversations,
        };
        const response = await toggleArchiveConvoApi(body);
        if (response.status === 201) {
          toast.success("Conversations are marked as archive!", {
            position: "top-center",
            autoClose: 2000,
          });
          handleApiSuccessfull();
        }
      } catch (error) {
        console.log("error while toggling the archive  conversation: ", error);
      }
    }
  };

  const handleToggleConvoPriority = async () => {
    if (selectedConversations.length) {
      try {
        const body = {
          conversationIds: selectedConversations,
        };
        const response = await toggleConvoPriorityApi(body);
        if (response.status === 201) {
          toast.success("Conversations are prioritized!", {
            position: "top-center",
            autoClose: 2000,
          });
          handleApiSuccessfull();
        }
      } catch (error) {
        console.log(
          "error while toggling the prioritized  conversation: ",
          error
        );
      }
    }
  };

  const options = [
    { id: "archive", icon: <ArchieveIcon />, func: handleToggleArchiveConvo },
    {
      id: "spam",
      icon: <AlertOctagonIcon />,
      func: handleToggleSpamConvo,
    },
    {
      id: "delete",
      icon: <DeleteIcon />,
      func: () => setOpenDeleteDialog(true),
    },
    { id: "read", icon: <MailOpenIcon />, func: handleMarkConvoRead },
    {
      id: "folder",
      icon: <FolderInputIcon />,
      func: handleToggleConvoPriority,
    },
  ];

  const isAllSelected =
    paginatedConversations.length > 0 &&
    paginatedConversations.every((convo) =>
      selectedConversations.includes(convo.id)
    );

  const menuItems = [
    {
      label: "General Inbox",
      icon: <FiInbox />,
      func: () => {
        setShowArchivedConvos(false);
        setShowFavoriteConvos(false);
        if (tab !== 1) {
          setTab(1);
        }
      },
    },
    {
      label: "Priority Inbox",
      icon: <CircleAlert />,
      func: () => {
        setShowArchivedConvos(false);
        setShowFavoriteConvos(false);
        if (tab !== 0) {
          setTab(0);
        }
      },
    },
    {
      label: "Starred",
      icon: <FaRegStar />,
      func: () => {
        setShowArchivedConvos(false);
        setCurrentPage(1);
        setShowFavoriteConvos(true);
      },
    },
    {
      label: "Archived",
      icon: <ArchieveIcon />,
      func: () => {
        setShowFavoriteConvos(false);
        setCurrentPage(1);
        setShowArchivedConvos(true);
      },
    },
  ];

  const handleMenuSection = () => {
    setMenuSection(!menuSection);
  };

  return (
    <>
      <AlertDialog
        {...{
          open: openDeleteDialog,
          handleClose: handleCloseDialog,
          title: "Are you sure you want to delete the conversations?",
          desciption: "Please confirm if you want to proceed!",
          button1: "Cancel",
          button2: "Delete",
          onConfirm: handleDeleteConversations,
        }}
      />

      <div className="flex flex-wrap justify-between items-center py-2 w-full">
        <div className="flex flex-1 gap-2 items-center">
          <div className="flex justify-center items-center gap-1 h-8 w-[52px]">
            <div className="flex w-4 h-4">
              <input
                type="checkbox"
                className="rounded border-solid border-[1.5px] border-zinc-500 min-h-[16px] bg-transparent cursor-pointer"
                checked={isAllSelected}
                onChange={(e) => handleSelectAllCheckbox(e.target.checked)}
              />
            </div>
            <div className="flex justify-center items-center h-full w-4">
              <ArrowDown className="w-4 h-4 text-slateGray-2" />
            </div>
          </div>
          {options.map(({ id, icon, func }) => (
            <div
              key={id}
              onClick={func}
              className={`flex justify-center items-center w-8 h-8 rounded cursor-pointer ${
                selectedConversations.length
                  ? id === "read" && selectedConversations.length > 1
                    ? "bg-eerieBlack text-slateGray-2 pointer-events-none"
                    : "bg-[#242424] text-white pointer-events-auto"
                  : "bg-eerieBlack text-slateGray-2 pointer-events-none"
              }`}
            >
              {icon}
            </div>
          ))}
          <div
            onClick={handleMenuSection}
            className={`flex justify-center items-center w-8 h-8 rounded cursor-pointer bg-[#242424] text-white pointer-events-auto relative`}
          >
            <MenuIcon />

            {menuSection ? (
              <ActionMenu {...{ menuItems, setMenuSection, isConvoListMenu: true }} />
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="flex gap-3 items-center self-stretch my-auto">
          <div className="gap-2.5 self-stretch p-2.5 my-auto text-sm leading-none text-neutral-400">
            {(currentPage - 1) * itemsPerPage + 1}-
            {Math.min(currentPage * itemsPerPage, total)} of {total}
          </div>
          <div className="flex gap-2 justify-center items-center self-stretch my-auto">
            <IoIosArrowBack
              className={`object-contain shrink-0 text-limeGreen self-stretch my-auto text-2xl aspect-square 
                            ${
                              currentPage > 1
                                ? "cursor-pointer opacity-100"
                                : "opacity-50"
                            }`}
              onClick={currentPage > 1 ? handlePrevPage : undefined}
            />
            <IoChevronForwardOutline
              className={`object-contain shrink-0 self-stretch text-limeGreen  my-auto text-2xl aspect-square 
                            ${
                              currentPage < Math.ceil(total / itemsPerPage)
                                ? "cursor-pointer opacity-100"
                                : "opacity-50"
                            }`}
              onClick={
                currentPage < Math.ceil(total / itemsPerPage)
                  ? handleNextPage
                  : undefined
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MsgListHeaderOptions;
