import { GrFormLocation } from "react-icons/gr";
import ScrollableContainer from "components/util/scrollable-container";
import { useState } from "react";
import { artistData } from "./data";
import { userLabel } from "utils/usersTags";
import { getKeyByValue } from "utils/jsHandlers";
import { getUsersByTag } from "api/user";

type Props = {
  setUsersByTag: (value: any) => void;
  dataArr: any;
  title: string;
};
const { filtersArr } = artistData;

const ScrollableComponent = (props: Props) => {
  const { dataArr, title, setUsersByTag } = props;
  const [filterValue, setFilterValue] = useState("");
  const tag = getKeyByValue(userLabel, title);

  const handleFilters = async (value: string) => {
    console.log("Selected filter:", value);

    const params: any = { tag };
    setFilterValue(value);
    if (filterValue === "mostPopular") {
      params["topPopular"] = true;
    } else if (filterValue === "recentlyAdded") {
      params["recentlyAdded"] = true;
    }

    const users = await getUsersByTag(params);

    setUsersByTag((prev: any) => {
      return { ...prev, [tag]: users.data };
    });

    setFilterValue(value);
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
              className={`border-[1px] cursor-pointer px-3 py-2 rounded-[35px] hover:bg-limeGreen hover:border-limeGreen hover:text-black text-[12px] font-normal ${
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
      <span
        className="font-normal text-sm text-coolGray cursor-pointer"
        onClick={handleViewAll}
      >
        View All
      </span>
    </div>
  );

  return (
    <div className="px-2 py-3">
      <ScrollableContainer
        filtersHeader={<FiltersHeader />}
        title={title}
        showScrollArrows={true}
      >
        {dataArr.map((user, idx) => {
          const {
            artist_name,
            isAvaible,
            sub_label,
            name,
            thumbnail: imgSrc,
            city,
            country,
          } = user;

          return (
            <div
              key={name + idx}
              className="carousel-inner px-1 flex transition-transform duration-1000 ease-linear"
            >
              <div
                className={`border-[1px] w-[152px] h-[260px] rounded-lg relative img-container group ${
                  isAvaible && isAvaible === true
                    ? "border-secondaryBlue"
                    : "border-eclipseGray"
                }`}
                style={{
                  background: `linear-gradient(
                    180deg,
                    rgba(0, 0, 0, 0) 3.28%,
                    rgba(0, 0, 0, 0.9) 72.01%,
                    #000 100%
                  ),
                  linear-gradient(0deg, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.1) 100%),
                  url(${imgSrc})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div
                  className="absolute  bottom-0   left-0 right-0 px-3 w-full text-center group-hover:h-full transition-all duration-300 ease-in-out "
                  style={{ height: "60px" }} // Initial height showing only artist name
                >
                  <div className="transition-transform  duration-300 ease-in-out group-hover:transform group-hover:-translate-y-[100px]">
                    <span className="text-xl text-white font-bold italic tracking-[-0.1px] uppercase mb-1 block">
                      {artist_name}
                    </span>

                    <div className="opacity-0 h-0 transition-opacity overflow-hidden duration-500 group-hover:opacity-100 group-hover:h-full">
                      <div className="font-normal text-sm text-white capitalize mb-1">
                        {sub_label}
                      </div>

                      <div className="text-xs font-normal text-white flex gap-0.5 items-center justify-center mb-3">
                        <span className="text-white">
                          <GrFormLocation className="h-4 w-4" />
                        </span>
                        <span className="font-normal capitalize">{city}</span>,
                        <span className="font-normal uppercase">{country}</span>
                      </div>

                      <button className="bg-limeGreen text-black px-3 py-2 rounded-lg cursor-pointer text-xs font-normal">
                        View Profile
                      </button>
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
