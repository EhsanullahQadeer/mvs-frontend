import React, { useState, useEffect, useRef } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { getUserSamplesAPI, getUserSamplesByTypeAPI } from "../../../api/sounds";
import SampleTable from "../../../components/SampleContainer/components/table";
import { AudioTrack, useWaveform, WaveformProvider } from "../../../components/SampleContainer/components/waveform";
import Pagination from "../../../components/SampleContainer/components/pagination";
import { IoMdHeartEmpty } from 'react-icons/io';
import { FiDownload } from 'react-icons/fi';
import musicIcon from "../../../assets/icons/musicIcon.svg";
import waveformIcon from "../../../assets/icons/waveformIcon.svg";
import searchIcon from 'assets/icons/searchIcon.svg';
import playIcon from 'assets/icons/playIcon.svg';
import musicBeam from "../../../assets/icons/musicBeam.svg";
import AudioPlayer from "../../../components/SampleContainer/components/player";
import SampleSendDemoModal from './SampleSendDemoModal';

interface AudioTrackType {
  id: number;
  audio_url: string;
  title: string;
  artists: string[];
  length: number;
  thumbnail?: string;
  bpm?: number;
  key?: string;
  s3_key?: string;
  mp3_s3_key?: string;
  filename?: string;
  userInfo?: {
    isLiked?: boolean;
    isDownloaded?: boolean;
  };
}
interface AudioTrackTypeArray {
  id: number;
  title: string;
  length: string;
  size: string;
  provider: string;
}
interface ISampleModalFooter {
  open: boolean;
  onClose: () => void;
  onSelect: (sample: AudioTrackType) => void;
  userId?: number;
  recipientId?: number;
  userType?: 'partner' | 'creator';
  isConnected?: boolean;
  conversationId?: string;
}

const SampleModalFooter: React.FC<ISampleModalFooter> = ({ 
  open, 
  onClose, 
  onSelect,
  userId,
  recipientId,
  userType = 'creator',
  conversationId,
  isConnected = false
}) => {
  const [loading, setLoading] = useState(false);
  const [samples, setSamples] = useState<AudioTrackType[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const samplesPerPage = 20;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSamples, setSelectedSamples] = useState<Set<number>>(new Set());
  const [currentTrack, setCurrentTrack] = useState<AudioTrackType | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);

  const handleClose = () => {
    setCurrentPage(0);
    setTotalCount(0);
    setSearchTerm('');
    setSelectedSamples(new Set());
    setLoading(false);
    
    onClose();
  };

  const fetchUserSamples = async (page: number) => {
    setLoading(true);
    try {
      const _sound = await getUserSamplesAPI({
        user_id: userId,
        skip: page,
        take: samplesPerPage,
        includeUserInfo: false,
      });
      
      const samplesArray = Object.values(_sound?.data?.results?.samples || {}) as AudioTrackType[];
      
      // Debug log to check sample data
      console.log('Fetched samples:', samplesArray.map(s => ({
        id: s.id,
        filename: s.filename,
        audio_url: s.audio_url,
        s3_key: s.s3_key
      })));
      
      setSamples(samplesArray);
      
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

  const handlePageClick = async (event: { selected: number }) => {
    const selectedPage = event.selected;
    setCurrentPage(selectedPage);
    await fetchUserSamples(selectedPage);
  };

  const handlePlayPause = async (sampleId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const sample = samples.find(s => s.id === sampleId);
    
    if (!sample) return;

    try {
        // Log the sample data to verify the URL
        console.log('Playing sample:', {
            id: sample.id,
            s3_key: sample.s3_key,
            mp3_s3_key: sample.mp3_s3_key,
            audio_url: sample.audio_url
        });

        // Try different URL sources in order of preference
        const audioUrl = sample.audio_url || sample.mp3_s3_key || sample.s3_key;
        if (!audioUrl) {
            throw new Error('No valid audio URL found');
        }

        const updatedSample = {
            ...sample,
            audio_url: audioUrl
        };

        if (currentTrack?.id === sampleId) {
            setIsPlaying(!isPlaying);
            if (!isPlaying) {
                await audioRef.current?.play();
            } else {
                await audioRef.current?.pause();
            }
        } else {
            if (audioRef.current) {
                audioRef.current.src = audioUrl;
                await audioRef.current.load(); // Add this to ensure the source is loaded
                setCurrentTrack(updatedSample);
                setIsPlaying(true);
                await audioRef.current.play();
            }
        }
    } catch (error) {
        console.error('Error playing audio:', error);
        console.log('Audio element state:', audioRef.current?.error);
        setIsPlaying(false);
    }
  };

  const handleSendSelected = () => {
    setIsSendModalOpen(true);
  };

  const handlePrevTrack = () => {
    if (!currentTrack) return;
    const currentIndex = samples.findIndex(s => s.id === currentTrack.id);
    if (currentIndex > 0) {
      setCurrentTrack(samples[currentIndex - 1]);
      setIsPlaying(true);
    }
  };

  const handleNextTrack = () => {
    if (!currentTrack) return;
    const currentIndex = samples.findIndex(s => s.id === currentTrack.id);
    if (currentIndex < samples.length - 1) {
      setCurrentTrack(samples[currentIndex + 1]);
      setIsPlaying(true);
    }
  };

  const formatSelectedSamples = (): AudioTrackTypeArray[] => {
    return samples
      .filter(sample => selectedSamples.has(sample.id))
      .map(sample => ({
        id: sample.id,
        title: sample.filename || sample.title,
        length: `${Math.floor(sample.length / 60)}:${String(Math.floor(sample.length % 60)).padStart(2, '0')}`,
        size: '50MB', // Replace with actual size when available
        provider: sample.artists?.[0] || 'Unknown Artist',
        price: 5.00 // Default price per sample
      }));
  };

  const handleSampleSelection = (sampleId: number) => {
    setSelectedSamples(prev => {
      const newSelected = new Set(prev);
      const isCurrentlySelected = newSelected.has(sampleId);

      // If already selected, just remove it
      if (isCurrentlySelected) {
        newSelected.delete(sampleId);
        setErrorMessage('');
        return newSelected;
      }

      // Check selection limits based on user type
      if (userType === 'creator') {
        // Creator can only select 1 sample
        if (newSelected.size >= 1) {
          setErrorMessage('As a creator, you can only select one sample at a time when sending to partners.');
          return prev;
        }
        newSelected.clear(); // Clear previous selection
        newSelected.add(sampleId);
      } else if (userType === 'partner' && isConnected) {
        // Connected partners can select up to 5 samples
        if (newSelected.size >= 5) {
          setErrorMessage('You can select up to 5 samples when sending to connected partners.');
          return prev;
        }
        newSelected.add(sampleId);
      } else if (userType === 'partner' && !isConnected) {
        setErrorMessage('You can only send samples to connected partners.');
        return prev;
      }

      setErrorMessage('');
      return newSelected;
    });
  };

  useEffect(() => {
    fetchUserSamples(0);
  }, []);


  return (
    <>
        <audio ref={audioRef} />
        <Dialog 
          open={open} 
          onClose={handleClose}
          maxWidth="lg"
          fullWidth
          PaperProps={{
            sx: {
              backgroundColor: '#131313',
              color: '#FFFFFF',
              height: '80vh',
              position: 'relative'
            }
          }}
        >
          <DialogTitle className="px-8 pt-8">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">My Library</h2>
              <button 
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-[#2A2A2A] flex items-center justify-center text-gray-400 hover:text-white transition-colors text-lg"
              >
                ✕
              </button>
            </div>
            <div className="mt-4 flex gap-4 items-center">
              <div className="w-64 relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                  <img src={searchIcon} alt="search" className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search"
                  className="w-full bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg pl-10 pr-8 py-2 text-sm text-white"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    ✕
                  </button>
                )}
              </div>
              
              <select className="px-4 py-2 bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg text-sm text-gray-400 appearance-none cursor-pointer hover:bg-[#2A2A2A] transition-colors min-w-[100px]">
                <option value="">Genre</option>
                {/* Add your genre options here */}
              </select>

              <select className="px-4 py-2 bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg text-sm text-gray-400 appearance-none cursor-pointer hover:bg-[#2A2A2A] transition-colors min-w-[100px]">
                <option value="">BPM</option>
                {/* Add your BPM options here */}
              </select>

              <select className="px-4 py-2 bg-[#1F1F1F] border border-[#2A2A2A] rounded-lg text-sm text-gray-400 appearance-none cursor-pointer hover:bg-[#2A2A2A] transition-colors min-w-[100px]">
                <option value="">Key</option>
                {/* Add your key options here */}
              </select>
            </div>
          </DialogTitle>
          <DialogContent className="flex flex-col" sx={{ padding: 0, overflow: 'hidden' }}>
            {errorMessage && (
              <div className="bg-red-900/20 text-red-400 px-4 py-2 text-sm">
                {errorMessage}
              </div>
            )}
            <div className="bg-[#121212] rounded-lg p-4 mt-4 flex-1 overflow-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#2A2A2A] text-gray-400">
                    <th className="w-12 py-2 font-normal pl-4"></th>
                    <th className="w-[300px] text-left py-2 font-normal">File Name</th>
                    <th className="w-24 text-left py-2 font-normal">Time</th>
                    <th className="w-24 text-left py-2 font-normal">Size</th>
                    <th className="w-24 text-left py-2 font-normal">Key</th>
                    <th className="w-24 text-left py-2 font-normal">BPM</th>
                  </tr>
                </thead>
                <tbody>
                  {samples.map((sample) => (
                    <tr
                      key={sample.id}
                      onClick={() => handleSampleSelection(sample.id)}
                      className={`
                        border-b border-[#1A1A1A] hover:bg-[#1F1F1F] cursor-pointer
                        ${selectedSamples.has(sample.id) ? 'bg-[#1F1F1F]' : ''}
                      `}
                    >
                      <td className="py-2 pl-4">
                        <input 
                          type="checkbox" 
                          checked={selectedSamples.has(sample.id)}
                          style={{ backgroundColor: selectedSamples.has(sample.id) ? '#1ed760' : 'transparent' }}
                          className="w-4 h-4 accent-[#1ed760] border-gray-600 rounded"
                          readOnly
                        />
                      </td>
                      <td className="py-2">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-10 h-10 bg-[#2A2A2A] rounded flex items-center justify-center group cursor-pointer relative"
                            onClick={(e) => handlePlayPause(sample.id, e)}
                          >
                            {currentTrack?.id === sample.id ? (
                              <img 
                                src={playIcon} 
                                alt="pause" 
                                className="w-6 h-6 absolute" 
                              />
                            ) : (
                              <>
                                <img 
                                  src={musicBeam} 
                                  alt="play" 
                                  className="w-6 h-6 group-hover:opacity-0 transition-opacity" 
                                />
                                <img 
                                  src={playIcon} 
                                  alt="play" 
                                  className="w-6 h-6 absolute opacity-0 group-hover:opacity-100 transition-opacity" 
                                />
                              </>
                            )}
                          </div>
                          <span className="text-gray-300">{sample.filename}</span>
                        </div>
                      </td>
                      <td className="py-2 text-gray-400">
                        {Math.floor(sample.length / 60)}:{String(Math.floor(sample.length % 60)).padStart(2, '0')}
                      </td>
                      <td className="py-2 text-gray-400">50MB</td>
                      <td className="py-2 text-gray-400">{sample.key || 'BMinor'}</td>
                      <td className="py-2 text-gray-400">{sample.bpm || '122'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="flex justify-between items-center p-4 mt-auto border-t border-[#2A2A2A] bg-[#131313] sticky bottom-0 h-[72px]">
              <div className="flex-1">
                <WaveformProvider>
                  {currentTrack && (
                    <AudioPlayer
                      currTrack={currentTrack}
                      isPlaying={isPlaying}
                      onPlayToggle={() => {
                        if (currentTrack) {
                          handlePlayPause(currentTrack.id, { stopPropagation: () => {} } as React.MouseEvent);
                        }
                      }}
                      onPrevClick={handlePrevTrack}
                      onNextClick={handleNextTrack}
                      compact={true}
                    />
                  )}
                </WaveformProvider>
              </div>

              <button
                onClick={selectedSamples.size > 0 ? handleSendSelected : undefined}
                className={`
                  min-w-[140px] px-8 py-3 rounded-full font-medium text-base flex-shrink-0
                  ${selectedSamples.size === 0 
                    ? 'bg-[#242424] text-[#3D3D3D]'
                    : 'bg-[#1ed760] text-black hover:brightness-110 transition-all'}
                `}
              >
                {selectedSamples.size === 0 ? 'Send demos' : `Send ${selectedSamples.size} demos`}
              </button>
            </div>
          </DialogContent>
        </Dialog>

        <SampleSendDemoModal
          open={isSendModalOpen}
          onClose={() => setIsSendModalOpen(false)}
          selectedSamples={formatSelectedSamples()}
          recipientId={recipientId} 
          conversationId={conversationId}
          onCloseAllModals={handleClose}

        />
    </>
  );
};

export default SampleModalFooter;
