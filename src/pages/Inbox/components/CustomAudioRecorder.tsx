import { useState, useEffect, useRef, useCallback, memo } from "react";
import { ReactComponent as MicIcon } from "../../../assets/icons/micIcon.svg";
import { ReactComponent as CheckIcon } from "../../../assets/icons/checkIcon.svg";

interface CustomAudioRecorderProps {
  onRecordingComplete: (blob: Blob, duration: string) => void;
  onDurationChange: (duration: string) => void;
  onRecordingStateChange: (isRecording: boolean) => void;
  onStopRef: React.MutableRefObject<(() => void) | null>;
  onDelete?: () => void;
}

const buttonStyles = "p-2 rounded-lg hover:bg-[#202327]";

const CustomAudioRecorder = memo(({
  onRecordingComplete,
  onDurationChange,
  onRecordingStateChange,
  onStopRef,
  onDelete,
}: CustomAudioRecorderProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState("0:00");
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const timerInterval = useRef<NodeJS.Timeout | null>(null);
  const startTime = useRef<number | null>(null);
  const chunks = useRef<Blob[]>([]);

  const formatDuration = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);

  const getMimeType = () => {
    const formats = [
      'audio/mp4',
      'audio/mp4;codecs=mp4a.40.5', // AAC-HE
      'audio/mp4;codecs=mp4a.40.2', // AAC-LC
      'audio/mpeg',                 // MP3
      'audio/aac'                   // Raw AAC
    ];
    
    for (const format of formats) {
      if (MediaRecorder.isTypeSupported(format)) {
        console.log('Using format:', format);
        return format;
      }
    }
    
    console.error('No cross-compatible format found');
    return '';
  };

  const startRecording = useCallback(async () => {
    try {
      if (onDelete) {
        onDelete();
      }
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          channelCount: 1,
          sampleRate: 44100,
          echoCancellation: true,
          noiseSuppression: true
        } 
      });
      
      const mimeType = getMimeType();
      const recorder = new MediaRecorder(stream, {
        mimeType,
        audioBitsPerSecond: 128000
      });
      mediaRecorder.current = recorder;
      chunks.current = [];

      recorder.ondataavailable = (e: BlobEvent) => {
        chunks.current.push(e.data);
      };

      recorder.onstop = async () => {
        const finalDuration = formatDuration(Math.floor((Date.now() - startTime.current!) / 1000));
        const blob = new Blob(chunks.current, {
          type: mediaRecorder.current?.mimeType || mimeType 
        });
        onRecordingComplete(blob, finalDuration);
        chunks.current = [];
      };

      recorder.start();
      setIsRecording(true);
      onRecordingStateChange(true);
      
      startTime.current = Date.now();
      timerInterval.current = setInterval(() => {
        const currentDuration = (Date.now() - startTime.current!) / 1000;
        const formattedDuration = formatDuration(currentDuration);
        setDuration(formattedDuration);
        onDurationChange(formattedDuration);
      }, 1000);
    } catch (err) {
      console.error("Error starting recording:", err);
    }
  }, [onDelete, formatDuration, onRecordingComplete, onRecordingStateChange, onDurationChange]);

  const stopRecording = useCallback(() => {
    if (!mediaRecorder.current) return;
    
    mediaRecorder.current.stop();
    mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
    setIsRecording(false);
    onRecordingStateChange(false);
    
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
      timerInterval.current = null;
    }
    setDuration("0:00");
    onDurationChange("0:00");
  }, [onRecordingStateChange, onDurationChange]);

  useEffect(() => {
    return () => {
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
      }
      if (mediaRecorder.current && isRecording) {
        mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isRecording]);

  useEffect(() => {
    if (onStopRef) {
      onStopRef.current = stopRecording;
    }
  }, [onStopRef, stopRecording]);

  return (
    <div>
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={buttonStyles}
      >
        {isRecording ? (
          <CheckIcon className="text-[#9EFF00] w-6 h-6" />
        ) : (
          <MicIcon className="text-[#848484]" />
        )}
      </button>
    </div>
  );
});

CustomAudioRecorder.displayName = 'CustomAudioRecorder';

export default CustomAudioRecorder;
