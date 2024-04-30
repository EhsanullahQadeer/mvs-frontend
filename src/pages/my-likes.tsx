/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import { useNavigate, useParams } from "react-router-dom";
import Theme from "components/theme";
import React, { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ActionType from "redux/actionTypes";
import wavesurfer from "wavesurfer.js";
import {
  getLikedSamples,
  getSound,
  getSoundSamples,
  saveSampleDownload,
} from "redux/actionCreators/sounds";
import useDynamicRefs from "use-dynamic-refs";
import AudioPlayer from "components/AudioPlayer";
import DropDown from "components/theme/dropdown";
import ConsideringModal from "components/modals/considering";
import ReactPaginate from "react-paginate";
import Avatar from 'react-avatar';

import skipBack from '../assets/img/skip-back.svg'
import skipNext from '../assets/img/skip-forward.svg'
import playButton from '../assets/img/play-circle.svg'
import pauseButton from '../assets/img/pause-circle.svg'

interface RootState {
  auth: any;
  sounds: any;
}

const MyLikesPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const state = useSelector((state: RootState) => state);
  const [loading, setIsLoading] = useState(false);

  const [loadingData, setIsLoadingData] = useState({});
  const [currentSampleIndex, setCurrentSampleIndex] = useState(null);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [preview, setPreview]          = useState(false); // Used to show the sample player
  const [current_sample, setCurrentSample] = useState(0);

  const [currentPlayerId, setCurrentPlayerId] = useState(null);

  const [sound_samples, setSoundSamples] = useState([]);
  const [current_page, setCurrentPage] = useState(0);

  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);

  const [sound, setSound]: any = useState({});
  const [considering, setConsidering] = useState(false);
  const [sample, setSample] = useState({});
  const [currentTime, setCurrentTime] = useState(0);
  const [sampleDetails, setSampleDetails] = useState([]);


  const [manualToggle, setManualToggle] = useState(false); // Manual toggle

  const [volume, setVolume] = useState(50);                // Volume control

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }




  useEffect(() => {
    if (!playing && currentPlayerId && !manualToggle) {
      const timer = setTimeout(() => {
        setPlaying(true);
      }, 100);
  
      return () => clearTimeout(timer);
    }
  }, [playing, currentPlayerId, manualToggle]);

  const handlePlayToggle = () => {
    setPlaying(!playing);
    setManualToggle(true); // Indicate that the toggle was manual
  };

  // Handler for changes in the slider
  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
  };

  const handleMouseDown = () => {
    // Enable dragging
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseUp = () => {
    // Remove the event listeners when dragging ends
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (event) => {
    // Calculate the new volume based on the mouse position
    const slider = document.querySelector('.volume-slider').getBoundingClientRect();
    const newVolume = Math.max(0, Math.min(100, ((event.clientX - slider.left) / slider.width) * 100));
    setVolume(newVolume);
  };

  useEffect(() => {
    // Clean up the event listeners when the component unmounts
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);



  useEffect(() => {
    const handleKeyDown = async (event) => {
      if (event.key === ' ' && currentSampleIndex !== null) { // Make sure it's the space character
        event.preventDefault(); // Stop the page from scrolling
        setPlaying(prev => !prev); // Toggle playing state
        setManualToggle(true); // Indicate that the toggle was manual
      } else if ((event.key === 'ArrowUp' || event.key === 'ArrowDown') && currentSampleIndex !== null) {
        event.preventDefault();  // Prevent the whole page from scrolling
        setPlaying(false);
        setManualToggle(false); // Reset manual toggle on key press
        const offset = event.key === 'ArrowUp' ? -1 : 1;
        const newIndex = currentSampleIndex + offset;

        if (newIndex < 0 && current_page > 0) {
            setIsLoading(true);

            setCurrentPage(current_page - 1);
            setCurrentSampleIndex(take - 1);
            
            await getSamples(current_page - 1);

            setPlaying(true);
        } 
        else if (newIndex >= sound_samples.length && current_page < Math.ceil(total / take) - 1) {
          setIsLoading(true);

            setCurrentPage(current_page + 1);
            setCurrentSampleIndex(0);

            await getSamples(current_page + 1);

            setPlaying(true);
        } 
        else if (newIndex >= 0 && newIndex < sound_samples.length) {
            setCurrentSampleIndex(newIndex);
        }

      }
    };

    // Add event listener
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSampleIndex, current_page, take, total, sound_samples, playing, setPlaying]);

  const handlePageClick = async (event) => {
    setIsLoading(true);
    setCurrentPage(event.selected);
    setCurrentSampleIndex(0);
    await getSamples(event.selected);
  };

  const handleNextClick = () => {
    const event = new KeyboardEvent('keydown', {
      key: 'ArrowDown',
      bubbles: true, // Ensure the event bubbles up through the DOM
    });
    document.dispatchEvent(event);
  };
  
  const handlePrevClick = () => {
    const event = new KeyboardEvent('keydown', {
      key: 'ArrowUp',
      bubbles: true,
    });
    document.dispatchEvent(event);
  };


  /*
   * Name: handleSampleClick()
   * Desc: Handles functionality when clicking directly on a sample
   * 
   */
  const handleSampleClick = useCallback(async (sample, index) => {
    setCurrentSampleIndex(index);
    // Check if the same sample is clicked and it is currently playing
    if (currentPlayerId === sample.id) {
      if ( playing ) {
        setPlaying( false );
      } else {
        setPlaying( true ); // Resume playing the current sample
      }
    } else {
      
      setCurrentPlayerId(sample.id);
    }
  }, [currentPlayerId, playing, setPlaying, setCurrentPlayerId]);










  useEffect(() => {
    const init = async () => {
      await getSoundData();
      setIsLoadingData(false);
    };

    init();
  }, []);

  const getSamples = async (page = current_page) => {
    const _samples = await getLikedSamples({
      skip: page,
      take,
    });
    console.log("=== Samples ====");
    console.log(_samples);
    setTotal(_samples?.data?.results?.total);
    setSoundSamples(_samples?.data?.results?.samples);
    setIsLoading(false);
  };

  const getSoundData = async () => {
    setIsLoading(true); 
    const _sound: any = await getSound( id );
    console.log("sound", _sound);
    await getSamples( current_page );
    setIsLoading(false);
  };

  useEffect(() => {
    const fetchSampleDetails = async () => {
      const details = await Promise.all(
        sound_samples.map(async (sample) => {
          if (!sample.sound_id) return { thumbnail: null, author: null }; // Handle cases where sound_id might be undefined
  
          try {
            const result = await getSound(sample.sound_id);
            return {
              thumbnail: result.data.results.thumbnail, // Assuming this is the correct path
              author: result.data.results.author // Assuming this is the correct path
            };
          } catch (error) {
            console.error('Failed to fetch details for sound_id:', sample.sound_id, error);
            return { thumbnail: null, author: null };
          }
        })
      );
      setSampleDetails(details);
    };
  
    if (sound_samples.length > 0) {
      fetchSampleDetails();
    }
  }, [sound_samples]); // Dependency on sound_samples
  



  return (
    <React.Fragment>
      <Theme>
        <div className="second-div w-[85%] flex flex-col pb-[130px] z-0">
          <div className="bg-[#101010] p-[20px] flex justify-start">
            <div className="mt-[16px] gap-[22px] flex">
              <div>
                <svg
                  width="170"
                  height="170"
                  viewBox="0 0 270 270"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="10"
                    y="10"
                    width="250"
                    height="250"
                    rx="4"
                    fill="#641EF9"
                  />
                  <path
                    d="M124.167 132.833V124.167C124.167 121.294 125.308 118.538 127.34 116.506C129.371 114.475 132.127 113.333 135 113.333C137.873 113.333 140.629 114.475 142.66 116.506C144.692 118.538 145.833 121.294 145.833 124.167V132.833M119.833 132.833H150.167C152.56 132.833 154.5 134.773 154.5 137.167V152.333C154.5 154.727 152.56 156.667 150.167 156.667H119.833C117.44 156.667 115.5 154.727 115.5 152.333V137.167C115.5 134.773 117.44 132.833 119.833 132.833Z"
                    stroke="#FBFBFB"
                    stroke-width="4"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div className="text m-[20px]">
                <p className="text-[40px] text-[#fff] font-['Mona-Sans-M']">
                  Likes
                </p>
              </div>
            </div>
          </div>

          <div className="drop bg-[#101010] px-[20px] py-[10px]">
            <h3 className="text-[20px] text-[#fff] font-['Mona-Sans-M']">
              Samples
            </h3>
          
            <p className="text-[#9C9C9C] font-['Mona-Sans-M'] pt-[32px]">
              {total} Results
            </p>
          </div>
          {loading ? (
            <>
              <div role="status" className="text-center">
                <svg
                  aria-hidden="true"
                  className=" mx-auto my-10 h-8  w-8 animate-spin  fill-blue-600 text-center text-gray-200 dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            </>
          ) : (
            <>
              {/* <div className="custom-background">
                <div className="bg-black-900">
                  <div className="custom-width">
                    <div className="bg-black-900 py-10">
                      <div className="custom-padding"> */}
                        <div className="bg-[#101010] p-[10px]"> {/* Ensure this is the correct class and location */}
                          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6">
                            <div style={{ borderTop: "2px solid #333", margin: "0 0px" }}></div>
                              <table className="min-w-full divide-y divide-gray-700">
                                <thead>
                                <tr>
                                    <th
                                      scope="col"
                                      className="py-3.5 pl-4 pr-3 text-left  text-sm font-semibold text-white sm:pl-0"
                                    >
                                      Sample
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                                    >
                                      Filename
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-3 py-3.5 text-center text-sm font-semibold text-white"
                                    ></th>
                                    <th
                                      scope="col"
                                      className="px-3 py-3.5 text-center text-sm font-semibold text-white"
                                    >
                                      Time
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-3 py-3.5 text-center text-sm font-semibold text-white"
                                    >
                                      Key
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                                    >
                                      BPM
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                                    >
                                      Considering
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                                    >
                                    </th>
                                    <th
                                      scope="col"
                                      className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                                    >
                                      <span className="sr-only">Edit</span>
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800">
                                  {sound_samples && sampleDetails &&
                                    sound_samples.map((x: any, index) => {
                                      const globalIndex = current_page * take + index; // Correctly compute the global index
                                      const considering = x.considering?.split(',');
                                      console.log('dd: ', sampleDetails[currentSampleIndex]?.thumbnail);
                                      return (
                                        <>
                                          <tr key={x.id}
                                            id={`sample-item-${x.id}`}
                                            className={`whitespace-nowrap px-3 py-4 text-sm text-gray-300 row-hover ${index === currentSampleIndex ? 'active-sample' : ''}`}>
                                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                            <div style={{
                                              display: 'flex',
                                              justifyContent: 'center',
                                              alignItems: 'center',
                                            }}>
                                              <div className="thumbnail-container">
                                                <img
                                                  
                                                  className={
                                                    index !== currentSampleIndex
                                                      ? "thumbnail cursor-pointer mr-[32px]" 
                                                      : "play-pause-icon cursor-pointer mr-[32px]"
                                                  }
                                                  style={
                                                    index !== currentSampleIndex
                                                      ? { width: '32px', height: '32px', borderRadius: '4px'  }
                                                      : { width: '20px', height: '20px', borderRadius: '4px'  }
                                                  }
                                                  src={
                                                    index === currentSampleIndex
                                                      ? (playing
                                                          ? playButton
                                                          : pauseButton )
                                                      : sampleDetails[index]?.thumbnail
                                                  }
                                                  alt={
                                                    index === currentSampleIndex
                                                      ? "Playing"
                                                      : "Thumbnail"
                                                  }
                                                  onClick={async (e) => {
                                                    e.stopPropagation();
                                                    handleSampleClick(x, index);
                                                    setPreview(true);
                                                    handlePlayToggle();
                                                }}
                                              />
                                              <img
                                                  src={playButton}
                                                  className="play-icon"
                                                  alt="Play Button"
                                                  style={
                                                    { width: '20px', height: '20px', borderRadius: '4px'  }
                                                  }                                                  
                                                  onClick={async (e) => {
                                                    e.stopPropagation();
                                                    handleSampleClick(x, index);
                                                    setPreview(true);
                                                    handlePlayToggle();
                                                }}
                                              />
                                            </div>
                                          </div>

                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-[14px] text-[#CECFDA] font-['Mona-Sans-M']">
                                              {x.filename}
                                              <br />{" "}
                                              <span className="text-[12px] text-[#6f6f6f]">
                                              {sampleDetails[index]?.author}
                                              </span>{" "}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                            <AudioPlayer
                                              link={x?.sample_src}
                                              id={x?.id}
                                              setPlaying={false}
                                              playerType={"sample"}
                                              volume={0}
                                              />
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                            {x?.length}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                            {x?.keys}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                            {x?.bpm}
                                            </td>
                                            <td className="whitespace-nowrap  text-sm text-gray-300">
                                              {considering && considering?.map((x: any) => {

                                                return (
                                                  <>
                                                    <Avatar name={x} round={true} title={x} size="30" className="flex ml-[5px] mb-[3px]" />
                                                  </>
                                                )
                                              })}
                                              <span
                                                onClick={() => {
                                                  setSample(x);
                                                  setConsidering(true);
                                                }}
                                                className="cursor-pointer text-[10px] ml-[10px] mt-[10px] text-[#929292] underline font-['Mona-Sans-M']"
                                              >
                                                View All
                                              </span>
                                            </td>
                                            <td className="flex whitespace-nowrap px-3 py-4 items-center">
                                              <div className="ml-[100px] cursor-pointer">
                                                {parseInt(x.is_liked) === 1 ? (
                                                  <>
                                                    <svg
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      width={20}
                                                      height={20}
                                                      viewBox="0 0 20 20"
                                                      fill="none"
                                                    >
                                                      <path
                                                        d="M15.8337 11.6667C17.0753 10.45 18.3337 8.99167 18.3337 7.08333C18.3337 5.86776 17.8508 4.70197 16.9912 3.84243C16.1317 2.98289 14.9659 2.5 13.7503 2.5C12.2837 2.5 11.2503 2.91667 10.0003 4.16667C8.75033 2.91667 7.71699 2.5 6.25033 2.5C5.03475 2.5 3.86896 2.98289 3.00942 3.84243C2.14988 4.70197 1.66699 5.86776 1.66699 7.08333C1.66699 9 2.91699 10.4583 4.16699 11.6667L10.0003 17.5L15.8337 11.6667Z"
                                                        fill="#CECFDA"
                                                      />
                                                    </svg>
                                                  </>
                                                ) : (
                                                  <>
                                                    <svg
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      width={20}
                                                      height={20}
                                                      viewBox="0 0 20 20"
                                                      fill="none"
                                                    >
                                                      <path
                                                        d="M15.8337 11.6667C17.0753 10.45 18.3337 8.99167 18.3337 7.08333C18.3337 5.86776 17.8508 4.70197 16.9912 3.84243C16.1317 2.98289 14.9659 2.5 13.7503 2.5C12.2837 2.5 11.2503 2.91667 10.0003 4.16667C8.75033 2.91667 7.71699 2.5 6.25033 2.5C5.03475 2.5 3.86896 2.98289 3.00942 3.84243C2.14988 4.70197 1.66699 5.86776 1.66699 7.08333C1.66699 9 2.91699 10.4583 4.16699 11.6667L10.0003 17.5L15.8337 11.6667Z"
                                                        stroke="#E6E6E6"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                      />
                                                    </svg>
                                                  </>
                                                )}
                                              </div>
                                              <a
                                                href="#"
                                                onClick={async (e) => {
                                                  e.preventDefault();

                                                  const FileSaver = require("file-saver");

                                                  await saveSampleDownload(
                                                    x.id
                                                  );

                                                  FileSaver.saveAs(
                                                    x.sample_src,
                                                    x.filename
                                                  );
                                                }}
                                                rel="noreferrer"
                                                download
                                                target="_blank"
                                                className="cursor-pointer ml-[15px]"
                                              >
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width={24}
                                                  height={24}
                                                  viewBox="0 0 24 24"
                                                  fill="none"
                                                >
                                                  <path
                                                    d="M12 8V16M12 16L8 12M12 16L16 12M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                                                    stroke="#CDCDCD"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                  />
                                                </svg>
                                              </a>

                                              <DropDown
                                                sample={x}
                                                getSamples={getSamples}
                                                page={current_page}
                                                sound={sound}
                                              />
                                            </td>
                                          </tr>
                                        </>
                                      );
                                    })}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      {/* </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </>
          )}

          {/* Start Pagination */}

          {(total > 10) && (
            <>
              <ReactPaginate
                previousClassName="text-[#676767] block"
                nextClassName="text-[#d9d9d9] block"
                activeClassName="border px-[10px] py-[5px] ml-[8px] rounded-[8px] border-[#C4FF48] bg-[#C4FF4840] text-white"
                pageClassName="px-[10px] py-[5px] ml-[8px] text-[#757575]"
                containerClassName="flex py-[20px] bg-[#141414] mx-[20px] items-center justify-center"
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageCount={Math.ceil(total / 10)}
                previousLabel="<"
                renderOnZeroPageCount={null}
                breakClassName="text-white"
                activeLinkClassName="text-white"
                forcePage={current_page}
              />
            </>
          )}

          {/* End Pagination */}

         
          {/* Recommended */}
        </div>
      </Theme>
      {ConsideringModal && (
        <>
          <ConsideringModal
            openModal={considering}
            setModal={setConsidering}
            sample={sample}
          />
        </>
      )}
      { preview && (
    <>
    
    <div className="bottom-audio-player" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  <div style={{ paddingLeft: '60px' }}></div>
  <div>
    <div className="sample-container">
      <div className="album-art">
        <img 
          src={sampleDetails[currentSampleIndex]?.thumbnail || ''} 
          alt="Album Art"
        />
      </div>
      <div className="album-details">
        <div className="album-name">
          {sound_samples[currentSampleIndex]?.filename ?? 'Album Name'}
        </div>
        <div className="album-author">
          {sampleDetails[currentSampleIndex]?.author ?? 'Author Name'}
        </div>
      </div>
    </div>
  </div>
  
  <div style={{ paddingLeft: '10px' }}></div>

  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <div className="control-container">
      {/* Previous Button */}
      <button className="control-button" onClick={handlePrevClick}>
        <img src={skipBack} alt="Play" />
      </button>

      {/* Pause/Play Button */}
      <button className="control-button" onClick={handlePlayToggle}>
        {playing ? 
          (
            <img src={playButton} alt="Play" /> ) :
          (
            <img src={pauseButton} alt="Play" />
          )
        }
      </button>

      {/* Next Button */}
      <button className="control-button" onClick={handleNextClick}>
      <img src={skipNext} alt="Play" />
      </button>
    </div>

    {/* Audio Player Component */}
    <div className="audio-container" style={{flex: '1', minWidth: '0'}}>
      <AudioPlayer
        link={sound_samples[currentSampleIndex]?.sample_src}
        id={sound_samples[currentSampleIndex]?.id}
        setPlaying={playing}
        playerType={"player"}
        volume={volume}
      />
    </div>
  </div>
  
  <div>
    <div className="volume-container" style={{ paddingLeft: '100px', paddingRight: '200px', minWidth: '500px' }}>
      {/* Volume Button */}
      <button className="volume-button">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
      </svg>

      </button>
      <div className="volume-slider-wrapper">
        <input 
          type="range" 
          min="0" 
          max="100" 
          className="volume-input" 
          onChange={handleVolumeChange} 
          value={volume}
        />
        <div className="volume-slider" onMouseDown={handleMouseDown}>
          <div className="volume-level" style={{ width: `${volume}%` }}></div>
        </div>
      </div>
    </div>
  </div>
</div>
  </>
)}
    </React.Fragment>
  );
};

export default MyLikesPage;