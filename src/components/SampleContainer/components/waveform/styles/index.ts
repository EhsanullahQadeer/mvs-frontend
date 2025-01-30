import { CSSProperties } from 'react'

export const playerStyles = {
  display: 'none',    // Show the player
  position: 'relative',  // Adjust as necessary
  opacity: 0,           // Make it visible
  visibility: 'hidden',
} as CSSProperties;

type WaveStyles = {
  duration: number
  activeColor: string
  defaultColor: string
  pastColor: string
  radius: string
  activeHeight: string
  segments: number
  gap: string
}

export const waveStyles = (
  props: WaveStyles
): CSSProperties => ({
  '--duration': `${props.duration}ms`,
  '--active-color': props.activeColor,
  '--default-color': props.defaultColor,
  '--past-color': props.pastColor,
  '--radius': props.radius,
  '--active-height': props.activeHeight,
  alignItems: 'center',
  display: 'grid',
  gridAutoFlow: 'column',
  gap: '1px',
  gridTemplateColumns: `repeat(${props.segments}, 1fr)`,
  height: '100%',
  position: 'relative',
  width: '125px',
}) as CSSProperties

type SegmentStyleProps = {
  active: boolean;
  height: string;
  past: boolean;
  backgroundColor: string;  // Add backgroundColor to props
};
export const segmentStyles = ({
  active,
  height,
  past,
  backgroundColor,  // Add backgroundColor
}: SegmentStyleProps): React.CSSProperties => {
  return {
    backgroundColor,  // Use backgroundColor passed in
    borderRadius: `var(--radius)`,
    display: 'block',
    height: height,
    maxHeight: '100%',
    position: 'relative',
    transition: 'all var(--duration) ease',
  };
};
