import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { GrFormLocation } from "react-icons/gr";
import { useEffect, useRef, useState } from "react";

type Props = {
  filterValue: string;
  setFilterValue: (event: string) => void;
  filtersArr: { label: string; value: string }[];
  dataArr: {
    name: string;
    imgSrc: any;
    isAvaible?: boolean;
    skills?: string;
    country?: string;
    city?: string;
  }[];
  title: string;
};

const ScrollableComponent = (props: Props) => {
  const { filterValue, setFilterValue, dataArr, filtersArr, title } = props;
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(false);
  const ref = useRef(null);

  const checkScrollPosition = () => {
    const scrollContainer = ref.current;
    if (scrollContainer) {
      setCanScrollLeft(scrollContainer.scrollLeft > 0);
      setCanScrollRight(
        scrollContainer.scrollLeft <
          scrollContainer.scrollWidth - scrollContainer.clientWidth - 1
      );
    }
  };

  const scrollLeft = () => {
    if (ref.current) {
      ref.current.scrollBy({ left: -100, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (ref.current) {
      ref.current.scrollBy({ left: 100, behavior: "smooth" });
    }
  };

  const handleFilters = (value: string) => {
    setFilterValue(value);
    console.log("Artist filter value", value);
  };

  const handleViewAll = () => {
    console.log("View All");
  };

  useEffect(() => {
    checkScrollPosition();
    const el = ref.current;
    if (!el) return;

    const onPointerDown = (e) => {
      e.preventDefault();
      el.style.scrollBehavior = "auto";
      const startX = e.pageX - el.offsetLeft;
      const scrollLeft = el.scrollLeft;

      const onPointerMove = (e) => {
        const x = e.pageX - el.offsetLeft;
        const walk = (x - startX) * 2;
        el.scrollLeft = scrollLeft - walk;
      };

      const onPointerUpOrLeave = () => {
        el.style.scrollBehavior = "smooth";
        document.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerup", onPointerUpOrLeave);
        document.removeEventListener("pointerleave", onPointerUpOrLeave);
      };
      document.addEventListener("pointermove", onPointerMove);
      document.addEventListener("pointerup", onPointerUpOrLeave);
      document.addEventListener("pointerleave", onPointerUpOrLeave);
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("scroll", checkScrollPosition);
    return () => el.removeEventListener("scroll", checkScrollPosition);
  }, []);

  return (
    <div className="p-3 pr-2 border-b border-borderColor">
      <div className="flex items-center justify-between">
        <h2 className="text-white text-xl font-semibold mb-1">{title}</h2>

        <div className="flex gap-1">
          <button
            className={`text-lightGreen   ${
              canScrollLeft
                ? "opacity-100 cursor-pointer"
                : "opacity-50 cursor-auto"
            }`}
            onClick={scrollLeft}
          >
            <MdKeyboardArrowLeft className="h-6 w-6" />
          </button>

          <button
            className={`text-lightGreen ${
              canScrollRight
                ? "opacity-100 cursor-pointer"
                : "opacity-50 cursor-auto"
            }`}
            onClick={scrollRight}
          >
            <MdKeyboardArrowRight className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div className="flex gap-1 items-center justify-between">
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

      <div
        ref={ref}
        className="horizontal-scroll-wrapper overflow-auto whitespace-nowrap mt-2"
      >
        <div className="carousel-inner flex gap-2 transition-transform duration-1000 ease-linear">
          {dataArr.map((artist, idx) => {
            const { isAvaible, name, imgSrc, city, country } = artist;

            const formattedSkills = artist.skills?.split(", ").join(" | ");

            return (
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
                {isAvaible && isAvaible === true ? (
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
                ) : (
                  <div className="text-center absolute bottom-6 px-3 w-full">
                    <span className="text-base text-white font-bold italic tracking-[-0.8px] uppercase">
                      {name}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ScrollableComponent;
