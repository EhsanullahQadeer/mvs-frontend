/*************************************************************************
 * @file Plans.tsx
 * @author Ehsanullah Qadeer
 * @desc  This is page for plans.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

import Theme from "theme";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import PlanCard from "./component/PlanCard";
import { useState } from "react";
import SimpleTable from "../memberships-connects/components/SimpleTable";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import FAQS from "./component/FAQS";

const Plans = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selected, setSelected] = useState<"annual" | "monthly">("annual");

  const handleChangePlan = (planName: string) => {
    console.log(`${planName} Plan selected!`);
    setSelectedPlan(planName);
  };
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const planComparisonData = [
    {
      feature: "Basic Features",
      basic: <IoIosCheckmarkCircleOutline className="text-[24px]" />,
      advance: <IoIosCheckmarkCircleOutline className="text-[24px]" />,
      premium: <IoIosCheckmarkCircleOutline className="text-[24px]" />,
    },
    {
      feature: "Monthly Credits",
      basic: "50",
      advance: "100",
      premium: "200",
    },
    {
      feature: "Monthly Icebreaker Message",
      basic: "1",
      advance: "3",
      premium: "5",
    },
  ];

  const columns = [
    { id: "feature", label: "Features" },
    { id: "basic", label: "Basic" },
    { id: "advance", label: "Advance" },
    { id: "premium", label: "Premium" },
  ];
  const plans = [
    {
      planName: "Basic",
      price: "$49.99",
      features: ["50 Monthly credits", "1 Monthly Icebreaker message"],
      buttonText: "Change Plan",
    },
    {
      planName: "Advanced",
      price: "$99.99",
      features: ["Unlimited credits", "5 Monthly Icebreaker messages"],
      buttonText: "Upgrade Plan",
    },
    {
      planName: "Premium",
      price: "$149.99",
      features: ["Unlimited credits", "Unlimited Icebreaker messages"],
      buttonText: "Go Premium",
    },
  ];

  return (
    <Theme>
      <div>
        {/* Back button */}
        <div className="flex gap-3 px-4 py-5 border-b border-eclipseGray">
          <div
            onClick={handleBack}
            className="text-platinum cursor-pointer w-max"
          >
            <FaArrowLeft />
          </div>
        </div>

        {/* Header */}
        <div className="px-4 my-5">
          <div className="px-2.5 py-2.5">
            <h2 className="text-2xl text-white font-semibold">
              Choose the Perfect Plan for You
            </h2>
            <p className="mt-2 text-lg text-mediumGray font-normal">
              Your journey starts with the perfect plan. Select yours and set
              the rhythm.
            </p>
          </div>
          <div className="border my-5 rounded-lg border-[#242424] flex w-fit">
      <span
        className={`px-4 py-3 border-r border-[#242424]  font-semibold cursor-pointer ${
          selected === "annual"
            ? "bg-[#1C1C1C] text-[#B2B2B2]"
            : "bg-transparent text-[#3D3D3D]"
        }`}
        onClick={() => setSelected("annual")}
      >
        Annual Pricing
      </span>

      <span
        className={`px-4 py-3 font-semibold cursor-pointer ${
          selected === "monthly"
            ? "bg-[#1C1C1C] text-[#B2B2B2]"
            : "bg-transparent text-[#3D3D3D]"
        }`}
        onClick={() => setSelected("monthly")}
      >
        Monthly Pricing
      </span>
          </div>

          <div className="flex mb-5  gap-2">
            {plans.map((plan, index) => (
              <PlanCard
                key={index}
                planName={plan.planName}
                price={plan.price}
                features={plan.features}
                buttonText={plan.buttonText}
                onButtonClick={() => handleChangePlan(plan.planName)}
                isSelected={selectedPlan === plan.planName} // Pass selected state
              />
            ))}
          </div>
          <SimpleTable columns={columns} rows={planComparisonData} />
          <div className="p-[30px] mt-5 items-center flex gap-5 bg-[#0F0F0F] rounded-xl border-[#1c1c1c] border ">
            <div className="flex flex-1 flex-col gap-4">
              <h2 className="text-[18px] text-white font-semibold">
                How Do Credits work?{" "}
              </h2>
              <p className=" text-[14px] text-mediumGray font-normal">
                Credits are a monthly allowance provided based on your
                subscription plan. They serve as a versatile resource for
                engaging with partners and expanding your opportunities on the
                platform. With credits, you can submit audio demos for
                professional feedback, send direct messages to initiate
                meaningful conversations, and request meetings to explore
                collaboration opportunities. The number of credits you receive
                each month varies by plan, empowering you to tailor your
                experience and maximize your creative potential.
              </p>
            </div>
            <div className="h-[140px] my-2  w-[1px] bg-[#242424]"></div>
            <div className="flex flex-1 flex-col gap-4">
              <h2 className="text-[18px] text-white font-semibold">
                What is an Icebreaker Message?
              </h2>
              <div className="">
                <p className=" text-[14px] text-mediumGray font-normal">
                  An Icebreaker Message is a special tool that helps creators
                  grab a partner's attention and start conversations faster.
                  It’s designed to encourage quick responses and build stronger
                  connections between users. <br />
                  Each creator receives 1 free Icebreaker Message per month,
                  which they can use however they like. By subscribing to
                  bundles, creators can unlock extra Icebreaker Messages each
                  month for even more opportunities to connect.
                </p>
              </div>
            </div>
          </div>
      <FAQS/>
        </div>
      </div>
    </Theme>
  );
};

export default Plans;
