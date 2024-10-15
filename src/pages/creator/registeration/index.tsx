import React, { useState } from "react";
import sharpline from "../../../assets/img/sharpline.png";
import BecomePartner from "./component/PartnerSubmission";
import RegisterationForm from "./component/RegisterationForm";
import SmallCard from "./component/SmallCard";
import leftWing from "../../../assets/img/left wing.svg";
import RightWing from "../../../assets/img/right wing.svg";
import ZigZag from "../../../assets/img/zigzag.svg";
import artistimage from "../../../assets/img/artistImg.png";

const Registeration: React.FC = () => {
  const [submittedApplication, setSubmittedApplication] = useState<
    boolean | null
  >(null);
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-[#141414] z-10">
      <div
        style={{ backgroundImage: `url(${ZigZag})` }}
        className="h-screen flex z-20 bg-cover w-full bg-no-repeat  bg-center"
      >
        <div
          style={{ backgroundImage: `url(${sharpline})`}}
          className="w-1/2 relative bg-[#0f0f0f]  bg-cover bg-center"
        >
          <div className="absolute z-50 left-16 top-0 bottom-0 flex items-center justify-center">
            <BecomePartner
              setSubmittedApplication={setSubmittedApplication}
              submittedApplication={submittedApplication}
              setIsOpen={setIsOpen}
              isOpen={isOpen}
            />
          </div>

          {!isOpen && (
            <div className="absolute left-12 top-0 bottom-0 flex items-center justify-center">
              <RegisterationForm
                setSubmittedApplication={setSubmittedApplication}
                submittedApplication={submittedApplication}
                setIsOpen={setIsOpen}
                isOpen={isOpen}
              />
            </div>
          )}
        </div>
        <div className="w-1/2 relative  ">
          <div className=" flex  ">
            <div className="absolute top-20  ">
              <img src={leftWing} alt="" />
            </div>
            <div  className="w-fit absolute top-32 left-[126px]">
              <SmallCard
                image={artistimage}
                name="ehsanullah"
                title="sibley tour"
                date="feb 22, 2024"
              />
            </div>
            <div
              style={{
                left: "169px",
              }}
              className="w-fit absolute top-48 z-50  "
            >
              <SmallCard
                image={artistimage}
                name="ehsanullah"
                title="sibley tour"
                date="feb 22, 2024"
              />
            </div>
            <div
              style={{
                left: "274px",
              }}
              className="w-fit absolute top-40 z-30 "
            >
              <SmallCard
                image={artistimage}
                name="ehsanullah"
                title="sibley tour"
                date="feb 22, 2024"
              />
            </div>

            <div
              style={{
                right: "294px",
              }}
              className="w-fit absolute top-52 z-50   pb-10"
            >
              <SmallCard
                image={artistimage}
                name="ehsanullah"
                title="sibley tour"
                date="feb 22, 2024"
              />
            </div>
            <div
             className="w-fit absolute top-44 z-30 right-36 ">
              <SmallCard
                image={artistimage}
                name="ehsanullah"
                title="sibley tour"
                date="feb 22, 2024"
              />
            </div>
            <div
              style={{
                right: "129px",
                top : "148px"
              }}
              className="w-fit absolute"
            >
              <SmallCard
                image={artistimage}
                name="ehsanullah"
                title="sibley tour"
                date="feb 22, 2024"
              />
            </div>
            <div className="absolute top-20 right-0 ">
              <img src={RightWing} alt="" />
            </div>
          </div>
          <div
            style={{
              right: "124px",
            }}
            className="flex flex-col justify-center items-center gap-1 absolute bottom-24  left-24"
          >
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
  );
};

export default Registeration;
