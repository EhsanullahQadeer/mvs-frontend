/* eslint-disable @typescript-eslint/no-unused-vars */
import "../styles/user-card.scss";
import { artistData } from "./data";
import { getUsersByTag } from "api/user";
import { loadAsset } from "shared/utils/dateUtils";
import { userTagsObj } from "shared/utils/usersTags";
import { GrFormLocation } from "react-icons/gr";
import { UserFiltersDTO } from "api/user/types";
import { getKeyByValue } from "shared/utils/jsHandlers";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import ScrollableContainer from "components/util/scrollable-container";
import useHandleArtistSelected from "../hooks/useHandleArtistSelected";

interface Props {
  primaryUserRole: string;
  dataArr: any;
  title: string;
  setUsersByTag: Dispatch<SetStateAction<Record<string, any>>>;
  setIsFilterApplied: Dispatch<SetStateAction<string>>;
}
const { filtersArr } = artistData;

const ScrollableComponent = (props: Props) => {

  const { primaryUserRole, dataArr, title, setUsersByTag, setIsFilterApplied } = props;
  //console.log("props", props);
  const { handleArtistSelected } = useHandleArtistSelected();

  const [filterValue, setFilterValue] = useState<string>("");
  const [isScrollableContainer, setIsScrollableContainer] = useState(false);

  // Separate states for filtered and default data
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [initialData, setInitialData] = useState<any[]>(dataArr);

  const tag = getKeyByValue(userTagsObj, title);

  // Handle applying filters
  const handleFilters = async (filterName: string) => {
    const value = filterValue === filterName ? "" : filterName;
    setFilterValue(value);

    const params: UserFiltersDTO = {
      primaryUserRole: primaryUserRole,
    };
    if (value === "mostPopular") {
      params["topPopular"] = true;
    }
    if (value === "recentlyAdded") {
      params["recentlyAdded"] = true;
    }
    if (value === "male" || value === "female") {
      params["gender"] = value;
    }

    // Fetch users based on the applied filters
    const users = await getUsersByTag(params, 50);
    //console.log("users here", users.data);
    // If filter is cleared, reset to initial data
    if (value === "") {
      setFilteredData(initialData);
    } else {
      // Otherwise, set the filtered data
      setFilteredData(users.data);
    }

    // Update parent component's state with filtered data
    setUsersByTag((prev: any) => ({
      ...prev,
      [tag]: users.data,
    }));
  };

  // Effect to reset filteredData to initialData on filter clear
  useEffect(() => {
    if (filterValue === "") {
      setFilteredData(initialData);
    }
  }, [filterValue, initialData]);

  const handleViewAll = () => {
    setIsFilterApplied(primaryUserRole);
  };

  const FiltersHeader = () => (
    <div className="flex gap-1 items-center justify-between pt-1 pb-2">
      <div className="flex gap-1 flex-wrap">
        {filtersArr.map((elem, idx) => {
          const { label, value } = elem;
          return (
            <div
              key={label + idx}
              onClick={() => handleFilters(value)}
              className={`border-[1px] cursor-pointer px-3 py-2 rounded-[35px] text-[12px] font-normal ${
                filterValue === value
                  ? "bg-limeGreen border-limeGreen text-black"
                  : "border-eclipseGray bg-darkGray text-charcoalGray"
              }`}
            >
              {label}
            </div>
          );
        })}
      </div>
      {isScrollableContainer && (
        <span
          className="font-normal text-sm text-coolGray cursor-pointer"
          onClick={handleViewAll}
        >
          View All
        </span>
      )}
    </div>
  );

  return (
    <div className="px-2 py-3">
      <ScrollableContainer
        {...{
          filtersHeader: <FiltersHeader />,
          title,
          showScrollArrows: true,
          setIsScrollableContainer,
        }}
      >
        {filteredData.length > 0 ? (
          filteredData.map((user, idx) => {
            const {
              professional_name,
              primary_role,
              secondary_role,
              thumbnail,
              city,
              state: country,
            } = user;
            const concatedRoles = primary_role + " | " + secondary_role;
            const role =
              concatedRoles.length > 17 ? primary_role : concatedRoles;
            const concatedLocation = city + " , " + country;
            const location =
              concatedLocation.length > 17 ? country : concatedLocation;
            return (              
              <div
                key={professional_name + idx}
                className="user-card-wrap cursor-grab carousel-inner px-1 flex transition-transform duration-1000 ease-linear"
                onClick={() => handleArtistSelected(user)}
              >
                <div
                  style={{
                    background: `linear-gradient(
                    180deg,
                    rgba(0, 0, 0, 0) 3.28%,
                    rgba(0, 0, 0, 0.9) 72.01%,
                    #000 100%
                  ),
                  linear-gradient(0deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 100%),
                  url(${loadAsset(thumbnail)})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backdropFilter: "",
                  }}
                  className={`border-[1px] rounded-lg w-[152px] h-[260px] relative group transition-all ease-in-out duration-500 border-eclipseGray hover:border-secondaryBlue`}
                >
                  <div className="img-container w-[152px] h-[260px] rounded-lg">
                    <div className="absolute bottom-[18px] left-0 right-0 px-3 w-full text-center">
                      <span className="text-xl text-white font-bold italic tracking-[-0.1px] uppercase mb-1 block whitespace-normal overflow-hidden text-ellipsis" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', wordBreak: 'break-word' }}>
                        {professional_name}
                      </span>

                      <div className="max-h-0 overflow-hidden transition-all ease-in-out duration-500 group-hover:max-h-[85px] opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100">
                        <div className="font-normal text-sm text-white capitalize mb-1">
                          {role}
                        </div>

                        <div className="text-xs font-normal text-white flex gap-0.5 items-center justify-center mb-3">
                          <span className="text-white">
                            <GrFormLocation className="h-4 w-4" />
                          </span>
                          <span className="font-normal capitalize">
                            {location}
                          </span>
                        </div>

                        <button
                          className="bg-limeGreen text-black px-3 py-2 rounded-lg cursor-pointer text-xs font-normal"
                          onClick={() => handleArtistSelected(user)}
                        >
                          View Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            );
          })
        ) : (
          // If no results, show a message
          <div className="text-center text-gray-500 py-10"></div>
        )}
      </ScrollableContainer>
    </div>
  );
};

export default ScrollableComponent;
