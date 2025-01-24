// src/components/Memberships.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as MLogo } from "../../../../assets/img/MLogo.svg";
import BuyCredits from "./BuyCredits";

const Memberships = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const handlePlan = () => {
    navigate("/settings/plans/1");
  };

  const handleBuyCreditsClick = () => {
    setOpenDialog(true); // Open the Buy Credits dialog
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog
  };

  return (
    <>
      <div className="flex items-center gap-5 py-5">
        <div className="flex-1 border border-eerieBlack rounded-xl p-5">
          <div className="flex justify-between gap-1">
            <div className="flex gap-3.5">
              <div className="w-[54px] h-[54px] rounded-lg bg-black flex justify-center items-center">
                <MLogo />
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-white text-base font-semibold">Advance</h3>
                <p className="text-mediumGray text-xs font-normal">
                  $99.99/mo with 100 monthly credits
                </p>
                <p className="text-dimGray text-xs font-semibold">
                  215 credits remaining
                </p>
              </div>
            </div>

            <div>
              <div
                onClick={handlePlan}
                className="bg-limeGreen rounded-[30px] py-2 px-3 text-xs font-normal text-jetBlack cursor-pointer whitespace-nowrap"
              >
                Change Plan
              </div>

              <div className="w-max float-right mt-2 rounded-[30px] cursor-pointer py-2 px-3 text-xs font-normal text-platinum">
                Cancel
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 border border-eerieBlack rounded-xl p-5">
          <div className="flex justify-between gap-1">
            <div className="flex flex-col gap-2">
              <h3 className="text-white text-base font-semibold">Credits balance</h3>
              <p className="text-mediumGray text-xs font-normal">215</p>
              <p className="text-mediumGray text-xs font-semibold">
                Learn more about how to use{" "}
                <span className="text-limeGreen">Credits</span>
              </p>
            </div>

            <div>
              <div
                onClick={handleBuyCreditsClick}
                className="bg-limeGreen rounded-[30px] py-2 px-3 text-xs font-normal text-jetBlack cursor-pointer whitespace-nowrap"
              >
                Buy Credits
              </div>
            </div>
          </div>
        </div>
      </div>

      <BuyCredits open={openDialog} onClose={handleCloseDialog} />
    </>
  );
};

export default Memberships;
