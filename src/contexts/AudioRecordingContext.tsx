import React, { createContext, useState, useContext, useRef, useCallback } from 'react';

interface AudioRecordingContextType {
  isRecording: boolean;
  recordedAudio: Blob | null;
  recordingDuration: string;
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
  const [recordingDuration, setRecordingDuration] = useState('0:00');
  
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const timerInterval = useRef<NodeJS.Timeout | null>(null);
  const startTime = useRef<number | null>(null);
  const chunks = useRef<Blob[]>([]);

  const formatDuration = useCallback((seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }, []);

  const getMimeType = useCallback(() => {
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
  }, []);

  const startRecording = useCallback(async () => {
    try {
      // Clear any existing recording
      setRecordedAudio(null);
      
      // Set a flag to indicate we're preparing to record
      setIsRecording(true);
      
      // Get the audio stream first
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          channelCount: 1,
          sampleRate: 44100,
          echoCancellation: true,
          noiseSuppression: true
        } 
      });
      
      // Add a small delay to let the audio system stabilize
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mimeType = getMimeType();
      const recorder = new MediaRecorder(stream, {
        mimeType,
        audioBitsPerSecond: 128000
      });
      mediaRecorder.current = recorder;
      chunks.current = [];

      recorder.ondataavailable = (e: BlobEvent) => {
        // Only add chunks that have actual data
        if (e.data.size > 0) {
          chunks.current.push(e.data);
        }
      };

      recorder.onstop = async () => {
        if (chunks.current.length === 0) {
          console.log("No audio data recorded");
          setRecordedAudio(null);
          setRecordingDuration('0:00');
          return;
        }
        
        const finalDuration = formatDuration(Math.floor((Date.now() - startTime.current!) / 1000));
        const blob = new Blob(chunks.current, {
          type: mediaRecorder.current?.mimeType || mimeType 
        });
        
        // Only set the recorded audio if we have actual data
        if (blob.size > 0) {
          setRecordedAudio(blob);
          setRecordingDuration(finalDuration);
        } else {
          console.log("Empty audio blob created");
          setRecordedAudio(null);
          setRecordingDuration('0:00');
        }
        
        chunks.current = [];
      };

      // Start the timer before starting the recorder
      startTime.current = Date.now();
      timerInterval.current = setInterval(() => {
        const currentDuration = (Date.now() - startTime.current!) / 1000;
        const formattedDuration = formatDuration(currentDuration);
        setRecordingDuration(formattedDuration);
      }, 1000);
      
      // Start the recorder with a smaller timeslice to get more frequent chunks
      recorder.start(100);
    } catch (err) {
      console.error("Error starting recording:", err);
      setIsRecording(false);
    }
  }, [formatDuration, getMimeType]);

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
    setRecordingDuration('0:00');
  }, []);

  // Clean up on unmount
  React.useEffect(() => {
    return () => {
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
      }
      if (mediaRecorder.current && isRecording) {
        mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isRecording]);

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