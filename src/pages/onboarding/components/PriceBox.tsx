/*************************************************************************
 * @file PriceBox.tsx
 * @author Ehsanullah Qadeer
 * @desc  This is the component for pricing section of the user while registeration.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

import { TextField } from "@mui/material";
import { useFormikContext } from "formik";
import { useState } from "react";

type Props = {
  title: string;
  desc: string;
  label: string;
  fieldDesc: string;
  name: string;
};

const PriceBox = (props: Props) => {
  const { title, desc, label, fieldDesc, name } = props;

  const { setFieldValue } = useFormikContext();

  const [value, setValue] = useState("");

  const handleValueChange = (event) => {
    setValue(event.target.value as string);
    setFieldValue(`${name}`, event.target.value);
  };

  return (
    <div className="bg-darkGray border border-eerieBlack p-5 rounded-lg flex-1">
      <h3 className="text-base font-semibold text-white leading-[19px]">
        {title}
      </h3>

      <p className="mt-1 text-mediumGray font-normal text-xs">{desc}</p>

      <div className="mt-10">
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
            },
            "& .MuiInputBase-input": {
              boxShadow: "none",
              backgroundColor: "#0F0F0F",
              borderRadius: "8px",
            },
            "& .MuiInputLabel-root": {
              color: "#BAFF49 !important",
              backgroundColor: "#131313",
            },
            fieldset: {
              borderRadius: "8px",
              border: "1px solid #242424 !important",
            },
          }}
        />
      </div>

      <p className="mt-1 mx-1 text-dimGray text-[10px] font-normal">
        {fieldDesc}
      </p>
    </div>
  );
};

export default PriceBox;
