/*************************************************************************
 * @file feedback.tsx
 * @author Karla Zamora
 * @desc Modal component for sending feedback.
 * 
 * @copyright (c) 2025 MVSSIVE. All rights reserved.
 *************************************************************************/

/* IMPORTS */
import Modal from "react-modal";
import { useState } from "react";

// API
import { sendUserFeedbackAPI } from "api/user";

const FeedbackModal = (props: any) => {
  const [feedbackType, setFeedbackType] = useState("bug");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleSubmit = async () => {
    const payload = {
      feedback: feedbackMessage,
      type: feedbackType,
    };
    console.log({ payload });
    const response = await sendUserFeedbackAPI(payload);
    console.log({ response });
    // Reset form and close modal
    setFeedbackType("bug");
    setFeedbackMessage("");
    props.setModal(false);
  };

  return (
    <Modal
      id="feedback-modal"
      ariaHideApp={false}
      className="bg-transparent"
      isOpen={props.openModal}
      onRequestClose={() => props.setModal(false)}
      style={{
        overlay: {
          zIndex: 20,
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
      <div className="z-modal animate-fade-in fixed left-0 top-0 flex flex-col items-stretch w-full h-screen overflow-y-auto custom-dropdown">
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
                  {/* eslint-disable-next-line */}
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/017c22613a8e414ec7a32ffbe1bbc0ab7f8dca0b759aae1f05ac1e874e4d328e?apiKey=dc17e74fd8f04620bba968dc4f90b76e&"
                    className="w-[24px] h-[24px] aspect-square fill-neutral-600"
                  />
                </button>

                {/* start */}

                <div className="mt-1 text-xl font-semibold text-zinc-100 max-md:max-w-full font-[Mona-Sans-M]">
                  We Value Your Feedback!
                </div>
                <div className="mt-4 text-sm leading-6 text-left text-stone-300 max-md:max-w-full font-[Mona-Sans-M]">
                  Help us improve by sharing your thoughts. What did you like? What could be better? Your feedback makes a difference!
                </div>

                <div className="flex flex-col px-2.5 pt-2.5 mt-3.5 text-xs text-white rounded-lg border border-solid bg-neutral-900 border-neutral-800 max-md:max-w-full font-[Mona-Sans-M]">
                  
                  {/* Feedback Type Dropdown */}
                  <div className="px-4 py-3">
                    <label className="block mb-2 text-sm font-medium text-stone-300">
                      Feedback Type
                    </label>
                    <select
                      value={feedbackType}
                      onChange={(e) => setFeedbackType(e.target.value)}
                      className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-lime-500"
                    >
                      <option value="bug">Bug</option>
                      <option value="feature_request">Feature Request</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  {/* Feedback Message Textarea */}
                  <div className="px-4 py-3">
                    <label className="block mb-2 text-sm font-medium text-stone-300">
                      Your Feedback
                    </label>
                    <textarea
                      value={feedbackMessage}
                      onChange={(e) => setFeedbackMessage(e.target.value)}
                      placeholder="Share your thoughts with us..."
                      className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-lime-500 min-h-[120px] resize-y custom-dropdown"
                      maxLength={255}
                    />
                    <div className="flex justify-end mt-1">
                      <span className="text-xs text-stone-400">
                        {feedbackMessage.length}/255
                      </span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="px-4 py-3 flex justify-center">
                    <button
                      onClick={handleSubmit}
                      className="px-6 py-2 bg-[#9EFF00] hover:bg-[#9EFF00]/80 text-black font-medium rounded-md transition-colors"
                    >
                      Submit Feedback
                    </button>
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
  );
}
export default FeedbackModal;