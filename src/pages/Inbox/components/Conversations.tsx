import moment from "moment";
import featuredIcon from "../assets/icons/featured-icon.svg";
import starIcon from "../assets/icons/star.svg";
import { getConversationsById } from "api/inbox";

export const Conversations = (props: any) => {
  const {
    conversation: {
      UnreadCount,
      conversation_id,
      thumbnail,
      displayName,
      LastMessageSummary,
      LastUpdatedTimestamp,
    },
    activeConversation,
    setLoading,
    setActiveConversation,
    setMessages,
  } = props;
  const getConversationMessages = async (conversation_id) => {
    setLoading(true);
    setActiveConversation(props.conversation);
    const _msgs = await getConversationsById(
      {
        limit: 10,
      },
      conversation_id
    );

    const results = _msgs.data.messages;

    for (var i = 0; i < results.length; i++) {
      results[i].date = moment(results[i].Timestamp).format("YYYY-MM-DD");
      console.log(results[i]);
    }

    const groups = results.reduce((groups, message) => {
      const date = message.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
      return groups;
    }, {});

    const groupArrays = Object.keys(groups).map((date) => {
      return {
        date,
        messages: groups[date],
      };
    });

    setMessages(groupArrays);
    setLoading(false);
  };
  return (
    <>
      <div
        className={`cursor-pointer hover:bg-[#242424] flex justify-between items-center px-3 py-2 w-full border-b border-[#68717E] border-opacity-20 max-md:max-w-full ${
          activeConversation?.conversation_id === conversation_id
            ? "bg-[#242424]"
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
                      />
                    </div>
                  </div>
                </div>
                {UnreadCount > 0 && (
                  <>
                    <div className="flex overflow-hidden flex-col justify-center items-center py-2 w-4">
                      <div className="flex w-2 h-2 bg-lime-300 rounded-full min-h-[8px]" />
                    </div>
                  </>
                )}
              </div>
              <div
                className="flex gap-1 items-center self-stretch my-auto"
                onClick={async () => {
                  await getConversationMessages(conversation_id);
                }}
              >
                <div className="flex overflow-hidden flex-col justify-center items-center self-stretch p-2 my-auto w-8">
                  <img
                    loading="lazy"
                    src={UnreadCount ? featuredIcon : starIcon}
                    className="object-contain w-4 aspect-square"
                  />
                </div>
                <div className="flex gap-2 items-center self-stretch my-auto">
                  <div
                    style={{
                      background:
                        "linear-gradient(141.84deg, #0258A5 4.32%, #9EFF00 94.89%)",
                    }}
                    className="flex gap-2.5 items-start self-stretch my-auto w-[52px] rounded-full p-0.5"
                  >
                    <img
                      loading="lazy"
                      src={thumbnail}
                      className="object-contain aspect-square w-[52px] rounded-full border-[2px] border-[#151515]"
                    />
                  </div>
                  <div className="flex flex-col justify-center self-stretch my-auto font-semibold w-[100px]">
                    <div
                      className={`text-sm leading-none ${
                        UnreadCount ? "text-white" : "text-[#999999]"
                      }`}
                    >
                      {displayName}
                    </div>
                    <div className="self-start px-1 py-0.5 mt-1 text-xs tracking-wide leading-tight text-lime-400 whitespace-nowrap bg-lime-800 rounded border border-lime-400 border-solid min-h-[16px]">
                      $434.99
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`flex flex-col flex-1 shrink justify-center items-start self-stretch my-auto ${
              UnreadCount ? "text-white" : "text-[#999999]"
            } basis-6 min-w-[240px]`}
            onClick={async () => {
              await getConversationMessages(conversation_id);
            }}
          >
            <div className="flex-1 shrink gap-2.5 self-stretch p-2.5 max-w-full text-sm font-semibold leading-none w-[150px] truncate">
              {LastMessageSummary}
            </div>
            <div className="flex gap-4 items-center px-2 text-xs leading-none w-[75px]">
              <div className="self-stretch my-auto w-[59px] font-semibold">
                {moment(LastUpdatedTimestamp).format("h:mm A")}
              </div>
            </div>
          </div>
          {UnreadCount > 0 && (
            <>
              <div className="self-stretch px-3 py-1 my-auto text-xs font-semibold leading-none text-white whitespace-nowrap bg-[#F56755] rounded-3xl">
                {UnreadCount}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
