import React, { useState } from "react";
import sharpline from "../../../assets/img/sharpline.png";
import BecomePartner from "./component/PartnerSubmission";
import RegisterationForm from "./component/RegisterationForm";

import ZigZag from "../../../assets/img/zigzag.svg";
import Thankyou from "./component/Thankyou";
import component from "../../../assets/img/Group 20.png";
import { CircularProgress } from "@mui/material";
import WaitMessage from "../WaitMessage";

const Registeration: React.FC = () => {
  const [submittedApplication, setSubmittedApplication] = useState<
    boolean | null
  >(null);
  const [isOpen, setIsOpen] = useState(true);
  const [registered, setRegistered] = useState(false);
  const [loader, setLoader] = useState(false);

  return (
    <div
      className={`bg-[#141414] z-10 ${
        loader ? "pointer-events-none" : "pointer-events-auto"
      }`}
    >
      <div
        style={{ backgroundImage: `url(${ZigZag})` }}
        className="flex z-20 bg-cover w-full bg-no-repeat justify-center items-center bg-center"
      >
        <div
          className={`w-full h-screen justify-center items-center ${
            !registered ? "hidden" : "flex"
          }`}
        >
          {/* <Thankyou
            setSubmittedApplication={setSubmittedApplication}
            submittedApplication={submittedApplication}
          /> */}
          <WaitMessage></WaitMessage>
        </div>
        <div
          style={{ backgroundImage: `url(${sharpline})` }}
          className={`w-1/2 flex items-center justify-center h-screen bg-jetBlack bg-cover bg-center ${
            registered ? "hidden" : "flex"
          }`}
        >
          {isOpen ? (
            <div className="z-50 flex items-center justify-center">
              <BecomePartner
                setSubmittedApplication={setSubmittedApplication}
                submittedApplication={submittedApplication}
                setIsOpen={setIsOpen}
                isOpen={isOpen}
              />
            </div>
          ) : (
            <div className="z-50 flex items-center justify-center">
              <RegisterationForm
                setRegistered={setRegistered}
                submittedApplication={submittedApplication}
                setLoader={setLoader}
              />
            </div>
          )}
        </div>
        <div
          className={`w-1/2 flex-col justify-center ${
            registered ? "hidden" : "flex"
          }`}
        >
          <div className="flex flex-col gap-10 justify-center items-center">
            <div className="">
              <img src={component} alt="" />
            </div>
            <div className="flex flex-col justify-center items-center gap-1 w-3/4">
              <h2 className=" font-semibold text-platinum text-3xl">
                Sneak Peek of What's Ahead
              </h2>
              <p className=" text-center text-sm text-mediumGray">
                Discover what’s next! On the right, explore a preview of
                outstanding work from our partners who have made this platform
                possible.
              </p>
            </div>
          </div>
        </div>
      </div>

      {loader && (
        <>
          <div className="absolute top-0 left-0 z-50 bg-black opacity-40 w-full h-full pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999px]">
            <CircularProgress
              sx={{
                width: "80px !important",
                height: "80px !important",
                color: "#9EFF00",
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Registeration;
