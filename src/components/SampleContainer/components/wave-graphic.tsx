import { CSSProperties } from "react";
const waveformStyles = {
  '--wave-animation-duration': `1000ms`,
} as CSSProperties;

export const AnimatedWaveGraphic = ({ playing }: { playing: boolean }) => {
  const classname = [
    'wave-icon', ...(playing ? ['wave-icon--playing'] : []),
  ].join(' ');

  return (
    <div className={classname} style={waveformStyles}>
      <div className="segment" />
      <div className="segment" />
      <div className="segment" />
      <div className="segment" />
      <div className="segment" />
      <div className="segment" />
    </div>
  )
}
