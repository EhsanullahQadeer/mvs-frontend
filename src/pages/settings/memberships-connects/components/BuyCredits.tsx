import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { MdCancel } from "react-icons/md";

interface BuyCreditsDialogProps {
  open: boolean;
  onClose: () => void;
}

const BuyCredits: React.FC<BuyCreditsDialogProps> = ({ open, onClose }) => {
  const [selectedAmount, setSelectedAmount] = useState<string>("10");
  const [promoCode, setPromoCode] = useState<string>("");
  const [availableCredits, setAvailableCredits] = useState<number>(215);
  const [chargeAmount, setChargeAmount] = useState<number>(9.5);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleAmountChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedAmount(value);
    const price = parseFloat(value) || 0; 
    setChargeAmount(price);
  };

  const handleApplyPromoCode = () => {
    if (promoCode === "SAVE10") {
      setChargeAmount((prev) => prev * 0.9);
      setErrorMessage("");
    } else {
      setErrorMessage("Invalid promo code");
    }
  };

  // Handle buy credits action
  const handleBuyCredits = () => {
    const newCredits = availableCredits + parseInt(selectedAmount, 10);
    setAvailableCredits(newCredits);
    setPromoCode("");
    onClose(); // Close the dialog after purchase
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "#0F0F0F",
          border: "1px solid #1C1C1C",
          borderRadius: "16px",
          color: "#fff",
          width: "420px"
        },
      }}
    >
      <DialogTitle className="flex w-full justify-between items-center">
        <div className="">Buy Credits</div>
        <div className="bg-w rounded-full">
        <MdCancel className="text-dimGray   cursor-pointer" onClick={onClose} />

        </div>
      </DialogTitle>
      <DialogContent className="w-full custom-dropdown overflow-y-auto text-mediumGray">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col border-[#1C1C1C] border rounded-md gap-1 p-2 w-full">
            <span className="text-[14px] rounded-md">Available Credits</span>
            <span className="text-[#3D3D3D] text-[12px]">
              {availableCredits}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="amount" className="text-dimGray text-[14px]">
                Amount to buy
              </label>
              <div className="relative w-full">
                <select
                  id="amount"
                  value={selectedAmount}
                  onChange={handleAmountChange}
                  className="block w-full px-2 py-1 text-[14px] bg-black border border-[#1C1C1C] rounded-md appearance-none"
                >
                  <option value="10">10 credits for $9.50</option>
                  <option value="20">20 credits for $18.00</option>
                  <option value="50">50 credits for $40.00</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-dimGray text-[14px]">
                Your account will be charged
              </span>
              <span className="text-[#fff] font-semibold text-[12px]">
                ${chargeAmount.toFixed(2)} + Tax
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-dimGray text-[14px]">
                Your new credits balance
              </span>
              <span className="text-[#fff] font-semibold text-[12px]">
                {availableCredits + parseInt(selectedAmount, 10)}
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-dimGray text-[14px]">
                These credits will expire on
              </span>
              <span className="text-[#fff] font-semibold text-[12px]">
                November 15, 2025
              </span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-dimGray text-[14px]">Promo code</span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Enter code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="block w-full px-2 py-1 text-[14px] bg-black border border-[#1C1C1C] rounded-md"
                />
                <Button
                  onClick={handleApplyPromoCode}
                  sx={{
                    backgroundColor: "#A4FF57",
                    color: "#000",
                    borderRadius: "30px",
                    textTransform: "none",
                    fontSize: "14px",
                    padding: "8px 16px",
                    ":hover": {
                      backgroundColor: "#A4FF57",
                    },
                  }}
                >
                  Apply
                </Button>
              </div>
              {errorMessage && (
                <span className="text-red-500 text-[12px]">{errorMessage}</span>
              )}
            </div>
            <div className="w-full h-1 border-b-[2px] border-dashed my-2 border-dimGray"></div>
            <p className="text-[10px]">
              These credits will remain valid for one year from the date of
              purchase. Any unused credits will automatically carry over to the
              following match.
            </p>
            <p className="text-[10px]">
              By clicking "Buy Credit", you are authorizing the charge to your
              account. If you have sufficient funds available, the amount will
              be deducted from your balance. Otherwise, the total will be
              charged to your primary payment method.
            </p>
          </div>
        </div>
      </DialogContent>
      <DialogActions sx={{ padding: "16px" }}>
        <Button
          onClick={onClose}
          sx={{
            backgroundColor: "#1C1C1C",
            color: "#fff",
            borderRadius: "30px",
            textTransform: "none",
            fontSize: "14px",
            padding: "8px 16px",
            border: "1px solid #fff",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleBuyCredits}
          sx={{
            backgroundColor: "#A4FF57",
            color: "#000",
            borderRadius: "30px",
            textTransform: "none",
            fontSize: "14px",
            padding: "8px 16px",
            ":hover": {
              backgroundColor: "#A4FF57",
            },
          }}
        >
          Buy Credit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BuyCredits;
