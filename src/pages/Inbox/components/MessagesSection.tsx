import { useState } from "react";
import moment from "moment";
import { ICurrentUser, IMessagesData } from "./types";
import { ReactComponent as AudioFileIcon } from "../../../assets/icons/audioFile.svg";
import MessageReactions from "./MessageReactions";
import { formatMediaDetails, lastMsgTimeStamp } from "../handlers/mediaUtils";
import { useMessageReactions } from "../hooks/useMessageReactions";
import { AudioPlayer } from "react-audio-play";


type Props = {
  messages: IMessagesData;
  handleDemoBtn: (id: number) => void;
  handleReviewBtn: (id: number) => void;
  handleThreadReply: (id: number) => void;
  currentUserInfo?: ICurrentUser;
  refreshMessages: () => void;
};

const isNewMessage = false;

const MessagesSection = (props: Props) => {
  const {
    messages,
    handleDemoBtn,
    handleReviewBtn,
    handleThreadReply,
    currentUserInfo,
    refreshMessages,
  } = props;

  const { messageReactions, handleEmojiSelect } = useMessageReactions(
    messages,
    currentUserInfo.id
  );

  const [hoveredMessageId, setHoveredMessageId] = useState(null);

  const chatMessages = messages[0].messages.filter(
    (msg) => msg.message_reply === null
  );

  const findThreadReplyObj = (msgId: number) => {
    return messages[0].messages.filter(
      (msg) => msg.message_reply?.id === msgId
    );
  };

  return (
    <div className="flex flex-col flex-1">
      {chatMessages.map((msg, index) => {
        const {
          id,
          thumbnail,
          displayName,
          message_content,
          created_at,
          credit_payment,
          sender,
          claimed,
          is_read,
          audio_media,
        } = msg;

        const isDemoSender = currentUserInfo.id === sender.id;
        const details = formatMediaDetails(
          audio_media?.duration,
          audio_media?.file_size_bytes
        );

        const firstFeedbackOnDemo = !is_read && isDemoSender && claimed;

        let threadReplyObjs = [];

        if (claimed) {
          threadReplyObjs = findThreadReplyObj(id);
        }

        const lastThreadReply = threadReplyObjs[threadReplyObjs.length - 1];

        // Get the formatted date and time
        const formattedDate = moment(created_at).format("dddd, MMMM D, YYYY");
        const formattedTime = moment(created_at).format("h:mm A");

        const shouldShowDate =
          index === 0 ||
          moment(messages[0].messages[index - 1].created_at).format(
            "YYYY-MM-DD"
          ) !== moment(created_at).format("YYYY-MM-DD");

        const totalReactions = Object.values(
          messageReactions[id]?.reactionCounts || {}
        ).reduce((total, { count }) => total + count, 0);

        return (
          <div key={id}>
            {shouldShowDate && (
              <div className="flex items-center w-full justify-between px-4">
                <div className="flex-1 p-2.5 text-coolGray">
                  <hr />
                </div>
                <div className="p-2.5 text-sm font-normal text-silver">
                  {formattedDate}
                </div>
                <div className="flex-1 p-2.5 text-coolGray">
                  <hr />
                </div>
              </div>
            )}

            <div
              onMouseEnter={() => setHoveredMessageId(id)}
              onMouseLeave={() => setHoveredMessageId(null)}
              className={`flex flex-wrap gap-2 px-4 py-2 w-full relative group ${
                hoveredMessageId === id && "bg-gunMetal"
              }`}
            >
              <div className="absolute -top-8 left-28 mt-2 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {hoveredMessageId === id && (
                  <MessageReactions
                    {...{ 
                      handleEmojiSelect, 
                      id, 
                      isDemoSender, 
                      isOwner: currentUserInfo.id === sender.id,
                      onMessageDeleted: refreshMessages 
                    }}
                  />
                )}
              </div>

              <div
                style={{
                  // background:
                  //   "linear-gradient(141.84deg, #0258A5 4.32%, #9EFF00 94.89%)",
                }}
                className="flex rounded-full p-0.5 w-12 h-12"
              >
                <div className="w-full h-full rounded-full border-[2px] border-[#151515]">
                  <div
                    style={{ backgroundImage: `url("${thumbnail}")` }}
                    className="w-full h-full rounded-full bg-cover bg-center"
                  ></div>
                </div>
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex gap-4 items-start">
                  <div className="font-semibold text-sm text-white">
                    {displayName}
                  </div>
                  <div className="text-grayBlue text-sm">{formattedTime}</div>
                </div>
                <div className="text-sm text-[#CACCCD]">{message_content}</div>

                {audio_media?.is_demo ? (
                  <>
                    <div className="bg-gunMetal border border-eerieBlack rounded-lg p-3.5 flex flex-col gap-3 w-[282px]">
                      <div
                        className={`${
                          firstFeedbackOnDemo &&
                          "border border-[#57AEFF] bg-[#002C5580] p-3 rounded-lg"
                        }`}
                      >
                        <div
                          className={`border rounded-lg p-2.5 flex gap-3 items-center ${
                            firstFeedbackOnDemo
                              ? "border-[#57AEFF] bg-[#002C55]"
                              : "bg-[#202327] border-charcoalGray"
                          }`}
                        >
                          <div
                            className={`text-coolGray border rounded-lg p-2.5 ${
                              firstFeedbackOnDemo
                                ? "border-dimGray text-dimGray"
                                : "border-charcoalGray text-coolGray"
                            }`}
                          >
                            <AudioFileIcon />
                          </div>

                          <div>
                            <p className="font-normal text-sm text-silver flex">
                              <span>"</span>
                              <span className="line-clamp-1">
                                {audio_media?.file_name}
                              </span>
                              <span>"</span>
                            </p>

                            <div className="px-1.5 text-dimGray font-normal text-[10px]">
                              {details.duration} ({details.size})
                            </div>
                          </div>
                        </div>

                        {firstFeedbackOnDemo && (
                          <div className="text-center mt-1 text-sm">
                            <p className="text-white font-semibold py-2">
                              Feedback received on your demo!
                            </p>
                            <p className="text-coolGray font-normal">
                              Your audio has been reviewed, and the creator has
                              left their comments.
                            </p>
                          </div>
                        )}
                      </div>

                      {!(claimed || isDemoSender) && (
                        <button
                          onClick={() => handleDemoBtn(id)}
                          className="bg-limeGreen py-3 px-4 w-full text-[#203300] text-sm font-semibold rounded-full"
                        >
                          Earn ${credit_payment} {credit_payment.length > 6 ? "" : "- Tap to Unlock"}
                        </button>
                      )}

                      {firstFeedbackOnDemo && (
                        <button
                          onClick={() => handleReviewBtn(id)}
                          className="bg-limeGreen py-3 px-4 w-full text-jetBlack text-sm font-semibold rounded-full"
                        >
                          Review Feedback
                        </button>
                      )}
                    </div>

                    {claimed && !firstFeedbackOnDemo && (
                      <div className="flex gap-2.5 items-center pt-2">
                        <div
                          className="flex gap-1.5 items-center cursor-pointer w-max"
                          onClick={() => handleThreadReply(id)}
                        >
                          <div className="w-6 h-6 rounded-full bg-[#151515] border-[0.5px] border-[#343434] p-[1px]">
                            <img
                              src={lastThreadReply?.thumbnail}
                              alt="thumbnail"
                              className="w-full h-full rounded-full"
                            />
                          </div>
                          <span className="text-[10px] text-secondaryBlue font-normal cursor-pointer">
                            {threadReplyObjs?.length} reply
                          </span>

                          <span className="text-mediumGray text-[10px] font-normal">
                            {hoveredMessageId === id
                              ? "See Thread"
                              : lastMsgTimeStamp(lastThreadReply?.created_at)}
                          </span>
                        </div>

                        {isNewMessage && (
                          <div className="flex items-center gap-1">
                            <div className="w-36">
                              <hr className="text-[#57AEFF]" />
                            </div>

                            <span className="text-[10px] text-[#57AEFF] font-semibold">
                              New
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                ) : audio_media ? (
                  <div
                    id="2"
                    className="flex relative gap-1 items-center self-start rounded-2xl h-full w-auto audio-2 mt-2"
                  >
                    <AudioPlayer
                      src={audio_media?.url}
                      color="#1C1C1C"
                      sliderColor="#4B4B4B"
                      style={{
                        background: "#242424",
                        borderRadius: "40px",
                      }}
                      className="border border-[#3D3D3D] rounded-full"
                    />
                  </div>
                ) : null}

                {Object.entries(
                  messageReactions[id]?.reactionCounts || {}
                ).some(([, { count }]) => count > 0) && (
                  <div className="mt-1 bg-eclipseGray border border-charcoalGray flex px-2 py-1 justify-center items-center w-fit rounded-full">
                    {Object.entries(messageReactions[id]?.reactionCounts || {})
                      .filter(([, { count }]) => count > 0)
                      .map(([emoji, { count }]) => (
                        <span key={emoji} className="text-xl">
                          {emoji}
                          {count > 1 && (
                            <span className="ml-2 text-sm text-white">
                              {count}
                            </span>
                          )}
                        </span>
                      ))}
                    {totalReactions > 1 && (
                      <span className="ml-2 text-sm text-white">
                        {totalReactions}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessagesSection;
