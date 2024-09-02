import { GrFormLocation } from "react-icons/gr";
import ScrollableContainer from "components/util/scrollable-container";

type Props = {
  filterValue: string;
  setFilterValue: (event: string) => void;
  filtersArr: { label: string; value: string }[];
  // dataArr: {
  //   name: string;
  //   imgSrc: any;
  //   isAvaible?: boolean;
  //   skills?: string;
  //   country?: string;
  //   city?: string;
  // }[];
  dataArr: any;
  title: string;
};

const ScrollableComponent = (props: Props) => {
  const { filterValue, setFilterValue, dataArr, filtersArr, title } = props;

  const handleFilters = (value: string) => {
    setFilterValue(value);
    console.log("user filter value", value);
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
              className={`border-[1px]  cursor-pointer px-3 py-2 rounded-[35px] hover:bg-limeGreen hover:border-limeGreen hover:text-black text-[12px] font-normal ${
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
          console.log("user: ", user);
          const { isAvaible, name, Thumbnail: imgSrc, city, country } = user;

          const formattedSkills = user.skills?.split(", ").join(" | ");

          return (
            <div className="carousel-inner px-1 flex transition-transform duration-1000 ease-linear">
              <div
                key={name + idx}
                className={`border-[1px]  w-[152px] h-[260px] rounded-lg relative img-container ${
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
                <div className="absolute bottom-4 px-3 w-full text-center">
                  <span className="text-xl text-white font-bold italic tracking-[-0.1px] uppercase mb-1">
                    {name}
                  </span>

                  <div className="font-normal text-sm text-white capitalize mb-1">
                    {formattedSkills}
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
          );
        })}
      </ScrollableContainer>
    </div>
  );
};

export default ScrollableComponent;
