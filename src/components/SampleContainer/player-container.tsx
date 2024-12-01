/*************************************************************************
 * @file player-container.tsx
 * @author End Quote
 * @desc Main player container for handling and displaying sound samples.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

/* IMPORTS */
import React, { createContext, useEffect, useRef, useState } from "react";

/* LOCAL IMPORTS */
import { getUserSamplesAPI } from "../../api/sounds";
import SampleHeader from "./components/header";
import LoadingScreen from "./components/loading";
import SampleTable from "./components/table";
import { WaveformProvider } from "./components/waveform";
import Pagination from "./components/pagination";
import { AudioPlayer } from "./components/waveform/player";

/* Define AudioTrackType interface */
export interface AudioTrackType {
  id: number;
  audio_url: string;
  title: string;
  artists: string[];
  duration: number;
  thumbnail?: string;
  bpm?: number;
  key?: string;
  s3_key?: string;
  filename?: string;
}

// Define PlayerContextType
interface PlayerContextType {
  currentTrack: AudioTrackType | null;
  isPlaying: boolean;
  playTrack: (track: AudioTrackType) => void;
  isPaused: boolean;
  pauseTrack: () => void;
}

// Create PlayerContext with default values
export const PlayerContext = createContext<PlayerContextType>({
  currentTrack: null,
  isPlaying: false,
  playTrack: () => {},
  isPaused: false,
  pauseTrack: () => {},
});

// /* PlayerProvider: Provides context to children components */
// export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [currentTrack, setCurrentTrack] = useState<AudioTrackType | null>(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const audioRef = useRef<HTMLAudioElement | null>(null); // Use ref for audio element
//   const [isPaused, setIsPaused] = useState(true); // Track whether the track is paused

//   const playTrack = (
//     track: AudioTrackType
//   ) => {
//     if (audioRef.current) {
//       console.log('Audio element is present', audioRef.current);

//       // If a new track is selected, load and play it
//       if (currentTrack?.id !== track.id) {
//         audioRef.current.pause();
//         audioRef.current.src = "";
//         audioRef.current.src = track.s3_key;

//         // Load and play the new track once it's ready
//         audioRef.current.oncanplay = () => {
//           audioRef.current?.play()
//             .then(() => {
//               setIsPlaying(true);
//               setIsPaused(false);
//               setCurrentTrack(track);
//             })
//             .catch((error) => {
//               console.error('Error during playback:', error.message);
//               if (error.name === 'AbortError') {
//                 console.log('Playback aborted:', error.message);
//               }
//             });
//         };
//       } else {
//         // If the same track is selected, toggle play/pause
//         if (isPaused) {
//           audioRef.current.play()
//             .then(() => {
//               setIsPlaying(true);
//               setIsPaused(false);
//             })
//             .catch((error) => {
//               console.log('Error during playback:', error.message);
//             });
//         } else {
//           audioRef.current.pause();
//           setIsPlaying(false);
//           setIsPaused(true);
//         }
//       }
//     } else {
//       console.log('Audio element is not available');
//     }
//   };

//   const pauseTrack = () => {
//     setIsPlaying(false);
//     if (audioRef.current) {
//       audioRef.current.pause(); // Pause the audio
//       setIsPaused(true); // Mark as paused when it's done
//     }
//   };

//   return (
//     <PlayerContext.Provider value={{ currentTrack, isPlaying, playTrack, isPaused, pauseTrack }}>
//       {children}
//       {/* <AudioPlayer /> */}
//     </PlayerContext.Provider>
//   );
// };

/* PlayerContainer */
const SamplesContainer = ({ user_id = 0 }) => {
  // States Setup
  const [loading, setLoading] = useState(false);
  const [samples, setSamples] = useState<AudioTrackType[]>([]);
  const [currentPage, setCurrentPage] = useState(0); // To track the current page
  // @todo: this value is only present for MVP purposes, should remove later.
  const samplesPerPage = 100; // The number of samples per page

  const [allSamples, setAllSamples] = useState<AudioTrackType[]>([]); // To store all the samples
  const [currentSamples, setCurrentSamples] = useState<AudioTrackType[]>([]); // To store the samples for the current page

  // Fetch all user samples from the server once
  const fetchAllUserSamples = async () => {
    setLoading(true);
    const _sound = await getUserSamplesAPI({
      user_id,
      skip: 0,
      take: samplesPerPage,
    });

    // Assuming `samples` is the object you showed in the screenshot.
    const samplesArray = Object.values(
      _sound?.data?.results?.samples || {}
    ) as AudioTrackType[]; // Cast to AudioTrackType[]
    console.log("samples", samplesArray);
    setAllSamples(samplesArray); // Store all samples
    paginateSamples(samplesArray, 0); // Load the first page of samples
    setLoading(false);
  };

  // Function to paginate samples
  const paginateSamples = (samplesArray: AudioTrackType[], page: number) => {
    const start = page * samplesPerPage;
    const end = start + samplesPerPage;
    const paginatedSamples = samplesArray.slice(start, end); // Get the current page samples
    setCurrentSamples(paginatedSamples);
  };

  const handlePageClick = (event: { selected: number }) => {
    const selectedPage = event.selected;
    setCurrentPage(selectedPage);
    paginateSamples(allSamples, selectedPage);
  };

  // Fetch all samples on component mount
  useEffect(() => {
    fetchAllUserSamples(); // Fetch all samples once when the component loads
  }, []);

  return (
    <WaveformProvider>
      <SampleTable samples={currentSamples} />
      {/* <Theme>
        <div className="onboard-4 second-div w-[100%] flex flex-col z-0 pb-[130px]">
          <SampleHeader loading={loading} total={allSamples ? Object.keys(allSamples).length : 0}/>
          {loading ? (
            <LoadingScreen/>
          ): ( 
            <SampleTable samples={currentSamples} />
          )}
          {Object.keys(currentSamples).length > 0 && (
            <Pagination
              pageCount={Math.ceil(allSamples.length / samplesPerPage)}
              onPageChange={handlePageClick}
              currentPage={currentPage}
            />
          )}
          <TermsOfUse/>
        </div>
      </Theme> */}
    </WaveformProvider>
  );
};

export default SamplesContainer;
