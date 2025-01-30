/*************************************************************************
 * @file PriceFieldSection.tsx
 * @author Ehsanullah Qadeer
 * @desc  This is the component for fees field with labels.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

import { TextField } from "@mui/material";
import { useFormikContext } from "formik";
import { useState } from "react";

type Props = {
  buttonText: string;
  title: string;
  desc: string;
  label: string;
  fieldDesc: string;
  name: string;
};

const PriceFieldSection = (props: Props) => {
  const { buttonText, title, desc, label, fieldDesc, name } = props;

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
      <div className="mb-10">
        <div className="flex items-center justify-between mb-2">
          <p className="text-lg text-white font-semibold">{title}</p>

          <button
            type="submit"
            className="px-3 py-2 border border-eclipseGray text-dimGray text-xs font-normal rounded-[30px] cursor-pointer bg-jetBlack w-[120px] flex justify-center items-center"
          >
            {buttonText}
          </button>
        </div>

        <p className="text-sm font-normal text-dimGray">{desc}</p>
      </div>

      <div>
        <div className="w-[432px]">
          <TextField
            label={label}
            fullWidth
            focused
            placeholder="$20.00"
            value={value}
            onChange={handleValueChange}
            sx={{
              "& .MuiInputBase-root": {
                color: "#848484",
                fontSize: "14px",
              },
              "& .MuiInputBase-input": {
                boxShadow: "none",
                backgroundColor: "#0F0F0F",
                borderRadius: "8px",
                padding: "12px 16px",
              },
              "& .MuiInputLabel-root": {
                color: "#BAFF49 !important",
                backgroundColor: "#131313",
                fontSize: "12px",
                paddingX: "4px",
              },
              fieldset: {
                borderRadius: "8px",
                border: "1px solid #242424 !important",
              },

              "& .css-14lo706": {
                width: 0,
              },
            }}
          />
        </div>

        <p className="mt-2 text-dimGray text-xs font-normal">{fieldDesc}</p>
      </div>
    </div>
  );
};

export default PriceFieldSection;
