/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import {
  WaveformContext,
  AudioTrack,
  PlayState,
  Metadata,
  ProviderProps,
  ConfigOptions,
} from '../types'
import { AudioPlayer } from '../player'
import { createContext, useEffect, useRef, useState } from 'react'

const initialPlayState: PlayState = {
  id: '',
  elapsed: 0,
  playing: false,
  completed: false,
}

const initialMetadata: Metadata = {
  playing: false,
  id: '',
  ms: 0,
  seconds: 0,
  minutes: 0,
  duration: 0,
}

const defaultOptions: ConfigOptions = {
  colors: {
    default: '#6871ff',
    active: '#68ffc9',
    past: '#68ffc9',
  },
  radius: '1.5px',
  activeHeight: '30%',
  gap: '1px',
}

export const waveformCtx = createContext<WaveformContext>({
  options: defaultOptions,
  playState: initialPlayState,
  loading: false,
  tracks: [],
  current: null,
  metadata: initialMetadata,
  _: {},
  audioRef: { current: null },
  playTrack: () => {},   // Provide a default empty function for playTrack
  pauseTrack: () => {},  // Provide a default empty function for pauseTrack
})

export function WaveformProvider({
  children,
  options = defaultOptions,
}: ProviderProps) {
  const [metadata, setMetadata] = useState<Metadata>(initialMetadata)
  const [playState, setPlayState] = useState<PlayState>(initialPlayState)
  const [loading, setLoading] = useState<boolean>(false)
  const [tracks, setTracks] = useState<AudioTrack[]>([])
  const [playing, setPlaying] = useState<boolean>(false)
  const [current, setCurrent] = useState<AudioTrack | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  const playTrack = (track: AudioTrack) => {
    // Wait for next tick to ensure audioRef is initialized
    setTimeout(() => {
      if (audioRef.current) {
        if (!(audioRef.current.src === track.src)){
          audioRef.current.src = track.src;
        }
    
        try {
          audioRef.current.play().catch((error) => {
            if (error.name === 'AbortError') {
              console.log('Playback aborted:', error);
            } else {
              console.error('Error playing track:', error);
            }
          });
        } catch (error) {
          console.error('Error initiating playback:', error);
        }
      } else {
        console.error('audioRef is still null after initialization');
      }
    }, 0);
  };

  const pauseTrack = () => {
    if (audioRef.current) {
      // Try to pause the track and catch any errors
      try {
        audioRef.current.pause();
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Pause aborted:', error); // Ignore aborted error
        } else {
          console.error('Error pausing track:', error); // Log other errors
        }
      }
    }
  };

  useEffect(() => {
    if (current) {
      setPlayState({
        ...initialPlayState,
        playing: true,
        id: current.id,
      })
      setMetadata({
        ...initialMetadata,
        id: current.id,
        playing: true,
      })
    }
  }, [current, setMetadata, setPlayState])

  const value = {
    options: { ...defaultOptions, ...options },
    current,
    loading,
    metadata,
    playState,
    tracks,
    _: {
      setCurrent,
      setLoading,
      setPlayState,
      setMetadata,
      setTracks,
    },
    audioRef,
    playTrack,
    pauseTrack,
  };
  return (
    <waveformCtx.Provider value={{ ...value }}>
      {children}
      <AudioPlayer ref={audioRef}/>
    </waveformCtx.Provider>
  )
}
