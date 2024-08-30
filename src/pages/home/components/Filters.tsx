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
  };

  return (
    <div className="p-3 border-b border-borderColor">
      <div className="mb-5">
        <h2 className="text-lightGray text-2xl font-bold mb-1">Discover Partners</h2>
        <p className="text-sm font-normal text-neutralGray">
          Connect and work with the world’s top enginners, producers, and
          songwriters
        </p>
      </div>

      <div className="flex max-w-[1381px] items-center justify-between flex-wrap gap-2">
        <div className="p-2 flex justify-between items-center gap-[6px] border-[1px] border-bottonBorder bg-darkGray rounded-lg text-charcoalGray text-xs font-normal">
          Filter By
          <IoIosArrowDown  height={16} width={16}/>
        </div>

        <div className="flex gap-2 flex-wrap">
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
        <div>

        </div>
      </div>
    </div>
  );
};

export default Filters;
