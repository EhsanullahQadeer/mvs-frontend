import useHandleArtistSelected from "../hooks/useHandleArtistSelected";

type Props = {
  filtersData: any[];
};

const FilterResultComponent = (props: Props) => {
  const { filtersData } = props;
  const { handleArtistSelected } = useHandleArtistSelected();

  return (
    <div className="user-card-wrap p-3 pr-2 border-b border-borderColor">
      <h2 className="text-white text-xl font-semibold mb-3">Results</h2>

      <div className="flex gap-4 flex-wrap items-center self-stretch">
        {filtersData.map((result, idx) => {
          const {
            artist_name,
            primary_label,
            thumbnail,
            city,
            state: country,
          } = result;
          const concatedLocation = city + " , " + country;
          const location =
            concatedLocation.length > 17 ? country : concatedLocation;
          const singersArr = result.singersCollab?.split(", ");

          return (
            <div
              key={artist_name + idx}
              className={`group cursor-pointer border-[1px]  h-[239px] w-[152px] rounded-lg relative transition-all ease-in-out duration-500 border-eclipseGray hover:border-secondaryBlue`}
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
              }}
            >
              <div className="img-container h-[239px] w-[152px] rounded-lg">
                <div className="absolute bottom-4 px-3 w-full">
                  <span className="text-xl text-white font-bold italic tracking-[-0.1px] uppercase mb-1">
                    {artist_name.length > 15
                      ? artist_name.slice(0, 15) + "..."
                      : artist_name}
                  </span>

                  <div className="text-xs font-normal text-white flex gap-0.5 items-center mb-3">
                    <span className="font-normal capitalize">{location}</span>
                  </div>

                  <div className="px-2 py-1.5 flex border-[1px] border-charcoalGray gap-1 text-gray max-w-max rounded-lg items-center mb-1">
                    <span
                      className={`h-1.5 w-1.5 rounded-full bg-white`}
                    ></span>
                    <span className="capitalize text-[8px] font-normal">
                      {primary_label}
                    </span>
                  </div>

                  <div className="flex gap-1">
                    {singersArr?.map((singer, idx) => {
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

                  <div className="max-h-0 overflow-hidden transition-all ease-in-out duration-500 group-hover:max-h-[45px] opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100">
                    <button
                      className="bg-limeGreen text-black px-3 py-2 rounded-lg cursor-pointer mt-2 text-xs font-normal"
                      onClick={() => handleArtistSelected(result)}
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilterResultComponent;
