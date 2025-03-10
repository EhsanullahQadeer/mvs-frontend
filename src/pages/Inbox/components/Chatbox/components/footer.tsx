import { uploadMedia } from "api/sounds";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import { AudioPlayer } from "react-audio-play";
import { CircularProgress } from "@mui/material";
import { useMessenger } from "api/messenger/context";
import AudioWaveform from "components/util/AudioWaveform";
import React, { useState, useEffect, useRef } from "react";
import PurchaseOrderDialog from "../../PurchaseOrderDialog";
import { IMessage } from "api/messenger/objects/states.types";
import { sendMessage, sendMessageReplyWithFormData } from "api/messenger/";
import { ISendMessage } from "api/messenger/objects/api.interfaces";
import { ReactComponent as AudioFileIcon } from "../../../../../assets/icons/audioFile.svg";
import { ReactComponent as SendArrowIcon } from "../../../../../assets/icons/sendArrowIcon.svg";
import axiosInstance from "api/axios";
import { useChatbox } from "../context";

import RecordedAudioPlayer from "../../RecordedAudioPlayer";
import AudioRecorder from './audioRecorder';
import { useAudioRecording } from './audioRecorder';
import { toast } from "react-toastify";

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

  const [tipAmount, setTipAmount] = useState(0);
















  const authUser = useSelector((state: RootState) => state.auth?.user);
  const [uploadedAudioFile, setUploadedAudioFile] = useState<File | null>(null);
  const [audioMediaId, setAudioMediaId] = useState<number | null>(null);
  const [openPurchaseOrder, setOpenPurchaseOrder] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [messageInputValue, setMessageInputValue] = useState("");
  const [reloadComponent, setReloadComponent] = useState(false);
  const [showTipMessage, setShowTipMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>();
  const stopRecordingRef = useRef<(() => void) | null>(null);
  const isCancelledRef = useRef(false);
  const [allowSend, setAllowSend] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Create a ref for the file input




  // Fix the logic - button should be disabled when there's nothing to send
  const isSendButtonDisabled = messageInputValue.length === 0 && !recordedAudio && !uploadedAudioFile;








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
    if(messageInputValue.trim().length > 0 || uploadedAudioFile !== null || isRecording) {
      setAllowSend(true);
    } else { setAllowSend(false); }
    //setAllowSend(canSendMessage(messageInputValue.length > 0, 0, recordedAudio !== null || selectedAudioFile !== null))
  }, [messageInputValue, uploadedAudioFile, isRecording]);

  // const canSendMessage = 
  //   messageInputValue.trim() &&
  //   (!isFeedbackSection ||
  //     (isFeedbackSection && (recordedAudio || messageInputValue)));

  const validateFile = (file: File): File | null =>
    file.type.startsWith("audio/") ? file : null;

  const handleButtonClick = () => {
    fileInputRef.current?.click(); // Programmatically click the hidden file input
  };
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMessageInputValue(e.target.value);
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
      // refreshMessages();
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
    // setRecordedAudio(null);
    setAudioMediaId(null);
    // setRecordingDuration("");
    // setOpenPurchaseOrder(false);
    setTipAmount(0);
    // setIsSubmitting(false);
    // setIsRecording(false);
    // setIsCancelled(false);
  }


  // const handleSendMessage = async () => {
  //   try {
  //     setIsSubmitting(true);
      
  //     let mediaId = null;
      
  //     // If we have a file to upload, handle that first
  //     if (uploadedAudioFile || recordedAudio) {
  //       const file = uploadedAudioFile || recordedAudio;
  //       const type = uploadedAudioFile ? "demo" : "recording";
        
  //       if (file) {
  //         console.log("Starting file upload");
          
  //         // Upload the file and get the media ID
  //         mediaId = await handleUploadMedia(file, type);
  //         console.log("Upload completed with mediaId:", mediaId);
  //       }
  //     }
      
  //     // Create the payload with the media ID we just got
  //     const isDemo = Boolean(uploadedAudioFile || recordedAudio);
  //     const payload = { 
  //       senderId: String(authUser?.id || ''),
  //       message: String(messageInputValue || ''),
  //       conversationId: String(activeConversation?.conversation_id || ''),
  //       creditPaymentAmount: isDemo ? 0 : Number(creditPaymentAmount || 0),
  //       isDemo: String(isDemo),
  //       messageType: isDemo ? "demo" : "message",
  //     } as ISendMessage;
      
  //     // Only include audioMediaId if it's a valid number greater than 0
  //     if (typeof mediaId === 'number' && mediaId > 0) {
  //       payload.audioMediaId = mediaId;
  //     }
      
  //     // Only send if we have either text or media
  //     if (messageInputValue.length > 0 || (typeof mediaId === 'number' && mediaId > 0)) {
  //       console.log("Sending payload:", payload);
  //       setOverlayLoading?.(true);
        
  //       if (!isThread) {
  //         await sendMessage(payload);
  //         console.log("Message sent successfully");
  //       } else {
  //         // Handle thread reply
  //         console.log("Sending thread reply");
  //         console.log("messageId value:", messages[0]?.id, "type:", typeof messages[0]?.id);
          
  //         // Make sure messageId is a valid number
  //         const parentId = parseInt(String(messages[0]?.id), 10);
  //         if (isNaN(parentId)) {
  //           console.error("Invalid messageId:", messages[0]?.id);
  //           throw new Error("Invalid message ID for reply");
  //         }
          
  //         // Create a FormData object for multipart/form-data
  //         const formData = new FormData();
  //         formData.append("parentMessageId", String(parentId));
  //         formData.append("replyContent", messageInputValue || "");
          
  //         // If we have an audio file, add it to the form data
  //         if (uploadedAudioFile) {
  //           formData.append("audioFile", uploadedAudioFile);
  //         } else if (recordedAudio) {
  //           formData.append("audioFile", recordedAudio);
  //         }
          
  //         console.log("Reply form data created");
          
  //         // Send the reply using FormData
  //         await sendMessageReplyWithFormData(formData);
  //         console.log("Reply sent successfully");
  //       }
        
  //       // Update conversation
  //       getConversationMessages({
  //         conversationId: activeConversation.conversation_id
  //       });
  //     } else {
  //       console.log("No content to send - empty message and no valid media");
  //     }
  //   } catch (error) {
  //     console.error("Error in handleSendMessage:", error);
  //   } finally {
  //     setMessageInputValue("");
  //     setAudioMediaId(null);
  //     setRecordedAudio(null);
  //     setOverlayLoading?.(false);
  //     setUploadedAudioFile(null);
  //     setCreditPaymentAmount(0);
  //     reloadData && await reloadData();
  //     setReloadComponent(true);
  //     setIsSubmitting(false);
  //   }
  // };

  // const handlePurchaseOrder = async () => {
  //   setIsSubmitting(true);
  //   if (uploadedAudioFile) {
  //     setOpenPurchaseOrder(true);
  //   } else {
  //     await handleSendMessage();
  //   }
  // };

  // const handleRecordingComplete = (blob: Blob) => {
  //   if (isCancelledRef.current) {
  //     setIsCancelled(false);
  //     isCancelledRef.current = false;
  //     setRecordingDuration("");
  //     setRecordedAudio(null);
  //     return;
  //   }

  //   // Always save as MP3 regardless of input format
  //   const file = new File([blob], "recording.mp3", { type: "audio/mpeg" });
  //   setRecordedAudio(file);
  // };

  // const handleUploadMedia = async (file: File, type: "demo" | "recording") => {
  //   const formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("type", type);

  //   console.log("Starting media upload...");
  //   console.log("Before calling uploadMedia");
    
  //   try {
  //     // Add a log right before the call
  //     console.log("About to call uploadMedia");
      
  //     // Try with a direct axios call to see if that works
  //     console.log("Making direct axios call");
  //     const directResponse = await axiosInstance.post("/sounds/upload/media", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
      
  //     console.log("Direct axios call returned:", directResponse);
      
  //     // If we get here, the direct call worked
  //     if (directResponse?.data?.media?.id) {
  //       const mediaId = directResponse.data.media.id;
  //       console.log("Setting audioMediaId to:", mediaId);
  //       setAudioMediaId(mediaId);
  //       return mediaId;
  //     } else {
  //       console.error("Unexpected response structure:", directResponse?.data);
  //       return null;
  //     }
  //   } catch (error) {
  //     console.error("Upload error:", error);
  //     // Check if it's a timeout error
  //     if (error.code === 'ECONNABORTED') {
  //       console.error("Request timed out");
  //     }
  //     // Check if it's a network error
  //     if (error.message === 'Network Error') {
  //       console.error("Network error - check server connectivity");
  //     }
  //     return null;
  //   }
  // };

  // const handleDurationChange = (duration: string) => {
  //   setRecordingDuration(duration);
  // };

  // const handleRecordingStateChange = (recordingState: boolean) => {
  //   setIsRecording(recordingState);
  // };

  // const handleCancel = () => {
  //   setIsCancelled(true);
  //   isCancelledRef.current = true;
  //   stopRecordingRef.current?.();
  //   setRecordedAudio(null);
  //   setRecordingDuration("");
  //   setIsRecording(false);
  // };

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
                    <div className="text-sm leading-none text-right whitespace-nowrap text-[#848484] font-normal w-[60px]">
                      <input
                        type="number"
                        placeholder="0.00"
                        className="bg-transparent max-w-[60px] border-none border-transparent focus:border-transparent focus:ring-0"
                        onChange={(e) => setTipAmount(Number(e.target.value))}
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
