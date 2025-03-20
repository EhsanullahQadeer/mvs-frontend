import EmailNotifications from "./components/EmailNotifications";
import SmsNotifications from "./components/SmsNotifications";

type Props = {};

const Notifications = (props: Props) => {
  return (
    <>
      <div>
        <h2 className="text-white px-3 py-4 text-xl font-semibold border-b border-eclipseGray">
          Notifications
        </h2>

        <div className="flex flex-col gap-[50px]">
          <EmailNotifications />
          {/* <SmsNotifications /> */}
        </div>
      </div>
    </>
  );
};

export default Notifications;
