/*
  Author: Zohaib 
  Desc:   
  Date:   

*/


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
  getSound,
  getSoundSamples,
  saveSampleDownload,
} from "redux/actionCreators/sounds";
import AudioPlayer from "components/AudioPlayer";
import DropDown from "components/theme/dropdown";
import ConsideringModal from "components/modals/considering";
import ReactPaginate from "react-paginate";
import Player from "components/player";
import Toggle from "components/toggle";
import Avatar from 'react-avatar';


interface RootState {
  auth: any;
  sounds: any;
}

const SamplesPage = () => {
  const navigate = useNavigate();
  const state = useSelector((state: RootState) => state);
  const [loading, setIsLoading] = useState(false);

  const [loadingData, setLoadingData] = useState({});

  const [playing, setPlaying] = useState(false);


  const [currentSampleIndex, setCurrentSampleIndex] = useState(null);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(null);

  const [current_sample, setCurrentSample] = useState(null);

  const [currentPlayerId, setCurrentPlayerId] = useState(null);

  const { id } = useParams();

  const [sound_samples, setSoundSamples] = useState([]);
  const [current_page, setCurrentPage] = useState(0);

  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);

  const [sound, setSound]: any = useState({});
  const [considering, setConsidering] = useState(false);
  const [samplePlayed, sampleControl] = useState(false);
  const [sample, setSample] = useState({});

  const [playlist, setPlaylist] = useState([]);
  const [listForPlaylist, setListPlaylist] = useState([]);
  const [preview, setPreview] = useState(false);
  const [selectedSample, setSelectedSample] = useState(null);
  const [playButton, setPlayButton] = useState(null);  // State to hold the play button reference


  useEffect(() => {
    const audioElement = document.querySelector(`audio`);
    console.log("PAUSE/PLAY?: ", audioElement);
    if (!audioElement) return;
  
    // Handling play/pause based on state
    const playAudio = async () => {
      try {
        await audioElement.play();
      } catch (error) {
        console.error('Error playing audio:', error);
      }
    };
  
    const pauseAudio = () => {
      audioElement.pause();
    };
  
    if (playing) {
      playAudio();
    } else {
      pauseAudio();
    }
  
  }, [playing]);


  /* 
   * useEffect()
   * Desc: Handle Up/Down key hits; scan through list of samples
   */ 
  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.key === 'ArrowUp' || event.key === 'ArrowDown') && currentSampleIndex !== null) {
        event.preventDefault();  // Prevent the whole page from scrolling
  
        // // Pause the current sample if something is playing.
        // if (playing) {
        //   const audioElement = document.querySelector('audio');
        //   if (audioElement) audioElement.pause();
        // }
  
        // Calculate the start and end index for the current page
        const startIndex = current_page * take;
        const endIndex = Math.min(startIndex + take, total) - 1;  // Adjust endIndex to not exceed total
  
        setCurrentSampleIndex(prev => {
          let newIndex = prev + (event.key === 'ArrowUp' ? -1 : 1);
          if (newIndex >= 0 && newIndex < currentSamples.length) {
            // Update within the local page bounds
            return newIndex;
          }
          return prev;  // Return previous if out of bounds
        });
  
        setCurrentPlayerIndex(prev => {
          let newGlobalIndex = prev + (event.key === 'ArrowUp' ? -1 : 1);
          if (newGlobalIndex >= startIndex && newGlobalIndex <= endIndex) {
            // Ensure new index is within the page limits
            const newSampleId = sound_samples[newGlobalIndex].id;
            setCurrentPlayerId(newSampleId);
  
            // Schedule playback if needed
            setTimeout(() => {
              const audioElement = document.querySelector('audio');
              if (audioElement) {
                audioElement.play().catch(e => console.error('Error playing audio:', e));
              }
            }, 100);
  
            return newGlobalIndex;
          }
          return prev;  // Return previous if new index is out of bounds
        });
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [current_sample, currentPlayerId, playing, current_page, take, total]);
  
  


  // useEffect(() => {
  //   if (sound_samples.length > 0) {
  //     setCurrentSampleIndex(0); // Reset to the first item of the new page
  //   }
  // }, [current_page, sound_samples.length]);


  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const handlePageClick = async (event) => {
    setIsLoading(true);
    setPlaying(false);
    setCurrentPage(event.selected);
    const newCurrentSampleIndex = current_page * take;
    setCurrentSampleIndex(null);
    await getSamples(id, event.selected);
    console.log("Page changed to:", event.selected);
  };
  
  useEffect(() => {
    const init = async () => {
      await getSoundData();
      setLoadingData(false);
    };
    init();
  }, []);



  
  const getSamples = async (id, page = current_page) => {
    setIsLoading(true);
    console.log("take: ", take);
    const skip = current_page * take;

    const _samples = await getSoundSamples(id, {
      skip: page,
      take,
    });
    console.log("=== Samples ====");
    setTotal(_samples?.data?.results?.total);
    // setSoundSamples(_samples?.data?.results?.samples);
    setIsLoading(false);
  };

  /* 
    CLICK PLAYER'S BUTTON TO SWITCH SAMPLE PLAYER ICONS
  */ 
  useEffect(() => {
    const handlePlayButtonClick = (event) => {
      if (event.target.classList.contains("play-button")) {
        setPlaying(!playing); // Toggle the playing state
      }
    };

    // Attach the event listener to the parent element
    document.addEventListener("click", handlePlayButtonClick);

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener("click", handlePlayButtonClick);
    };
  }, [playing]); // Include playing in the dependencies array

  // useEffect(() => {
  //   const audioElement = document.getElementById('editor-section') as HTMLAudioElement;
  //   console.log('AUDIO ELEMENT: ', audioElement);
  //   if (!audioElement) return;
  
  //   if (playing) {
  //     console.log('Playing audio');
  //     // audioElement.play()
  //     //   .catch(e => console.error("Error trying to play the audio:", e));
  //   } else {
  //     console.log('Pausing audio');
  //     audioElement.pause();
  //   }
  // }, [playing]);
  
  // document.querySelectorAll('.play-button').forEach(button => {
  //   button.addEventListener('click', function() {
  //       const currentlyPlaying = document.querySelector('audio') as HTMLAudioElement;; // Assume 'playing' class marks an active audio
  //       console.log("currently playing: ", currentlyPlaying );
  //       if (currentlyPlaying && currentlyPlaying !== this.nextElementSibling) {
  //           currentlyPlaying.pause();
  //           currentlyPlaying.classList.remove('playing');
  //       }
  //       const audio = this.nextElementSibling; // Assuming <audio> is right after <button>
  //       if (audio.paused) {
  //           audio.play();
  //           audio.classList.add('playing');
  //       } else {
  //           audio.pause();
  //           audio.classList.remove('playing');
  //       }
  //   });
// });

  const stopSample = async (id) => {
    // Ensure the playback state is set to false
    setPlaying(false);

    // Find the container for the specific sample
    const searchModule = document.querySelector(`audio`);
    console.log("Search module found:", searchModule);
    if (searchModule && searchModule.shadowRoot) {
      const audio = searchModule.shadowRoot.querySelector("audio");
      if (audio) {
        // Reset the current time and pause the audio
        audio.currentTime = 0;
        audio.pause();
      } else {
        console.error("Audio element not found");
      }
    } else {
      console.error("Sample container or shadow root not found");
    }

    // Update the current player ID
    setCurrentPlayerId(id);
  };

  const handleSampleClick = useCallback(async (sample, index) => {
    setCurrentSampleIndex(index);
    // Check if the same sample is clicked and it is currently playing
    if (currentPlayerId === sample.id) {
      if (playing) {
        console.log('Sample is already playing. Attempting to pause.');
        await stopSample(sample.id);
        setPlaying(false); // This will trigger the useEffect to pause the sample
      } else {
        console.log('Sample was paused. Resuming play.');
        await stopSample(sample.id);
        setPlaying(true); // Resume playing the current sample
      }
    } else {
      // Different sample is clicked or nothing is playing
      console.log('Switching or starting a new sample.');
      if (playing) {
        console.log('Stopping the currently playing sample.');
        await stopSample(sample.id);
        setPlaying(false); // Ensure the current sample is stopped
        await new Promise(resolve => setTimeout(resolve, 100)); // Wait to ensure the audio is paused
      }
      
      // Set up the new sample to be played
      console.log('Setting up the new sample.');
      setCurrentPlayerId(sample.id);
      await stopSample(sample.id);
      await new Promise(resolve => setTimeout(resolve, 100)); // Optional: Ensure the UI has time to update if needed
      setPlaying(true); // Start playing the new sample
    }
  }, [currentPlayerId, playing, setPlaying, setCurrentPlayerId]);

  const getSoundData = async () => {
    setIsLoading(true);

    const _sound: any = await getSound( id );

    const list = [];

    console.log("=== Playlst ====")
    for (let i = 0; i < _sound?.data?.results.samples.length; i++) {
      const _item = {
        name: _sound?.data?.results.samples[i].filename,
        writer: "SoundBoyz",
        img: _sound?.data?.results.thumbnail,
        src: _sound?.data?.results.samples[i].sample_src,
        id: i + 1
      };
      list.push(_item);
    }
    console.log("take: ", take);
    const startIndex = current_page * take; // ensure current_page is zero-indexed, adjust if it starts from 1
    const endIndex = startIndex + take;
    
    const pageItems = list.slice(startIndex, endIndex);
    console.log("pageItems: ", pageItems);
    setListPlaylist(list);
    setPlaylist(list);
    setSoundSamples(_sound?.data?.results?.samples);
    await getSamples( id, current_page );

    console.log(_sound);
    console.log("lkasdfjkl: ", _sound?.data?.results);
    setSound(_sound?.data?.results);

    setIsLoading(false);
  };

  // useEffect(() => {
  //   // Check if the playlist is not empty
  //   if (playlist && playlist.length > 0) {
  //     setPreview(true);
  //   } else {
  //     setPreview(false);
  //   }
  // }, [playlist]); // This effect runs whenever the playlist changes



  // useEffect(() => {
  //   // Calculate the starting index for the current page
  //   const newCurrentSampleIndex = current_page * take;
  //   setCurrentSampleIndex(newCurrentSampleIndex);
  // }, [current_page, take]);



  useEffect(() => {
    console.log("curr index: ", currentSampleIndex);
  }, []
)




// Create a reversed copy of the playlist for rendering
const reversedPlaylist = [...playlist].reverse();


  // Function to calculate the range of items to display based on the current page
  const startIndex = current_page * take;
  const endIndex = startIndex + take;

  // Slice the sound_samples to get only the items for the current page
  const currentSamples = sound_samples.slice(startIndex, endIndex);
  
  return (
    <React.Fragment>
      <Theme>
        <div className="second-div w-[85%] flex flex-col z-0">
          <div className="bg-[#101010] p-[40px]">
            {loading ? (
              <>
                <div
                  role="status"
                  className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
                >
                  <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
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
                <div className="mt-[16px] gap-[22px] flex">
                  <div>
                    <img className="h-[250px]" src={sound?.thumbnail} />
                  </div>
                  <div className="text">
                    <p className="text-[40px] text-[#fff] font-['Mona-Sans-M']">
                      {sound?.name}
                    </p>
                    <p className="text-[#878787] text-[14px] font-['Mona-Sans-M']">
                      By: {sound?.author}
                    </p>
                    <p className="text-[14px] text-[#bebebe] w-[315px] my-[24px]">
                      {sound?.description}
                    </p>
                  </div>
                  <div className="border-x border-[#282828] border-y-0 my-[50px]"></div>
                </div>
              </>
            )}
          </div>
          {/* <div className="bg-[#151515] border border-x-0 border-y-[#222] p-[20px]">
            <p className="text-[16px] text-[#C2C2C2] pb-[12px] font-['Mona-Sans-M']">
              About
            </p>
            <p className="text-[14px] font-[400] font-['Mona-Sans-M'] text-[#a1a1a1]">
              By downloading any content from this Sample Pack, you agree to a
              20%{" "}
            </p>
            <p className="text-[14px] font-['Mona-Sans-M'] text-[#a1a1a1]">
              publishing and starting 1% master royalty for instrument loops
              and...{" "}
              <a className="text-[#528FFF] underline" href="#">
                View More
              </a>
            </p>
          </div> */}
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
              <div className="bg-[#101010] pt-[0px]">
                <div className="bg-black-900">
                  <div className="mx-auto max-w-7xl">
                    <div className="bg-black-900 py-10">
                      <div className="px-4 sm:px-6 lg:px-8">
                        <div className=" flow-root">
                          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 pl-[0px] align-middle sm:px-6 ">
                              <table className="-z-50 min-w-full divide-y divide-gray-700">
                                <thead>
                                  <tr>
                                    <th
                                      scope="col"
                                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
                                    >
                                      Sample
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                                    ></th>
                                    <th
                                      scope="col"
                                      className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                                    >
                                      Filename
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                                    ></th>
                                    <th
                                      scope="col"
                                      className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                                    >
                                      Time
                                    </th>
                                    <th
                                      scope="col"
                                      className="px-3 py-3.5 text-left text-sm font-semibold text-white"
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
                                      className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                                    >
                                      <span className="sr-only">Edit</span>
                                    </th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800">
                                  {sound_samples &&
                                    currentSamples.map((x: any, index) => {
                                      const considering = x.considering?.split(',');
                                      const globalIndex = current_page * take + index; // Correctly compute the global index
                                      return (
                                        <>
                                          <tr key={x.id}
                                            id={`sample-item-${x.id}`}
                                            className={`whitespace-nowrap px-3 py-4 text-sm text-gray-300 ${index === currentSampleIndex ? 'active-sample' : ''}`}>
                                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                              <img
                                                className=" cursor-pointer mr-[32px]"
                                                src = {
                                                  currentPlayerId == x.id &&
                                                    playing
                                                    ? "https://mvssive-content.s3.amazonaws.com/pause-button.png"
                                                    : "https://mvssive-content.s3.amazonaws.com/play-button-2.png"
                                                }
                                                onClick={async () => {
                                                  handleSampleClick(x, index);
                                                  setCurrentPlayerIndex(globalIndex);
                                                  setPreview(true);
                                                }}

                                              />
                                            </td>
                                            <td className="">
                                              <img
                                                src="https://mvssive-content.s3.amazonaws.com/audio-icon.png"
                                                className="w-[80px] h-[50px]"
                                              />
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-[14px] text-[#CECFDA] font-['Mona-Sans-M']">
                                              {x.filename}
                                              <br />{" "}
                                              <span className="text-[12px] text-[#6f6f6f]">
                                                SoundBoyz
                                              </span>{" "}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                              {/* <AudioPlayer
                                                link={`${x.sample_src}`}
                                                id={x.id}
                                                setPlaying={setPlaying}
                                              /> */}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                              0:35
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                              BMinor
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                              122
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
                                            <td className="flex whitespace-nowrap px-3 py-4">
                                              {parseInt(x.is_liked) === 1 ? (
                                                <>


                                                  <Toggle is_liked={true} sample={x} />


                                                </>
                                              ) : (
                                                <>

                                                  <Toggle is_liked={false} sample={x} />


                                                </>
                                              )}
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Start Pagination */}

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
              />
            </>
          )}

          {/* End Pagination */}

          {sound?.terms && (

            <>
              <div className="bg-[#101010]">
                <div className="mx-[20px] border border-x-0 border-y-[#222] py-[20px] px-[20px]">
                  <p className="text-[16px] text-[#A7A7A7] pb-[12px] font-['Mona-Sans-M']">
                    Terms of Use
                  </p>
                  <p className="text-[14px] font-['Mona-Sans-M'] text-[#363636]">
                    {sound?.terms}
                  </p>
                </div>
              </div>
            </>
          )}
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
      {preview && (
        <>
          <Player
            key={`${currentSampleIndex}-${current_page}`} // Change the key when currentSampleIndex or playlist changes
            playlist={[...reversedPlaylist].reverse()} 
            currentSampleIndex={currentPlayerIndex}
            isPlaying={playing}
            take={take} />
        </>
      )}

    </React.Fragment>
  );
};

export default SamplesPage;