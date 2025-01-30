import { ReactComponent as AddEmoji } from "../../../assets/icons/addIcon.svg";
import comment from "../../../assets/icons/comment.svg";
import reply from "../../../assets/icons/reply.svg";
import { ReactComponent as MenuIcon } from "../../../assets/icons/menuIcon.svg";
import { useEffect, useRef, useState } from "react";
import { LuMessagesSquare } from "react-icons/lu";
import { FiEdit3 } from "react-icons/fi";
import { FiCopy } from "react-icons/fi";
import { LuDelete } from "react-icons/lu";
import { LuShieldAlert } from "react-icons/lu";
import { deleteMessageApi } from "api/messenger";

type Props = {
  handleEmojiSelect: (id: number, emoji: any) => void;
  id: number;
  isDemoSender: boolean;
  isOwner: boolean;
  onMessageDeleted?: () => void;
  setOverlayLoading?: (loading: boolean) => void;
};

const MessageReactions = (props: Props) => {
  const { handleEmojiSelect, id, isDemoSender, isOwner, onMessageDeleted, setOverlayLoading } = props;

  const emojiRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const emojisArr = [
    "👍",
    "🔥",
    "✅",
    "👌",
    "😍",
    "❤️",
    "❔",
    "😎",
    "🎶",
    "😓",
  ];
  const emojis = ["👍", "🔥", "✅"];

  const [emojisSection, setEmojisSection] = useState(false);

  const handleEmojiSection = () => {
    setEmojisSection(!emojisSection);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiRef.current &&
        !emojiRef.current.contains(event.target as Node)
      ) {
        setEmojisSection(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuSection(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [menuSection, setMenuSection] = useState(false);

  const handleMenuSection = () => {
    setMenuSection(!menuSection);
  };

  const handleCloseMenu = () => {
    setMenuSection(false);
  };

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeleteMessage = () => {
    setShowDeleteConfirm(true);
    handleCloseMenu();
  };

  const senderMenu = [
    {
      label: "Reply in thread",
      icon: <LuMessagesSquare />,
      func: () => {
        handleCloseMenu();
      },
    },
    ...(isOwner ? [
      {
        label: "Edit message",
        icon: <FiEdit3 />,
        func: () => {
          handleCloseMenu();
        },
      },
      {
        label: "Delete message...",
        icon: <LuDelete />,
        func: () => {
          handleDeleteMessage();
        },
      },
    ] : []),
    {
      label: "Copy message",
      icon: <FiCopy />,
      func: () => {
        handleCloseMenu();
      },
    },
  ];

  const receiverMenu = [
    {
      label: "Report message",
      icon: <LuShieldAlert />,
      func: () => {
        handleCloseMenu();
      },
    },
    {
      label: "Mark Unread",
      icon: <FiEdit3 />,
      func: () => {
        handleCloseMenu();
      },
    },
    {
      label: "Copy message",
      icon: <FiCopy />,
      func: () => {
        handleCloseMenu();
      },
    },
    {
      label: "Reply in thread",
      icon: <LuMessagesSquare />,
      func: () => {
        handleCloseMenu();
      },
    },
  ];

  return (
    <div className="flex items-center bg-eerieBlack border border-charcoalGray gap-1 rounded-lg shadow-md relative">
      {emojis.map((emoji) => (
        <button
          key={emoji}
          className="py-2 px-1 text-base"
          onClick={() => handleEmojiSelect(id, emoji)}
        >
          {emoji}
        </button>
      ))}
      <div className="flex gap-1">
        <span
          className="p-1 text-base cursor-pointer text-silver"
          onClick={handleEmojiSection}
        >
          <AddEmoji />
        </span>
        <span className="p-1 text-base">
          <img src={reply} alt="Reply" />
        </span>
        <span className="p-1 text-base">
          <img src={comment} alt="Comment" />
        </span>
        <span
          className="p-1 text-base cursor-pointer"
          onClick={handleMenuSection}
        >
          <MenuIcon className="text-silver" />
        </span>
      </div>

      {emojisSection && (
        <div ref={emojiRef} className="absolute top-12 left-0 w-[228px]">
          <div className="flex flex-wrap items-center bg-eerieBlack border border-charcoalGray gap-1 rounded-lg shadow-md">
            {emojisArr.map((emoji) => (
              <button
                key={emoji}
                className="py-2 px-1 text-base"
                onClick={() => handleEmojiSelect(id, emoji)}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {menuSection && (
        <div ref={menuRef} className="absolute top-12 right-0 w-[189px] z-[100]">
          <div className="bg-eerieBlack border border-charcoalGray rounded-lg py-2.5">
            {(isDemoSender ? senderMenu : receiverMenu).map((item, idx) => {
              const { label, icon, func } = item;

              const isDeleteItem = label === "Delete message...";
              const isLastItem =
                idx + 1 ===
                (isDemoSender ? senderMenu.length : receiverMenu.length);
              return (
                <div
                  key={idx}
                  className={`px-1.5 py-3 my-0.5 flex justify-between items-center cursor-pointer ${
                    isDeleteItem
                      ? "bg-[#BD0039]"
                      : "bg-transparent hover:bg-eclipseGray"
                  } ${isLastItem ? "" : "border-b border-eclipseGray"}`}
                  onClick={func}
                >
                  <span
                    className={`flex-1 font-normal text-xs ${
                      isDeleteItem ? "text-[#FEF2F2]" : "text-silver"
                    }`}
                  >
                    {label}
                  </span>

                  <span
                    className={`w-4 h-4 ${
                      isDeleteItem ? "text-platinum" : "text-coolGray"
                    }`}
                  >
                    {icon}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[200]">
          <div className="bg-eerieBlack border border-charcoalGray rounded-lg p-6 max-w-md">
            <h3 className="text-platinum text-lg mb-4">Delete Message?</h3>
            <p className="text-silver mb-6">This action cannot be undone.</p>
            <div className="flex justify-end gap-4">
              <button 
                className="px-4 py-2 text-silver hover:text-platinum"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-[#BD0039] text-[#FEF2F2] rounded hover:bg-opacity-90"
                onClick={async () => {
                  try {
                    setOverlayLoading?.(true);
                    await deleteMessageApi(id);
                    setShowDeleteConfirm(false);
                    onMessageDeleted?.();
                  } catch (error) {
                    console.error('Failed to delete message:', error);
                  } finally {
                    setOverlayLoading?.(false);
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageReactions;
