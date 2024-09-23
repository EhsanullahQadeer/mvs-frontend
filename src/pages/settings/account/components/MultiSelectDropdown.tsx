// THIRD PARTY IMPORTS
import { Select, MenuItem, Chip, FormControl } from "@mui/material";

/* LOCAL IMPORTS */
import getMuiStyles from "styles/getMuiStyles";

interface Props {
  dataArr: string[];
  selectedSkills: string[];
  setSelectedSkills: (value: any) => void;
  label: string;
  isEditable: boolean;
  name: string;
}

const MultiSelectDropdown = (props: Props) => {
  const {
    dataArr,
    selectedSkills,
    setSelectedSkills,
    label,
    isEditable,
    name,
  } = props;

  // hook for mui styles
  const muiStyles = getMuiStyles();

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setSelectedSkills(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div className="flex-1">
      <div className="text-gray text-sm font-medium mb-1">{label}</div>
      <FormControl fullWidth variant="outlined">
        <Select
          labelId="skills-label"
          name={name}
          id={name}
          multiple
          value={selectedSkills}
          onChange={handleChange}
          renderValue={() => null}
          disabled={!isEditable}
          sx={muiStyles.SelectDropdown}
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
                selectedSkills.length >= 3 && !selectedSkills.includes(skill)
              } // Disable if max 3 items are selected
              sx={muiStyles.selectDropdownMenuItem}
            >
              {skill}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* show selected items container */}
      <div className="mt-1 flex flex-wrap gap-2 border-[1px] border-charcoalGray p-2 rounded-lg min-h-12">
        {selectedSkills.map((skill, idx) => (
          <Chip key={skill + idx} label={skill} sx={muiStyles.muiChip} />
        ))}
      </div>
    </div>
  );
};

export default MultiSelectDropdown;
