import moment from "moment";
import { AudioPlayer } from "react-audio-play";
import { IMessagesData } from "./types";

type Props = {
  messages: IMessagesData;
};

const MessagesSection = (props: Props) => {
  const { messages } = props;
  return (
    <div className="flex flex-col flex-1">
      <>
        {messages.length &&
          messages[0].messages.map((msg, index: number) => {
            const {
              thumbnail,
              displayName,
              message_content,
              audio_recording_url,
              created_at,
            } = msg;

            // Get the formatted date and time
            const formattedDate =
              moment(created_at).format("dddd, MMMM D, YYYY");
            const formattedTime = moment(created_at).format("h:mm A");

            // Determine if the date should be displayed
            const shouldShowDate =
              index === 0 ||
              moment(messages[0].messages[index - 1].created_at).format(
                "YYYY-MM-DD"
              ) !== moment(created_at).format("YYYY-MM-DD");

            return (
              <div key={index}>
                {shouldShowDate && (
                  <div className="flex items-center w-full justify-between">
                    <div className="flex-1 p-2.5 text-[#848484]">
                      <hr />
                    </div>

                    <div className="p-2.5 text-sm font-normal text-[#B2B2B2]">
                      {formattedDate}
                    </div>

                    <div className="flex-1 p-2.5 text-[#848484]">
                      <hr />
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 py-2 w-full">
                  <div
                    style={{
                      background:
                        "linear-gradient(141.84deg, #0258A5 4.32%, #9EFF00 94.89%)",
                    }}
                    className="flex rounded-full p-0.5 w-12 aspect-square"
                  >
                    <img
                      alt=""
                      loading="lazy"
                      src={thumbnail}
                      className="object-contain w-full h-full rounded-full border-[2px] border-[#151515]"
                    />
                  </div>
                  <div className="flex flex-col flex-1 shrink justify-center my-auto basis-0 min-w-[240px] max-md:max-w-full">
                    <div className="flex flex-col gap-1 w-full">
                      <div className="flex gap-4 items-start">
                        <div className="font-semibold text-sm text-white">
                          {displayName}
                        </div>
                        <div className="text-[#68717E] text-sm font-normal">
                          {formattedTime}
                        </div>
                      </div>
                      <div className="text-sm text-[#CACCCD] font-normal text-wrap">
                        {message_content}
                      </div>
                    </div>
                    {audio_recording_url && (
                      <div className="flex gap-1 items-center self-start p-3 mt-3 rounded-2xl bg-neutral-800 w-[400px]">
                        <AudioPlayer
                          src={audio_recording_url}
                          color="#1C1C1"
                          sliderColor="#B7B7B7"
                          style={{
                            background: "#242424",
                            borderRadius: "15px",
                          }}
                          className="audio-player"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </>
    </div>
  );
};

export default MessagesSection;
