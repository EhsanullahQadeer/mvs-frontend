/*************************************************************************
 * @file PricingSection.tsx
 * @author Ehsanullah Qadeer
 * @desc  This is the component for PricingSection of the user while registeration.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

import { Form, Formik } from "formik";
import PriceBox from "./PriceBox";
import FormikOnChange from "./FormikOnChange";
import { useState } from "react";

type Props = {
  markSectionAsCompleted: () => void;
  formData: any;
  setFormData: (values: any) => void;
};

const PricingSection = (props: Props) => {
  const { markSectionAsCompleted, formData, setFormData } = props;
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [buttonText, setButtonText] = useState("Save Changes");
  const initialValues = {
    inbox_fee: "",
    demo_fee: "",
    meeting_fee: "",
  };

  const handleSubmit = (values) => {
    setFormData({
      ...formData,
      ...values,
    });
    setButtonText("Saved");
    setIsButtonDisabled(true); // Disable the button
    markSectionAsCompleted();
  };

  return (
    <div>
      <p className="text-sm font-normal text-mediumGray">
        Choose how you want to monetize your content, you can modify these
        preferences and explore more monetization options in your settings.
      </p>

      <div className="mt-[40px]">
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {() => {
            return (
              <Form>
                <>
                  <FormikOnChange
                    onChange={() => setButtonText("Save Changes")}
                  />
                  <div className="flex gap-5">
                    <PriceBox
                      {...{
                        title: "Inbox Fee",
                        label: "Price for message",
                        desc: "Set the price you will charge for someone to message you.",
                        fieldDesc:
                          "This fee will be applied each time a message is received from your followers.",
                        name: "inbox_fee",
                      }}
                    />

                    <PriceBox
                      {...{
                        title: "Audio Demo Fee",
                        label: "Price for demo",
                        desc: "Set the price you will charge for someone to send an audio demo.",
                        fieldDesc:
                          "This fee will be applied each time you receive an audio demo.",
                        name: "demo_fee",
                      }}
                    />

                    <PriceBox
                      {...{
                        title: "Meeting Fee",
                        label: "Price for meeting",
                        desc: "Set the price you will charge for someone to request a meeting.",
                        fieldDesc:
                          "The default meeting duration is set to 15 minutes.",
                        name: "meeting_fee",
                      }}
                    />
                  </div>
                </>

                <div className="mt-5 mr-5 w-full flex justify-end">
                  <button
                    type="submit"
                    disabled={isButtonDisabled} // Disable the button when text is "Saved"
                    className={`py-3 px-4 rounded-[60px] text-sm font-semibold border ${
                      buttonText === "Saved"
                        ? "cursor-auto bg-transparent border-eclipseGray text-mediumGray"
                        : "cursor-pointer bg-limeGreen border-limeGreen text-jetBlack"
                    }`}
                  >
                    {buttonText}
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default PricingSection;
