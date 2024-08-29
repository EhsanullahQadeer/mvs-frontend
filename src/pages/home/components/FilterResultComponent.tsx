import { filterResults } from "./data";

type Props = {};

const FilterResultComponent = (props: Props) => {
  return (
    <div className="p-3 pr-2 border-b border-borderColor">
      <h2 className="text-white text-xl font-semibold mb-3">Results</h2>

      <div className="flex gap-4 flex-wrap items-center self-stretch">
        {filterResults.map((result, idx) => {
          const { isAvaible, name, imgSrc, city, country, workingSkill } =
            result;

          const singersArr = result.singersCollab?.split(", ");

          return (
            <div
              key={name + idx}
              className={`border-[1px]  h-[239px] rounded-lg relative result-img-container ${
                isAvaible && isAvaible === true
                  ? "border-secondaryBlue"
                  : "border-eclipseGray"
              }`}
            >
              <img
                src={imgSrc}
                alt="result-image"
                className="w-full h-full rounded-lg object-cover"
              />

              <div className="absolute bottom-4 px-3 w-full">
                <span className="text-xl text-white font-bold italic tracking-[-0.1px] uppercase mb-1">
                  {name}
                </span>

                <div className="text-xs font-normal text-white flex gap-0.5 items-center mb-3">
                  <span className="font-normal capitalize">{city}</span>,
                  <span className="font-normal uppercase">{country}</span>
                </div>

                <div className="px-2 py-1.5 flex border-[1px] border-charcoalGray gap-1 text-gray max-w-max rounded-lg items-center mb-1">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      workingSkill === "mixer" ? "bg-darkRed" : "bg-green"
                    }`}
                  ></span>
                  <span className="capitalize text-[8px] font-normal">
                    {workingSkill}
                  </span>
                </div>

                <div className="flex gap-1">
                  {singersArr.map((singer, idx) => {
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

                {isAvaible && isAvaible === true && (
                  <button className="bg-limeGreen text-black px-3 py-2 rounded-lg cursor-pointer mt-2 text-xs font-normal">
                    View Profile
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilterResultComponent;
