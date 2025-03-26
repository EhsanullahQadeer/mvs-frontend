/*************************************************************************
 * @file feedback-contact.tsx
 * @author Karla Zamora
 * @desc Modal component combining feedback form and contact information with tabs.
 * 
 * @copyright (c) 2025 MVSSIVE. All rights reserved.
 *************************************************************************/

/* IMPORTS */
import Modal from "react-modal";
import { useState } from "react";

// API
import { sendUserFeedbackAPI } from "api/user";
import { Check, ContentCopy } from "@mui/icons-material";

const FeedbackContactModal = (props: any) => {

  const [activeTab, setActiveTab] = useState("feedback");
  const [feedbackType, setFeedbackType] = useState("bug");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [copied, setCopied] = useState({
    phone: false,
    email: false,
    instagram: false,
  });

  const handleSubmit = async () => {
    const payload = {
      feedback: feedbackMessage,
      type: feedbackType,
    };
    console.log({ payload });
    const response = await sendUserFeedbackAPI(payload);
    console.log({ response });

    setFeedbackType("bug");
    setFeedbackMessage("");
    props.setModal(false);
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied({
      ...copied,
      [type]: true,
    });
    setTimeout(() => {
      setCopied({
        ...copied,
        [type]: false,
      });
    }, 2000);
  };

  return (
    <Modal
      id="feedback-contact-modal"
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
            className="focus:outline-none"
            style={{ width: 500 }}
          >
            <div className="rounded-4xl relative py-8 px-8 ml-[80px]">
              <div className="flex flex-col justify-center px-10 py-9 rounded-lg border border-solid shadow bg-zinc-900 border-zinc-800 max-md:px-5 max-width-[100%]">
                {/* Close Button */}
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

                {/* Tab Navigation */}
                <div className="flex border-b border-zinc-700 mb-4">
                  <button
                    className={`px-4 py-2 font-[Mona-Sans-M] text-sm font-medium ${activeTab === "feedback"
                      ? "text-[#9EFF00] border-b-2 border-[#9EFF00]"
                      : "text-zinc-400 hover:text-zinc-200"
                      }`}
                    onClick={() => setActiveTab("feedback")}
                  >
                    Feedback
                  </button>
                  <button
                    className={`px-4 py-2 font-[Mona-Sans-M] text-sm font-medium ${activeTab === "contact"
                      ? "text-[#9EFF00] border-b-2 border-[#9EFF00]"
                      : "text-zinc-400 hover:text-zinc-200"
                      }`}
                    onClick={() => setActiveTab("contact")}
                  >
                    Contact Us
                  </button>
                </div>

                {/* Feedback Tab Content */}
                {activeTab === "feedback" && (
                  <div>
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
                  </div>
                )}

                {/* Contact Tab Content */}
                {activeTab === "contact" && (
                  <div>
                    <div className="mt-1 text-xl font-semibold text-zinc-100 max-md:max-w-full font-[Mona-Sans-M]">
                      Contact Us
                    </div>
                    <div className="mt-4 text-sm leading-6 text-left text-stone-300 max-md:max-w-full font-[Mona-Sans-M]">
                      For any questions about splits or agreements,
                      please text or email us directly! We reply within 24 hours.
                    </div>

                    <div className="inline-block flex-col px-2.5 pt-2.5 mt-3.5 text-xs text-white rounded-lg border border-solid bg-neutral-900 border-neutral-800 max-md:max-w-full font-[Mona-Sans-M]">

                      {/* Phone Number */}
                      <div className="flex gap-3 p-5 mt-5 relative group">
                        {/* eslint-disable-next-line */}
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/ed6818d62695dd0d38418a9dedf6d1b4566850fac804ff4e2d50f1328e1a6d47?apiKey=dc17e74fd8f04620bba968dc4f90b76e&"
                          className="shrink-0 w-6 aspect-square"
                        />
                        <a href="tel:+16262647419" className="my-auto underline hover:text-lime-500 transition-colors">
                          +1 (626) 264-7419
                        </a>
                        <button
                          onClick={() => copyToClipboard("+1 (626) 264-7419", "phone")}
                          className="opacity-10 group-hover:opacity-100 transition-opacity flex items-center text-gray-400 hover:text-white"
                        >
                          {copied.phone ? <Check sx={{ fontSize: 14 }} className="text-lime-500" /> : <ContentCopy sx={{ fontSize: 14 }} />}
                        </button>
                      </div>

                      {/* WhatsApp */}
                      <div className="flex gap-3 p-5 mt-2 whitespace-nowrap relative group">
                        {/* eslint-disable-next-line */}
                        <img
                          loading="lazy"
                          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/ca6e8937359d7dcbaab61c4a9b9e8a476bb5a5c7dc44d60340b33687fd3396fa?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/ca6e8937359d7dcbaab61c4a9b9e8a476bb5a5c7dc44d60340b33687fd3396fa?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/ca6e8937359d7dcbaab61c4a9b9e8a476bb5a5c7dc44d60340b33687fd3396fa?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/ca6e8937359d7dcbaab61c4a9b9e8a476bb5a5c7dc44d60340b33687fd3396fa?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/ca6e8937359d7dcbaab61c4a9b9e8a476bb5a5c7dc44d60340b33687fd3396fa?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/ca6e8937359d7dcbaab61c4a9b9e8a476bb5a5c7dc44d60340b33687fd3396fa?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/ca6e8937359d7dcbaab61c4a9b9e8a476bb5a5c7dc44d60340b33687fd3396fa?apiKey=dc17e74fd8f04620bba968dc4f90b76e&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/ca6e8937359d7dcbaab61c4a9b9e8a476bb5a5c7dc44d60340b33687fd3396fa?apiKey=dc17e74fd8f04620bba968dc4f90b76e&"
                          className="shrink-0 w-7 aspect-square"
                        />
                        <a href="https://wa.me/16262647419" target="_blank" rel="noopener noreferrer" className="my-auto underline hover:text-lime-500 transition-colors">WhatsApp</a>
                      </div>

                      {/* Email */}
                      <div className="flex gap-3 p-5 mt-2 whitespace-nowrap relative group">
                        {/* eslint-disable-next-line */}
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/5bc50b322f9f7f8d11c6aaa95b4505de1a79c985ef7585281e8621378b114ae5?apiKey=dc17e74fd8f04620bba968dc4f90b76e&"
                          className="shrink-0 w-6 aspect-square"
                        />
                        <a href="mailto:soundboyzofficial@gmail.com" className="my-auto underline hover:text-lime-500 transition-colors">
                          soundboyzofficial@gmail.com
                        </a>
                        <button
                          onClick={() => copyToClipboard("soundboyzofficial@gmail.com", "email")}
                          className="opacity-10 group-hover:opacity-100 transition-opacity flex items-center text-gray-400 hover:text-white"
                        >
                          {copied.email ? <Check sx={{ fontSize: 14 }} className="text-lime-500" /> : <ContentCopy sx={{ fontSize: 14 }} />}
                        </button>
                      </div>

                      <div className="shrink-0 h-2.5 border-b border-solid border-stone-900 max-md:max-w-full" />

                      {/* Instagram */}
                      <div className="flex gap-3 p-5 mt-2 whitespace-nowrap relative group">
                        {/* eslint-disable-next-line */}
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/6c295ae726afc2362827dcb2b4fc4f2ff4a14b879be51d65d5f255ecd191b4a0?apiKey=dc17e74fd8f04620bba968dc4f90b76e&"
                          className="shrink-0 w-6 aspect-square"
                        />
                        <a href="https://www.instagram.com/soundboyz.als/" target="_blank" rel="noopener noreferrer" className="my-auto underline hover:text-lime-500 transition-colors">
                          @soundboyz.als
                        </a>
                        <button
                          onClick={() => copyToClipboard("@soundboyz.als", "instagram")}
                          className="opacity-10 group-hover:opacity-100 transition-opacity flex items-center text-gray-400 hover:text-white"
                        >
                          {copied.instagram ? <Check sx={{ fontSize: 14 }} className="text-lime-500" /> : <ContentCopy sx={{ fontSize: 14 }} />}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default FeedbackContactModal; 