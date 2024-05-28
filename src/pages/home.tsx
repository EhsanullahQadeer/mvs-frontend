/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */

import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSounds } from "redux/actionCreators/sounds";
import ActionType from "redux/actionTypes";
import Theme from "theme";
import ScrollableContainer from "util/ScrollableContainer";

declare const require: {
  context: (directory: string, useSubdirectories?: boolean, regExp?: RegExp) => {
    keys: () => string[];
    <T>(id: string): T;
  };
};

const importAll = (requireContext) => {
  return requireContext.keys().map(requireContext);
};

const images = importAll(require.context('../assets/img/partners', false, /\.(png|jpe?g|svg)$/));

interface RootState {
  auth: any;
  sounds: any;
}

const Loader = () => {
  return (
    <>
      {Array(5)
        .fill(undefined)
        .map(function (v, i) {
          return (
            <>
              <div
                role="status"
                className="flex w-[100%] items-center justify-center h-56 max-w-sm bg-gray-800 rounded-lg animate-pulse dark:bg-gray-700"
              >
                <svg
                  className="w-10 h-10 text-gray-200 dark:text-gray-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 20"
                >
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                  <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            </>
          );
        })}
    </>
  );
};

const HomeFeed = () => {
  const [sample, setSample] = useState(true);
  const [vocal, setVocal] = useState(true);
  const [run, setRun] = useState(true); // Automatically start the tour

  const [loading, setLoading] = useState(false);

  const [sounds, setSounds] = useState([]);

  const dispatch: any = useDispatch();

  const [samples, setSamples] = useState([]);

  const [vocals, setVocals] = useState([]);

  const navigate = useNavigate();

  const state = useSelector((state: RootState) => state);
  const stateSamples = state.sounds.sounds;

  const populateSamples = useCallback(() => {
    if (sounds.length !== stateSamples.length) {
      setSounds(stateSamples);
      setVocals(stateSamples.filter((x: any) => x.type === "Vocal"));
      setSamples(stateSamples.filter((x: any) => x.type === "Sample"));
    }
    setLoading(false);
  }, [sounds, setSounds, stateSamples, setVocals, setLoading, setSamples]);

  useEffect(() => {
    if (sounds.length !== stateSamples.length && loading) {
      populateSamples();
    }
  }, [loading, sounds, stateSamples, populateSamples]);

  useEffect(() => {
    setLoading(true);
    dispatch(getSounds());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Theme>
      <div className="onboard-body"></div>
      <div className="onboard-terms"></div>

      <div className="m-2">
        <ScrollableContainer
          scrollAutomatically={true}
          title="Our Partners"
          desc="The Engine of Our Success | Empowering Our Growth: Meet Our Partners.">
            <div className="carousel-inner flex transition-transform duration-1000 ease-linear">
            {images.map((image, index) => (
              <img
                key={index} // Use the index as the key
                src={image} // Use the image from the array
                alt={`Slide ${index + 1}`}
                style={{
                  borderRadius: 4,
                  width: 500,
                  height: 200,
                  margin: '4px'
                }}
              />
            ))}
          </div>
        </ScrollableContainer>
      </div>

      <div className="bg-[#101010] p-[12px] border-b-2 border-t-2 border-[#1F1F1F]">
          <div className="flex items-center space-x-4 font-['Mona-Sans-M'] font-[12px]">
            <button
              onClick={() => {
                setSample(true);
                setVocal(true);
              }}
              className={`${
                sample === true
                  ? "border h-[30px] bg-[#CD7255] px-[8px] py-[4px] border-[#C4FF48] border-2 text-[#fff] rounded-[4px] text-xs truncate"
                  : "border h-[30px] px-[8px] py-[4px] border-[#5C5C5C] border-2 text-[#5C5C5C] rounded-[4px] text-xs truncate"
                }`}
              >
                Sample Loops
            </button>

          <button
            onClick={() => {
              setVocal(false);
              setSample(false);
            }}
            className={`${
              vocal === false
                ? "border w-[96px] h-[30px] bg-[#CD7255] px-[8px] py-[4px] border-[#C4FF48] border-2 text-[#fff] rounded-[4px] text-xs truncate"
                : "border w-[96px] h-[30px] px-[8px] py-[4px] border-[#5C5C5C] border-2 text-[#5C5C5C] rounded-[4px] text-xs truncate"
            }`}
            >
            Vocals Loops
          </button>
        </div>
      </div>

      <div
        style={{
          overflow: 'auto',
          msOverflowStyle: 'none',  // IE 10+
          scrollbarWidth: 'none',   // Firefox
        }}
        className="onboard-3 flex flex-col w-full bg-[#101010] p-[16px] h-full"
      >
        <style>
          {`
            .onboard-3::-webkit-scrollbar {
              display: none;  /* Chrome, Safari, Opera */
            }
          `}
        </style>

        {sample === true && vocal === true ? (
          <>
            <ScrollableContainer
              showScrollArrows={true}
              title="New This Week"
              desc="Packs and sounds crafted just for you. Updated Weekly."
            >
              {loading ? (<Loader/>) : (
                (() => {
                  let isFirstItem = true;

                  return samples.map((sample, index) => {
                    const cardClassName = `cursor-pointer p-[12px] bg-[#232426] border border-[#494949] rounded-[4px] flex-shrink-0 card ${
                      isFirstItem ? '' : 'ml-[4px]'
                    }`;

                    // After handling the first item, update the flag
                    isFirstItem = false;

                    return (
                      <div
                        key={sample.id}
                        onClick={() => navigate(`/sound/samples/${sample.id}`)}
                        className={cardClassName}
                      >
                        <img
                          src={sample.thumbnail}
                          alt={`Sample named ${sample.name}`}
                          className="w-[150px] h-[150px]"
                        />
                        <p
                          className="text-[14px] pt-[8px] font-['Mona-Sans-M'] text-[#fff] truncate-text"
                          title={sample?.name}
                        >
                          {sample?.name}
                        </p>
                        <p className="text-[12px] pb-[22px] font-['Mona-Sans-M'] text-[#777] truncate-text">
                          {sample?.genre}
                        </p>
                        <p className="text-[12px] font-['Mona-Sans-M'] text-[#777] truncate-text">
                          {sample?.author}
                        </p>
                      </div>
                    );
                  });
                })()
              )}
            </ScrollableContainer>

            <div className="m-[4px]"></div>

            <ScrollableContainer
              showScrollArrows={true}
              title="Guitar Loops"
              desc="Discover our hottest guitar loops updated weekly."
            >
              {loading ? (<Loader/>) : (
                (() => {
                  let isFirstItem = true;
                  return samples.map((sample, index) => {
                    const tagLowercase = sample.tags?.toLowerCase();
                    if (!tagLowercase){
                      console.log("returning null"); 
                      return null;
                    }

                    if (!tagLowercase.includes('guitar')) {
                      return null;
                    }

                    const cardClassName = `cursor-pointer p-[12px] bg-[#232426] border border-[#494949] rounded-[4px] flex-shrink-0 card ${
                      isFirstItem ? '' : 'ml-[4px]'
                    }`;

                    // After handling the first item, update the flag
                    isFirstItem = false;

                    return (
                      <div
                        key={sample.id}
                        onClick={() => navigate(`/sound/samples/${sample.id}`)}
                        className={cardClassName}
                      >
                        <img
                          src={sample.thumbnail}
                          alt={`Sample named ${sample.name}`}
                          className="w-[150px] h-[150px]"
                        />
                        <p
                          className="text-[14px] pt-[8px] font-['Mona-Sans-M'] text-[#fff] truncate-text"
                          title={sample?.name}
                        >
                          {sample?.name}
                        </p>
                        <p className="text-[12px] pb-[22px] font-['Mona-Sans-M'] text-[#777] truncate-text">
                          {sample?.genre}
                        </p>
                        <p className="text-[12px] font-['Mona-Sans-M'] text-[#777] truncate-text">
                          {sample?.author}
                        </p>
                      </div>
                    );
                  });
                })()
              )}
            </ScrollableContainer>

            <div className="m-[4px]"></div>

            <ScrollableContainer
              showScrollArrows={true}
              title="Synths & Reggaeton"
              desc="Fresh synths and reggaeton loops, updated weekly."
            >
              {loading ? (<Loader/>) : (
                (() => {
                  let isFirstItem = true;
                  return samples.map((sample, index) => {
                    const tagLowercase = sample.tags?.toLowerCase();
                    if (!tagLowercase){
                      console.log("returning null"); 
                      return null;
                    }
                    console.log("tags", tagLowercase);

                    if (!tagLowercase.includes('synth') || !tagLowercase.includes('reggaeton')) {
                      return null;
                    }

                    const cardClassName = `cursor-pointer p-[12px] bg-[#232426] border border-[#494949] rounded-[4px] flex-shrink-0 card ${
                      isFirstItem ? '' : 'ml-[4px]'
                    }`;

                    // After handling the first item, update the flag
                    isFirstItem = false;

                    return (
                      <div
                        key={sample.id}
                        onClick={() => navigate(`/sound/samples/${sample.id}`)}
                        className={cardClassName}
                      >
                        <img
                          src={sample.thumbnail}
                          alt={`Sample named ${sample.name}`}
                          className="w-[150px] h-[150px]"
                        />
                        <p
                          className="text-[14px] pt-[8px] font-['Mona-Sans-M'] text-[#fff] truncate-text"
                          title={sample?.name}
                        >
                          {sample?.name}
                        </p>
                        <p className="text-[12px] pb-[22px] font-['Mona-Sans-M'] text-[#777] truncate-text">
                          {sample?.genre}
                        </p>
                        <p className="text-[12px] font-['Mona-Sans-M'] text-[#777] truncate-text">
                          {sample?.author}
                        </p>
                      </div>
                    );
                  });
                })()
              )}
            </ScrollableContainer>
          </>
      ) : (
        <>
          <p className="text-[#fff] text-[24px] font-['Mona-Sans-S']">
            New This Week
          </p>
          <p className="text-[#6e6e6e] pb-[20px] font-['Mona-Sans-M']">
            Packs and sounds crafted just for you. Updated Weekly.
          </p>
          <div className="flex overflow-x-auto gap-[8px]">
            {loading ? (
              <Loader />
            ) : (
              vocals.map((vocal: any) => (
                <div
                  key={vocal.id}
                  onClick={() => navigate(`/sound/vocals/${vocal.id}`)}
                  className="cursor-pointer p-[12px] bg-[#232426] border border-[#494949] rounded-[4px] card"
                >
                  <img
                    src={vocal.thumbnail}
                    alt={`Vocal named ${vocal.name}`}
                    className="w-[175px] h-[175px]"
                  />
                  <p className="text-[14px] pt-[8px] font-['Mona-Sans-M'] text-[#fff]">
                    {vocal.name}
                  </p>
                  <p className="text-[12px] pb-[22px] font-['Mona-Sans-M'] text-[#777]">
                    {vocal?.genre}
                  </p>
                  <p className="text-[12px] font-['Mona-Sans-M'] text-[#777]">
                    MVSSIVE
                  </p>
                </div>
              ))
            )}
          </div>
        </>
      )}

      </div>
      </Theme>
    </React.Fragment>
  );
};

export default HomeFeed;
