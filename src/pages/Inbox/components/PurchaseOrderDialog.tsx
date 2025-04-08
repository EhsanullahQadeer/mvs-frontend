import { uploadMedia } from "api/sounds";
import Dialog from "@mui/material/Dialog";
import { useChatbox } from "./Chatbox/context";
import { getUserByIdAPI } from "../../../api/user";
import React, { useEffect, useState } from "react";
import { useMessenger } from "api/messenger/context";
import { FaRegCircleQuestion } from "react-icons/fa6";
import StripeElements from "components/stripe/stripeElements";
import { ReactComponent as CancelIcon } from "../../../assets/icons/cancelIcon.svg";
import Thumbnail from "components/ui/Header/atoms/notificationAtoms/thumbnailAvatar";
import { capitalizeRegion, convertToCurrencyFormat, formatNumberWithCommas } from "utils/dateUtils";
import { useToast } from "shared/toasts/ToastProvider";

interface Props {
  openPurchaseOrder: boolean;
  setOpenPurchaseOrder: React.Dispatch<React.SetStateAction<boolean>>;
  handleSendMessage: () => void;
  activeConversation: any;
  setIsSubmitting?: (value:boolean)=> void;
  demoFile: File;
  messageInputValue: string;
  clearMessageInputs: () => void;
  handleButtonClick: () => void;
}

const serviceFeePercentage = 2.9;

const PurchaseOrderDialog = (props: Props) => {
  const {
    openPurchaseOrder,
    setOpenPurchaseOrder,
    activeConversation,
    setIsSubmitting,
    demoFile,
    messageInputValue,
    clearMessageInputs
  } = props;

  const {
    LIMIT_MESSAGES,
  } = useChatbox();

  const {
    sendMessage,
    getConversationMessages
  } = useMessenger();

  const { addToast } = useToast();

  const recipient = activeConversation?.recipient;
  console.log('Recipient: ', recipient);
  const MAX_TIP_AMOUNT = 1000000;
  const [basePrice, setBasePrice] = useState(0);
  const [inputTipAmount, setInputTipAmount] = useState("$0.00");
  const [tipAmount, setTipAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [discountCode, setDiscountCode] = useState<string>("");
  const [openCardInfo, setOpenCardInfo] = useState(false);
  const [isSending,setIsSending] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!recipient?.id) return;
      const response = await getUserByIdAPI(recipient?.id?.toString());
      setBasePrice(response.data?.demo_fee || 0);
    };
    fetchUserInfo();
  }, [recipient?.id]);
  
  const handleTipAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = event.target.value; // Get the current input value
    let cleanedValue = inputValue.replace("$", "");
    let updatedNumericValue = 0;
    let updatedInputValue = "";
    // Example usage:
    updatedInputValue = convertToCurrencyFormat(cleanedValue); // Output: "$0.01"
    updatedNumericValue = parseFloat(updatedInputValue.replace("$", "").replace(/,/g, ""));
    if (updatedNumericValue > MAX_TIP_AMOUNT) {
      updatedInputValue = "$1,000,000.00";
      updatedNumericValue = MAX_TIP_AMOUNT;
    }
    setInputTipAmount(updatedInputValue);
    setTipAmount(updatedNumericValue);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Prevent arrow keys
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    // Move the cursor to the end of the input value
    const input = event.target;
    input.setSelectionRange(input.value.length, input.value.length);
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

  const handleSendDemo = async (paymentIntentId: string) => {
    console.log("handleSendDemo", demoFile, messageInputValue);
    let response;
    try {
      response = await uploadMedia({
        file: demoFile,
        type: 'demo',
      });
      console.log("response", response);

      if (!response?.data?.media?.id) {
        // if no file didnt create an id (not sure what to put here)
        addToast({ state: "somethingWentWrong", permanent: true, actionFunction: () => window.location.reload()})
        return;
      }
      addToast({ state: "fileUploadedSuccessfully" });
    } catch (error) {
      // if overall file upload fails
      console.error("Error uploading media:", error);
      addToast({ state: "fileUploadFailed", permanent: true, 
        actionFunction: () => {
          try {
            handleSendDemo(paymentIntentId);
          } catch (error) {
            addToast({state: "unexpectedError", permanent: true, actionFunction: () => window.location.reload()})
          }
        }
      })
      return;
    }
    
    try {
      await sendMessage({
        conversationId: activeConversation?.conversation_id || '',
        message: messageInputValue,
        creditPaymentAmount: totalAmount,
        messageType: 'demo',
        audioMediaId: response.data.media.id,
        stripePaymentIntentId: paymentIntentId,
    })
    } catch (error) {
      console.error("Error sending message:", error);
      addToast({state: "messageFailedToSend", permanent: true, actionFunction: () => handleSendDemo(paymentIntentId)})
    }
    finally {
      setTipAmount(0);
      setInputTipAmount("");
      setOpenPurchaseOrder(false);
      setIsSending(false);
      addToast({state: "demoSentSuccessfully", actionFunction: () => props.handleButtonClick()})
      await getConversationMessages({ conversationId: activeConversation.conversation_id, limit: LIMIT_MESSAGES, cursor: 0 });
      clearMessageInputs();
    }
  };

  useEffect(() => {
    const subtotal = basePrice + tipAmount;
    const serviceFee = (subtotal * serviceFeePercentage) / 100;
    const total = subtotal + serviceFee;
    setTotalAmount(total);
  }, [tipAmount, basePrice]);

  const subtotal = basePrice + tipAmount;
  const serviceFee = (subtotal * serviceFeePercentage) / 100;

  return (
    <div style={{ zIndex: 9998 }}>
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
                className="flex rounded-full p-0.5 aspect-square"
              >
                <div className=" border border-[#151515] rounded-full">
                  <Thumbnail professionalName={recipient?.name} thumbnail={recipient?.thumbnail} size="35"/>
                </div>
              </div>
              <div className="flex flex-col gap-0.5 text-[14px]">
                <div className="text-sm font-semibold text-white">
                  {recipient?.name}
                </div>
                <div className="text-[12px] text-silver font-normal">
                  {capitalizeRegion(recipient?.region)}, {capitalizeRegion(recipient?.country)}
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
                    a voice memo.
                  </span>
                </span>
              </div>
            </div>
            <div className="flex flex-col flex-1 text-[12px] gap-1 py-2 border-y border-eclipseGray">
              <div className="flex flex-col  text-grayishSilver">
                <div className="flex justify-between items-center">
                  <span>Price</span>
                  <span>${formatNumberWithCommas(basePrice)}</span>
                </div>
              </div>
              <div className="flex flex-col  text-grayishSilver">
                <div className="flex justify-between items-center">
                  <span>Service Fee ({serviceFeePercentage}%)</span>
                  <span>${formatNumberWithCommas(serviceFee)}</span>
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
                      placeholder="$0.00"
                      value={inputTipAmount}
                      onChange={handleTipAmountChange}
                      onKeyDown={handleKeyDown}
                      onFocus={handleFocus}
                      className="hover:border-charcoalGray focus:border-transparent focus:outline-charcoalGray focus:outline-2 focus:outline-offset-0 resize-none w-[170px] h-[40px] text-sm p-[12px] bg-jetBlack border border-eclipseGray text-dimGray rounded-lg text-right pr-14"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col text-[12px] gap-1 py-2 border-b border-eclipseGray">
              <div className="flex flex-col  text-grayishSilver">
                <div className="flex justify-between items-center">
                  <span>Total Amount</span>
                  <span className="text-limeGreen">${formatNumberWithCommas(totalAmount)}</span>
                </div>
              </div>
            </div>
            <div>
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
              <div className="my-2">
                <StripeElements demoStripeProps={{onPaymentComplete: (intentId)=>{setIsSending(true);handleSendDemo(intentId)}, amount: Number(totalAmount), recipientId: recipient?.id, onClose: handleClose}}/>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default PurchaseOrderDialog;
