// THIRD PARTY IMPORTS
import { Select, MenuItem, Chip, FormControl } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

/* LOCAL IMPORTS */
import getMuiStyles from "styles/getMuiStyles";

interface Props {
  dataArr: string[];
  selectedSkills: string[];
  setSelectedSkills: React.Dispatch<React.SetStateAction<string[]>>;
  label: string;
  isEditable?: boolean;
  name: string;
  inputBgColor?: string;
  labelColor?: string;
  screen?: string;
  maxSelections?: number;
}

const MultiSelectDropdown = (props: Props) => {
  const {
    dataArr,
    selectedSkills,
    setSelectedSkills,
    label,
    isEditable = true,
    name,
    inputBgColor,
    labelColor,
    screen,
    maxSelections = 2,
  } = props;

  // hook for mui styles
  const muiStyles = getMuiStyles();

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    
    // Convert to array if it's a string
    const selectedValues = typeof value === "string" ? [value] : value;
    
    // If trying to add a new item and already at max selections, don't add
    if (selectedValues.length > maxSelections) {
      // Only keep the most recent selections up to maxSelections
      const newSelections = selectedValues.slice(-maxSelections);
      setSelectedSkills(newSelections);
    } else {
      setSelectedSkills(selectedValues);
    }
  };

  // Common chip styling to ensure consistency between edit and view modes
  const chipStyle = {
    ...muiStyles.muiChip,
    ...(screen === "onBoarding" && {
      color: "#999999",
      borderRadius: "20px",
      backgroundColor: "#1C1C1C",
      height: "auto"
    }),
    "& .MuiChip-label": {
      color: "#FFFFFF"
    }
  };

  // If not editable, render just the chips without the dropdown functionality
  if (!isEditable) {
    return (
      <div className="flex-1">
        <div
          className={`${
            labelColor ? `text-${labelColor}` : "text-gray"
          } text-sm font-medium mb-1`}
        >
          {label}
        </div>
        <div 
          className="flex flex-wrap gap-2 p-2 rounded"
          style={{ 
            backgroundColor: inputBgColor ? inputBgColor : "#161616",
            minHeight: "48px"
          }}
        >
          {selectedSkills.map((skill, idx) => (
            <Chip
              key={skill + idx}
              label={skill}
              sx={chipStyle}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div
        className={`${
          labelColor ? `text-${labelColor}` : "text-gray"
        } text-sm font-medium mb-1`}
      >
        {label}
      </div>
      <FormControl fullWidth variant="outlined">
        <Select
          labelId="skills-label"
          name={name}
          id={name}
          multiple
          value={selectedSkills}
          onChange={handleChange}
          renderValue={(selected) => (
            <div className="flex flex-wrap gap-2">
              {selectedSkills.map((skill, idx) => (
                <Chip
                  key={skill + idx}
                  label={skill}
                  sx={chipStyle}
                />
              ))}
            </div>
          )}
          sx={{
            ...(screen === "onBoarding"
              ? muiStyles.singleSelectDropdownStyles
              : muiStyles.SelectDropdown),
            ".MuiSelect-select": {
              backgroundColor: inputBgColor ? inputBgColor : "#161616",
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              padding: screen === "onBoarding" ? "12px" : "8px",
              minHeight: "48px",
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
          {dataArr.map((skill) => (
            <MenuItem
              key={skill}
              value={skill}
              disabled={
                selectedSkills.length >= maxSelections && !selectedSkills.includes(skill)
              }
              sx={muiStyles.selectDropdownMenuItem}
            >
              {skill}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MultiSelectDropdown;
