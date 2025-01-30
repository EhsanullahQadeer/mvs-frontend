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
      title: "Direct Messages",
      desc: "Receive emails about direct messages from other users to keep up with your conversations.",
    },
    {
      title: "Membership",
      desc: "Stay updated with emails regarding changes or updates to your memberships.",
    },
    {
      title: "Performance Updates",
      desc: "Get emails with updates on your performance metrics to monitor your progress",
    },
    {
      title: "News about New Products and MVSSIVE Updates",
      desc: "Receive emails about the latest news, new products, and updates from MVSSIVE",
    },
    {
      title: "Collaboration Request",
      desc: "Stay informed with emails about new collaboration requests from other users.",
    },
    {
      title: "New Bids received",
      desc: "Get notified via email when you receive new bids on your samples or projects.",
    },
    {
      title: "Payment Alerts",
      desc: "Get email alerts about payment activities related to your account.",
    },
  ];

  return (
    <div className="px-4 py-5 border-b border-eclipseGray">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-5">
          <div className="pt-2.5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-lg text-white font-semibold">
                Email Notifications
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
          <div>
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
          </div>
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
