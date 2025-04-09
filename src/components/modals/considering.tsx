/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { getSampleDownloads } from "redux/actionCreators/sounds";
import Avatar from 'react-avatar';


const ConsideringModal = (props: any) => {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      const _downloads = await getSampleDownloads(props.sample.id, {});

      // console.log(_downloads.data.results.data);

      setDownloads(_downloads.data.results.data);

      setLoading(false);
    };

    init();
  }, [props]);

  return (
    <React.Fragment>
      <>
        <Modal
          ariaHideApp={false}
          className="bg-transparent"
          isOpen={props.openModal}
          onRequestClose={() => props.setModal(false)}
          style={{
            overlay: {
              zIndex: 1000,
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 1,
              backgroundColor: "rgba(0, 0, 0, .3)",
              backdropFilter: "blur(12px)",
              overflow: "hidden",
            },
          }}
        >
          <div>
            <div className="z-modal animate-fade-in fixed left-0 top-0 flex flex-col items-stretch w-full h-screen overflow-y-auto">
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
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/017c22613a8e414ec7a32ffbe1bbc0ab7f8dca0b759aae1f05ac1e874e4d328e?apiKey=dc17e74fd8f04620bba968dc4f90b76e&"
                          className="w-[24px] h-[24px] aspect-square fill-neutral-600"
                        />
                      </button>

                      {/* start */}

                      <div className="mt-1 text-xl font-semibold text-zinc-100 max-md:max-w-full font-[Mona-Sans-M]">
                        Spark Creativity, Claim Exclusivity 🧑‍🎨
                      </div>
                      <div className="mt-4 text-sm italic leading-6 text-justify text-stone-300 max-md:max-w-full font-[Mona-Sans-M]">
                        This platform isn't just about finding amazing samples –
                        it's about pushing boundaries. See exactly who else in
                        our exclusive producer network is using the same sounds
                        you're drawn to. This offers a glimpse into current
                        trends or sparks a chance for a unique collaboration.{" "}
                        <br />
                        <br />
                        We want to empower your creative vision. Whoever
                        requests a{" "}
                        <span className="italic font-semibold text-stone-300 font-[Mona-Sans-M]">
                          Split-Agreement
                        </span>{" "}
                        or{" "}
                        <span className="italic font-semibold text-stone-300 font-[Mona-Sans-M]">
                          Master-Agreement{" "}
                        </span>
                        first for a particular{" "}
                        <span className="italic font-semibold text-stone-300 font-[Mona-Sans-M]">
                          sample
                        </span>{" "}
                        or{" "}
                        <span className="italic font-semibold text-stone-300 font-[Mona-Sans-M]">
                          instrumental
                        </span>{" "}
                        gets to claim it exclusively for their track. That's
                        right, no more worrying about another producer using the
                        same sound in their music. Our system will notify
                        everyone else using the sample when it's no longer
                        available. This innovative feature gives you the power
                        to truly own your sound and stand out from the crowd.
                      </div>
                      <div className="self-start mt-3.5 ml-2.5 text-base font-semibold text-white font-[Mona-Sans-M]">
                        Who is currently considering:
                      </div>

                      <div className="flex flex-col px-2.5 pt-2.5 mt-3.5 text-xs text-white rounded-lg border border-solid bg-neutral-900 border-neutral-800 max-md:max-w-full font-[Mona-Sans-M]">
                        {loading ? (
                          <>Loading...</>
                        ) : (
                          <>
                            {downloads.length &&
                              downloads.map((x) => {
                                return (
                                  <>
                                    <div className="flex gap-2 py-2.5 border-b border-solid border-stone-900 max-md:flex-wrap font-[Mona-Sans-M]">
                                      
                                      <Avatar name={x?.user?.name} round={true} title={x?.user?.name} size="30" className="shrink-0 w-8  aspect-square "/>

                                      <div className="my-auto max-md:max-w-full">
                                        {x?.user?.name}
                                      </div>
                                    </div>
                                  </>
                                );
                              })}
                          </>
                        )}

                        <div className="shrink-0 h-2.5 border-b border-solid border-stone-900 max-md:max-w-full" />
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

export default ConsideringModal;
