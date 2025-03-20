import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Switch,
} from "@mui/material";
import { useState } from "react";
import getMuiStyles from "styles/getMuiStyles";
import NotificationItem from "./NotificationItem";

type Props = {};

const EmailNotifications = (props: Props) => {
  const muiStyles = getMuiStyles();

  const [notificationFrequency, setNotificationFrequency] = useState("day");

  const handleFrequencyChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNotificationFrequency((event.target as HTMLInputElement).value);
  };

  const notificationItemArr = [
    {
      title: "Audio Share",
      desc: "Receive emails when someone shares an audio file with you.",
    },
    {
      title: "Connection Request",
      desc: "Receive an email when someone requests to connect with you.",
    },
    {
      title: "Connection Response",
      desc: "Receive an email when someone responds to your connection request.",
    },
    {
      title: "New Collaborator",
      desc: "Receive an email when someone is added as a collaborator to your project.",
    },
    {
      title: "Collaboration Request",
      desc: "Receive an email when someone requests to collaborate with you.",
    },
    {
      title: "Collaboration Accepted",
      desc: "Receive an email when someone accepts your collaboration request.",
    },
    {
      title: "Demo Payment",
      desc: "Receive an email when someone pays for a demo.",
    },
    {
      title: "Like",
      desc: "Receive an email when someone likes your sample.",
    },
    {
      title: "Follow",
      desc: "Receive an email when someone follows you.",
    },
    {
      title: "Download",
      desc: "Receive an email when someone downloads your sample.",
    },
    {
      title: "Feedback Provided",
      desc: "Receive an email when someone provides feedback on your demo.",
    },
    {
      title: "Fanwall Post",
      desc: "Receive an email when someone posts on your fanwall.",
    },
  ];

  return (
    <div className="px-4 py-5 border-b border-eclipseGray">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-5">
          <div className="pt-2.5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-lg text-white font-semibold">
                Email
              </p>

              <div>
                <Switch defaultChecked sx={muiStyles.switchToggleStyle} />
              </div>
            </div>

            <p className="text-sm font-normal text-coolGray">
              Receive emails to stay informed about what's happening when you're
              not on MVSSIVE. You can disable them at any time.
            </p>
          </div>
          {/* <div>
            <p className="text-sm font-normal text-white mb-2">
              Notification Frequency
            </p>

            <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={notificationFrequency}
                onChange={handleFrequencyChange}
              >
                <FormControlLabel
                  value="day"
                  control={<Radio />}
                  label="Once a day"
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
                  value="week"
                  control={<Radio />}
                  label="Once a week"
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
                  value="month"
                  control={<Radio />}
                  label="Once a month"
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
          </div> */}
        </div>

        <div className="flex flex-col gap-[30px]">
          {notificationItemArr.map((item, idx) => {
            const { title, desc } = item;
            return (
              <div key={title + idx}>
                <NotificationItem
                  {...{
                    title,
                    desc,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EmailNotifications;
