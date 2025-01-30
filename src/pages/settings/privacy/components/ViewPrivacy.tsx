import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Switch,
} from "@mui/material";
import { useState } from "react";
import getMuiStyles from "styles/getMuiStyles";

type Props = {};

const ViewPrivacy = (props: Props) => {
  const muiStyles = getMuiStyles();

  const [userStatus, setUserStatus] = useState("verified");

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserStatus((event.target as HTMLInputElement).value);
  };

  return (
    <div className="px-4 py-5 border-b border-eclipseGray">
      <div className="flex flex-col">
        <div className="pt-2.5 mb-11">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-white font-normal">
              Anyone can view your profile
            </p>

            <div>
              <Switch sx={muiStyles.switchToggleStyle} />
            </div>
          </div>

          <p className="text-xs font-normal text-dimGray">
            If you turn this setting off, only verified users will be able to
            view your profile
          </p>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-white font-normal">
              Receive message from anyone
            </p>

            <div>
              <Switch defaultChecked sx={muiStyles.switchToggleStyle} />
            </div>
          </div>

          <p className="text-xs font-normal text-dimGray">
            Select who can message you
          </p>
        </div>

        <div>
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={userStatus}
              onChange={handleStatusChange}
            >
              <FormControlLabel
                value="verified"
                control={<Radio />}
                label="Verified Users"
                sx={{
                  ...muiStyles.radioButtonLabel,
                  svg: {
                    width: "14px",
                    height: "14px",
                  },
                  ".MuiFormControlLabel-label": {
                    fontSize: "12px",
                  },
                }}
              />
              <FormControlLabel
                value="invitation"
                control={<Radio />}
                label="Invitation Only"
                sx={{
                  ...muiStyles.radioButtonLabel,
                  svg: {
                    width: "14px",
                    height: "14px",
                  },
                  ".MuiFormControlLabel-label": {
                    fontSize: "12px",
                  },
                }}
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default ViewPrivacy;
