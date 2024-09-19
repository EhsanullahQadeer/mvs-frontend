/*************************************************************************
 * @file ProfileCards.tsx
 * @author Ehsanullah Qadeer
 * @desc Profile card for artist profile page.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

import React from "react";

// Define a TypeScript interface for props
interface ProfileCardsProps {
  thumbnail: string;
  track_name: string;
  artists: any;
}

const ProfileCards: React.FC<ProfileCardsProps> = (props) => {
  const {
    thumbnail,
    track_name,
    artists,
  } = props;
  const { artist_name } = artists[0];

  return (
    <>
      <div
        className={`w-[310px] cursor-grab rounded-md p-3 border-[1px] border-eclipseGray bg-darkGray`}
      >
        <div className="flex gap-3 rounded-md">
          <div className="min-w-[84px] h-[84px] ">
            <img
              src={thumbnail}
              alt="credits"
              className="w-full h-full object-contain rounded-md"
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <h2 className="text-white font-semibold text-xs text-wrap">{track_name}</h2>
            <p className="text-[#E5E5E5] text-[10px] font-medium">
              {artist_name}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCards;
