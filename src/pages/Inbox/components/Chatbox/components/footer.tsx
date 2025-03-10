import { toast } from "react-toastify";
import { useChatbox } from "../context";
import { uploadMedia } from "api/sounds";
import { AudioPlayer } from "react-audio-play";
import { CircularProgress } from "@mui/material";
import { useMessenger } from "api/messenger/context";
import AudioWaveform from "components/util/AudioWaveform";
import { convertToCurrencyFormat } from "utils/dateUtils";
import React, { useState, useEffect, useRef } from "react";
import PurchaseOrderDialog from "../../PurchaseOrderDialog";
import RecordedAudioPlayer from "../../RecordedAudioPlayer";
import AudioRecorder, { useAudioRecording } from './audioRecorder';
import { ReactComponent as AudioFileIcon } from "../../../../../assets/icons/audioFile.svg";
import { ReactComponent as SendArrowIcon } from "../../../../../assets/icons/sendArrowIcon.svg";

const Footer = () => {

  const {
    messages,
    activeConversation,
    getConversationMessages,
    sendMessage,
    replyInThread,
    threadMessages
  } = useMessenger();

  const { 
    isThread,
    refreshMessages
  } = useChatbox()

  const {
    isRecording,
    recordedAudio,
    recordingDuration,
    startRecording,
    stopRecording,
    clearRecording,
  } = useAudioRecording();

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

  useEffect(() => {
    if (reloadComponent) {
      setReloadComponent(false);
    }
  }, [reloadComponent]);

  const handleAudioSelector = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = validateFile(e.target.files?.[0]);
    if (file) {
      setUploadedAudioFile(file);
    }
    e.target.value = "";
  };

  useEffect(() => {
    setShowTipMessage(messageInputValue.trim().length > 0);
  }, [messageInputValue]);

  const validateFile = (file: File): File | null =>
    file.type.startsWith("audio/") ? file : null;

  const handleButtonClick = () => {
    fileInputRef.current?.click(); // Programmatically click the hidden file input
  };

  const handleSendMessage = async () => {
    setIsSubmitting(true);
    try {
      if (uploadedAudioFile) { // Send Demo
        console.log("uploadedAudioFile", uploadedAudioFile);
        console.log('sending demo');
        if (isThread) {
          toast.error("You cannot send a demos in a thread");
          return;
        }
        setOpenPurchaseOrder(true);
      } else if (!uploadedAudioFile && recordedAudio) { // Send Recording
        const file = new File([recordedAudio], `recording.${recordedAudio.type.split('/')[1]}`, { 
          type: recordedAudio.type 
        });

        const response = await uploadMedia({
          file: file,
          type: 'recording',
          duration: Number(recordingDuration),
        });

        if (!response?.data?.media?.id) {
          console.error("No media ID in response:", response);
          toast.error("Failed to upload audio file");
          return;
        }
        
        const mediaId = response.data.media.id;
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
        }
        await getConversationMessages({ conversationId: activeConversation.conversation_id });
        clearMessageInputs();
      } else {
        if (isThread) {
          await replyInThread({
            replyContent: String(messageInputValue || ''),
            parentMessageId: Number(threadMessages[0]?.id || ''),
          });
        } else {
          if (tipAmount > 0) {
            await sendMessage({
              message: String(messageInputValue || ''),
              conversationId: String(activeConversation?.conversation_id || ''),
              messageType: "tip",
              creditPaymentAmount: tipAmount,
            });
          } else {
            await sendMessage({
              message: String(messageInputValue || ''),
              conversationId: String(activeConversation?.conversation_id || ''),
              messageType: "message",
            });
          }
        }
        await getConversationMessages({ conversationId: activeConversation.conversation_id });
        clearMessageInputs();
      }
      refreshMessages();
    } catch (error) {
      console.error("Error in handleSendMessage:", error);
      toast.error("An error occurred while sending the message");
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
  }

  const handleTipAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value; // Get the current input value
    let cleanedValue = inputValue.replace("$", "");
    let updatedNumericValue = 0;
    let updatedInputValue = "";
    // Example usage:
    updatedInputValue = convertToCurrencyFormat(cleanedValue); // Output: "$0.01"
    updatedNumericValue = parseFloat(updatedInputValue.replace("$", "").replace(/,/g, ""));
    if (updatedNumericValue > MAX_TIP_AMOUNT) {
      updatedInputValue = "$1,000,000.00";
      updatedNumericValue = MAX_TIP_AMOUNT;
    }
    setInputTipAmount(updatedInputValue);
    if(updatedNumericValue >= 1) {
      setTipAmount(updatedNumericValue);
    } else {
      setTipAmount(0);
    }
  };

  function determineTextColor() {
    let updatedNumericValue = parseFloat(inputTipAmount.replace("$", "").replace(/,/g, ""));
    if(updatedNumericValue < 1) {
      if(updatedNumericValue === 0) {
        return "text-[#848484]"; // Return gray
      } else {
        return "text-[#EF4444]"; // Return red
      }
    }
    return "text-[#848484]"; // Return gray
  }

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

  return (
    <>
      <div className="sticky bottom-0">
        <div className="flex flex-col p-3 w-full bg-richBlack relative">
          <div className="flex flex-col justify-center px-3 py-2 w-full bg-[#131313] border border-[#ACD7FFCC] rounded-xl shadow-sm relative overflow-hidden">
            <div 
              className={`absolute left-0 top-0 w-full px-3 transition-all duration-500 ease-out ${
                showTipMessage ? "opacity-100 transform translate-y-2" : "opacity-0 transform -translate-y-full pointer-events-none"
              }`}
            >
              <div className="flex justify-center px-7 bg-[#f9e2dd] rounded-xl">
                <p className="py-1 text-sm font-semibold text-[#955353]">
                  Messages with tip are prioritized in the recipient inbox
                </p>
              </div>
            </div>

            <div className="flex flex-col w-full mt-10">
              <div className="relative p-2.5">
                <textarea
                  ref={textareaRef}
                  value={messageInputValue}
                  onChange={(e) => setMessageInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey && 
                      !isSubmitting && !isRecording && 
                      messageInputValue.length > 0) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  className={`resize-none bg-transparent border-none w-full text-base text-[#ACD7FF] focus:ring-0 pb-16 ${
                    isRecording || recordedAudio ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  placeholder={
                    isRecording 
                      ? `Recording... ${recordingDuration}` 
                      : recordedAudio 
                        ? "Audio message ready to send..." 
                        : "Type your message..."
                  }
                  maxLength={255}
                  disabled={isRecording || !!recordedAudio}
                />

                {recordedAudio && !uploadedAudioFile && (
                  <div className="absolute bottom-0 left-2.5 w-full max-w-[calc(100%-6rem)]">
                    <RecordedAudioPlayer
                      audioUrl={URL.createObjectURL(recordedAudio)}
                      onDelete={() => clearRecording()}
                    />
                  </div>
                )}

                {(uploadedAudioFile) && (
                  <div className="absolute bottom-0 left-2.5 w-[234px] relative">
                    <div className="absolute -top-3 -right-3 z-50">
                      <button 
                        onClick={() => setUploadedAudioFile(null)}
                        className="w-[32px] h-[32px] flex items-center justify-center rounded-full bg-[#3D3D3D] hover:bg-[#2A2A2A] transition-opacity duration-200"
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M1 1L13 13M1 13L13 1" stroke="#848484" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </button>
                    </div>
                    <AudioPlayer
                      src={URL.createObjectURL(uploadedAudioFile)}
                      color="#B2B2B2"
                      sliderColor="#B7B7B7"
                      style={{
                        background: "#242424",
                        borderRadius: "40px",
                      }}
                      className="border border-[#3D3D3D] rounded-full [&_.rap-pp-icon_path]:!fill-[#1C1C1C] [&_.rap-volume]:hidden [&_.rap-controls]:!mx-2 [&_.rap-slider]:!mx-2  [&_.rap-slider]:!bg-[#4B4B4B] [&_.rap-slider]:!h-[2px]"
                    />
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

              <div className="flex items-center justify-between mt-3">
                <div className="flex gap-4 items-center">

                  <div className="flex gap-4 items-center p-2 rounded-lg border border-[#3D3D3D]">
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
                        name="inputTipAmount"
                        placeholder="$0.00"
                        value={inputTipAmount}
                        onChange={handleTipAmountChange}
                        onKeyDown={handleKeyDown}
                        onFocus={handleFocus}
                        className="bg-transparent border-none border-transparent focus:border-transparent focus:ring-0 w-auto min-w-[50px] max-w-full px-0 py-2" // Allow the input to grow and shrink
                        style={{ width: `${inputTipAmount.length}ch` }} // Dynamically set width based on input length
                      />
                    </div>
                  </div>

                  <div
                    className={`${
                      isThread
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  >
                    <input
                      type="file"
                      accept="audio/*"
                      ref={fileInputRef}
                      onChange={handleAudioSelector}
                      style={{ display: "none" }} // Hide the input
                    />
                    <button
                      onClick={handleButtonClick} // Call the button click handler
                      className="text-dimGray cursor-pointer p-2 rounded-lg hover:bg-[#202327]"
                    >
                      <AudioFileIcon />
                    </button>
                  </div>

                  <AudioRecorder
                    onStopRef={stopRecordingRef}
                  />
                </div>
                
                <div className="shrink-0 flex items-center gap-2">
                  <div className="flex items-center justify-end text-sm font-normal leading-none" style={{ color: messageInputValue.length >= 255 ? '#EF4444' : '#848484' }}>
                    {messageInputValue.length} / 255
                  </div>

                  <div
                    className={`${
                      !isSendButtonDisabled && !isSubmitting ? "cursor-pointer" : "cursor-not-allowed"
                    }`}
                  >
                    <div
                      onClick={() => {
                        console.log("Send button clicked");  // Add this debug log
                        if (!isSendButtonDisabled && !isSubmitting) {
                          handleSendMessage();
                        }
                      }}
                      className={`flex items-center justify-center w-11 h-11 ${
                        !isSendButtonDisabled && !isSubmitting
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
          clearMessageInputs
        }}
      />
    </>
  );
};

export default Footer;
