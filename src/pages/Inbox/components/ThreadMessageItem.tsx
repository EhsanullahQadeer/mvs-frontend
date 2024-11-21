import moment from "moment";
import { AudioPlayer } from "react-audio-play";
import { IMessage } from "./types";

type Props = {
  message: IMessage;
  index?: number;
  isDemo?: boolean;
  details?: {
    duration: string;
    size: string;
  };
};

const ThreadMessageItem = (props: Props) => {
  const { message, index, isDemo, details } = props;

  const { audio_media, thumbnail, displayName, created_at, message_content } =
    message;

  return (
    <div key={index} className="flex flex-wrap gap-2 w-full">
      <div
        style={{
          background:
            "linear-gradient(141.84deg, #0258A5 4.32%, #9EFF00 94.89%)",
        }}
        className="flex rounded-full p-0.5 w-12 h-12 aspect-square"
      >
        <img
          alt=""
          loading="lazy"
          src={thumbnail}
          className="object-contain w-full h-full rounded-full border-[2px] border-[#151515]"
        />
      </div>
      <div className="flex flex-col flex-1 shrink justify-center my-auto basis-0 min-w-[240px] max-md:max-w-full">
        <div className="flex flex-col w-full">
          <div className="flex gap-4 items-start">
            <div className="font-semibold text-sm text-white">
              {displayName}
            </div>
            <div className="text-[#68717e] text-sm font-normal">
              {moment(created_at).format("h:mm A")}
            </div>
          </div>
          <div className="mt-1 mb-2 text-[#CACCCD] text-sm font-normal">
            {message_content}
          </div>

          <div
            id="2"
            className={`flex relative gap-1 items-center self-start rounded-2xl h-full w-auto ${
              isDemo ? "audio-1 p-3 mt-1 bg-gunMetal" : "audio-2 mt-2"
            }`}
          >
            <AudioPlayer
              src={audio_media.url}
              color="#1C1C1C"
              sliderColor="#4B4B4B"
              style={{
                background: "#242424",
                borderRadius: isDemo ? "15px" : "40px",
              }}
              className={`"border border-[#3D3D3D]" ${
                !isDemo && "rounded-full"
              }`}
            />

            {isDemo && (
              <div className="flex text-[14px] absolute leading-4 left-[60px] top-[25px] text-silver flex-col">
                <div className="w-11/12">
                  <p className="font-normal text-sm text-silver flex">
                    <span>"</span>
                    <span className="line-clamp-1">
                      {audio_media.file_name}
                    </span>
                    <span>"</span>
                  </p>

                  <div className="px-1.5 text-dimGray font-normal text-[10px]">
                    {details.duration} ({details.size})
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreadMessageItem;
