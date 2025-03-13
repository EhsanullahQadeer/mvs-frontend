import { CheckIcon } from '@heroicons/react/24/solid';
import { ReactComponent as MicIcon } from '../../../../../assets/icons/micIcon.svg';
import React, { createContext, useState, useContext, useRef, useCallback, useEffect, memo } from 'react';

const formatDuration = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

interface AudioRecordingContextType {
  isRecording: boolean;
  recordedAudio: Blob | null;
  recordingDuration: number;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
  clearRecording: () => void;
}

const AudioRecordingContext = createContext<AudioRecordingContextType | undefined>(undefined);

export const useAudioRecording = () => {
  const context = useContext(AudioRecordingContext);
  if (!context) {
    throw new Error('useAudioRecording must be used within an AudioRecordingProvider');
  }
  return context;
};

export const AudioRecordingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<Blob | null>(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioStream = useRef<MediaStream | null>(null);
  const timerInterval = useRef<NodeJS.Timeout | null>(null);
  const startTime = useRef<number | null>(null);
  const chunks = useRef<Blob[]>([]);

  const getMimeType = useCallback(() => {
    const formats = [
      'audio/webm;codecs=opus',
      // 'audio/mp3',
      // 'audio/webm;codecs=opus',
      // 'audio/ogg;codecs=opus',
      // 'audio/mp4',
      // 'audio/mp4;codecs=mp4a.40.5', // AAC-HE
      // 'audio/mp4;codecs=mp4a.40.2', // AAC-LC
      // 'audio/aac',                  // Raw AAC
    ];
    
    for (const format of formats) {
      if (MediaRecorder.isTypeSupported(format)) {
        console.log('Using format:', format);
        return format;
      }
    }
    
    console.log('Using browser default format');
    return '';
  }, []);

  // Pre-initialize the audio system
  const initializeAudioSystem = useCallback(async () => {
    try {
      if (isInitialized) return;
      
      //console.log("Pre-initializing audio system...");
      
      // Request permissions and get the audio stream
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          channelCount: 1,
          sampleRate: 44100,
          echoCancellation: true,
          noiseSuppression: true
        } 
      });
      
      // Store the stream for later use
      audioStream.current = stream;
      
      // Stop all tracks to save resources, but keep the stream reference
      stream.getTracks().forEach(track => track.stop());
      
      setIsInitialized(true);
      //console.log("Audio system pre-initialized");
    } catch (err) {
      console.error("Error pre-initializing audio system:", err);
    }
  }, [isInitialized]);

  // Modified startRecording to use the pre-initialized system
  const startRecording = useCallback(async () => {
    try {
      // Clear any existing recording
      setRecordedAudio(null);
      
      // Set a flag to indicate we're preparing to record
      setIsRecording(true);
      
      // Get a fresh audio stream only when starting recording
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          channelCount: 1,
          sampleRate: 44100,
          echoCancellation: true,
          noiseSuppression: true
        } 
      });
      
      audioStream.current = stream;
      
      const mimeType = getMimeType();
      console.log("Selected recording format:", mimeType);
      
      const recorder = new MediaRecorder(stream, {
        mimeType,
        audioBitsPerSecond: 96000
      });
      mediaRecorder.current = recorder;
      chunks.current = [];

      recorder.ondataavailable = (e: BlobEvent) => {
        // Only add chunks that have actual data
        if (e.data.size > 0) {
          console.log("Received audio chunk of size:", e.data.size, "bytes");
          chunks.current.push(e.data);
        } else {
          console.warn("Received empty audio chunk");
        }
      };

      recorder.onstop = async () => {
        console.log("Recording stopped, total chunks:", chunks.current.length);
        
        if (chunks.current.length === 0) {
          console.log("No audio data recorded");
          setRecordedAudio(null);
          setRecordingDuration(0);
          return;
        }
        
        // Calculate duration based on start and end time
        const calculatedDurationSeconds = Math.floor((Date.now() - startTime.current!) / 1000);
        console.log("Calculated recording duration (seconds):", calculatedDurationSeconds);
        
        const blob = new Blob(chunks.current, {
          type: mediaRecorder.current?.mimeType || mimeType 
        });
        
        console.log("Created final blob of size:", blob.size, "bytes with type:", blob.type);
        
        if (blob.size > 0) {
          const blobWithDuration = blob as Blob & { duration?: number };
          blobWithDuration.duration = calculatedDurationSeconds;
          
          setRecordedAudio(blobWithDuration);
          setRecordingDuration(calculatedDurationSeconds);
        } else {
          console.log("Empty audio blob created");
          setRecordedAudio(null);
          setRecordingDuration(0);
        }
        
        chunks.current = [];
      };

      // Start the timer before starting the recorder
      startTime.current = Date.now();
      timerInterval.current = setInterval(() => {
        const currentDuration = Math.floor((Date.now() - startTime.current!) / 1000);
        setRecordingDuration(currentDuration);
      }, 1000);
      
      // Start the recorder with a smaller timeslice to get more frequent chunks
      recorder.start(100);
    } catch (err) {
      console.error("Error starting recording:", err);
      setIsRecording(false);
    }
  }, [getMimeType]);

  const stopRecording = useCallback(() => {
    if (!mediaRecorder.current) return;
    
    mediaRecorder.current.stop();
    mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
    setIsRecording(false);
    
    if (timerInterval.current) {
      clearInterval(timerInterval.current);
      timerInterval.current = null;
    }
  }, []);

  const clearRecording = useCallback(() => {
    setRecordedAudio(null);
    setRecordingDuration(0);
  }, []);

  useEffect(() => {
    return () => {
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
      }
      if (mediaRecorder.current && isRecording) {
        mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
      }
      if (audioStream.current) {
        audioStream.current.getTracks().forEach(track => track.stop());
        audioStream.current = null;
      }
    };
  }, []);

  const value = {
    isRecording,
    recordedAudio,
    recordingDuration,
    startRecording,
    stopRecording,
    clearRecording
  };

  return (
    <AudioRecordingContext.Provider value={value}>
      {children}
    </AudioRecordingContext.Provider>
  );
};

interface AudioRecorderProps {
  onStopRef?: React.MutableRefObject<(() => void) | null>;
  onDelete?: () => void;
}

const buttonStyles = "p-2 rounded-lg hover:bg-[#202327]";

const AudioRecorder = memo(({
  onStopRef,
  onDelete,
}: AudioRecorderProps) => {
  const { 
    isRecording, 
    startRecording, 
    stopRecording, 
    recordingDuration 
  } = useAudioRecording();

  // Format the duration for display
  const formattedDuration = formatDuration(recordingDuration);

  // Handle the onDelete callback
  const handleStartRecording = async () => {
    if (onDelete) {
      onDelete();
    }
    await startRecording();
  };

  // Set the stopRecording function to the ref so it can be called from outside
  useEffect(() => {
    if (onStopRef) {
      onStopRef.current = stopRecording;
    }
  }, [onStopRef, stopRecording]);

  return (
    <div>
      <button
        onClick={isRecording ? stopRecording : handleStartRecording}
        className={buttonStyles}
      >
        {isRecording ? (
          <>
            <CheckIcon className="text-[#9EFF00] w-6 h-6" />
            <span>{formattedDuration}</span>
          </>
        ) : (
          <MicIcon className="text-[#848484]" />
        )}
      </button>
    </div>
  );
});

AudioRecorder.displayName = 'AudioRecorder';

export default AudioRecorder; 