/*************************************************************************
 * @file index.tsx
 * @author Zohaib Ahmed
 * @desc Provides sidebar navigation for the application.
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* IMPORTS */
import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = (props: any) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  

  return (
    <React.Fragment>
      <div className="flex flex-col justify-between px-2 py-3 border-r border-solid bg-zinc-950 border-r-zinc-900 max-w-[90px]">
        <div className="flex gap-2 items-start w-full">
          <div className="flex flex-col items-center w-[76px]">
            <div className="flex flex-col justify-center items-center w-full min-h-[76px]">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/54dada0dc7da1a26957d9f50f788300832a6fe43c94dd92174760714206cdc2d?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                className="object-contain w-6 aspect-square"
              />
            </div>
            <div className="flex flex-col justify-center items-center mt-2 w-full max-w-[76px] min-h-[76px]">
              <div className="flex justify-center items-center px-2 w-10 h-10 bg-lime-400 rounded-lg border border-lime-400 border-solid">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/6bbae91ab50cb5053ba0e2607d0cb249868414f13e07f04dd9221a633114afc0?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                  className="object-contain  my-auto w-6 aspect-square"
                />
              </div>
              <div className="gap-2.5  p-1 text-xs font-semibold leading-none text-white whitespace-nowrap">
                Home
              </div>
            </div>
            <div className="flex flex-col justify-center items-center mt-2 w-full max-w-[76px] min-h-[76px]">
              <div className="flex justify-center items-center px-2 w-10 h-10 rounded-lg bg-zinc-900">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/1e472900ef0d56ca3ab8c4dfb8fb5b36ab79a63da71c6ad8c61cc8234687c7f3?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                  className="object-contain  my-auto w-6 aspect-square"
                />
              </div>
              <div className="gap-2.5  p-1 text-xs font-semibold leading-none text-white whitespace-nowrap">
                Dashboard
              </div>
            </div>
            <div className="flex flex-col justify-center items-center mt-2 w-full max-w-[76px] min-h-[76px]">
              <div className="flex justify-center items-center px-2 w-10 h-10 rounded-lg bg-zinc-900">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/f40c208ed57a9e2cce652b7a51386b8f8d5625d60e0232312257c09d69e0a569?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                  className="object-contain  my-auto w-6 aspect-square"
                />
              </div>
              <div className="gap-2.5  p-1 text-xs font-semibold leading-none text-white whitespace-nowrap">
                DMs
              </div>
            </div>
            <div className="flex flex-col justify-center items-center mt-2 w-full max-w-[76px] min-h-[76px]">
              <div className="flex justify-center items-center px-2 w-10 h-10 rounded-lg bg-zinc-900">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/8c305ed4afb747d9e2196414eae7acc07d430751694b75667d8e25a636684a8f?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                  className="object-contain  my-auto w-6 aspect-square"
                />
              </div>
              <div className="gap-2.5  p-1 text-xs font-semibold leading-none text-white whitespace-nowrap">
                License
              </div>
            </div>
            <div className="flex flex-col justify-center items-center mt-2 w-full max-w-[76px] min-h-[76px]">
              <div className="flex justify-center items-center px-2 w-10 h-10 rounded-lg bg-zinc-900">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/eab899f21e07407abe58f759cb17ae4f10a2ecc632c00a9e6a11d2cefb3261d7?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                  className="object-contain  my-auto w-6 aspect-square"
                />
              </div>
              <div className="gap-2.5  p-1 text-xs font-semibold leading-none text-white whitespace-nowrap">
                Notifications
              </div>
            </div>
            <div className="flex flex-col justify-center items-center mt-2 w-full max-w-[76px] min-h-[76px]">
              <div className="flex justify-center items-center px-2 w-10 h-10 rounded-lg bg-zinc-900">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/6641659e452295ae7bc90a9de8309c7f4093844b3e440052b4ffd9218821fd96?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                  className="object-contain  my-auto w-6 aspect-square"
                />
              </div>
              <div className="gap-2.5  p-1 text-xs font-semibold leading-none text-white whitespace-nowrap">
                Library
              </div>
            </div>
            <div className="flex flex-col justify-center items-center mt-2 w-full max-w-[76px] min-h-[76px]">
              <div className="flex justify-center items-center px-2 w-10 h-10 rounded-lg bg-zinc-900">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/a14a67560c782ed6904defbd81e0a46be9262f6ea91ccec17d7580ec94401f0f?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                  className="object-contain  my-auto w-6 aspect-square"
                />
              </div>
              <div className="gap-2.5  p-1 text-xs font-semibold leading-none text-white whitespace-nowrap">
                Collections
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center self-center mt-44 w-12">
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/5750cba4acfe5b136d8039abef261d3b937792cbe33c5d9fa3cc6f487c6199fd?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/5750cba4acfe5b136d8039abef261d3b937792cbe33c5d9fa3cc6f487c6199fd?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/5750cba4acfe5b136d8039abef261d3b937792cbe33c5d9fa3cc6f487c6199fd?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/5750cba4acfe5b136d8039abef261d3b937792cbe33c5d9fa3cc6f487c6199fd?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/5750cba4acfe5b136d8039abef261d3b937792cbe33c5d9fa3cc6f487c6199fd?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/5750cba4acfe5b136d8039abef261d3b937792cbe33c5d9fa3cc6f487c6199fd?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/5750cba4acfe5b136d8039abef261d3b937792cbe33c5d9fa3cc6f487c6199fd?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/5750cba4acfe5b136d8039abef261d3b937792cbe33c5d9fa3cc6f487c6199fd?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
            className="object-contain  my-auto w-12 aspect-square"
          />
        </div>
      </div>

    </React.Fragment>
  );
};

export default Sidebar;
