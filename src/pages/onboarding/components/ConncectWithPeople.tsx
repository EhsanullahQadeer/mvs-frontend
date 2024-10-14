/*************************************************************************
 * @file ConncectWithPeople.tsx
 * @author Ehsanullah Qadeer
 * @desc  This is the component for ConncectWithPeople of the user while registeration.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

import { CircularProgress } from "@mui/material";
import useDebounce from "hooks/useDebounce";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { conncetPeopleArr } from "../sample-data/sampleData";
import { ReactComponent as CancelIcon } from "../../../assets/icons/cancelIcon.svg";

type Props = {
  markSectionAsCompleted: () => void;
  isActive: boolean;
};

const ConncectWithPeople = (props: Props) => {
  const { markSectionAsCompleted, isActive } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  // Debounce the search value
  const debouncedSearchValue = useDebounce(searchTerm, 300);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  useEffect(() => {
    if (isActive) {
      markSectionAsCompleted();
    }
  }, [isActive]);

  return (
    <div>
      <p className="text-sm font-normal text-mediumGray">
        Find and connect with people who share your interests. Customize your
        profile, discover like-minded individuals, and start building meaningful
        connections today.
      </p>

      <div className="mt-[50px]">
        <div className="flex-1 flex justify-center">
          <div className="w-2/5 relative">
            <input
              type="text"
              placeholder="Search for someone specific to connect with...."
              className={`w-full text-coolGray text-sm font-normal px-4 py-3 pl-11 rounded-lg bg-jetBlack border border-eclipseGray hover:border-charcoalGray focus:border-transparent focus:outline-charcoalGray focus:outline-2 focus:outline-offset-0`}
              value={searchTerm}
              onChange={handleSearchChange}
            />

            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-coolGray flex w-4 h-4">
              <FiSearch className="w-full h-full" />
            </div>

            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4C4C4C] cursor-pointer flex">
              {loading && (
                <CircularProgress style={{ color: "#C4FF48" }} size={20} />
              )}
            </div>
          </div>
        </div>

        <div className="mt-[50px] flex justify-center">
          <div className="w-11/12 flex flex-wrap gap-5 justify-center">
            {conncetPeopleArr.map((people, idx) => {
              const { thumbnaiSrc, name, role, followers } = people;
              return (
                <div
                  key={idx}
                  className="w-[230px] bg-eerieBlack rounded-lg relative"
                >
                  <div className="absolute top-2.5 right-2.5 cursor-pointer w-4 h-4 text-coolGray z-10 flex justify-center items-center">
                    <CancelIcon className="w-2.5 h-2.5" />
                  </div>
                  <div
                    style={{
                      background:
                        "linear-gradient(90deg, #7329E0 0%, #050100 50.5%, #006E89 100%)",
                    }}
                    className="h-[66px] w-full relative rounded-t-lg"
                  >
                    <div className="w-[92px] h-[92px] bg-eerieBlack rounded-full absolute top-1/2 mx-[9px] flex justify-center items-center">
                      <div className="w-[84px] h-[84px]">
                        <img
                          src={thumbnaiSrc}
                          alt="thumbnaiSrc"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3.5 px-4 mt-[60px] mb-4">
                    <div>
                      <h3 className="text-white text-base font-semibold">
                        {name}
                      </h3>
                      <span className="text-coolGray text-sm font-normal">
                        {role}
                      </span>

                      <div className="flex flex-wrap gap-1 mt-2.5">
                        <div className="bg-eclipseGray rounded-md px-2 py-1 text-coolGray text-sm font-normal">
                          R&B
                        </div>
                        <div className="bg-eclipseGray rounded-md px-2 py-1 text-coolGray text-sm font-normal">
                          Pop
                        </div>
                        <div className="bg-eclipseGray rounded-md px-2 py-1 text-coolGray text-sm font-normal">
                          RKT
                        </div>
                      </div>
                    </div>

                    <div className="text-coolGray text-sm font-normal">
                      <span className="text-white">{followers} </span>
                      Followers
                    </div>

                    <div className="flex gap-2">
                      <div className="rounded-3xl text-coolGray text-sm font-normal flex-1 border border-coolGray text-center py-1 cursor-pointer">
                        Follow
                      </div>

                      <div className="rounded-3xl text-coolGray text-sm font-normal flex-1 border border-coolGray text-center py-1 cursor-pointer">
                        Connect
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConncectWithPeople;
