import { AudioRecorder } from "react-audio-voice-recorder";
import videoIcon from "../../../assets/icons/videoIcon.svg";
import plusCircleIcon from "../../../assets/icons/plusCircleIcon.svg";
import { ReactComponent as SendArrowIcon } from "../../../assets/icons/sendArrowIcon.svg";
import { IMessage } from "./types";

type Props = {
  message: string;
  setMessage: (value: any) => void;
  newMessage: () => {};
  conversation: IMessage;
};

const Footer = (props: Props) => {
  const { message, setMessage, newMessage, conversation } = props;

  const addAudioElement = (blob, message) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    // document.body.appendChild(audio);

    console.log("==== Audio Url ====");
    console.log(url);
  };

  return (
    <div className="sticky bottom-0">
      <div className="flex flex-col p-3 w-full bg-[#101113] relative">
        <div className="flex w-full text-sm font-semibold leading-none text-center absolute left-0 top-3 px-3">
          <div className="flex justify-center px-7 w-full bg-[#f9e2dd] rounded-t-xl">
            <div className="py-2.5 text-sm font-semibold text-[#955353]">
              Messages with tip appear at the top of the recipient inbox
            </div>
          </div>
        </div>
        <div className="flex overflow-hidden flex-col justify-center px-3 py-2 w-full rounded-xl border shadow-sm bg-[#131313] border-[#ACD7FFCC] pt-12">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="focus:border-transparent focus:ring-0 resize-none bg-transparent border-none flex-1 p-2.5 w-full text-base font-normal leading-none text-[#ACD7FF]"
          />

          <div className="flex flex-wrap gap-10 justify-between items-center w-full">
            <div className="flex gap-4 items-center p-2 rounded-lg border border-[#3D3D3D]">
              <div className="flex flex-col gap-1">
                <div className="text-sm font-semibold leading-none text-white whitespace-nowrap">
                  Tip
                </div>
                <div className="w-full text-xs font-normal leading-none text-[#EF4444]">
                  Min $3.00
                </div>
              </div>
              <div className="w-3.5 -rotate-90 border border-[#3D3D3D]"></div>

              <div className="text-sm leading-none text-right whitespace-nowrap text-[#848484] font-normal w-[60px]">
                <input
                  type="number"
                  placeholder="0.00"
                  className="bg-transparent max-w-[60px] border-none border-transparent focus:border-transparent focus:ring-0"
                />
              </div>
            </div>

            <div className="flex gap-1 items-center">
              <div className="flex gap-1 items-center">
                <div className="flex items-center justify-center w-11 h-11 rounded">
                  <img
                    loading="lazy"
                    src={videoIcon}
                    className="object-contain w-6 aspect-square"
                    alt="video-icon"
                  />
                </div>
                <div className="flex items-center justify-center rounded">
                  <AudioRecorder
                    onRecordingComplete={(e) =>
                      addAudioElement(e, conversation)
                    }
                    audioTrackConstraints={{
                      noiseSuppression: true,
                      echoCancellation: true,
                    }}
                    downloadOnSavePress={false}
                  />
                </div>
              </div>

              <div className="w-6 -rotate-90 border border-[#666666]"></div>

              <div className="flex items-center justify-center w-11 h-11 rounded">
                <img
                  loading="lazy"
                  src={plusCircleIcon}
                  className="object-contain w-6 aspect-square"
                  alt="circle-icon"
                />
              </div>
              <div className="flex items-center justify-center w-11 h-11 rounded">
                <div
                  onClick={() => message.length && newMessage()}
                  className={`flex ${
                    message.length
                      ? "text-[#9EFF00] cursor-pointer"
                      : "text-[#242424] cursor-not-allowed"
                  }`}
                >
                  <SendArrowIcon className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
