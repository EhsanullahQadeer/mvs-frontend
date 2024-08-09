/*************************************************************************
 * @file list.tsx
 * @author Zohaib Ahmad
 * @desc Showing Incoming / outgoing messages list
 *       
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* eslint-disable @typescript-eslint/no-unused-vars */

/* IMPORTS */
import {
    useEffect,
    useRef,
    useState
} from "react";
import React from "react";



const MessagesList = (

) => {


    return (

        <React.Fragment>
            <div>
                    <div className="flex overflow-hidden flex-col pt-4 bg-zinc-950">
                        <div className="flex flex-col justify-center px-3 w-full text-sm leading-none text-neutral-400 max-md:max-w-full">
                            <div className="flex flex-col justify-center items-start w-full max-md:max-w-full">
                                <div className="flex items-center px-4 py-2.5 max-w-full rounded-3xl bg-zinc-900 min-h-[40px] w-[271px]">
                                    <div className="flex flex-1 shrink gap-2 items-center self-stretch my-auto w-full basis-0">
                                        <img
                                            loading="lazy"
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/7c3ee12b66850f0a284625782f93c0e35aa3b24e2870b985ff08d830e76e290a?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                                            className="object-contain shrink-0 self-stretch my-auto w-5 aspect-square"
                                        />
                                        <div className="flex-1 shrink gap-2.5 self-stretch my-auto">
                                            search anything...
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col mt-1 w-full max-md:max-w-full">
                            <div className="flex justify-between items-center px-3 py-2 w-full max-md:max-w-full">
                                <div className="flex flex-wrap flex-1 shrink justify-between items-center self-stretch my-auto w-full basis-0 min-w-[240px] max-md:max-w-full">
                                    <div className="flex flex-1 shrink gap-2 items-center self-stretch my-auto basis-0 min-w-[240px] max-md:max-w-full">
                                        <div className="flex gap-1 items-center self-stretch my-auto min-h-[32px]">
                                            <div className="flex gap-1 items-center self-stretch my-auto rounded bg-zinc-900 min-h-[32px]">
                                                <div className="flex justify-center items-center self-stretch px-1 my-auto w-8 rounded min-h-[32px]">
                                                    <div className="flex overflow-hidden justify-center items-center self-stretch my-auto w-6 min-h-[24px]">
                                                        <div className="flex self-stretch my-auto w-4 h-4 rounded border-gray-600 border-solid border-[1.5px] min-h-[16px]" />
                                                    </div>
                                                </div>
                                                <div className="flex justify-center items-center self-stretch py-2 my-auto w-4">
                                                    <img
                                                        loading="lazy"
                                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/20fb1a14e454f4be532947fd226d91921d1dec31b7a1350115a8c435e71f6fca?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                        className="object-contain self-stretch my-auto w-4 aspect-square"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-1 items-center self-stretch my-auto">
                                            <div className="flex gap-2.5 justify-center items-center self-stretch px-2 my-auto w-8 h-8 rounded bg-neutral-800">
                                                <img
                                                    loading="lazy"
                                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/99753b70e5ae3f177fcc2f9698a64a953a7288f8c42cedb68065253f9723529d?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                    className="object-contain self-stretch my-auto w-4 aspect-square"
                                                />
                                            </div>
                                            <div className="flex gap-2.5 justify-center items-center self-stretch px-2 my-auto w-8 h-8 rounded bg-zinc-900">
                                                <img
                                                    loading="lazy"
                                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/1bc4346dd15d9365f85b72e8b6c026e18b35ff0b75fd4022dc4343408e4ba66f?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                    className="object-contain self-stretch my-auto w-4 aspect-square"
                                                />
                                            </div>
                                            <div className="flex gap-2.5 justify-center items-center self-stretch px-2 my-auto w-8 h-8 rounded bg-zinc-900">
                                                <img
                                                    loading="lazy"
                                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/9d8dca5d006f40732f53943e371bc9c4c5886eb5f4f18244e6cc8406de43ba5f?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                    className="object-contain self-stretch my-auto w-4 aspect-square"
                                                />
                                            </div>
                                            <div className="flex gap-2.5 justify-center items-center self-stretch px-2 my-auto w-8 h-8 rounded bg-zinc-900">
                                                <img
                                                    loading="lazy"
                                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/c66cd95835fd6c5fd6d67806b5fd5e324a19d8190ad13a2a647ee7405fd88c6f?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                    className="object-contain self-stretch my-auto w-4 aspect-square"
                                                />
                                            </div>
                                            <div className="flex gap-2.5 justify-center items-center self-stretch px-2 my-auto w-8 h-8 rounded bg-zinc-900">
                                                <img
                                                    loading="lazy"
                                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/600605470c2cc3ff3767ff7e686190e74aad430649a8f15dc4f2e50ae65e6309?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                    className="object-contain self-stretch my-auto w-4 aspect-square"
                                                />
                                            </div>
                                            <div className="flex gap-2.5 justify-center items-center self-stretch px-2 my-auto w-8 h-8 rounded bg-zinc-900">
                                                <img
                                                    loading="lazy"
                                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/34f8698b837fa1de351ff7fd0af8e1b70ca47c419b2ff841cc06a160097a1a08?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                    className="object-contain self-stretch my-auto w-4 aspect-square"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 items-center self-stretch my-auto">
                                        <div className="gap-2.5 self-stretch p-2.5 my-auto text-sm leading-none text-neutral-400">
                                            1-20 of 43
                                        </div>
                                        <div className="flex gap-2 justify-center items-center self-stretch my-auto">
                                            <img
                                                loading="lazy"
                                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/c9fc6a4e6133bf349adf8fa489bd9a9e086c309036e805b45988ad25846061bd?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                                            />
                                            <img
                                                loading="lazy"
                                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/1aeba66ba50e054d88ddb4f123f55f99884f99fd9e46cc2f139f825601004bd1?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex overflow-hidden flex-col pb-1 w-full h-[799px] max-md:max-w-full">
                                <div className="flex justify-between items-center px-3 py-2 w-full border-b border-gray-500 border-opacity-20 max-md:max-w-full">
                                    <div className="flex flex-wrap flex-1 shrink gap-3 items-center self-stretch my-auto w-full basis-0 min-w-[240px] max-md:max-w-full">
                                        <div className="flex gap-2 self-stretch my-auto min-w-[240px]">
                                            <div className="flex gap-2 items-center h-full min-w-[240px]">
                                                <div className="flex gap-1 self-stretch my-auto rounded min-h-[32px]">
                                                    <div className="flex justify-center items-center px-1 my-auto w-8 rounded min-h-[32px]">
                                                        <div className="flex overflow-hidden justify-center items-center self-stretch my-auto w-6 min-h-[24px]">
                                                            <div className="flex self-stretch my-auto w-4 h-4 rounded border-solid border-[1.5px] border-zinc-500 min-h-[16px]" />
                                                        </div>
                                                    </div>
                                                    <div className="flex overflow-hidden flex-col justify-center items-center py-2 w-4">
                                                        <div className="flex w-2 h-2 bg-lime-300 rounded-full min-h-[8px]" />
                                                    </div>
                                                </div>
                                                <div className="flex gap-1 items-center self-stretch my-auto">
                                                    <div className="flex overflow-hidden flex-col justify-center items-center self-stretch p-2 my-auto w-8">
                                                        <img
                                                            loading="lazy"
                                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/28f53469e5185ff9d31d5f97cbc92bb4a08b519534846c2153a561633b702bac?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                            className="object-contain w-4 aspect-square"
                                                        />
                                                    </div>
                                                    <div className="flex gap-2 items-center self-stretch my-auto">
                                                        <div className="flex gap-2.5 items-start self-stretch my-auto w-[52px]">
                                                            <img
                                                                loading="lazy"
                                                                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                                className="object-contain aspect-square w-[52px]"
                                                            />
                                                        </div>
                                                        <div className="flex flex-col justify-center self-stretch my-auto font-semibold w-[100px]">
                                                            <div className="text-sm leading-none text-white">
                                                                Becky Hill
                                                            </div>
                                                            <div className="self-start px-1 py-0.5 mt-1 text-xs tracking-wide leading-tight text-lime-400 whitespace-nowrap bg-lime-800 rounded border border-lime-400 border-solid min-h-[16px]">
                                                                $434.99
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col flex-1 shrink justify-center items-start self-stretch my-auto text-white basis-6 min-w-[240px]">
                                            <div className="flex-1 shrink gap-2.5 self-stretch p-2.5 max-w-full text-sm font-semibold leading-none w-[150px]">
                                                Hey, just shared...
                                            </div>
                                            <div className="flex gap-4 items-center px-2 text-xs leading-none w-[75px]">
                                                <div className="self-stretch my-auto w-[59px]">4:37 PM</div>
                                            </div>
                                        </div>
                                        <div className="self-stretch px-3 py-1 my-auto text-xs font-semibold leading-none text-white whitespace-nowrap bg-red-400 rounded-3xl">
                                            7
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center px-3 py-2 w-full border-b border-solid bg-neutral-800 border-b-gray-500 border-b-opacity-20 max-md:max-w-full">
                                    <div className="flex flex-wrap flex-1 shrink gap-3 items-center self-stretch my-auto w-full basis-0 min-w-[240px] max-md:max-w-full">
                                        <div className="flex gap-2 self-stretch my-auto min-w-[240px]">
                                            <div className="flex gap-2 items-center h-full min-w-[240px]">
                                                <div className="flex gap-1 items-center self-stretch my-auto rounded min-h-[32px]">
                                                    <div className="flex justify-center items-center self-stretch px-1 my-auto w-8 rounded min-h-[32px]">
                                                        <div className="flex overflow-hidden justify-center items-center self-stretch my-auto w-6 min-h-[24px]">
                                                            <div className="flex self-stretch my-auto w-4 h-4 rounded border-solid border-[1.5px] border-zinc-500 min-h-[16px]" />
                                                        </div>
                                                    </div>
                                                    <div className="flex shrink-0 self-stretch my-auto w-4 h-8" />
                                                </div>
                                                <div className="flex gap-1 items-center self-stretch my-auto">
                                                    <div className="flex overflow-hidden flex-col justify-center items-center self-stretch p-2 my-auto w-8">
                                                        <img
                                                            loading="lazy"
                                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/28f53469e5185ff9d31d5f97cbc92bb4a08b519534846c2153a561633b702bac?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                            className="object-contain w-4 aspect-square"
                                                        />
                                                    </div>
                                                    <div className="flex gap-2 items-center self-stretch my-auto">
                                                        <div className="flex gap-2.5 items-start self-stretch my-auto w-[52px]">
                                                            <img
                                                                loading="lazy"
                                                                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                                className="object-contain aspect-square w-[52px]"
                                                            />
                                                        </div>
                                                        <div className="flex flex-col justify-center self-stretch my-auto w-[100px]">
                                                            <div className="text-sm leading-none text-white">
                                                                Simon Mehl
                                                            </div>
                                                            <div className="self-start px-1 py-0.5 mt-1 text-xs font-semibold tracking-wide leading-tight text-lime-400 whitespace-nowrap bg-lime-800 rounded border border-lime-400 border-solid min-h-[16px]">
                                                                $434.99
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col flex-1 shrink justify-center items-start self-stretch my-auto basis-0 min-w-[240px] text-neutral-400">
                                            <div className="flex-1 shrink gap-2.5 self-stretch p-2.5 max-w-full text-sm leading-none w-[150px]">
                                                Hey, just shared...
                                            </div>
                                            <div className="flex gap-4 items-center px-2 text-xs leading-none w-[75px]">
                                                <div className="self-stretch my-auto w-[59px]">4:37 PM</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center px-3 py-2 w-full border-b border-gray-500 border-opacity-20 max-md:max-w-full">
                                    <div className="flex flex-wrap flex-1 shrink gap-3 items-center self-stretch my-auto w-full basis-0 min-w-[240px] max-md:max-w-full">
                                        <div className="flex gap-2 self-stretch my-auto min-w-[240px]">
                                            <div className="flex gap-2 items-center h-full min-w-[240px]">
                                                <div className="flex gap-1 self-stretch my-auto rounded min-h-[32px]">
                                                    <div className="flex justify-center items-center px-1 my-auto w-8 rounded min-h-[32px]">
                                                        <div className="flex overflow-hidden justify-center items-center self-stretch my-auto w-6 min-h-[24px]">
                                                            <div className="flex self-stretch my-auto w-4 h-4 rounded border-solid border-[1.5px] border-zinc-500 min-h-[16px]" />
                                                        </div>
                                                    </div>
                                                    <div className="flex overflow-hidden flex-col justify-center items-center py-2 w-4">
                                                        <div className="flex w-2 h-2 bg-lime-300 rounded-full min-h-[8px]" />
                                                    </div>
                                                </div>
                                                <div className="flex gap-1 items-center self-stretch my-auto">
                                                    <div className="flex overflow-hidden flex-col justify-center items-center self-stretch p-2 my-auto w-8">
                                                        <img
                                                            loading="lazy"
                                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/40401137acec624d3131760af5454bee983bc578efbf4971f67bfee9c8441eb4?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                            className="object-contain w-4 aspect-square"
                                                        />
                                                    </div>
                                                    <div className="flex gap-2 items-center self-stretch my-auto">
                                                        <div className="flex gap-2.5 items-start self-stretch my-auto w-[52px]">
                                                            <img
                                                                loading="lazy"
                                                                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                                className="object-contain aspect-square w-[52px]"
                                                            />
                                                        </div>
                                                        <div className="flex flex-col justify-center self-stretch my-auto font-semibold w-[100px]">
                                                            <div className="text-sm leading-none text-white">
                                                                Becky Hill
                                                            </div>
                                                            <div className="self-start px-1 py-0.5 mt-1 text-xs tracking-wide leading-tight text-lime-400 whitespace-nowrap bg-lime-800 rounded border border-lime-400 border-solid min-h-[16px]">
                                                                $434.99
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col flex-1 shrink justify-center items-start self-stretch my-auto text-white basis-6 min-w-[240px]">
                                            <div className="flex-1 shrink gap-2.5 self-stretch p-2.5 max-w-full text-sm font-semibold leading-none w-[150px]">
                                                Hey, just shared...
                                            </div>
                                            <div className="flex gap-4 items-center px-2 text-xs leading-none w-[75px]">
                                                <div className="self-stretch my-auto w-[59px]">4:37 PM</div>
                                            </div>
                                        </div>
                                        <div className="self-stretch px-3 py-1 my-auto text-xs font-semibold leading-none text-white whitespace-nowrap bg-red-400 rounded-3xl">
                                            7
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center px-3 py-2 w-full border-b border-gray-500 border-opacity-20 max-md:max-w-full">
                                    <div className="flex flex-wrap flex-1 shrink gap-3 items-center self-stretch my-auto w-full basis-0 min-w-[240px] max-md:max-w-full">
                                        <div className="flex gap-2 self-stretch my-auto min-w-[240px]">
                                            <div className="flex gap-2 items-center h-full min-w-[240px]">
                                                <div className="flex gap-1 items-center self-stretch my-auto rounded min-h-[32px]">
                                                    <div className="flex justify-center items-center self-stretch px-1 my-auto w-8 rounded min-h-[32px]">
                                                        <div className="flex overflow-hidden justify-center items-center self-stretch my-auto w-6 min-h-[24px]">
                                                            <div className="flex self-stretch my-auto w-4 h-4 rounded border-solid border-[1.5px] border-zinc-500 min-h-[16px]" />
                                                        </div>
                                                    </div>
                                                    <div className="flex shrink-0 self-stretch my-auto w-4 h-8" />
                                                </div>
                                                <div className="flex gap-1 items-center self-stretch my-auto">
                                                    <div className="flex overflow-hidden flex-col justify-center items-center self-stretch p-2 my-auto w-8">
                                                        <img
                                                            loading="lazy"
                                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/7283b363c589e9e8938abbc1a60fece5ff212b6e47efda32ae4752a808ccaa32?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                            className="object-contain w-4 aspect-square"
                                                        />
                                                    </div>
                                                    <div className="flex gap-2 items-center self-stretch my-auto">
                                                        <div className="flex gap-2.5 items-start self-stretch my-auto w-[52px]">
                                                            <img
                                                                loading="lazy"
                                                                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                                className="object-contain aspect-square w-[52px]"
                                                            />
                                                        </div>
                                                        <div className="flex flex-col justify-center self-stretch my-auto w-[100px]">
                                                            <div className="text-sm leading-none text-neutral-400">
                                                                Josh Goode
                                                            </div>
                                                            <div className="self-start px-1 py-0.5 mt-1 text-xs font-semibold tracking-wide leading-tight text-lime-400 whitespace-nowrap bg-lime-800 rounded border border-lime-400 border-solid min-h-[16px]">
                                                                $44.54
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col flex-1 shrink justify-center items-start self-stretch my-auto basis-0 min-w-[240px] text-neutral-400">
                                            <div className="flex-1 shrink gap-2.5 self-stretch p-2.5 max-w-full text-sm leading-none w-[150px]">
                                                Hey, just shared...
                                            </div>
                                            <div className="flex gap-4 items-center px-2 text-xs leading-none w-[75px]">
                                                <div className="self-stretch my-auto w-[59px]">June 24</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center px-3 py-2 w-full border-b border-gray-500 border-opacity-20 max-md:max-w-full">
                                    <div className="flex flex-wrap flex-1 shrink gap-3 items-center self-stretch my-auto w-full basis-0 min-w-[240px] max-md:max-w-full">
                                        <div className="flex gap-2 self-stretch my-auto min-w-[240px]">
                                            <div className="flex gap-2 items-center h-full min-w-[240px]">
                                                <div className="flex gap-1 items-center self-stretch my-auto rounded min-h-[32px]">
                                                    <div className="flex justify-center items-center self-stretch px-1 my-auto w-8 rounded min-h-[32px]">
                                                        <div className="flex overflow-hidden justify-center items-center self-stretch my-auto w-6 min-h-[24px]">
                                                            <div className="flex self-stretch my-auto w-4 h-4 rounded border-solid border-[1.5px] border-zinc-500 min-h-[16px]" />
                                                        </div>
                                                    </div>
                                                    <div className="flex shrink-0 self-stretch my-auto w-4 h-8" />
                                                </div>
                                                <div className="flex gap-1 items-center self-stretch my-auto">
                                                    <div className="flex overflow-hidden flex-col justify-center items-center self-stretch p-2 my-auto w-8">
                                                        <img
                                                            loading="lazy"
                                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/7283b363c589e9e8938abbc1a60fece5ff212b6e47efda32ae4752a808ccaa32?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                            className="object-contain w-4 aspect-square"
                                                        />
                                                    </div>
                                                    <div className="flex gap-2 items-center self-stretch my-auto">
                                                        <div className="flex gap-2.5 items-start self-stretch my-auto w-[52px]">
                                                            <img
                                                                loading="lazy"
                                                                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                                className="object-contain aspect-square w-[52px]"
                                                            />
                                                        </div>
                                                        <div className="flex flex-col justify-center self-stretch my-auto w-[100px]">
                                                            <div className="text-sm leading-none text-neutral-400">
                                                                Josh Goode
                                                            </div>
                                                            <div className="self-start px-1 py-0.5 mt-1 text-xs font-semibold tracking-wide leading-tight text-lime-400 whitespace-nowrap bg-lime-800 rounded border border-lime-400 border-solid min-h-[16px]">
                                                                $44.54
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col flex-1 shrink justify-center items-start self-stretch my-auto basis-0 min-w-[240px] text-neutral-400">
                                            <div className="flex-1 shrink gap-2.5 self-stretch p-2.5 max-w-full text-sm leading-none w-[150px]">
                                                Hey, just shared...
                                            </div>
                                            <div className="flex gap-4 items-center px-2 text-xs leading-none w-[75px]">
                                                <div className="self-stretch my-auto w-[59px]">June 24</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center px-3 py-2 w-full border-b border-gray-500 border-opacity-20 max-md:max-w-full">
                                    <div className="flex flex-wrap flex-1 shrink gap-3 items-center self-stretch my-auto w-full basis-0 min-w-[240px] max-md:max-w-full">
                                        <div className="flex gap-2 self-stretch my-auto min-w-[240px]">
                                            <div className="flex gap-2 items-center h-full min-w-[240px]">
                                                <div className="flex gap-1 items-center self-stretch my-auto rounded min-h-[32px]">
                                                    <div className="flex justify-center items-center self-stretch px-1 my-auto w-8 rounded min-h-[32px]">
                                                        <div className="flex overflow-hidden justify-center items-center self-stretch my-auto w-6 min-h-[24px]">
                                                            <div className="flex self-stretch my-auto w-4 h-4 rounded border-solid border-[1.5px] border-zinc-500 min-h-[16px]" />
                                                        </div>
                                                    </div>
                                                    <div className="flex shrink-0 self-stretch my-auto w-4 h-8" />
                                                </div>
                                                <div className="flex gap-1 items-center self-stretch my-auto">
                                                    <div className="flex overflow-hidden flex-col justify-center items-center self-stretch p-2 my-auto w-8">
                                                        <img
                                                            loading="lazy"
                                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/7283b363c589e9e8938abbc1a60fece5ff212b6e47efda32ae4752a808ccaa32?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                            className="object-contain w-4 aspect-square"
                                                        />
                                                    </div>
                                                    <div className="flex gap-2 items-center self-stretch my-auto">
                                                        <div className="flex gap-2.5 items-start self-stretch my-auto w-[52px]">
                                                            <img
                                                                loading="lazy"
                                                                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                                className="object-contain aspect-square w-[52px]"
                                                            />
                                                        </div>
                                                        <div className="flex flex-col justify-center self-stretch my-auto w-[100px]">
                                                            <div className="text-sm leading-none text-neutral-400">
                                                                Josh Goode
                                                            </div>
                                                            <div className="self-start px-1 py-0.5 mt-1 text-xs font-semibold tracking-wide leading-tight text-lime-400 whitespace-nowrap bg-lime-800 rounded border border-lime-400 border-solid min-h-[16px]">
                                                                $44.54
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col flex-1 shrink justify-center items-start self-stretch my-auto basis-0 min-w-[240px] text-neutral-400">
                                            <div className="flex-1 shrink gap-2.5 self-stretch p-2.5 max-w-full text-sm leading-none w-[150px]">
                                                Hey, just shared...
                                            </div>
                                            <div className="flex gap-4 items-center px-2 text-xs leading-none w-[75px]">
                                                <div className="self-stretch my-auto w-[59px]">June 24</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center px-3 py-2 w-full border-b border-gray-500 border-opacity-20 max-md:max-w-full">
                                    <div className="flex flex-wrap flex-1 shrink gap-3 items-center self-stretch my-auto w-full basis-0 min-w-[240px] max-md:max-w-full">
                                        <div className="flex gap-2 self-stretch my-auto min-w-[240px]">
                                            <div className="flex gap-2 items-center h-full min-w-[240px]">
                                                <div className="flex gap-1 items-center self-stretch my-auto rounded min-h-[32px]">
                                                    <div className="flex justify-center items-center self-stretch px-1 my-auto w-8 rounded min-h-[32px]">
                                                        <div className="flex overflow-hidden justify-center items-center self-stretch my-auto w-6 min-h-[24px]">
                                                            <div className="flex self-stretch my-auto w-4 h-4 rounded border-solid border-[1.5px] border-zinc-500 min-h-[16px]" />
                                                        </div>
                                                    </div>
                                                    <div className="flex shrink-0 self-stretch my-auto w-4 h-8" />
                                                </div>
                                                <div className="flex gap-1 items-center self-stretch my-auto">
                                                    <div className="flex overflow-hidden flex-col justify-center items-center self-stretch p-2 my-auto w-8">
                                                        <img
                                                            loading="lazy"
                                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/48bdd24f1269b6c10008158e8937354b5317161bfde4bf953aae3ee8bd2042bc?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                            className="object-contain w-4 aspect-square"
                                                        />
                                                    </div>
                                                    <div className="flex gap-2 items-center self-stretch my-auto">
                                                        <div className="flex gap-2.5 items-start self-stretch my-auto w-[52px]">
                                                            <img
                                                                loading="lazy"
                                                                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                                className="object-contain aspect-square w-[52px]"
                                                            />
                                                        </div>
                                                        <div className="flex flex-col justify-center self-stretch my-auto w-[100px]">
                                                            <div className="text-sm leading-none text-neutral-400">
                                                                Josh Goode
                                                            </div>
                                                            <div className="self-start px-1 py-0.5 mt-1 text-xs font-semibold tracking-wide leading-tight text-lime-400 whitespace-nowrap bg-lime-800 rounded border border-lime-400 border-solid min-h-[16px]">
                                                                $44.54
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col flex-1 shrink justify-center items-start self-stretch my-auto basis-0 min-w-[240px] text-neutral-400">
                                            <div className="flex-1 shrink gap-2.5 self-stretch p-2.5 max-w-full text-sm leading-none w-[150px]">
                                                Hey, just shared...
                                            </div>
                                            <div className="flex gap-4 items-center px-2 text-xs leading-none w-[75px]">
                                                <div className="self-stretch my-auto w-[59px]">June 24</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center px-3 py-2 w-full border-b border-gray-500 border-opacity-20 max-md:max-w-full">
                                    <div className="flex flex-wrap flex-1 shrink gap-3 items-center self-stretch my-auto w-full basis-0 min-w-[240px] max-md:max-w-full">
                                        <div className="flex gap-2 self-stretch my-auto min-w-[240px]">
                                            <div className="flex gap-2 items-center h-full min-w-[240px]">
                                                <div className="flex gap-1 items-center self-stretch my-auto rounded min-h-[32px]">
                                                    <div className="flex justify-center items-center self-stretch px-1 my-auto w-8 rounded min-h-[32px]">
                                                        <div className="flex overflow-hidden justify-center items-center self-stretch my-auto w-6 min-h-[24px]">
                                                            <div className="flex self-stretch my-auto w-4 h-4 rounded border-solid border-[1.5px] border-zinc-500 min-h-[16px]" />
                                                        </div>
                                                    </div>
                                                    <div className="flex shrink-0 self-stretch my-auto w-4 h-8" />
                                                </div>
                                                <div className="flex gap-1 items-center self-stretch my-auto">
                                                    <div className="flex overflow-hidden flex-col justify-center items-center self-stretch p-2 my-auto w-8">
                                                        <img
                                                            loading="lazy"
                                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/48bdd24f1269b6c10008158e8937354b5317161bfde4bf953aae3ee8bd2042bc?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                            className="object-contain w-4 aspect-square"
                                                        />
                                                    </div>
                                                    <div className="flex gap-2 items-center self-stretch my-auto">
                                                        <div className="flex gap-2.5 items-start self-stretch my-auto w-[52px]">
                                                            <img
                                                                loading="lazy"
                                                                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                                className="object-contain aspect-square w-[52px]"
                                                            />
                                                        </div>
                                                        <div className="flex flex-col justify-center self-stretch my-auto w-[100px]">
                                                            <div className="text-sm leading-none text-neutral-400">
                                                                Josh Goode
                                                            </div>
                                                            <div className="self-start px-1 py-0.5 mt-1 text-xs font-semibold tracking-wide leading-tight text-lime-400 whitespace-nowrap bg-lime-800 rounded border border-lime-400 border-solid min-h-[16px]">
                                                                $44.54
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col flex-1 shrink justify-center items-start self-stretch my-auto basis-0 min-w-[240px] text-neutral-400">
                                            <div className="flex-1 shrink gap-2.5 self-stretch p-2.5 max-w-full text-sm leading-none w-[150px]">
                                                Hey, just shared...
                                            </div>
                                            <div className="flex gap-4 items-center px-2 text-xs leading-none w-[75px]">
                                                <div className="self-stretch my-auto w-[59px]">June 24</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center px-3 py-2 w-full border-b border-gray-500 border-opacity-20 max-md:max-w-full">
                                    <div className="flex flex-wrap flex-1 shrink gap-3 items-center self-stretch my-auto w-full basis-0 min-w-[240px] max-md:max-w-full">
                                        <div className="flex gap-2 self-stretch my-auto min-w-[240px]">
                                            <div className="flex gap-2 items-center h-full min-w-[240px]">
                                                <div className="flex gap-1 items-center self-stretch my-auto rounded min-h-[32px]">
                                                    <div className="flex justify-center items-center self-stretch px-1 my-auto w-8 rounded min-h-[32px]">
                                                        <div className="flex overflow-hidden justify-center items-center self-stretch my-auto w-6 min-h-[24px]">
                                                            <div className="flex self-stretch my-auto w-4 h-4 rounded border-solid border-[1.5px] border-zinc-500 min-h-[16px]" />
                                                        </div>
                                                    </div>
                                                    <div className="flex shrink-0 self-stretch my-auto w-4 h-8" />
                                                </div>
                                                <div className="flex gap-1 items-center self-stretch my-auto">
                                                    <div className="flex overflow-hidden flex-col justify-center items-center self-stretch p-2 my-auto w-8">
                                                        <img
                                                            loading="lazy"
                                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/48bdd24f1269b6c10008158e8937354b5317161bfde4bf953aae3ee8bd2042bc?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                            className="object-contain w-4 aspect-square"
                                                        />
                                                    </div>
                                                    <div className="flex gap-2 items-center self-stretch my-auto">
                                                        <div className="flex gap-2.5 items-start self-stretch my-auto w-[52px]">
                                                            <img
                                                                loading="lazy"
                                                                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                                className="object-contain aspect-square w-[52px]"
                                                            />
                                                        </div>
                                                        <div className="flex flex-col justify-center self-stretch my-auto w-[100px]">
                                                            <div className="text-sm leading-none text-neutral-400">
                                                                Josh Goode
                                                            </div>
                                                            <div className="self-start px-1 py-0.5 mt-1 text-xs font-semibold tracking-wide leading-tight text-lime-400 whitespace-nowrap bg-lime-800 rounded border border-lime-400 border-solid min-h-[16px]">
                                                                $44.54
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col flex-1 shrink justify-center items-start self-stretch my-auto basis-0 min-w-[240px] text-neutral-400">
                                            <div className="flex-1 shrink gap-2.5 self-stretch p-2.5 max-w-full text-sm leading-none w-[150px]">
                                                Hey, just shared...
                                            </div>
                                            <div className="flex gap-4 items-center px-2 text-xs leading-none w-[75px]">
                                                <div className="self-stretch my-auto w-[59px]">June 24</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center px-3 py-2 w-full border-b border-gray-500 border-opacity-20 max-md:max-w-full">
                                    <div className="flex flex-wrap flex-1 shrink gap-3 items-center self-stretch my-auto w-full basis-0 min-w-[240px] max-md:max-w-full">
                                        <div className="flex gap-2 self-stretch my-auto min-w-[240px]">
                                            <div className="flex gap-2 items-center h-full min-w-[240px]">
                                                <div className="flex gap-1 items-center self-stretch my-auto rounded min-h-[32px]">
                                                    <div className="flex justify-center items-center self-stretch px-1 my-auto w-8 rounded min-h-[32px]">
                                                        <div className="flex overflow-hidden justify-center items-center self-stretch my-auto w-6 min-h-[24px]">
                                                            <div className="flex self-stretch my-auto w-4 h-4 rounded border-solid border-[1.5px] border-zinc-500 min-h-[16px]" />
                                                        </div>
                                                    </div>
                                                    <div className="flex shrink-0 self-stretch my-auto w-4 h-8" />
                                                </div>
                                                <div className="flex gap-1 items-center self-stretch my-auto">
                                                    <div className="flex overflow-hidden flex-col justify-center items-center self-stretch p-2 my-auto w-8">
                                                        <img
                                                            loading="lazy"
                                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/48bdd24f1269b6c10008158e8937354b5317161bfde4bf953aae3ee8bd2042bc?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                            className="object-contain w-4 aspect-square"
                                                        />
                                                    </div>
                                                    <div className="flex gap-2 items-center self-stretch my-auto">
                                                        <div className="flex gap-2.5 items-start self-stretch my-auto w-[52px]">
                                                            <img
                                                                loading="lazy"
                                                                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                                className="object-contain aspect-square w-[52px]"
                                                            />
                                                        </div>
                                                        <div className="flex flex-col justify-center self-stretch my-auto w-[100px]">
                                                            <div className="text-sm leading-none text-neutral-400">
                                                                Josh Goode
                                                            </div>
                                                            <div className="self-start px-1 py-0.5 mt-1 text-xs font-semibold tracking-wide leading-tight text-lime-400 whitespace-nowrap bg-lime-800 rounded border border-lime-400 border-solid min-h-[16px]">
                                                                $44.54
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col flex-1 shrink justify-center items-start self-stretch my-auto basis-0 min-w-[240px] text-neutral-400">
                                            <div className="flex-1 shrink gap-2.5 self-stretch p-2.5 max-w-full text-sm leading-none w-[150px]">
                                                Hey, just shared...
                                            </div>
                                            <div className="flex gap-4 items-center px-2 text-xs leading-none w-[75px]">
                                                <div className="self-stretch my-auto w-[59px]">June 24</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center px-3 py-2 w-full border-b border-gray-500 border-opacity-20 max-md:max-w-full">
                                    <div className="flex flex-wrap flex-1 shrink gap-3 items-center self-stretch my-auto w-full basis-0 min-w-[240px] max-md:max-w-full">
                                        <div className="flex gap-2 self-stretch my-auto min-w-[240px]">
                                            <div className="flex gap-2 items-center h-full min-w-[240px]">
                                                <div className="flex gap-1 items-center self-stretch my-auto rounded min-h-[32px]">
                                                    <div className="flex justify-center items-center self-stretch px-1 my-auto w-8 rounded min-h-[32px]">
                                                        <div className="flex overflow-hidden justify-center items-center self-stretch my-auto w-6 min-h-[24px]">
                                                            <div className="flex self-stretch my-auto w-4 h-4 rounded border-solid border-[1.5px] border-zinc-500 min-h-[16px]" />
                                                        </div>
                                                    </div>
                                                    <div className="flex shrink-0 self-stretch my-auto w-4 h-8" />
                                                </div>
                                                <div className="flex gap-1 items-center self-stretch my-auto">
                                                    <div className="flex overflow-hidden flex-col justify-center items-center self-stretch p-2 my-auto w-8">
                                                        <img
                                                            loading="lazy"
                                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/48bdd24f1269b6c10008158e8937354b5317161bfde4bf953aae3ee8bd2042bc?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                            className="object-contain w-4 aspect-square"
                                                        />
                                                    </div>
                                                    <div className="flex gap-2 items-center self-stretch my-auto">
                                                        <div className="flex gap-2.5 items-start self-stretch my-auto w-[52px]">
                                                            <img
                                                                loading="lazy"
                                                                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                                className="object-contain aspect-square w-[52px]"
                                                            />
                                                        </div>
                                                        <div className="flex flex-col justify-center self-stretch my-auto w-[100px]">
                                                            <div className="text-sm leading-none text-neutral-400">
                                                                Josh Goode
                                                            </div>
                                                            <div className="self-start px-1 py-0.5 mt-1 text-xs font-semibold tracking-wide leading-tight text-lime-400 whitespace-nowrap bg-lime-800 rounded border border-lime-400 border-solid min-h-[16px]">
                                                                $44.54
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col flex-1 shrink justify-center items-start self-stretch my-auto basis-0 min-w-[240px] text-neutral-400">
                                            <div className="flex-1 shrink gap-2.5 self-stretch p-2.5 max-w-full text-sm leading-none w-[150px]">
                                                Hey, just shared...
                                            </div>
                                            <div className="flex gap-4 items-center px-2 text-xs leading-none w-[75px]">
                                                <div className="self-stretch my-auto w-[59px]">June 24</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center px-3 py-2 w-full border-b border-gray-500 border-opacity-20 max-md:max-w-full">
                                    <div className="flex flex-wrap flex-1 shrink gap-3 items-center self-stretch my-auto w-full basis-0 min-w-[240px] max-md:max-w-full">
                                        <div className="flex gap-2 self-stretch my-auto min-w-[240px]">
                                            <div className="flex gap-2 items-center h-full min-w-[240px]">
                                                <div className="flex gap-1 items-center self-stretch my-auto rounded min-h-[32px]">
                                                    <div className="flex justify-center items-center self-stretch px-1 my-auto w-8 rounded min-h-[32px]">
                                                        <div className="flex overflow-hidden justify-center items-center self-stretch my-auto w-6 min-h-[24px]">
                                                            <div className="flex self-stretch my-auto w-4 h-4 rounded border-solid border-[1.5px] border-zinc-500 min-h-[16px]" />
                                                        </div>
                                                    </div>
                                                    <div className="flex shrink-0 self-stretch my-auto w-4 h-8" />
                                                </div>
                                                <div className="flex gap-1 items-center self-stretch my-auto">
                                                    <div className="flex overflow-hidden flex-col justify-center items-center self-stretch p-2 my-auto w-8">
                                                        <img
                                                            loading="lazy"
                                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d4b44fca930ca021e007fe0fffebfe3a0a328eda61ad7870e7eb6fb42f63b862?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                            className="object-contain w-4 aspect-square"
                                                        />
                                                    </div>
                                                    <div className="flex gap-2 items-center self-stretch my-auto">
                                                        <div className="flex gap-2.5 items-start self-stretch my-auto w-[52px]">
                                                            <img
                                                                loading="lazy"
                                                                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/46c9b4d12ec11029767e3949b7f68a7dd150673f5fdbf9f431a8336ba0354c88?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/46c9b4d12ec11029767e3949b7f68a7dd150673f5fdbf9f431a8336ba0354c88?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/46c9b4d12ec11029767e3949b7f68a7dd150673f5fdbf9f431a8336ba0354c88?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/46c9b4d12ec11029767e3949b7f68a7dd150673f5fdbf9f431a8336ba0354c88?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/46c9b4d12ec11029767e3949b7f68a7dd150673f5fdbf9f431a8336ba0354c88?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/46c9b4d12ec11029767e3949b7f68a7dd150673f5fdbf9f431a8336ba0354c88?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/46c9b4d12ec11029767e3949b7f68a7dd150673f5fdbf9f431a8336ba0354c88?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/46c9b4d12ec11029767e3949b7f68a7dd150673f5fdbf9f431a8336ba0354c88?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                                className="object-contain aspect-square w-[52px]"
                                                            />
                                                        </div>
                                                        <div className="flex flex-col justify-center self-stretch my-auto w-[100px]">
                                                            <div className="text-sm leading-none text-neutral-400">
                                                                Josh Goode
                                                            </div>
                                                            <div className="self-start px-1 py-0.5 mt-1 text-xs font-semibold tracking-wide leading-tight text-lime-400 whitespace-nowrap bg-lime-800 rounded border border-lime-400 border-solid min-h-[16px]">
                                                                $44.54
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col flex-1 shrink justify-center items-start self-stretch my-auto text-sm leading-none basis-0 min-w-[240px] text-neutral-400">
                                            <div className="flex-1 shrink gap-2.5 self-stretch p-2.5 max-w-full w-[150px]">
                                                Hey, just shared...
                                            </div>
                                            <div className="flex gap-4 min-h-[17px]" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center px-3 py-2 w-full border-b border-gray-500 border-opacity-20 max-md:max-w-full">
                                    <div className="flex flex-1 shrink gap-3 items-center self-stretch my-auto w-full basis-0 min-w-[240px] max-md:max-w-full">
                                        <div className="flex gap-2 self-stretch my-auto min-w-[240px]">
                                            <div className="flex gap-2 items-center h-full min-w-[240px]">
                                                <div className="flex gap-1 items-center self-stretch my-auto rounded min-h-[32px]">
                                                    <div className="flex justify-center items-center self-stretch px-1 my-auto w-8 rounded min-h-[32px]">
                                                        <div className="flex overflow-hidden justify-center items-center self-stretch my-auto w-6 min-h-[24px]">
                                                            <div className="flex self-stretch my-auto w-4 h-4 rounded border-solid border-[1.5px] border-zinc-500 min-h-[16px]" />
                                                        </div>
                                                    </div>
                                                    <div className="flex shrink-0 self-stretch my-auto w-4 h-8" />
                                                </div>
                                                <div className="flex gap-1 items-center self-stretch my-auto">
                                                    <div className="flex self-stretch py-2 my-auto min-h-[32px]" />
                                                    <div className="flex gap-2 items-center self-stretch my-auto">
                                                        <div className="flex gap-2.5 self-stretch my-auto min-h-[52px]" />
                                                        <div className="flex flex-col justify-center self-stretch my-auto w-[100px]">
                                                            <div className="text-sm leading-none text-neutral-400">
                                                                Josh Goode
                                                            </div>
                                                            <div className="self-start px-1 py-0.5 mt-1 text-xs font-semibold tracking-wide leading-tight text-lime-400 whitespace-nowrap bg-lime-800 rounded border border-lime-400 border-solid min-h-[16px]">
                                                                $44.54
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center px-3 py-2 w-full border-b border-gray-500 border-opacity-20 max-md:max-w-full">
                                    <div className="flex flex-1 shrink gap-3 items-center self-stretch my-auto w-full basis-0 min-w-[240px] max-md:max-w-full">
                                        <div className="flex gap-2 self-stretch my-auto min-w-[240px]">
                                            <div className="flex gap-2 items-center h-full min-w-[240px]">
                                                <div className="flex gap-1 items-center self-stretch my-auto rounded min-h-[32px]">
                                                    <div className="flex justify-center items-center self-stretch px-1 my-auto w-8 rounded min-h-[32px]">
                                                        <div className="flex overflow-hidden justify-center items-center self-stretch my-auto w-6 min-h-[24px]">
                                                            <div className="flex self-stretch my-auto w-4 h-4 rounded border-solid border-[1.5px] border-zinc-500 min-h-[16px]" />
                                                        </div>
                                                    </div>
                                                    <div className="flex shrink-0 self-stretch my-auto w-4 h-8" />
                                                </div>
                                                <div className="flex gap-1 items-center self-stretch my-auto">
                                                    <div className="flex self-stretch py-2 my-auto min-h-[32px]" />
                                                    <div className="flex gap-2 items-center self-stretch my-auto">
                                                        <div className="flex gap-2.5 self-stretch my-auto min-h-[52px]" />
                                                        <div className="flex flex-col justify-center self-stretch my-auto w-[100px]">
                                                            <div className="text-sm leading-none text-neutral-400">
                                                                Josh Goode
                                                            </div>
                                                            <div className="self-start px-1 py-0.5 mt-1 text-xs font-semibold tracking-wide leading-tight text-lime-400 whitespace-nowrap bg-lime-800 rounded border border-lime-400 border-solid min-h-[16px]">
                                                                $44.54
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center px-3 py-2 w-full border-b border-gray-500 border-opacity-20 max-md:max-w-full">
                                    <div className="flex flex-1 shrink gap-3 items-center self-stretch my-auto w-full basis-0 min-w-[240px] max-md:max-w-full">
                                        <div className="flex gap-2 self-stretch my-auto min-w-[240px]">
                                            <div className="flex gap-2 items-center h-full min-w-[240px]">
                                                <div className="flex gap-1 items-center self-stretch my-auto rounded min-h-[32px]">
                                                    <div className="flex justify-center items-center self-stretch px-1 my-auto w-8 rounded min-h-[32px]">
                                                        <div className="flex overflow-hidden justify-center items-center self-stretch my-auto w-6 min-h-[24px]">
                                                            <div className="flex self-stretch my-auto w-4 h-4 rounded border-solid border-[1.5px] border-zinc-500 min-h-[16px]" />
                                                        </div>
                                                    </div>
                                                    <div className="flex shrink-0 self-stretch my-auto w-4 h-8" />
                                                </div>
                                                <div className="flex gap-1 items-center self-stretch my-auto">
                                                    <div className="flex self-stretch py-2 my-auto min-h-[32px]" />
                                                    <div className="flex gap-2 items-center self-stretch my-auto">
                                                        <div className="flex gap-2.5 self-stretch my-auto min-h-[52px]" />
                                                        <div className="flex flex-col justify-center self-stretch my-auto w-[100px]">
                                                            <div className="text-sm leading-none text-neutral-400">
                                                                Josh Goode
                                                            </div>
                                                            <div className="self-start px-1 py-0.5 mt-1 text-xs font-semibold tracking-wide leading-tight text-lime-400 whitespace-nowrap bg-lime-800 rounded border border-lime-400 border-solid min-h-[16px]">
                                                                $44.54
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center px-3 py-2 w-full border-b border-gray-500 border-opacity-20 max-md:max-w-full">
                                    <div className="flex flex-1 shrink gap-3 items-center self-stretch my-auto w-full basis-0 min-w-[240px] max-md:max-w-full">
                                        <div className="flex gap-2 self-stretch my-auto min-w-[240px]">
                                            <div className="flex gap-2 items-center h-full min-w-[240px]">
                                                <div className="flex gap-1 items-center self-stretch my-auto rounded min-h-[32px]">
                                                    <div className="flex justify-center items-center self-stretch px-1 my-auto w-8 rounded min-h-[32px]">
                                                        <div className="flex overflow-hidden justify-center items-center self-stretch my-auto w-6 min-h-[24px]">
                                                            <div className="flex self-stretch my-auto w-4 h-4 rounded border-solid border-[1.5px] border-zinc-500 min-h-[16px]" />
                                                        </div>
                                                    </div>
                                                    <div className="flex shrink-0 self-stretch my-auto w-4 h-8" />
                                                </div>
                                                <div className="flex gap-1 items-center self-stretch my-auto">
                                                    <div className="flex self-stretch py-2 my-auto min-h-[32px]" />
                                                    <div className="flex gap-2 items-center self-stretch my-auto">
                                                        <div className="flex gap-2.5 self-stretch my-auto min-h-[52px]" />
                                                        <div className="flex flex-col justify-center self-stretch my-auto w-[100px]">
                                                            <div className="text-sm leading-none text-neutral-400">
                                                                Josh Goode
                                                            </div>
                                                            <div className="self-start px-1 py-0.5 mt-1 text-xs font-semibold tracking-wide leading-tight text-lime-400 whitespace-nowrap bg-lime-800 rounded border border-lime-400 border-solid min-h-[16px]">
                                                                $44.54
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center px-3 py-2 w-full border-b border-gray-500 border-opacity-20 max-md:max-w-full">
                                    <div className="flex flex-1 shrink gap-3 items-center self-stretch my-auto w-full basis-0 min-w-[240px] max-md:max-w-full">
                                        <div className="flex gap-2 self-stretch my-auto min-w-[240px]">
                                            <div className="flex gap-2 items-center h-full min-w-[240px]">
                                                <div className="flex gap-1 items-center self-stretch my-auto rounded min-h-[32px]">
                                                    <div className="flex justify-center items-center self-stretch px-1 my-auto w-8 rounded min-h-[32px]">
                                                        <div className="flex overflow-hidden justify-center items-center self-stretch my-auto w-6 min-h-[24px]">
                                                            <div className="flex self-stretch my-auto w-4 h-4 rounded border-solid border-[1.5px] border-zinc-500 min-h-[16px]" />
                                                        </div>
                                                    </div>
                                                    <div className="flex shrink-0 self-stretch my-auto w-4 h-8" />
                                                </div>
                                                <div className="flex gap-1 items-center self-stretch my-auto">
                                                    <div className="flex self-stretch py-2 my-auto min-h-[32px]" />
                                                    <div className="flex gap-2 items-center self-stretch my-auto">
                                                        <div className="flex gap-2.5 self-stretch my-auto min-h-[52px]" />
                                                        <div className="flex flex-col justify-center self-stretch my-auto w-[100px]">
                                                            <div className="text-sm leading-none text-neutral-400">
                                                                Josh Goode
                                                            </div>
                                                            <div className="self-start px-1 py-0.5 mt-1 text-xs font-semibold tracking-wide leading-tight text-lime-400 whitespace-nowrap bg-lime-800 rounded border border-lime-400 border-solid min-h-[16px]">
                                                                $44.54
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

        </React.Fragment>



    );
};

export default MessagesList;
