/*************************************************************************
 * @file MeetingFee.tsx
 * @author Ehsanullah Qadeer
 * @desc  This is the component in monetization component for Meeting purposes.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

import { Form, Formik } from "formik";
import FormikOnChange from "pages/onboarding/components/FormikOnChange";
import { useState } from "react";
import { LuTimer } from "react-icons/lu";
import PriceFieldSection from "./PriceFieldSection";
import MeetingDurationPrice from "./MeetingDurationPrice";

type Props = {};

const MeetingFee = (props: Props) => {
  const [buttonText, setButtonText] = useState("Save Changes");
  const initialValues = {
    demo_fee: "",
    "30_min_fee": "",
    "45_min_fee": "",
    "1_hour_fee": "",
  };

  const handleSubmit = (values) => {
    setButtonText("Saved");
    console.log("values: ", values);
  };

  return (
    <div className="bg-darkGray rounded-lg border border-eerieBlack p-5">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {() => {
          return (
            <Form>
              <>
                <FormikOnChange
                  onChange={() => setButtonText("Save Changes")}
                />

                <div className="mb-10">
                  <PriceFieldSection
                    {...{
                      buttonText,
                      title: "Meeting Fee",
                      label: "Price for meeting",
                      desc: "Set the price you will charge for someone to request a meeting",
                      fieldDesc:
                        "The default meeting duration is set to 15 minutes.",
                      name: "demo_fee",
                    }}
                  />
                </div>

                <div className="mb-10 p-4 flex flex-col gap-5 border-t border-eerieBlack">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <div className="text-[#BAFF49] w-6 h-6 flex">
                        <LuTimer className="w-full h-full" />
                      </div>
                      <p className="text-white text-sm font-semibold">
                        Meeting duration
                      </p>
                    </div>

                    <p className="mt-2 text-dimGray text-xs font-normal">
                      The default duration is 15 minutes. Set the price for
                      meetings that exceed this standard length.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* <div className="bg-jetBlack border border-eclipseGray w-24 h-10 rounded"></div> */}

                    <div className="w-24">
                      <MeetingDurationPrice
                        {...{
                          name: "30_min_fee",
                          label: "30 mins"
                        }}
                      />
                    </div>

                    <div className="w-24">
                      <MeetingDurationPrice
                        {...{
                          name: "45_min_fee",
                          label: "45 mins"
                        }}
                      />
                    </div>

                    <div className="w-24">
                      <MeetingDurationPrice
                        {...{
                          name: "1_hour_fee",
                          label: "1h"
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mx-2.5 w-max text-[10px] font-normal text-dimGray underline cursor-pointer">
                  Meeting Policies
                </div>
              </>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default MeetingFee;
