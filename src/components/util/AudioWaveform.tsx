import React from 'react';

type AudioWaveformProps = {
  isRecording: boolean;
  duration: string;
  onStop: () => void;
  onCancel: () => void;
};

const AudioWaveform = ({ isRecording, duration, onStop, onCancel }: AudioWaveformProps) => {
  const [audioData, setAudioData] = React.useState<number[]>(() => new Array(100).fill(2));
  const audioContextRef = React.useRef<AudioContext | null>(null);
  const analyserRef = React.useRef<AnalyserNode | null>(null);
  const streamRef = React.useRef<MediaStream | null>(null);
  const animationFrameRef = React.useRef<number>();

  const startAudioAnalysis = async () => {
    try {
      streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(streamRef.current);
      
      analyserRef.current.fftSize = 512;
      analyserRef.current.smoothingTimeConstant = 0.8;
      source.connect(analyserRef.current);
      
      const updateWaveform = () => {
        if (!analyserRef.current) return;
        
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);
        
        const normalizedData = Math.max(...Array.from(dataArray.slice(0, 10)));
        const noiseThreshold = 30;
        const scaledValue = normalizedData < noiseThreshold 
          ? 0 
          : ((normalizedData - noiseThreshold) / (256 - noiseThreshold)) * 100;
        
        setAudioData(prev => [...prev.slice(1), scaledValue]);
        animationFrameRef.current = requestAnimationFrame(updateWaveform);
      };
      
      updateWaveform();
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopAudioAnalysis = React.useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = undefined;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setAudioData(new Array(100).fill(2));
  }, []);

  React.useEffect(() => {
    if (isRecording) {
      startAudioAnalysis();
    } else {
      stopAudioAnalysis();
    }
    return stopAudioAnalysis;
  }, [isRecording, stopAudioAnalysis]);

  return (
    <div className="flex items-center w-full bg-[#1C1C1C] rounded-full px-3 py-3">
      <button 
        onClick={onCancel}
        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#2A2A2A]"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1 1L13 13M1 13L13 1" stroke="#848484" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      <div className="flex-1 mx-4 h-10 overflow-hidden">
        <div className="h-8 flex items-center gap-[2px]">
          {audioData.map((value, i) => (
            <div key={i} className="w-full h-full flex items-center">
              <div
                className="w-full bg-[#00C8E0] rounded-sm transition-all duration-150"
                style={{ height: `${Math.max(value, 2)}%` }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-[#848484] text-sm">{duration}</span>
        <button 
          className="w-8 h-8 flex items-center justify-center rounded-full bg-[#9EFF00] hover:bg-[#8BE000]"
          onClick={onStop}
        >
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
            <path 
              d="M1 5L5 9L13 1" 
              stroke="#1C1C1C" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AudioWaveform; 