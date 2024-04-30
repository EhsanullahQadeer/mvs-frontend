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
import { useParams } from "react-router-dom";
import Theme from "components/theme";
import React, { useCallback, useEffect, useState } from "react";

import {
  getSound,
  getSoundSamples,
  saveSampleDownload,
} from "redux/actionCreators/sounds";
import AudioPlayer from "components/AudioPlayer";
import DropDown from "components/theme/dropdown";
import ConsideringModal from "components/modals/considering";
import ReactPaginate from "react-paginate";

import Toggle from "components/toggle";
import Avatar from 'react-avatar';


const SamplesPage = () => {

  const { id } = useParams();
  const [current_page, setCurrentPage] = useState(0); // Holds the current page number
  const [loading, setLoading]          = useState(false); // Indicates samples are being loaded
  const [playing, setPlaying]          = useState(false); // Indicates audio is currently playing
  const [preview, setPreview]          = useState(false); // Used to show the sample player
  const [sound_samples, setSoundSamples] = useState([]);

  const [take, setTake] = useState(10);
  const [total, setTotal] = useState(0);
  const [sound, setSound]: any = useState({});
  const [considering, setConsidering] = useState(false);
  const [sample, setSample] = useState({});

  // Audio and player controls
  const [volume, setVolume] = useState(50);                // Volume control
  const [currentSampleIndex, setCurrentSampleIndex] = useState(null);
  const [manualToggle, setManualToggle] = useState(false); // Manual toggle
  const [currentPlayerId, setCurrentPlayerId] = useState(null);


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
            setLoading(true);

            setCurrentPage(current_page - 1);
            setCurrentSampleIndex(take - 1);
            
            await getSamples(id, current_page - 1);

            setPlaying(true);
        } 
        else if (newIndex >= sound_samples.length && current_page < Math.ceil(total / take) - 1) {
            setLoading(true);

            setCurrentPage(current_page + 1);
            setCurrentSampleIndex(0);

            await getSamples(id, current_page + 1);

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
    setLoading(true);
    setCurrentPage(event.selected);
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






  /*
   * Initialization of sample player
   */
  useEffect(() => {
    const init = async () => {
      await getSoundData();
    };
    init();
  }, []);

  const getSamples = async (id, page = current_page) => {
    setLoading(true);
    const _samples = await getSoundSamples(id, {
      skip: page,
      take,
    });

    setTotal(_samples?.data?.results?.total);
    setSoundSamples(_samples?.data?.results?.samples);
    setLoading(false);
  };

  const getSoundData = async () => {
    setLoading(true);

    const _sound: any = await getSound( id );
    const list = [];

    for (let i = 0; i < _sound?.data?.results.samples.length; i++) {
      const _item = {
        filename: _sound?.data?.results.samples[i].filename,
        author: "SoundBoyz",
        thumbnail: _sound?.data?.results.thumbnail,
        sample_src: _sound?.data?.results.samples[i].sample_src,
        id: i + 1
      };
      list.push(_item);
    }
    await getSamples( id, current_page );
    setSound(_sound?.data?.results);
    setLoading(false);
  };



  return (
    <React.Fragment>
      <Theme>
        <div className="second-div w-full  min-h-screen flex flex-col z-0 pb-[130px]">
          <div className="bg-[#101010] p-[40px]">
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
                                      className="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-white sm:pl-0"
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
                                <tbody className="container">
                                  {sound_samples &&
                                    sound_samples.map((x: any, index) => {
                                      const globalIndex = current_page * take + index; // Correctly compute the global index
                                      const considerings = sound_samples[index]?.considering?.split(',') || [];
                                      return (
                                        <>
                                          <tr key={x.id}
                                            id={`sample-item-${x.id}`}
                                            className={`whitespace-nowrap px-3 py-4 text-sm text-gray-300 ${index === currentSampleIndex ? 'active-sample' : ''}`}>
                                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                            <img
                                              className="cursor-pointer mr-[32px]"
                                              style={{ width: '32px', height: '32px', borderRadius: '4px'  }}
                                              src={sound?.thumbnail}
                                              alt={index === currentSampleIndex && playing
                                                ? "Pause" 
                                                : "Play"}
                                              onClick={async () => {
                                                  handleSampleClick(x, index);
                                                  setPreview(true);
                                                  handlePlayToggle();
                                              }}
                                            />
                                          </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-[14px] text-[#CECFDA] font-['Mona-Sans-M']">
                                              {x.filename}
                                              <br />{" "}
                                              <span className="text-[12px] text-[#6f6f6f]">
                                                {sound?.author}
                                              </span>{" "}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                            <div className="w-[300px] min-w-0">
                                              <AudioPlayer
                                                link={x.sample_src}
                                                id={x.id}
                                                setPlaying={false}
                                                playerType={"sample"}
                                                volume={0}
                                                />
                                              </div>
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

                                            {considerings.length > 0 && considerings.map((person, idx) => {
                                                return (
                                                  <Avatar key={idx} name={person} round={true} title={person} size="30" className="flex ml-[5px] mb-[3px]" />
                                                );
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
                      {/* </div>
                    </div>
                  </div>
                </div>
              </div> */}
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
                forcePage={current_page}
              />
            </>
          )}

          {/* End Pagination */}

          {sound?.terms && (
            <>
              <div className="bg-[#101010]  h-full">
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
      { preview && (
    <>
  <div className="bottom-audio-player">

  <div className="sample-container">
    <div className="album-art">
        <img 
          src={sound?.thumbnail || ''} 
          alt="Album Art"
        />
      </div>
    <div className="album-details">
      <div className="album-name">
        {sound_samples[currentSampleIndex]?.filename ?? 'Album Name'}
      </div>
      <div className="album-author">
        {sound?.author ?? 'Author Name'}
      </div>
    </div>
  </div>

  <div className="audio-container">

    {/* Previous Button */}
    <button className="control-button" onClick={handlePrevClick}>
      <img src={require('../assets/img/prev.png')} />
    </button>

    {/* Pause/Play Button */}
    <button className="control-button" onClick={handlePlayToggle}>
      {playing ? (
          <img src={require('../assets/img/pause.png')} alt="Pause" />
      ) : (
          <img src={require('../assets/img/play.png')} alt="Play" />
      )}
    </button>

    {/* Next Button */}
    <button className="control-button" onClick={handleNextClick}>
      <img src={require('../assets/img/next.png') } />
    </button>

    {/* Audio Player Component */}
    <AudioPlayer
        link={ sound_samples[currentSampleIndex]?.sample_src }
        id={ sound_samples[currentSampleIndex]?.id }
        setPlaying={ playing }
        playerType={ "player" }
        volume={ volume }
        />
    </div>


    <div className="volume-container">
    {/* Volume Button */}
    <button className="volume-button">
        <img src={require('../assets/img/volume.png')} alt="Volume"/>
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
  </>
)}
      
    </React.Fragment>
  );
};

export default SamplesPage;