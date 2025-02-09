import Dialog from "@mui/material/Dialog";
import React, { useEffect, useState } from "react";
import { ReactComponent as CancelIcon } from "../../../assets/icons/cancelIcon.svg";
import { FaRegCircleQuestion } from "react-icons/fa6";
import CardInfoDialog from "./CardInfoDialog";
import { IoIosArrowDown } from "react-icons/io";
import { IConversation } from "./types";
import { getUserByIdAPI } from "../../../api/user";

interface Props {
  openPurchaseOrder: boolean;
  setOpenPurchaseOrder: React.Dispatch<React.SetStateAction<boolean>>;
  setCreditPaymentAmount: (value: any) => void;
  handleSendMessage: () => void;
  conversation: IConversation;
  setIsSubmitting?: (value:boolean)=> void;
}

const serviceFeePercentage = 2.9;

const PurchaseOrderDialog = (props: Props) => {
  const {
    openPurchaseOrder,
    setOpenPurchaseOrder,
    conversation,
    setCreditPaymentAmount,
    handleSendMessage,
    setIsSubmitting,
  } = props;
  const { thumbnail, displayName } = conversation || {};

  const recipientId = conversation?.recipient_id;
  const [basePrice, setBasePrice] = useState(0);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!recipientId) return;
      const response = await getUserByIdAPI(recipientId?.toString());
      setBasePrice(response.data?.demo_fee || 0);
    };
    fetchUserInfo();
  }, [recipientId]);

  const [inputTipAmount, setInputTipAmount] = useState("");
  const [tipAmount, setTipAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState<string>("0.00");
  const [discountCode, setDiscountCode] = useState<string>("");

  const [openCardInfo, setOpenCardInfo] = useState(false);

  const [formData, setFormData] = useState({});

  const handleMatchBid = () => {};

  const handleTipAmountChange = (event: any) => {
    let inputValue = event.target.value;

    const validPricePattern = /^\$?\d*\.?\d{0,2}$/;

    let numericValue = inputValue.replace("$", "");

    if (validPricePattern.test(inputValue)) {
      setTipAmount(numericValue ? parseFloat(numericValue) : 0);

      if (numericValue && !inputValue.startsWith("$")) {
        inputValue = "$" + numericValue;
      }

      setInputTipAmount(inputValue);
    }
  };

  const handleClose = () => {
    setOpenPurchaseOrder(false);
    setTipAmount(0);
    setInputTipAmount("");
    setIsSubmitting(false);
  };
  const handleBack = () => {
    setOpenPurchaseOrder(true);
    setOpenCardInfo(false);

  };
  const handleOpenCardInfo = () => {
    setOpenCardInfo(true);
  };

  const handleSendDemo = () => {
    handleSendMessage();
    setOpenPurchaseOrder(false);
  };

  useEffect(() => {
    const subtotal = basePrice + tipAmount;
    const serviceFee = (subtotal * serviceFeePercentage) / 100;
    const total = subtotal + serviceFee;
    setTotalAmount(total.toFixed(2));
    setCreditPaymentAmount(Number(total.toFixed(2)));
  }, [tipAmount, basePrice]);

  const subtotal = basePrice + tipAmount;
  const serviceFee = (subtotal * serviceFeePercentage) / 100;

  return (
    <div style={{ zIndex: 99999 }}>
      <Dialog
        open={openPurchaseOrder}
        onClose={handleClose}
        sx={{
          zIndex: 9999,
          "& .MuiPaper-root": {
            backgroundColor: "#131313",
            padding: "0 24px",
            marginTop: "0px",
            marginBottom: "0px",
            border: "1px solid #242424",
            borderRadius: "12px",
            overflow: "hidden",
          },
        }}
      >
        <div className="relative flex flex-col gap-2.5 overflow-hidden z-[100]">
          <div className="flex flex-col gap-2.5 sticky pt-[24px] z-40 pb-1 top-0 bg-darkGray">
            <div className="flex justify-between text-[20px] text-softGray items-center font-semibold">
              <h2>Purchase Order</h2>
              <div
                onClick={handleClose}
                className="rounded-full w-6 h-6 flex justify-center items-center bg-eclipseGray cursor-pointer text-coolGray"
              >
                <CancelIcon className="w-2 h-2" />
              </div>
            </div>
            <div className="flex gap-2 z-30 items-center">
              <div
                style={{
                  background:
                    "linear-gradient(141.84deg, #0258A5 4.32%, #9EFF00 94.89%)",
                }}
                className="flex rounded-full p-0.5 w-10 h-10 aspect-square"
              >
                <img
                  alt=""
                  loading="lazy"
                  src={thumbnail}
                  className="object-cover w-full h-full rounded-full border-[2px] border-[#151515]"
                />
              </div>
              <div className="flex flex-col gap-0.5 text-[14px]">
                <div className="text-sm font-semibold text-white">
                  {displayName}
                </div>
                <div className="text-[12px] text-silver font-normal">
                  Los Angeles, CA
                </div>
              </div>
            </div>
            <div>
              <p className="text-[12px] text-grayishSilver">
                You are about to pay the Partner's fee to unlock their inbox.
                This transaction allows you to submit one audio demo for the
                Partner to review.
              </p>
            </div>
            <div className="flex justify-center items-center">
              <div className="mb-2.5 w-[96%] h-[2px] border-b border-dashed border-charcoalGray"></div>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 pr-1 overflow-y-auto custom-dropdown">
            <div className="flex flex-col leading-4 flex-1 gap-[12px]">
              <div className="flex justify-between w-full items-center">
                <div className="flex gap-1  items-center">
                  <h2 className="text-[23px] font-semibold  leading- text-softGray ">
                    Things To Know
                  </h2>
                  <span className="text-dimGray text-[10px]">(Optional)</span>
                </div>
                <div className="text-[#A1A1A1] w-4 h-4">
                  <FaRegCircleQuestion />
                </div>
              </div>
              <div className="flex text-[12px] items-center gap-0.5">
                <li className="text-white font-semibold">
                  Adding a Tip:{" "}
                  <span className=" text-mediumGray font-medium">
                    Attaching a tip will increase the chances of getting a
                    reply...
                  </span>
                </li>
              </div>
              <div className="flex text-[12px] text-white  gap-0.5">
                <li></li>
                <span className=" font-semibold">
                  Inbox Priority:{" "}
                  <span className=" text-mediumGray font-medium">
                    The message with the highest bid will be prioritized at the
                    top of the Partner's inbox.
                  </span>
                </span>
              </div>
              <div className="flex text-[12px] text-white  gap-0.5">
                <li></li>
                <span className=" font-semibold">
                  Response Rate:{" "}
                  <span className=" text-mediumGray font-medium">
                    Partners are more inclined to respond to messages with tips.
                  </span>
                </span>
              </div>
              <div className="flex text-[12px] text-white  gap-0.5">
                <li></li>
                <span className=" font-semibold">
                  Charge:{" "}
                  <span className=" text-mediumGray font-medium">
                    You will only be charged once partner sends you feedback and
                    a voicememo.
                  </span>
                </span>
              </div>
            </div>

            <div className="flex items-center py-1 flex-1 gap-4">

              {/* <div className="flex gap-[5px] flex-col w-full">
                <span className="text-silver text-[12px]">Tip Amount</span>
                <div className="relative">
                  <div className="absolute inset-y-0 right-3 flex items-center text-dimGray">
                    USD
                  </div>
                  <input
                    name="inputTipAmount"
                    placeholder="$00.00"
                    value={inputTipAmount}
                    onChange={handleTipAmountChange}
                    className="hover:border-charcoalGray focus:border-transparent focus:outline-charcoalGray focus:outline-2 focus:outline-offset-0 resize-none w-full text-sm p-[12px] bg-jetBlack border border-eclipseGray text-dimGray rounded-lg"
                  />
                </div>
              </div> */}

              <div className="flex gap-[5px] flex-col w-full"></div>
            </div>

            <div className="flex flex-col flex-1 text-[12px] gap-1 py-2 border-y border-eclipseGray">
              <div className="flex flex-col  text-grayishSilver">
                <div className="flex justify-between items-center">
                  <span>Price</span>
                  <span>${basePrice}</span>
                </div>
              </div>
              <div className="flex flex-col  text-grayishSilver">
                <div className="flex justify-between items-center">
                  <span>Service Fee ({serviceFeePercentage}%)</span>
                  <span>${serviceFee.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex flex-col  text-grayishSilver">
                <div className="flex justify-between items-center">
                  <span className="text-silver text-[12px]">Tip Amount</span>
                  <div className="relative">
                    <div className="absolute inset-y-0 right-3 flex items-center text-dimGray">
                      USD
                    </div>
                    <input
                      name="inputTipAmount"
                      placeholder="$00.00"
                      value={inputTipAmount}
                      onChange={handleTipAmountChange}
                      className="hover:border-charcoalGray focus:border-transparent focus:outline-charcoalGray focus:outline-2 focus:outline-offset-0 resize-none w-[160px] h-[40px] text-sm p-[12px] bg-jetBlack border border-eclipseGray text-dimGray rounded-lg text-right pr-14"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col text-[12px] gap-1 py-2 border-b border-eclipseGray">
              <div className="flex flex-col  text-grayishSilver">
                <div className="flex justify-between items-center">
                  <span>Total Amount</span>
                  <span className="text-limeGreen">${totalAmount}</span>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-[18px] font-semibold pb-2 pt-3 text-softGray">
                Payment Method
              </h2>
              <div onClick={handleOpenCardInfo} className="relative">
                <span className="absolute inset-y-0 right-3 flex items-center text-dimGray">
                  <IoIosArrowDown />
                </span>
                <input
                  name="none"
                  type="name"
                  placeholder="MVSSIVE Beta - Testing Card"
                  className=" focus:border-transparent flex-1 focus:outline-charcoalGray focus:outline-2 focus:outline-offset-0 resize-none w-full text-sm p-[12px] bg-jetBlack border border-eclipseGray text-dimGray rounded-lg"
                />
              </div>
            </div>

            <div>
              <input
                name="discount"
                type="text"
                placeholder="Enter Discount Code"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                className="hover:border-charcoalGray flex-1 mb-2 focus:border-transparent focus:outline-charcoalGray focus:outline-2 focus:outline-offset-0 resize-none w-full text-sm text-center p-[12px] bg-jetBlack border border-eclipseGray text-dimGray rounded-lg"
              />
            </div>
          </div>

          <div className="flex bottom-0 sticky bg-darkGray justify-end pb-6 pt-1 gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="border border-charcoalGray bg-jetBlack text-sm text-white font-semibold py-[12px] w-[86px] flex justify-center items-center rounded-full"
            >
              Close
            </button>
            <button
              type="submit"
              onClick={handleSendDemo}
              className="bg-limeGreen text-sm text-jetBlack font-semibold py-[12px] px-5 rounded-full"
            >
              Send Demo
            </button>
          </div>
        </div>
      </Dialog>

      <CardInfoDialog
        openCardInfo={openCardInfo}
        setOpenCardInfo={setOpenCardInfo}
        formData={setFormData}
        handleBack={handleBack}
        setFormData={setFormData}
      />
    </div>
  );
};

export default PurchaseOrderDialog;
