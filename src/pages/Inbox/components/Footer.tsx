import { useState, useEffect, useRef, useMemo } from "react";
import { ReactComponent as SendArrowIcon } from "../../../assets/icons/sendArrowIcon.svg";
import { ReactComponent as AudioFileIcon } from "../../../assets/icons/audioFile.svg";
import { AudioRecorder } from "react-audio-voice-recorder";
import PurchaseOrderDialog from "./PurchaseOrderDialog";
import { replyToMessage, sendInboxMessage } from "api/messenger";
import { IConversation, ICurrentUser, IMessage } from "./types";
import { AudioPlayer } from "react-audio-play";
import { uploadMedia } from "api/sounds";
import { ReactComponent as MicIcon } from "../../../assets/icons/micIcon.svg";
import { ReactComponent as CheckIcon } from "../../../assets/icons/checkIcon.svg";
import AudioWaveform from "components/util/AudioWaveform";
import CustomAudioRecorder from "./CustomAudioRecorder";
import RecordedAudioPlayer from './RecordedAudioPlayer';

type Props = {
  conversation: IConversation;
  setOverlayLoading?: (value: boolean) => void;
  getConversationMessages?: (conversation: IConversation) => Promise<void>;
  isFeedbackSection?: boolean;
  currentUserInfo?: ICurrentUser;
  messageObj?: IMessage;
  messageId?: string;
};

const Footer = ({
  conversation,
  setOverlayLoading,
  getConversationMessages,
  isFeedbackSection,
  currentUserInfo,
  messageObj,
  messageId,
}: Props) => {
  const { recipient_id } = conversation || {};

  const [openPurchaseOrder, setOpenPurchaseOrder] = useState(false);
  const [creditPaymentAmount, setCreditPaymentAmount] = useState(0);
  const [selectedAudioFile, setSelectedAudioFile] = useState<File | null>(null);
  const [recordedAudio, setRecordedAudio] = useState<File | null>(null);
  const [messageInputValue, setMessageInputValue] = useState("");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [audioMediaId, setAudioMediaId] = useState<number | null>(null);
  const [recordingDuration, setRecordingDuration] = useState("0:00");
  const [isRecording, setIsRecording] = useState(false);
  const stopRecordingRef = useRef(null);
  const [isCancelled, setIsCancelled] = useState(false);
  const isCancelledRef = useRef(false);

  const canSendMessage =
    messageInputValue.trim() &&
    ((!isFeedbackSection) || (isFeedbackSection && (recordedAudio || messageInputValue)));

  const validateFile = (file: File): File | null =>
    file.type.startsWith("audio/") ? file : null;

  const handleAudioSelector = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = validateFile(e.target.files?.[0]);
    if (file) {
      setSelectedAudioFile(file);
    }
    e.target.value = "";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageInputValue(e.target.value);
    // Ensure this does not affect recordedAudio or selectedAudioFile
  };

  const handleSendMessage = async () => {
    try {
      if (selectedAudioFile) {
        const uploadSuccess = await handleUploadMedia(selectedAudioFile, 'demo');
        if (!uploadSuccess) {
          console.error("Demo upload failed");
        }
        return; // Don't call sendMessageToBackend here - useEffect will handle it
      } else if (recordedAudio) {
        const uploadSuccess = await handleUploadMedia(recordedAudio, 'recording');
        if (!uploadSuccess) {
          console.error("Audio upload failed");
        }
        return; // Don't call sendMessageToBackend here - useEffect will handle it
      }
      // Only send immediately if there's no file to upload
      await sendMessageToBackend();
    } catch (error) {
      console.error("Error in handleSendMessage:", error);
    }
  };

  const handlePurchaseOrder = async () => {
    if (selectedAudioFile) {
      setOpenPurchaseOrder(true);
    }
    else {
      await handleSendMessage();
    }
  }

  const sendMessageToBackend = async () => {
    try {
      if (messageInputValue.length === 0 && !audioMediaId && !selectedAudioFile && !recordedAudio) return;
      
      setOverlayLoading?.(true);
      const isDemo = Boolean(selectedAudioFile || recordedAudio);

      if (!isFeedbackSection) {
        const payload = { 
          senderId: String(currentUserInfo?.id || ''),
          recipientId: String(recipient_id || ''),
          message: String(messageInputValue || ''),
          conversationId: String(conversation.id || ''),
          creditPaymentAmount: String(creditPaymentAmount || '0'),
          isDemo: String(isDemo),
          audioMediaId: String(audioMediaId || ''),
        };
        await sendInboxMessage(payload);
      } else {
        // Create FormData for reply
        const formData = new FormData();
        formData.append('messageId', String(messageId));
        formData.append('replyContent', messageInputValue || '');
        formData.append('senderId', String(currentUserInfo?.id || ''));
        formData.append('recipientId', String(recipient_id || ''));
        formData.append('isDemoReply', String(isDemo));
        
        if (selectedAudioFile) {
          formData.append('audioFile', selectedAudioFile);
        } else if (recordedAudio) {
          formData.append('audioFile', recordedAudio);
        }

        await replyToMessage(formData);
      }

      await getConversationMessages?.(conversation);
      setMessageInputValue("");
      setAudioMediaId(null);
      setRecordedAudio(null);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setOverlayLoading?.(false);
      setSelectedAudioFile(null);
      setCreditPaymentAmount(0);
    }
  };

  useEffect(() => {
    if (audioMediaId) {
      sendMessageToBackend();
    }
  }, [audioMediaId]);

  const handleRecordingComplete = (blob: Blob) => {
    if (isCancelledRef.current) {
      setIsCancelled(false);
      isCancelledRef.current = false;
      setRecordingDuration("");
      setRecordedAudio(null);
      return;
    }
    
    // Always save as MP3 regardless of input format
    const file = new File([blob], "recording.mp3", { type: 'audio/mpeg' });
    setRecordedAudio(file);
  };

  const trackUploadProgress = async (redisKey: string) => {
    const eventSource = new EventSource(
      `${process.env.REACT_APP_API_URL}/sounds/upload/sample/progress/${redisKey}`
    );
    
    eventSource.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      setUploadProgress(data.progress);
      if (data.progress === 100) {
        eventSource.close();
        setAudioMediaId(data.metadata.id);
      } else if (data.progress === -1) {
        eventSource.close();
        console.error("Upload failed");
      }
    };

    eventSource.onerror = () => {
      eventSource.close();
    };
  };

  const handleUploadMedia = async (
    file: File,
    type: 'demo' | 'recording'
  ) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    setUploadProgress(0);

    try {
      const response = await uploadMedia(formData);
      await trackUploadProgress(response.data.redis_key);
      return true;
    } catch (error) {
      console.error("Upload error:", error);
      return false;
    }
  };

  const handleDurationChange = (duration: string) => {
    console.log(duration);
    setRecordingDuration(duration);
  };

  const handleRecordingStateChange = (recordingState: boolean) => {
    setIsRecording(recordingState);
  };

  const handleCancel = () => {
    setIsCancelled(true);
    isCancelledRef.current = true;
    stopRecordingRef.current?.();
    setRecordedAudio(null);
    setRecordingDuration("");
    setIsRecording(false);
  };

  // Add memoization for the audio URL
  const recordedAudioUrl = useMemo(() => {
    return recordedAudio ? URL.createObjectURL(recordedAudio) : null;
  }, [recordedAudio]);

  // Add memoization for the selected audio URL
  const selectedAudioUrl = useMemo(() => {
    return selectedAudioFile ? URL.createObjectURL(selectedAudioFile) : null;
  }, [selectedAudioFile]);

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
            <div className="flex flex-col w-full">
              <div className="relative p-2.5">
                <textarea
                  value={messageInputValue}
                  onChange={handleInputChange}
                  className="resize-none bg-transparent border-none w-full text-base text-[#ACD7FF] focus:ring-0 pb-16"
                  placeholder="Type your message..."
                />
                
                {recordedAudio && !selectedAudioFile && recordedAudioUrl && (
                  <div className="absolute bottom-0 left-2.5 w-full max-w-[calc(100%-6rem)]">
                    <RecordedAudioPlayer 
                      key={recordedAudioUrl}
                      audioUrl={recordedAudioUrl}
                      onDelete={() => setRecordedAudio(null)}
                    />
                  </div>
                )}
                
                {selectedAudioFile && selectedAudioUrl && (
                  <div className="absolute bottom-0 left-2.5 w-[234px]">
                    <AudioPlayer
                      key={selectedAudioUrl}
                      src={selectedAudioUrl}
                      color="#B2B2B2"
                      sliderColor="#B7B7B7"
                      style={{
                        background: "#242424",
                        borderRadius: "40px",
                      }}
                      className="border border-[#3D3D3D] rounded-full [&_.rap-pp-icon_path]:!fill-[#1C1C1C] [&_.rap-volume]:hidden [&_.rap-controls]:!mx-2 [&_.rap-slider]:!mx-2  [&_.rap-slider]:!bg-[#4B4B4B] [&_.rap-slider]:!h-[2px]"
                    />
                    {uploadProgress > 0 && uploadProgress <= 100 && (
                      <div className="absolute -top-3 right-0 flex items-center">
                        <svg className="w-[32px] h-[32px] -rotate-90" viewBox="0 0 70 70">
                          <circle
                            cx="35"
                            cy="35"
                            r="25"
                            fill="#3D3D3D"
                            className="stroke-[#3D3D3D]"
                            strokeWidth="5"
                          />
                          <circle
                            cx="35"
                            cy="35"
                            r="25"
                            fill="none"
                            className="stroke-[#A4FF3D]"
                            strokeWidth="5"
                            strokeDasharray={2 * Math.PI * 25}
                            strokeDashoffset={(2 * Math.PI * 25) * (1 - uploadProgress / 100)}
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                    )}
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
                    onCancel={handleCancel}
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

                  <div className={`${isFeedbackSection ? "cursor-not-allowed" : "cursor-pointer"}`}>
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

                  <CustomAudioRecorder
                    onRecordingComplete={handleRecordingComplete}
                    onDurationChange={handleDurationChange}
                    onRecordingStateChange={handleRecordingStateChange}
                    onStopRef={stopRecordingRef}
                    onDelete={() => setRecordedAudio(null)}
                  />
                </div>

                <div className="shrink-0">
                  <div
                    className={`${canSendMessage ? "cursor-pointer" : "cursor-not-allowed"}`}
                  >
                    <div
                      onClick={canSendMessage ? handlePurchaseOrder : undefined}
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
