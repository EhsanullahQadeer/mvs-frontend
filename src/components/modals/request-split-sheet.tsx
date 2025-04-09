/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { submitSplitSheetRequest } from "redux/actionCreators/sounds";
import { ToastContainer, toast } from "react-toastify";

import { DEF_MASTER_OFFER, DEF_PUBLISHING_OFFER } from "../../constants"
import config from "config/config";
import axios from "util/axios";

const RequestSplitSheetModal = (props: any) => {
  const [submit_request, setSubmitRequest]  = useState(false);
  const [submit_proposal, setSubmitProposal] = useState(false);
  const [submit_request_success, setSubmitRequestSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [master_offer, setMasterOffer] = useState(null);
  const [publisher_offer, setPublisherOffer] = useState(null);
  const [sample_file_name, setSampleFileName] = useState(null);
  const [sample_file_type, setSampleFileType] = useState(null);
  const [sample_file_size, setSampleFileSize]: any = useState(0);
  const [sample_file_loaded, setSampleFileLoaded]: any = useState(0);
  const [sample_file_progress, setSampleFileProgress] = useState(false);
  const [sample_file, setSampleFile]: any = useState(null);



  // File handler
  const fileInputRef = useRef(null);
  const MAX_FILE_SIZE_MB = 10;
  const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024; // 1 MB in bytes


  const handleButtonClick = () => {
    fileInputRef.current.click(); // Simulate a click on the file input
  };

  const handleFileChange = async (event) => {
    setSubmitting(true);
    const payload = {
      "sample_id": props.sample.id,
      "master_offer": null,
      "publisher_offer": null,
      "document": null
    }
    
    const file = event.target.files[0];

    // Calculate file size in MB
    const fileSizeMB = file.size / (1024 * 1024);

    // Check if the file size exceeds the maximum limit
    if (fileSizeMB > MAX_FILE_SIZE_MB) {
        alert(`File is too large! Please upload a file smaller than ${MAX_FILE_SIZE_MB} MB.`);
        return; // Stop further execution
    }

    // Set file details
    setSampleFileName(file.name);
    setSampleFileType(file.type);
    setSampleFileSize(fileSizeMB.toFixed(2));

    // Prepare form data
    const formData = new FormData();
    formData.append("file", file);

    await axios.post(`${config.defaults.api_url}/sounds/upload/sample`, formData, {
      onUploadProgress(progressEvent: any) {

            setSampleFileLoaded((progressEvent.loaded / (1024 * 1024)).toFixed(2))

            setSampleFileProgress(true)
        },
    }).then((data: any) => {
        setSampleFileProgress(false);

        toast.success("Sample file uploaded to storage successfully!");

        console.log("DATA: ", data.data.Location);
        payload.document = data.data.Location;
        setSampleFile(data.data.Location);
    }).catch((error) => {
        alert("There is some error uploading sample file. please try again later");
        return;
    });
  await submitSplitSheetRequest(payload);
  setSubmitRequestSuccess(true);
  setSubmitting(false);
  
  };

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
                          {/* SUBMIT REQUEST */}
                          {submit_proposal ? (
                            <>
                              <div className="flex flex-col self-stretch text-sm font-medium max-w-[495px] text-zinc-400">
                                <div className="w-full text-xl font-semibold text-neutral-300 max-md:max-w-full">
                                  Split Info: 
                                </div>

                                <div className="mt-4 text-sm leading-6 text-justify text-stone-300 max-md:max-w-full">
                                  By submitting this proposal, you are agreeing to
                                  the following terms.
                                </div>

                                {/* Master Offer */}
                                <div className="mt-6 w-full text-base max-md:max-w-full">
                                  Master Offer:
                                </div>

                                <div className="justify-center items-start p-5 mt-3.5 w-full rounded-xl border border-solid border-stone-500 border-opacity-30 text-stone-500 max-md:max-w-full">
                                  <span className=" text-stone-500">
                                    {`${DEF_MASTER_OFFER}%`}
                                  </span>
                                </div>

                                {/* Publishing Offer */}
                                <div className="mt-7 w-full text-base max-md:max-w-full">
                                  Publishing Offer:
                                </div>

                                <div className="justify-center items-start p-5 mt-3.5 w-full rounded-xl border border-solid border-stone-500 border-opacity-30 text-stone-500 max-md:max-w-full">
                                  <span className=" text-stone-500">
                                    {`${DEF_PUBLISHING_OFFER}%`}
                                  </span>
                                </div>

                                {/* Sample Name */}
                                <div className="mt-7 w-full text-base max-md:max-w-full">
                                  Sample Name:
                                </div>
                                <div className="justify-center items-start p-5 mt-3.5 w-full rounded-xl border border-solid border-stone-500 border-opacity-30 text-stone-500 max-md:max-w-full">
                                  <span className=" text-stone-500">
                                    {props.sample.filename}
                                  </span>
                                </div>

                                {/* SUBMIT PROPOSAL */}
                                <>
                                  <div className="flex justify-center">
                                    <button
                                      disabled={submitting}
                                      onClick={async () => {
                                        setSubmitting(true);
                                        // Submit proposal request
                                        await submitSplitSheetRequest({
                                          sample_id: props.sample.id,
                                          publisher_offer: parseInt(DEF_PUBLISHING_OFFER),
                                          master_offer: parseInt(DEF_MASTER_OFFER)
                                        })
                                        setSubmitRequestSuccess(true);
                                        setSubmitting(false);
                                      }}
                                      className="text-center items-center p-4 mt-5 w-full text-white rounded-lg border border-gray border-solid max-md:px-5 max-md:max-w-full bg-lime-800 mr-4">
                                      {submitting ? 'Submitting...' : 'Submit Request'}
                                    </button>

                                    {/* RETURN BUTTON */}
                                    <button
                                      disabled={submitting}
                                      onClick={() => setSubmitProposal(false)}
                                      className="text-center items-center p-4 mt-5 w-full text-white rounded-lg border border-white border-solid max-md:px-5 max-md:max-w-full bg-gray-800">
                                      Return
                                    </button>
                                  </div>
                                </>
                              </div>
                              <ToastContainer
                                position="top-center"
                                autoClose={5000}
                                hideProgressBar
                                newestOnTop={false}
                                rtl={false}
                                pauseOnFocusLoss
                                pauseOnHover
                                theme="dark"/>
                            </>
                          ) : submit_request ? (
                            <>
                              <div className="flex flex-col self-stretch text-sm font-medium max-w-[495px] text-zinc-400">
                                <div className="w-full text-xl font-semibold text-neutral-300 max-md:max-w-full">
                                  Split Info:
                                </div>

                                <div className="mt-4 text-sm leading-6 text-justify text-stone-300 max-md:max-w-full">
                                  Fill in the details below to create a new split sheet.
                                </div>

                                {/* Master Offer */}
                                <div className="mt-6 w-full text-base max-md:max-w-full">
                                  Master Offer:
                                </div>

                                <input
                                  type="text"
                                  placeholder="e.g - 4%"
                                  onChange={(e) => setMasterOffer(e.target.value)}
                                  className="bg-transparent w-full rounded-xl border-[#66666659] justify-center items-start p-5 mt-4 w-full rounded-xl border border-solid border-stone-500 border-opacity-30 text-stone-500 max-md:max-w-full"/>

                                {/* Publishing Offer */}
                                <div className="mt-7 w-full text-base max-md:max-w-full">
                                  Publishing Offer:
                                </div>

                                <input
                                  type="text"
                                  placeholder="e.g - 25%"
                                  onChange={(e) => setPublisherOffer(e.target.value)}
                                  className="bg-transparent w-full rounded-xl border-[#66666659] justify-center items-start p-5 mt-4 w-full rounded-xl border border-solid border-stone-500 border-opacity-30 text-stone-500 max-md:max-w-full"/>

                                {/* Sample Name */}
                                <div className="mt-7 w-full text-base max-md:max-w-full">
                                  Sample Name:
                                </div>
                                <div className="justify-center items-start p-5 mt-3.5 w-full rounded-xl border border-solid border-stone-500 border-opacity-30 text-stone-500 max-md:max-w-full">
                                  e.g -{" "}
                                  <span className=" text-stone-500">
                                    {props.sample.filename}
                                  </span>
                                </div>

                                {/* SUBMIT REQUEST */}
                                <>
                                 <div className="flex justify-center">
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
                                            sample_id: props.sample.id,
                                            publisher_offer,
                                            master_offer,
                                          })
                                          // props?.getSamples();
                                          setSubmitRequestSuccess(true);
                                          setSubmitting(false);
                                        } else {
                                          toast.error("Please fill all the required fields");
                                          setSubmitting(false);
                                        }
                                      }}
                                      className="text-center items-center p-4 mt-5 w-full text-white rounded-lg border border-white border-solid max-md:px-5 max-md:max-w-full bg-lime-800 mr-4">
                                      {submitting ? 'Submitting...' : 'Submit Proposal'}
                                    </button>

                                    <button
                                      disabled={submitting}
                                      onClick={() => setSubmitRequest(false)}
                                      className="text-center items-center p-4 mt-5 w-full text-white rounded-lg border border-white border-solid max-md:px-5 max-md:max-w-full bg-gray-500">
                                      Return
                                    </button>
                                  </div>
                                </>
                              </div>
                              
                              <ToastContainer
                                position="top-center"
                                autoClose={5000}
                                hideProgressBar
                                newestOnTop={false}
                                rtl={false}
                                pauseOnFocusLoss
                                pauseOnHover
                                theme="dark"/>
                            </>
                          ) : (
                            <>
                              <div className="mt-3 text-xl font-semibold text-zinc-100 max-md:max-w-full">
                                Split Agreement 📝
                              </div>
                              <div className="mt-4 text-sm leading-6 text-justify text-stone-300 max-md:max-w-full">
                              Submit Request: Submitting a split sheet confirms your agreement to standard terms for 
                              exclusive sample use. A split agreement is required. Our composers typically request a 
                              minimum of 1% master royalty, 15% writer's share, and 15% publisher's share, but we're 
                              open to negotiation for a fair deal. <br/>
                              <br/>

                              Submit Proposal: Click the button to fill the form or attach your split sheet 
                              (preferred royalty split included). We'll review, sign, & send back your copy! 
                              Questions? We're here to help. <br/>
                              <br/>

                              Attach File: To expedite approval, please submit a completed split sheet outlining 
                              the agreed-upon ownership percentages for all collaborators. Ensure all parties have 
                              signed the document before sending it for our review and final signature. We recommend 
                              finalizing terms with collaborators beforehand. <br/>
                              <br/>

                              </div>
                              <div className="flex gap-2 mt-5 text-sm font-medium text-white max-md:flex-wrap">

                                {/* SUBMIT REQUEST */}
                                <button
                                onClick={() => setSubmitRequest(true)}
                                className="flex-1 text-[13px] justify-center p-4 text-black bg-[#C4FF48] rounded-lg w-[156px] h-[49px]">
                                  Submit Proposal
                                </button>

                                {/* SUBMIT PROPOSAL */}
                                <button
                                  onClick={() => setSubmitProposal(true)}
                                  className="flex-1 text-[13px] justify-center p-4 text-black bg-[#FFEB3B] rounded-lg w-[156px] h-[49px]">
                                  Submit Request
                                </button>

                                {/* ATTACH FILE */}
                                <button
                                  className="flex items-center text-[13px] justify-center p-4 text-gray-900 bg-gray-500 rounded-lg w-[156px] h-[49px]"
                                  onClick={handleButtonClick}
                                >
                                  <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/201642e50a07306dd8b6a8d138b1a54999510c21cfaef3d392a2778316319b89?apiKey=dc17e74fd8f04620bba968dc4f90b76e&"
                                    className="shrink-0 self-start w-4 aspect-square flex"
                                  />
                                  <div className="mr-2 text-gray">Attach File</div>
                                </button>
                                <input
                                  type="file"
                                  accept="application/pdf"
                                  style={{ display: 'none' }}
                                  ref={fileInputRef}
                                  onChange={handleFileChange}
                                />
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
