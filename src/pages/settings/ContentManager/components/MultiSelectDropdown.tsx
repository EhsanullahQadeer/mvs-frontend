import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import getMuiStyles from "styles/getMuiStyles";
import { ReactComponent as CancelIcon } from "../../../../assets/icons/cancelIcon.svg";

type Props = {
  name: string;
  label?: string;
  dropdownItems: string[];
  value: string[];
  setValue: (newRoles: string[]) => void;
};

function MultiSelectDropdown(props: Props) {
  const { name, label, dropdownItems, value, setValue } = props;

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    setValue(
      typeof event.target.value === "string"
        ? event.target.value.split(",")
        : event.target.value
    );
  };

  const muiStyles = getMuiStyles();

  return (
    <div className="flex flex-col gap-1 flex-1">
      {label && (
        <label htmlFor={name} className="text-silver text-sm font-normal">
          {label}
        </label>
      )}
      <FormControl fullWidth variant="outlined" sx={{ width: "350px" }}>
        <Select
          id={name}
          name={name}
          value={value}
          multiple
          onChange={handleChange}
          sx={muiStyles.singleSelectDropdownStyles}
          renderValue={(selected) => (
            <div className="gap-2.5 flex flex-wrap">
              {selected.map((role) => (
                <div
                  key={role}
                  className="flex gap-2 py-1 px-3 rounded-[20px] bg-eerieBlack border border-eerieBlack items-center"
                >
                  <span className="text-xs text-mediumGray font-normal">
                    {role}
                  </span>
                  <div className="w-2.5 h-2.5 cursor-pointer text-mediumGray flex justify-center items-center">
                    <CancelIcon className="w-2 h-2" />
                  </div>
                </div>
              ))}
            </div>
          )}
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

export default MultiSelectDropdown;
