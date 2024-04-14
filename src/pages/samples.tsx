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
import { getSound } from "redux/actionCreators/sounds";
import useDynamicRefs from "use-dynamic-refs";
import AudioPlayer from "components/AudioPlayer";
import DropDown from "components/theme/dropdown";



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

  const [currentPlayerId, setCurrentPlayerId] = useState(null);

  const { id } = useParams();

  const [sound, setSound]: any = useState({});

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

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

  const getSoundData = async () => {
    setIsLoading(true);

    const _sound = await getSound(id);

    console.log(_sound);

    setSound(_sound?.data?.results);

    setIsLoading(false);
  };

  console.log(sound);

  return (
    <React.Fragment>
      <Theme>
        <div className="second-div w-[85%] flex flex-col">
          <div className="bg-[#101010] p-[40px]">
            <div className="mt-[16px] gap-[22px] flex">
              <div>
                <img
                  className="h-[250px]"
                  src="https://zahidlawoffice.com/wp-content/uploads/2024/04/Rectangle-3467557.png"
                />
              </div>
              <div className="text">
                <p className="text-[40px] text-[#fff] font-['Mona-Sans-M']">
                  Vintage Synths
                </p>
                <p className="text-[#878787] text-[14px] font-['Mona-Sans-M']">
                  By: SoundBoyz
                </p>
                <p className="text-[14px] text-[#bebebe] w-[315px] my-[24px]">
                  Vintage loops are designed using only analog synthesizers like
                  the famous jupiter,, moog, etc.
                </p>
                <button className="border font-['Mona-Sans-S'] flex bg-[#C4FF48] px-[16px] py-[12px] border-[#5C5C5C] border-2px text-[#000] rounded-[8px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                      stroke="black"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 8L16 12L10 16V8Z"
                      stroke="black"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="ml-[8px]">Preview</span>
                </button>
              </div>
              <div className="border-x border-[#282828] border-y-0 my-[50px]"></div>
            </div>
          </div>
          <div className="bg-[#151515] border border-x-0 border-y-[#222] p-[20px]">
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
          </div>
          <div className="drop bg-[#101010] px-[20px] py-[10px]">
            <h3 className="text-[20px] text-[#fff] font-['Mona-Sans-M']">
              Samples
            </h3>
            <div className="flex gap-[12px]">
              <select
                id="countries"
                className=" text-[14px] mt-[8px] bg-[#161616] text-[14px] px-[16px] w-[90px] py-[8px] rounded-[8px] border border-[#5C5C5C] text-[#C9C9C9]"
              >
                <option>Key</option>
                <option value="US">Armidale</option>
                <option value="CA">Ballina</option>
              </select>
              <select
                id="countries"
                className=" text-[14px] mt-[8px] bg-[#161616] text-[14px] px-[16px] w-[90px] py-[8px] rounded-[8px] border border-[#5C5C5C] text-[#C9C9C9]"
              >
                <option>BPM</option>
                <option value="US">Armidale</option>
                <option value="CA">Ballina</option>
              </select>
            </div>
            <p className="text-[#9C9C9C] font-['Mona-Sans-M'] pt-[32px]">
              313 Results
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
                              <table className="min-w-full divide-y divide-gray-700">
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
                                      consdering
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
                                  {sound?.samples?.map((x: any) => {
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
                                                  if(playing) {
                                                    await stopSample(currentPlayerId);
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
                                            <img
                                              className="flex ml-[5px] mb-[3px]"
                                              src="https://zahidlawoffice.com/wp-content/uploads/2024/04/images.png"
                                            />{" "}
                                            <span className="text-[10px] ml-[10px] mt-[10px] text-[#929292] underline font-['Mona-Sans-M']">
                                              View All
                                            </span>
                                          </td>
                                          <td className="flex whitespace-nowrap px-3 py-4">
                                            <div className="ml-[100px]">
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
                                            </div>
                                            <div className="ml-[15px]">
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
                                            </div>

                                            <DropDown props={x} />
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

          <div className="bg-[#101010]">
            <div className="mx-[20px] border border-x-0 border-y-[#222] py-[20px] px-[20px]">
              <p className="text-[16px] text-[#A7A7A7] pb-[12px] font-['Mona-Sans-M']">
                Terms of Use
              </p>
              <p className="text-[14px] font-['Mona-Sans-M'] text-[#363636]">
                By downloading any content from this Sample Pack, you agree to a
                20%
              </p>
              <p className="text-[14px] font-['Mona-Sans-M'] text-[#363636]">
                publishing and starting 1% master royalty for instrument loops
                and ....{" "}
                <a className="text-[#528FFF] underline" href="#">
                  View More
                </a>
              </p>
            </div>
          </div>
          {/* Recommended */}
        </div>
      </Theme>
    </React.Fragment>
  );
};

export default SamplesPage;
