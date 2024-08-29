import { log } from "console";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";

interface Props {
  filterValue: string;
  setFilterValue: (event: string) => void;
}

const filtersArr = [
  { label: "Songwriters", value: "songwriters" },
  { label: "Artist", value: "artist" },
  { label: "Mastering Engineers", value: "masteringEngineers" },
  { label: "Mixing Engineers", value: "mixingEngineers" },
  { label: "Musicians", value: "musicians" },
  { label: "Producers", value: "producers" },
];

const Filters = (props: Props) => {
  const { filterValue, setFilterValue } = props;
  const handleFilters = (value: string) => {
    setFilterValue(value);
    console.log("filter value", value);
  };

  return (
    <div className="p-3 border-b border-borderColor">
      <div className="mb-5">
        <h2 className="text-lightGray text-2xl font-bold">Discover Partners</h2>
        <p className="text-sm font-normal text-neutralGray">
          Connect and work with the world’s top enginners, producers, and
          songwriters
        </p>
      </div>

      <div className="flex max-w-[1381px] items-center justify-between flex-wrap gap-2">
        <div className="p-2 flex justify-between items-center gap-1 border-[1px] border-bottonBorder bg-charcoalGray rounded-lg text-darkGray text-xs font-normal">
          Filter By
          <IoIosArrowDown />
        </div>

        <div className="flex gap-2 flex-wrap">
          {filtersArr.map((elem, idx) => {
            const { label, value } = elem;
            return (
              <div
                key={label + idx}
                onClick={() => handleFilters(value)}
                className={`border-[1px] cursor-pointer px-3 py-2 rounded-[35px] hover:bg-limeGreen hover:border-limeGreen hover:text-black text-[10px] font-normal ${
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
      </div>
    </div>
  );
};

export default Filters;
