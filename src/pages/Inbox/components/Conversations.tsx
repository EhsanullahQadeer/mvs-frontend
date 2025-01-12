import featuredIcon from "../../../assets/icons/featured-icon.svg";
import starIcon from "../../../assets/icons/star.svg";
import { IConversation, ICurrentUser } from "./types";
import { useNavigate } from "react-router-dom";
import { lastMsgTimeStamp } from "../handlers/mediaUtils";
import axios from 'axios';
import { markConversationAsRead } from "api/messenger";

interface Props {
  conversation: IConversation;
  activeConversation: IConversation;
  getMessagesNotes: (selectedConvo: IConversation) => void;
  handleCheckboxChange: (id: number, isChecked: boolean) => void;
  selectedConversations: number[];
  handleToggleFavoriteConvo: (id: number) => void;
  favoriteConversationIds: number[];
  currentUserInfo: ICurrentUser;
  refreshConversations?: () => void;
  updateConversationStats?: (conversationId: number, updates: Partial<IConversation>) => void;
}

export const Conversations = (props: Props) => {
  const {
    conversation: {
      unread_count_b,
      unread_count_a,
      user_a,
      id,
      thumbnail,
      displayName,
      last_message_summary,
      last_updated_timestamp,
      total_payments_a,
      total_payments_b,
    },
    activeConversation,
    getMessagesNotes,
    handleCheckboxChange,
    selectedConversations,
    favoriteConversationIds,
    handleToggleFavoriteConvo,
    currentUserInfo,
    refreshConversations,
    updateConversationStats,
  } = props;
  const navigate = useNavigate();

  const handleConvoSelect = async (conversation, id) => {
    if (unreadCount > 0) {
      try {
        await markConversationAsRead(id);
        
        if (updateConversationStats) {
          updateConversationStats(id, {
            unread_count_a: currentUserInfo.id === user_a.id ? 0 : unread_count_a,
            unread_count_b: currentUserInfo.id === user_a.id ? unread_count_b : 0
          });
        }
      } catch (error) {
        console.error('Failed to mark conversation as read:', error);
      }
    }

    getMessagesNotes(conversation);
    navigate(`/inbox/${id}`);
  };

  const isChecked = selectedConversations.includes(id);
  const isFavorite = favoriteConversationIds.includes(id);

  const unreadCount =
    currentUserInfo.id === user_a.id ? unread_count_a : unread_count_b;
  const total_payments =
    currentUserInfo.id === user_a.id ? total_payments_a : total_payments_b;

  return (
    <>
      <div
        className={`hover:bg-eclipseGray flex justify-between items-center px-3 py-2 w-full border-b border-grayBlue border-opacity-20 max-md:max-w-full z-10 ${
          activeConversation?.id === id || isChecked
            ? "bg-eclipseGray"
            : "bg-transparent"
        }`}
      >
        <div className="flex flex-wrap flex-1 shrink gap-3 items-center self-stretch my-auto w-full basis-0 min-w-[240px] max-md:max-w-full">
          <div className="flex gap-2 self-stretch my-auto min-w-[240px]">
            <div className="flex gap-2 items-center h-full min-w-[240px]">
              <div className="flex gap-1 self-stretch my-auto rounded min-h-[32px]">
                <div className="flex justify-center items-center px-1 my-auto w-8 rounded min-h-[32px]">
                  <div className="flex overflow-hidden justify-center items-center self-stretch my-auto w-6 min-h-[24px]">
                    <div className="flex self-stretch my-auto w-4 h-4">
                      <input
                        type="checkbox"
                        className="rounded border-solid border-[1.5px] border-zinc-500 min-h-[16px] bg-transparent cursor-pointer"
                        checked={isChecked}
                        onChange={(e) =>
                          handleCheckboxChange(id, e.target.checked)
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="flex overflow-hidden flex-col justify-center items-center py-2 w-4">
                  <div
                    className={`flex w-2 h-2 rounded-full ${
                      unreadCount ? "bg-lightGreen" : "bg-transparent"
                    }`}
                  />
                </div>

                <div className="flex overflow-hidden flex-col justify-center items-center self-stretch p-2 my-auto">
                  <div
                    onClick={() => handleToggleFavoriteConvo(id)}
                    className="cursor-pointer"
                  >
                    <img
                      loading="lazy"
                      src={isFavorite ? featuredIcon : starIcon}
                      className="object-contain w-4 aspect-square"
                      alt="icon"
                    />
                  </div>
                </div>
              </div>
              <div
                className="flex gap-1 items-center self-stretch my-auto cursor-pointer"
                onClick={() => {
                  handleConvoSelect(props.conversation, id);
                }}
              >
                <div className="flex gap-2 items-center self-stretch my-auto">
                  <div
                    style={{
                      background:
                        "linear-gradient(141.84deg, #0258A5 4.32%, #9EFF00 94.89%)",
                    }}
                    className="flex rounded-full p-0.5 w-[52px] aspect-square"
                  >
                    <div className="w-full h-full rounded-full border-[2px] border-[#151515]">
                      <div
                        style={{ backgroundImage: `url("${thumbnail}")` }}
                        className="w-full h-full rounded-full bg-cover bg-center"
                      ></div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center self-stretch my-auto font-semibold w-[100px]">
                    <div
                      className={`text-sm leading-none ${
                        unreadCount ? "text-white" : "text-mediumGray"
                      }`}
                    >
                      {displayName}
                    </div>
                    <div className={`self-start px-1 py-0.5 mt-1 text-xs tracking-wide leading-tight whitespace-nowrap rounded border border-solid min-h-[16px] ${
                      Number(total_payments) === 0 
                        ? "text-zinc-300 bg-zinc-800 border-zinc-500" 
                        : "text-lime-400 bg-lime-800 border-lime-400"
                    }`}>
                      <span className={Number(total_payments) === 0 ? "text-zinc-300" : "text-lime-400"}>$</span>
                      {Number(total_payments) > 0 ? total_payments : ''}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`cursor-pointer flex flex-col flex-1 shrink justify-center items-start self-stretch my-auto ${
              unreadCount ? "text-white" : "text-mediumGray"
            } basis-6 min-w-[240px]`}
            onClick={() => {
              handleConvoSelect(props.conversation, id);
            }}
          >
            <div className="flex-1 shrink gap-2.5 self-stretch p-2.5 max-w-full text-sm font-semibold leading-none w-[150px] truncate">
              {last_message_summary}
            </div>
            <div className="px-2 text-xs leading-none font-semibold">
              {lastMsgTimeStamp(last_updated_timestamp)}
            </div>
          </div>
          {unreadCount ? (
            <>
              <div className="self-stretch px-3 py-1 my-auto text-xs font-semibold leading-none text-white whitespace-nowrap bg-[#F56755] rounded-3xl">
                {unreadCount}
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};
