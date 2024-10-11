/*************************************************************************
 * @file OnBoarding.tsx
 * @author Ehsanullah Qadeer
 * @desc  This is the page after registration.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/
import { useState } from "react";
import crownIcon2 from "../../assets/icons/crownIcon2.svg";
import { FaChevronDown, FaChevronRight } from "react-icons/fa6";
import UserType from "./components/UserType";
import PersonalInformation from "./components/PersonalInformation";
import MusicIdentity from "./components/MusicIdentity";
import UploadSampleSection from "./components/UploadSampleSection";
import PricingSection from "./components/PricingSection";
import ConncectWithPeople from "./components/ConncectWithPeople";
import PaidSection from "./components/PaidSection";

type Props = {};

const OnBoarding = (props: Props) => {
  const numberOfTabs = 7;
  const completedTabs = 2;
  const completeProgress = 100 / (numberOfTabs - completedTabs);

  const [openTab, setOpenTab] = useState<number | null>(0);

  const toggleTab = (tabIndex: number) => {
    setOpenTab(openTab === tabIndex ? null : tabIndex);
  };

  const sections = [
    {
      title: "User Type",
      component: <UserType />,
    },
    {
      title: "Tell us about yourself",
      component: <PersonalInformation />,
    },
    {
      title: "Define your music identity",
      component: <MusicIdentity />,
    },
    {
      title: "Time to upload your first samples",
      component: <UploadSampleSection />,
    },
    {
      title: "Set your prices",
      component: <PricingSection />,
    },
    {
      title: "Connect with people based on your preferences",
      component: <ConncectWithPeople />,
    },
    {
      title: "Now, lets set up how you get paid",
      component: <PaidSection />,
    },
  ];

  return (
    <div className="py-10 px-11 flex flex-col gap-4">
      <div className="border border-eclipseGray bg-darkGray rounded-lg p-5">
        <div className="flex">
          <div className="flex-1">
            <h1 className="text-[28px] text-white leading-[34px] font-semibold -tracking-[2%]">
              Get Started
            </h1>
            <div className="max-w-[458px] mt-3 mb-5">
              <p className="text-mediumGray text-sm font-normal">
                Set up your account to unlock the full potential of MVSSIVE.
                This page will remain accessible until you’ve completed all the
                steps.
              </p>
            </div>
            <div className="flex items-center gap-3 py-1">
              <div className="w-[291px] bg-charcoalGray rounded-full h-2 relative overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-limeGreen transition-all duration-300 ease-in-out"
                  style={{ width: `${completeProgress}%` }}
                ></div>
              </div>

              <div className="flex">
                <span className="text-silver text-sm font-normal">
                  {completedTabs}/{numberOfTabs} completed
                </span>
              </div>
            </div>
          </div>
          <div className="w-[215px] flex justify-center items-center">
            <img
              src={crownIcon2}
              alt="crownIcon"
              className="w-[117px] h-[83px]"
            />
          </div>
        </div>
      </div>

      {sections.map((section, index) => (
        <div
          key={index}
          className="border border-eclipseGray bg-darkGray rounded-lg px-5 py-7"
        >
          <div
            onClick={() => toggleTab(index)}
            className="flex justify-between items-center cursor-pointer"
          >
            <div className="flex-1 flex gap-2">
              <div
                className={`w-7 h-7 rounded-[20px] text-xl leading-6 font-semibold flex justify-center items-center transition-all duration-300 ${
                  openTab === index
                    ? "bg-limeGreen text-black"
                    : "bg-charcoalGray text-eclipseGray"
                }`}
              >
                {index + 1}
              </div>
              <span className="text-[19px] text-dimGray font-semibold">
                {section.title}
              </span>
            </div>

            <div className="text-coolGray w-6 h-6 flex justify-center items-center">
              {openTab === index ? <FaChevronDown /> : <FaChevronRight />}
            </div>
          </div>

          <div
            className={`relative transition-all duration-300 ${
              openTab === index
                ? "max-h-auto mt-3 block opacity-100 z-10"
                : "max-h-0 mt-0 hidden opacity-0 -z-10"
            }`}
          >
            {section.component}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OnBoarding;
