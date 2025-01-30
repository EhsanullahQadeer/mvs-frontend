/*************************************************************************
 * @file AudioDemoFee.tsx
 * @author Ehsanullah Qadeer
 * @desc  This is the component in monetization component for Demo purposes.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

import { Form, Formik } from "formik";
import FormikOnChange from "pages/onboarding/components/FormikOnChange";
import { useState } from "react";
import PriceFieldSection from "./PriceFieldSection";

type Props = {};

const AudioDemoFee = (props: Props) => {
  const [buttonText, setButtonText] = useState("Save Changes");
  const initialValues = {
    demo_fee: "",
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

                <div>
                  <PriceFieldSection
                    {...{
                      buttonText,
                      title: "Audio Demo Fee",
                      label: "Price for demo",
                      desc: "Set the price you will charge for someone to send a demo",
                      fieldDesc:
                        "This fee will be applied each time you receive an audio demo from your followers.",
                      name: "inbox_fee",
                    }}
                  />
                </div>
              </>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AudioDemoFee;
