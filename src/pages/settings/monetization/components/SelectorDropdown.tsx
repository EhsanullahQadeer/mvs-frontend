/*************************************************************************
 * @file SelectorDropdown.tsx
 * @author Ehsanullah Qadeer
 * @desc  This is the component for the mui dropdown to select one element.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

import { useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import getMuiStyles from "styles/getMuiStyles";
import { useFormikContext } from "formik";

type Props = {
  name: string;
  label?: string;
  dropdownItems: number[];
};

function SelectorDropdown(props: Props) {
  const { name, label, dropdownItems } = props;
  const { setFieldValue, values } = useFormikContext();

  const [itemSelected, setItemSelected] = useState(values[name]);

  const handleItemChange = (event: SelectChangeEvent) => {
    setItemSelected(event.target.value as string);
    setFieldValue(`${name}`, event.target.value);
  };

  const muiStyles = getMuiStyles();

  return (
    <div className="flex flex-col gap-1 flex-1">
      <div className="relative">
        <div className="absolute left-2 top-1 text-dimGray text-[10px] font-normal z-50">
          {label}
        </div>
        <FormControl fullWidth variant="outlined">
          <Select
            id={name}
            name={name}
            value={itemSelected}
            onChange={handleItemChange}
            sx={{
              ...muiStyles.singleSelectDropdownStyles,
              ".MuiSelect-select": {
                backgroundColor: "#0F0F0F",
                paddingLeft: "8px",
                paddingTop: "16px",
                paddingBottom: 0,
                fontSize: "10px",
              },

              fieldset: {
                borderRadius: "4px",
              },
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: "#1c1c1c",
                  borderRadius: "8px",

                  ul: {
                    padding: 0,
                  },
                },
              },
            }}
          >
            {dropdownItems.map((item, idx) => {
              return (
                <MenuItem
                  key={idx + item}
                  value={item}
                  sx={muiStyles.selectDropdownMenuItem}
                >
                  {item}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default SelectorDropdown;
