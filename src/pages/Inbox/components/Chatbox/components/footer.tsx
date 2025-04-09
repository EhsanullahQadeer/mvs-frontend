import { toast } from "react-toastify";
import { useChatbox } from "../context";
import { storeMedia, uploadMedia } from "api/sounds";
import { CircularProgress } from "@mui/material";
import { useMessenger } from "api/messenger/context";
import AudioWaveform from "components/util/AudioWaveform";
import { convertToCurrencyFormat } from "shared/utils/dateUtils";
import React, { useState, useEffect, useRef, useCallback } from "react";
import PurchaseOrderDialog from "../../PurchaseOrderDialog";
import RecordedAudioPlayer from "../../RecordedAudioPlayer";
import AudioRecorder, { useAudioRecording } from './audioRecorder';
import FooterRecordedAudioPlayer from "./footerRecordedAudioPlayer";
import { ReactComponent as AudioFileIcon } from "../../../../../assets/icons/audioFileFromDevice.svg";
import { ReactComponent as SendArrowIcon } from "../../../../../assets/icons/sendArrowIcon.svg";
import SampleModalFooter from "../../SampleModalFooter";
import SampleSendDemoModal from "../../SampleSendDemoModal";
import { ReactComponent as AudioFileIconFromSample } from "../../../../../assets/icons/audioFile.svg";

import { useToast } from "shared/toasts/ToastProvider";
import { uploadContent } from "shared/utils/uploadContent";


interface StoreMediaDTO {
  s3Key: string;
  format: string;
  duration: number;
  file_size_bytes: number;
  file_name: string;
  mimetype: string;
}

const Footer = () => {

  const {
    activeConversation,
    sendMessage,
    replyInThread,
    threadMessages,
  } = useMessenger();

  const {
    isThread,
    isSendDemoAvailable,
    listenToDemoEvent,
    setListenToDemoEvent,
    onlyAllowAudioRecording,
    setOnlyAllowAudioRecording,
    handleUploadFile,
    fileS3Key,
    calculateAudioDuration
  } = useChatbox()

  const {
    isRecording,
    recordedAudio,
    recordingDuration,
    stopRecording,
    clearRecording,
  } = useAudioRecording();

  const { addToast } = useToast();

  const MAX_TIP_AMOUNT = 1000000;
  const [tipAmount, setTipAmount] = useState(0);
  const [inputTipAmount, setInputTipAmount] = useState("$0.00");
  const [uploadedAudioFile, setUploadedAudioFile] = useState<File | null>(null);
  const [audioMediaId, setAudioMediaId] = useState<number | null>(null);
  const [openPurchaseOrder, setOpenPurchaseOrder] = useState(false);
  const [messageInputValue, setMessageInputValue] = useState("");
  const [reloadComponent, setReloadComponent] = useState(false);
  const [showTipMessage, setShowTipMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>();
  const stopRecordingRef = useRef<(() => void) | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Create a ref for the file input
  const isSendButtonDisabled = messageInputValue.length === 0 && !recordedAudio && !uploadedAudioFile && tipAmount < 1;
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);
  const [isSendDemoModalOpen, setIsSendDemoModalOpen] = useState(false);
  const [selectedSamples, setSelectedSamples] = useState<any[]>([]);

  useEffect(() => {
    if (reloadComponent) {
      setReloadComponent(false);
    }
  }, [reloadComponent]);

  useEffect(() => {
    setShowTipMessage(messageInputValue.trim().length > 0);
  }, [messageInputValue]);

  useEffect(() => {
    clearMessageInputs();
  }, [activeConversation]);

  const handleAudioSelector = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Audio File look: ', e.target.files?.[0]);
    const file = validateFile(e.target.files?.[0]);
    if (file) {
      setUploadedAudioFile(file);
    }
    e.target.value = "";
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click(); // Programmatically click the hidden file input
  };

  const validateFile = (file: File): File | null => {
    if (!file) {
      addToast({ state: "unsupportedFileFormat", actionFunction: () => handleButtonClick() });
      return null;
    }
    if (!file.type.startsWith("audio/")) {
      addToast({ state: "unsupportedFileFormat", actionFunction: () => handleButtonClick() });
      return null;
    }
    if (file.size > 50 * 1024 * 1024) {
      addToast({ state: "fileSizeExceeded", params: { sizeLimit: "50 MB" }, actionFunction: () => handleButtonClick() });
      return null;
    }
    return file;
  };

  const handleSendMessage = async () => {
    setIsSubmitting(true);
    try {
      if (uploadedAudioFile) { // Send Demo
        if (isThread) {
          toast.error("You cannot send a demos in a thread");
          return;
        }
        setOpenPurchaseOrder(true);
      } else if (!uploadedAudioFile && recordedAudio) {
        const file = new File([recordedAudio], `recording.${recordedAudio.type.split('/')[1]}`, {
          type: recordedAudio.type
        });
        await handleUploadFile(file);

        let uploadedMedia;
        try {
          const duration = await calculateAudioDuration(file);
          uploadedMedia = await storeMedia({
            s3Key: fileS3Key,
            format: file.name.split('.').pop()?.toLowerCase() || '',
            duration: Math.ceil(Number(duration)),
            file_size_bytes: file.size,
            file_name: file.name,
            mimetype: file.type,
            type: "recording"
          });

          if (!uploadedMedia?.data?.id) {
            addToast({ state: "somethingWentWrong", permanent: true, actionFunction: () => window.location.reload() })
            return;
          }
        } catch (error) {
          addToast({ state: "uploadFailed", permanent: true, actionFunction: () => handleSendMessage() })
          return;
        }

        addToast({ state: "fileUploadedSuccessfully", permanent: true, actionFunction: () => handleSendMessage() })

        const mediaId = uploadedMedia.data.id;
        if (!isThread) {
          await sendMessage({
            message: String(messageInputValue || ''),
            conversationId: String(activeConversation?.conversation_id || ''),
            audioMediaId: mediaId,
            messageType: "recording",
          });
        } else {
          await replyInThread({
            replyContent: String(messageInputValue || ''),
            parentMessageId: Number(threadMessages[0]?.id || ''),
            audioMediaId: mediaId,
          });
          setListenToDemoEvent(false);
          setOnlyAllowAudioRecording(false);
        }
      } else {
        if (isThread) {
          await replyInThread({
            replyContent: String(messageInputValue || ''),
            parentMessageId: Number(threadMessages[0]?.id || ''),
          });
        } else {
          if (tipAmount > 0) {
            try {
              const response = await sendMessage({
                message: String(messageInputValue || ''),
                conversationId: String(activeConversation?.conversation_id || ''),
                messageType: "tip",
                creditPaymentAmount: tipAmount,
              });
            } catch (error) {
              addToast({ state: "messageFailedToSend", permanent: true, actionFunction: () => handleSendMessage() })
              return;
            } finally {
              addToast({ state: "tipSentSuccessfully" })
            }
          } else {
            const response = await sendMessage({
              message: String(messageInputValue || ''),
              conversationId: String(activeConversation?.conversation_id || ''),
              messageType: "message",
            });
          }
        }
      }
      clearMessageInputs();
    } catch (error) {
      addToast({ state: "messageFailedToSend", permanent: true, actionFunction: () => handleSendMessage() })
    } finally {
      setIsSubmitting(false);
    }
  }

  const clearMessageInputs = () => {
    setMessageInputValue("");
    setUploadedAudioFile(null);
    setAudioMediaId(null);
    setTipAmount(0);
    setInputTipAmount("$0.00")
    clearRecording();
  }

  const handleTipAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value; // Get the current input value
    let cleanedValue = inputValue.replace("$", "");
    let updatedNumericValue = 0;
    let updatedInputValue = "";
    updatedInputValue = convertToCurrencyFormat(cleanedValue); // Output: "$0.01"
    updatedNumericValue = parseFloat(updatedInputValue.replace("$", "").replace(/,/g, ""));
    if (updatedNumericValue > MAX_TIP_AMOUNT) {
      updatedInputValue = "$1,000,000.00";
      updatedNumericValue = MAX_TIP_AMOUNT;
    }
    setInputTipAmount(updatedInputValue);
    if (updatedNumericValue >= 1) {
      setTipAmount(updatedNumericValue);
    } else {
      setTipAmount(0);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Prevent arrow keys
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    // Move the cursor to the end of the input value
    const input = event.target;
    input.setSelectionRange(input.value.length, input.value.length);
  };

  function determineTextColor() {
    let updatedNumericValue = parseFloat(inputTipAmount.replace("$", "").replace(/,/g, ""));
    if (updatedNumericValue < 1) {
      if (updatedNumericValue === 0) {
        return "text-[#848484]";
      } else {
        return "text-[#EF4444]";
      }
    }
    return "text-[#848484]";
  }

  const handleSampleSelect = (sample: any) => {
    setSelectedSamples([...selectedSamples, sample]);
    setIsSampleModalOpen(false);
    setIsSendDemoModalOpen(true);
  };

  const handleSendSamples = async (samples: any[]) => {
    try {
      setIsSendDemoModalOpen(false);
      setSelectedSamples([]);
    } catch (error) {
      console.error("Error sending samples:", error);
      toast.error("Failed to send samples");
    }
  };

  return (
    <>
      <div className="sticky bottom-0">
        <div className="flex flex-col p-3 w-full bg-richBlack relative">
          <div className="flex flex-col justify-center w-full bg-[#131313] border border-[#ACD7FFCC] rounded-xl shadow-sm relative">
            <div
              className={`w-full transition-all duration-300 ease-out ${showTipMessage
                  ? "opacity-100 max-h-[2.5rem]"
                  : "opacity-0 max-h-0 overflow-hidden"
                }`}
            >
              <div className="flex justify-center px-4 py-1 mt-2 ml-2 mr-2 bg-[#f9e2dd] rounded-xl">
                <p className="text-sm font-semibold text-[#955353]">
                  Messages with tip are prioritized in the recipient inbox
                </p>
              </div>
            </div>

            <div className="flex flex-col w-full mt-4 px-3">
              <div className="relative pr-2.5">
                <textarea
                  ref={textareaRef}
                  value={messageInputValue}
                  onChange={(e) => {
                    setMessageInputValue(e.target.value);
                    // Auto-resize textarea
                    const textarea = e.target;
                    textarea.style.height = '2.5rem';
                    textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey &&
                      !isSubmitting && !isRecording &&
                      messageInputValue.length > 0) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  style={{ height: '2.5rem' }}
                  className={`resize-none bg-transparent border-none w-full text-base text-[#ACD7FF] focus:ring-0 overflow-y-auto custom-dropdown ${isRecording || recordedAudio ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  placeholder={
                    isRecording
                      ? `Recording... ${recordingDuration}`
                      : recordedAudio
                        ? "Audio message ready to send..."
                        : listenToDemoEvent ? "Unable to send text message for a demo event." : "Type your message..."
                  }
                  maxLength={255}
                  disabled={isRecording || !!recordedAudio || listenToDemoEvent}
                />

                {recordedAudio && !uploadedAudioFile && (
                  <div className="mt-2 w-full max-w-[calc(100%-6rem)]">
                    <RecordedAudioPlayer
                      audioUrl={URL.createObjectURL(recordedAudio)}
                      onDelete={() => clearRecording()}
                    />
                  </div>
                )}

                {(uploadedAudioFile) && (
                  <div className="mt-2 w-[234px] relative">
                    <div className="absolute -top-3 -right-3 z-50">
                      <button
                        onClick={() => setUploadedAudioFile(null)}
                        className="w-[32px] h-[32px] flex items-center justify-center rounded-full bg-[#3D3D3D] hover:bg-[#2A2A2A] transition-opacity duration-200"
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M1 1L13 13M1 13L13 1" stroke="#848484" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      </button>
                    </div>
                    <FooterRecordedAudioPlayer src={uploadedAudioFile} />
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col w-full">
              {isRecording && (
                <div className="min-w-0 mb-3">
                  <AudioWaveform
                    isRecording={isRecording}
                    duration={recordingDuration}
                    onStop={() => stopRecordingRef.current?.()}
                    onCancel={() => stopRecording()}
                  />
                </div>
              )}

              <div className="flex items-center justify-between p-2">
                <div className="flex gap-2 md:gap-4 items-center flex-1 min-w-0">
                  <div className="flex gap-2 md:gap-4 items-center p-2 rounded-lg border border-[#3D3D3D] shrink-0">
                    <div className="flex flex-col gap-1">
                      <div className="text-sm font-semibold leading-none text-white whitespace-nowrap">
                        Tip
                      </div>
                      <div className="w-full text-xs font-normal leading-none text-[#EF4444]">
                        Min $1.00
                      </div>
                    </div>
                    <div className="w-3.5 -rotate-90 border border-[#3D3D3D]"></div>
                    <div className={`flex-1 text-sm leading-none text-right font-normal ${determineTextColor()}`}>
                      <input
                        disabled={listenToDemoEvent}
                        name="inputTipAmount"
                        placeholder="$0.00"
                        value={inputTipAmount}
                        onChange={handleTipAmountChange}
                        onKeyDown={handleKeyDown}
                        onFocus={handleFocus}
                        className={`bg-transparent border-none border-transparent focus:border-transparent focus:ring-0 w-auto min-w-[50px] max-w-full px-0 py-2  ${listenToDemoEvent ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                        style={{ width: `${inputTipAmount.length}ch` }}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 items-center shrink-0">
                    <button
                      onClick={() => setIsSampleModalOpen(true)}
                      className={`text-dimGray p-2 rounded-lg ${isThread
                          ? "cursor-not-allowed pointer-events-none"
                          : "cursor-pointer hover:bg-[#202327]"
                        }`}
                      disabled={isThread}
                      title={isThread ? "Cannot send samples in a thread" : "Select from your samples"}
                    >
                      <AudioFileIconFromSample />
                    </button>

                    <AudioRecorder
                      onStopRef={stopRecordingRef}
                    />

                    <div
                      className={`${isThread
                          ? "cursor-not-allowed"
                          : "cursor-pointer"
                        }`}
                    >
                      <input
                        type="file"
                        accept="audio/*"
                        ref={fileInputRef}
                        onChange={handleAudioSelector}
                        style={{ display: "none" }}
                      />
                      <button
                        onClick={handleButtonClick}
                        className={`text-dimGray cursor-${isSendDemoAvailable && !isThread ? 'pointer' : 'not-allowed'} p-2 rounded-lg ${isSendDemoAvailable && !isThread ? 'hover:bg-[#202327]' : ''
                          }`}
                        disabled={!isSendDemoAvailable || isThread}
                        title={!isSendDemoAvailable ? "User currently is not accepting demos" : ""}
                      >
                        <div className="relative">
                          <AudioFileIcon />
                          {!isSendDemoAvailable || isThread && (
                            <div className="absolute inset-0 flex items-center justify-center" style={{ transform: 'scale(1.8)' }}>
                              <div className="w-full h-0.5 bg-dimGray rotate-45 transform origin-center" />
                            </div>
                          )}
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 ml-2">
                  <div className="flex items-center justify-end text-sm font-normal leading-none whitespace-nowrap min-w-[4rem]" style={{ color: messageInputValue.length >= 255 ? '#EF4444' : '#848484' }}>
                    {messageInputValue.length} / 255
                  </div>

                  <div
                    className={`${!isSendButtonDisabled && !isSubmitting ? "cursor-pointer" : "cursor-not-allowed"
                      }`}
                  >
                    <div
                      onClick={() => {
                        if (!isSendButtonDisabled && !isSubmitting) {
                          handleSendMessage();
                        }
                      }}
                      className={`flex items-center justify-center w-11 h-11 ${!isSendButtonDisabled && !isSubmitting
                          ? "text-[#9EFF00] pointer-events-auto"
                          : "text-[#242424] pointer-events-none"
                        }`}
                    >
                      {isSubmitting ? (
                        <CircularProgress
                          sx={{
                            width: "24px",
                            height: "24px",
                            color: "#9EFF00",
                          }}
                        />
                      ) : (
                        <SendArrowIcon className="w-6 h-6" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <PurchaseOrderDialog
        {...{
          openPurchaseOrder: openPurchaseOrder,
          demoFile: uploadedAudioFile,
          setOpenPurchaseOrder,
          activeConversation,
          handleSendMessage: () => handleSendMessage(),
          setIsSubmitting,
          messageInputValue,
          clearMessageInputs,
          handleButtonClick
        }}
      />

      <SampleModalFooter
        open={isSampleModalOpen}
        onClose={() => setIsSampleModalOpen(false)}
        onSelect={handleSampleSelect}
        userId={activeConversation?.user?.id}
        recipientId={activeConversation?.user?.id}
        conversationId={activeConversation?.conversation_id}
      />
    </>
  );
};

export default Footer;
