import React from "react";

type Props = {};

const DataPrivacyOptions = (props: Props) => {
  return (
    <div className="px-4 py-5 border-t border-eclipseGray">
      <div className="mb-4">
        <p className="text-base text-white font-semibold">
          Data Privacy Options
        </p>
      </div>
      <div className="flex items-center justify-between mb-8 gap-2">
        <div>
          <p className="text-sm text-white font-normal mb-2">
            Download your information
          </p>

          <p className="text-xs font-normal text-dimGray">
            Your information includes the content you've shared, your activity,
            and the data we collect, select the information you want. When the
            lies are ready, you can download them on your device.
          </p>
        </div>

        <div className="cursor-pointer text-charcoalGray bg-limeGreen py-2 rounded-[30px] text-sm font-semibold w-[86px] flex justify-center items-center">
          Download
        </div>
      </div>

      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-sm text-white font-normal mb-2">
            Transfer a copy of your information
          </p>

          <p className="text-xs font-normal text-dimGray">
            Your information includes the content you've shared, your activity,
            and the data we collect, select the information you want. When the
            lies are ready, you can download them on your device.
          </p>
        </div>

        <div className="cursor-pointer text-charcoalGray bg-limeGreen h-full px-3 py-2 rounded-[30px] text-sm font-semibold w-[86px] flex justify-center items-center">
          Transfer
        </div>
      </div>
    </div>
  );
};

export default DataPrivacyOptions;
