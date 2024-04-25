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
import { submitSplitSheetRequest } from "redux/actionCreators/sounds";
import { ToastContainer, toast } from "react-toastify";


const RequestSplitSheetModal = (props: any) => {
  const [submit_request, setSubmitRequest] = useState(false);
  const [submit_request_success, setSubmitRequestSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [master_offer, setMasterOffer] = useState(null);
  const [publisher_offer, setPublisherOffer] = useState(null);

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
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/017c22613a8e414ec7a32ffbe1bbc0ab7f8dca0b759aae1f05ac1e874e4d328e?apiKey=dc17e74fd8f04620bba968dc4f90b76e&"
                          className="w-[24px] h-[24px] aspect-square fill-neutral-600"
                        />
                      </button>
                      {submit_request_success ? (
                        <>
                          <div className="mt-2 text-xl font-semibold text-zinc-100 max-md:max-w-full">
                            Thank You! 🔥
                          </div>
                          <div className="mt-4 text-sm leading-6 text-justify text-stone-300 max-md:max-w-full">
                            Thanks for submitting your request for a split
                            sheet. We appreciate your interest in securing
                            exclusive use of this sample. Our legal team is
                            currently reviewing your submission and will be in
                            touch soon. In the meantime, feel free to continue
                            discovering new sounds!
                          </div>
                        </>
                      ) : (
                        <>
                          {submit_request ? (
                            <>
                              <div className="flex flex-col self-stretch text-sm font-medium max-w-[495px] text-zinc-400">
                                <div className="w-full text-xl font-semibold text-neutral-300 max-md:max-w-full">
                                  Split Info:
                                </div>
                                <div className="mt-6 w-full text-base max-md:max-w-full">
                                  Master Offer:
                                </div>
                                <input
                                  type="text"
                                  placeholder="e.g - 4%"
                                  onChange={(e) => setMasterOffer(e.target.value)}

                                  className="bg-transparent w-full rounded-xl border-[#66666659] justify-center items-start p-5 mt-4 w-full rounded-xl border border-solid border-stone-500 border-opacity-30 text-stone-500 max-md:max-w-full"
                                />
                                <div className="mt-7 w-full text-base max-md:max-w-full">
                                  Publishing Offer:
                                </div>
                                <input
                                  type="text"
                                  placeholder="e.g - 25%"
                                  onChange={(e) => setPublisherOffer(e.target.value)}
                                  className="bg-transparent w-full rounded-xl border-[#66666659] justify-center items-start p-5 mt-4 w-full rounded-xl border border-solid border-stone-500 border-opacity-30 text-stone-500 max-md:max-w-full"
                                />

                                <div className="mt-7 w-full text-base max-md:max-w-full">
                                  Sample Name:
                                </div>
                                <div className="justify-center items-start p-5 mt-3.5 w-full rounded-xl border border-solid border-stone-500 border-opacity-30 text-stone-500 max-md:max-w-full">
                                  e.g -{" "}
                                  <span className=" text-stone-500">
                                    {props.sample.filename}
                                  </span>
                                </div>
                                <button
                                  disabled={submitting}
                                  onClick={async () => {

                                    setSubmitting(true);

                                    if (master_offer && publisher_offer && parseInt(master_offer) > 0 && parseInt(publisher_offer) > 0) {

                                      if (parseInt(master_offer) > 100) {

                                        toast.error("Master offer percentage can't be more than 100%");
                                        setSubmitting(true);
                                        return;

                                      }

                                      if (parseInt(publisher_offer) > 100) {

                                        toast.error("Publisher offer percentage can't be more than 100%");
                                        setSubmitting(true);
                                        return;
                                      }

                                      await submitSplitSheetRequest({
                                        publisher_offer,
                                        master_offer,
                                        sample_id: props.sample.id
                                      })

                                      props?.getSamples();

                                      setSubmitRequestSuccess(true);
                                      setSubmitting(false);
                                    } else {

                                      toast.error("Please fill all the required fields");
                                      setSubmitting(false);
                                    }
                                  }}
                                  className="text-center items-center p-4 mt-5 w-full text-white rounded-lg border border-white border-solid max-md:px-5 max-md:max-w-full">
                                  {submitting ? 'Submitting...' : 'Submit Request'}
                                </button>
                              </div>
                              <ToastContainer
                                position="top-center"
                                autoClose={5000}
                                hideProgressBar
                                newestOnTop={false}
                                rtl={false}
                                pauseOnFocusLoss
                                pauseOnHover
                                theme="dark"
                              />
                            </>
                          ) : (
                            <>
                              <div className="mt-3 text-xl font-semibold text-zinc-100 max-md:max-w-full">
                                Split Agreement 📝
                              </div>
                              <div className="mt-4 text-sm leading-6 text-justify text-stone-300 max-md:max-w-full">
                                To secure exclusive use of our samples in your
                                track, a split agreement is required. We
                                typically request a starting point of 1% of the
                                master recording royalty and 15% of the
                                publishing royalty. However, we're open to
                                negotiation to ensure a mutually beneficial
                                agreement. <br />
                                <br />
                                Simply fill out this form or attach your
                                split-sheet for us to review and sign with your
                                preferred royalty split for both master and
                                publishing. Once finalized, we'll send over the
                                signed copy for your records. Feel free to reach
                                out if you have any questions!
                              </div>
                              <div className="flex gap-2 mt-5 text-sm font-medium text-white max-md:flex-wrap">
                                <button className="flex-1 text-[13px] justify-center p-4 text-black bg-lime-300 rounded-lg w-[156px] h-[49px]">
                                  Request Split Sheet
                                </button>
                                <button
                                  onClick={() => setSubmitRequest(true)}
                                  className="flex-1 text-[13px]  justify-center p-4 rounded-lg border border-white border-solid max-md:px-5 w-[156px] h-[49px]"
                                >
                                  Submit Request
                                </button>
                                <button className="flex text-[13px]  flex-1 gap-2 justify-center p-4 rounded-lg border border-white border-solid max-md:px-5 w-[156px] h-[49px]">
                                  <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/201642e50a07306dd8b6a8d138b1a54999510c21cfaef3d392a2778316319b89?apiKey=dc17e74fd8f04620bba968dc4f90b76e&"
                                    className="shrink-0 self-start w-4 aspect-square"
                                  />
                                  <div className="underline">Attach File</div>
                                </button>
                              </div>
                            </>
                          )}
                        </>
                      )}
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

export default RequestSplitSheetModal;
