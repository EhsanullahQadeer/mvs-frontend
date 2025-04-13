import React, { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

interface AudioPlayerProps {
  audioUrl: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl }) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurfer = useRef<WaveSurfer | null>(null);

  useEffect(() => {
    if (waveformRef.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#363A3F', // Unplayed wave color
        progressColor: '#D0D8E3', // Played wave color
        cursorColor: 'transparent',
        barWidth: 2,
        barGap: 1,
        height: 120,
        barRadius: 0,
        normalize: true,
        backend: 'WebAudio'
      });

      wavesurfer.current.load(audioUrl);

      // Handle play/pause when clicking on the waveform
      wavesurfer.current.on('interaction', () => {
        wavesurfer.current?.playPause();
      });

      return () => {
        if (wavesurfer.current) {
          wavesurfer.current.destroy();
        }
      };
    }
  }, [audioUrl]);

  return (
    <div className="bg-zinc-900 p-6 rounded-lg max-w-4xl mx-auto my-8">
      <div 
        ref={waveformRef} 
        className="w-full cursor-pointer" 
      />
    </div>
  );
};

export default AudioPlayer;
