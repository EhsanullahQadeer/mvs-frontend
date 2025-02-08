import Dialog from "@mui/material/Dialog";
import React, { useEffect, useState } from "react";
import { ReactComponent as CancelIcon } from "../../../assets/icons/cancelIcon.svg";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";

import CardInfoDialog from "pages/Inbox/components/CardInfoDialog";
import { MdVerified } from "react-icons/md";
import { IoEllipsisHorizontal } from "react-icons/io5";

interface Props {
  openPurchaseOrder: boolean;
  setOpenPurchaseOrder: React.Dispatch<React.SetStateAction<boolean>>;
  setCreditPaymentAmount: (value: any) => void;
  handleSendMessage: () => void;
  setIsSubmitting?: (value: boolean) => void;
  username: string;
  handle: string;
  profileImg:string;
}

const serviceFeePercentage = 2.9;

const SendMessageModel = (props: Props) => {
  const {
    openPurchaseOrder,
    setOpenPurchaseOrder,
    setCreditPaymentAmount,
    handleSendMessage,
    setIsSubmitting,
    username,
    handle,
    profileImg

  } = props;

  const [basePrice, setBasePrice] = useState(0);

 

  const [tipAmount, setTipAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState<string>("0.00");
  const [discountCode, setDiscountCode] = useState<string>("");

  const [openCardInfo, setOpenCardInfo] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const subtotal = basePrice + tipAmount;
    const serviceFee = (subtotal * serviceFeePercentage) / 100;
    const total = subtotal + serviceFee;
    setTotalAmount(total.toFixed(2));
    setCreditPaymentAmount(Number(total.toFixed(2)));
  }, [tipAmount, basePrice]);

  const handleClose = () => {
    setOpenPurchaseOrder(false);
    setTipAmount(0);
    setIsSubmitting?.(false);
  };

  const handleOpenCardInfo = () => {
    setOpenCardInfo(true);
    setOpenPurchaseOrder(false);

  };

  const handleSendDemo = () => {
    handleSendMessage();
    setOpenPurchaseOrder(false);
  };

  return (
    <>
      <Dialog
        open={openPurchaseOrder}
        onClose={handleClose}
        sx={{
          zIndex: 9999,
          "& .MuiPaper-root": {
            backgroundColor: "#131313",
            padding: "0 24px",
            width:"700px",
            border: "1px solid #242424",
            borderRadius: "12px",
            overflow: "hidden",
          },
        }}
      >
        <div className="relative flex flex-col gap-2.5 overflow-hidden z-[100]">
          <div className="flex flex-col gap-2.5 sticky pt-[24px] pb-1 top-0 bg-darkGray">
            <div className="flex justify-between text-[20px] text-softGray items-center font-semibold">
              <h2>Send Message</h2>
              <div
                onClick={handleClose}
                className="rounded-full w-6 h-6 flex justify-center items-center bg-eclipseGray cursor-pointer text-coolGray"
              >
                <CancelIcon className="w-2 h-2" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 pr-1 overflow-y-auto custom-dropdown">
          <div className="flex justify-between text-[14px] text-grayishSilver">
                <span>Recipent</span>
              </div>
                  <div className="flex  bg-jetBlack border border-eclipseGray p-2 rounded-md items-center w-full justify-between">
                        <div className="flex w-fit items-center gap-2">
                          <div className="w-[42px] h-[42px] rounded-full">
                            <img
                              src={profileImg}
                              alt={username}
                              className="w-full rounded-full h-full object-cover"
                            />
                          </div>
                          <div className="flex flex-col">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[16px] text-white font-semibold">{username}</span>
                              <MdVerified className="text-limeGreen" />
                            </div>
                            <span className="text-[12px] text-mediumGray">@{handle}</span>
                          </div>
                        </div>
                      </div>
            <div className="flex flex-col text-[12px] gap-1 py-2 ">
              <div className="flex justify-between text-grayishSilver">
                <span>Price</span>
                <span>${basePrice}</span>
              </div>
              <div className="flex justify-between text-grayishSilver">
                <span>Service Fee ({serviceFeePercentage}%)</span>
                <span>${((basePrice + tipAmount) * serviceFeePercentage / 100).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[12px] text-grayishSilver ">
              <span className="font-semibold">Total Amount</span>
              <span className="text-limeGreen">${totalAmount}</span>
            </div>
            </div>
         

            <div>
              <h2 className="text-[16px] font-semibold py-2 text-softGray">Payment Method</h2>
              <div onClick={handleOpenCardInfo} className="relative">
                <span className="absolute inset-y-0 right-3 flex items-center text-dimGray">
                  <IoIosArrowDown />
                </span>
                <input
                  placeholder="None"
                        className="w-full hover:border-charcoalGray focus:border-transparent focus:outline-charcoalGray focus:outline-2 focus:outline-offset-0 text-sm p-[12px] bg-jetBlack border border-eclipseGray text-dimGray rounded-lg"
                />
              </div>
              <input
               value={discountCode}
               onChange={(e) => setDiscountCode(e.target.value)}
                  placeholder="Enter Discount Code"
                        className="w-full mt-1 justify-center text-center items-center flex hover:border-charcoalGray focus:border-transparent focus:outline-charcoalGray focus:outline-2 focus:outline-offset-0 text-sm p-[12px] bg-jetBlack border border-eclipseGray text-dimGray rounded-lg"
                />
            </div>
            <div className="border-t-[2px]  border-dashed text-grayishSilver text-[10px] py-2 border-eclipseGray">
                 By clicking continue, I am acknowledge that I a making a paymeny to send a message to a partner I understand that this payment is non-refundable
            </div>
          </div>

          <div className="flex justify-end pb-4 pt-1 gap-2">
            <button onClick={handleClose} className="border bg-jetBlack text-white py-[8px] px-4 rounded-full">Go Back</button>
            <button onClick={handleSendDemo} className="bg-limeGreen text-jetBlack py-[8px] px-4 rounded-full">Send Message</button>
          </div>
        </div>
      </Dialog>

      <CardInfoDialog openCardInfo={openCardInfo} setOpenCardInfo={setOpenCardInfo} formData={formData} setFormData={setFormData} />
    </>
  );
};

export default SendMessageModel;
