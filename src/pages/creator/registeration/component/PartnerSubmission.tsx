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
    <div className="flex items-center p-10 justify-center flex-col rounded-lg border border-eerieBlack text-white bg-darkGray">
      <h2 className="pb-2 text-[28px] font-semibold">Become a partner</h2>
      <p className="mb-5 font-normal text-sm text-mediumGray">
        Have you submitted your Partner Application?
      </p>
      <div>
        <form className="rounded-lg shadow-lg w-96" onSubmit={handleSubmit}>
          <div className="flex gap-5 h-40 pb-4 ">
            <div
              className={`border w-full flex justify-center items-center relative rounded-lg ${
                submittedApplication === true
                  ? "border-[#57AEFF] bg-[#282B30] text-white"
                  : "border-eclipseGray bg-jetBlack text-mediumGray"
              }`}
            >
              <input
                type="checkbox"
                name="submitted"
                value="yes"
                checked={submittedApplication === true}
                onChange={() => setSubmittedApplication(true)}
                className="absolute bg-transparent border border-eclipseGray top-2 rounded-full right-2"
              />
              <span className="font-semibold">Yes</span>
            </div>
            <div
              className={`border w-full flex justify-center items-center relative rounded-lg ${
                submittedApplication === false
                  ? "border-[#57AEFF] bg-[#282B30] text-white"
                  : "border-eclipseGray bg-jetBlack text-mediumGray"
              }`}
            >
              <input
                type="checkbox"
                name="submitted"
                value="no"
                checked={submittedApplication === false}
                onChange={() => setSubmittedApplication(false)}
                className="border border-eclipseGray bg-transparent absolute top-2 rounded-full right-2"
              />
              <span className="font-semibold">No</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-limeGreen text-jetBlack font-semibold rounded-full text-sm"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default BecomePartner;
