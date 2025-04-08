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
import { createContext, useEffect, useState } from "react";

/* LOCAL IMPORTS */
import { getUserSamplesAPI, getUserSamplesByTypeAPI } from "../../api/sounds";
// import SampleHeader from "./components/header";
// import LoadingScreen from "./components/loading";
import SampleTable from "./components/table";
import { WaveformProvider } from "./components/waveform";
import Pagination from "./components/pagination";
import { ReactComponent as LibraryWaveformIcon } from "../../assets/icons/libraryWaveformIcon.svg";
// import { AudioPlayer } from "./components/waveform/player";

/* Define AudioTrackType interface */
export interface AudioTrackType {
  id: number;
  audio_url: string;
  title: string;
  artists: string[];
  length: number;
  thumbnail?: string;
  bpm?: number;
  key?: string;
  mp3_s3_key?: string;
  s3_key?: string;
  filename?: string;
  userInfo?: {
    isLiked?: boolean;
    isDownloaded?: boolean;
  };
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
const SamplesContainer = ({ user_id = 0, selectedTab, chatOpen, isConnect, isLoginUser }) => {
  // Add these states
  const [likedSamples, setLikedSamples] = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [samples, setSamples] = useState<AudioTrackType[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const samplesPerPage = 20;
  const [totalCount, setTotalCount] = useState(0);

  const fetchUserSamples = async (page: number) => {
    setLoading(true);
    try {
      const _sound = await getUserSamplesByTypeAPI({
        user_id,
        skip: page,
        take: samplesPerPage,
        type: selectedTab,
        includeUserInfo: true,
      });
      console.log('response here', _sound?.data?.results);
      const samplesArray = Object.values(_sound?.data?.results?.samples || {}) as AudioTrackType[];
      
      setSamples(samplesArray);
      
      // Initialize likedSamples state
      const initialLikes: Record<number, boolean> = {};
      samplesArray.forEach(sample => {
        initialLikes[sample.id] = sample?.userInfo?.isLiked || false;
      });
      setLikedSamples(initialLikes);
      
      if (_sound?.data?.results?.total !== undefined) {
        setTotalCount(_sound.data.results.total);
      }
    } catch (error) {
      console.error('Error fetching samples:', error);
      setSamples([]);
    } finally {
      setLoading(false);
    }
  };

  function samplesContainerContent(){
    if (samples.length > 0 ){
      return ( 
      <>
        <div className="text-xs font-medium text-[#9C9C9C] py-4 px-3 border-t border-[#1F1F1F]">
          {totalCount} results
        </div>
        <SampleTable samples={samples} chatOpen={chatOpen} isConnect={isConnect} />
        {totalCount > 0 && (
          <Pagination
            pageCount={Math.ceil(totalCount / samplesPerPage)}
            onPageChange={handlePageClick}
            currentPage={currentPage}
          />
        )}
      </>
      );
    } else {
      return (
        <div className="text-xs font-medium text-dimGray py-4 px-3 border-t border-[#1F1F1F] flex flex-col justify-center items-center gap-2">
          <LibraryWaveformIcon className="mt-16" />
          {
            isLoginUser ? (
              <p className="text-sm"><span className="font-bold text-[#CCCCCC]">Empty Library</span> your samples will appear here.</p>

            ) : (
              <>
                <p className="text-sm text-[#CCCCCC]">No Samples Available</p>
                <p className="text-sm w-[345px] text-center">This creator hasn’t uploaded any samples yet. Check back soon to explore their sounds.</p>
              </>
            )
          }
        </div>
      )
    }
  }

  // Update the page change handler to prevent going to invalid pages
  const handlePageClick = async (event: { selected: number }) => {
    const selectedPage = event.selected;
    setCurrentPage(selectedPage);
    await fetchUserSamples(selectedPage);
  };

  // Initial fetch - Add selectedTab to dependency array
  useEffect(() => {
    fetchUserSamples(0);
  }, [selectedTab]);

  // Also reset currentPage when tab changes
  useEffect(() => {
    setCurrentPage(0);
  }, [selectedTab]);

  return (
    <WaveformProvider>
      {samplesContainerContent()}
    </WaveformProvider>
  );
};

export default SamplesContainer;
