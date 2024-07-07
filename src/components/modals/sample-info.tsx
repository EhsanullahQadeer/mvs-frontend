/*************************************************************************
 * @file sample-info.tsx
 * @author Zohaib Ahmed
 * @desc Modal component for displaying sample information and composers.
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* IMPORTS */
import React from "react";
import Modal from "react-modal";

const SampleInfoModal = (props: any) => {
  return (
    <React.Fragment>
      <>
        <Modal
          className=""
          isOpen={props.openModal}
          onRequestClose={() => props.setModal(false)}
          style={{
            overlay: {
              position: "relative",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 1,
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              overflow: "hidden",
            },
          }}
        >
          <div>
            <div className="_modal z-modal animate-fade-in fixed left-0 top-0 flex flex-col items-stretch w-full h-screen overflow-y-auto">
              <div className="flex flex-grow items-center justify-center py-4 w-full">
                <div
                  role="dialog"
                  tabIndex={-1}
                  data-ismodal="true"
                  className="focus:outline-none "
                  style={{ width: 800 }}
                >
                  <div className=" rounded-4xl relative py-8 px-8 ml-[80px]">
                    {/* start content */}

                    <div className="flex flex-col justify-center px-10 py-9 rounded-lg border border-solid shadow bg-zinc-900 border-zinc-800 max-w-[565px] max-md:px-5">
                      <button
                        onClick={() => props.setModal(false)}
                        className="cursor-pointer flex justify-center items-center self-end px-1 w-6 h-6 bg-neutral-200 rounded-[29px]"
                      >
                        {/* eslint-disable-next-line */}
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/017c22613a8e414ec7a32ffbe1bbc0ab7f8dca0b759aae1f05ac1e874e4d328e?apiKey=dc17e74fd8f04620bba968dc4f90b76e&"
                          className="w-[24px] h-[24px] aspect-square fill-neutral-600"
                        />
                      </button>

                      {/* start */}

                      <div className="mt-1 text-xl font-semibold text-zinc-100 max-md:max-w-full">
                        Composers 🎸
                      </div>
                      <div className="mt-4 text-sm leading-6 text-justify text-neutral-400 max-md:max-w-full">
                        Each sample/composition in our collection is more than
                        just sounds – it's a creative vision brought to life. We
                        want to highlight the talented composers behind these
                        sonic gems. This particular sample owes its core melody,
                        harmony, and rhythm to the ingenuity of the composers
                        below:
                        <br />
                      </div>
                      <div className="self-start mt-3.5 ml-2.5 text-sm text-neutral-400">
                        File Name:
                      </div>
                      <div className="flex gap-2.5 p-2.5 mt-3.5 text-sm whitespace-nowrap rounded-lg border border-solid bg-neutral-900 border-neutral-800 text-neutral-400 max-md:flex-wrap">
                        {/* eslint-disable-next-line */}
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/160f10237fa3e980ee4caff403ee55279445d55c1274fed6306d8f9c30340c84?apiKey=dc17e74fd8f04620bba968dc4f90b76e&"
                          className="shrink-0 w-5 aspect-square"
                        />
                        <div className="my-auto max-md:max-w-full">
                          {props.sample.filename}
                        </div>
                      </div>
                      <div className="self-start mt-3.5 ml-2.5 text-sm text-neutral-400">
                        Composers:
                      </div>
                      <div className="flex flex-col p-2.5 mt-3.5 text-xs text-white rounded-lg border border-solid bg-neutral-900 border-neutral-800 max-md:max-w-full">
                        
                        {props.sample.composers.split(',').length > 0 && props.sample.composers.split(",").map((item:any,i:any) => {
                            return (
                                <>
                                  <div className="justify-center py-2.5 border-b border-solid border-stone-900 max-md:max-w-full">
                                    {item}
                                  </div>
                                </>
                            )
                        })}
                      </div>

                      {/* end  */}
                    </div>

                    {/* end content */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </>
    </React.Fragment>
  );
};

export default SampleInfoModal;
