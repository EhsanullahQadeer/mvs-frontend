import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { MdCancel } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa6";
import { SiVisa } from "react-icons/si";
import StripeElements from "components/stripe/stripeElements";
interface BuyCreditsDialogProps {
  open: boolean;
  onClose: () => void;
  user?: any;
}

interface CreditOption {
  amount: number;
  price: number;
}

const creditOptions: CreditOption[] = [
  {
    amount: 10,
    price: 9.5,
  },
  {
    amount: 20,
    price: 18,
  },
  {
    amount: 50,
    price: 40,
  },
];

const BuyCredits: React.FC<BuyCreditsDialogProps> = ({ open, onClose, user }) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(0);
  const [promoCode, setPromoCode] = useState<string>("");
  const [availableCredits, setAvailableCredits] = useState<number>(user?.credits);
  const [chargeAmount, setChargeAmount] = useState<number>(9.5);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [secondOpen, setSecondOpen] = useState<boolean>(false);
  const handleAmountChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedAmount(parseInt(value));
    const price = parseFloat(creditOptions[parseInt(value)].price.toFixed(2) )|| 0;
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

  const handleBuyCredits = () => {
    setSecondOpen(true);
    onClose();
  };
  
  const handleBack = () => {
    setSecondOpen(false);
    onClose();           
  };
  const closeConfirmationDialog = () => {
    setSecondOpen(false);
    window.location.reload();
  };

  function getExpirationDate(){
    const today = new Date();
    today.setMonth(today.getMonth() + 1);
    return today.toLocaleDateString();
  }

  function firstDialog(){
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
            width: "440px",
          },
        }}
      >
        <DialogTitle className="flex w-full justify-between items-center">
          <div className="">Buy Credits</div>
          <div className="bg-w rounded-full">
            <MdCancel
              className="text-dimGray   cursor-pointer"
              onClick={onClose}
            />
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
                    {creditOptions.map((option,index) => (
                      <option key={index} value={index}>
                        {option.amount} credits for ${option.price.toFixed(2)}
                      </option>
                    ))}
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
                  {availableCredits + creditOptions[selectedAmount].amount}
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-dimGray text-[14px]">
                  These credits will expire on
                </span>
                <span className="text-[#fff] font-semibold text-[12px]">
                  {getExpirationDate()}
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
                      backgroundColor:"#9eff00" ,
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
                  <span className="text-red-500 text-[12px]">
                    {errorMessage}
                  </span>
                )}
              </div>
              <div className="w-full h-1 border-b-[2px] border-dashed my-2 border-dimGray"></div>
              <p className="text-[10px]">
                These credits will remain valid for one year from the date of
                purchase. Any unused credits will automatically carry over to
                the following match.
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
              backgroundColor:"#9eff00" ,
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
    )

  }
  function secondDialog(){
    const amount = chargeAmount + (chargeAmount * 0.029);
    return (      
    <Dialog
      open={secondOpen}
      onClose={closeConfirmationDialog}
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "#0F0F0F",
          border: "1px solid #1C1C1C",
          borderRadius: "16px",
          color: "#fff",
          width: "444px",
          overflow: "hidden",
        },
      }}
    >
      <DialogTitle >
        <div className="flex w-full justify-between items-center">
        <div
          className="text-platinum cursor-pointer "
        >
          <FaArrowLeft onClick={handleBack} className="text-[16px]" />
        </div>{" "}
        <div className="bg-w rounded-full">
          <MdCancel
            className="text-dimGray   cursor-pointer"
            onClick={closeConfirmationDialog}
          />
        </div>
        </div>
        <span className="font-medium mt-2 mb-6 ">Buy Credits</span>
      </DialogTitle>
      <DialogContent className="custom-dropdown overflow-y-auto">


        
        <div className=" w-full px-2 py-1 my-1 mb-2 text-[14px] bg-black border border-[#1C1C1C] rounded-md appearance-none">
          {creditOptions[selectedAmount].amount} credits for ${creditOptions[selectedAmount].price.toFixed(2)}
        </div>
        <div className="flex flex-col flex-1 text-[12px] gap-1 py-2  ">
            <div className="flex flex-col  text-grayishSilver">
              <div className="flex justify-between items-center">
                <span>Price</span>
                <span>${chargeAmount.toFixed(2)}</span>
              </div>
            </div>
            <div className="flex flex-col  text-grayishSilver">
              <div className="flex justify-between items-center">
                <span>Service Fee 2.9%</span>
                <span>${(chargeAmount * 0.029).toFixed(2)}</span>
              </div>
            </div>
            <div className="flex flex-col  text-grayishSilver">
              <div className="flex justify-between items-center">
                <span className="text-silver font-semibold text-[12px]">Total  Amount</span>
                <span className="text-limeGreen">${amount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        <div className="flex flex-col gap-0.5 mb-2">
          <span className="text-[#fff] font-medium text-[12px]">
            Select a billing method
          </span>
          <span className="text-dimGray text-[10px]">
            This will be your primary billing method across all contacts ,
            account activity and suvscriptions.
          </span>
        </div>
        <StripeElements buyCreditsComponentProps={{amount: amount, onClose: closeConfirmationDialog, creditsAmount: creditOptions[selectedAmount].amount}} />
        <p className="text-[10px] my-4 text-dimGray">
          By completing this transection , you are authorizing the change to your selected billing method. The total amount includes a 2.9% service fee.
          Please insure your billing  details up to date to avoid any interruptions. For more information on charges and fees , please review your <a href="" className="text-limeGreen">billing policies</a>
        </p>
      </DialogContent>
    </Dialog>)
  }

  return (
    <>
      {firstDialog()}
      {secondDialog()}
    </>
  );
};

export default BuyCredits;
