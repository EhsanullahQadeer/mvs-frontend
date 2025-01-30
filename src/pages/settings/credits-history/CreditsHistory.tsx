import React, { useState } from "react";
import Theme from "theme";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import CreditDetailDropDown from "./components/CreditDetailDropDown";
import SimpleTable from "../memberships-connects/components/SimpleTable";
import { billingListArr } from "../memberships-connects/sampleData";
import BuyCredits from "../memberships-connects/components/BuyCredits";

const columns = [
  {
    id: "date",
    label: "Date",
    maxWidth: "250px",
    format: (value: string) => formatDate(value),
  },
  { id: "action", label: "Action" },
  { id: "credits", label: "Credits", maxWidth: "250px" },
];

const formatDate = (dateString: string | number) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
};

const CreditsHistory = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog
  };

  const handleBuyCreditsClick = () => {
    setOpenDialog(true); // Open the Buy Credits dialog
  };

  const handleOptionChange = (value: string) => {
    console.log("Selected Option:", value); // Logs the selected value
    setSelectedOption(value); // Update the selected option state
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Theme>
      <div>
        <div className="flex gap-3 px-4 py-5 border-b border-eclipseGray">
          <div
            onClick={handleBack}
            className="text-platinum cursor-pointer w-max"
          >
            <FaArrowLeft />
          </div>
        </div>
        <div className="px-4 my-5">
          <div className="px-2.5 py-2.5">
            <h2 className="text-2xl text-white font-semibold">
              Credits History
            </h2>
            <p className="mt-2 text-lg text-mediumGray font-normal">
              View your recent credits usage and transaction history.
            </p>
          </div>
          <div className="flex items-end gap-5 py-5">
            <div className="flex-1 border border-eerieBlack rounded-xl p-5">
              <div className="flex justify-between gap-1">
                <div className="flex flex-col gap-2">
                  <h3 className="text-white text-base font-semibold">
                    Credits balance
                  </h3>
                  <p className="text-mediumGray text-xs font-normal">215</p>
                  <p className="text-mediumGray text-xs font-semibold">
                    Learn more about how to use{" "}
                    <span className="text-limeGreen">Credits</span>
                  </p>
                </div>

                <div>
                  {/* Added onClick handler here */}
                  <div
                    onClick={handleBuyCreditsClick}
                    className="bg-limeGreen rounded-[30px] py-2 px-3 text-xs font-normal text-jetBlack cursor-pointer whitespace-nowrap"
                  >
                    Buy Credits
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <CreditDetailDropDown
                label="Credits type"
                options={["Option 1", "Option 2", "Option 3", "Option 4"]}
                selectedValue={selectedOption}
                onChange={handleOptionChange}
                showText="All Credits"
              />
              <CreditDetailDropDown
                label="Date"
                options={["Option 1", "Option 2", "Option 3", "Option 4"]}
                selectedValue={selectedOption}
                onChange={handleOptionChange}
                showText="Last 7 days"
              />
            </div>
          </div>
          <SimpleTable columns={columns} rows={billingListArr} />
        </div>
      </div>
      {/* Pass open and onClose props to the BuyCredits component */}
      <BuyCredits open={openDialog} onClose={handleCloseDialog} />
    </Theme>
  );
};

export default CreditsHistory;
