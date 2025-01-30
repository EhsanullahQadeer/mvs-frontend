/*************************************************************************
 * @file Monetization.tsx
 * @author Ehsanullah Qadeer
 * @desc  component Monetization for setting page.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

import AudioDemoFee from "./components/AudioDemoFee";
import InboxFee from "./components/InboxFee";
import MeetingFee from "./components/MeetingFee";

const Monetization = () => {
  return (
    <>
      <div>
        <h2 className="text-white px-3 py-4 text-xl font-semibold border-b border-eclipseGray">
          Monetization
        </h2>

        <div className="px-3 py-4 flex flex-col gap-4">
          <InboxFee />
          <AudioDemoFee />
          <MeetingFee />
        </div>
      </div>
    </>
  );
};

export default Monetization;
