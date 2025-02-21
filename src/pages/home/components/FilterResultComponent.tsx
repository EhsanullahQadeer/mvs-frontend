import { useEffect, useState } from "react";
import useHandleArtistSelected from "../hooks/useHandleArtistSelected";
import { artistData } from "./data";
import { UserFiltersDTO } from "api/user/types";
import { getUsersByTag } from "api/user";

const { filtersArr } = artistData;

type Props = {
  filtersData: any[];
  setFilteredData: (data: any[]) => void;
  initialData: any[];
  primaryUserRole?: string;
};

const FilterResultComponent = (props: Props) => {
  const { filtersData, setFilteredData, initialData, primaryUserRole } = props;
  const { handleArtistSelected } = useHandleArtistSelected();
  const [filterValue, setFilterValue] = useState<string>("");
  const [hasRoleChanged, setHasRoleChanged] = useState(false);

  // Track role changes
  useEffect(() => {
    setHasRoleChanged(true);
  }, [primaryUserRole]);

  // Reset filters when role changes
  useEffect(() => {
    if (hasRoleChanged) {
      setFilterValue("");
      setFilteredData(initialData);
      setHasRoleChanged(false);
    }
  }, [hasRoleChanged, initialData, setFilteredData]);

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
    
    // If filter is cleared, reset to initial data
    if (value === "") {
      setFilteredData(initialData);
    } else {
      // Otherwise, set the filtered data
      //console.log("users", users);
      setFilteredData(users.data);
    }
  };

  return (
    <div className="user-card-wrap p-3 pr-2 border-b border-borderColor">
      <h2 className="text-white text-xl font-semibold mb-3">Results</h2>

      <div className="flex gap-1 flex-wrap mb-4">
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

      <div className="flex gap-4 flex-wrap items-center self-stretch">
        {filtersData.map((result, idx) => {
          const {
            professional_name,
            primary_label,
            thumbnail,
            city,
            state: country,
          } = result;
          const concatedLocation = city + " , " + country;
          const location =
            concatedLocation.length > 17 ? country : concatedLocation;
          const singersArr = result.singersCollab?.split(", ");

          return (
            <div
              key={professional_name + idx}
              className={`group cursor-pointer border-[1px]  h-[239px] w-[152px] rounded-lg relative transition-all ease-in-out duration-500 border-eclipseGray hover:border-secondaryBlue`}
              style={{
                background: `linear-gradient(
                  180deg,
                  rgba(0, 0, 0, 0) 3.28%,
                  rgba(0, 0, 0, 0.9) 72.01%,
                  #000 100%
                ),
                linear-gradient(0deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 100%),
                url(${thumbnail})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              onClick={() => handleArtistSelected(result)}
            >
              <div className="img-container h-[239px] w-[152px] rounded-lg">
                <div className="absolute bottom-4 px-3 w-full">
                  <span className="text-xl text-white font-bold italic tracking-[-0.1px] uppercase mb-1">
                    {professional_name.length > 15
                      ? professional_name.slice(0, 15) + "..."
                      : professional_name}
                  </span>

                  <div className="text-xs font-normal text-white flex gap-0.5 items-center mb-3">
                    <span className="font-normal capitalize">{location}</span>
                  </div>

                  <div className="px-2 py-1.5 flex border-[1px] border-charcoalGray gap-1 text-gray max-w-max rounded-lg items-center mb-1">
                    <span
                      className={`h-1.5 w-1.5 rounded-full bg-white`}
                    ></span>
                    <span className="capitalize text-[8px] font-normal">
                      {primary_label}
                    </span>
                  </div>

                  <div className="flex gap-1">
                    {singersArr?.map((singer, idx) => {
                      return (
                        <div
                          key={singer + idx}
                          className="font-normal text-[8px] text-gray capitalize bg-eclipseGray px-2 py-1.5 rounded"
                        >
                          {singer}
                        </div>
                      );
                    })}
                  </div>

                  <div className="max-h-0 overflow-hidden transition-all ease-in-out duration-500 group-hover:max-h-[45px] opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100">
                    <button
                      className="bg-limeGreen text-black px-3 py-2 rounded-lg cursor-pointer mt-2 text-xs font-normal"
                      onClick={() => handleArtistSelected(result)}
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilterResultComponent;
