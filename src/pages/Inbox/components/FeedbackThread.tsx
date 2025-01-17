import { IoChevronBackOutline } from "react-icons/io5";
import { FiUser, FiUnlock } from "react-icons/fi";
import { ReactComponent as MenuIcon } from "../../../assets/icons/menuIcon.svg";
import Footer from "./Footer";
import { IConversation, ICurrentUser, IMessage, IMessagesData } from "./types";
import { useNavigate } from "react-router-dom";
import CheckerIcon from "../../../assets/icons/checker.svg";
import { formatMediaDetails } from "../handlers/mediaUtils";
import { useEffect, useState } from "react";
import ThreadMessageItem from "./ThreadMessageItem";

type Props = {
  conversation: IConversation;
  messages: IMessagesData;
  currentUserInfo: ICurrentUser;
  getConversationMessages?: (conversation: IConversation) => Promise<void>;
};

const FeedbackThread = (props: Props) => {
  const { conversation, messages, currentUserInfo, getConversationMessages } =
    props;

  const navigate = useNavigate();
  const { id, displayName } = conversation || {};

  const [msgId, setMsgId] = useState<number | null>(null);

  useEffect(() => {
    const storedMsgId = localStorage.getItem("msgId");
    if (storedMsgId) {
      setMsgId(Number(storedMsgId));
    }
  }, []);

  const safeAccess = <T,>(value: T | null | undefined): T | null =>
    value || null;

  const demoMessageObj = safeAccess(
    messages[0]?.messages?.find((msg) => msg.id === msgId)
  );

  let threadReplyObjs: IMessage[];

  if (demoMessageObj?.claimed) {
    threadReplyObjs = safeAccess(
      messages[0]?.messages?.filter((msg) => msg.message_reply?.id === msgId) ||
        []
    );
  }

  const demoAudioData = demoMessageObj?.audio_media;
  const details = formatMediaDetails(
    demoAudioData?.duration,
    demoAudioData?.file_size_bytes
  );

  const handleBackBtn = () => {
    localStorage.removeItem("msgId");
    navigate(`/inbox/${id}`);
  };

  return (
    <>
      <div className="h-full w-full border-l border-eerieBlack bg-richBlack relative">
        <div className="flex flex-col pt-2 h-full">
          <div className="flex flex-col w-full max-md:max-w-full sticky top-0 bg-richBlack">
            <div className="flex flex-wrap gap-5 justify-between items-center p-4 pt-2 w-full">
              <div className="flex gap-2 items-center">
                <div
                  onClick={handleBackBtn}
                  className="w-8 h-8 text-eclipseGray flex justify-center items-center cursor-pointer"
                >
                  <IoChevronBackOutline className="w-8 h-8 text-eclipseGray" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <div className="text-[18px] font-semibold text-white">
                    Feedback Thread
                  </div>
                  <div className="text-xs flex gap-1 text-silver font-normal">
                    <FiUser />
                    <div>{displayName}</div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center w-9 h-9 rounded bg-[#242424] cursor-pointer text-silver">
                <MenuIcon className="w-5 h-5" />
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1 gap-2 items-center px-4 py-4 w-full border-t border-eerieBlack overflow-y-auto custom-dropdown">
            {demoMessageObj && (
              <ThreadMessageItem
                {...{ message: demoMessageObj, isDemo: true, details }}
              />
            )}

            {demoMessageObj?.claimed ? (
              <>
                {threadReplyObjs?.map((reply, index) => {
                  return (
                    <>
                      {index === 1 && (
                        <div className="my-4 w-full text-charcoalGray flex items-center justify-center">
                        <div className="h-px w-full m-2 bg-charcoalGray"></div>
                        <div className="flex gap-2 text-sm font-medium items-center text-[#CACACA]">
                          <div className="w-5 h-5">
                            <img
                              className="w-full h-full object-cover"
                              src={CheckerIcon}
                              alt=""
                            />
                          </div>
                          <h4>Completed!</h4>
                        </div>
                        <div className="h-px w-full m-2 bg-charcoalGray"></div>
                      </div>
                      )}
                      <ThreadMessageItem {...{ message: reply, index }} />
                    </>
                  );
                })}

                
              </>
            ) : (
              <div className="bg-[#002C5580] border border-[#57AEFF] rounded-xl p-4 text-center flex flex-col items-center gap-1 w-80 mt-12">
                <div className="w-8 h-8 text-white flex justify-center items-center">
                  <FiUnlock className="w-7 h-7" />
                </div>

                <div className="text-white text-base font-semibold">
                  Action Required
                </div>

                <div className="text-coolGray text-sm font-normal w-64">
                  To receive your payment, please provide your feedback on the
                  demo.
                </div>
              </div>
            )}
          </div>

          <Footer
            {...{
              conversation,
              currentUserInfo,
              messageObj: demoMessageObj,
              getConversationMessages,
              isFeedbackSection: true,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default FeedbackThread;
