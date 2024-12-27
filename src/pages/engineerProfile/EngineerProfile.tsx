import React from "react";
import Theme from "theme";
import SelectedProfile from "./components/SelectedProfile";
import SubmitTrack from "./components/SubmitTrack";
import CreditPart from "./components/CreditPart";
import VideoCallDetails from "./components/VideoCallDetails";
import Classes from "./components/Classes";
import Review from "./components/Review";
import cover from "../../assets/img/artistImg.png";

const EngineerProfile = () => {
  return (
    <>
      <Theme>
        <SelectedProfile />
        <div className="p-10 border-b border-eclipseGray flex gap-10">
          <div className="w-[42%] ">
            <SubmitTrack />
          </div>
          <div className="w-[58%] ">
            <CreditPart />
          </div>
        </div>
        <div className="p-10 border-b border-eclipseGray">
          <VideoCallDetails />
        </div>
        <div className="p-10  border-eclipseGray">
          <Classes />
        </div>
        <div className="p-10 ">
          <div className="flex gap-1">
            <div className="w-8 h-8 rounded-full border-2 border-charcoalGray aspect-square">
              <img src={cover} alt="" className="w-full h-full object-cover rounded-full"  />
            </div>
            <span className="text-white ">Eman</span>
          </div>
          <div className="text-xs p-1 mt-4 text-coolGray flex items-center justify-center rounded-lg bg-darkGray">
            <p>
              Paris is a highly skilled mastering engineer who relocated to Los
              Angeles from Texas over 20 years ago, pursuing his deep-rooted
              passion for music. With a diverse musical background that spans
              from jazz to punk rock, he originally excelled as a drummer before
              transitioning into mastering. Today, Paris is a self-taught
              mastering engineer who has carved out a respected niche in the
              LA's competitive music industry, where his expertise ensures that
              every record he works on sounds exceptional across all playback
              formats. His journey reflects a commitment to excellence,
              continual growth, and a passion for perfecting his craft.
            </p>
          </div>
        </div>
          <Review />
      </Theme>
    </>
  );
};

export default EngineerProfile;
