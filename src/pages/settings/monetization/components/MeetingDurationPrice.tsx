/*************************************************************************
 * @file MeetingDurationPrice.tsx
 * @author Ehsanullah Qadeer
 * @desc  This is the component for Meeting Duration Price field.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

import { Field, useFormikContext } from "formik";
import { useState } from "react";

type Props = {
  name: string;
  label: string;
};

const MeetingDurationPrice = (props: Props) => {
  const { name, label } = props;

  const { setFieldValue } = useFormikContext();

  const [value, setValue] = useState("");

  const handleValueChange = (event) => {
    let inputValue = event.target.value;

    const validPricePattern = /^\$?\d*\.?\d{0,2}$/;

    let numericValue = inputValue.replace("$", "");
    if (validPricePattern.test(numericValue)) {
      if (numericValue && !inputValue.startsWith("$")) {
        inputValue = "$" + numericValue;
      }

      setValue(inputValue);
      setFieldValue(`${name}`, inputValue);
    }
  };

  return (
    <div>
      <div className="relative">
        <div className="absolute left-2 top-1 text-dimGray text-[10px] font-normal z-50">
          {label}
        </div>
        <Field
          id={name}
          name={name}
          placeholder="$0.00"
          value={value}
          onChange={handleValueChange}
          style={{
            boxShadow: "none",
          }}
          className={`text-dimGray text-[10px] font-normal px-2 py-1 pt-3 rounded bg-jetBlack border border-eclipseGray hover:border-charcoalGray focus:border-transparent focus:outline-charcoalGray focus:outline-2 focus:outline-offset-0 w-full`}
        />
      </div>
    </div>
  );
};

export default MeetingDurationPrice;
