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
          <div className="w-24 h-24 object-cover">
            <img
              src={thumbnail}
              alt="credits"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <h2 className="text-white font-semibold text-xs">{track_name}</h2>
            <p className="text-[#E5E5E5] text-[10px] font-medium">
              {artist_name}
            </p>
            {/* <p className="text-coolGray text-xs">{date}</p> */}

            {/* <div className="flex mt-3">
              <button className="text-white h-6 text-xs flex items-center justify-center bg-eclipseGray p-2 rounded text-[10px]">
                {p1}
              </button>
              <button className="text-white w-full h-6 text-xs flex  items-center justify-center bg-eclipseGray p-2 rounded text-[10px]">
                {p1}
              </button>
              <button className="text-white w-full h-6 text-xs flex  items-center justify-center bg-eclipseGray p-2 rounded text-[10px]">
                {p1}
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCards;
