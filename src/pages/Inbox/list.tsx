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

            <div className="absolute left-0">

                <div className="flex overflow-hidden flex-col pt-4 bg-neutral-900 max-w-[525px] min-h-[912px]">
                    <div className="flex flex-col justify-center px-3 w-full text-sm leading-none text-neutral-400 max-md:max-w-full">
                        <div className="flex flex-col justify-center items-start w-full max-md:max-w-full">
                            <div className="flex items-center px-4 py-2.5 max-w-full rounded-3xl bg-zinc-900 min-h-[40px] w-[271px]">
                                <div className="flex flex-1 shrink gap-2 items-center self-stretch my-auto w-full basis-0">
                                    <img  alt=""  
                                    
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/7c3ee12b66850f0a284625782f93c0e35aa3b24e2870b985ff08d830e76e290a?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
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
                                <div className="flex flex-1 shrink gap-2 items-center self-stretch my-auto basis-0 min-w-[240px]">
                                    <div className="flex gap-1 items-center self-stretch my-auto min-h-[32px]">
                                        <div className="flex gap-1 items-center self-stretch my-auto rounded bg-zinc-900 min-h-[32px]">
                                            <div className="flex justify-center items-center self-stretch px-1 my-auto w-8 rounded min-h-[32px]">
                                                <div className="flex overflow-hidden justify-center items-center self-stretch my-auto w-6 min-h-[24px]">
                                                    <div className="flex self-stretch my-auto w-4 rounded min-h-[16px]" />
                                                </div>
                                            </div>
                                            <div className="flex justify-center items-center self-stretch py-2 my-auto w-4">
                                                <img  alt=""  
                                                    loading="lazy"
                                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/20fb1a14e454f4be532947fd226d91921d1dec31b7a1350115a8c435e71f6fca?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                    className="object-contain self-stretch my-auto w-4 aspect-square"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-1 items-center self-stretch my-auto">
                                        <div className="flex gap-2.5 justify-center items-center self-stretch px-2 my-auto w-8 h-8 rounded bg-neutral-800">
                                            <img  alt=""  
                                                loading="lazy"
                                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/211f3ae9631992ccc06e8fce684645d68e1622adce98b52bb94526482eb90154?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                className="object-contain self-stretch my-auto w-4 aspect-square"
                                            />
                                        </div>
                                        <div className="flex gap-2.5 justify-center items-center self-stretch px-2 my-auto w-8 h-8 rounded bg-zinc-900">
                                            <img  alt=""  
                                                loading="lazy"
                                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/364a559191ac25d1290738b1a8800412a0c30418996dfee699da0d89443eb229?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                className="object-contain self-stretch my-auto w-4 aspect-square"
                                            />
                                        </div>
                                        <div className="flex gap-2.5 justify-center items-center self-stretch px-2 my-auto w-8 h-8 rounded bg-zinc-900">
                                            <img  alt=""  
                                                loading="lazy"
                                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/186a313af591defc3328a7aea9a57bb92a6e5c13880fc48a6926416688d4affa?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                className="object-contain self-stretch my-auto w-4 aspect-square"
                                            />
                                        </div>
                                        <div className="flex gap-2.5 justify-center items-center self-stretch px-2 my-auto w-8 h-8 rounded bg-zinc-900">
                                            <img  alt=""  
                                                loading="lazy"
                                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/6643a73fb455ba46442f2b41a5b597a301967756dcf1e52a3d78a2a9d64d6611?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                className="object-contain self-stretch my-auto w-4 aspect-square"
                                            />
                                        </div>
                                        <div className="flex gap-2.5 justify-center items-center self-stretch px-2 my-auto w-8 h-8 rounded bg-zinc-900">
                                            <img  alt=""  
                                                loading="lazy"
                                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/a9dab9aecac207797a79c1790c3263682afad69951f2caf6fe9b99e86b454f52?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                className="object-contain self-stretch my-auto w-4 aspect-square"
                                            />
                                        </div>
                                        <div className="flex gap-2.5 justify-center items-center self-stretch px-2 my-auto w-8 h-8 rounded bg-zinc-900">
                                            <img  alt=""  
                                                loading="lazy"
                                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/4127629b70590a9d342aebe2ebe3cf955e8e38068d0045872503b517c32e2786?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
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
                                        <img  alt=""  
                                            loading="lazy"
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c9fc6a4e6133bf349adf8fa489bd9a9e086c309036e805b45988ad25846061bd?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                            className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                                        />
                                        <img  alt=""  
                                            loading="lazy"
                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1aeba66ba50e054d88ddb4f123f55f99884f99fd9e46cc2f139f825601004bd1?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                            className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex overflow-hidden flex-col pb-1 w-full h-[799px] max-md:max-w-full">
                            <div className="flex justify-between items-center px-3 py-2 w-full max-md:max-w-full">
                                <div className="flex flex-wrap flex-1 shrink gap-3 items-center self-stretch my-auto w-full basis-0 min-w-[240px] max-md:max-w-full">
                                    <div className="flex gap-2 self-stretch my-auto min-w-[240px]">
                                        <div className="flex gap-2 items-center h-full min-w-[240px]">
                                            <div className="flex gap-1 self-stretch my-auto rounded min-h-[32px]">
                                                <div className="flex justify-center items-center px-1 my-auto w-8 rounded min-h-[32px]">
                                                    <div className="flex overflow-hidden justify-center items-center self-stretch my-auto w-6 min-h-[24px]">
                                                        <div className="flex self-stretch my-auto w-4 rounded min-h-[16px]" />
                                                    </div>
                                                </div>
                                                <div className="flex overflow-hidden flex-col justify-center items-center py-2 w-4">
                                                    <div className="flex w-2 h-2 bg-lime-300 rounded-full min-h-[8px]" />
                                                </div>
                                            </div>
                                            <div className="flex gap-1 items-center self-stretch my-auto">
                                                <div className="flex overflow-hidden flex-col justify-center items-center self-stretch p-2 my-auto w-8">
                                                    <img  alt=""  
                                                        loading="lazy"
                                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/7a83db294fb9c89d66696d0d2dd8d85d682634c3bf20c0a9b819c032c5ff4a8f?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                        className="object-contain w-4 aspect-square"
                                                    />
                                                </div>
                                                <div className="flex gap-2 items-center self-stretch my-auto">
                                                    <div className="flex gap-2.5 items-start self-stretch my-auto w-[52px]">
                                                        <img  alt=""  
                                                            loading="lazy"
                                                            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                            className="object-contain aspect-square w-[52px]"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col justify-center self-stretch my-auto font-semibold w-[100px]">
                                                        <div className="text-sm leading-none text-white">
                                                            Becky Hill
                                                        </div>
                                                        <div className="self-start px-1 py-0.5 mt-1 text-xs tracking-wide leading-tight text-lime-400 whitespace-nowrap bg-lime-800 rounded min-h-[16px]">
                                                            $434.99
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col flex-1 shrink justify-center items-start self-stretch my-auto text-white basis-6">
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
                            <div className="flex justify-between items-center px-3 py-2 w-full bg-neutral-800 max-md:max-w-full">
                                <div className="flex flex-wrap flex-1 shrink gap-3 items-center self-stretch my-auto w-full basis-0 min-w-[240px] max-md:max-w-full">
                                    <div className="flex gap-2 self-stretch my-auto min-w-[240px]">
                                        <div className="flex gap-2 items-center h-full min-w-[240px]">
                                            <div className="flex gap-1 self-stretch my-auto rounded min-h-[32px]">
                                                <div className="flex justify-center items-center px-1 my-auto w-8 rounded min-h-[32px]">
                                                    <div className="flex overflow-hidden justify-center items-center self-stretch my-auto w-6 min-h-[24px]">
                                                        <div className="flex self-stretch my-auto w-4 rounded min-h-[16px]" />
                                                    </div>
                                                </div>
                                                <div className="flex shrink-0 py-2 w-4 h-8" />
                                            </div>
                                            <div className="flex gap-1 items-center self-stretch my-auto">
                                                <div className="flex overflow-hidden flex-col justify-center items-center self-stretch p-2 my-auto w-8">
                                                    <img  alt=""  
                                                        loading="lazy"
                                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/7a83db294fb9c89d66696d0d2dd8d85d682634c3bf20c0a9b819c032c5ff4a8f?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                        className="object-contain w-4 aspect-square"
                                                    />
                                                </div>
                                                <div className="flex gap-2 items-center self-stretch my-auto">
                                                    <div className="flex gap-2.5 items-start self-stretch my-auto w-[52px]">
                                                        <img  alt=""  
                                                            loading="lazy"
                                                            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                            className="object-contain aspect-square w-[52px]"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col justify-center self-stretch my-auto w-[100px]">
                                                        <div className="text-sm leading-none text-white">
                                                            Simon Mehl
                                                        </div>
                                                        <div className="self-start px-1 py-0.5 mt-1 text-xs font-semibold tracking-wide leading-tight text-lime-400 whitespace-nowrap bg-lime-800 rounded min-h-[16px]">
                                                            $434.99
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col flex-1 shrink justify-center items-start self-stretch my-auto basis-0 text-neutral-400">
                                        <div className="flex-1 shrink gap-2.5 self-stretch p-2.5 max-w-full text-sm leading-none w-[150px]">
                                            Hey, just shared...
                                        </div>
                                        <div className="flex gap-4 items-center px-2 text-xs leading-none w-[75px]">
                                            <div className="self-stretch my-auto w-[59px]">4:37 PM</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center px-3 py-2 w-full max-md:max-w-full">
                                <div className="flex flex-wrap flex-1 shrink gap-3 items-center self-stretch my-auto w-full basis-0 min-w-[240px] max-md:max-w-full">
                                    <div className="flex gap-2 self-stretch my-auto min-w-[240px]">
                                        <div className="flex gap-2 items-center h-full min-w-[240px]">
                                            <div className="flex gap-1 self-stretch my-auto rounded min-h-[32px]">
                                                <div className="flex justify-center items-center px-1 my-auto w-8 rounded min-h-[32px]">
                                                    <div className="flex overflow-hidden justify-center items-center self-stretch my-auto w-6 min-h-[24px]">
                                                        <div className="flex self-stretch my-auto w-4 rounded min-h-[16px]" />
                                                    </div>
                                                </div>
                                                <div className="flex overflow-hidden flex-col justify-center items-center py-2 w-4">
                                                    <div className="flex w-2 h-2 bg-lime-300 rounded-full min-h-[8px]" />
                                                </div>
                                            </div>
                                            <div className="flex gap-1 items-center self-stretch my-auto">
                                                <div className="flex overflow-hidden flex-col justify-center items-center self-stretch p-2 my-auto w-8">
                                                    <img  alt=""  
                                                        loading="lazy"
                                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/7a83db294fb9c89d66696d0d2dd8d85d682634c3bf20c0a9b819c032c5ff4a8f?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                        className="object-contain w-4 aspect-square"
                                                    />
                                                </div>
                                                <div className="flex gap-2 items-center self-stretch my-auto">
                                                    <div className="flex gap-2.5 items-start self-stretch my-auto w-[52px]">
                                                        <img  alt=""  
                                                            loading="lazy"
                                                            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                            className="object-contain aspect-square w-[52px]"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col justify-center self-stretch my-auto font-semibold w-[100px]">
                                                        <div className="text-sm leading-none text-white">
                                                            Becky Hill
                                                        </div>
                                                        <div className="self-start px-1 py-0.5 mt-1 text-xs tracking-wide leading-tight text-lime-400 whitespace-nowrap bg-lime-800 rounded min-h-[16px]">
                                                            $434.99
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col flex-1 shrink justify-center items-start self-stretch my-auto text-white basis-6">
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
                            <div className="flex justify-between items-center px-3 py-2 w-full max-md:max-w-full">
                                <div className="flex flex-wrap flex-1 shrink gap-3 items-center self-stretch my-auto w-full basis-0 min-w-[240px] max-md:max-w-full">
                                    <div className="flex gap-2 self-stretch my-auto min-w-[240px]">
                                        <div className="flex gap-2 items-center h-full min-w-[240px]">
                                            <div className="flex gap-1 self-stretch my-auto rounded min-h-[32px]">
                                                <div className="flex justify-center items-center px-1 my-auto w-8 rounded min-h-[32px]">
                                                    <div className="flex overflow-hidden justify-center items-center self-stretch my-auto w-6 min-h-[24px]">
                                                        <div className="flex self-stretch my-auto w-4 rounded min-h-[16px]" />
                                                    </div>
                                                </div>
                                                <div className="flex shrink-0 py-2 w-4 h-8" />
                                            </div>
                                            <div className="flex gap-1 items-center self-stretch my-auto">
                                                <div className="flex overflow-hidden flex-col justify-center items-center self-stretch p-2 my-auto w-8">
                                                    <img  alt=""  
                                                        loading="lazy"
                                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/19ec09db830f604b1d219576d63052777363a7c3b41d42f3b762379875f51a00?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                        className="object-contain w-4 aspect-square"
                                                    />
                                                </div>
                                                <div className="flex gap-2 items-center self-stretch my-auto">
                                                    <div className="flex gap-2.5 items-start self-stretch my-auto w-[52px]">
                                                        <img  alt=""  
                                                            loading="lazy"
                                                            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                            className="object-contain aspect-square w-[52px]"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col justify-center self-stretch my-auto w-[100px]">
                                                        <div className="text-sm leading-none text-neutral-400">
                                                            Josh Goode
                                                        </div>
                                                        <div className="self-start px-1 py-0.5 mt-1 text-xs font-semibold tracking-wide leading-tight text-lime-400 whitespace-nowrap bg-lime-800 rounded min-h-[16px]">
                                                            $44.54
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col flex-1 shrink justify-center items-start self-stretch my-auto basis-0 text-neutral-400">
                                        <div className="flex-1 shrink gap-2.5 self-stretch p-2.5 max-w-full text-sm leading-none w-[150px]">
                                            Hey, just shared...
                                        </div>
                                        <div className="flex gap-4 items-center px-2 text-xs leading-none w-[75px]">
                                            <div className="self-stretch my-auto w-[59px]">June 24</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center px-3 py-2 w-full max-md:max-w-full">
                                <div className="flex flex-wrap flex-1 shrink gap-3 items-center self-stretch my-auto w-full basis-0 min-w-[240px] max-md:max-w-full">
                                    <div className="flex gap-2 self-stretch my-auto min-w-[240px]">
                                        <div className="flex gap-2 items-center h-full min-w-[240px]">
                                            <div className="flex gap-1 self-stretch my-auto rounded min-h-[32px]">
                                                <div className="flex justify-center items-center px-1 my-auto w-8 rounded min-h-[32px]">
                                                    <div className="flex overflow-hidden justify-center items-center self-stretch my-auto w-6 min-h-[24px]">
                                                        <div className="flex self-stretch my-auto w-4 rounded min-h-[16px]" />
                                                    </div>
                                                </div>
                                                <div className="flex shrink-0 py-2 w-4 h-8" />
                                            </div>
                                            <div className="flex gap-1 items-center self-stretch my-auto">
                                                <div className="flex overflow-hidden flex-col justify-center items-center self-stretch p-2 my-auto w-8">
                                                    <img  alt=""  
                                                        loading="lazy"
                                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/19ec09db830f604b1d219576d63052777363a7c3b41d42f3b762379875f51a00?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                        className="object-contain w-4 aspect-square"
                                                    />
                                                </div>
                                                <div className="flex gap-2 items-center self-stretch my-auto">
                                                    <div className="flex gap-2.5 items-start self-stretch my-auto w-[52px]">
                                                        <img  alt=""  
                                                            loading="lazy"
                                                            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                            className="object-contain aspect-square w-[52px]"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col justify-center self-stretch my-auto w-[100px]">
                                                        <div className="text-sm leading-none text-neutral-400">
                                                            Josh Goode
                                                        </div>
                                                        <div className="self-start px-1 py-0.5 mt-1 text-xs font-semibold tracking-wide leading-tight text-lime-400 whitespace-nowrap bg-lime-800 rounded min-h-[16px]">
                                                            $44.54
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col flex-1 shrink justify-center items-start self-stretch my-auto basis-0 text-neutral-400">
                                        <div className="flex-1 shrink gap-2.5 self-stretch p-2.5 max-w-full text-sm leading-none w-[150px]">
                                            Hey, just shared...
                                        </div>
                                        <div className="flex gap-4 items-center px-2 text-xs leading-none w-[75px]">
                                            <div className="self-stretch my-auto w-[59px]">June 24</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center px-3 py-2 w-full max-md:max-w-full">
                                <div className="flex flex-wrap flex-1 shrink gap-3 items-center self-stretch my-auto w-full basis-0 min-w-[240px] max-md:max-w-full">
                                    <div className="flex gap-2 self-stretch my-auto min-w-[240px]">
                                        <div className="flex gap-2 items-center h-full min-w-[240px]">
                                            <div className="flex gap-1 self-stretch my-auto rounded min-h-[32px]">
                                                <div className="flex justify-center items-center px-1 my-auto w-8 rounded min-h-[32px]">
                                                    <div className="flex overflow-hidden justify-center items-center self-stretch my-auto w-6 min-h-[24px]">
                                                        <div className="flex self-stretch my-auto w-4 rounded min-h-[16px]" />
                                                    </div>
                                                </div>
                                                <div className="flex shrink-0 py-2 w-4 h-8" />
                                            </div>
                                            <div className="flex gap-1 items-center self-stretch my-auto">
                                                <div className="flex overflow-hidden flex-col justify-center items-center self-stretch p-2 my-auto w-8">
                                                    <img  alt=""  
                                                        loading="lazy"
                                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/19ec09db830f604b1d219576d63052777363a7c3b41d42f3b762379875f51a00?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                        className="object-contain w-4 aspect-square"
                                                    />
                                                </div>
                                                <div className="flex gap-2 items-center self-stretch my-auto">
                                                    <div className="flex gap-2.5 items-start self-stretch my-auto w-[52px]">
                                                        <img  alt=""  
                                                            loading="lazy"
                                                            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                            className="object-contain aspect-square w-[52px]"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col justify-center self-stretch my-auto w-[100px]">
                                                        <div className="text-sm leading-none text-neutral-400">
                                                            Josh Goode
                                                        </div>
                                                        <div className="self-start px-1 py-0.5 mt-1 text-xs font-semibold tracking-wide leading-tight text-lime-400 whitespace-nowrap bg-lime-800 rounded min-h-[16px]">
                                                            $44.54
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col flex-1 shrink justify-center items-start self-stretch my-auto basis-0 text-neutral-400">
                                        <div className="flex-1 shrink gap-2.5 self-stretch p-2.5 max-w-full text-sm leading-none w-[150px]">
                                            Hey, just shared...
                                        </div>
                                        <div className="flex gap-4 items-center px-2 text-xs leading-none w-[75px]">
                                            <div className="self-stretch my-auto w-[59px]">June 24</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center px-3 py-2 w-full max-md:max-w-full">
                                <div className="flex flex-wrap flex-1 shrink gap-3 items-center self-stretch my-auto w-full basis-0 min-w-[240px] max-md:max-w-full">
                                    <div className="flex gap-2 self-stretch my-auto min-w-[240px]">
                                        <div className="flex gap-2 items-center h-full min-w-[240px]">
                                            <div className="flex gap-1 self-stretch my-auto rounded min-h-[32px]">
                                                <div className="flex justify-center items-center px-1 my-auto w-8 rounded min-h-[32px]">
                                                    <div className="flex overflow-hidden justify-center items-center self-stretch my-auto w-6 min-h-[24px]">
                                                        <div className="flex self-stretch my-auto w-4 rounded min-h-[16px]" />
                                                    </div>
                                                </div>
                                                <div className="flex shrink-0 py-2 w-4 h-8" />
                                            </div>
                                            <div className="flex gap-1 items-center self-stretch my-auto">
                                                <div className="flex overflow-hidden flex-col justify-center items-center self-stretch p-2 my-auto w-8">
                                                    <img  alt=""  
                                                        loading="lazy"
                                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/19ec09db830f604b1d219576d63052777363a7c3b41d42f3b762379875f51a00?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                        className="object-contain w-4 aspect-square"
                                                    />
                                                </div>
                                                <div className="flex gap-2 items-center self-stretch my-auto">
                                                    <div className="flex gap-2.5 items-start self-stretch my-auto w-[52px]">
                                                        <img  alt=""  
                                                            loading="lazy"
                                                            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                            className="object-contain aspect-square w-[52px]"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col justify-center self-stretch my-auto w-[100px]">
                                                        <div className="text-sm leading-none text-neutral-400">
                                                            Josh Goode
                                                        </div>
                                                        <div className="self-start px-1 py-0.5 mt-1 text-xs font-semibold tracking-wide leading-tight text-lime-400 whitespace-nowrap bg-lime-800 rounded min-h-[16px]">
                                                            $44.54
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col flex-1 shrink justify-center items-start self-stretch my-auto basis-0 text-neutral-400">
                                        <div className="flex-1 shrink gap-2.5 self-stretch p-2.5 max-w-full text-sm leading-none w-[150px]">
                                            Hey, just shared...
                                        </div>
                                        <div className="flex gap-4 items-center px-2 text-xs leading-none w-[75px]">
                                            <div className="self-stretch my-auto w-[59px]">June 24</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center px-3 py-2 w-full max-md:max-w-full">
                                <div className="flex flex-wrap flex-1 shrink gap-3 items-center self-stretch my-auto w-full basis-0 min-w-[240px] max-md:max-w-full">
                                    <div className="flex gap-2 self-stretch my-auto min-w-[240px]">
                                        <div className="flex gap-2 items-center h-full min-w-[240px]">
                                            <div className="flex gap-1 self-stretch my-auto rounded min-h-[32px]">
                                                <div className="flex justify-center items-center px-1 my-auto w-8 rounded min-h-[32px]">
                                                    <div className="flex overflow-hidden justify-center items-center self-stretch my-auto w-6 min-h-[24px]">
                                                        <div className="flex self-stretch my-auto w-4 rounded min-h-[16px]" />
                                                    </div>
                                                </div>
                                                <div className="flex shrink-0 py-2 w-4 h-8" />
                                            </div>
                                            <div className="flex gap-1 items-center self-stretch my-auto">
                                                <div className="flex overflow-hidden flex-col justify-center items-center self-stretch p-2 my-auto w-8">
                                                    <img  alt=""  
                                                        loading="lazy"
                                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/19ec09db830f604b1d219576d63052777363a7c3b41d42f3b762379875f51a00?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                        className="object-contain w-4 aspect-square"
                                                    />
                                                </div>
                                                <div className="flex gap-2 items-center self-stretch my-auto">
                                                    <div className="flex gap-2.5 items-start self-stretch my-auto w-[52px]">
                                                        <img  alt=""  
                                                            loading="lazy"
                                                            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                            className="object-contain aspect-square w-[52px]"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col justify-center self-stretch my-auto w-[100px]">
                                                        <div className="text-sm leading-none text-neutral-400">
                                                            Josh Goode
                                                        </div>
                                                        <div className="self-start px-1 py-0.5 mt-1 text-xs font-semibold tracking-wide leading-tight text-lime-400 whitespace-nowrap bg-lime-800 rounded min-h-[16px]">
                                                            $44.54
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col flex-1 shrink justify-center items-start self-stretch my-auto basis-0 text-neutral-400">
                                        <div className="flex-1 shrink gap-2.5 self-stretch p-2.5 max-w-full text-sm leading-none w-[150px]">
                                            Hey, just shared...
                                        </div>
                                        <div className="flex gap-4 items-center px-2 text-xs leading-none w-[75px]">
                                            <div className="self-stretch my-auto w-[59px]">June 24</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center px-3 py-2 w-full max-md:max-w-full">
                                <div className="flex flex-wrap flex-1 shrink gap-3 items-center self-stretch my-auto w-full basis-0 min-w-[240px] max-md:max-w-full">
                                    <div className="flex gap-2 self-stretch my-auto min-w-[240px]">
                                        <div className="flex gap-2 items-center h-full min-w-[240px]">
                                            <div className="flex gap-1 self-stretch my-auto rounded min-h-[32px]">
                                                <div className="flex justify-center items-center px-1 my-auto w-8 rounded min-h-[32px]">
                                                    <div className="flex overflow-hidden justify-center items-center self-stretch my-auto w-6 min-h-[24px]">
                                                        <div className="flex self-stretch my-auto w-4 rounded min-h-[16px]" />
                                                    </div>
                                                </div>
                                                <div className="flex shrink-0 py-2 w-4 h-8" />
                                            </div>
                                            <div className="flex gap-1 items-center self-stretch my-auto">
                                                <div className="flex overflow-hidden flex-col justify-center items-center self-stretch p-2 my-auto w-8">
                                                    <img  alt=""  
                                                        loading="lazy"
                                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/19ec09db830f604b1d219576d63052777363a7c3b41d42f3b762379875f51a00?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                        className="object-contain w-4 aspect-square"
                                                    />
                                                </div>
                                                <div className="flex gap-2 items-center self-stretch my-auto">
                                                    <div className="flex gap-2.5 items-start self-stretch my-auto w-[52px]">
                                                        <img  alt=""  
                                                            loading="lazy"
                                                            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                            className="object-contain aspect-square w-[52px]"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col justify-center self-stretch my-auto w-[100px]">
                                                        <div className="text-sm leading-none text-neutral-400">
                                                            Josh Goode
                                                        </div>
                                                        <div className="self-start px-1 py-0.5 mt-1 text-xs font-semibold tracking-wide leading-tight text-lime-400 whitespace-nowrap bg-lime-800 rounded min-h-[16px]">
                                                            $44.54
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col flex-1 shrink justify-center items-start self-stretch my-auto basis-0 text-neutral-400">
                                        <div className="flex-1 shrink gap-2.5 self-stretch p-2.5 max-w-full text-sm leading-none w-[150px]">
                                            Hey, just shared...
                                        </div>
                                        <div className="flex gap-4 items-center px-2 text-xs leading-none w-[75px]">
                                            <div className="self-stretch my-auto w-[59px]">June 24</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center px-3 py-2 w-full max-md:max-w-full">
                                <div className="flex flex-wrap flex-1 shrink gap-3 items-center self-stretch my-auto w-full basis-0 min-w-[240px] max-md:max-w-full">
                                    <div className="flex gap-2 self-stretch my-auto min-w-[240px]">
                                        <div className="flex gap-2 items-center h-full min-w-[240px]">
                                            <div className="flex gap-1 self-stretch my-auto rounded min-h-[32px]">
                                                <div className="flex justify-center items-center px-1 my-auto w-8 rounded min-h-[32px]">
                                                    <div className="flex overflow-hidden justify-center items-center self-stretch my-auto w-6 min-h-[24px]">
                                                        <div className="flex self-stretch my-auto w-4 rounded min-h-[16px]" />
                                                    </div>
                                                </div>
                                                <div className="flex shrink-0 py-2 w-4 h-8" />
                                            </div>
                                            <div className="flex gap-1 items-center self-stretch my-auto">
                                                <div className="flex overflow-hidden flex-col justify-center items-center self-stretch p-2 my-auto w-8">
                                                    <img  alt=""  
                                                        loading="lazy"
                                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/19ec09db830f604b1d219576d63052777363a7c3b41d42f3b762379875f51a00?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                        className="object-contain w-4 aspect-square"
                                                    />
                                                </div>
                                                <div className="flex gap-2 items-center self-stretch my-auto">
                                                    <div className="flex gap-2.5 items-start self-stretch my-auto w-[52px]">
                                                        <img  alt=""  
                                                            loading="lazy"
                                                            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                            className="object-contain aspect-square w-[52px]"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col justify-center self-stretch my-auto w-[100px]">
                                                        <div className="text-sm leading-none text-neutral-400">
                                                            Josh Goode
                                                        </div>
                                                        <div className="self-start px-1 py-0.5 mt-1 text-xs font-semibold tracking-wide leading-tight text-lime-400 whitespace-nowrap bg-lime-800 rounded min-h-[16px]">
                                                            $44.54
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col flex-1 shrink justify-center items-start self-stretch my-auto basis-0 text-neutral-400">
                                        <div className="flex-1 shrink gap-2.5 self-stretch p-2.5 max-w-full text-sm leading-none w-[150px]">
                                            Hey, just shared...
                                        </div>
                                        <div className="flex gap-4 items-center px-2 text-xs leading-none w-[75px]">
                                            <div className="self-stretch my-auto w-[59px]">June 24</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center px-3 py-2 w-full max-md:max-w-full">
                                <div className="flex flex-wrap flex-1 shrink gap-3 items-center self-stretch my-auto w-full basis-0 min-w-[240px] max-md:max-w-full">
                                    <div className="flex gap-2 self-stretch my-auto min-w-[240px]">
                                        <div className="flex gap-2 items-center h-full min-w-[240px]">
                                            <div className="flex gap-1 self-stretch my-auto rounded min-h-[32px]">
                                                <div className="flex justify-center items-center px-1 my-auto w-8 rounded min-h-[32px]">
                                                    <div className="flex overflow-hidden justify-center items-center self-stretch my-auto w-6 min-h-[24px]">
                                                        <div className="flex self-stretch my-auto w-4 rounded min-h-[16px]" />
                                                    </div>
                                                </div>
                                                <div className="flex shrink-0 py-2 w-4 h-8" />
                                            </div>
                                            <div className="flex gap-1 items-center self-stretch my-auto">
                                                <div className="flex overflow-hidden flex-col justify-center items-center self-stretch p-2 my-auto w-8">
                                                    <img  alt=""  
                                                        loading="lazy"
                                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/19ec09db830f604b1d219576d63052777363a7c3b41d42f3b762379875f51a00?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                        className="object-contain w-4 aspect-square"
                                                    />
                                                </div>
                                                <div className="flex gap-2 items-center self-stretch my-auto">
                                                    <div className="flex gap-2.5 items-start self-stretch my-auto w-[52px]">
                                                        <img  alt=""  
                                                            loading="lazy"
                                                            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/e7e07f23351cbb70fdeb629c2f1e804be65d9716a44d117bab84574a316ae7a5?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                            className="object-contain aspect-square w-[52px]"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col justify-center self-stretch my-auto w-[100px]">
                                                        <div className="text-sm leading-none text-neutral-400">
                                                            Josh Goode
                                                        </div>
                                                        <div className="self-start px-1 py-0.5 mt-1 text-xs font-semibold tracking-wide leading-tight text-lime-400 whitespace-nowrap bg-lime-800 rounded min-h-[16px]">
                                                            $44.54
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col flex-1 shrink justify-center items-start self-stretch my-auto basis-0 text-neutral-400">
                                        <div className="flex-1 shrink gap-2.5 self-stretch p-2.5 max-w-full text-sm leading-none w-[150px]">
                                            Hey, just shared...
                                        </div>
                                        <div className="flex gap-4 items-center px-2 text-xs leading-none w-[75px]">
                                            <div className="self-stretch my-auto w-[59px]">June 24</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center px-3 py-2 w-full max-md:max-w-full">
                                <div className="flex flex-wrap flex-1 shrink gap-3 items-center self-stretch my-auto w-full basis-0 min-w-[240px] max-md:max-w-full">
                                    <div className="flex gap-2 self-stretch my-auto min-w-[240px]">
                                        <div className="flex gap-2 items-center h-full min-w-[240px]">
                                            <div className="flex gap-1 self-stretch my-auto rounded min-h-[32px]">
                                                <div className="flex justify-center items-center px-1 my-auto w-8 rounded min-h-[32px]">
                                                    <div className="flex overflow-hidden justify-center items-center self-stretch my-auto w-6 min-h-[24px]">
                                                        <div className="flex self-stretch my-auto w-4 rounded min-h-[16px]" />
                                                    </div>
                                                </div>
                                                <div className="flex shrink-0 py-2 w-4 h-8" />
                                            </div>
                                            <div className="flex gap-1 items-center self-stretch my-auto">
                                                <div className="flex overflow-hidden flex-col justify-center items-center self-stretch p-2 my-auto w-8">
                                                    <img  alt=""  
                                                        loading="lazy"
                                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/13d394deeb54e52f28f6690140030ec034a471c09ce8a0ffddfdc00564c349be?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                        className="object-contain w-4 aspect-square"
                                                    />
                                                </div>
                                                <div className="flex gap-2 items-center self-stretch my-auto">
                                                    <div className="flex gap-2.5 items-start self-stretch my-auto w-[52px]">
                                                        <img  alt=""  
                                                            loading="lazy"
                                                            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/46c9b4d12ec11029767e3949b7f68a7dd150673f5fdbf9f431a8336ba0354c88?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/46c9b4d12ec11029767e3949b7f68a7dd150673f5fdbf9f431a8336ba0354c88?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/46c9b4d12ec11029767e3949b7f68a7dd150673f5fdbf9f431a8336ba0354c88?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/46c9b4d12ec11029767e3949b7f68a7dd150673f5fdbf9f431a8336ba0354c88?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/46c9b4d12ec11029767e3949b7f68a7dd150673f5fdbf9f431a8336ba0354c88?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/46c9b4d12ec11029767e3949b7f68a7dd150673f5fdbf9f431a8336ba0354c88?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/46c9b4d12ec11029767e3949b7f68a7dd150673f5fdbf9f431a8336ba0354c88?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/46c9b4d12ec11029767e3949b7f68a7dd150673f5fdbf9f431a8336ba0354c88?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                            className="object-contain aspect-square w-[52px]"
                                                        />
                                                    </div>
                                                    <div className="flex flex-col justify-center self-stretch my-auto w-[100px]">
                                                        <div className="text-sm leading-none text-neutral-400">
                                                            Josh Goode
                                                        </div>
                                                        <div className="self-start px-1 py-0.5 mt-1 text-xs font-semibold tracking-wide leading-tight text-lime-400 whitespace-nowrap bg-lime-800 rounded min-h-[16px]">
                                                            $44.54
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col flex-1 shrink justify-center items-start self-stretch my-auto text-sm leading-none basis-0 text-neutral-400">
                                        <div className="flex-1 shrink gap-2.5 self-stretch p-2.5 max-w-full w-[150px]">
                                            Hey, just shared...
                                        </div>
                                        <div className="flex gap-4 min-h-[17px]" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center px-3 py-2 w-full max-md:max-w-full">
                                <div className="flex flex-1 shrink gap-3 items-center self-stretch my-auto w-full basis-0 min-w-[240px] max-md:max-w-full">
                                    <div className="flex gap-2 self-stretch my-auto min-w-[240px]">
                                        <div className="flex gap-2 items-center h-full min-w-[240px]">
                                            <div className="flex gap-1 self-stretch my-auto rounded min-h-[32px]">
                                                <div className="flex justify-center items-center px-1 my-auto w-8 rounded min-h-[32px]">
                                                    <div className="flex overflow-hidden justify-center items-center self-stretch my-auto w-6 min-h-[24px]">
                                                        <div className="flex self-stretch my-auto w-4 rounded min-h-[16px]" />
                                                    </div>
                                                </div>
                                                <div className="flex shrink-0 py-2 w-4 h-8" />
                                            </div>
                                            <div className="flex gap-1 items-center self-stretch my-auto">
                                                <div className="flex self-stretch py-2 my-auto min-h-[32px]" />
                                                <div className="flex gap-2 items-center self-stretch my-auto">
                                                    <div className="flex gap-2.5 self-stretch my-auto min-h-[52px]" />
                                                    <div className="flex flex-col justify-center self-stretch my-auto w-[100px]">
                                                        <div className="text-sm leading-none text-neutral-400">
                                                            Josh Goode
                                                        </div>
                                                        <div className="self-start px-1 py-0.5 mt-1 text-xs font-semibold tracking-wide leading-tight text-lime-400 whitespace-nowrap bg-lime-800 rounded min-h-[16px]">
                                                            $44.54
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center px-3 py-2 w-full max-md:max-w-full">
                                <div className="flex flex-1 shrink gap-3 items-center self-stretch my-auto w-full basis-0 min-w-[240px] max-md:max-w-full">
                                    <div className="flex gap-2 self-stretch my-auto min-w-[240px]">
                                        <div className="flex gap-2 items-center h-full min-w-[240px]">
                                            <div className="flex gap-1 self-stretch my-auto rounded min-h-[32px]">
                                                <div className="flex justify-center items-center px-1 my-auto w-8 rounded min-h-[32px]">
                                                    <div className="flex overflow-hidden justify-center items-center self-stretch my-auto w-6 min-h-[24px]">
                                                        <div className="flex self-stretch my-auto w-4 rounded min-h-[16px]" />
                                                    </div>
                                                </div>
                                                <div className="flex shrink-0 py-2 w-4 h-8" />
                                            </div>
                                            <div className="flex gap-1 items-center self-stretch my-auto">
                                                <div className="flex self-stretch py-2 my-auto min-h-[32px]" />
                                                <div className="flex gap-2 items-center self-stretch my-auto">
                                                    <div className="flex gap-2.5 self-stretch my-auto min-h-[52px]" />
                                                    <div className="flex flex-col justify-center self-stretch my-auto w-[100px]">
                                                        <div className="text-sm leading-none text-neutral-400">
                                                            Josh Goode
                                                        </div>
                                                        <div className="self-start px-1 py-0.5 mt-1 text-xs font-semibold tracking-wide leading-tight text-lime-400 whitespace-nowrap bg-lime-800 rounded min-h-[16px]">
                                                            $44.54
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center px-3 py-2 w-full max-md:max-w-full">
                                <div className="flex flex-1 shrink gap-3 items-center self-stretch my-auto w-full basis-0 min-w-[240px] max-md:max-w-full">
                                    <div className="flex gap-2 self-stretch my-auto min-w-[240px]">
                                        <div className="flex gap-2 items-center h-full min-w-[240px]">
                                            <div className="flex gap-1 self-stretch my-auto rounded min-h-[32px]">
                                                <div className="flex justify-center items-center px-1 my-auto w-8 rounded min-h-[32px]">
                                                    <div className="flex overflow-hidden justify-center items-center self-stretch my-auto w-6 min-h-[24px]">
                                                        <div className="flex self-stretch my-auto w-4 rounded min-h-[16px]" />
                                                    </div>
                                                </div>
                                                <div className="flex shrink-0 py-2 w-4 h-8" />
                                            </div>
                                            <div className="flex gap-1 items-center self-stretch my-auto">
                                                <div className="flex self-stretch py-2 my-auto min-h-[32px]" />
                                                <div className="flex gap-2 items-center self-stretch my-auto">
                                                    <div className="flex gap-2.5 self-stretch my-auto min-h-[52px]" />
                                                    <div className="flex flex-col justify-center self-stretch my-auto w-[100px]">
                                                        <div className="text-sm leading-none text-neutral-400">
                                                            Josh Goode
                                                        </div>
                                                        <div className="self-start px-1 py-0.5 mt-1 text-xs font-semibold tracking-wide leading-tight text-lime-400 whitespace-nowrap bg-lime-800 rounded min-h-[16px]">
                                                            $44.54
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center px-3 py-2 w-full max-md:max-w-full">
                                <div className="flex flex-1 shrink gap-3 items-center self-stretch my-auto w-full basis-0 min-w-[240px] max-md:max-w-full">
                                    <div className="flex gap-2 self-stretch my-auto min-w-[240px]">
                                        <div className="flex gap-2 items-center h-full min-w-[240px]">
                                            <div className="flex gap-1 self-stretch my-auto rounded min-h-[32px]">
                                                <div className="flex justify-center items-center px-1 my-auto w-8 rounded min-h-[32px]">
                                                    <div className="flex overflow-hidden justify-center items-center self-stretch my-auto w-6 min-h-[24px]">
                                                        <div className="flex self-stretch my-auto w-4 rounded min-h-[16px]" />
                                                    </div>
                                                </div>
                                                <div className="flex shrink-0 py-2 w-4 h-8" />
                                            </div>
                                            <div className="flex gap-1 items-center self-stretch my-auto">
                                                <div className="flex self-stretch py-2 my-auto min-h-[32px]" />
                                                <div className="flex gap-2 items-center self-stretch my-auto">
                                                    <div className="flex gap-2.5 self-stretch my-auto min-h-[52px]" />
                                                    <div className="flex flex-col justify-center self-stretch my-auto w-[100px]">
                                                        <div className="text-sm leading-none text-neutral-400">
                                                            Josh Goode
                                                        </div>
                                                        <div className="self-start px-1 py-0.5 mt-1 text-xs font-semibold tracking-wide leading-tight text-lime-400 whitespace-nowrap bg-lime-800 rounded min-h-[16px]">
                                                            $44.54
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center px-3 py-2 w-full max-md:max-w-full">
                                <div className="flex flex-1 shrink gap-3 items-center self-stretch my-auto w-full basis-0 min-w-[240px] max-md:max-w-full">
                                    <div className="flex gap-2 self-stretch my-auto min-w-[240px]">
                                        <div className="flex gap-2 items-center h-full min-w-[240px]">
                                            <div className="flex gap-1 self-stretch my-auto rounded min-h-[32px]">
                                                <div className="flex justify-center items-center px-1 my-auto w-8 rounded min-h-[32px]">
                                                    <div className="flex overflow-hidden justify-center items-center self-stretch my-auto w-6 min-h-[24px]">
                                                        <div className="flex self-stretch my-auto w-4 rounded min-h-[16px]" />
                                                    </div>
                                                </div>
                                                <div className="flex shrink-0 py-2 w-4 h-8" />
                                            </div>
                                            <div className="flex gap-1 items-center self-stretch my-auto">
                                                <div className="flex self-stretch py-2 my-auto min-h-[32px]" />
                                                <div className="flex gap-2 items-center self-stretch my-auto">
                                                    <div className="flex gap-2.5 self-stretch my-auto min-h-[52px]" />
                                                    <div className="flex flex-col justify-center self-stretch my-auto w-[100px]">
                                                        <div className="text-sm leading-none text-neutral-400">
                                                            Josh Goode
                                                        </div>
                                                        <div className="self-start px-1 py-0.5 mt-1 text-xs font-semibold tracking-wide leading-tight text-lime-400 whitespace-nowrap bg-lime-800 rounded min-h-[16px]">
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
