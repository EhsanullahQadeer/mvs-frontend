/*************************************************************************
 * @file PartnerSubmission.tsx
 * @author Ehsanullah Qadeer
 * @desc  
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

import NavigateBackButton from "components/buttons/NavigateBack";
import NavigateBack from "components/buttons/NavigateBack";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface BecomePartnerProps {
  registerAsPartner: boolean | null;
  setRegisterAsPartner: (value: boolean | null) => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const BecomePartner: React.FC<BecomePartnerProps> = ({
  registerAsPartner,
  setRegisterAsPartner,
  isOpen,
  setIsOpen,
}) => {

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerAsPartner !== null) {
      setIsOpen(false);
    }
  };

  return (
    <div className="flex items-center p-10 justify-center flex-col rounded-lg border border-eerieBlack text-white bg-darkGray">

      <h2 className="pb-2 text-[28px] font-semibold">
        Register
      </h2>

      <p className="mb-5 font-normal text-sm text-mediumGray">
        {/* What type of user are you? */}
      </p>
      <div>
        <form className="rounded-lg shadow-lg w-96" onSubmit={handleSubmit}>
          <div className="flex gap-5 h-40 pb-4">
            <div
              className={`border w-full flex justify-center items-center relative rounded-lg ${
                registerAsPartner === true
                  ? "border-[#57AEFF] bg-[#282B30] text-white"
                  : "border-eclipseGray bg-jetBlack text-mediumGray"
              }`}
            >
              <label className="flex items-center cursor-pointer relative w-full h-full justify-center">
                <input
                  type="radio"
                  name="submitted"
                  value="partner"
                  checked={registerAsPartner === true}
                  onChange={() => setRegisterAsPartner(true)}
                  className="absolute bg-transparent border border-eclipseGray top-2 rounded-full right-2"
                />
                <span className="font-semibold">Partner</span>
              </label>
            </div>

            {/* <div
              className={`border w-full flex justify-center items-center relative rounded-lg ${
                registerAsPartner === false
                  ? "border-[#57AEFF] bg-[#282B30] text-white"
                  : "border-eclipseGray bg-jetBlack text-mediumGray"
              }`}
            >
              <label className="flex items-center cursor-pointer relative w-full h-full justify-center">
                <input
                  type="radio"
                  name="submitted"
                  value="creator"
                  checked={registerAsPartner === false}
                  onChange={() => setRegisterAsPartner(false)}
                  className="absolute bg-transparent border border-eclipseGray top-2 rounded-full right-2"
                />
                <span className="font-semibold">Creator</span>
              </label>
            </div> */}
          </div>
          <div className="space-y-4">  {/* Flexbox with gap to add space between buttons */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-limeGreen text-jetBlack font-semibold rounded-full text-sm"
            >
              Next
            </button>
            <NavigateBackButton/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BecomePartner;
