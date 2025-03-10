import { useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { useConversation } from "../context";
import { IoIosArrowBack } from "react-icons/io";
import InboxDropdownMenu from "../../ActionMenu";
import { useMessenger } from "api/messenger/context";
import AlertDialog from "components/util/AlertDialog";
import { IoChevronForwardOutline } from "react-icons/io5";
import { ReactComponent as HamburgerIcon } from "../../../../../assets/icons/menuIcon.svg";
import { ReactComponent as DeleteIcon } from "../../../../../assets/icons/deleteIcon.svg";
import { ReactComponent as ArchiveIcon } from "../../../../../assets/icons/archieveIcon.svg";
import { ReactComponent as AlertOctagonIcon } from "../../../../../assets/icons/alertOctagon.svg";
import { ReactComponent as FolderInputIcon } from "../../../../../assets/icons/folderInputIcon.svg";

const InboxHeader = () => {
  const {
    currentPage,
    setCurrentPage,
    setShowArchivedConvos,
    setShowFavoriteConvos,
    setActiveConversation,
    CONVERSATIONS_PER_PAGE,
    setGetArchived,
    selectedMenuItem,
    setSelectedMenuItem,
    loadFavoritedConversations,
    handleDeleteConversations,
    loadConversations
  } = useConversation();

  const {
    conversations,
    totalConversations,
    totalSearchMessages,
    toggleConversationIsArchived,
    toggleConversationsIsSpam,
    toggleConversationsIsPriority,
    getTotalConversationUnread,
  } = useMessenger();

  function refreshConversations(){
    loadConversations();
    getTotalConversationUnread({
      types: ["priority", "general", "icebreaker"]
    });
  }

  const options = [
    { 
      id: "archive", 
      icon: <ArchiveIcon />,
      onClick: () => {
        toggleConversationIsArchived({ conversationIds: selectedConversations.map(conv => conv.id) }).then(()=>refreshConversations())
      }
    },
    {
      id: "spam",
      icon: <AlertOctagonIcon />,
      onClick: () => {
        toggleConversationsIsSpam({ conversationIds: selectedConversations.map(conv => conv.id) }).then(()=>refreshConversations())
      }
    },
    {
      id: "delete",
      icon: <DeleteIcon />,
      onClick: () => {
        setOpenDeleteDialog(true);
      }
    },
    // { 
    // id: "read", 
    // icon: <MailOpenIcon />, 
    // func: handleMarkConvoRead 
    // },
    {
      id: "folder",
      icon: <FolderInputIcon />,
      onClick: () => {
        toggleConversationsIsPriority({ conversationIds: selectedConversations.map(conv => conv.id) }).then(()=>refreshConversations())
      }
    },
  ];

  const { 
    inboxTab,
    setInboxTab,
    selectedConversations,
    setSelectedConversations
  } = useConversation();

  const [menuSection, setMenuSection] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      setSelectedConversations(conversations);
    } else {
      setSelectedConversations([]);
    }
  };

  const handleCloseDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(inboxTab === 'search'? totalSearchMessages/CONVERSATIONS_PER_PAGE : totalConversations / CONVERSATIONS_PER_PAGE);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const dropdownMenuOptions = [
    {
      label: "Favorited",
      icon: <FaRegStar />,
      func: () => {
        setShowArchivedConvos(false);
        setShowFavoriteConvos(true);
        setSelectedMenuItem("Favorited");
        loadFavoritedConversations();
      },
    },
    {
      label: "Archived",
      icon: <ArchiveIcon />,
      func: () => {
        setShowFavoriteConvos(false);
        setGetArchived(true);
        setSelectedMenuItem("Archived");
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
          button1: "Cancel",
          button2: "Delete",
          onConfirm: () => {
            handleDeleteConversations();
            setOpenDeleteDialog(false);
          },
        }}
      />

      <div className="flex flex-wrap justify-between items-center py-2 w-full">
        <div className="flex flex-1 gap-2 items-center">
          <div className="flex justify-center items-center gap-1 h-8 w-[52px]">
            <div className="flex w-4 h-4">
              <input
                type="checkbox"
                className="rounded border-solid border-[1.5px] border-zinc-500 min-h-[16px] bg-transparent cursor-pointer"
                checked={selectAll}
                onChange={(e) => handleSelectAll(e.target.checked)}
              />
            </div>
          </div>
          {options.map(({ id, icon, onClick }) => (
            <div
              key={id}
              onClick={onClick}
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
            <HamburgerIcon />

            {menuSection && (
              <InboxDropdownMenu
                {...{ 
                  dropdownMenuOptions, 
                  setMenuSection,
                  isConvoListMenu: true,
                  selectedMenuItem: selectedMenuItem,
                  onItemClick: (item) => {
                    item.func();
                    setSelectedMenuItem(item.label);
                  }
                }}
              />
            )}
          </div>
        </div>
        <div className="flex gap-3 items-center self-stretch my-auto">
          <div className="gap-2.5 self-stretch p-2.5 my-auto text-sm leading-none text-neutral-400">
            {(currentPage - 1) * CONVERSATIONS_PER_PAGE + 1}-
            {Math.min(currentPage * CONVERSATIONS_PER_PAGE,inboxTab === 'search'?totalSearchMessages : totalConversations)} of { inboxTab === 'search'? totalSearchMessages: totalConversations}
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
                  currentPage < Math.ceil(inboxTab === 'search' ? totalSearchMessages / CONVERSATIONS_PER_PAGE : totalConversations / CONVERSATIONS_PER_PAGE)
                    ? "cursor-pointer opacity-100"
                    : "opacity-50"
                }`}
              onClick={
                currentPage < Math.ceil(inboxTab === 'search' ? totalSearchMessages / CONVERSATIONS_PER_PAGE : totalConversations / CONVERSATIONS_PER_PAGE)
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

export default InboxHeader;
