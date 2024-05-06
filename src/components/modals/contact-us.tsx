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

const ContactModal = (props: any) => {
    return (
        <React.Fragment>
            <>
                <Modal
                    isOpen={props.openModal}
                    onRequestClose={() => props.setModal(false)}
                    style={{
                        overlay: {
                            position: "relative",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundColor: "rgba(255, 255, 255, 0.75)",
                            overflow: "hidden",
                        },
                    }}
                >
                    <div>
                        <div className="modal-overlay animate-fade-in bg-black fixed left-0 top-0 flex flex-col items-stretch w-full h-screen bg-opacity-90 overflow-y-auto">
                            <div className="flex flex-grow items-center justify-center py-4 w-full">
                                <div
                                    role="dialog"
                                    tabIndex={-1}
                                    data-ismodal="true"
                                    className="focus:outline-none "
                                    style={{ width: 500 }}
                                >
                                    <div className="bg-black rounded-4xl relative py-8 px-8 ml-[80px]">
                                        <button
                                            className="absolute z-30 right-3 top-3 lt-item-icon-box lt-item-box-sizing lt-item-box-bg  close-popup-practice"
                                            type="button"
                                            onClick={() => props.setModal(false)}
                                        >
                                            <span className="flex items-center gap-4px">
                                                <svg
                                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    aria-hidden="true"
                                                    focusable="false"
                                                    role="presentation"
                                                    className="index-StyledSvg_cls2__nHIIG index-StyledSvg_cls1__3YcLt"
                                                    style={{ width: 24, height: 24 }}
                                                    width={24}
                                                    height={24}
                                                >
                                                    <defs>
                                                        <symbol id="close" viewBox="0 0 24 24">
                                                            <path d="M19.707 5.707a1 1 0 0 0-1.414-1.414L12 10.586 5.707 4.293a1 1 0 1 0-1.414 1.414L10.586 12l-6.293 6.292a1 1 0 1 0 1.414 1.415L12 13.414l6.293 6.293a1 1 0 0 0 1.414-1.415L13.414 12l6.293-6.293z" />
                                                        </symbol>
                                                    </defs>
                                                    <use xlinkHref="#close" fill="#FFFFFF" />
                                                </svg>
                                            </span>
                                        </button>
                                        

                                        <div className="">
                                            <div className="flex flex-col p-10 text-base font-medium text-white rounded-lg border border-solid bg-zinc-900 border-neutral-800 max-w-[383px]">
                                                <div className="text-3xl text-neutral-300">Contact Us!</div>
                                                <div className="mt-5 text-sm text-justify text-neutral-300">
                                                    For any questions about splits or agreements
                                                    <br />
                                                    please text or email us directly! We reply within 24 hours
                                                </div>
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
                                                <div className="flex gap-3 p-5 mt-2 whitespace-nowrap">
                                                    <img
                                                        loading="lazy"
                                                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/6c295ae726afc2362827dcb2b4fc4f2ff4a14b879be51d65d5f255ecd191b4a0?apiKey=dc17e74fd8f04620bba968dc4f90b76e&"
                                                        className="shrink-0 w-6 aspect-square"
                                                    />
                                                    <div className="my-auto underline">@soundboyz.als</div>
                                                </div>
                                            </div>
                                        </div>
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

export default ContactModal;
