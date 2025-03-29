import React from "react";
import ProfileSection from "./ProfileSection";
import { IArtistProfileData } from "./types";

interface ArtistProfileMobileProps {
  artistData: IArtistProfileData | null;
  creditsData: any[];
  connectionDetail: any;
  setConnectionDetail: React.Dispatch<React.SetStateAction<any>>;
  chatOpen: boolean;
  setChatOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ArtistProfileMobile: React.FC<ArtistProfileMobileProps> = ({
  artistData,
  creditsData,
  connectionDetail,
  setConnectionDetail,
  chatOpen,
  setChatOpen,
}) => {
  return (
    <div>
      <ProfileSection
        artistData={artistData}
        creditsData={creditsData}
        connectionDetail={connectionDetail}
        setConnectionDetail={setConnectionDetail}
        chatOpen={chatOpen}
        setChatOpen={setChatOpen}
      />
    </div>
  );
};

export default ArtistProfileMobile;
