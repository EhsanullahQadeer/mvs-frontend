import { Switch } from "@mui/material";
import NotificationItem from "./NotificationItem";
import getMuiStyles from "styles/getMuiStyles";

type Props = {};

const SmsNotifications = (props: Props) => {
  const muiStyles = getMuiStyles();

  const notificationItemArr = [
    {
      title: "Direct Messages",
      desc: "Receive SMS about direct messages from other users to keep up with your conversations.",
    },
    {
      title: "Payment Alerts",
      desc: "Receive SMS about payment activities related to your account.",
    },
  ];

  return (
    <div className="px-4 py-5 border-t border-eclipseGray">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-5">
          <div className="pt-2.5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-lg text-white font-semibold">
                SMS Notifications
              </p>

              <div>
                <Switch defaultChecked sx={muiStyles.switchToggleStyle} />
              </div>
            </div>

            <p className="text-sm font-normal text-coolGray">
              Receive SMS to stay informed about what's happening when you're
              not on MVSSIVE. You can disable them at any time.
            </p>
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

export default SmsNotifications;
