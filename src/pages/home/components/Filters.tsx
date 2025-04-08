import { userTagsObj } from "utils/usersTags";

interface Props {
  filterValue: string;
  setFilterValue: (event: string) => void;
}

const Filters = (props: Props) => {
  const { filterValue, setFilterValue } = props;
  const handleFilters = (value: string) => {
    setFilterValue(filterValue === value ? "" : value);
  };

  return (
    <div className="">
      <div className="mb-5  w-full flex flex-col justify-center items-center py-4 border border-eerieBlack">
        <h2 className="text-lightGray text-2xl font-bold mb-1">
          Discover Partners
        </h2>
        <p className="text-sm font-normal text-dimGray">
          Connect and work with the world’s top enginners, producers, and
          songwriters
        </p>
      </div>

      <div className="flex w-full mb-3  items-center justify-center flex-wrap gap-2">
        <div className="flex mx-auto border border-eerieBlack rounded-full p-2 gap-2 flex-wrap">
          {Object.entries(userTagsObj).map(([value, label], idx) => {
            return (
              <div
                key={label + idx}
                onClick={() => handleFilters(value)}
                className={` cursor-pointer px-3 py-2 rounded-[35px] text-[12px] font-normal ${
                  filterValue === value
                    ? "bg-limeGreen border-limeGreen text-black"
                    : " text-charcoalGray"
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
