import React, { useState } from "react";

interface BecomePartnerProps {
  submittedApplication: boolean | null;
  setSubmittedApplication: (value: boolean | null) => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const BecomePartner: React.FC<BecomePartnerProps> = ({
  submittedApplication,
  setSubmittedApplication,
  isOpen,
  setIsOpen,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submittedApplication !== null) {
      console.log("Submitted application: ", submittedApplication);
      setIsOpen(false);
    }
  };

  return (
    isOpen && (
      <div className="flex items-center p-10  justify-center flex-col rounded-lg border border-[#1C1C1C] text-white bg-[#131313]">
        <h2 className=" font-semibold pb-2 text-3xl">Become a partner</h2>
        <p className="mb-4 text-sm text-[#999999]">
          Have you submitted your Partner Application?
        </p>
        <div className="">
          <form className="  rounded-lg shadow-lg w-96" onSubmit={handleSubmit}>
            <div className="flex   gap-5 h-40 pt-5 pb-4 ">
              <div
                className={`border w-full flex justify-center items-center relative rounded-lg border-[#242424] bg-[#0f0f0f] ${
                  submittedApplication === true ? "border-[#57AEFF]" : ""
                }`}
              >
                <input
                  type="checkbox"
                  name="submitted"
                  value="yes"
                  checked={submittedApplication === true}
                  onChange={() => setSubmittedApplication(true)}
                  className="absolute bg-transparent border border-[#242424] top-2 rounded-full right-2"
                />
                <span className="text-[#999999]  "> Yes</span>
              </div>
              <div
                className={`border w-full flex justify-center items-center relative rounded-lg border-[#242424] bg-[#0f0f0f] ${
                  submittedApplication === false ? "border-[#57AEFF]" : ""
                }`}
              >
                <input
                  type="checkbox"
                  name="submitted"
                  value="no"
                  checked={submittedApplication === false}
                  onChange={() => setSubmittedApplication(false)}
                  className="border border-[#242424] bg-transparent absolute top-2 rounded-full  right-2"
                />
                <span className="text-[#999999]">No</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#9EFF00] text-black font-bold rounded-full "
            >
              Next
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default BecomePartner;
