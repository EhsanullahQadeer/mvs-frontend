/* eslint-disable jsx-a11y/alt-text */

import { Logo } from "icons";
import * as React from "react";



const Songwrtier = () => {


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

                        <div className="px-5 py-10 w-[1080px]">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col w-[19%] max-md:ml-0 max-md:w-full">
          <img
            loading="lazy"
            srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/3e2b7b1bee1da6b10ef93430a11f940dfafc11b26628e9b49e0df191656064d7?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/3e2b7b1bee1da6b10ef93430a11f940dfafc11b26628e9b49e0df191656064d7?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/3e2b7b1bee1da6b10ef93430a11f940dfafc11b26628e9b49e0df191656064d7?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/3e2b7b1bee1da6b10ef93430a11f940dfafc11b26628e9b49e0df191656064d7?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/3e2b7b1bee1da6b10ef93430a11f940dfafc11b26628e9b49e0df191656064d7?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/3e2b7b1bee1da6b10ef93430a11f940dfafc11b26628e9b49e0df191656064d7?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/3e2b7b1bee1da6b10ef93430a11f940dfafc11b26628e9b49e0df191656064d7?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/3e2b7b1bee1da6b10ef93430a11f940dfafc11b26628e9b49e0df191656064d7?apiKey=dc17e74fd8f04620bba968dc4f90b76e&"
            className="shrink-0 self-stretch my-auto max-w-full rounded-full border-2 border-solid aspect-square border-stone-300 w-[200px] max-md:mt-10"
          />
        </div>
        <div className="flex flex-col ml-5 w-[81%] max-md:ml-0 max-md:w-full">
          <div className="grow self-stretch max-md:mt-10 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col w-2/5 max-md:ml-0 max-md:w-full">
                <div className="flex flex-col self-stretch my-auto text-sm max-md:mt-10">
                  <div className="text-4xl font-medium text-white">
                    Julia Michaels
                  </div>
                  <div className="mt-2 text-zinc-300">@dimeloflow</div>
                  <div className="mt-4 text-stone-300">
                    Jorge Valdés Vázquez, better known as DJ Flow or Dímelo
                    Flow, is a Panamanian DJ and producer based in the United
                    States.f
                  </div>
                  <div className="flex gap-1.5 mt-3 text-xs text-white">
                    <img
                      loading="lazy"
                      srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/c62f774853916eeaae55fb57c366c9755afec6c1452d653d86873bfd835875aa?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/c62f774853916eeaae55fb57c366c9755afec6c1452d653d86873bfd835875aa?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/c62f774853916eeaae55fb57c366c9755afec6c1452d653d86873bfd835875aa?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/c62f774853916eeaae55fb57c366c9755afec6c1452d653d86873bfd835875aa?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/c62f774853916eeaae55fb57c366c9755afec6c1452d653d86873bfd835875aa?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/c62f774853916eeaae55fb57c366c9755afec6c1452d653d86873bfd835875aa?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/c62f774853916eeaae55fb57c366c9755afec6c1452d653d86873bfd835875aa?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/c62f774853916eeaae55fb57c366c9755afec6c1452d653d86873bfd835875aa?apiKey=dc17e74fd8f04620bba968dc4f90b76e&"
                      className="shrink-0 aspect-[2.78] w-[77px]"
                    />
                    <div className="my-auto">
                      Followed By{" "}
                      <span className="font-semibold">
                        Bad Bunny, Young Miko, Archangel{" "}
                      </span>
                      and 10 others
                    </div>
                  </div>
                  <div className="flex gap-3 mt-3 font-semibold">
                    <div className="flex gap-2 px-4 py-2.5 text-black whitespace-nowrap bg-lime-300 rounded-lg">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/2d2bcc1ed223d3ba877e701515559fc945c5a2363a12d629e2a32fdd67b466e2?apiKey=dc17e74fd8f04620bba968dc4f90b76e&"
                        className="shrink-0 w-5 aspect-square"
                      />
                      <div className="my-auto">Share</div>
                    </div>
                    <div className="flex gap-2 px-4 py-2.5 rounded-lg border-2 border-gray-200 border-solid text-zinc-300">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/a7f38a854768b1e7c25fa08a2dda3fd24481ec78b5add6a827fcdf29589f08a1?apiKey=dc17e74fd8f04620bba968dc4f90b76e&"
                        className="shrink-0 w-5 aspect-square"
                      />
                      <div className="my-auto">Send Request</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col ml-5 w-3/5 max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow self-stretch pb-12 text-xs font-medium text-stone-300 max-md:mt-10 max-md:max-w-full">
                  <div className="text-sm font-semibold text-zinc-300 max-md:max-w-full">
                    COLLABORATORS
                  </div>
                  <div className="flex flex-wrap gap-2 content-start pr-1.5 mt-2">
                    <div className="justify-center px-3 py-2.5 rounded-lg bg-neutral-900">
                      Justin Quiles
                    </div>
                    <div className="justify-center px-3 py-2.5 rounded-lg bg-neutral-900">
                      Daddy Yankee
                    </div>
                    <div className="justify-center px-3 py-2.5 whitespace-nowrap rounded-lg bg-neutral-900">
                      Sech
                    </div>
                    <div className="justify-center px-3 py-2.5 whitespace-nowrap rounded-lg bg-neutral-900">
                      Arcangel
                    </div>
                    <div className="justify-center px-3 py-2.5 rounded-lg bg-neutral-900">
                      Rauw Alejandro
                    </div>
                  </div>
                  <div className="mt-3 text-sm font-semibold text-zinc-300 max-md:max-w-full">
                    GENRES
                  </div>
                  <div className="flex gap-2 mt-2 whitespace-nowrap max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
                    <div className="justify-center items-start px-3 py-2.5 rounded-lg bg-neutral-900 max-md:pl-5">
                      Reggaeton
                    </div>
                    <div className="justify-center items-start px-3 py-2.5 rounded-lg bg-neutral-900 max-md:pl-5">
                      R&B
                    </div>
                    <div className="justify-center items-start px-3 py-2.5 rounded-lg bg-neutral-900 max-md:pl-5">
                      Hip-Hop
                    </div>
                    <div className="justify-center items-start px-3 py-2.5 rounded-lg bg-neutral-900 max-md:pl-5">
                      Bachata
                    </div>
                    <div className="justify-center items-start px-3 py-2.5 rounded-lg bg-neutral-900 max-md:pl-5">
                      Pop
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2 max-w-full whitespace-nowrap w-[179px]">
                    <div className="justify-center items-start px-3 py-2.5 rounded-lg bg-neutral-900 max-md:pl-5">
                      Salsa
                    </div>
                    <div className="justify-center items-start px-3 py-2.5 rounded-lg bg-neutral-900 max-md:pl-5">
                      Mambo
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div className="flex flex-col self-stretch px-5">
      <div className="text-xl font-medium text-neutral-300 max-md:max-w-full">
        My Credits
      </div>
      <div className="mt-2 w-[1080px]">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0">
          <div className="flex flex-col  max-md:ml-0 w-[382px] h-[100px]">
            <div className="flex grow gap-3 p-2.5 w-[382px]  text-xs font-medium text-white rounded border border-solid bg-neutral-900 border-neutral-700 max-md:mt-2">
              <img
                loading="lazy"
                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/f93a8da09e29ff776b372b34074f7ca5afea5fbcca971145d82761a69f1bf725?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/f93a8da09e29ff776b372b34074f7ca5afea5fbcca971145d82761a69f1bf725?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/f93a8da09e29ff776b372b34074f7ca5afea5fbcca971145d82761a69f1bf725?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/f93a8da09e29ff776b372b34074f7ca5afea5fbcca971145d82761a69f1bf725?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/f93a8da09e29ff776b372b34074f7ca5afea5fbcca971145d82761a69f1bf725?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/f93a8da09e29ff776b372b34074f7ca5afea5fbcca971145d82761a69f1bf725?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/f93a8da09e29ff776b372b34074f7ca5afea5fbcca971145d82761a69f1bf725?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/f93a8da09e29ff776b372b34074f7ca5afea5fbcca971145d82761a69f1bf725?apiKey=dc17e74fd8f04620bba968dc4f90b76e&"
                className="shrink-0 max-w-full aspect-square w-[100px]"
              />
              <div className="flex flex-col justify-center py-1">
                <div className="text-sm font-semibold">The Academy</div>
                <div className="mt-1">
                  Dimelo Flow, Sech, Lenny Tavarez, Justin Quilez, Feid
                </div>
                <div className="mt-1">Oct 12, 2021</div>
                <div className="flex flex-wrap gap-1 content-start pr-6 mt-3 font-bold text-zinc-300 max-md:pr-5">
                  <div className="justify-center px-2 py-1.5 whitespace-nowrap rounded bg-neutral-800">
                    Producer
                  </div>
                  <div className="justify-center px-2 py-1.5 rounded bg-neutral-800">
                    Featured Artist
                  </div>
                  <div className="justify-center px-2 py-1.5 whitespace-nowrap rounded bg-neutral-800">
                    Composer
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 w-[382px] h-[100px]">
            <div className="flex grow gap-3 p-2.5 w-[382px]  text-xs font-medium text-white rounded border border-solid bg-neutral-900 border-neutral-700 max-md:mt-2">
              <img
                loading="lazy"
                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/65ab858cdf19aee9f2770ffd7f98b8e1cd852f248b9f19fa52c6048915f2dc93?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/65ab858cdf19aee9f2770ffd7f98b8e1cd852f248b9f19fa52c6048915f2dc93?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/65ab858cdf19aee9f2770ffd7f98b8e1cd852f248b9f19fa52c6048915f2dc93?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/65ab858cdf19aee9f2770ffd7f98b8e1cd852f248b9f19fa52c6048915f2dc93?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/65ab858cdf19aee9f2770ffd7f98b8e1cd852f248b9f19fa52c6048915f2dc93?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/65ab858cdf19aee9f2770ffd7f98b8e1cd852f248b9f19fa52c6048915f2dc93?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/65ab858cdf19aee9f2770ffd7f98b8e1cd852f248b9f19fa52c6048915f2dc93?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/65ab858cdf19aee9f2770ffd7f98b8e1cd852f248b9f19fa52c6048915f2dc93?apiKey=dc17e74fd8f04620bba968dc4f90b76e&"
                className="shrink-0 max-w-full aspect-square w-[100px]"
              />
              <div className="flex flex-col justify-center py-1">
                <div className="text-sm font-semibold">En Bajita</div>
                <div className="mt-1">
                  Dimelo Flow, Sech, Lenny Tavarez, Justin Quilez, Feid
                </div>
                <div className="mt-1">Oct 12, 2021</div>
                <div className="flex flex-wrap gap-1 content-start pr-6 mt-3 font-bold text-zinc-300 max-md:pr-5">
                  <div className="justify-center px-2 py-1.5 whitespace-nowrap rounded bg-neutral-800">
                    Producer
                  </div>
                  <div className="justify-center px-2 py-1.5 rounded bg-neutral-800">
                    Featured Artist
                  </div>
                  <div className="justify-center px-2 py-1.5 whitespace-nowrap rounded bg-neutral-800">
                    Composer
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 w-[382px] h-[100px]">
            <div className="flex grow gap-3 p-2.5 w-[382px] text-xs font-medium text-white rounded border border-solid bg-neutral-900 border-neutral-700 max-md:mt-2">
              <img
                loading="lazy"
                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/1ac1402fd57cd8205cf0162c3d8046de04ec8db4c71f510a050a650a668c82aa?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/1ac1402fd57cd8205cf0162c3d8046de04ec8db4c71f510a050a650a668c82aa?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1ac1402fd57cd8205cf0162c3d8046de04ec8db4c71f510a050a650a668c82aa?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/1ac1402fd57cd8205cf0162c3d8046de04ec8db4c71f510a050a650a668c82aa?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/1ac1402fd57cd8205cf0162c3d8046de04ec8db4c71f510a050a650a668c82aa?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1ac1402fd57cd8205cf0162c3d8046de04ec8db4c71f510a050a650a668c82aa?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/1ac1402fd57cd8205cf0162c3d8046de04ec8db4c71f510a050a650a668c82aa?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/1ac1402fd57cd8205cf0162c3d8046de04ec8db4c71f510a050a650a668c82aa?apiKey=dc17e74fd8f04620bba968dc4f90b76e&"
                className="shrink-0 max-w-full aspect-square w-[100px]"
              />
              <div className="flex flex-col justify-center py-1">
                <div className="text-sm font-semibold">Tempo</div>
                <div className="mt-1">
                  Dimelo Flow, Sech, Lenny Tavarez, Justin Quilez, Feid
                </div>
                <div className="mt-1">Oct 12, 2021</div>
                <div className="flex flex-wrap gap-1 content-start pr-6 mt-3 font-bold text-zinc-300 max-md:pr-5">
                  <div className="justify-center px-2 py-1.5 whitespace-nowrap rounded bg-neutral-800">
                    Producer
                  </div>
                  <div className="justify-center px-2 py-1.5 rounded bg-neutral-800">
                    Featured Artist
                  </div>
                  <div className="justify-center px-2 py-1.5 whitespace-nowrap rounded bg-neutral-800">
                    Composer
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 w-[382px] h-[100px]">
            <div className="flex z-10 grow gap-3 p-2.5 w-[382px] text-xs font-medium text-white rounded border border-solid bg-neutral-900 border-neutral-700 max-md:mt-2">
              <img
                loading="lazy"
                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/1ac1402fd57cd8205cf0162c3d8046de04ec8db4c71f510a050a650a668c82aa?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/1ac1402fd57cd8205cf0162c3d8046de04ec8db4c71f510a050a650a668c82aa?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1ac1402fd57cd8205cf0162c3d8046de04ec8db4c71f510a050a650a668c82aa?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/1ac1402fd57cd8205cf0162c3d8046de04ec8db4c71f510a050a650a668c82aa?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/1ac1402fd57cd8205cf0162c3d8046de04ec8db4c71f510a050a650a668c82aa?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1ac1402fd57cd8205cf0162c3d8046de04ec8db4c71f510a050a650a668c82aa?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/1ac1402fd57cd8205cf0162c3d8046de04ec8db4c71f510a050a650a668c82aa?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/1ac1402fd57cd8205cf0162c3d8046de04ec8db4c71f510a050a650a668c82aa?apiKey=dc17e74fd8f04620bba968dc4f90b76e&"
                className="shrink-0 max-w-full aspect-square w-[100px]"
              />
              <div className="flex flex-col justify-center py-1">
                <div className="text-sm font-semibold">Tempo</div>
                <div className="mt-1">
                  Dimelo Flow, Sech, Lenny Tavarez, Justin Quilez, Feid
                </div>
                <div className="mt-1">Oct 12, 2021</div>
                <div className="flex flex-wrap gap-1 content-start pr-6 mt-3 font-bold text-zinc-300 max-md:pr-5">
                  <div className="justify-center px-2 py-1.5 whitespace-nowrap rounded bg-neutral-800">
                    Producer
                  </div>
                  <div className="justify-center px-2 py-1.5 rounded bg-neutral-800">
                    Featured Artist
                  </div>
                  <div className="justify-center px-2 py-1.5 whitespace-nowrap rounded bg-neutral-800">
                    Composer
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

                        
                        {/* End Content */}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Songwrtier;


