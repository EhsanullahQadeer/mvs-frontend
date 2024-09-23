import { RefObject, useCallback, useContext, useEffect } from 'react'
import { waveformCtx } from '../context'
import { usePlayerControls } from '../wave/hooks'
import { PlayerContext } from 'components/SampleContainer/player-container'

export const useAudioPlayer = (audioRef: RefObject<HTMLAudioElement>) => {
  const { current, playState } = useContext(waveformCtx)
  const { playing, playPause } = usePlayerControls()
  const { currentTrack, isPlaying } = useContext(PlayerContext); // Access isPlaying from context

  const onPlaying = useCallback((e: Event) => {
    const audioEl = e.target as HTMLAudioElement
    playing(audioEl.currentTime)
  }, [playing])

  const onPlayPause = useCallback((e: Event) => {
    const audioEl = e.target as HTMLAudioElement
    playPause(audioEl.currentTime, audioEl.duration, audioEl.paused)
  }, [playPause])

  const onPause = useCallback((e: Event) => {
    const audioEl = e.target as HTMLAudioElement
    playPause(audioEl.currentTime, audioEl.duration, true)
  }, [playPause])

  const onEnded = useCallback((e: Event) => {
    const audioEl = e.target as HTMLAudioElement
    playPause(audioEl.currentTime, audioEl.duration)
  }, [playPause])

  useEffect(() => {
    let audioEl = audioRef.current || null;

    if (!audioEl) {
      return;
    }

    audioEl.onplay = onPlayPause;
    audioEl.onpause = onPause;
    audioEl.onended = onEnded;
    audioEl.ontimeupdate = onPlaying;

    // Play or pause the audio based on the context value (isPlaying)
    if (isPlaying) {
      audioEl.play();
    } else {
      audioEl.pause();
    }

    return () => {
      audioEl = null;
    };
  }, [audioRef, onEnded, onPause, onPlaying, onPlayPause, isPlaying]); // Use isPlaying as a dependency to trigger play/pause


  return { current }
}
