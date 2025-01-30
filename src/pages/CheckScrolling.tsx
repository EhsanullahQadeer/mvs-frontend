import ScrollableContainer from "components/util/scrollable-container";
import React, { useState } from "react";

type Props = {};

declare const require: {
  context: (
    directory: string,
    useSubdirectories?: boolean,
    regExp?: RegExp
  ) => {
    keys: () => string[];
    <T>(id: string): T;
  };
};

const importAll = (requireContext) => {
  return requireContext.keys().map(requireContext);
};

const images = importAll(
  require.context("../assets/img/partners", false, /\.(png|jpe?g|svg)$/)
);

const CheckScrolling = (props: Props) => {
  const [filterValue, setFilterValue] = useState("");
  const handleFilters = (value: string) => {
    setFilterValue(value);
    console.log("Artist filter value", value);
  };

  const filtersArr = [
    { label: "Recently Added", value: "recentlyAdded" },
    { label: "Female", value: "female" },
    { label: "Male", value: "male" },
    { label: "Most Popular", value: "mostPopular" },
  ];

  return (
    <div className="m-2">
      <ScrollableContainer
        showScrollArrows={true}
        title="Artist"
      >
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
        <div className="carousel-inner flex transition-transform duration-1000 ease-linear">
          {images.map((image, index) => (
            <img
              key={index} // Use the index as the key
              src={image} // Use the image from the array
              alt={`Slide ${index + 1}`}
              style={{
                borderRadius: 4,
                width: 500,
                height: 200,
                margin: "4px",
              }}
            />
          ))}
        </div>
      </ScrollableContainer>
    </div>
  );
};

export default CheckScrolling;
