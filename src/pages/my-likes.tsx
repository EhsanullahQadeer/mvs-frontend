/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import { useNavigate, useParams } from "react-router-dom";
import Theme from "components/theme";
import React, { Fragment, useEffect, useRef, useState } from "react";
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


interface RootState {
  auth: any;
  sounds: any;
}

const MyLikesPage = () => {
  const navigate = useNavigate();
  const state = useSelector((state: RootState) => state);
  const [loading, setIsLoading] = useState(false);

  const [loadingData, setLoadingData] = useState({});

  const [playing, setPlaying] = useState(false);

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
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const handlePageClick = async (event) => {
    setIsLoading(true);

    setCurrentPage(event.selected);
    await getSamples(event.selected);

    console.log("offset", event.selected);
  };

  const playSample = async (id: any) => {
    setPlaying(true);
    setCurrentPlayerId(id);
    const searchModule = document.querySelector(`#id-${id} > div`);
    searchModule.shadowRoot.querySelector("audio").currentTime = 9;
    searchModule.shadowRoot
      .querySelector("audio")
      .play()
      .then((x) => setCurrentPlayerId(id));
  };

  const stopSample = async (id: any) => {
    setPlaying(false);
    setCurrentPlayerId(id);
    const searchModule = document.querySelector(`#id-${id} > div`);
    searchModule.shadowRoot.querySelector("audio").currentTime = 0;
    searchModule.shadowRoot.querySelector("audio").pause();
  };

  useEffect(() => {
    const init = async () => {
      await getSoundData();
      setLoadingData(false);
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

    await getSamples(current_page);


    setIsLoading(false);
  };

  console.log(sound);

  return (
    <React.Fragment>
      <Theme>
        <div className="second-div w-[85%] flex flex-col z-0">
          <div className="bg-[#101010] p-[40px]">
            <div className="mt-[16px] gap-[22px] flex">
              <div>
                <svg
                  width="270"
                  height="270"
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
              <div className="border-x border-[#282828] border-y-0 my-[50px]"></div>
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
              <div className="bg-[#101010] pt-[10px]">
                <div className="bg-black-900">
                  <div className="mx-auto max-w-7xl">
                    <div className="bg-black-900 py-10">
                      <div className="px-4 sm:px-6 lg:px-8">
                        <div className="mt-8 flow-root">
                          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
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
                                    sound_samples.map((x: any) => {
                                      const considering = x.considering?.split(',');

                                      return (
                                        <>
                                          <tr key={x.id}>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                              <img
                                                className=" cursor-pointer mr-[32px]"
                                                src={
                                                  currentPlayerId == x.id &&
                                                    playing === true
                                                    ? "https://mvssive-content.s3.amazonaws.com/pause-button.png"
                                                    : "https://mvssive-content.s3.amazonaws.com/play-button-2.png"
                                                }
                                                onClick={async () => {
                                                  if (
                                                    currentPlayerId === x.id &&
                                                    playing === true
                                                  ) {
                                                    await stopSample(x.id);
                                                  } else {
                                                    if (playing) {
                                                      await stopSample(
                                                        currentPlayerId
                                                      );
                                                      await playSample(x.id);
                                                    } else {
                                                      await playSample(x.id);
                                                    }
                                                  }
                                                }}
                                              />
                                            </td>
                                            <td className="">
                                              {/* <img
                                              src="https://mvssive-content.s3.amazonaws.com/audio-icon.png"
                                              className="w-[50px] h-auto"
                                            /> */}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-[14px] text-[#CECFDA] font-['Mona-Sans-M']">
                                              {x.filename}
                                              <br />{" "}
                                              <span className="text-[12px] text-[#6f6f6f]">
                                                SoundBoyz
                                              </span>{" "}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                              <AudioPlayer
                                                link={`${x.sample_src}`}
                                                id={x.id}
                                                setPlaying={setPlaying}
                                                // onPlayToggle={null}
                                                playerType={"sample"}
                                                volume={0}
                                              />
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
    </React.Fragment>
  );
};

export default MyLikesPage;
