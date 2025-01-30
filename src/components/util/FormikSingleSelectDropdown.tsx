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

type DropdownItem = {
  label: string;
  value: string;
};

type Props = {
  name: string;
  label?: string;
  placeholder: string;
  dropdownItems: DropdownItem[];
  inputBgColor?: string;
  labelColor?: string;
  dropdownBgColor?: string;
  disabled?: boolean;
  value?: string;
};

function FormikSingleSelectDropdown(
  props: Props
) {
  const {
    name,
    label,
    placeholder,
    dropdownItems,
    inputBgColor,
    labelColor,
    dropdownBgColor,
    disabled,
    value,
  } = props;
  const { setFieldValue, values } = useFormikContext();

  const [itemSelected, setItemSelected] = useState(value || "");

  const handleItemChange = (event: SelectChangeEvent) => {
    setItemSelected(event.target.value as string);
    setFieldValue(`${name}`, event.target.value);
  };

  const muiStyles = getMuiStyles();

  return (
    <div className="flex flex-col gap-1 flex-1">
      {label && (
        <label
          htmlFor={name}
          className={`${
            labelColor ? `text-${labelColor}` : "text-silver"
          } text-sm font-normal`}
        >
          {label}
        </label>
      )}
      <FormControl fullWidth variant="outlined">
        <Select
          id={name}
          name={name}
          value={itemSelected}
          onChange={handleItemChange}
          disabled={disabled}
          sx={{
            ...muiStyles.singleSelectDropdownStyles,
            ".MuiSelect-select": {
              backgroundColor: inputBgColor ? inputBgColor : "#131313",
              color: "white",
            },
            "& .MuiSelect-icon": {
              color: "white"
            }
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: dropdownBgColor ? dropdownBgColor : "#131313",
                borderRadius: "8px",
                ul: {
                  padding: 0,
                },
                "& .MuiMenuItem-root": {
                  color: "white"
                }
              },
            },
          }}
        >
          <MenuItem disabled value="" sx={{
            ...muiStyles.selectDropdownMenuItem,
            color: "white",
          }}>
            <em>{placeholder}</em>
          </MenuItem>

          {dropdownItems.map((item: DropdownItem, idx: number) => (
            <MenuItem
              key={`${item.value}-${idx}`}
              value={item.value}
              style={{
                color: 'white',
                backgroundColor: dropdownBgColor ? dropdownBgColor : "#131313",
              }}
            >
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default FormikSingleSelectDropdown;
