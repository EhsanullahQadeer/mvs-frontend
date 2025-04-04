import { useState } from "react";
import { useConversation } from "../context";
import starIcon from "../../../../../assets/icons/star.svg";
import { lastMsgTimeStamp } from "../../../handlers/mediaUtils";
import featuredIcon from "../../../../../assets/icons/featured-icon.svg";
import { IConversation, TUser } from "api/messenger/objects/states.types";
import Thumbnail from "components/ui/Header/atoms/notificationAtoms/notificationThumbnail";

export const Conversation = ({ conversation, onClick, searchTerm, searchContent, searchCreatedAt, sender }: { 
  searchTerm?:string; 
  searchContent?:string;
  searchCreatedAt?:string;
  sender?:TUser;
  conversation: IConversation, 
  onClick: () => void 
}) => {
  const {
    id,
    unread_count,
    available_funds,
    lastMessageSummary,
    lastMessageTimestamp,
    recipient,
  } = conversation;

  const {
    inboxTab,
    activeConversation,
    selectedConversations,
    handleCheckboxChange,
    handleToggleFavoriteConversation,
  } = useConversation();

  const [isFavorite, setIsFavorite] = useState<boolean>(conversation.is_favorite);
  const isChecked = selectedConversations.includes(conversation);

  return (
      <div
        onClick={onClick}
        className={`hover:bg-eclipseGray flex justify-between items-center px-3 py-2 w-full border-b border-grayBlue border-opacity-20 max-md:max-w-full z-9 ${
          activeConversation?.id === id
            ? "bg-eclipseGray"
            : "bg-transparent"
        }`}
      >
        <div className="flex flex-wrap flex-1 shrink gap-3 items-center self-stretch my-auto w-full basis-0 min-w-[240px] max-md:max-w-full">
          <div className="flex gap-2 self-stretch my-auto min-w-[240px]">
            <div className="flex gap-2 items-center h-full min-w-[240px]">
              <div className="flex gap-2 items-center h-full min-w-[240px]">
                <div className="flex gap-1 self-stretch my-auto rounded min-h-[32px]">

                  <div id="checkbox-container" className="flex justify-center items-center px-1 my-auto w-8 rounded min-h-[32px]" onClick={(e) => e.stopPropagation()}>
                    <div className="flex overflow-hidden justify-center items-center self-stretch my-auto w-6 min-h-[24px]">
                      <div className="flex self-stretch my-auto w-4 h-4">
                      <input
                        type="checkbox"
                        className="rounded border-solid border-[1.5px] border-zinc-500 min-h-[16px] bg-transparent cursor-pointer"
                        checked={isChecked}                        
                        onChange={(e) => {
                          e.stopPropagation();
                          handleCheckboxChange(conversation, e.target.checked);
                        }}
                      />
                      </div>
                    </div>
                  </div>

                  <div className="flex overflow-hidden flex-col justify-center items-center py-2 w-4">
                    <div
                      className={`flex w-2 h-2 rounded-full ${
                        unread_count ? "bg-lightGreen" : "bg-transparent"
                      }`}
                    />
                  </div>

                  <div className="flex overflow-hidden flex-col justify-center items-center self-stretch p-2 my-auto">
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleFavoriteConversation(conversation);
                        setIsFavorite(!isFavorite);
                      }}
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
                >
                  <div className="flex gap-2 items-center self-stretch my-auto">
                    <div className="p-1">
                      <Thumbnail
                        professionalName={`${searchTerm ? sender?.professional_name : recipient?.professional_name}`}
                        thumbnail={`${searchTerm ? sender?.thumbnail : recipient?.thumbnail}`}
                        size="44"
                        userId={searchTerm ? sender?.id : recipient?.id}
                      />
                    </div>
                    <div className="flex flex-col justify-center self-stretch my-auto font-semibold w-[100px]">
                      <div
                        className={`text-sm leading-none ${
                          unread_count ? "text-white" : "text-mediumGray"
                        }`}
                      >
                        {searchTerm ? sender?.professional_name : recipient?.name}
                      </div>
                      {inboxTab !== 'network' && (
                        <div className={`self-start px-1 py-0.5 mt-1 text-xs tracking-wide leading-tight whitespace-nowrap rounded border border-solid min-h-[16px] ${
                          Number(available_funds) === 0 
                          ? "text-zinc-300 bg-zinc-800 border-zinc-500" 
                          : "text-lime-400 bg-lime-800 border-lime-400"
                      }`}>
                        <span className={Number(available_funds) === 0 ? "text-zinc-300" : "text-lime-400"}>$</span>
                        <span className={"text-lime-400"}>{Number(available_funds) > 0 ? available_funds : ''}</span>
                      </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`cursor-pointer flex flex-col flex-1 shrink justify-center items-start self-stretch my-auto ${
              unread_count ? "text-white" : "text-mediumGray"
            } basis-6 min-w-[240px]`}
          >
            <div className="flex-1 shrink gap-2.5 self-stretch p-2.5 max-w-full text-sm font-semibold leading-none w-[150px] truncate">
              {searchTerm ? (
                searchContent?.split(' ').map((word, index) => {
                  if (word.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return <span key={index} className="bg-blue-300 text-blue-900 px-0.5 rounded">{word} </span>;
                  }
                  return word + ' ';
                })
              ) : lastMessageSummary}
            </div>
            <div className="px-2 text-xs leading-none font-semibold">
              {searchTerm ? lastMsgTimeStamp(searchCreatedAt) : lastMsgTimeStamp(lastMessageTimestamp)}
            </div>
          </div>
          {unread_count > 0 && (
            <>
              <div className="self-stretch px-3 py-1 my-auto text-xs font-semibold leading-none text-white whitespace-nowrap bg-[#F56755] rounded-3xl">
                {unread_count}
              </div>
            </>
          )}
        </div>
      </div>
  );
};
