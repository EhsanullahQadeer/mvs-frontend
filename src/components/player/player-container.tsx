/*************************************************************************
 * @file player-container.tsx
 * @author End Quote
 * @desc Main player container for handling and displaying sound samples.
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* eslint-disable react-hooks/exhaustive-deps */

/* IMPORTS */
import React, { 
  useCallback, 
  useEffect, 
  useState 
} from "react";
import { useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Avatar from "react-avatar";

/* LOCAL IMPORTS */
import Toggle from "components/util/toggle";
import skipBack from '../../assets/img/player/skip-back.svg'
import skipNext from '../../assets/img/player/skip-forward.svg'
import playButton from '../../assets/img/player/play-circle.svg'
import pauseButton from '../../assets/img/player/pause-circle.svg'
import downloadPicture from '../../assets/img/download-image.svg'
import lockImage from '../../assets/img/lock-image.svg'
import TermsOfUse from "assets/terms_of_use";
import AudioPlayer from "components/AudioPlayer/audio-player";
import ConsideringModal from "components/modals/considering";
import Theme from "theme";
import DropDown from "components/util/dropdown";
import {
  getDownloadedSamplesAPI,
  getLikedSamplesAPI,
  getSoundAPI,
  getSoundSamplesAPI,
  saveSampleDownloadAPI,
} from "../../api/sounds";

const PlayerContainer = ({ source = '' }) => {
  const { id } = useParams();
  const [currentSampleIndex, setCurrentSampleIndex] = useState(null);
  const [playing, setPlaying]                       = useState(false); 
  const [current_page, setCurrentPage]              = useState(0);
  const [volume, setVolume]                         = useState(50);
  const [loading, setLoading]                       = useState(false); 
  const [sound_samples, setSoundSamples] = useState([]);
  const [take] = useState(10);
  const [total, setTotal] = useState(0);
  const [preview, setPreview]          = useState(false); // Used to show the sample player
  const [sample, setSample] = useState({});
  const [sound, setSound]: any = useState({});
  const [considering, setConsidering] = useState(false);

  // For use of assorted players
  const [sound_details, setSampleDetails] = useState([]);



  const handleRowPlayClick = (e) => {
    // This function finds the closest parent with the given class or returns the element itself if it matches
    const target = e.target.closest('.row-play');
  
    if (target) {
      // Extract necessary data from the target or use data attributes
      const index = target.getAttribute('data-index');  // Assuming data-index is an attribute on the row-play elements
      const x = sound_samples[index];  // Assuming you have access to sound_samples array
  
      // Now call the functions as needed
      handleSampleClick(x, parseInt(index));
      setPreview(true);
      handlePlayToggle(parseInt(index));
    }
  };


  const getSoundData = async () => {
    setLoading(true);
    const _sound: any = await getSoundAPI(id);
    setCurrentPage((currentPage) => {
      getSamples(id, currentPage);
      return currentPage;
    });
    setSound(_sound?.data?.results);
    console.log('sound : ', _sound?.data?.results);
    setLoading(false);
  };

  /*
   * Initialization of sample player
   */
  useEffect(() => {
    const init = async () => {
      await getSoundData();
    };
    init();
  }, [getSoundData]);

  useEffect(() => {
    // Use a unique key for each page
    const pageKey = `${window.location.pathname}_current_page`;
    // Retrieve page from local storage, default to 0 if not found
    const savedPage = localStorage.getItem(pageKey);
    setCurrentPage(savedPage !== null ? parseInt(savedPage, 10) : 0);
    // Cleanup function to reset page number when component unmounts
    return () => {
      localStorage.setItem(pageKey, '0');
    };
  }, []); // Run once on component mount

  const handlePlayToggle = (sampleIndex) => {
    if (currentSampleIndex === sampleIndex) {
      // Toggle playing state if the same sample is clicked
      setPlaying(!playing);
    }
  };

  const handleSampleClick = useCallback((sample, index) => {
    if (currentSampleIndex !== index) {
      // If the clicked sample is different from the current one
      setCurrentSampleIndex(index); // Update the current sample index
      if (!playing) {
        setPlaying(true); // Ensure audio is playing if not already playing
      }
    } else {
      // Call the toggle function if it's the same sample
      handlePlayToggle(index);
    }
  }, [currentSampleIndex, playing, handlePlayToggle]);


  const handlePageClick = async (event) => {
    
    setLoading(true);
    const pageKey = `${window.location.pathname}_current_page`;
    localStorage.setItem(pageKey, event.selected.toString());
    setCurrentSampleIndex(0);
    await getSamples(id, event.selected);
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



  const getSamples = async (id, page) => {
    setLoading(true);

    let _samples;

    switch(source){
      case "likes":
          _samples = await getLikedSamplesAPI({
          skip: page,
          take,
        });
        break;

      case "downloads": 
          _samples = await getDownloadedSamplesAPI({
          skip: page,
          take,
        });
        break;

      default:
        _samples = await getSoundSamplesAPI(id, {
          skip: page,
          take,
        });
    }

    console.log('page: ', page);
    setTotal(_samples?.data?.results?.total);
    setSoundSamples(_samples?.data?.results?.samples);
    setLoading(false);
  };


  useEffect(() => {
    console.log("use effects - handle keys");
    const handleKeyDown = async (event) => {
      if (event.key === ' ' && currentSampleIndex !== null) {
        // Toggle playing state with space key
        event.preventDefault(); // Prevent page scrolling
        setPlaying((prev) => !prev); // Toggle playing state
      } else if (
        (event.key === 'ArrowUp' || event.key === 'ArrowDown') &&
        currentSampleIndex !== null
      ) {
        event.preventDefault(); // Prevent page scrolling
        const offset = event.key === 'ArrowUp' ? -1 : 1;
        const newIndex = currentSampleIndex + offset;
  
        // Inside handleKeyDown function
        if (newIndex < 0 && current_page > 0) {
          // Handle moving to the previous page
          setLoading(true);
          const newPage = current_page - 1;
          setCurrentPage(newPage);
          setCurrentSampleIndex(take - 1);
          await getSamples(id, newPage);
          setPlaying(true); // Ensure audio plays
        } else if (
          newIndex >= sound_samples.length &&
          current_page < Math.ceil(total / take) - 1
        ) {
          // Handle moving to the next page
          setLoading(true);
          const newPage = current_page + 1;
          setCurrentPage(newPage);
          setCurrentSampleIndex(0);
          await getSamples(id, newPage);
          setPlaying(true); // Ensure audio plays

        } else if (newIndex >= 0 && newIndex < sound_samples.length) {
          // Move within the current page
          setCurrentSampleIndex(newIndex);
          console.log('currentSampleIndex: ', currentSampleIndex);
          setPlaying(true); // Ensure audio plays
        }
      }
    };
  
    // Add event listener
    window.addEventListener('keydown', handleKeyDown);
  
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSampleIndex, current_page, take, total, sound_samples, id, getSamples]);



  useEffect(() => {
    const fetchSampleDetails = async () => {
      const details = await Promise.all(
        sound_samples.map(async (sample) => {
          if (!sample.sound_id) return { thumbnail: null, author: null }; // Handle cases where sound_id might be undefined
  
          try {
            const result = await getSoundAPI(sample.sound_id);
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






  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
  };

  // Initialize the volume slider dragging state
  const handleMouseMove = (event) => {
    const slider = document.querySelector('.volume-slider').getBoundingClientRect();
    const newVolume = Math.max(0, Math.min(100, ((event.clientX - slider.left) / slider.width) * 100));
    setVolume(newVolume);
  };
  
  const handleMouseDown = () => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };
  
  const handleMouseUp = () => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseUp]);


  return (
    <React.Fragment>
      <Theme>
        <div className="onboard-4 second-div w-[100%] flex flex-col z-0 pb-[130px]">
          

          {/* TOP BANNER */}
          <div className="bg-[#101010] p-[20px] flex justify-start border-b-2 border-[#1F1F1F]">
            {loading ? (
              <>
                <div
                  role="status"
                  className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
                >
                  <div className="flex items-center justify-center w-full h-full bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                    <svg
                      className="w-10 h-10 text-gray-200 dark:text-gray-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 18"
                    >
                      <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                    </svg>
                  </div>
                  <div className="w-full">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                  </div>
                  <span className="sr-only">Loading...</span>
                </div>
              </>
            ) : (
              <>
               {(() => {
                  switch (source) {
                    case "likes":
                      return (
                        <div>
                          <div className="bg-[#101010] p-[20px] flex justify-start">
                            <div className="mt-[16px] gap-[22px] flex">
                              <div>
                                {/* eslint-disable-next-line */}
                                <img
                                  src={lockImage}
                                  alt="Download"
                                  width="250"
                                  height="250"
                                  style={{ display: 'block', margin: 'auto' }} // Center image
                                />
                              </div>
                              <div className="text m-[20px]">
                                <p className="text-[40px] text-[#fff] font-['Mona-Sans-M']">
                                  Likes
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                    );

                    case "downloads":
                      return (
                        <div>
                          <div className="bg-[#101010] p-[20px] flex justify-start">
                            <div className="mt-[16px] gap-[22px] flex">
                              <div>
                                {/* eslint-disable-next-line */}
                                <img
                                  src={downloadPicture}
                                  alt="Download"
                                  width="250"
                                  height="250"
                                  style={{ display: 'block', margin: 'auto' }} // Center image
                                />
                              </div>
                              <div className="text m-[20px]">
                                <p className="text-[40px] text-[#fff] font-['Mona-Sans-M']">
                                  Downloads
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                    );

                    default:
                      return (
                        <div className="mt-0 gap-3 flex justify-start">
                          <div className="flex items-center gap-4">
                            <div>
                              {/* eslint-disable-next-line */}
                              <img className="h-[250px]" src={sound?.thumbnail} style={{ minHeight: '175px', minWidth: '175px', borderRadius: '4px' }} />
                            </div>
                            <div className="text flex-grow max-w-[335px]">
                              <p className="text-[28px] text-[#fff] font-['Mona-Sans-M']">
                                {sound?.name}
                              </p>
                              <p className="text-[#878787] text-[12px] font-['Mona-Sans-M']">
                                By: {sound?.author}
                              </p>
                              <p className="text-[14px] font-['Mona-Sans-R'] text-[#bebebe]">
                                {sound?.description}
                              </p>
                            </div>
                          </div>
                          <div className="border-x border-[#282828] border-y-0 my-[50px] h-[145px]"></div>
                        </div>
                      );
                  }
                })()}
              </>
            )}
          </div>

          <div className="drop bg-[#101010] px-[20px] py-[10px]">
            <h3 className="text-[20px] text-[#fff] font-['Mona-Sans-M']">
              Samples
            </h3>
            <p className="text-[#9C9C9C] text-[14px] font-['Mona-Sans-M'] pt-[4px]">
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
            <table
            className="divide-y divide-[#1F1F1F] border-t border-[#1F1F1F] w-full"
            style={{ width: '100%' }}
            onClick={handleRowPlayClick}
            >
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-4"
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
                  className="wave-sample px-3 py-3.5 text-center text-sm font-semibold text-white"
                ></th>
                <th
                  scope="col"
                  className="meta-sample px-3 py-3.5 text-center text-sm font-semibold text-white"
                >
                  Time
                </th>
                <th
                  scope="col"
                  className="meta-sample px-3 py-3.5 text-center text-sm font-semibold text-white"
                >
                  Key
                </th>
                <th
                  scope="col"
                  className="meta-sample px-3 py-3.5 text-center text-sm font-semibold text-white"
                >
                  BPM
                </th>
                <th
                  scope="col"
                  className="considering-avatar px-3 py-3.5 text-center text-sm font-semibold text-white"
                >
                  Considering
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="">
              {sound_samples &&
                sound_samples.map((x: any, index) => {
                  const considerings = sound_samples[index]?.considering?.split(',') || [];
                  return (
                    <>
                      <tr
                        key={x.id}
                        id={`sample-item-${x.id}`}
                        className={`whitespace-nowrap px-3 py-4 text-sm text-gray-300 row-hover ${index === currentSampleIndex ? 'active-sample' : ''}`}>

                          {/* SAMPLE COLUMN */}
                          <td className="onboard-5 whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                            <div style={{
                              display: 'flex',
                              justifyContent: 'start',
                              alignItems: 'center',
                            }}>
                              <div className="thumbnail-container">
                                {/* eslint-disable-next-line */}
                                <img
                                  className={
                                    index !== currentSampleIndex
                                      ? "thumbnail cursor-pointer mr-[32px]" 
                                      : "play-pause-icon cursor-pointer mr-[32px]"
                                  }
                                  style={
                                    index !== currentSampleIndex
                                      ? { width: '32px', height: '32px', borderRadius: '4px'  }
                                      : { width: '15px', height: '15px', borderRadius: '4px'  }
                                  }
                                  src={
                                    index === currentSampleIndex
                                      ? (playing
                                          ? pauseButton
                                          : playButton )
                                      : sound_details[index]?.thumbnail
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
                                    handlePlayToggle(index);
                                }}
                              />
                              {/* eslint-disable-next-line */}
                              <img
                                className={
                                  index !== currentSampleIndex
                                    ? "thumbnail cursor-pointer mr-[32px]" 
                                    : "play-pause-icon cursor-pointer mr-[32px]"
                                }
                                style={
                                  index !== currentSampleIndex
                                    ? { width: '32px', height: '32px', borderRadius: '4px'  }
                                    : { width: '15px', height: '15px', borderRadius: '4px'  }
                                }
                                src={
                                  index === currentSampleIndex
                                    ? (playing
                                        ? pauseButton
                                        : playButton )
                                    : sound_details[index]?.thumbnail
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
                                  handlePlayToggle(index);
                              }}
                            />
                            {/* eslint-disable-next-line */}
                            <img
                                src={playButton}
                                className="play-icon"
                                alt="Play Button"
                                style={
                                  { width: '15px', height: '15px', borderRadius: '4px'  }
                                }                                                  
                                onClick={async (e) => {
                                  e.stopPropagation();
                                  handleSampleClick(x, index);
                                  setPreview(true);
                                  handlePlayToggle(index);
                              }}
                            />
                          </div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            height={20}
                            viewBox="0 0 20 20"
                            fill="none">
                            <path
                              d="M1.66675 8.33333V10.8333M5.00008 5V14.1667M8.33342 2.5V17.5M11.6667 6.66667V12.5M15.0001 4.16667V15M18.3334 8.33333V10.8333"
                              stroke="#CECFDA"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          </div>
                        </td> 

                        {/* FILENAME COLUMN */}
                        <td
                          className="row-play whitespace-nowrap px-3 py-4 text-[14px] text-[#CECFDA] font-['Mona-Sans-M']"
                          data-index={index}
                          style={{
                            maxWidth: '252px', // Adjust as per your requirement
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {x.filename}
                          <br />
                          <span className="text-[12px] text-[#6f6f6f]">
                            {sound_details[index]?.author}
                          </span>
                        </td>

                        {/* WAVEFORM COLUMN */}
                        <td className="wave-sample whitespace-nowrap px-3 py-4 text-sm text-gray-300 w-[267px]">
                            <AudioPlayer
                              link={x.sample_src}
                              id={x.id}
                              playing={playing}
                              setPlaying={setPlaying}
                              playerType={"sample"}
                              volume={0}
                            />
                        </td>

                        {/* SAMPLE DURATION COLUMN */}
                        <td className="meta-sample whitespace-nowrap px-3 py-4 text-sm text-gray-300 text-center">
                          {x?.length}
                        </td>

                        {/* SAMPLE KEY COLUMN */}
                        <td className="meta-sample whitespace-nowrap px-3 py-4 text-sm text-gray-300 text-center">
                          {x?.keys}
                        </td>

                        {/* SAMPLE BPM COLUMN */}
                        <td className="meta-sample whitespace-nowrap px-3 py-4 text-sm text-gray-300 text-center">
                          {x?.bpm}
                        </td>

                        {/* CONSIDERING COLUMN */}
                        <td className="considering-avatar whitespace-nowrap text-sm text-gray-300 text-center">
                        {
                          considerings.length > 0 &&
                          considerings.slice(0, 3).map((person, idx) => {
                            return (
                              <Avatar
                                key={idx}
                                name={person}
                                round={true}
                                title={person}
                                size="30"
                                className="flex ml-[5px] mb-[3px] cursor-pointer"
                                onClick={() => {
                                  setSample(x);
                                  setConsidering(true);
                                }}
                              />
                            );
                          })
                        }
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
                        
                          {/* TOOLS COLUMN */}
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">

                            {/* Wrapper Div */}
                            <div className="flex items-center gap-4">

                              {/* LIKE BUTTON */}
                              <div className="onboard-7 toggle-container">
                                {parseInt(x.is_liked) === 1 ? (
                                  <Toggle is_liked={true} sample={x} />
                                ) : (
                                  <Toggle is_liked={false} sample={x} />
                                )}
                              </div>

                              {/* DOWNLOAD BUTTON */}
                              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                              <a
                                href="#"
                                className="onboard-8 download-link cursor-pointer"
                                onClick={async (e) => {
                                  e.preventDefault();
                                  const FileSaver = require("file-saver");
                                  await saveSampleDownloadAPI(x.id);
                                  FileSaver.saveAs(x.sample_src, x.filename);
                                }}
                                rel="noreferrer"
                                download
                                target="_blank">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={24}
                                  height={24}
                                  viewBox="0 0 24 24"
                                  fill="none">
                                  <path
                                    d="M12 8V16M12 16L8 12M12 16L16 12M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                                    stroke="#CDCDCD"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"/>
                                </svg>
                              </a>

                              {/* DROPDOWN BUTTON */}
                              <div className="dropdown-container">
                                <DropDown sample={x} index={index} getSamples={getSamples} page={current_page} sound={sound} />
                              </div>
                            </div>
                          </td>
                      </tr>
                    </>
                    );
                  })}
              </tbody>
            </table>
          </>
          )}

          {/* PAGINATION */}
          {total > 0 && (
            <>
              <ReactPaginate
                previousClassName="text-[#676767] block"
                nextClassName="text-[#d9d9d9] block"
                activeClassName="border px-[10px] py-[5px] ml-[8px] rounded-[8px] border-[#C4FF48] bg-[#C4FF4840] text-white"
                pageClassName="px-[10px] py-[5px] ml-[8px] text-[#757575]"
                containerClassName="flex py-[20px] bg-[#141414] mx-[20px] items-center justify-center"
                breakLabel="..."
                nextLabel=" >"
                onPageChange={handlePageClick}
                pageCount={Math.ceil(total / 10)}
                previousLabel="< "
                renderOnZeroPageCount={null}
                breakClassName="text-white"
                activeLinkClassName="text-white"
                forcePage={current_page}
              />
            </>
          )}
          {/* End PAGINATION */}

          {true && (
            <>
              <TermsOfUse/>
            </>
          )}

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

<div className="bottom-audio-player" style={{ borderTop: '2px solid #1F1F1F', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  <div style={{ paddingLeft: '60px' }}></div>
  <div>
    <div className="sample-container">
      <div className="album-art">
        {/* eslint-disable-next-line */}
        <img 
          src={sound_details[currentSampleIndex]?.thumbnail || ''} 
          alt="Album Art"
        />
      </div>
      <div className="album-details">
        <div className="album-name" title={sound_samples[currentSampleIndex]?.filename}>
          {sound_samples[currentSampleIndex]?.filename ?? 'Album Name'}
        </div>
        <div className="album-author">
          {sound_details[currentSampleIndex]?.author ?? 'Author Name'}
        </div>
      </div>
    </div>
  </div>
  
  <div style={{ paddingLeft: '10px' }}></div>

  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <div className="control-container">
      {/* Previous Button */}
      <button className="control-button pr-2" onClick={handlePrevClick}>
        {/* eslint-disable-next-line */}
        <img src={skipBack} alt="Play" />
      </button>

      {/* Pause/Play Button */}
      <button className="control-button" onClick={() => handlePlayToggle(currentSampleIndex)}>
        {playing ? 
          (
            <img src={pauseButton} alt="Play" /> ) :
          (
            <img src={playButton} alt="Play" />
          )
        }
      </button>

      {/* Next Button */}
      <button className="control-button pl-2" onClick={handleNextClick}>
        {/* eslint-disable-next-line */}
      <img src={skipNext} alt="Play" />
      </button>
    </div>

    {/* Audio Player Component */}
    <div className="audio-container" style={{flex: '1', minWidth: '0'}}>
      <AudioPlayer
        link={sound_samples[currentSampleIndex]?.sample_src}
        id={sound_samples[currentSampleIndex]?.id}
        playing={playing}
        setPlaying={setPlaying}
        playerType={"player"}
        volume={volume}
      />
    </div>
  </div>
  
  <div>
    <div className="volume-container" style={{ paddingLeft: '100px', paddingRight: '250px', minWidth: '500px' }}>
      {/* Volume Button */}
      <button className="volume-button">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
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
          value={volume}/>
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
}

export default PlayerContainer;