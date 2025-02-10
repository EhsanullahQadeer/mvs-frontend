import mvssiveLogo from "../../assets/icons/mvssive-logo.svg";
import ProfileInfo from "./components/ProfileInfo";
import ProfileRightSection from "./components/ProfileRightSection";

const PublicProfile = () => {
  return (
    <div className="h-svh flex flex-col overflow-hidden">
      <div className="flex px-10 py-3 justify-between items-center">
        <img
          src={mvssiveLogo}
          alt="mvssiveLogo"
          className="w-[123px] h-[17px]"
        />

        <div className="bg-limeGreen w-[176px] h-[42px] rounded-full cursor-pointer text-sm font-semibold text-jetBlack flex justify-center items-center">
          Join MVSSIVE today
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-[25%] border-r border-eclipseGray bg-jetBlack flex">
          <ProfileInfo />
        </div>
        <div className="flex-[75%] flex">
          <ProfileRightSection />
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;
