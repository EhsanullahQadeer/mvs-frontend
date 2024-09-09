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
import { useEffect, useRef, useState } from "react";
import React from "react";
import moment from "moment";
import { AudioRecorder } from "react-audio-voice-recorder";
import { AudioPlayer } from "react-audio-play";
import { PaperAirplaneIcon } from "@heroicons/react/20/solid";
import { sendMessage } from "api/inbox";

const MessagesDetail = (props: any) => {
  console.log(" ==== Message Detail Props ====");
  console.log(props);

  const [tip, setTip] = useState(0);
  const [message, setMessage] = useState("");
  const [tab, setTab] = useState(0);

  const validateTip = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setTip(value);
  };

  useEffect(() => {}, [props]);

  const addAudioElement = (blob, message) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    // document.body.appendChild(audio);

    console.log("==== Audio Url ====");
    console.log(url);
  };

  const newMessage = async () => {
    const key = props.messages[props.messages.length - 1]["messages"];
    const index = key.length - 1;
    const _msg = props.messages[props.messages.length - 1]["messages"].push(
      key[index]
    );

    props.messages[props.messages.length - 1]["messages"][index].message =
      message;

    const payload = {
      recipient_id: props.conversation.recipient,
      conversation_id: props.conversation.conversation_id,
      message,
    };
    const _newMessage = await sendMessage(payload);
    console.log("=== New Message ===");
    console.log(_newMessage);
    setMessage("");
  };

  return (
    <React.Fragment>
      <div className="flex">
        <div className="flex flex-col justify-between px-3 py-2 max-w-4xl min-h-[909px]">
          <div className="flex flex-col w-full max-md:max-w-full">
            <div className="flex flex-wrap gap-5 justify-between items-center py-2 pr-3 w-full max-md:max-w-full">
              <div className="flex gap-2 items-center self-stretch my-auto">
                <div className="flex relative gap-2.5 items-start self-stretch my-auto w-11">
                  <div className="flex z-0 shrink-0 w-11 h-11 rounded-full" />
                  <img
                    alt=""
                    loading="lazy"
                    src={props?.conversation?.thumbnail}
                    className="object-contain absolute right-1 bottom-1 z-0 shrink-0 w-9 h-9 rounded-full aspect-square"
                  />
                </div>
                <div className="flex flex-col justify-center self-stretch my-auto w-[100px]">
                  <div className="text-sm font-bold text-white">
                    {props?.conversation?.displayName}
                  </div>
                  <div className="text-xs text-zinc-400">Los Angeles, CA</div>
                </div>
              </div>
              <div className="flex gap-2.5 justify-center items-center self-stretch px-2 my-auto w-8 h-8 rounded bg-zinc-900">
                <img
                  alt=""
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/863349b86cd073a53ab244e19a316e50a23805036103b283eb7633ef9ab7ed48?apiKey=e72c5327c3e8425eaa461e300549038a&&apiKey=e72c5327c3e8425eaa461e300549038a"
                  className="object-contain self-stretch my-auto w-4 aspect-square"
                />
              </div>
            </div>
            <div className="flex flex-col justify-center py-1 w-full text-xs font-medium text-gray-500 whitespace-nowrap max-md:max-w-full">
              <div className="flex flex-wrap gap-2 items-center py-2 w-full max-md:max-w-full">
                <div
                  onClick={() => setTab(0)}
                  className={
                    tab === 0
                      ? "gap-2.5 self-stretch px-2.5 py-2 my-auto font-semibold bg-lime-400 rounded-[35px] text-neutral-900 cursor-pointer"
                      : "cursor-pointer gap-2.5 self-stretch px-2.5 py-2 my-auto bg-zinc-900 rounded-[35px] bg-lime-400 "
                  }
                >
                  Messages
                </div>
                <div
                  onClick={() => setTab(1)}
                  className={
                    tab === 1
                      ? "gap-2.5 self-stretch px-2.5 py-2 my-auto font-semibold bg-lime-400 rounded-[35px] text-neutral-900 cursor-pointer"
                      : "cursor-pointer gap-2.5 self-stretch px-2.5 py-2 my-auto bg-zinc-900 rounded-[35px] bg-lime-400 "
                  }
                >
                  Info
                </div>
                <div
                  onClick={() => setTab(2)}
                  className={
                    tab === 2
                      ? "gap-2.5 self-stretch px-2.5 py-2 my-auto font-semibold bg-lime-400 rounded-[35px] text-neutral-900 cursor-pointer"
                      : "cursor-pointer gap-2.5 self-stretch px-2.5 py-2 my-auto bg-zinc-900 rounded-[35px] bg-lime-400 "
                  }
                >
                  Notes
                </div>
              </div>
            </div>
          </div>
          <div className="flex overflow-hidden flex-col flex-1 justify-center py-3 w-full max-md:max-w-full">
            <div className="flex flex-col flex-1 w-full max-md:max-w-full">
              {tab === 0 && (
                <>
                  <div className="flex flex-col mt-3 w-full h-[531px] max-md:max-w-full overflow-auto">
                    {props.loading === true ? (
                      <>
                        <div
                          role="status"
                          className="max-w-sm animate-pulse w-full"
                        >
                          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
                          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5" />
                          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
                          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5" />
                          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5" />
                          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]" />
                          <span className="sr-only">Loading...</span>
                        </div>
                      </>
                    ) : (
                      <>
                        {props.messages.map((message) => {
                          return (
                            <>
                              <div className="flex flex-wrap items-center w-full max-md:max-w-full">
                                <div className="flex flex-col flex-1 shrink justify-center self-stretch p-2.5 my-auto basis-0 min-w-[240px]">
                                  <div className="w-full min-h-[1px]" />
                                </div>
                                <div className="gap-2.5 self-stretch p-2.5 my-auto text-sm font-medium text-zinc-400">
                                  {moment(message.date).format(
                                    "dddd, MMMM D, YYYY"
                                  )}
                                </div>
                                <div className="flex flex-col flex-1 shrink justify-center self-stretch p-2.5 my-auto basis-0 min-w-[240px]">
                                  <div className="w-full min-h-[1px]" />
                                </div>
                              </div>

                              {message.messages.map((x) => {
                                return (
                                  <>
                                    <div className="flex flex-wrap gap-2 py-2 w-full max-md:max-w-full">
                                      <div className="flex relative gap-2.5 items-start w-11 h-full">
                                        <div className="flex z-0 shrink-0 w-11 h-11 rounded-full" />
                                        <img
                                          alt=""
                                          loading="lazy"
                                          src={x.thumbnail}
                                          className="object-contain absolute top-1 right-1 z-0 shrink-0 w-9 h-9 rounded-full aspect-square"
                                        />
                                      </div>
                                      <div className="flex flex-col flex-1 shrink justify-center my-auto basis-0 min-w-[240px] max-md:max-w-full">
                                        <div className="flex flex-col w-full text-sm max-md:max-w-full">
                                          <div className="flex gap-1 items-start self-start">
                                            <div className="font-bold text-white w-[100px]">
                                              {x.displayName}
                                            </div>
                                            <div className="text-gray-500">
                                              4:19 PM
                                            </div>
                                          </div>
                                          <div className="mt-1 text-stone-300 w-[650px]">
                                            {x?.message}
                                          </div>
                                        </div>
                                        {x?.audio_recording_url && (
                                          <div className="flex gap-1 items-center self-start p-3 mt-3 rounded-2xl bg-neutral-800 w-[400px]">
                                            <AudioPlayer
                                              src={x.audio_recording_url}
                                              color="#1C1C1"
                                              sliderColor="#B7B7B7"
                                              style={{
                                                background: "#242424",
                                                borderRadius: "15px",
                                              }}
                                              className="audio-player"
                                            />
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </>
                                );
                              })}
                            </>
                          );
                        })}
                      </>
                    )}
                  </div>
                </>
              )}

              {tab === 1 && (
                <>
                  <div className="flex flex-col w-[100%]">
                    <div className="flex gap-4 justify-center items-center w-full">
                      <div className="flex flex-col flex-1 shrink self-stretch my-auto basis-0">
                        <div className="gap-2.5 self-stretch py-2.5 w-full text-xs font-semibold leading-none text-white">
                          First Name
                        </div>
                        <div className="gap-2 self-stretch px-3.5 py-2.5 w-full text-sm leading-none text-center whitespace-nowrap rounded-lg border border-solid border-neutral-200 text-neutral-200">
                          Becky
                        </div>
                      </div>
                      <div className="flex flex-col flex-1 shrink self-stretch my-auto basis-0">
                        <div className="gap-2.5 self-stretch py-2.5 w-full text-xs font-semibold leading-none text-white">
                          Last Name
                        </div>
                        <div className="gap-2 self-stretch px-3.5 py-2.5 w-full text-sm leading-none text-center whitespace-nowrap rounded-lg border border-solid border-neutral-200 text-neutral-200">
                          Hill
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4 justify-center items-center mt-4 w-full">
                      <div className="flex flex-col flex-1 shrink self-stretch my-auto whitespace-nowrap basis-0">
                        <div className="gap-2.5 self-stretch py-2.5 w-full text-xs font-semibold leading-none text-white">
                          Email
                        </div>
                        <div className="gap-2 self-stretch px-3.5 py-2.5 w-full text-sm leading-none text-center rounded-lg border border-solid border-neutral-200 text-neutral-200">
                          info@mvssive.net
                        </div>
                      </div>
                      <div className="flex flex-col flex-1 shrink self-stretch my-auto basis-0">
                        <div className="gap-2.5 self-stretch py-2.5 w-full text-xs font-semibold leading-none text-white">
                          User Role
                        </div>
                        <div className="gap-2 self-stretch px-3.5 py-2.5 w-full text-sm leading-none text-center whitespace-nowrap rounded-lg border border-solid border-neutral-200 text-neutral-200">
                          Songwriter
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4 justify-center items-center mt-4 w-full">
                      <div className="flex flex-col flex-1 shrink self-stretch my-auto basis-0">
                        <div className="gap-2.5 self-stretch p-2.5 w-full text-xs font-semibold leading-none text-white">
                          Amount Spent
                        </div>
                        <div className="gap-2 self-stretch px-3.5 py-2.5 w-full text-sm leading-none text-center whitespace-nowrap bg-lime-400 rounded-lg text-stone-950">
                          $467.89
                        </div>
                      </div>
                      <div className="flex flex-col flex-1 shrink self-stretch my-auto basis-0">
                        <div className="gap-2.5 self-stretch p-2.5 w-full text-xs font-semibold leading-none text-white">
                          Files Submitted
                        </div>
                        <div className="gap-2 self-stretch px-3.5 py-2.5 w-full text-sm leading-none text-center whitespace-nowrap rounded-lg border border-solid border-neutral-200 text-neutral-200">
                          3
                        </div>
                      </div>
                    </div>
                    <div className="border mt-5 border-solid bg-stone-500 border-stone-500 w-[100%] min-h-[1px]" />

                    <div className="mt-5 w-[100%]">
                      <div className="flex gap-2.5 items-center px-4 py-2 text-sm font-semibold leading-none max-w-[397px]">
                        <div className="gap-2.5 self-stretch p-2 my-auto rounded border border-solid bg-neutral-800 border-zinc-900 text-neutral-700">
                          File History
                        </div>
                        <div className="overflow-hidden gap-2.5 self-stretch p-2 my-auto text-black bg-lime-400 rounded">
                          Files Sent
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 history w-[100%]">
                      <div className="flex items-center px-4 py-3 border-b border-stone-900">
                        <div className="flex flex-1 shrink gap-3 justify-between items-center self-stretch my-auto w-full basis-0 min-w-[240px]">
                          <div className="flex items-center self-stretch my-auto font-semibold whitespace-nowrap w-[145px]">
                            <div className="flex flex-col justify-center self-stretch my-auto w-[129px]">
                              <div className="text-sm leading-none text-white">
                                rap-demo-23...
                              </div>
                              <div className="self-start text-xs text-neutral-400">
                                05/7/2024
                              </div>
                              <div className="text-xs text-emerald-200">
                                $149.99
                              </div>
                            </div>
                          </div>
                          <div className="flex overflow-hidden gap-1 items-center self-stretch px-3 py-2.5 my-auto w-40 rounded-2xl border border-solid bg-neutral-800 border-neutral-700 min-h-[44px]">
                            <div className="flex gap-2.5 justify-center items-center self-stretch my-auto w-6">
                              <img
                                loading="lazy"
                                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/bed48f33-cba1-4040-94f4-429ab2843836?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/bed48f33-cba1-4040-94f4-429ab2843836?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/bed48f33-cba1-4040-94f4-429ab2843836?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/bed48f33-cba1-4040-94f4-429ab2843836?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/bed48f33-cba1-4040-94f4-429ab2843836?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/bed48f33-cba1-4040-94f4-429ab2843836?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/bed48f33-cba1-4040-94f4-429ab2843836?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/bed48f33-cba1-4040-94f4-429ab2843836?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                                className="object-contain self-stretch my-auto w-6 h-6 bg-lime-400 rounded-full aspect-square fill-lime-400"
                              />
                            </div>
                            <div className="flex relative flex-col flex-1 shrink justify-center self-stretch px-2.5 py-2.5 my-auto basis-0">
                              <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/5f6d697732c463093143e52b7acaee9a6b416b0c1206363c9d410bbb82dd7587?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                                className="object-contain z-0 aspect-[32.26] w-[65px]"
                              />
                              <div className="flex absolute left-1 top-2/4 z-0 w-2.5 h-2.5 rounded-full -translate-y-2/4 bg-zinc-400 min-h-[10px] translate-x-[0%]" />
                            </div>
                            <div className="gap-2.5 self-stretch my-auto text-xs leading-none whitespace-nowrap text-zinc-400">
                              3:13
                            </div>
                          </div>
                          <div className="flex gap-2.5 justify-center items-center self-stretch my-auto w-9 h-9 bg-zinc-900 min-h-[36px]">
                            <div className="flex self-stretch my-auto min-h-[16px]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {tab === 2 && (
                <>
                  <div className="flex flex-col p-4 max-w-[100%]">
                    <textarea
                      placeholder="Type a note..."
                      className="bg-transparent resize-none overflow-hidden gap-2.5 px-5 pt-3 pb-16 w-full text-xs leading-none rounded-xl border border-solid border-neutral-800 min-h-[90px] text-neutral-700"
                    />

                    <div className="flex flex-col justify-center items-end mt-3 w-full text-sm leading-none text-center whitespace-nowrap text-stone-950">
                      <div className="gap-2 self-stretch px-4 py-2 bg-lime-400 rounded-lg">
                        Save
                      </div>
                    </div>

                    <div className="mt-5 gap-2.5 self-stretch py-4 text-base leading-none border-b border-solid border-b-neutral-700 text-neutral-200">
                      History of notes
                    </div>

                    <div className="flex flex-col text-sm w-[100%] mt-5">
                      <div className="flex gap-1 items-start self-start leading-none">
                        <div className="flex-1 shrink gap-2.5 self-stretch px-3.5 py-2.5 border border-solid bg-zinc-800 border-neutral-700 rounded-[50px] text-neutral-400 w-[300px]">
                          03:37 PM | 05/31/2024
                        </div>
                        <div className="gap-2.5 self-stretch p-2.5 font-semibold text-blue-400 whitespace-nowrap">
                          Edit
                        </div>
                      </div>
                      <div className="flex-1 shrink gap-2.5 self-stretch px-3.5 py-2.5 mt-2 w-full leading-4 rounded-lg border border-solid border-neutral-700 text-neutral-400">
                        Joshua is a really dope producer for r&B, he mainly
                        plays guitar and its very good at finger arpegios.
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col p-3 max-w-[783px] w-[700px]">
            <div className="flex flex-col w-full relative top-[15px] z-[-1] text-sm font-semibold leading-none text-center rounded-none text-stone-500 max-md:max-w-full">
              <div className="flex flex-col px-7 text-[#955353] pb-3 w-full bg-red-100 rounded-xl max-md:px-5 max-md:max-w-full">
                <div className="gap-2.5 self-stretch py-2.5 min-h-[36px]">
                  Messages with tip appear at the top of the recipient inbox
                </div>
              </div>
            </div>
            <div className="flex overflow-hidden flex-col justify-center px-3 pt-2 w-full rounded-xl border border-solid shadow-sm bg-neutral-900 border-blue-200 border-opacity-80 min-h-[119px] max-md:max-w-full">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="focus:border-transparent focus:ring-0 resize-none bg-transparent border-none flex-1 shrink gap-2.5 self-stretch p-2.5 w-full text-base leading-none text-blue-200 whitespace-nowrap max-md:max-w-full"
              />

              <div className="flex flex-wrap gap-10 justify-between items-center w-full min-h-[56px] max-md:max-w-full">
                <div className="flex gap-4 items-center self-stretch p-2 my-auto rounded-lg border border-solid border-neutral-700">
                  <div className="flex flex-col self-stretch my-auto w-[79px]">
                    <div className="gap-2.5 self-stretch w-full text-sm font-semibold leading-none text-white whitespace-nowrap">
                      Tip
                    </div>
                    <div className="gap-2.5 mt-1 self-stretch w-full text-xs leading-none text-red-500">
                      Min $3.00
                    </div>
                  </div>
                  <div className="flex items-start self-stretch p-0.5 my-auto">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/2f9f55873e4b0ae9afa113c243c498bf83df88509960c8c9b6e1d53b5cfdd9ed?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                      className="object-contain w-0 stroke-[1px] stroke-neutral-700"
                    />
                  </div>
                  <div className="self-stretch my-auto text-sm leading-none text-right whitespace-nowrap text-zinc-500 w-[60px] ">
                    <input
                      type="number"
                      placeholder="0.00"
                      className="bg-transparent max-w-[60px] border-none border-transparent focus:border-transparent focus:ring-0"
                    />
                  </div>
                </div>

                <div className="flex gap-1 items-center self-stretch my-auto">
                  <div className="flex gap-1 items-center self-stretch my-auto">
                    <div className="flex gap-2.5 items-center self-stretch p-2.5 my-auto w-11 rounded">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/08c2c08125b829bc38020e0b24f8b12a07fdfc63b37ceafdb612cfa611d38448?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                        className="object-contain self-stretch my-auto w-6 aspect-square"
                      />
                    </div>
                    <div className="flex gap-2.5 items-center self-stretch p-2.5  rounded">
                      <AudioRecorder
                        onRecordingComplete={(e) =>
                          addAudioElement(e, props?.conversation)
                        }
                        audioTrackConstraints={{
                          noiseSuppression: true,
                          echoCancellation: true,
                        }}
                        downloadOnSavePress={false}
                        // showVisualizer={true}
                      />
                    </div>
                  </div>
                  <div className="flex items-start self-stretch p-0.5 my-auto">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/5704eb9459095409e648ed32ab82c4e3f2ce7089517c323eeb336e9107cd2bf3?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                      className="object-contain w-0 stroke-[1px] stroke-stone-500"
                    />
                  </div>
                  <div className="flex gap-2.5 items-center self-stretch p-2.5 my-auto w-11 rounded">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/a8d58bd050c9f06cd400385f88e0326420087a57eb897115f94c21286c3b7804?placeholderIfAbsent=true&apiKey=e72c5327c3e8425eaa461e300549038a"
                      className="object-contain self-stretch my-auto w-6 aspect-square"
                    />
                  </div>
                  <div className="flex flex-col justify-center self-stretch my-auto w-10">
                    <PaperAirplaneIcon
                      onClick={newMessage}
                      className="flex gap-3 items-center p-2 w-full rounded-lg icon send-message text-[#FFFFFF] border-none cursor-pointer"
                    />
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

export default MessagesDetail;
