/*************************************************************************
 * @file SingleSelectDropdown.tsx
 * @author Ehsanullah Qadeer
 * @desc  This is the component for the mui dropdown to select one element.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import getMuiStyles from "styles/getMuiStyles";

type Props = {
  name: string;
  label: string;
  placeholder: string;
  dropdownItems: string[];
};

function SingleSelectDropdown(props: Props) {
  const { name, label, placeholder, dropdownItems } = props;

  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const muiStyles = getMuiStyles();

  return (
    <div className="flex flex-col gap-1 flex-1">
      <label htmlFor={name} className="text-silver text-sm font-normal">
        {label}
      </label>
      <FormControl fullWidth variant="outlined">
        <Select
          id={name}
          name={name}
          value={age}
          onChange={handleChange}
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
