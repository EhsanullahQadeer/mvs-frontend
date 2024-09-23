import { useContext } from 'react';
import { waveformCtx } from '../context';
import { segmentStyles } from '../styles';

type SegmentProps = {
  active: boolean;
  height: number;
  past: boolean;
  backgroundColor: string;  // Add backgroundColor prop
};

export const Segment = ({
  active,
  height,
  past,
  backgroundColor,  // Use backgroundColor prop
}: SegmentProps) => {
  const { playState } = useContext(waveformCtx);

  // Adjust segment height based on whether it's active or not
  const segmentHeight = active
    ? `calc(${height}% + var(--active-height))`
    : `${height}%`;

  // Use the segmentStyles function and pass the backgroundColor for dynamic styling
  const styles = segmentStyles({
    active,
    height: segmentHeight,
    past: past && !playState.completed,
    backgroundColor,  // Pass backgroundColor into styles
  });

  return <i style={styles} />;
};