/*************************************************************************
 * @file ConncectWithPeople.tsx
 * @author Ehsanullah Qadeer
 * @desc  This is the component for ConncectWithPeople of the user while registeration.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

import { FiSearch } from "react-icons/fi";
import { searchAllUsers } from "api/user";
import useDebounce from "hooks/useDebounce";
import { CircularProgress } from "@mui/material";
import { IUserFollowConnection } from "api/user/types";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ReactComponent as CancelIcon } from "../../../assets/icons/cancelIcon.svg";
import Thumbnail from "components/ui/Header/atoms/notificationAtoms/thumbnailAvatar";

const MIN_ITEMS = 21;
const ITEM_WIDTH = 230;
const ITEM_GAP = 20;
const FOLLOW_TO_SHOW = 100;

type Props = {
  markSectionAsCompleted: () => void;
  setFollowUsers: (value: any) => void;
  setConnectUsers: (value: any) => void;
  isPartner: boolean;
  isActive: boolean;
};

const ConncectWithPeople = (props: Props) => {
  const { markSectionAsCompleted, setFollowUsers, setConnectUsers, isPartner } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [peopleList, setPeopleList] = useState([]);
  // Debounce the search value
  const debouncedSearchValue = useDebounce(searchTerm, 300);
  const [followedUsers, setFollowedUsers] = useState<number[]>([]);
  const [connectedUsers, setConnectedUsers] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState<number>(0);
  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
  };
  
  // Function to calculate and set the container height
  const calculateContainerHeight = () => {
    if (!containerRef.current) return;
    const containerWidth = containerRef.current.offsetWidth;
    const itemsPerRow = Math.floor(containerWidth / (ITEM_WIDTH + ITEM_GAP));
    const rows = Math.ceil(MIN_ITEMS / itemsPerRow);
    console.log('dimension', rows * (ITEM_WIDTH + ITEM_GAP));
    setContainerHeight(rows * (ITEM_WIDTH + ITEM_GAP));
  };

  // Hook to calculate height on initial load and window resize
  useLayoutEffect(() => {
    calculateContainerHeight();
    window.addEventListener("resize", calculateContainerHeight);
    return () => window.removeEventListener("resize", calculateContainerHeight);
  }, []);

  // Use searchUsers API if there's a search term, otherwise get popular users
  useEffect(() => {
    const fetchPeopleData = async () => {
      setLoading(true);
      try {
        const paginationDto = { skip: 0, take: 21 };
        if (debouncedSearchValue) {
          const response = await searchAllUsers(
            debouncedSearchValue, 
            paginationDto.take,
            false,
            true,
          );
          setPeopleList(response?.data || []);
        } else {
          const response = await searchAllUsers(
            '',
            paginationDto.take,
            false,
            true,
          );
          setPeopleList(response?.data || []);
        }
      } catch (error) {
        console.error("Error fetching users", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPeopleData();
  }, [debouncedSearchValue]); 


  const handleFollowClick = (id: number) => {
    if (followedUsers.includes(id)) {
      setFollowedUsers((prev) => prev.filter((userId) => userId !== id));
      setFollowUsers((prev) => prev.filter((userId) => userId !== id));
    } else {
      setFollowedUsers((prev) => [...prev, id]);
      setFollowUsers((prev) => [...prev, id]);
    }
  };

  const handleConnectClick = (id: number) => {
    if (connectedUsers.includes(id)) {
      setConnectedUsers((prev) => prev.filter((userId) => userId !== id));
      setConnectUsers((prev) => prev.filter((userId) => userId !== id));
    } else {
      setConnectedUsers((prev) => [...prev, id]);
      setConnectUsers((prev) => [...prev, id]);
    }
  };

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

        <div 
          className="mt-[50px] flex justify-center">
          <div
            ref={containerRef}
            style={{ minHeight: `${containerHeight}px` }}
            className="w-11/12 flex flex-wrap gap-5 justify-center"
          >
            {peopleList.map((people, idx) => {
              const { 
                id, 
                primary_role,
                professional_name, 
                thumbnail, 
                followers, 
                main_genre,
                sub_genre 
              } = people as IUserFollowConnection;
              return (
                <div
                  key={idx}
                  className="w-[230px] h-[300px] bg-eerieBlack rounded-lg relative"
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
                      <Thumbnail professionalName={professional_name} thumbnail={thumbnail} size="84" userId={id}/>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3.5 px-4 mt-[60px] mb-4">
                    <div>
                      <h3 className="text-white text-base font-semibold" style={{ height: professional_name? "auto" : "24px" }}>
                        {professional_name}
                      </h3>
                      <h1 className="text-coolGray text-base" style={{ height: primary_role? "auto" : "24px" }}>
                        {primary_role?.replace(/_/g, ' ')}
                      </h1>
                      <span className="text-coolGray text-sm font-normal">
                        
                      </span>

                      <div className="flex flex-wrap gap-1 mt-2.5" style={{ height: "28px" }}>
                        <div className="bg-eclipseGray rounded-md px-2 py-1 text-coolGray text-sm font-normal" style={{ height: main_genre ? "auto" : "10px" }}>
                          {main_genre}
                        </div>
                        <div className="bg-eclipseGray rounded-md px-2 py-1 text-coolGray text-sm font-normal"  style={{ height: sub_genre ? "auto" : "10px" }}>
                          {sub_genre}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-coolGray text-sm font-normal" style={{ height: "21px" }}>
                      {followers >= FOLLOW_TO_SHOW && (
                        <>
                          <span className="text-white">{followers} </span>
                          Followers
                        </>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <div
                        onClick={() => handleFollowClick(id)}
                        className={`rounded-3xl text-coolGray text-sm font-normal flex-1 border ${
                          followedUsers.includes(id) ? 'bg-charcoalGray text-white' : 'border-coolGray'
                        } text-center py-1 cursor-pointer`}
                      >
                        {followedUsers.includes(id) ? 'Undo' : 'Follow'}
                      </div>

                      <div
                        onClick={() => handleConnectClick(id)}
                        className={`rounded-3xl text-coolGray text-sm font-normal flex-1 border ${
                          connectedUsers.includes(id) ? 'bg-charcoalGray text-white' : 'border-coolGray'
                        } text-center py-1 cursor-pointer`}
                      >
                        {connectedUsers.includes(id) ? 'Undo' : 'Connect'}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-5 mr-5 w-full flex justify-end">
        <button
          onClick={markSectionAsCompleted}
          className="py-3 px-4 rounded-[60px] text-sm font-semibold border cursor-pointer bg-limeGreen border-limeGreen text-jetBlack"
        >
          {!isPartner ? "Complete Sign Up" : "Continue"}
        </button>
      </div>
      </div>
    </div>
  );
};

export default ConncectWithPeople;
