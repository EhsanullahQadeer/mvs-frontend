/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import { useContext, useEffect, useRef, useState } from 'react'
import { AudioTrack, WaveformConfig } from '../types'
import { useWave } from './hooks'
import { Segment } from './segment'
import { waveformCtx } from '../context'
import { waveStyles } from '../styles'

type WaveProps = {
  columns?: number
  trackDuration?: number
  track: AudioTrack
  options?: Partial<WaveformConfig>
  hover_cursor?: boolean
}

export const Waveform = ({
  columns = 60,
  trackDuration = 30,
  track,
  options = {},
  hover_cursor,
}: WaveProps) => {

  const containerRef = useRef<HTMLDivElement>(null)
  const { options: ctxOptions, audioRef } = useContext(waveformCtx)  // Get audioRef from context
  
  const configOptions = {
    ...ctxOptions,
    ...options,
    colors: {
      ...ctxOptions.colors,
      ...options.colors,
    },
  }
  const [actualDuration, setActualDuration] = useState<number>(0);
  
  // Calculate columns based on duration
  const calculateColumns = (duration: number) => {
    console.log('duration', duration);
    // Base ratio: 60 columns for 30 seconds
    const baseRatio = 60 / 30;
    // Calculate columns based on duration, with min and max limits
    const calculatedColumns = Math.round(duration * baseRatio);
    console.log('columns', calculatedColumns);
    return Math.min(Math.max(calculatedColumns, 40), 50);
  };

  // Calculate columns based on trackDuration
  const [dynamicColumns, setDynamicColumns] = useState(() => {
    return calculateColumns(trackDuration);
  });

  useEffect(() => {
    const newColumns = calculateColumns(trackDuration);
    setDynamicColumns(newColumns);
  }, [trackDuration]);

  const {
    activeIndex,
    duration,
    isCurrentPlaying,
    segments,
  } = useWave(track, dynamicColumns, audioRef)

  const styles = waveStyles({
    activeColor: configOptions.colors.active,
    defaultColor: configOptions.colors.default,
    duration,
    gap: configOptions.gap,
    pastColor: configOptions.colors.past,
    radius: configOptions.radius,
    segments: segments.length,
    activeHeight: configOptions.activeHeight,
  })

  const [hoverSegmentIndex, setHoverSegmentIndex] = useState<number | null>(null); // State to track the hovered segment index

  // Function to handle mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current && segments.length > 0) {
      const rect = containerRef.current.getBoundingClientRect();
      const hoverX = e.clientX - rect.left; // X position relative to the container
      const segmentWidth = rect.width / dynamicColumns; // Calculate the width of each segment
      const hoverIndex = Math.min(Math.floor(hoverX / segmentWidth), segments.length - 1); // Determine which segment is being hovered
      setHoverSegmentIndex(hoverIndex); // Update the state with the hovered segment index
    }
  };

  // Function to reset hover position when leaving the container
  const handleMouseLeave = () => {
    setHoverSegmentIndex(null); // Reset hover position when mouse leaves
  };

  // Function to handle clicks on the waveform
  const handleWaveformClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && actualDuration > 0) {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      const clickX = e.clientX - rect.left; // Get the x-coordinate of the click relative to the container
      const clickRatio = clickX / rect.width; // Calculate the ratio of the click position relative to the container width
      const newTime = Math.min(clickRatio * actualDuration, actualDuration); // Ensure we don't go beyond the duration

      audioRef.current.currentTime = newTime; // Set the audio's current time to the calculated value
      console.log(`Jumping to ${newTime} seconds in the track.`);
    }
  };
  const minHeight = 10;  // Minimum height when not hovering
  const minHoverHeight = 50;  // Minimum height when hovering
  return (
    <div
    ref={containerRef}
    onMouseMove={hover_cursor ? handleMouseMove : undefined}
    onMouseLeave={hover_cursor ? handleMouseLeave : undefined} // Reset hover position on mouse leave
    onClick={handleWaveformClick} // Handle clicks to jump to the specific time in the audio
    style={styles}
  >
    {/* Render waveform segments */}
    {segments.map((segment: number, index: number) => (
      <Segment
        key={`segment-${track.id}-${index}`}
        height={
          hover_cursor && hoverSegmentIndex === index 
            ? Math.max(segment * 3, minHoverHeight)  // Minimum height when hovering
            : Math.max(segment, minHeight)  // Minimum height when not hovering
        }
        active={activeIndex === index && isCurrentPlaying}
        past={activeIndex > index}
        backgroundColor={
          hover_cursor && hoverSegmentIndex === index
            ? 'green'
            : activeIndex >= index
            ? configOptions.colors.past
            : configOptions.colors.default
        }
      />
    ))}
  </div>
  );
}