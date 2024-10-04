/*************************************************************************
 * @file SingleSelectDropdown.tsx
 * @author Ehsanullah Qadeer
 * @desc  This is the component for the mui dropdown to select one element.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

import React, { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import getMuiStyles from "styles/getMuiStyles";
import { useFormikContext } from "formik";

type Props = {
  name: string;
  label?: string;
  placeholder: string;
  dropdownItems: string[];
};

function SingleSelectDropdown(props: Props) {
  const { name, label, placeholder, dropdownItems } = props;
  const { setFieldValue } = useFormikContext();

  const [itemSelected, setItemSelected] = useState("");

  const handleItemChange = (event: SelectChangeEvent) => {
    setItemSelected(event.target.value as string);
    setFieldValue(`${name}`, event.target.value);
  };

  const muiStyles = getMuiStyles();

  return (
    <div className="flex flex-col gap-1 flex-1">
      {label && (
        <label htmlFor={name} className="text-silver text-sm font-normal">
          {label}
        </label>
      )}
      <FormControl fullWidth variant="outlined">
        <Select
          id={name}
          name={name}
          value={itemSelected}
          onChange={handleItemChange}
          sx={muiStyles.singleSelectDropdownStyles}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: "#131313",
                borderRadius: "8px",

                ul: {
                  padding: 0,
                },
              },
            },
          }}
        >
          <MenuItem disabled value="" sx={muiStyles.selectDropdownMenuItem}>
            <em>{placeholder}</em>
          </MenuItem>

          {dropdownItems.map((item) => {
            return (
              <MenuItem value={item} sx={muiStyles.selectDropdownMenuItem}>
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}

export default SingleSelectDropdown;
