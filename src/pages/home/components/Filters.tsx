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
    <div className="p-3 border-b border-borderColor">
      <div className="mb-5">
        <h2 className="text-lightGray text-2xl font-bold mb-1">
          Discover Partners
        </h2>
        <p className="text-sm font-normal text-dimGray">
          Connect and work with the world’s top enginners, producers, and
          songwriters
        </p>
      </div>

      <div className="flex max-w-[1381px] items-center justify-between flex-wrap gap-2">
        <div className="flex gap-2 flex-wrap">
          {Object.entries(userTagsObj).map(([value, label], idx) => {
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
      </div>
    </div>
  );
};

export default Filters;
