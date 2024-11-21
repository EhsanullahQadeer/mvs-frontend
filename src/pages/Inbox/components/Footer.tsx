import { useState, useEffect } from "react";
import { ReactComponent as SendArrowIcon } from "../../../assets/icons/sendArrowIcon.svg";
import { ReactComponent as AudioFileIcon } from "../../../assets/icons/audioFile.svg";
import { AudioRecorder } from "react-audio-voice-recorder";
import PurchaseOrderDialog from "./PurchaseOrderDialog";
import { replyToMessage, sendInboxMessage } from "api/messenger";
import { ICurrentUser, IMessage } from "./types";
// import { ReactComponent as MicIcon } from "../../../assets/icons/micIcon.svg";

type Props = {
  conversation: IMessage;
  setOverlayLoading?: (value: boolean) => void;
  getConversationMessages?: (conversation: IMessage) => Promise<void>;
  isFeedbackSection?: boolean;
  currentUserInfo?: ICurrentUser;
  messageObj?: IMessage;
};

const Footer = ({
  conversation,
  setOverlayLoading,
  getConversationMessages,
  isFeedbackSection,
  currentUserInfo,
  messageObj,
}: Props) => {
  const { recipient_id, id } = conversation || {};

  const [openPurchaseOrder, setOpenPurchaseOrder] = useState(false);
  const [creditPaymentAmount, setCreditPaymentAmount] = useState(0);
  const [selectedAudioFile, setSelectedAudioFile] = useState<File | null>(null);
  const [recordedAudio, setRecordedAudio] = useState<File | null>(null);
  const [messageInputValue, setMessageInputValue] = useState("");

  const canSendMessage =
    messageInputValue.trim() &&
    ((isFeedbackSection && recordedAudio) || !isFeedbackSection);

  const validateFile = (file: File): File | null =>
    file.type.startsWith("audio/") ? file : null;

  const handleAudioSelector = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = validateFile(e.target.files?.[0]);
    if (file) {
      setSelectedAudioFile(file);
      setOpenPurchaseOrder(true);
    }
    e.target.value = "";
  };

  const handleSendMessage = async () => {
    const formData = new FormData();
    const isDemo = Boolean(selectedAudioFile);

    try {
      setOverlayLoading?.(true);

      formData.append("recipientId", recipient_id.toString());
      formData.append("senderId", currentUserInfo?.id?.toString() || "");
      formData.append("message", messageInputValue || "");
      if (isFeedbackSection) {
        formData.append("messageId", messageObj?.id?.toString() || "");
        formData.append("replyContent", messageInputValue || "");
        formData.append(
          "isDemoReply",
          messageObj?.audio_media.is_demo ? "true" : "false"
        );
        formData.append("audioFile", recordedAudio || "");
        await replyToMessage(formData);
      } else {
        formData.append("conversationId", conversation.id?.toString() || "");
        formData.append(
          "creditPaymentAmount",
          isDemo ? creditPaymentAmount.toString() : "0"
        );
        formData.append("isDemo", isDemo ? "true" : "false");
        formData.append("audioFile", selectedAudioFile || "");
        await sendInboxMessage(formData);
      }
      await getConversationMessages?.(conversation);
      setMessageInputValue("");
      setRecordedAudio(null);
    } finally {
      setOverlayLoading?.(false);
      setSelectedAudioFile(null);
      setCreditPaymentAmount(0);
    }
  };

  const handleRecordingComplete = (blob: Blob) => {
    console.log('Recording complete, blob:', blob);
    const file = new File([blob], "recording.webm", { type: blob.type });
    console.log('Created file:', file);
    setRecordedAudio(file);
  };

  useEffect(() => {
    console.log('recordedAudio state:', recordedAudio);
  }, [recordedAudio]);

  return (
    <>
      <div className="sticky bottom-0">
        <div className="flex flex-col p-3 w-full bg-richBlack relative">
          <div className="absolute left-0 top-3 px-3 w-full">
            <div className="flex justify-center px-7 bg-[#f9e2dd] rounded-t-xl">
              <p className="py-2.5 text-sm font-semibold text-[#955353]">
                Messages with tip appear at the top of the recipient inbox
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center px-3 py-2 w-full bg-[#131313] border border-[#ACD7FFCC] rounded-xl shadow-sm pt-12">
            <textarea
              value={messageInputValue}
              onChange={(e) => setMessageInputValue(e.target.value)}
              className="resize-none bg-transparent border-none p-2.5 w-full text-base text-[#ACD7FF] focus:ring-0"
              placeholder="Type your message..."
            />

            <div className="flex flex-wrap justify-between items-center gap-10 mt-3">
              <div className="flex items-center gap-5">
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

                <div
                  className={`${
                    isFeedbackSection ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                >
                  <label
                    htmlFor="audioFileSelect"
                    className={`text-dimGray cursor-pointer ${
                      isFeedbackSection
                        ? "pointer-events-none"
                        : "pointer-events-auto"
                    }`}
                  >
                    <input
                      type="file"
                      accept="audio/*"
                      id="audioFileSelect"
                      className="hidden"
                      onChange={handleAudioSelector}
                    />
                    <AudioFileIcon />
                  </label>
                </div>

                <AudioRecorder
                  onRecordingComplete={handleRecordingComplete}
                  audioTrackConstraints={{
                    noiseSuppression: true,
                    echoCancellation: true,
                  }}
                  showVisualizer={true}
                />
              </div>

              <div
                className={`${
                  canSendMessage ? "cursor-pointer" : "cursor-not-allowed"
                }`}
              >
                <div
                  onClick={canSendMessage ? handleSendMessage : undefined}
                  className={`flex items-center justify-center w-11 h-11 rounded ${
                    canSendMessage
                      ? "text-[#9EFF00] pointer-events-auto"
                      : "text-[#242424] pointer-events-none"
                  }`}
                >
                  <SendArrowIcon className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PurchaseOrderDialog
        {...{
          openPurchaseOrder,
          setOpenPurchaseOrder,
          conversation,
          setCreditPaymentAmount,
          handleSendMessage,
        }}
      />
    </>
  );
};

export default Footer;
