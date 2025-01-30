import React from "react";
import { LuGift } from "react-icons/lu";
import engineer from "../../../assets/img/engineer-profile2.png";
import { IoIosCheckmarkCircle } from "react-icons/io";

const expectations = [
  "Mixing/Mastering Critique",
  "Live Feedback on Tracks",
  "Technical Insights",
  "Career & Networking Tips",
  "Monthly Industry Insights",
  "Personalized Workflow Templates",
];

const VideoCallDetails = () => {
  return (
    <>
      <div className="flex gap-2">
        <div className="border w-[22.5%]  rounded-lg bg-darkGray border-eclipseGray">
          <div className="flex px-[8px] bg-coolGray text-white font-bold justify-center  text-xs w-fit rounded-br-lg py-1.5 items-center b gap-1">
            Book a video call
          </div>
          <div className="px-3 py-5 flex flex-col">
            <h2 className="text-lg text-white">1:1 Video Consultation</h2>
            <p className="mt-[12px] mb-[16px] text-silver text-xs">
              Book a 1:1 live Video Consultation & get personalized advice
            </p>
            <span className="text-white font-semibold mt-3">
              Starting at $499
            </span>
            <div>
              <span className="text-silver text-xs">Next Available -</span>{" "}
              <span className="text-blue-400 text-xs">6:30pm on 10/15</span>
            </div>
            <div className="flex gap-2 mt-4 items-center">
              <span className="  flex justify-center items-center">
                <LuGift className="text-silver text-3xl p-2 border border-silver rounded-full" />
              </span>
              <span className="font-semibold text-sm flex justify-center items-center h-8 px-4 bg-green rounded-full whitespace-nowrap">
                See times
              </span>
            </div>
          </div>
        </div>

        <div className="border w-[55%] p-3 flex gap-4 items-center rounded-lg bg-darkGray border-eclipseGray">
          <div className="w-1/3 h-full">
            <img
              src={engineer}
              alt="Consultation"
              className="rounded-lg w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-4 w-2/3 flex-grow">
            <div>
              <h2 className="text-white font-bold text-xl mb-2">
                Video Consultation
              </h2>
              <div className="flex gap-2 items-start">
                <h3 className="text-lightGray font-medium mb-1">Paris Lee</h3>
                <span className="text-gray w-fit py-[4px] flex text-xs justify-center items-center border rounded-lg border-charcoalGray px-[8px]">
                  Mastering
                </span>
              </div>
              <h4 className="text-white font-semibold mb-1">Description</h4>
              <p className="text-coolGray text-xs ">
                In your 1:1 consultation, expect tailored feedback on your
                mixing and mastering tracks, plus live critiques to enhance your
                sound. Gain technical insights and industry tips to elevate your
                craft while receiving monthly updates on trends. Visit once,
                gain personalized workflow templates to boost your creativity
                and efficiency.
              </p>
            </div>
          </div>
        </div>
        <div className="border w-[22.5%] rounded-lg bg-darkGray border-eclipseGray">
          <div className="flex px-[8px] bg-coolGray justify-center text-white font-bold  text-xs w-fit rounded-br-lg py-1.5 items-center  gap-1">
            What to expect
          </div>
          <div className="px-3 py-7 flex flex-col">
            <ul className="space-y-3">
              {expectations.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center space-x-2  text-gray-300"
                >
                  <span className="">
                    <IoIosCheckmarkCircle className="text-silver" />
                  </span>
                  <span className="text-white text-xs">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoCallDetails;
