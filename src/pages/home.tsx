/*************************************************************************
 * @file home.tsx
 * @author End Quote
 * @desc Main component for displaying the home feed with various 
 *       sound samples.
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* IMPORTS */
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/* LOCAL IMPORTS */
import { getSounds } from "../redux/actions";
import Theme from "theme";
import ScrollableContainer from "components/util/scrollable-container";

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

        { /*  Home Header  */}

        <div className="flex gap-1 items-center px-5 py-2.5 text-xs leading-4 text-center whitespace-nowrap border-b border-solid bg-zinc-950 border-b-zinc-900 text-neutral-700">
          <div className="flex gap-2 items-center self-stretch my-auto min-w-[240px]">
            <div className="flex gap-1 justify-center items-center self-stretch px-3 py-2 my-auto border border-solid bg-neutral-900 border-neutral-800 rounded-[35px]">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/46514025f3ef40d3a73c1b149cb08cea5bdc67626d2decbd3eea84218c3ce6ae?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
              />
              <div className="self-stretch my-auto">Home</div>
            </div>
            <div className="flex gap-1 justify-center items-center self-stretch px-3 py-2 my-auto font-semibold text-black bg-lime-400 rounded-[35px]">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/3dc22245e0b2253cc7261cd81a16ccc78c8061df30648112dd10b6dc58f3a53c?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
              />
              <div className="self-stretch my-auto">Browse</div>
            </div>
            <div className="flex gap-1 justify-center items-center self-stretch px-3 py-2 my-auto border border-solid bg-neutral-900 border-neutral-800 rounded-[35px]">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/aac149d1675e6a08f7848b87a701fd337d070b46334c8c98353c53b590e80947?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
              />
              <div className="self-stretch my-auto">Samples</div>
            </div>
            <div className="flex gap-1 justify-center items-center self-stretch px-3 py-2 my-auto border border-solid bg-neutral-900 border-neutral-800 rounded-[35px]">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/78e85c898ea29975f698d85370060db443c7e9f2dd7d0a6eb57b020342e45775?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
              />
              <div className="self-stretch my-auto">Marketplace</div>
            </div>
          </div>
        </div>

        { /*  Home Header End  */}

        { /*  Home Welcome Box  */}

        <div className="flex overflow-hidden gap-10 bg-neutral-900">
          <div className="flex gap-7">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/0f5947849cf790a3f79895aa7b5cead440e446fc7fba13c88ef31d8cf13047b6?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
              className="object-contain shrink-0 max-w-full aspect-[0.5] w-[121px]"
            />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/5f45775a0d58123ce6bad7f4899b5a062b60a95df37fb5555b87ae8c2fb29cc1?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
              className="object-contain shrink-0 self-end mt-52 w-0 max-md:mt-10"
            />
            <img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/77b01e220d53a2ce6e1ff59ed219fc274c8043e9d4760a0cdabdc1a75e8d121c?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/77b01e220d53a2ce6e1ff59ed219fc274c8043e9d4760a0cdabdc1a75e8d121c?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/77b01e220d53a2ce6e1ff59ed219fc274c8043e9d4760a0cdabdc1a75e8d121c?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/77b01e220d53a2ce6e1ff59ed219fc274c8043e9d4760a0cdabdc1a75e8d121c?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/77b01e220d53a2ce6e1ff59ed219fc274c8043e9d4760a0cdabdc1a75e8d121c?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/77b01e220d53a2ce6e1ff59ed219fc274c8043e9d4760a0cdabdc1a75e8d121c?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/77b01e220d53a2ce6e1ff59ed219fc274c8043e9d4760a0cdabdc1a75e8d121c?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/77b01e220d53a2ce6e1ff59ed219fc274c8043e9d4760a0cdabdc1a75e8d121c?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
              className="object-contain shrink-0 my-auto rounded-none aspect-square w-[71px]"
            />
          </div>
          <div className="flex flex-wrap gap-1 items-end my-auto max-md:max-w-full">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/e54b00f9438ee9fe9aa44dd71cbfd1bff5eeb694a147059e70285e91d5e47bba?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
              className="object-contain shrink-0 mt-12 max-w-full aspect-[1.17] w-[127px] max-md:mt-10"
            />
            <div className="flex mt-6 max-md:max-w-full">
              <div className="flex flex-col mr-0 max-md:max-w-full">
                <div className="flex flex-col w-full text-center max-md:max-w-full">
                  <div className="self-center text-3xl font-medium tracking-tighter leading-none text-neutral-300">
                    Welcome to{" "}
                    <span className="font-semibold text-neutral-300">MVSSIVE</span>!
                  </div>
                  <div className="mt-1 text-sm leading-none text-gray-500 max-md:max-w-full">
                    The ultimate hub for connecting with music industry
                    professionals.
                  </div>
                </div>
                <div className="flex overflow-hidden flex-col justify-center px-6 py-2 mt-5 w-full text-base rounded-lg border border-solid bg-zinc-900 border-gray-500 border-opacity-20 text-neutral-600 max-md:px-5 max-md:max-w-full">
                  <div className="flex gap-2 items-center w-full max-md:max-w-full">
                    <div className="flex items-center self-stretch my-auto min-w-[240px] w-[413px]">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/3337b542f7978c19f724f2616730649c2a000d288dc39ce6139ff652b1b9c5e2?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                        className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                      />
                      <div className="gap-2.5 self-stretch p-2.5 my-auto min-w-[240px] w-[339px]">
                        search producers, songwriters and more...
                      </div>
                    </div>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/bc5b0f7a0e6e56defd3ac55722b93cc93bba1e9f9637d1e7ba9a814c8b28fada?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                      className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center self-start mt-3 rotate-[-0.2617993898945194rad]">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/670534764a03c99bb30986c23f94e15b7319e1774f15784f0d75b9e66e5f5fa5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                  className="object-contain self-stretch my-auto aspect-square w-[29px]"
                />
              </div>
            </div>
            <div className="flex items-start self-stretch">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/9b53f5895d713d56d83741cf1a15b108aac6604d779a28baa6f97f02f7da2ed5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                className="object-contain shrink-0 self-end mt-12 max-w-full aspect-[1.17] w-[127px] max-md:mt-10"
              />
              <div className="flex overflow-hidden gap-2 items-center self-start py-2 pr-2.5 pl-2 rounded-3xl border-solid bg-neutral-800 border-[0.59px] border-neutral-700 rotate-[-15deg]">
                <div className="flex gap-1.5 justify-center items-center self-stretch my-auto rotate-[-4.6239962033253233e-17rad] w-[23px]">
                  <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/24822dc9-298e-4a5a-b152-34dc41b7dae6?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/24822dc9-298e-4a5a-b152-34dc41b7dae6?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/24822dc9-298e-4a5a-b152-34dc41b7dae6?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/24822dc9-298e-4a5a-b152-34dc41b7dae6?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/24822dc9-298e-4a5a-b152-34dc41b7dae6?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/24822dc9-298e-4a5a-b152-34dc41b7dae6?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/24822dc9-298e-4a5a-b152-34dc41b7dae6?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/24822dc9-298e-4a5a-b152-34dc41b7dae6?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                    className="object-contain self-stretch my-auto bg-lime-400 rounded-full aspect-square fill-lime-400 h-[23px] w-[23px]"
                  />
                </div>
                <div className="flex gap-0.5 items-center self-stretch py-2 my-auto min-h-[31px] rotate-[-4.6239962033253233e-17rad]">
                  <div className="flex shrink-0 self-stretch my-auto h-2 rounded-none bg-zinc-400 bg-opacity-70 w-[3px]" />
                  <div className="flex shrink-0 self-stretch my-auto w-1 rounded-none bg-zinc-400 bg-opacity-70 h-[9px]" />
                  <div className="flex shrink-0 self-stretch my-auto rounded-none bg-zinc-400 bg-opacity-70 h-[9px] w-[3px]" />
                  <div className="flex shrink-0 self-stretch my-auto h-2 rounded-none bg-zinc-400 bg-opacity-70 w-[3px]" />
                  <div className="flex shrink-0 self-stretch my-auto w-1 h-2.5 rounded-none bg-zinc-400 bg-opacity-70" />
                </div>
                <div className="self-stretch my-auto text-xs leading-3 text-red-600 rotate-[-4.6239962033253233e-17rad]">
                  0:05
                </div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/f5f5322bc6239d16b7a788d7750d269b8b4fd8ca7a463a2701f21811932c6307?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                  className="object-contain shrink-0 self-stretch my-auto aspect-[1.06] w-[18px]"
                />
              </div>
            </div>
          </div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a8daa867258ce48895b2397fe58249aa7b07457bc8486c44f00fd1fe42f0d293?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
            className="object-contain shrink-0 aspect-[0.41] w-[99px]"
          />
        </div>

        { /*  Home Welcome Box End  */}

        { /*  Discover Section  */}

        <div className="flex flex-col justify-center px-5 py-3 border-b bg-blend-normal border-gray-500 border-opacity-20">
          <div className="flex flex-col w-full max-md:max-w-full">
            <div className="text-2xl font-bold text-neutral-100 max-md:max-w-full">
              Discover Partners
            </div>
            <div className="mt-1 text-sm text-stone-500 max-md:max-w-full">
              Connect and work with the world’s top enginners, producers, and
              songwriters
            </div>
          </div>
          <div className="flex flex-wrap gap-10 justify-between items-center mt-5 w-full max-w-[1381px] text-neutral-700 max-md:max-w-full">
            <div className="flex gap-1 justify-center items-center self-stretch p-2 my-auto text-xs leading-none rounded-lg border border-solid bg-neutral-900 border-gray-500 border-opacity-10 w-[89px]">
              <div className="self-stretch my-auto">Filter By</div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/cba28bfd29202207ef1904f3e2b23e18430024a2a5611e713e9b3c8e33b3583c?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
              />
            </div>
            <div className="flex flex-wrap gap-2 items-center self-stretch my-auto text-xs leading-4 text-center min-w-[240px] max-md:max-w-full">
              <div className="gap-1 self-stretch px-3 py-2 my-auto whitespace-nowrap border border-solid bg-neutral-900 border-neutral-800 rounded-[35px]">
                Songwriters
              </div>
              <div className="gap-1 self-stretch px-3 py-2 my-auto whitespace-nowrap border border-solid bg-neutral-900 border-neutral-800 rounded-[35px]">
                Artist
              </div>
              <div className="gap-1 self-stretch px-3 py-2 my-auto border border-solid bg-neutral-900 border-neutral-800 rounded-[35px]">
                Mastering Engineers
              </div>
              <div className="gap-1 self-stretch px-3 py-2 my-auto border border-solid bg-neutral-900 border-neutral-800 rounded-[35px]">
                Mixing Engineers
              </div>
              <div className="gap-1 self-stretch px-3 py-2 my-auto whitespace-nowrap border border-solid bg-neutral-900 border-neutral-800 rounded-[35px]">
                Musicians
              </div>
              <div className="gap-1 self-stretch px-3 py-2 my-auto whitespace-nowrap border border-solid bg-neutral-900 border-neutral-800 rounded-[35px]">
                Producers
              </div>
            </div>
            <div className="flex shrink-0 self-stretch my-auto h-[33px] w-[73px]" />
          </div>
        </div>

        { /*  End Discover Section  */}


        { /*  Start Section  */}

        <div className="flex flex-col justify-center py-3 pr-2 pl-5 border-b border-solid bg-zinc-950 border-b-zinc-900">
          <div className="flex flex-col w-full max-md:max-w-full">
            <div className="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">
              <div className="self-stretch my-auto text-xl font-semibold leading-tight text-white">
                Artists
              </div>
              <div className="flex gap-2 justify-center items-center self-stretch my-auto">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/ac830402c949555d2d72f9af7954e040f814e0af30a770d801805d7964c0cc99?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                  className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                />
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/2494a3e74f3d1b612ab5c4b10df72b60bd75b4220b722cde915f20aeaaf7abe7?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                  className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-10 justify-between items-center mt-1 w-full max-md:max-w-full">
              <div className="flex gap-1 items-center self-stretch my-auto text-xs leading-4 text-center min-w-[240px] text-neutral-700 w-[304px]">
                <div className="gap-1 self-stretch px-3 py-2 my-auto border border-solid bg-neutral-900 border-neutral-800 rounded-[35px]">
                  Recently Added
                </div>
                <div className="gap-1 self-stretch px-3 py-2 my-auto whitespace-nowrap border border-solid bg-neutral-900 border-neutral-800 rounded-[35px]">
                  Female
                </div>
                <div className="gap-1 self-stretch px-3 py-2 my-auto whitespace-nowrap border border-solid bg-neutral-900 border-neutral-800 rounded-[35px]">
                  Male
                </div>
                <div className="gap-1 self-stretch px-3 py-2 my-auto font-semibold text-black bg-lime-400 rounded-[35px]">
                  Most Popular
                </div>
              </div>
              <div className="gap-2.5 self-stretch my-auto text-sm leading-none text-zinc-500">
                View All
              </div>
            </div>
          </div>
          <div className="flex overflow-hidden overflow-x-auto gap-2 items-center mt-2 w-full text-center max-md:max-w-full">
            <div className="flex flex-col self-stretch my-auto text-base font-bold tracking-tighter text-white whitespace-nowrap w-[152px]">
              <div className="flex overflow-hidden relative flex-col px-3 pt-48 pb-6 aspect-[0.585] max-md:pt-24">
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/ac15e954b0fc0aac2eb65417643b7b21b6e46fbcc4b15b355dcca176a6f58c65?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/ac15e954b0fc0aac2eb65417643b7b21b6e46fbcc4b15b355dcca176a6f58c65?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/ac15e954b0fc0aac2eb65417643b7b21b6e46fbcc4b15b355dcca176a6f58c65?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/ac15e954b0fc0aac2eb65417643b7b21b6e46fbcc4b15b355dcca176a6f58c65?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/ac15e954b0fc0aac2eb65417643b7b21b6e46fbcc4b15b355dcca176a6f58c65?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/ac15e954b0fc0aac2eb65417643b7b21b6e46fbcc4b15b355dcca176a6f58c65?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/ac15e954b0fc0aac2eb65417643b7b21b6e46fbcc4b15b355dcca176a6f58c65?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/ac15e954b0fc0aac2eb65417643b7b21b6e46fbcc4b15b355dcca176a6f58c65?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                  className="object-cover absolute inset-0 size-full"
                />
                Skrillex
              </div>
            </div>
            <div className="flex flex-col self-stretch my-auto w-[152px]">
              <div className="flex overflow-hidden relative flex-col px-2.5 pt-32 pb-5 aspect-[0.585] w-[152px] max-md:pt-24">
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/e508b4a254ba3d14aab57c5b4be166cf28cf2742e9df9f2cc33091be413b3f00?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/e508b4a254ba3d14aab57c5b4be166cf28cf2742e9df9f2cc33091be413b3f00?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e508b4a254ba3d14aab57c5b4be166cf28cf2742e9df9f2cc33091be413b3f00?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/e508b4a254ba3d14aab57c5b4be166cf28cf2742e9df9f2cc33091be413b3f00?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/e508b4a254ba3d14aab57c5b4be166cf28cf2742e9df9f2cc33091be413b3f00?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e508b4a254ba3d14aab57c5b4be166cf28cf2742e9df9f2cc33091be413b3f00?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/e508b4a254ba3d14aab57c5b4be166cf28cf2742e9df9f2cc33091be413b3f00?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/e508b4a254ba3d14aab57c5b4be166cf28cf2742e9df9f2cc33091be413b3f00?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                  className="object-cover absolute inset-0 size-full"
                />
                <div className="flex relative flex-col w-full">
                  <div className="flex flex-col w-full">
                    <div className="gap-2.5 py-1 w-full text-xl font-bold tracking-tighter text-white">
                      Becky Hill
                    </div>
                    <div className="flex flex-col w-full text-white">
                      <div className="gap-2.5 self-stretch w-full text-sm leading-none">
                        Singer | Songwriter
                      </div>
                      <div className="flex gap-1 justify-center items-center self-center mt-1 text-xs leading-none">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/f9aa5126eb8c6e7676e12e2ad4ce3ee744d2f9144e24d94d1e89659128d737f3?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                          className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
                        />
                        <div className="gap-2.5 self-stretch my-auto">
                          London, UK
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="gap-2 self-center px-3 py-2 mt-3 text-xs leading-none text-black bg-lime-400 rounded-lg">
                    View Profile
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col self-stretch my-auto text-base font-bold tracking-tighter text-white whitespace-nowrap w-[152px]">
              <div className="flex overflow-hidden relative flex-col px-3 pt-48 pb-6 aspect-[0.585] max-md:pt-24">
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/8f6b22db19b59804d495f1779d6803e128d240773da6d0b4f46c5e7ae2b79f87?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/8f6b22db19b59804d495f1779d6803e128d240773da6d0b4f46c5e7ae2b79f87?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/8f6b22db19b59804d495f1779d6803e128d240773da6d0b4f46c5e7ae2b79f87?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/8f6b22db19b59804d495f1779d6803e128d240773da6d0b4f46c5e7ae2b79f87?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/8f6b22db19b59804d495f1779d6803e128d240773da6d0b4f46c5e7ae2b79f87?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/8f6b22db19b59804d495f1779d6803e128d240773da6d0b4f46c5e7ae2b79f87?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/8f6b22db19b59804d495f1779d6803e128d240773da6d0b4f46c5e7ae2b79f87?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/8f6b22db19b59804d495f1779d6803e128d240773da6d0b4f46c5e7ae2b79f87?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                  className="object-cover absolute inset-0 size-full"
                />
                Marshmello
              </div>
            </div>
            <div className="flex flex-col self-stretch my-auto text-base font-bold tracking-tighter text-white whitespace-nowrap w-[152px]">
              <div className="flex overflow-hidden relative flex-col px-3 pt-48 pb-6 aspect-[0.585] max-md:pt-24">
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/ce25cd29327de974b9bb8507057906eae53cc8c783a108efff9af6ae24619fd0?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/ce25cd29327de974b9bb8507057906eae53cc8c783a108efff9af6ae24619fd0?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/ce25cd29327de974b9bb8507057906eae53cc8c783a108efff9af6ae24619fd0?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/ce25cd29327de974b9bb8507057906eae53cc8c783a108efff9af6ae24619fd0?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/ce25cd29327de974b9bb8507057906eae53cc8c783a108efff9af6ae24619fd0?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/ce25cd29327de974b9bb8507057906eae53cc8c783a108efff9af6ae24619fd0?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/ce25cd29327de974b9bb8507057906eae53cc8c783a108efff9af6ae24619fd0?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/ce25cd29327de974b9bb8507057906eae53cc8c783a108efff9af6ae24619fd0?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                  className="object-cover absolute inset-0 size-full"
                />
                Diplo
              </div>
            </div>
            <div className="flex flex-col self-stretch my-auto text-base font-bold tracking-tighter text-white whitespace-nowrap w-[152px]">
              <div className="flex overflow-hidden relative flex-col px-3 pt-48 pb-6 aspect-[0.585] max-md:pt-24">
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/2b231644ac05d1dc9eef13881917c415a62f6c34708a2ed5d7dd32600c859658?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/2b231644ac05d1dc9eef13881917c415a62f6c34708a2ed5d7dd32600c859658?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/2b231644ac05d1dc9eef13881917c415a62f6c34708a2ed5d7dd32600c859658?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/2b231644ac05d1dc9eef13881917c415a62f6c34708a2ed5d7dd32600c859658?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/2b231644ac05d1dc9eef13881917c415a62f6c34708a2ed5d7dd32600c859658?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/2b231644ac05d1dc9eef13881917c415a62f6c34708a2ed5d7dd32600c859658?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/2b231644ac05d1dc9eef13881917c415a62f6c34708a2ed5d7dd32600c859658?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/2b231644ac05d1dc9eef13881917c415a62f6c34708a2ed5d7dd32600c859658?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                  className="object-cover absolute inset-0 size-full"
                />
                Poobear
              </div>
            </div>
            <div className="flex flex-col self-stretch my-auto text-base font-bold tracking-tighter text-white w-[152px]">
              <div className="flex overflow-hidden relative flex-col px-3 pt-48 pb-6 aspect-[0.585] max-md:pt-24">
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/7ac792f55940e40689b07a07a5ce092d96a85c354ebdcd3e9109b296e6b76250?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/7ac792f55940e40689b07a07a5ce092d96a85c354ebdcd3e9109b296e6b76250?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/7ac792f55940e40689b07a07a5ce092d96a85c354ebdcd3e9109b296e6b76250?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/7ac792f55940e40689b07a07a5ce092d96a85c354ebdcd3e9109b296e6b76250?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/7ac792f55940e40689b07a07a5ce092d96a85c354ebdcd3e9109b296e6b76250?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/7ac792f55940e40689b07a07a5ce092d96a85c354ebdcd3e9109b296e6b76250?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/7ac792f55940e40689b07a07a5ce092d96a85c354ebdcd3e9109b296e6b76250?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/7ac792f55940e40689b07a07a5ce092d96a85c354ebdcd3e9109b296e6b76250?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                  className="object-cover absolute inset-0 size-full"
                />
                Becky Hill
              </div>
            </div>
            <div className="flex flex-col self-stretch my-auto text-base font-bold tracking-tighter text-white w-[152px]">
              <div className="flex overflow-hidden relative flex-col px-3 pt-48 pb-6 aspect-[0.585] max-md:pt-24">
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/6b2d7d4907adbd9bd386456820d263aed3989449c950c970b566fe59acc37721?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/6b2d7d4907adbd9bd386456820d263aed3989449c950c970b566fe59acc37721?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/6b2d7d4907adbd9bd386456820d263aed3989449c950c970b566fe59acc37721?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/6b2d7d4907adbd9bd386456820d263aed3989449c950c970b566fe59acc37721?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/6b2d7d4907adbd9bd386456820d263aed3989449c950c970b566fe59acc37721?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/6b2d7d4907adbd9bd386456820d263aed3989449c950c970b566fe59acc37721?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/6b2d7d4907adbd9bd386456820d263aed3989449c950c970b566fe59acc37721?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/6b2d7d4907adbd9bd386456820d263aed3989449c950c970b566fe59acc37721?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                  className="object-cover absolute inset-0 size-full"
                />
                Dua lipa
              </div>
            </div>
            <div className="flex flex-col self-stretch my-auto text-base font-bold tracking-tighter text-white whitespace-nowrap w-[152px]">
              <div className="flex overflow-hidden relative flex-col px-3 pt-48 pb-6 aspect-[0.585] max-md:pt-24">
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/e9daa4d2db637a11bd3246eac5c4652a1715f446c2da3773ceaff2b8757fb498?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/e9daa4d2db637a11bd3246eac5c4652a1715f446c2da3773ceaff2b8757fb498?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e9daa4d2db637a11bd3246eac5c4652a1715f446c2da3773ceaff2b8757fb498?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/e9daa4d2db637a11bd3246eac5c4652a1715f446c2da3773ceaff2b8757fb498?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/e9daa4d2db637a11bd3246eac5c4652a1715f446c2da3773ceaff2b8757fb498?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e9daa4d2db637a11bd3246eac5c4652a1715f446c2da3773ceaff2b8757fb498?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/e9daa4d2db637a11bd3246eac5c4652a1715f446c2da3773ceaff2b8757fb498?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/e9daa4d2db637a11bd3246eac5c4652a1715f446c2da3773ceaff2b8757fb498?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                  className="object-cover absolute inset-0 size-full"
                />
                Meduza
              </div>
            </div>
            <div className="flex flex-col self-stretch my-auto text-base font-bold tracking-tighter text-white whitespace-nowrap w-[152px]">
              <div className="flex overflow-hidden relative flex-col px-3 pt-48 pb-6 aspect-[0.585] max-md:pt-24">
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/ab0c20efbfdf341a814c8a48631a391191311f06615965d9076ec7629d58bb4a?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/ab0c20efbfdf341a814c8a48631a391191311f06615965d9076ec7629d58bb4a?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/ab0c20efbfdf341a814c8a48631a391191311f06615965d9076ec7629d58bb4a?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/ab0c20efbfdf341a814c8a48631a391191311f06615965d9076ec7629d58bb4a?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/ab0c20efbfdf341a814c8a48631a391191311f06615965d9076ec7629d58bb4a?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/ab0c20efbfdf341a814c8a48631a391191311f06615965d9076ec7629d58bb4a?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/ab0c20efbfdf341a814c8a48631a391191311f06615965d9076ec7629d58bb4a?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/ab0c20efbfdf341a814c8a48631a391191311f06615965d9076ec7629d58bb4a?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                  className="object-cover absolute inset-0 size-full"
                />
                Vikina
              </div>
            </div>
            <div className="flex flex-col self-stretch my-auto text-base font-bold tracking-tighter text-white w-[152px]">
              <div className="flex overflow-hidden relative flex-col px-3 pt-48 pb-6 aspect-[0.585] w-[152px] max-md:pt-24">
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/ca046a62429c37a5d23bb1958ac42ad182f0ee37fd489e5948612e413e1fc012?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/ca046a62429c37a5d23bb1958ac42ad182f0ee37fd489e5948612e413e1fc012?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/ca046a62429c37a5d23bb1958ac42ad182f0ee37fd489e5948612e413e1fc012?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/ca046a62429c37a5d23bb1958ac42ad182f0ee37fd489e5948612e413e1fc012?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/ca046a62429c37a5d23bb1958ac42ad182f0ee37fd489e5948612e413e1fc012?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/ca046a62429c37a5d23bb1958ac42ad182f0ee37fd489e5948612e413e1fc012?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/ca046a62429c37a5d23bb1958ac42ad182f0ee37fd489e5948612e413e1fc012?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/ca046a62429c37a5d23bb1958ac42ad182f0ee37fd489e5948612e413e1fc012?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                  className="object-cover absolute inset-0 size-full"
                />
                Bad Bunny
              </div>
            </div>
            <div className="flex flex-col self-stretch my-auto text-base font-bold tracking-tighter text-white w-[152px]">
              <div className="flex overflow-hidden relative flex-col px-3 pt-48 pb-6 aspect-[0.585] w-[152px] max-md:pt-24">
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/ca046a62429c37a5d23bb1958ac42ad182f0ee37fd489e5948612e413e1fc012?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/ca046a62429c37a5d23bb1958ac42ad182f0ee37fd489e5948612e413e1fc012?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/ca046a62429c37a5d23bb1958ac42ad182f0ee37fd489e5948612e413e1fc012?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/ca046a62429c37a5d23bb1958ac42ad182f0ee37fd489e5948612e413e1fc012?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/ca046a62429c37a5d23bb1958ac42ad182f0ee37fd489e5948612e413e1fc012?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/ca046a62429c37a5d23bb1958ac42ad182f0ee37fd489e5948612e413e1fc012?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/ca046a62429c37a5d23bb1958ac42ad182f0ee37fd489e5948612e413e1fc012?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/ca046a62429c37a5d23bb1958ac42ad182f0ee37fd489e5948612e413e1fc012?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                  className="object-cover absolute inset-0 size-full"
                />
                Becky Hill
              </div>
            </div>
          </div>
        </div>


        { /*  End Section  */}

      </Theme>
    </React.Fragment>
  );
};

export default HomeFeed;
