/* eslint-disable jsx-a11y/alt-text */
import Foryou from "components/foryou";
import Player from "components/player";
import WeeklyTop from "components/weekly-top";
import { Logo } from "icons";
import * as React from "react";



const HomeFeed = () => {


    return (

        <div className="bg-black container">

            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                <div className="flex flex-col w-[300px] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col px-6 py-2.5 mx-auto w-full bg-black max-md:px-5">
                        <div className="flex gap-5 justify-between pr-5 w-full">
                            <div className="mx-12">
                                <Logo className="flex flex-center justify-center items-center" />
                            </div>
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/8964aaabceffcc3470379f0ddc3fb5fb1cb24e25f857c2d0ab33c6bec4877bd6?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&"
                                className="shrink-0 my-auto w-6 aspect-square"
                            />
                        </div>
                        <div className="flex gap-2 px-4 py-3 mt-8 text-sm font-medium whitespace-nowrap rounded-lg bg-neutral-900 text-neutral-500">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/c52d745cb08ebe901e661de3da15c6c3ea5e47c08e1307aa5fd9d18932277af4?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&"
                                className="shrink-0 w-6 aspect-square"
                            />
                            <div className="my-auto">Search</div>
                        </div>
                        <div className="mt-5 text-sm font-medium text-zinc-600">
                            OVERVIEW
                        </div>
                        <div className="flex gap-5 justify-between px-6 py-3 mt-5 text-sm rounded-lg bg-neutral-800 max-md:px-5">
                            <div className="flex gap-2 my-auto font-semibold text-gray-300">
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/f73f24aa9aebf2ed3db31bfac3012e29f0b044ef212e314aa4ce0a4bce25dc56?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&"
                                    className="shrink-0 w-6 aspect-square"
                                />
                                <div className="w-[150px]">Contact Requests</div>
                            </div>
                            <div className="flex flex-col justify-center font-medium text-white whitespace-nowrap">
                                <div className="inline-flex items-center justify-center w-7 h-7 ms-2 text-xs font-semibold text-white bg-red-500 rounded-full">
                                    13
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col mt-5 ml-6 max-w-full text-sm font-semibold text-gray-300 whitespace-nowrap w-[110px] max-md:ml-2.5">
                            <div className="flex gap-2">
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/2a9529b4af89008c1a47eebdc7abc01797df8649894a8835df8cc388d2956b70?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&"
                                    className="shrink-0 w-6 aspect-square"
                                />
                                <div className="my-auto">Inbox</div>
                            </div>
                            <div className="flex gap-2 mt-9">
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/53d18a5776dd51057645bbae4f3efd2f03c74839bdf31923bce72bdf452962b3?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&"
                                    className="shrink-0 w-6 aspect-square"
                                />
                                <div className="my-auto">Activity</div>
                            </div>
                            <div className="flex gap-2 mt-9">
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/b9f6659aa78b87dced12b97ac2c88a042060a2367d8366329cb769f6682d3c83?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&"
                                    className="shrink-0 w-5 aspect-square"
                                />
                                <div>Agreements</div>
                            </div>
                            <div className="flex gap-2 mt-9">
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/6692ccd7e522b37999e807a61089e82206db983793d7bba7333909f2f6fd1e4d?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&"
                                    className="shrink-0 w-5 aspect-square"
                                />
                                <div>Licenses</div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center px-2 pb-4 mt-7 text-sm">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/ecb07b188b411c3ee3dae6fa080a02ca7daa2cdb7ddc6873e4752d3e6467ae7a?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&"
                                className="w-full border border-solid border-neutral-600 border-opacity-50 stroke-[1px] stroke-neutral-600 stroke-opacity-50"
                            />
                            <div className="mt-4 font-medium text-neutral-500">Library</div>
                            <div className="flex gap-2 self-start mt-8 ml-4 font-semibold text-gray-300 max-md:ml-2.5">
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/94f29450315a994f6a9022de7d849088ba9dfa65da57db996df1c3f36be00526?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&"
                                    className="shrink-0 w-5 aspect-square"
                                />
                                <div>My Samples</div>
                            </div>
                        </div>
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ff6e4afef5a5cbf3ab78e06c85777ee7818000fe3127842fc318dd6bd01d6dce?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&"
                            className="mt-3 w-full border border-solid border-neutral-600 border-opacity-50 stroke-[1px] stroke-neutral-600 stroke-opacity-50"
                        />
                        <div className="mt-4 text-sm font-medium text-neutral-500">
                            Collections
                        </div>
                        <div className="flex gap-2 mx-6 mt-9 text-sm font-semibold text-gray-300 max-md:mx-2.5">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/fcff61dc016200bd45fd6c70a814c5fb0635a1cdd83686b124bf61197b37ef8a?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&"
                                className="shrink-0 w-6 aspect-square"
                            />
                            <div className="my-auto">New Collection</div>
                        </div>
                        <div className="flex gap-2 mx-6 mt-9 text-sm font-semibold text-gray-300 whitespace-nowrap max-md:mx-2.5">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/14f1b12a88aad9a3b8fa1e00987200c5c24eb12e259266ad817e90f7cfa01e87?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&"
                                className="shrink-0 w-5 aspect-square"
                            />
                            <div>Likes</div>
                        </div>
                        <div className="flex gap-2 mx-6 mt-9 text-sm font-semibold text-gray-300 max-md:mx-2.5">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/aeb8f15321212a4daade561a7522a9d185ed808832ea78d5156f235e0624574e?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&"
                                className="shrink-0 w-5 aspect-square"
                            />
                            <div>Sweet R&B Loops</div>
                        </div>
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ff6e4afef5a5cbf3ab78e06c85777ee7818000fe3127842fc318dd6bd01d6dce?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&"
                            className="mt-7 w-full border border-solid border-neutral-600 border-opacity-50 stroke-[1px] stroke-neutral-600 stroke-opacity-50"
                        />
                        <div className="flex gap-4 mt-4">
                            <img
                                loading="lazy"
                                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/7003c6f17607eba23b5508de3e516b45611cc473e59bd0427a664f7fb7586024?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/7003c6f17607eba23b5508de3e516b45611cc473e59bd0427a664f7fb7586024?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/7003c6f17607eba23b5508de3e516b45611cc473e59bd0427a664f7fb7586024?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/7003c6f17607eba23b5508de3e516b45611cc473e59bd0427a664f7fb7586024?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/7003c6f17607eba23b5508de3e516b45611cc473e59bd0427a664f7fb7586024?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/7003c6f17607eba23b5508de3e516b45611cc473e59bd0427a664f7fb7586024?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/7003c6f17607eba23b5508de3e516b45611cc473e59bd0427a664f7fb7586024?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/7003c6f17607eba23b5508de3e516b45611cc473e59bd0427a664f7fb7586024?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&"
                                className="shrink-0 w-12 rounded-full border-2 border-blue-200 border-solid aspect-square"
                            />
                            <div className="flex flex-1 gap-2.5 pr-6 my-auto">
                                <div className="flex flex-col flex-1 justify-center">
                                    <div className="text-sm font-medium text-white">
                                        Raul Cardenas
                                    </div>
                                    <div className="mt-1 text-xs font-bold text-slate-500">
                                        @SoundBoyz
                                    </div>
                                </div>
                                <div className="shrink-0 px-2 my-auto w-5 h-4" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col ml-5 w-[83%] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col grow pb-16 max-md:max-w-full">
                        <div className="flex flex-col justify-center items-start px-5 py-2.5 text-sm font-medium blur-none bg-neutral-900 text-zinc-500 max-md:max-w-full">
                            <div className="flex gap-3">
                                <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/7c0f6967e39b2aa076b59d65f4ced8bbdb2f37e997b883c49635c04d121d173f?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&"
                                    className="shrink-0 w-5 border-2 border-solid aspect-square border-zinc-300 stroke-[2px] stroke-zinc-300"
                                />
                                <div>Type / for search and recents...</div>
                            </div>
                        </div>


                        {/* Start Content */}

                        <div className="">

                            <div className="max-md:max-w-full">
                                <div className="flex gap-5 max-md:flex-col max-md:gap-0 h-[391px]">
                                    <div className="flex  flex-col w-[77%] max-md:ml-0 max-md:w-full">
                                        <div className="flex  overflow-hidden relative flex-col grow justify-center  pt-20 min-h-[391px] max-md:max-w-full">
                                            <img
                                                loading="lazy"
                                                srcSet="https://s3-alpha-sig.figma.com/img/5250/6d0f/fb6c13d9b42f459f81a034bccd0cec56?Expires=1712534400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RXiiSqSU5ZrKiTFCmM7A9s9a3y67Bw1~iTRvnqIV8MQo9UjIKqy2FOHareKtGMNLE-01e5LJ1KC~L9C-ZUqjNwEGSyP15~XFP-S6Am8qhQaz06rJi6DU9Yu6utOrnDJH0GOy1oyG9GGw8miT1wWYQSdS5tR7pt1Xm8ywDm8qmYS~8PFJHE8ezJiGRQ2PrFQLGEtSyXQNYktSqLExFbIOQreNEOnLWCzX644AEirwrWRoK3e700Vs4om4Z6sYQvXz4Nb1usWH-FQbvImQ4sC-T35lPP9hcLBEha8KaVjBUDPwZeBMHDSZFJFi6aRw9zDYh~6dmsOzLQvd3WhvBAtfTg__"
                                                className="object-cover absolute inset-0 size-full img-g "
                                            />
                                            <div className="flex relative flex-col justify-center px-8 py-10 mt-20 max-md:px-5 max-md:mt-10 max-md:max-w-full">
                                                <div className="text-5xl font-medium tracking-tighter text-white max-md:max-w-full max-md:text-4xl">
                                                    Weekly Spotlight:
                                                </div>
                                                <div className="mt-1.5 text-2xl font-medium tracking-tighter text-white max-md:max-w-full">
                                                    Dreamy Guitar Loops Vol.1
                                                </div>
                                                <div className="flex gap-5 justify-between items-center mt-5 w-full max-md:flex-wrap max-md:max-w-full">
                                                    <button className="justify-center self-stretch px-5 py-3 text-sm font-medium text-black bg-lime-300 rounded-lg">
                                                        Learn More
                                                    </button>
                                                    <div className="shrink-0 self-stretch my-auto h-1.5 w-[62px]" />
                                                    <div className="flex gap-5 self-stretch my-auto">
                                                        <img
                                                            loading="lazy"
                                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f3ba0bda073ad0b2a776766683356b2f1199c342c42ccf8ec1a44cdaf1e02e2e?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&"
                                                            className="shrink-0 w-8 aspect-square"
                                                        />
                                                        <img
                                                            loading="lazy"
                                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/035c392f3c7015e8fca0a464de6c1299c0f32fc5ffbd8f5f766e28f6fe524c11?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&"
                                                            className="shrink-0 w-8 aspect-square"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <WeeklyTop />
                                </div>

                            </div>

                            <Foryou />

                            <div className="flex flex-col justify-center px-5 pt-2.5 w-auto">
                                <div className="self-start ml-2.5 text-4xl font-medium text-zinc-300">
                                    Producers
                                </div>
                                <div className="flex overflow-x-auto gap-3 mt-6 max-md:flex-wrap max-md:max-w-full">
                                    <div className="p-5 rounded-xl border border-solid bg-neutral-950 border-stone-900 max-md:max-w-full">
                                        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                                            <div className="flex flex-col w-[30%] max-md:ml-0 max-md:w-full">
                                                <div className="flex flex-col grow justify-center self-stretch text-xs font-medium max-md:mt-10 w-[250px]">
                                                    <img
                                                        loading="lazy"
                                                        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/d1953019dc01db5cb74c50492c3915cddcde71e6d5f6224b77f186d42a4e1b61?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/d1953019dc01db5cb74c50492c3915cddcde71e6d5f6224b77f186d42a4e1b61?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d1953019dc01db5cb74c50492c3915cddcde71e6d5f6224b77f186d42a4e1b61?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/d1953019dc01db5cb74c50492c3915cddcde71e6d5f6224b77f186d42a4e1b61?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/d1953019dc01db5cb74c50492c3915cddcde71e6d5f6224b77f186d42a4e1b61?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d1953019dc01db5cb74c50492c3915cddcde71e6d5f6224b77f186d42a4e1b61?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/d1953019dc01db5cb74c50492c3915cddcde71e6d5f6224b77f186d42a4e1b61?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/d1953019dc01db5cb74c50492c3915cddcde71e6d5f6224b77f186d42a4e1b61?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&"
                                                        className="max-w-full aspect-square w-[150px]"
                                                    />
                                                    <div className="mt-3 text-2xl text-white">
                                                        Dimelo Flow
                                                    </div>
                                                    <div className="mt-2 text-zinc-300">@dimeloflow</div>
                                                    <div className="flex gap-3 px-px mt-2 font-semibold">
                                                        <a href="/producer" className="justify-center px-3 py-1 rounded border border-gray-200 border-solid text-zinc-300">
                                                            View Profile
                                                        </a>
                                                        <div className="flex gap-2 px-3 py-1 text-black bg-lime-300 rounded">
                                                            <img
                                                                loading="lazy"
                                                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/18206e43f95c1b1f500091e3b2245b440991acf58d17a7b42382704d2a54d36a?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&"
                                                                className="shrink-0 w-4 aspect-square"
                                                            />
                                                            <div className="my-auto">Send Request</div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-4 text-sm font-semibold text-zinc-300">
                                                        Skills
                                                    </div>
                                                    <div className="flex flex-wrap gap-2 content-start mt-1 whitespace-nowrap text-zinc-300">
                                                        <div className="justify-center px-2 py-1.5 rounded bg-neutral-800">
                                                            Producer
                                                        </div>
                                                        <div className="justify-center px-2 py-1.5 rounded bg-neutral-800">
                                                            Songwriter
                                                        </div>
                                                        <div className="justify-center px-2 py-1.5 rounded bg-neutral-800">
                                                            Composer
                                                        </div>
                                                    </div>
                                                    <div className="mt-3 text-sm font-semibold text-zinc-300">
                                                        Genres
                                                    </div>
                                                    <div className="flex gap-2 mt-1 whitespace-nowrap text-zinc-300">
                                                        <div className="flex items-start px-2 py-1.5 rounded bg-neutral-800">
                                                            <span className="flex w-2 h-2 me-2 bg-[#FF8D24] mt-[5px] rounded-full"></span>

                                                            Reggaeton
                                                        </div>
                                                        <div className="flex items-start px-2 py-1.5 rounded bg-neutral-800">
                                                            <span className="flex w-2 h-2 me-2 bg-[#5DFF24] mt-[5px] rounded-full"></span>

                                                            R&B
                                                        </div>
                                                        <div className="flex items-start px-2 py-1.5 rounded bg-neutral-800">
                                                            <span className="flex w-2 h-2 me-2 bg-[#2461FF] mt-[5px] rounded-full"></span>

                                                            Bachata
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2 mt-2 whitespace-nowrap text-zinc-300">
                                                        <div className="flex items-start px-2 py-1.5 rounded bg-neutral-800">

                                                            <span className="flex w-2 h-2 me-2 bg-[#FF2466] mt-[5px] rounded-full"></span>

                                                            Hip-Hop
                                                        </div>
                                                        <div className="flex items-start px-2 py-1.5 rounded bg-neutral-800">
                                                            <span className="flex w-2 h-2 me-2 bg-[#24CAFF] mt-[5px] rounded-full"></span>

                                                            Pop
                                                        </div>
                                                    </div>
                                                    <div className="mt-3 text-sm font-semibold text-zinc-300">
                                                        Label
                                                    </div>
                                                    <div className="flex flex-wrap gap-2 content-start mt-1 text-zinc-300">
                                                        <div className="justify-center px-2 py-1.5 rounded bg-neutral-800">
                                                            Rich Music
                                                        </div>
                                                        <div className="justify-center px-2 py-1.5 rounded bg-neutral-800">
                                                            Sony Publishing
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col ml-5 w-[70%] max-md:ml-0 max-md:w-full">
                                                <div className="flex flex-col self-stretch py-px my-auto max-md:mt-10 max-md:max-w-full">
                                                    <div className="text-xl font-semibold text-white max-md:max-w-full">
                                                        Library
                                                    </div>
                                                    <div className="flex gap-4 py-2.5 pr-20 mt-2 text-base whitespace-nowrap max-md:flex-wrap max-md:pr-5">
                                                        <div className="text-white">Samples</div>
                                                        <div className="text-zinc-700">Instrumentals</div>
                                                        <div className="shrink-0 my-auto w-5 h-4" />
                                                    </div>
                                                    <div className="flex gap-5 justify-between py-2 mt-6 max-md:flex-wrap max-md:max-w-full">
                                                        <div className="text-xl font-medium text-zinc-500">
                                                            Results
                                                        </div>
                                                        <div className="my-auto text-sm text-neutral-400">
                                                            See All
                                                        </div>
                                                    </div>
                                                    <div className="w-[550px] flex gap-3 justify-between items-center py-2 pr-5 pl-2.5 mt-1 border-b border-solid border-zinc-800 max-md:flex-wrap max-md:max-w-full">
                                                        <div className="flex justify-center items-center self-stretch my-auto">
                                                            <div className="flex overflow-hidden relative flex-col justify-center items-center p-1 w-6 aspect-square">
                                                                <img
                                                                    loading="lazy"
                                                                    srcSet="https://assets.mvssive.net/play-button.png"
                                                                    className="object-cover absolute inset-0 size-full"
                                                                />
                                                                <img
                                                                    loading="lazy"
                                                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/57a40b20497e8e25d00bbde46805e68e0e9a232c9ccb44197217b9853a0c065a?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&"
                                                                    className="w-full aspect-square"
                                                                />
                                                            </div>
                                                        </div>
                                                        <img
                                                            loading="lazy"
                                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c198cb7a51a449c98effbc273b9e7a49894d76d9caae9bad5137c747cbcf4e3b?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&"
                                                            className="shrink-0 self-stretch my-auto w-5 aspect-square"
                                                        />
                                                        <div className="flex flex-col justify-center self-stretch whitespace-nowrap">
                                                            <div className="text-sm text-gray-300">
                                                                soundboyz_guitar_clean_120bpm_Dmin
                                                            </div>
                                                            <div className="mt-1 text-xs font-medium text-neutral-500">
                                                                SoundBoyz
                                                            </div>
                                                        </div>
                                                        <div className=" flex items-start self-stretch px-3 py-2.5 my-auto text-sm font-medium text-white whitespace-nowrap rounded border border-solid bg-neutral-900 border-neutral-800 max-md:pl-5">
                                                            <span className="flex w-2 h-2 me-3 bg-[#25BA00] mt-[5px] rounded-full"></span>
                                                            Available
                                                        </div>
                                                    </div>
                                                    <div className="w-[550px] flex gap-3 justify-between items-center py-2 pr-5 pl-2.5 border-b border-solid border-zinc-800 max-md:flex-wrap max-md:max-w-full">
                                                        <div className="flex justify-center items-center self-stretch my-auto">
                                                            <div className="flex overflow-hidden relative flex-col justify-center items-center p-1 w-6 aspect-square">
                                                                <img
                                                                    loading="lazy"
                                                                    srcSet="https://assets.mvssive.net/play-button.png"
                                                                    className="object-cover absolute inset-0 size-full"
                                                                />
                                                                <img
                                                                    loading="lazy"
                                                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/58195c73aa6273455aa340b8c8e0e1665d729ed26de04da7323591776704d0e5?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&"
                                                                    className="w-full aspect-square"
                                                                />
                                                            </div>
                                                        </div>
                                                        <img
                                                            loading="lazy"
                                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c198cb7a51a449c98effbc273b9e7a49894d76d9caae9bad5137c747cbcf4e3b?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&"
                                                            className="shrink-0 self-stretch my-auto w-5 aspect-square"
                                                        />
                                                        <div className="flex flex-col justify-center self-stretch whitespace-nowrap">
                                                            <div className="text-sm text-gray-300">
                                                                soundboyz_guitar_clean_120bpm_Dmin
                                                            </div>
                                                            <div className="mt-1 text-xs font-medium text-neutral-500">
                                                                SoundBoyz
                                                            </div>
                                                        </div>
                                                        <div className="flex items-start self-stretch px-3 py-2.5 my-auto text-sm font-medium text-white whitespace-nowrap rounded border border-solid bg-neutral-900 border-neutral-800 max-md:pl-5">
                                                            <span className="flex w-2 h-2 me-3 bg-[#25BA00] mt-[5px] rounded-full"></span>
                                                            Available
                                                        </div>
                                                    </div>
                                                    <div className="w-[550px] flex gap-3 justify-between items-center py-2 pr-5 pl-2.5 border-b border-solid border-zinc-800 max-md:flex-wrap max-md:max-w-full">
                                                        <div className="flex justify-center items-center self-stretch my-auto">
                                                            <div className="flex overflow-hidden relative flex-col justify-center items-center p-1 w-6 aspect-square">
                                                                <img
                                                                    loading="lazy"
                                                                    srcSet="https://assets.mvssive.net/play-button.png"
                                                                    className="object-cover absolute inset-0 size-full"
                                                                />
                                                                <img
                                                                    loading="lazy"
                                                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/351697a8157e7fd6e22e351567e21481736391f4057b5f34b1fd547836535482?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&"
                                                                    className="w-full aspect-square"
                                                                />
                                                            </div>
                                                        </div>
                                                        <img
                                                            loading="lazy"
                                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c198cb7a51a449c98effbc273b9e7a49894d76d9caae9bad5137c747cbcf4e3b?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&"
                                                            className="shrink-0 self-stretch my-auto w-5 aspect-square"
                                                        />
                                                        <div className="flex flex-col justify-center self-stretch whitespace-nowrap">
                                                            <div className="text-sm text-gray-300">
                                                                soundboyz_guitar_clean_120bpm_Dmin
                                                            </div>
                                                            <div className="mt-1 text-xs font-medium text-neutral-500">
                                                                SoundBoyz
                                                            </div>
                                                        </div>
                                                        <div className="flex items-start self-stretch px-3 py-2.5 my-auto text-sm font-medium text-white whitespace-nowrap rounded border border-solid bg-neutral-900 border-neutral-800 max-md:pl-5">
                                                            <span className="flex w-2 h-2 me-3 bg-[#25BA00] mt-[5px] rounded-full"></span>
                                                            Available
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-5 rounded-xl border border-solid bg-neutral-950 border-stone-900 max-md:max-w-full">
                                        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                                            <div className="flex flex-col w-[30%] max-md:ml-0 max-md:w-full">
                                                <div className="flex flex-col grow justify-center self-stretch text-xs font-medium max-md:mt-10 w-[250px]">
                                                    <img
                                                        loading="lazy"
                                                        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/d1953019dc01db5cb74c50492c3915cddcde71e6d5f6224b77f186d42a4e1b61?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/d1953019dc01db5cb74c50492c3915cddcde71e6d5f6224b77f186d42a4e1b61?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d1953019dc01db5cb74c50492c3915cddcde71e6d5f6224b77f186d42a4e1b61?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/d1953019dc01db5cb74c50492c3915cddcde71e6d5f6224b77f186d42a4e1b61?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/d1953019dc01db5cb74c50492c3915cddcde71e6d5f6224b77f186d42a4e1b61?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d1953019dc01db5cb74c50492c3915cddcde71e6d5f6224b77f186d42a4e1b61?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/d1953019dc01db5cb74c50492c3915cddcde71e6d5f6224b77f186d42a4e1b61?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/d1953019dc01db5cb74c50492c3915cddcde71e6d5f6224b77f186d42a4e1b61?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&"
                                                        className="max-w-full aspect-square w-[150px]"
                                                    />
                                                    <div className="mt-3 text-2xl text-white">
                                                        Dimelo Flow
                                                    </div>
                                                    <div className="mt-2 text-zinc-300">@dimeloflow</div>
                                                    <div className="flex gap-3 px-px mt-2 font-semibold">
                                                        <a href="/producer" className="justify-center px-3 py-1 rounded border border-gray-200 border-solid text-zinc-300">
                                                            View Profile
                                                        </a>
                                                        <div className="flex gap-2 px-3 py-1 text-black bg-lime-300 rounded">
                                                            <img
                                                                loading="lazy"
                                                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/18206e43f95c1b1f500091e3b2245b440991acf58d17a7b42382704d2a54d36a?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&"
                                                                className="shrink-0 w-4 aspect-square"
                                                            />
                                                            <div className="my-auto">Send Request</div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-4 text-sm font-semibold text-zinc-300">
                                                        Skills
                                                    </div>
                                                    <div className="flex flex-wrap gap-2 content-start mt-1 whitespace-nowrap text-zinc-300">
                                                        <div className="justify-center px-2 py-1.5 rounded bg-neutral-800">
                                                            Producer
                                                        </div>
                                                        <div className="justify-center px-2 py-1.5 rounded bg-neutral-800">
                                                            Songwriter
                                                        </div>
                                                        <div className="justify-center px-2 py-1.5 rounded bg-neutral-800">
                                                            Composer
                                                        </div>
                                                    </div>
                                                    <div className="mt-3 text-sm font-semibold text-zinc-300">
                                                        Genres
                                                    </div>
                                                    <div className="flex gap-2 mt-1 whitespace-nowrap text-zinc-300">
                                                        <div className="flex items-start px-2 py-1.5 rounded bg-neutral-800">
                                                            <span className="flex w-2 h-2 me-2 bg-[#FF8D24] mt-[5px] rounded-full"></span>

                                                            Reggaeton
                                                        </div>
                                                        <div className="flex items-start px-2 py-1.5 rounded bg-neutral-800">
                                                            <span className="flex w-2 h-2 me-2 bg-[#5DFF24] mt-[5px] rounded-full"></span>

                                                            R&B
                                                        </div>
                                                        <div className="flex items-start px-2 py-1.5 rounded bg-neutral-800">
                                                            <span className="flex w-2 h-2 me-2 bg-[#2461FF] mt-[5px] rounded-full"></span>

                                                            Bachata
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2 mt-2 whitespace-nowrap text-zinc-300">
                                                        <div className="flex items-start px-2 py-1.5 rounded bg-neutral-800">

                                                            <span className="flex w-2 h-2 me-2 bg-[#FF2466] mt-[5px] rounded-full"></span>

                                                            Hip-Hop
                                                        </div>
                                                        <div className="flex items-start px-2 py-1.5 rounded bg-neutral-800">
                                                            <span className="flex w-2 h-2 me-2 bg-[#24CAFF] mt-[5px] rounded-full"></span>

                                                            Pop
                                                        </div>
                                                    </div>
                                                    <div className="mt-3 text-sm font-semibold text-zinc-300">
                                                        Label
                                                    </div>
                                                    <div className="flex flex-wrap gap-2 content-start mt-1 text-zinc-300">
                                                        <div className="justify-center px-2 py-1.5 rounded bg-neutral-800">
                                                            Rich Music
                                                        </div>
                                                        <div className="justify-center px-2 py-1.5 rounded bg-neutral-800">
                                                            Sony Publishing
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col ml-5 w-[70%] max-md:ml-0 max-md:w-full">
                                                <div className="flex flex-col self-stretch py-px my-auto max-md:mt-10 max-md:max-w-full">
                                                    <div className="text-xl font-semibold text-white max-md:max-w-full">
                                                        Library
                                                    </div>
                                                    <div className="flex gap-4 py-2.5 pr-20 mt-2 text-base whitespace-nowrap max-md:flex-wrap max-md:pr-5">
                                                        <div className="text-white">Samples</div>
                                                        <div className="text-zinc-700">Instrumentals</div>
                                                        <div className="shrink-0 my-auto w-5 h-4" />
                                                    </div>
                                                    <div className="flex gap-5 justify-between py-2 mt-6 max-md:flex-wrap max-md:max-w-full">
                                                        <div className="text-xl font-medium text-zinc-500">
                                                            Results
                                                        </div>
                                                        <div className="my-auto text-sm text-neutral-400">
                                                            See All
                                                        </div>
                                                    </div>
                                                    <div className="w-[550px] flex gap-3 justify-between items-center py-2 pr-5 pl-2.5 mt-1 border-b border-solid border-zinc-800 max-md:flex-wrap max-md:max-w-full">
                                                        <div className="flex justify-center items-center self-stretch my-auto">
                                                            <div className="flex overflow-hidden relative flex-col justify-center items-center p-1 w-6 aspect-square">
                                                                <img
                                                                    loading="lazy"
                                                                    srcSet="https://assets.mvssive.net/play-button.png"
                                                                    className="object-cover absolute inset-0 size-full"
                                                                />
                                                                <img
                                                                    loading="lazy"
                                                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/57a40b20497e8e25d00bbde46805e68e0e9a232c9ccb44197217b9853a0c065a?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&"
                                                                    className="w-full aspect-square"
                                                                />
                                                            </div>
                                                        </div>
                                                        <img
                                                            loading="lazy"
                                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c198cb7a51a449c98effbc273b9e7a49894d76d9caae9bad5137c747cbcf4e3b?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&"
                                                            className="shrink-0 self-stretch my-auto w-5 aspect-square"
                                                        />
                                                        <div className="flex flex-col justify-center self-stretch whitespace-nowrap">
                                                            <div className="text-sm text-gray-300">
                                                                soundboyz_guitar_clean_120bpm_Dmin
                                                            </div>
                                                            <div className="mt-1 text-xs font-medium text-neutral-500">
                                                                SoundBoyz
                                                            </div>
                                                        </div>
                                                        <div className=" flex items-start self-stretch px-3 py-2.5 my-auto text-sm font-medium text-white whitespace-nowrap rounded border border-solid bg-neutral-900 border-neutral-800 max-md:pl-5">
                                                            <span className="flex w-2 h-2 me-3 bg-[#25BA00] mt-[5px] rounded-full"></span>
                                                            Available
                                                        </div>
                                                    </div>
                                                    <div className="w-[550px] flex gap-3 justify-between items-center py-2 pr-5 pl-2.5 border-b border-solid border-zinc-800 max-md:flex-wrap max-md:max-w-full">
                                                        <div className="flex justify-center items-center self-stretch my-auto">
                                                            <div className="flex overflow-hidden relative flex-col justify-center items-center p-1 w-6 aspect-square">
                                                                <img
                                                                    loading="lazy"
                                                                    srcSet="https://assets.mvssive.net/play-button.png"
                                                                    className="object-cover absolute inset-0 size-full"
                                                                />
                                                                <img
                                                                    loading="lazy"
                                                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/58195c73aa6273455aa340b8c8e0e1665d729ed26de04da7323591776704d0e5?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&"
                                                                    className="w-full aspect-square"
                                                                />
                                                            </div>
                                                        </div>
                                                        <img
                                                            loading="lazy"
                                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c198cb7a51a449c98effbc273b9e7a49894d76d9caae9bad5137c747cbcf4e3b?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&"
                                                            className="shrink-0 self-stretch my-auto w-5 aspect-square"
                                                        />
                                                        <div className="flex flex-col justify-center self-stretch whitespace-nowrap">
                                                            <div className="text-sm text-gray-300">
                                                                soundboyz_guitar_clean_120bpm_Dmin
                                                            </div>
                                                            <div className="mt-1 text-xs font-medium text-neutral-500">
                                                                SoundBoyz
                                                            </div>
                                                        </div>
                                                        <div className="flex items-start self-stretch px-3 py-2.5 my-auto text-sm font-medium text-white whitespace-nowrap rounded border border-solid bg-neutral-900 border-neutral-800 max-md:pl-5">
                                                            <span className="flex w-2 h-2 me-3 bg-[#25BA00] mt-[5px] rounded-full"></span>
                                                            Available
                                                        </div>
                                                    </div>
                                                    <div className="w-[550px] flex gap-3 justify-between items-center py-2 pr-5 pl-2.5 border-b border-solid border-zinc-800 max-md:flex-wrap max-md:max-w-full">
                                                        <div className="flex justify-center items-center self-stretch my-auto">
                                                            <div className="flex overflow-hidden relative flex-col justify-center items-center p-1 w-6 aspect-square">
                                                                <img
                                                                    loading="lazy"
                                                                    srcSet="https://assets.mvssive.net/play-button.png"
                                                                    className="object-cover absolute inset-0 size-full"
                                                                />
                                                                <img
                                                                    loading="lazy"
                                                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/351697a8157e7fd6e22e351567e21481736391f4057b5f34b1fd547836535482?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&"
                                                                    className="w-full aspect-square"
                                                                />
                                                            </div>
                                                        </div>
                                                        <img
                                                            loading="lazy"
                                                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c198cb7a51a449c98effbc273b9e7a49894d76d9caae9bad5137c747cbcf4e3b?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&"
                                                            className="shrink-0 self-stretch my-auto w-5 aspect-square"
                                                        />
                                                        <div className="flex flex-col justify-center self-stretch whitespace-nowrap">
                                                            <div className="text-sm text-gray-300">
                                                                soundboyz_guitar_clean_120bpm_Dmin
                                                            </div>
                                                            <div className="mt-1 text-xs font-medium text-neutral-500">
                                                                SoundBoyz
                                                            </div>
                                                        </div>
                                                        <div className="flex items-start self-stretch px-3 py-2.5 my-auto text-sm font-medium text-white whitespace-nowrap rounded border border-solid bg-neutral-900 border-neutral-800 max-md:pl-5">
                                                            <span className="flex w-2 h-2 me-3 bg-[#25BA00] mt-[5px] rounded-full"></span>
                                                            Available
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>


                            {/* Songwriters */}

                            <div className="flex flex-col justify-center px-5 pt-2.5 w-auto">
                                <div className="self-start ml-2.5 text-4xl font-medium text-zinc-300">
                                    Songwriters
                                </div>
                                <div className="flex overflow-x-auto gap-3 mt-6 max-md:flex-wrap">
                                    <div className="p-5 rounded-xl border border-solid bg-neutral-950 border-stone-900 max-md:max-w-full">
                                        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                                            <div className=" w-[250px] max-md:ml-0 max-md:w-full">
                                                <div className="flex flex-col grow justify-center pt-2.5 text-xs font-medium max-md:mt-10">
                                                    <img
                                                        loading="lazy"
                                                        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/56c4de2532c6445f460e4e518405e8a399258d7f60af5049e5a158c5111323b6?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/56c4de2532c6445f460e4e518405e8a399258d7f60af5049e5a158c5111323b6?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/56c4de2532c6445f460e4e518405e8a399258d7f60af5049e5a158c5111323b6?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/56c4de2532c6445f460e4e518405e8a399258d7f60af5049e5a158c5111323b6?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/56c4de2532c6445f460e4e518405e8a399258d7f60af5049e5a158c5111323b6?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/56c4de2532c6445f460e4e518405e8a399258d7f60af5049e5a158c5111323b6?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/56c4de2532c6445f460e4e518405e8a399258d7f60af5049e5a158c5111323b6?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/56c4de2532c6445f460e4e518405e8a399258d7f60af5049e5a158c5111323b6?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&"
                                                        className="ml-2.5 max-w-full rounded-full border-2 border-solid aspect-square border-stone-300 w-[150px]"
                                                    />
                                                    <div className="mt-6 text-2xl text-white">
                                                        Julia Michaels
                                                    </div>
                                                    <div className="mt-2 text-zinc-300">@thisisjulia</div>
                                                    <div className="flex gap-3 px-px mt-2 font-semibold">
                                                        <div className="justify-center px-3 py-1 rounded border border-gray-200 border-solid text-zinc-300">
                                                            View Profile
                                                        </div>
                                                        <div className="flex gap-2 px-3 py-1 text-black bg-lime-300 rounded">
                                                            <img
                                                                loading="lazy"
                                                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d9fa150949072bb671a91573274a3bf4f580c851c7959509584a8800d90a4c35?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&"
                                                                className="shrink-0 w-4 aspect-square"
                                                            />
                                                            <div className="my-auto">Send Request</div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-4 text-sm font-semibold text-zinc-300">
                                                        Skills
                                                    </div>
                                                    <div className="flex flex-wrap gap-2 content-start mt-1 whitespace-nowrap text-zinc-300">
                                                        <div className="justify-center px-2 py-1.5 rounded bg-neutral-800">
                                                            Producer
                                                        </div>
                                                        <div className="justify-center px-2 py-1.5 rounded bg-neutral-800">
                                                            Songwriter
                                                        </div>
                                                        <div className="justify-center px-2 py-1.5 rounded bg-neutral-800">
                                                            Composer
                                                        </div>
                                                    </div>
                                                    <div className="mt-3 text-sm font-semibold text-zinc-300">
                                                        Genres
                                                    </div>
                                                    <div className="flex gap-2 mt-1 whitespace-nowrap text-zinc-300">
                                                        <div className="flex items-start px-2 py-1.5 rounded bg-neutral-800">
                                                            <span className="flex w-2 h-2 me-2 bg-[#FF8D24] mt-[5px] rounded-full"></span>

                                                            Reggaeton
                                                        </div>
                                                        <div className="flex items-start px-2 py-1.5 rounded bg-neutral-800">
                                                            <span className="flex w-2 h-2 me-2 bg-[#5DFF24] mt-[5px] rounded-full"></span>

                                                            R&B
                                                        </div>
                                                        <div className="flex items-start px-2 py-1.5 rounded bg-neutral-800">
                                                            <span className="flex w-2 h-2 me-2 bg-[#2461FF] mt-[5px] rounded-full"></span>

                                                            Bachata
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2 mt-2 whitespace-nowrap text-zinc-300">
                                                        <div className="flex items-start px-2 py-1.5 rounded bg-neutral-800">

                                                            <span className="flex w-2 h-2 me-2 bg-[#FF2466] mt-[5px] rounded-full"></span>

                                                            Hip-Hop
                                                        </div>
                                                        <div className="flex items-start px-2 py-1.5 rounded bg-neutral-800">
                                                            <span className="flex w-2 h-2 me-2 bg-[#24CAFF] mt-[5px] rounded-full"></span>

                                                            Pop
                                                        </div>
                                                    </div>
                                                    <div className="mt-4 text-sm font-semibold text-zinc-300">
                                                        Label
                                                    </div>
                                                    <div className="flex flex-wrap gap-2 content-start mt-1 text-zinc-300">
                                                        <div className="justify-center px-2 py-1.5 rounded bg-neutral-800">
                                                            Rich Music
                                                        </div>
                                                        <div className="justify-center px-2 py-1.5 rounded bg-neutral-800">
                                                            Sony Publishing
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col ml-5  max-md:ml-0  w-[350px]">
                                                <div className="flex flex-col grow self-stretch py-px max-md:mt-10">
                                                    <div className="text-xl font-semibold text-white">
                                                        Library
                                                    </div>
                                                    <div className="mt-5 text-base text-zinc-300">
                                                        Credits
                                                    </div>
                                                    <div className="flex gap-5 justify-between py-2.5 mt-8">
                                                        <div className="text-base font-medium text-zinc-500">
                                                            Results
                                                        </div>
                                                        <div className="text-sm text-neutral-400">
                                                            See All
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-3 p-2.5 mt-1 text-xs font-medium text-white rounded bg-neutral-900 max-md:pr-5">
                                                        <img
                                                            loading="lazy"
                                                            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/12bbc8fb1ecbc1af798f3f068fc2ff94022ea1f971789f7cb7eab92c914869f8?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/12bbc8fb1ecbc1af798f3f068fc2ff94022ea1f971789f7cb7eab92c914869f8?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/12bbc8fb1ecbc1af798f3f068fc2ff94022ea1f971789f7cb7eab92c914869f8?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/12bbc8fb1ecbc1af798f3f068fc2ff94022ea1f971789f7cb7eab92c914869f8?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/12bbc8fb1ecbc1af798f3f068fc2ff94022ea1f971789f7cb7eab92c914869f8?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/12bbc8fb1ecbc1af798f3f068fc2ff94022ea1f971789f7cb7eab92c914869f8?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/12bbc8fb1ecbc1af798f3f068fc2ff94022ea1f971789f7cb7eab92c914869f8?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/12bbc8fb1ecbc1af798f3f068fc2ff94022ea1f971789f7cb7eab92c914869f8?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&"
                                                            className="shrink-0 aspect-square w-[65px] h-[65px]"
                                                        />
                                                        <div className="flex flex-col my-auto">
                                                            <div className="text-sm font-semibold">
                                                                The Academy
                                                            </div>
                                                            <div className="mt-1">
                                                                Dimelo Flow, Sech, Lenny Tavarez, Justin Quilez,
                                                                Feid
                                                            </div>
                                                            <div className="mt-1">Oct 12, 2021</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-3 p-2.5 mt-1 text-xs font-medium text-white rounded border border-solid bg-neutral-900 border-neutral-700 max-md:pr-5">
                                                        <img
                                                            loading="lazy"
                                                            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/b26de97aeb2b32396845b647a62c98d0592e285f7b711df3f101d94240bba5db?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/b26de97aeb2b32396845b647a62c98d0592e285f7b711df3f101d94240bba5db?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/b26de97aeb2b32396845b647a62c98d0592e285f7b711df3f101d94240bba5db?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/b26de97aeb2b32396845b647a62c98d0592e285f7b711df3f101d94240bba5db?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/b26de97aeb2b32396845b647a62c98d0592e285f7b711df3f101d94240bba5db?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/b26de97aeb2b32396845b647a62c98d0592e285f7b711df3f101d94240bba5db?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/b26de97aeb2b32396845b647a62c98d0592e285f7b711df3f101d94240bba5db?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/b26de97aeb2b32396845b647a62c98d0592e285f7b711df3f101d94240bba5db?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&"
                                                            className="shrink-0 aspect-square w-[65px] h-[65px]"
                                                        />
                                                        <div className="flex flex-col my-auto">
                                                            <div className="text-sm font-semibold">
                                                                The Academy
                                                            </div>
                                                            <div className="mt-1">
                                                                Dimelo Flow, Sech, Lenny Tavarez, Justin Quilez,
                                                                Feid
                                                            </div>
                                                            <div className="mt-1">Oct 12, 2021</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-3 p-2.5 mt-1 text-xs font-medium text-white rounded bg-neutral-900 max-md:pr-5">
                                                        <img
                                                            loading="lazy"
                                                            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/41fb6f35452739345cc3a31969d15a95fad3b5417ff929dd96e3d30aaeaa22e2?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/41fb6f35452739345cc3a31969d15a95fad3b5417ff929dd96e3d30aaeaa22e2?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/41fb6f35452739345cc3a31969d15a95fad3b5417ff929dd96e3d30aaeaa22e2?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/41fb6f35452739345cc3a31969d15a95fad3b5417ff929dd96e3d30aaeaa22e2?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/41fb6f35452739345cc3a31969d15a95fad3b5417ff929dd96e3d30aaeaa22e2?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/41fb6f35452739345cc3a31969d15a95fad3b5417ff929dd96e3d30aaeaa22e2?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/41fb6f35452739345cc3a31969d15a95fad3b5417ff929dd96e3d30aaeaa22e2?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/41fb6f35452739345cc3a31969d15a95fad3b5417ff929dd96e3d30aaeaa22e2?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&"
                                                            className="shrink-0 aspect-square w-[65px] h-[65px]"
                                                        />
                                                        <div className="flex flex-col my-auto">
                                                            <div className="text-sm font-semibold">
                                                                The Academy
                                                            </div>
                                                            <div className="mt-1">
                                                                Dimelo Flow, Sech, Lenny Tavarez, Justin Quilez,
                                                                Feid
                                                            </div>
                                                            <div className="mt-1">Oct 12, 2021</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-3 p-2.5 mt-1 text-xs font-medium text-white rounded bg-neutral-900 max-md:pr-5">
                                                        <img
                                                            loading="lazy"
                                                            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/e41dd938a227c24af558bfde1262e2e188cee180488171127e4100e4960f1eb1?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/e41dd938a227c24af558bfde1262e2e188cee180488171127e4100e4960f1eb1?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e41dd938a227c24af558bfde1262e2e188cee180488171127e4100e4960f1eb1?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/e41dd938a227c24af558bfde1262e2e188cee180488171127e4100e4960f1eb1?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/e41dd938a227c24af558bfde1262e2e188cee180488171127e4100e4960f1eb1?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e41dd938a227c24af558bfde1262e2e188cee180488171127e4100e4960f1eb1?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/e41dd938a227c24af558bfde1262e2e188cee180488171127e4100e4960f1eb1?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/e41dd938a227c24af558bfde1262e2e188cee180488171127e4100e4960f1eb1?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&"
                                                            className="shrink-0 aspect-square w-[65px] h-[65px]"
                                                        />
                                                        <div className="flex flex-col my-auto">
                                                            <div className="text-sm font-semibold">
                                                                The Academy
                                                            </div>
                                                            <div className="mt-1">
                                                                Dimelo Flow, Sech, Lenny Tavarez, Justin Quilez,
                                                                Feid
                                                            </div>
                                                            <div className="mt-1">Oct 12, 2021</div>
                                                        </div>
                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-5 rounded-xl border border-solid bg-neutral-950 border-stone-900 max-md:max-w-full">
                                        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                                            <div className=" w-[250px] max-md:ml-0 max-md:w-full">
                                                <div className="flex flex-col grow justify-center pt-2.5 text-xs font-medium max-md:mt-10">
                                                    <img
                                                        loading="lazy"
                                                        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/56c4de2532c6445f460e4e518405e8a399258d7f60af5049e5a158c5111323b6?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/56c4de2532c6445f460e4e518405e8a399258d7f60af5049e5a158c5111323b6?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/56c4de2532c6445f460e4e518405e8a399258d7f60af5049e5a158c5111323b6?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/56c4de2532c6445f460e4e518405e8a399258d7f60af5049e5a158c5111323b6?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/56c4de2532c6445f460e4e518405e8a399258d7f60af5049e5a158c5111323b6?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/56c4de2532c6445f460e4e518405e8a399258d7f60af5049e5a158c5111323b6?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/56c4de2532c6445f460e4e518405e8a399258d7f60af5049e5a158c5111323b6?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/56c4de2532c6445f460e4e518405e8a399258d7f60af5049e5a158c5111323b6?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&"
                                                        className="ml-2.5 max-w-full rounded-full border-2 border-solid aspect-square border-stone-300 w-[150px]"
                                                    />
                                                    <div className="mt-6 text-2xl text-white">
                                                        Julia Michaels
                                                    </div>
                                                    <div className="mt-2 text-zinc-300">@thisisjulia</div>
                                                    <div className="flex gap-3 px-px mt-2 font-semibold">
                                                        <div className="justify-center px-3 py-1 rounded border border-gray-200 border-solid text-zinc-300">
                                                            View Profile
                                                        </div>
                                                        <div className="flex gap-2 px-3 py-1 text-black bg-lime-300 rounded">
                                                            <img
                                                                loading="lazy"
                                                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/d9fa150949072bb671a91573274a3bf4f580c851c7959509584a8800d90a4c35?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&"
                                                                className="shrink-0 w-4 aspect-square"
                                                            />
                                                            <div className="my-auto">Send Request</div>
                                                        </div>
                                                    </div>
                                                    <div className="mt-4 text-sm font-semibold text-zinc-300">
                                                        Skills
                                                    </div>
                                                    <div className="flex flex-wrap gap-2 content-start mt-1 whitespace-nowrap text-zinc-300">
                                                        <div className="justify-center px-2 py-1.5 rounded bg-neutral-800">
                                                            Producer
                                                        </div>
                                                        <div className="justify-center px-2 py-1.5 rounded bg-neutral-800">
                                                            Songwriter
                                                        </div>
                                                        <div className="justify-center px-2 py-1.5 rounded bg-neutral-800">
                                                            Composer
                                                        </div>
                                                    </div>
                                                    <div className="mt-3 text-sm font-semibold text-zinc-300">
                                                        Genres
                                                    </div>
                                                    <div className="flex gap-2 mt-1 whitespace-nowrap text-zinc-300">
                                                        <div className="flex items-start px-2 py-1.5 rounded bg-neutral-800">
                                                            <span className="flex w-2 h-2 me-2 bg-[#FF8D24] mt-[5px] rounded-full"></span>

                                                            Reggaeton
                                                        </div>
                                                        <div className="flex items-start px-2 py-1.5 rounded bg-neutral-800">
                                                            <span className="flex w-2 h-2 me-2 bg-[#5DFF24] mt-[5px] rounded-full"></span>

                                                            R&B
                                                        </div>
                                                        <div className="flex items-start px-2 py-1.5 rounded bg-neutral-800">
                                                            <span className="flex w-2 h-2 me-2 bg-[#2461FF] mt-[5px] rounded-full"></span>

                                                            Bachata
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2 mt-2 whitespace-nowrap text-zinc-300">
                                                        <div className="flex items-start px-2 py-1.5 rounded bg-neutral-800">

                                                            <span className="flex w-2 h-2 me-2 bg-[#FF2466] mt-[5px] rounded-full"></span>

                                                            Hip-Hop
                                                        </div>
                                                        <div className="flex items-start px-2 py-1.5 rounded bg-neutral-800">
                                                            <span className="flex w-2 h-2 me-2 bg-[#24CAFF] mt-[5px] rounded-full"></span>

                                                            Pop
                                                        </div>
                                                    </div>
                                                    <div className="mt-4 text-sm font-semibold text-zinc-300">
                                                        Label
                                                    </div>
                                                    <div className="flex flex-wrap gap-2 content-start mt-1 text-zinc-300">
                                                        <div className="justify-center px-2 py-1.5 rounded bg-neutral-800">
                                                            Rich Music
                                                        </div>
                                                        <div className="justify-center px-2 py-1.5 rounded bg-neutral-800">
                                                            Sony Publishing
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col ml-5  max-md:ml-0  w-[350px]">
                                                <div className="flex flex-col grow self-stretch py-px max-md:mt-10">
                                                    <div className="text-xl font-semibold text-white">
                                                        Library
                                                    </div>
                                                    <div className="mt-5 text-base text-zinc-300">
                                                        Credits
                                                    </div>
                                                    <div className="flex gap-5 justify-between py-2.5 mt-8">
                                                        <div className="text-base font-medium text-zinc-500">
                                                            Results
                                                        </div>
                                                        <div className="text-sm text-neutral-400">
                                                            See All
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-3 p-2.5 mt-1 text-xs font-medium text-white rounded bg-neutral-900 max-md:pr-5">
                                                        <img
                                                            loading="lazy"
                                                            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/12bbc8fb1ecbc1af798f3f068fc2ff94022ea1f971789f7cb7eab92c914869f8?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/12bbc8fb1ecbc1af798f3f068fc2ff94022ea1f971789f7cb7eab92c914869f8?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/12bbc8fb1ecbc1af798f3f068fc2ff94022ea1f971789f7cb7eab92c914869f8?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/12bbc8fb1ecbc1af798f3f068fc2ff94022ea1f971789f7cb7eab92c914869f8?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/12bbc8fb1ecbc1af798f3f068fc2ff94022ea1f971789f7cb7eab92c914869f8?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/12bbc8fb1ecbc1af798f3f068fc2ff94022ea1f971789f7cb7eab92c914869f8?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/12bbc8fb1ecbc1af798f3f068fc2ff94022ea1f971789f7cb7eab92c914869f8?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/12bbc8fb1ecbc1af798f3f068fc2ff94022ea1f971789f7cb7eab92c914869f8?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&"
                                                            className="shrink-0 aspect-square w-[65px] h-[65px]"
                                                        />
                                                        <div className="flex flex-col my-auto">
                                                            <div className="text-sm font-semibold">
                                                                The Academy
                                                            </div>
                                                            <div className="mt-1">
                                                                Dimelo Flow, Sech, Lenny Tavarez, Justin Quilez,
                                                                Feid
                                                            </div>
                                                            <div className="mt-1">Oct 12, 2021</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-3 p-2.5 mt-1 text-xs font-medium text-white rounded border border-solid bg-neutral-900 border-neutral-700 max-md:pr-5">
                                                        <img
                                                            loading="lazy"
                                                            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/b26de97aeb2b32396845b647a62c98d0592e285f7b711df3f101d94240bba5db?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/b26de97aeb2b32396845b647a62c98d0592e285f7b711df3f101d94240bba5db?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/b26de97aeb2b32396845b647a62c98d0592e285f7b711df3f101d94240bba5db?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/b26de97aeb2b32396845b647a62c98d0592e285f7b711df3f101d94240bba5db?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/b26de97aeb2b32396845b647a62c98d0592e285f7b711df3f101d94240bba5db?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/b26de97aeb2b32396845b647a62c98d0592e285f7b711df3f101d94240bba5db?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/b26de97aeb2b32396845b647a62c98d0592e285f7b711df3f101d94240bba5db?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/b26de97aeb2b32396845b647a62c98d0592e285f7b711df3f101d94240bba5db?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&"
                                                            className="shrink-0 aspect-square w-[65px] h-[65px]"
                                                        />
                                                        <div className="flex flex-col my-auto">
                                                            <div className="text-sm font-semibold">
                                                                The Academy
                                                            </div>
                                                            <div className="mt-1">
                                                                Dimelo Flow, Sech, Lenny Tavarez, Justin Quilez,
                                                                Feid
                                                            </div>
                                                            <div className="mt-1">Oct 12, 2021</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-3 p-2.5 mt-1 text-xs font-medium text-white rounded bg-neutral-900 max-md:pr-5">
                                                        <img
                                                            loading="lazy"
                                                            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/41fb6f35452739345cc3a31969d15a95fad3b5417ff929dd96e3d30aaeaa22e2?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/41fb6f35452739345cc3a31969d15a95fad3b5417ff929dd96e3d30aaeaa22e2?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/41fb6f35452739345cc3a31969d15a95fad3b5417ff929dd96e3d30aaeaa22e2?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/41fb6f35452739345cc3a31969d15a95fad3b5417ff929dd96e3d30aaeaa22e2?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/41fb6f35452739345cc3a31969d15a95fad3b5417ff929dd96e3d30aaeaa22e2?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/41fb6f35452739345cc3a31969d15a95fad3b5417ff929dd96e3d30aaeaa22e2?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/41fb6f35452739345cc3a31969d15a95fad3b5417ff929dd96e3d30aaeaa22e2?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/41fb6f35452739345cc3a31969d15a95fad3b5417ff929dd96e3d30aaeaa22e2?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&"
                                                            className="shrink-0 aspect-square w-[65px] h-[65px]"
                                                        />
                                                        <div className="flex flex-col my-auto">
                                                            <div className="text-sm font-semibold">
                                                                The Academy
                                                            </div>
                                                            <div className="mt-1">
                                                                Dimelo Flow, Sech, Lenny Tavarez, Justin Quilez,
                                                                Feid
                                                            </div>
                                                            <div className="mt-1">Oct 12, 2021</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-3 p-2.5 mt-1 text-xs font-medium text-white rounded bg-neutral-900 max-md:pr-5">
                                                        <img
                                                            loading="lazy"
                                                            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/e41dd938a227c24af558bfde1262e2e188cee180488171127e4100e4960f1eb1?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/e41dd938a227c24af558bfde1262e2e188cee180488171127e4100e4960f1eb1?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e41dd938a227c24af558bfde1262e2e188cee180488171127e4100e4960f1eb1?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/e41dd938a227c24af558bfde1262e2e188cee180488171127e4100e4960f1eb1?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/e41dd938a227c24af558bfde1262e2e188cee180488171127e4100e4960f1eb1?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e41dd938a227c24af558bfde1262e2e188cee180488171127e4100e4960f1eb1?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/e41dd938a227c24af558bfde1262e2e188cee180488171127e4100e4960f1eb1?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/e41dd938a227c24af558bfde1262e2e188cee180488171127e4100e4960f1eb1?apiKey=eec5a6bf944f4080abff3098ad4bcfe9&"
                                                            className="shrink-0 aspect-square w-[65px] h-[65px]"
                                                        />
                                                        <div className="flex flex-col my-auto">
                                                            <div className="text-sm font-semibold">
                                                                The Academy
                                                            </div>
                                                            <div className="mt-1">
                                                                Dimelo Flow, Sech, Lenny Tavarez, Justin Quilez,
                                                                Feid
                                                            </div>
                                                            <div className="mt-1">Oct 12, 2021</div>
                                                        </div>
                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div>


                        </div>

                        <Player/>

                        {/* End Content */}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeFeed;


