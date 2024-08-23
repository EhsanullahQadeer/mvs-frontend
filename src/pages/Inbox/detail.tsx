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



const MessagesDetail = (props:any) => {


    return (

        <React.Fragment>


            <div className="flex">

                <div className="flex flex-col justify-between px-3 py-2 max-w-4xl min-h-[909px]">
                    <div className="flex flex-col w-full max-md:max-w-full">
                        <div className="flex flex-wrap gap-5 justify-between items-center py-2 pr-3 w-full max-md:max-w-full">
                            <div className="flex gap-2 items-center self-stretch my-auto">
                                <div className="flex relative gap-2.5 items-start self-stretch my-auto w-11">
                                    <div className="flex z-0 shrink-0 w-11 h-11 rounded-full" />
                                    <img  alt=""  
                                        loading="lazy"
                                        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/3735978c0b69383fae7936808efe1969fc85d3b3a765eb1aa6eb513848eb2719?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/3735978c0b69383fae7936808efe1969fc85d3b3a765eb1aa6eb513848eb2719?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/3735978c0b69383fae7936808efe1969fc85d3b3a765eb1aa6eb513848eb2719?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/3735978c0b69383fae7936808efe1969fc85d3b3a765eb1aa6eb513848eb2719?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/3735978c0b69383fae7936808efe1969fc85d3b3a765eb1aa6eb513848eb2719?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/3735978c0b69383fae7936808efe1969fc85d3b3a765eb1aa6eb513848eb2719?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/3735978c0b69383fae7936808efe1969fc85d3b3a765eb1aa6eb513848eb2719?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/3735978c0b69383fae7936808efe1969fc85d3b3a765eb1aa6eb513848eb2719?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                        className="object-contain absolute right-1 bottom-1 z-0 shrink-0 w-9 h-9 rounded-full aspect-square"
                                    />
                                </div>
                                <div className="flex flex-col justify-center self-stretch my-auto w-[100px]">
                                    <div className="text-sm font-bold text-white">Simon Mehl</div>
                                    <div className="text-xs text-zinc-400">Los Angeles, CA</div>
                                </div>
                            </div>
                            <div className="flex gap-2.5 justify-center items-center self-stretch px-2 my-auto w-8 h-8 rounded bg-zinc-900">
                                <img  alt=""  
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/863349b86cd073a53ab244e19a316e50a23805036103b283eb7633ef9ab7ed48?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                    className="object-contain self-stretch my-auto w-4 aspect-square"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col justify-center py-1 w-full text-xs font-medium text-gray-500 whitespace-nowrap max-md:max-w-full">
                            <div className="flex flex-wrap gap-2 items-center py-2 w-full max-md:max-w-full">
                                <div className="gap-2.5 self-stretch px-2.5 py-2 my-auto font-semibold bg-lime-400 rounded-[35px] text-neutral-900">
                                    Messages
                                </div>
                                <div className="gap-2.5 self-stretch px-2.5 py-2 my-auto bg-zinc-900 rounded-[35px]">
                                    Info
                                </div>
                                <div className="gap-2.5 self-stretch px-2.5 py-2 my-auto bg-zinc-900 rounded-[35px]">
                                    Notes
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex overflow-hidden flex-col flex-1 justify-center py-3 w-full max-md:max-w-full">
                        <div className="flex flex-col flex-1 w-full max-md:max-w-full">
                            <div className="flex flex-wrap items-center w-full max-md:max-w-full">
                                <div className="flex flex-col flex-1 shrink justify-center self-stretch p-2.5 my-auto basis-0 min-w-[240px]">
                                    <div className="w-full min-h-[1px]" />
                                </div>
                                <div className="gap-2.5 self-stretch p-2.5 my-auto text-sm font-medium text-zinc-400">
                                    Thursday, May 30, 2024
                                </div>
                                <div className="flex flex-col flex-1 shrink justify-center self-stretch p-2.5 my-auto basis-0 min-w-[240px]">
                                    <div className="w-full min-h-[1px]" />
                                </div>
                            </div>
                            <div className="flex flex-col mt-3 w-full h-[531px] max-md:max-w-full">
                                <div className="flex flex-wrap gap-2 py-2 w-full max-md:max-w-full">
                                    <div className="flex relative gap-2.5 items-start w-11 h-full">
                                        <div className="flex z-0 shrink-0 w-11 h-11 rounded-full" />
                                        <img  alt=""  
                                            loading="lazy"
                                            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/3735978c0b69383fae7936808efe1969fc85d3b3a765eb1aa6eb513848eb2719?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/3735978c0b69383fae7936808efe1969fc85d3b3a765eb1aa6eb513848eb2719?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/3735978c0b69383fae7936808efe1969fc85d3b3a765eb1aa6eb513848eb2719?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/3735978c0b69383fae7936808efe1969fc85d3b3a765eb1aa6eb513848eb2719?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/3735978c0b69383fae7936808efe1969fc85d3b3a765eb1aa6eb513848eb2719?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/3735978c0b69383fae7936808efe1969fc85d3b3a765eb1aa6eb513848eb2719?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/3735978c0b69383fae7936808efe1969fc85d3b3a765eb1aa6eb513848eb2719?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/3735978c0b69383fae7936808efe1969fc85d3b3a765eb1aa6eb513848eb2719?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                            className="object-contain absolute top-1 right-1 z-0 shrink-0 w-9 h-9 rounded-full aspect-square"
                                        />
                                    </div>
                                    <div className="flex flex-col flex-1 shrink my-auto text-sm basis-0 min-w-[240px] max-md:max-w-full">
                                        <div className="flex gap-1 items-start self-start">
                                            <div className="font-bold text-white w-[100px]">
                                                Simon Mehl
                                            </div>
                                            <div className="text-gray-500">4:13 PM</div>
                                        </div>
                                        <div className="mt-1 text-stone-300 max-md:max-w-full">
                                            Justin, i just thought of you when we were making these lyrics
                                            for our brand new demo “Dimelo Mami” let me know if you you
                                            think this would be ideal for Mariah and her team. Looking
                                            forward
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2 py-2 w-full max-md:max-w-full">
                                    <div className="flex relative gap-2.5 items-start w-11 h-full">
                                        <div className="flex z-0 shrink-0 w-11 h-11 rounded-full" />
                                        <img  alt=""  
                                            loading="lazy"
                                            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/b1426314ef2bdeaabfc263a0a502de49d4e7b3e8e3e34d1ab4722a47d84393cb?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/b1426314ef2bdeaabfc263a0a502de49d4e7b3e8e3e34d1ab4722a47d84393cb?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/b1426314ef2bdeaabfc263a0a502de49d4e7b3e8e3e34d1ab4722a47d84393cb?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/b1426314ef2bdeaabfc263a0a502de49d4e7b3e8e3e34d1ab4722a47d84393cb?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/b1426314ef2bdeaabfc263a0a502de49d4e7b3e8e3e34d1ab4722a47d84393cb?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/b1426314ef2bdeaabfc263a0a502de49d4e7b3e8e3e34d1ab4722a47d84393cb?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/b1426314ef2bdeaabfc263a0a502de49d4e7b3e8e3e34d1ab4722a47d84393cb?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/b1426314ef2bdeaabfc263a0a502de49d4e7b3e8e3e34d1ab4722a47d84393cb?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                            className="object-contain absolute right-1 bottom-1 z-0 shrink-0 w-9 h-9 rounded-full aspect-square"
                                        />
                                    </div>
                                    <div className="flex flex-col flex-1 shrink my-auto text-sm basis-0 min-w-[240px] max-md:max-w-full">
                                        <div className="flex gap-1 items-start self-start">
                                            <div className="font-bold text-white w-[100px]">
                                                Justin Quiles
                                            </div>
                                            <div className="text-gray-500">4:15 PM</div>
                                        </div>
                                        <div className="mt-1 text-stone-300 max-md:max-w-full">
                                            Hola Simon! Mi reyna, esto esta durision, mandate los stems
                                            cuando puedas y la letra pa meterle duro a esto este fin de
                                            &lt;3
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2 py-2 w-full max-md:max-w-full">
                                    <div className="flex relative gap-2.5 items-start w-11 h-full">
                                        <div className="flex z-0 shrink-0 w-11 h-11 rounded-full" />
                                        <img  alt=""  
                                            loading="lazy"
                                            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/3735978c0b69383fae7936808efe1969fc85d3b3a765eb1aa6eb513848eb2719?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/3735978c0b69383fae7936808efe1969fc85d3b3a765eb1aa6eb513848eb2719?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/3735978c0b69383fae7936808efe1969fc85d3b3a765eb1aa6eb513848eb2719?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/3735978c0b69383fae7936808efe1969fc85d3b3a765eb1aa6eb513848eb2719?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/3735978c0b69383fae7936808efe1969fc85d3b3a765eb1aa6eb513848eb2719?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/3735978c0b69383fae7936808efe1969fc85d3b3a765eb1aa6eb513848eb2719?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/3735978c0b69383fae7936808efe1969fc85d3b3a765eb1aa6eb513848eb2719?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/3735978c0b69383fae7936808efe1969fc85d3b3a765eb1aa6eb513848eb2719?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                            className="object-contain absolute top-1 right-1 z-0 shrink-0 w-9 h-9 rounded-full aspect-square"
                                        />
                                    </div>
                                    <div className="flex flex-col flex-1 shrink justify-center my-auto basis-0 min-w-[240px] max-md:max-w-full">
                                        <div className="flex flex-col w-full text-sm max-md:max-w-full">
                                            <div className="flex gap-1 items-start self-start">
                                                <div className="font-bold text-white w-[100px]">
                                                    Simon Mehl
                                                </div>
                                                <div className="text-gray-500">4:19 PM</div>
                                            </div>
                                            <div className="mt-1 text-stone-300 max-md:max-w-full">
                                                Gracias Justin! Super emocionada por esta opportunidad!
                                                estoy segura que ustedes la van a romper cuando graben estas
                                                vocales!
                                            </div>
                                        </div>
                                        <div className="flex gap-1 items-center self-start p-3 mt-3 rounded-2xl bg-neutral-800">
                                            <div className="flex gap-2.5 items-start self-stretch my-auto w-9">
                                                <img  alt=""  
                                                    loading="lazy"
                                                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/65e6130a-ec9f-4eee-9592-747102edc98a?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/65e6130a-ec9f-4eee-9592-747102edc98a?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/65e6130a-ec9f-4eee-9592-747102edc98a?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/65e6130a-ec9f-4eee-9592-747102edc98a?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/65e6130a-ec9f-4eee-9592-747102edc98a?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/65e6130a-ec9f-4eee-9592-747102edc98a?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/65e6130a-ec9f-4eee-9592-747102edc98a?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/65e6130a-ec9f-4eee-9592-747102edc98a?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                    className="object-contain w-9 h-9 bg-lime-400 rounded-full aspect-square"
                                                />
                                            </div>
                                            <div className="flex relative flex-col self-stretch py-2.5 pr-2 pl-2.5 my-auto w-[120px]">
                                                <img  alt=""  
                                                    loading="lazy"
                                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/aa34de2b02702438fd5a8f8f63b99263c81db450bbb3093b62732f65094f2092?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                    className="object-contain z-0 max-w-full aspect-[34.48] w-[100px]"
                                                />
                                                <div className="flex absolute bottom-1 left-1 z-0 w-3 h-3 rounded-full bg-zinc-400 min-h-[12px]" />
                                            </div>
                                            <div className="gap-2.5 self-stretch my-auto text-sm whitespace-nowrap text-zinc-400">
                                                3:13
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2 py-2 w-full max-md:max-w-full">
                                    <div className="flex relative gap-2.5 items-start w-11 h-full">
                                        <div className="flex z-0 shrink-0 w-11 h-11 rounded-full" />
                                        <img  alt=""  
                                            loading="lazy"
                                            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/b1426314ef2bdeaabfc263a0a502de49d4e7b3e8e3e34d1ab4722a47d84393cb?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/b1426314ef2bdeaabfc263a0a502de49d4e7b3e8e3e34d1ab4722a47d84393cb?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/b1426314ef2bdeaabfc263a0a502de49d4e7b3e8e3e34d1ab4722a47d84393cb?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/b1426314ef2bdeaabfc263a0a502de49d4e7b3e8e3e34d1ab4722a47d84393cb?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/b1426314ef2bdeaabfc263a0a502de49d4e7b3e8e3e34d1ab4722a47d84393cb?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/b1426314ef2bdeaabfc263a0a502de49d4e7b3e8e3e34d1ab4722a47d84393cb?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/b1426314ef2bdeaabfc263a0a502de49d4e7b3e8e3e34d1ab4722a47d84393cb?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/b1426314ef2bdeaabfc263a0a502de49d4e7b3e8e3e34d1ab4722a47d84393cb?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                            className="object-contain absolute top-1 right-1 z-0 shrink-0 w-9 h-9 rounded-full aspect-square"
                                        />
                                    </div>
                                    <div className="flex flex-col justify-center items-start my-auto min-w-[240px] w-[325px]">
                                        <div className="flex gap-1 items-start text-sm">
                                            <div className="font-bold text-white w-[100px]">
                                                Justin Quiles
                                            </div>
                                            <div className="text-gray-500">4:28 PM</div>
                                        </div>
                                        <div className="flex gap-3 items-center py-2 pr-3 pl-2 mt-3 rounded-3xl bg-neutral-800">
                                            <div className="flex flex-col justify-center items-center self-stretch py-2 my-auto">
                                                <img  alt=""  
                                                    loading="lazy"
                                                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/e762cd6d-83b9-48e2-a10f-af5f42658b79?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/e762cd6d-83b9-48e2-a10f-af5f42658b79?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e762cd6d-83b9-48e2-a10f-af5f42658b79?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/e762cd6d-83b9-48e2-a10f-af5f42658b79?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/e762cd6d-83b9-48e2-a10f-af5f42658b79?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e762cd6d-83b9-48e2-a10f-af5f42658b79?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/e762cd6d-83b9-48e2-a10f-af5f42658b79?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/e762cd6d-83b9-48e2-a10f-af5f42658b79?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                    className="object-contain w-8 h-8 bg-lime-400 rounded-full aspect-square"
                                                />
                                            </div>
                                            <div className="flex gap-1 items-center self-stretch py-2 my-auto min-h-[32px]">
                                                <div className="flex shrink-0 self-stretch my-auto w-0.5 h-2 bg-white rounded-sm" />
                                                <div className="flex shrink-0 self-stretch my-auto w-0.5 h-3.5 bg-white rounded-sm" />
                                                <div className="flex shrink-0 self-stretch my-auto w-0.5 h-4 bg-white rounded-sm" />
                                                <div className="flex shrink-0 self-stretch my-auto w-0.5 h-3.5 bg-white rounded-sm" />
                                                <div className="flex shrink-0 self-stretch my-auto w-0.5 h-2.5 bg-white rounded-sm" />
                                                <div className="flex shrink-0 self-stretch my-auto w-0.5 h-2.5 bg-white rounded-sm" />
                                                <div className="flex shrink-0 self-stretch my-auto w-0.5 h-2.5 bg-white rounded-sm" />
                                                <div className="flex shrink-0 self-stretch my-auto w-0.5 h-3.5 bg-white rounded-sm" />
                                                <div className="flex shrink-0 self-stretch my-auto w-0.5 h-2.5 bg-white rounded-sm" />
                                                <div className="flex shrink-0 self-stretch my-auto w-0.5 h-4 bg-white rounded-sm" />
                                                <div className="flex shrink-0 self-stretch my-auto w-0.5 h-2.5 bg-white rounded-sm" />
                                            </div>
                                            <div className="self-stretch my-auto text-sm leading-none text-red-600">
                                                0:05
                                            </div>
                                            <img  alt=""  
                                                loading="lazy"
                                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/10381a2cf5b83e94982a22a3292710b98291cc197c431b393dc733e237b71dff?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2 py-2 w-full max-md:max-w-full">
                                    <div className="flex relative gap-2.5 items-start w-11 h-full">
                                        <div className="flex z-0 shrink-0 w-11 h-11 rounded-full" />
                                        <img  alt=""  
                                            loading="lazy"
                                            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/b1426314ef2bdeaabfc263a0a502de49d4e7b3e8e3e34d1ab4722a47d84393cb?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/b1426314ef2bdeaabfc263a0a502de49d4e7b3e8e3e34d1ab4722a47d84393cb?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/b1426314ef2bdeaabfc263a0a502de49d4e7b3e8e3e34d1ab4722a47d84393cb?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/b1426314ef2bdeaabfc263a0a502de49d4e7b3e8e3e34d1ab4722a47d84393cb?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/b1426314ef2bdeaabfc263a0a502de49d4e7b3e8e3e34d1ab4722a47d84393cb?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/b1426314ef2bdeaabfc263a0a502de49d4e7b3e8e3e34d1ab4722a47d84393cb?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/b1426314ef2bdeaabfc263a0a502de49d4e7b3e8e3e34d1ab4722a47d84393cb?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/b1426314ef2bdeaabfc263a0a502de49d4e7b3e8e3e34d1ab4722a47d84393cb?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                            className="object-contain absolute top-1 right-1 z-0 shrink-0 w-9 h-9 rounded-full aspect-square"
                                        />
                                    </div>
                                    <div className="flex flex-col justify-center items-start my-auto min-w-[240px] w-[325px]">
                                        <div className="flex gap-1 items-start text-sm">
                                            <div className="font-bold text-white w-[100px]">
                                                Justin Quiles
                                            </div>
                                            <div className="text-gray-500">4:28 PM</div>
                                        </div>
                                        <div className="flex gap-1 items-center p-3 mt-3 rounded-2xl bg-neutral-800">
                                            <div className="flex gap-2.5 items-start self-stretch my-auto w-9">
                                                <img  alt=""  
                                                    loading="lazy"
                                                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/b31c3115-8f50-46de-a464-90dd52008c72?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/b31c3115-8f50-46de-a464-90dd52008c72?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/b31c3115-8f50-46de-a464-90dd52008c72?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/b31c3115-8f50-46de-a464-90dd52008c72?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/b31c3115-8f50-46de-a464-90dd52008c72?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/b31c3115-8f50-46de-a464-90dd52008c72?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/b31c3115-8f50-46de-a464-90dd52008c72?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/b31c3115-8f50-46de-a464-90dd52008c72?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                    className="object-contain w-9 h-9 bg-lime-400 rounded-full aspect-square"
                                                />
                                            </div>
                                            <div className="flex relative flex-col self-stretch py-2.5 pr-2 pl-2.5 my-auto w-[120px]">
                                                <img  alt=""  
                                                    loading="lazy"
                                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/aa34de2b02702438fd5a8f8f63b99263c81db450bbb3093b62732f65094f2092?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                    className="object-contain z-0 max-w-full aspect-[34.48] w-[100px]"
                                                />
                                                <div className="flex absolute bottom-1 left-1 z-0 w-3 h-3 rounded-full bg-zinc-400 min-h-[12px]" />
                                            </div>
                                            <div className="gap-2.5 self-stretch my-auto text-sm whitespace-nowrap text-zinc-400">
                                                3:13
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2 py-2 w-full max-md:max-w-full">
                                    <div className="flex relative gap-2.5 items-start w-11 h-full">
                                        <div className="flex z-0 shrink-0 w-11 h-11 rounded-full" />
                                        <img  alt=""  
                                            loading="lazy"
                                            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/b1426314ef2bdeaabfc263a0a502de49d4e7b3e8e3e34d1ab4722a47d84393cb?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/b1426314ef2bdeaabfc263a0a502de49d4e7b3e8e3e34d1ab4722a47d84393cb?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/b1426314ef2bdeaabfc263a0a502de49d4e7b3e8e3e34d1ab4722a47d84393cb?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/b1426314ef2bdeaabfc263a0a502de49d4e7b3e8e3e34d1ab4722a47d84393cb?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/b1426314ef2bdeaabfc263a0a502de49d4e7b3e8e3e34d1ab4722a47d84393cb?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/b1426314ef2bdeaabfc263a0a502de49d4e7b3e8e3e34d1ab4722a47d84393cb?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/b1426314ef2bdeaabfc263a0a502de49d4e7b3e8e3e34d1ab4722a47d84393cb?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/b1426314ef2bdeaabfc263a0a502de49d4e7b3e8e3e34d1ab4722a47d84393cb?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                            className="object-contain absolute top-1 right-1 z-0 shrink-0 w-9 h-9 rounded-full aspect-square"
                                        />
                                    </div>
                                    <div className="flex flex-col justify-center items-start my-auto min-w-[240px] w-[325px]">
                                        <div className="flex gap-1 items-start text-sm">
                                            <div className="font-bold text-white w-[100px]">
                                                Justin Quiles
                                            </div>
                                            <div className="text-gray-500">4:28 PM</div>
                                        </div>
                                        <div className="flex gap-3 items-center py-2 pr-3 pl-2 mt-3 rounded-3xl bg-neutral-800">
                                            <div className="flex flex-col justify-center items-center self-stretch py-2 my-auto">
                                                <img  alt=""  
                                                    loading="lazy"
                                                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/d4dd91ca-5991-44f2-b2ef-d635e5f956b3?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/d4dd91ca-5991-44f2-b2ef-d635e5f956b3?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d4dd91ca-5991-44f2-b2ef-d635e5f956b3?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/d4dd91ca-5991-44f2-b2ef-d635e5f956b3?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/d4dd91ca-5991-44f2-b2ef-d635e5f956b3?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d4dd91ca-5991-44f2-b2ef-d635e5f956b3?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/d4dd91ca-5991-44f2-b2ef-d635e5f956b3?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/d4dd91ca-5991-44f2-b2ef-d635e5f956b3?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                                    className="object-contain w-8 h-8 bg-lime-400 rounded-full aspect-square"
                                                />
                                            </div>
                                            <div className="flex gap-1 items-center self-stretch py-2 my-auto min-h-[32px]">
                                                <div className="flex shrink-0 self-stretch my-auto w-0.5 h-2 bg-white rounded-sm" />
                                                <div className="flex shrink-0 self-stretch my-auto w-0.5 h-3.5 bg-white rounded-sm" />
                                                <div className="flex shrink-0 self-stretch my-auto w-0.5 h-4 bg-white rounded-sm" />
                                                <div className="flex shrink-0 self-stretch my-auto w-0.5 h-3.5 bg-white rounded-sm" />
                                                <div className="flex shrink-0 self-stretch my-auto w-0.5 h-2.5 bg-white rounded-sm" />
                                                <div className="flex shrink-0 self-stretch my-auto w-0.5 h-2.5 bg-white rounded-sm" />
                                                <div className="flex shrink-0 self-stretch my-auto w-0.5 h-2.5 bg-white rounded-sm" />
                                                <div className="flex shrink-0 self-stretch my-auto w-0.5 h-3.5 bg-white rounded-sm" />
                                                <div className="flex shrink-0 self-stretch my-auto w-0.5 h-2.5 bg-white rounded-sm" />
                                                <div className="flex shrink-0 self-stretch my-auto w-0.5 h-4 bg-white rounded-sm" />
                                                <div className="flex shrink-0 self-stretch my-auto w-0.5 h-2.5 bg-white rounded-sm" />
                                            </div>
                                            <div className="self-stretch my-auto text-sm leading-none text-red-600">
                                                0:05
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex overflow-hidden flex-col px-3 py-2 w-full rounded-xl bg-zinc-900 max-md:max-w-full">
                        <div className="flex-1 shrink gap-2.5 self-stretch py-2.5 w-full text-sm text-zinc-400 max-md:max-w-full">
                            Hi Justin! Just wanted to see if you could help me out, i’ve seen you
                            in the studio with Sabrina lately and wanted to send you a few files
                            for your consideration. I Appreciate you!
                        </div>
                        <div className="flex flex-col justify-center items-start py-1 w-full max-md:max-w-full">
                            <div className="flex gap-1 items-center p-3 rounded-2xl bg-neutral-800">
                                <div className="flex gap-2.5 items-start self-stretch my-auto w-9">
                                    <img  alt=""  
                                        loading="lazy"
                                        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/bcba23ab-be95-48c3-90d2-886a2260bd29?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/bcba23ab-be95-48c3-90d2-886a2260bd29?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/bcba23ab-be95-48c3-90d2-886a2260bd29?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/bcba23ab-be95-48c3-90d2-886a2260bd29?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/bcba23ab-be95-48c3-90d2-886a2260bd29?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/bcba23ab-be95-48c3-90d2-886a2260bd29?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/bcba23ab-be95-48c3-90d2-886a2260bd29?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/bcba23ab-be95-48c3-90d2-886a2260bd29?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                        className="object-contain w-9 h-9 bg-lime-400 rounded-full aspect-square"
                                    />
                                </div>
                                <div className="flex relative flex-col self-stretch py-2.5 pr-2 pl-2.5 my-auto w-[120px]">
                                    <img  alt=""  
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/aa34de2b02702438fd5a8f8f63b99263c81db450bbb3093b62732f65094f2092?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                        className="object-contain z-0 max-w-full aspect-[34.48] w-[100px]"
                                    />
                                    <div className="flex absolute bottom-1 left-1 z-0 w-3 h-3 rounded-full bg-zinc-400 min-h-[12px]" />
                                </div>
                                <div className="gap-2.5 self-stretch my-auto text-sm whitespace-nowrap text-zinc-400">
                                    3:13
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2 items-center w-full max-md:max-w-full">
                            <div className="flex gap-1 items-center self-stretch my-auto">
                                <div className="flex gap-2.5 items-start self-stretch p-2 my-auto w-10">
                                    <img  alt=""  
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/eee8529ef94cc52cf8b2a10c926846ef66f381b7e2b58c5a4b7644cd576a0579?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                        className="object-contain w-6 aspect-square"
                                    />
                                </div>
                                <div className="flex gap-2.5 items-start self-stretch p-2 my-auto w-10 rounded">
                                    <img  alt=""  
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/6b84c6d795d86f619c1b3c19630461f0f6075e13f87b82e24a801134796b5e08?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                        className="object-contain w-6 aspect-square"
                                    />
                                </div>
                            </div>
                            <div className="flex items-start self-stretch p-0.5 my-auto">
                                <img  alt=""  
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/6b326cc3dc89ec7dad6c7544633a287ba5013434e6d70a3055ce9ab861f86f53?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                    className="object-contain w-0"
                                />
                            </div>
                            <div className="flex gap-1 items-start self-stretch my-auto">
                                <div className="flex gap-2.5 justify-center items-center p-2 w-10 rounded-lg">
                                    <img  alt=""  
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/373d5fe1b36a8fd81675bbb4b56d9eeebe18318d50f48d34bde94a6135660208?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                        className="object-contain self-stretch my-auto w-6 aspect-square"
                                    />
                                </div>
                                <div className="flex gap-2.5 items-start p-2 w-10 rounded">
                                    <img  alt=""  
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/5c0f5fa713157bf5047a922c38778a416e1b86c4edad324ba1d97d9a8138b057?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                        className="object-contain w-6 aspect-square"
                                    />
                                </div>
                            </div>
                            <div className="flex items-start self-stretch p-0.5 my-auto">
                                <img  alt=""  
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/6b326cc3dc89ec7dad6c7544633a287ba5013434e6d70a3055ce9ab861f86f53?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                    className="object-contain w-0"
                                />
                            </div>
                            <div className="flex flex-1 shrink gap-2.5 items-center self-stretch p-2 my-auto basis-0 min-w-[240px] max-md:max-w-full">
                                <img  alt=""  
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/9efad187f12b0e3d7ffe672302d5fd34c6dd4f1fb05363c3c73779a2288cb472?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                    className="object-contain self-stretch my-auto w-6 aspect-square"
                                />
                            </div>
                            <div className="flex gap-3 items-center self-stretch p-2 my-auto bg-lime-400 rounded">
                                <div className="flex gap-1 items-center self-stretch my-auto w-[19px]">
                                    <img  alt=""  
                                        loading="lazy"
                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/fe920fd7f145ac7f609376f3a9769ff89a98f893e6d25d2a1320c01f1fdda058?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                        className="object-contain self-stretch my-auto aspect-[1.06] w-[19px]"
                                    />
                                </div>
                                <img  alt=""  
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/0239824bb22a1c60b4d8a1f933858ac87400174ed8d15cd7598a1e9a5ea5ffd3?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                    className="object-contain shrink-0 self-stretch my-auto w-0"
                                />
                                <img  alt=""  
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/0769389dbb82b93c8534daf4ec0e4372f5e1a52a39d618a00d6596201fd81285?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                                    className="object-contain shrink-0 self-stretch my-auto w-3 aspect-[2]"
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>


        </React.Fragment>



    );
};

export default MessagesDetail;
