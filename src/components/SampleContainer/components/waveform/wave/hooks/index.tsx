/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import { useCallback, useContext, useEffect, useState } from 'react'
import { generateSegments } from '../../utils'
import { AudioTrack, Metadata, PlayState } from '../../types'
import { waveformCtx } from '../../context'

export const useWave = (
  track: AudioTrack,
  count: number = 60,
  audioRef: React.RefObject<HTMLAudioElement> // Accept audioRef here
) => {
  const { playState, _: fns } = useContext(waveformCtx);
  const { setMetadata } = fns;
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [segments, setSegments] = useState<number[]>([]);
  const isCurrent = playState.id === track.id;
  const isCurrentPlaying = isCurrent && playState.playing;

  // Generate the segments based on the track and count
  const createSegments = useCallback(async () => {
    const { duration, segments } = await generateSegments(track.src, count);
    setDuration(duration);
    setSegments(segments);
  }, [count, track]);

  // Recalculate segment duration based on actual audio duration (from audioRef)
  const segmentDuration = duration / count;

  // Update activeIndex based on audio currentTime and segmentDuration
  const updateActiveIndex = useCallback(() => {
    if (isCurrentPlaying && audioRef.current && audioRef.current.duration > 0) {
      const currentTime = audioRef.current.currentTime;
      const calculatedIndex = Math.min(
        Math.floor((currentTime / audioRef.current.duration) * count),
        count - 1
      );

      // Only update if the calculated index is different from current
      if (calculatedIndex !== activeIndex) {
        setActiveIndex(calculatedIndex);
      }
    }
  }, [isCurrentPlaying, audioRef, activeIndex, count]);

  // Reset the active index when track finishes
  const resetActiveIndex = useCallback(() => {
    setActiveIndex(0);
  }, []);

  // Update the metadata when the track is armed and playing
  const updateMetadata = useCallback(
    (duration: number) => {
      setMetadata((prev: Metadata) => ({
        ...prev,
        ms: 0,
        seconds: 0,
        minutes: 0,
        duration,
      }));
    },
    [setMetadata]
  );

  // Update metadata when the track starts playing
  useEffect(() => {
    if (isCurrentPlaying) {
      updateMetadata(duration);
    }
  }, [duration, isCurrentPlaying, updateMetadata]);

  // Sync segment index with current audio time more frequently
  useEffect(() => {
    const interval = setInterval(() => {
      updateActiveIndex();
    }, 100); // Check every 100ms to update the active index

    return () => {
      clearInterval(interval);
    };
  }, [isCurrentPlaying, updateActiveIndex]);

  // Generate segments when the track changes
  useEffect(() => {
    createSegments();
  }, [createSegments]);

  return {
    activeIndex,
    duration,
    isCurrentPlaying,
    segments,
    updateMetadata,
  };
};

export const usePlayerControls = () => {
  const { _: { setMetadata, setPlayState } } = useContext(waveformCtx)

  const playPause = useCallback((
    elapsed: number, 
    duration: number, 
    pause: boolean = false
  ) => {
      setPlayState((prev: PlayState) => ({
        ...prev,
        elapsed,
        ...(pause ? { playing: false } : {}),
        completed: elapsed === duration,
      }))
      setMetadata((prev: Metadata) => ({
        ...prev,
        playing: elapsed < duration && !pause,
      }))
    }, [setMetadata, setPlayState]
  )

  const playing = useCallback((currentTime: number) => {
    const ms = currentTime * 1000
    setPlayState((prev: PlayState) => ({
      ...prev,
      elapsed: ms,
    }))
    setMetadata((prev: Metadata) => ({
      ...prev,
      playing: true,
      ms,
      seconds: Math.floor(ms / 1000),
      minutes: Math.floor(ms / 60000),
    }))
  }, [setMetadata, setPlayState])

  return { playing, playPause }
}