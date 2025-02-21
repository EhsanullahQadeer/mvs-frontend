/*************************************************************************
 * @file InboxFee.tsx
 * @author Ehsanullah Qadeer
 * @desc  This is the component in monetization component for inbox messaging purposes.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

import { Field, Form, Formik } from "formik";
import FormikOnChange from "pages/onboarding/components/FormikOnChange";
import { useState } from "react";
import { FiMessageSquare } from "react-icons/fi";
import { ReactComponent as AddEmoji } from "../../../../assets/icons/addIcon.svg";
import { FiCamera } from "react-icons/fi";
import { IoMicOutline } from "react-icons/io5";
import PriceFieldSection from "./PriceFieldSection";
import SelectorDropdown from "./SelectorDropdown";

type Props = {};

const InboxFee = (props: Props) => {
  const [buttonText, setButtonText] = useState("Save Changes");
  const daysOptions = Array.from({ length: 31 }, (_, i) => i);
  const hoursOptions = Array.from({ length: 25 }, (_, i) => i);
  const minutesOptions = Array.from({ length: 61 }, (_, i) => i);

  const initialValues = {
    inbox_fee: "",
    message: "",
    days: 0,
    hours: 0,
    minutes: 0,
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
                      title: "Inbox Fee",
                      label: "Price for message",
                      desc: "Set the price you will charge for someone to message you.",
                      fieldDesc:
                        "This fee will be applied each time a message is received from your followers.",
                      name: "inbox_fee",
                    }}
                  />
                </div>

                {/* Automatic message -  disabled for now */}
                <div className="hidden p-4 flex flex-col gap-4 border-t border-eerieBlack">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <div className="text-white w-6 h-6 flex">
                        <FiMessageSquare className="w-full h-full" />
                      </div>
                      <p className="text-white text-sm font-semibold">
                        Automatic message
                      </p>
                    </div>

                    <p className="mt-2 text-dimGray text-xs font-normal">
                      Send this message immediately after the initial event
                    </p>
                  </div>

                  <div>
                    <div className="py-2.5 flex items-center gap-2.5">
                      <div className="border border-eclipseGray rounded cursor-pointer w-7 h-7 flex justify-center items-center text-charcoalGray">
                        <AddEmoji className="w-3.5 h-3.5" />
                      </div>

                      <div className="border border-eclipseGray rounded cursor-pointer w-7 h-7 flex justify-center items-center text-charcoalGray">
                        <FiCamera className="w-3.5 h-3.5" />
                      </div>

                      <div className="border border-eclipseGray rounded cursor-pointer w-7 h-7 flex justify-center items-center text-charcoalGray">
                        <IoMicOutline className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <div className="mt-2 w-[432px]">
                      <Field
                        name="message"
                        placeholder="Send a message...."
                        type="text"
                        as="textarea"
                        style={{
                          boxShadow: "none",
                        }}
                        className={`text-dimGray text-sm font-normal px-4 py-3 rounded-lg bg-jetBlack border border-eclipseGray hover:border-charcoalGray focus:border-transparent focus:outline-charcoalGray focus:outline-2 focus:outline-offset-0 resize-none w-full`}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <div className="w-24">
                        <SelectorDropdown
                          name="days"
                          label="Days"
                          dropdownItems={daysOptions}
                        />
                      </div>

                      <div className="w-24">
                        <SelectorDropdown
                          name="hours"
                          label="Hours"
                          dropdownItems={hoursOptions}
                        />
                      </div>

                      <div className="w-24">
                        <SelectorDropdown
                          name="minutes"
                          label="Minutes"
                          dropdownItems={minutesOptions}
                        />
                      </div>
                    </div>

                    <p className="mt-2 text-dimGray text-[10px] font-normal">
                      Configure the delay time before the message is sent.
                    </p>
                  </div>
                </div>
              </>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default InboxFee;
