/*************************************************************************
 * @file contact-us.tsx
 * @author Zohaib Ahmed
 * @desc Modal component for displaying contact information.
 * 
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* IMPORTS */
import React from "react";
import Modal from "react-modal";

const ContactModal = (props: any) => {
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
              zIndex: 2,
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
          <div className="z-modal animate-fade-in fixed left-0 top-0 flex flex-col items-stretch w-full h-screen overflow-y-auto">
            <div className="flex flex-grow items-center justify-center py-4 w-full">
              <div
                role="dialog"
                tabIndex={-1}
                data-ismodal="true"
                className="focus:outline-none "
                style={{ width: 500 }}
              >
                <div className=" rounded-4xl relative py-8 px-8 ml-[80px]">
                  {/* start content */}

                  <div className="flex flex-col justify-center px-10 py-9 rounded-lg border border-solid shadow bg-zinc-900 border-zinc-800 max-md:px-5 max-width-[100%]">
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
                      Contact Us
                    </div>
                    <div className="mt-4 text-sm leading-6 text-justify text-stone-300 max-md:max-w-full font-[Mona-Sans-M]">
                    For any questions about splits or agreements,
                    please text or email us directly! We reply within 24 hours.
                    </div>

                    <div className="inline-block flex-col px-2.5 pt-2.5 mt-3.5 text-xs text-white rounded-lg border border-solid bg-neutral-900 border-neutral-800 max-md:max-w-full font-[Mona-Sans-M]">


                      <div className="flex gap-3 p-5 mt-5">
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ed6818d62695dd0d38418a9dedf6d1b4566850fac804ff4e2d50f1328e1a6d47?apiKey=dc17e74fd8f04620bba968dc4f90b76e&"
                            className="shrink-0 w-6 aspect-square"
                        />
                      <div className="my-auto underline">+1 (626) 264-7419</div>
                  </div>
                      
                    <div className="flex gap-3 p-5 mt-2 whitespace-nowrap">
                      <img
                          loading="lazy"
                          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/ca6e8937359d7dcbaab61c4a9b9e8a476bb5a5c7dc44d60340b33687fd3396fa?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/ca6e8937359d7dcbaab61c4a9b9e8a476bb5a5c7dc44d60340b33687fd3396fa?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/ca6e8937359d7dcbaab61c4a9b9e8a476bb5a5c7dc44d60340b33687fd3396fa?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/ca6e8937359d7dcbaab61c4a9b9e8a476bb5a5c7dc44d60340b33687fd3396fa?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/ca6e8937359d7dcbaab61c4a9b9e8a476bb5a5c7dc44d60340b33687fd3396fa?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/ca6e8937359d7dcbaab61c4a9b9e8a476bb5a5c7dc44d60340b33687fd3396fa?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/ca6e8937359d7dcbaab61c4a9b9e8a476bb5a5c7dc44d60340b33687fd3396fa?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/ca6e8937359d7dcbaab61c4a9b9e8a476bb5a5c7dc44d60340b33687fd3396fa?apiKey=dc17e74fd8f04620bba968dc4f90b76e&"
                          className="shrink-0 w-7 aspect-square"
                      />
                      <div className="my-auto underline">WhatsApp</div>
                      </div>
                      <div className="flex gap-3 p-5 mt-2 whitespace-nowrap">
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/5bc50b322f9f7f8d11c6aaa95b4505de1a79c985ef7585281e8621378b114ae5?apiKey=dc17e74fd8f04620bba968dc4f90b76e&"
                            className="shrink-0 w-6 aspect-square"
                        />
                        <div className="my-auto underline">soundboyzofficial@gmail.com</div>
                    </div>
                      <div className="shrink-0 h-2.5 border-b border-solid border-stone-900 max-md:max-w-full" />

                      <div className="flex gap-3 p-5 mt-2 whitespace-nowrap">
                                                  <img
                                                      loading="lazy"
                                                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/6c295ae726afc2362827dcb2b4fc4f2ff4a14b879be51d65d5f255ecd191b4a0?apiKey=dc17e74fd8f04620bba968dc4f90b76e&"
                                                      className="shrink-0 w-6 aspect-square"
                                                  />
                                                  <div className="my-auto underline">@soundboyz.als</div>
                                              </div>
                      </div>

                      {/* end  */}
                    </div>

                    {/* end content */}
                  </div>
                </div>
              </div>
            </div>
        </Modal>
      </>
    </React.Fragment>
  );
}
export default ContactModal;