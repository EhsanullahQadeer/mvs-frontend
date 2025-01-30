import BlockedAccounts from "./components/BlockedAccounts";
import DataPrivacyOptions from "./components/DataPrivacyOptions";
import ViewPrivacy from "./components/ViewPrivacy";

type Props = {};

const Privacy = (props: Props) => {
  return (
    <>
      <div>
        <h2 className="text-white px-3 py-4 text-xl font-semibold border-b border-eclipseGray">
          Privacy
        </h2>

        <div className="flex flex-col gap-[50px]">
          <ViewPrivacy />
          <BlockedAccounts />
          <DataPrivacyOptions />
        </div>
      </div>
    </>
  );
};

export default Privacy;
