import React, { useState } from "react";
import sharpline from "../../../assets/img/sharpline.png";
import BecomePartner from "./component/PartnerSubmission";
import RegisterationForm from "./component/RegisterationForm";
import SmallCard from "./component/SmallCard";
import leftWing from "../../../assets/img/left wing.svg";
import RightWing from "../../../assets/img/right wing.svg";
import ZigZag from "../../../assets/img/zigzag.svg";
import artistimage from "../../../assets/img/artistImg.png";
import Thankyou from "./component/Thankyou";

const Registeration: React.FC = () => {
  const [submittedApplication, setSubmittedApplication] = useState<
    boolean | null
  >(null);
  const [isOpen, setIsOpen] = useState(true);
  const [registered, setRegistered] = useState(false);

  return (
    <div className="bg-[#141414] z-10">
      <div
        style={{ backgroundImage: `url(${ZigZag})` }}
        className=" flex z-20 bg-cover w-full bg-no-repeat justify-center items-center  bg-center"
      >
        <div
          className={`w-full h-screen justify-center items-center ${
            !registered ? "hidden" : "flex"
          }`}
        >
          <Thankyou></Thankyou>
        </div>
        <div
          style={{ backgroundImage: `url(${sharpline})` }}
          className={`w-1/2  flex items-center  justify-center  h-screen bg-[#0f0f0f]  bg-cover bg-center ${
            registered ? "hidden" : "flex"
          }`}
        >
          <div className=" z-50   flex items-center  justify-center">
            <BecomePartner
              setSubmittedApplication={setSubmittedApplication}
              submittedApplication={submittedApplication}
              setIsOpen={setIsOpen}
              isOpen={isOpen}
            />
          </div>

          {!isOpen && (
            <div className=" z-50   flex items-center  justify-center">
              <RegisterationForm
                registered={registered}
                setRegistered={setRegistered}
                setSubmittedApplication={setSubmittedApplication}
                submittedApplication={submittedApplication}
                setIsOpen={setIsOpen}
                isOpen={isOpen}
              />
            </div>
          )}
        </div>
        <div
          className={`w-1/2   flex-col  justify-center  ${
            registered ? "hidden" : "flex"
          }`}
        >
          <div className="flex  relative flex-col gap-16 justify-center items-center">
            <div className=" flex w-[740px] justify-between ">
              <div className="w-[126px] h-[109px] ">
                <img className="w-full h-full" src={leftWing} alt="" />
              </div>
              <div className="w-[126px] h-[109px]  ">
                <img className="w-full h-full" src={RightWing} alt="" />
              </div>
            </div>
            <div className="flex flex-col relative   w-[600px] items-center  gap-10 justify-between ">
              <div className="flex justify-center   ">
                <div className=" absolute  left-11 top-[-126px]">
                  <SmallCard
                    image={artistimage}
                    name="ehsanullah"
                    title="sibley tour"
                    date="feb 22, 2024"
                  />
                </div>
                <div className="absolute left-20 z-20 top-[-52px] ">
                  <SmallCard
                    image={artistimage}
                    name="ehsanullah"
                    title="sibley tour"
                    date="feb 22, 2024"
                  />
                </div>
                <div className=" absolute left-40 top-[-85px]  ">
                  <SmallCard
                    image={artistimage}
                    name="ehsanullah"
                    title="sibley tour"
                    date="feb 22, 2024"
                  />
                </div>

                <div className="absolute z-30 left-52 ">
                  <SmallCard
                    image={artistimage}
                    name="ehsanullah"
                    title="sibley tour"
                    date="feb 22, 2024"
                  />
                </div>
                <div className=" absolute left-[360px] z-20  top-[-45px]">
                  <SmallCard
                    image={artistimage}
                    name="ehsanullah"
                    title="sibley tour"
                    date="feb 22, 2024"
                  />
                </div>
                <div className="absolute left-[420px] top-[-145px]">
                  <SmallCard
                    image={artistimage}
                    name="ehsanullah"
                    title="sibley tour"
                    date="feb 22, 2024"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center items-center gap-1 pt-36">
                <h2 className=" font-semibold text-[#E5E5E5]  text-3xl">
                  Sneak Peek of What's Ahead
                </h2>
                <p className=" text-center text-sm text-[#999999]">
                  Discover what’s next! On the right, explore a preview of
                  outstanding work from our partners who have made this platform
                  possible.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registeration;
