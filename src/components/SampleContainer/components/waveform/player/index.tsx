/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import { forwardRef, useContext, useRef } from 'react'
import { playerStyles } from '../styles'
import { useAudioPlayer } from './hooks'
import { waveformCtx } from '../context';

export const AudioPlayer = forwardRef<HTMLAudioElement, {}>((props, ref) => {
  // const audioRef = useRef<HTMLAudioElement>(null)
  // const { current } = useAudioPlayer(audioRef)
  const { current } = useContext(waveformCtx);  // Get audioRef from context

  return current ? (
    <audio
      style={playerStyles}
      src={current.src}
      controls
      ref={ref}
      autoPlay
    />
  ): null
})