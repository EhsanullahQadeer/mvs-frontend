import { GrFormLocation } from "react-icons/gr";
import ScrollableContainer from "components/util/scrollable-container";
import { useState } from "react";
import { artistData } from "./data";
import { userLabel } from "utils/usersTags";
import { getKeyByValue } from "utils/jsHandlers";
import { getUsersByTag } from "api/user";
import "../styles/user-card.scss";

type Props = {
  setUsersByTag: (value: any) => void;
  dataArr: any;
  title: string;
};
const { filtersArr } = artistData;

const ScrollableComponent = (props: Props) => {
  const { dataArr, title, setUsersByTag } = props;
  const [filterValue, setFilterValue] = useState("");
  const [isScrollableContainer, setIsScrollableContainer] = useState(false);
  const tag = getKeyByValue(userLabel, title);

  const handleFilters = async (filterName: string) => {
    const value = filterValue === filterName ? "" : filterName;
    setFilterValue(value);
    const params: any = { tag, limit: 20 };
    if (value === "mostPopular") {
      params["topPopular"] = true;
    }
    if (value === "recentlyAdded") {
      params["recentlyAdded"] = true;
    }
    if (value === "male" || value === "female") {
      params["gender"] = value;
    }
    const users = await getUsersByTag(params);

    setUsersByTag((prev: any) => {
      return { ...prev, [tag]: users.data };
    });
  };

  const handleViewAll = () => {
    console.log("View All");
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
        {dataArr.map((user, idx) => {
          const {
            artist_name,
            primary_label,
            sub_label,
            name,
            thumbnail,
            city,
            state: country,
          } = user;
          const concatedRoles = primary_label + " | " + sub_label;
          const role =
            concatedRoles.length > 17 ? primary_label : concatedRoles;
          return (
            <div
              key={name + idx}
              className="user-card-wrap cursor-grab carousel-inner px-1 flex transition-transform duration-1000 ease-linear"
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
                url(${thumbnail})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backdropFilter: "",
                }}
                className={`border-[1px] rounded-lg w-[152px] h-[260px] relative group transition-all ease-in-out duration-500 border-eclipseGray hover:border-secondaryBlue`}
              >
                <div className="img-container w-[152px] h-[260px] rounded-lg">
                  <div className="absolute  bottom-[18px] left-0 right-0 px-3 w-full text-center">
                    <div className="">
                      <span className="text-xl text-white font-bold italic tracking-[-0.1px] uppercase mb-1 block whitespace-normal">
                        {artist_name.length > 15
                          ? artist_name.slice(0, 15) + "..."
                          : artist_name}
                      </span>

                      <div className="max-h-0 overflow-hidden transition-all ease-in-out duration-500 group-hover:max-h-[85px] opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100">
                        <div className="font-normal text-sm text-white capitalize mb-1">
                          {role}
                        </div>

                        <div className="text-xs font-normal text-white flex gap-0.5 items-center justify-center mb-3">
                          <span className="text-white">
                            <GrFormLocation className="h-4 w-4" />
                          </span>
                          <span className="font-normal capitalize">{city}</span>
                          ,
                          <span className="font-normal uppercase">
                            {country}
                          </span>
                        </div>

                        <button className="bg-limeGreen text-black px-3 py-2 rounded-lg cursor-pointer text-xs font-normal">
                          View Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </ScrollableContainer>
    </div>
  );
};

export default ScrollableComponent;
