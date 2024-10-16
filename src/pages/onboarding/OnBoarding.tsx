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
import UserPersonalInformation from "./components/UserPersonalInformation";
import { useLocation } from "react-router-dom";

const OnBoarding = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const partner = searchParams.get("partner");

  const isPartner = partner === "true";
  const numberOfTabs = isPartner ? 7 : 5;

  const [completedSections, setCompletedSections] = useState<string[]>([]);
  const [openTab, setOpenTab] = useState<string | null>(null);

  const toggleTab = (tabId: string) => {
    setOpenTab(openTab === tabId ? null : tabId);
  };

  const markSectionAsCompleted = (tabId: string) => {
    if (!completedSections.includes(tabId)) {
      setCompletedSections([...completedSections, tabId]);
    }
  };

  const completeProgress = (completedSections.length / numberOfTabs) * 100;

  const [formData, setFormData] = useState({});

  const handleSubmitForm = () => {
    console.log("formData", formData);
  };

  const commonSections = [
    {
      id: "userType",
      title: "User Type",
      component: (
        <UserType
          {...{
            markSectionAsCompleted: () => markSectionAsCompleted("userType"),
            formData,
            setFormData,
          }}
        />
      ),
    },
    {
      id: "personalInformation",
      title: "Tell us about yourself",
      component: isPartner ? (
        <PersonalInformation
          {...{
            markSectionAsCompleted: () =>
              markSectionAsCompleted("personalInformation"),
            formData,
            setFormData,
          }}
        />
      ) : (
        <UserPersonalInformation
          {...{
            markSectionAsCompleted: () =>
              markSectionAsCompleted("personalInformation"),
            formData,
            setFormData,
          }}
        />
      ),
    },
    {
      id: "musicIdentity",
      title: "Define your music identity",
      component: (
        <MusicIdentity
          {...{
            isPartner,
            markSectionAsCompleted: () =>
              markSectionAsCompleted("musicIdentity"),
            formData,
            setFormData,
          }}
        />
      ),
    },
    {
      id: "connectWithPeople",
      title: "Connect with people based on your preferences",
      component: (
        <ConncectWithPeople
          isActive={openTab === "connectWithPeople"}
          markSectionAsCompleted={() =>
            markSectionAsCompleted("connectWithPeople")
          }
        />
      ),
    },
    {
      id: "paidSection",
      title: "Now, let's set up how you get paid",
      component: (
        <PaidSection
          markSectionAsCompleted={() => markSectionAsCompleted("paidSection")}
        />
      ),
    },
  ];

  const partnerSections = [
    {
      id: "uploadSamples",
      title: "Time to upload your first samples",
      component: (
        <UploadSampleSection
          isActive={openTab === "uploadSamples"}
          markSectionAsCompleted={() => markSectionAsCompleted("uploadSamples")}
        />
      ),
    },
    {
      id: "setPrices",
      title: "Set your prices",
      component: (
        <PricingSection
          {...{
            markSectionAsCompleted: () => markSectionAsCompleted("setPrices"),
            formData,
            setFormData,
          }}
        />
      ),
    },
  ];

  const sections = [...commonSections];
  if (isPartner) sections.splice(3, 0, ...partnerSections);

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

            <div className="flex gap-2 items-center justify-between">
              <div className="flex items-center gap-3 py-1">
                <div className="w-[291px] bg-charcoalGray rounded-full h-2 relative overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-limeGreen transition-all duration-300 ease-in-out"
                    style={{ width: `${completeProgress}%` }}
                  ></div>
                </div>
                <div className="flex">
                  <span className="text-silver text-sm font-normal">
                    {completedSections.length}/{numberOfTabs} completed
                  </span>
                </div>
              </div>

              <button
                onClick={handleSubmitForm}
                type="submit"
                className="bg-limeGreen py-2 px-3 rounded-[60px] text-sm font-semibold text-jetBlack cursor-pointer"
              >
                Complete Registration
              </button>
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

      {sections.map((section) => (
        <div
          key={section.id}
          className="border border-eclipseGray bg-darkGray rounded-lg px-5 py-7"
        >
          <div
            onClick={() => toggleTab(section.id)}
            className="flex justify-between items-center cursor-pointer"
          >
            <div className="flex-1 flex gap-2">
              <div
                className={`w-7 h-7 rounded-[20px] text-xl leading-6 font-semibold flex justify-center items-center transition-all duration-300 ${
                  openTab === section.id ||
                  completedSections.includes(section.id)
                    ? "bg-limeGreen text-black"
                    : "bg-charcoalGray text-eclipseGray"
                }`}
              >
                {sections.indexOf(section) + 1}
              </div>
              <span className="text-[19px] text-dimGray font-semibold">
                {section.title}
              </span>
            </div>
            <div className="text-coolGray w-6 h-6 flex justify-center items-center">
              {openTab === section.id ? <FaChevronDown /> : <FaChevronRight />}
            </div>
          </div>

          <div
            className={`relative transition-all duration-300 ${
              openTab === section.id
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
