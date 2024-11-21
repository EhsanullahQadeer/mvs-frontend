import { FiSearch } from "react-icons/fi";
import sampleImg from "../download.png";
type Props = {};

const BlockedAccounts = (props: Props) => {
  const blockedAccUsers = [
    { name: "Angel Cantu", artistName: "@BeckyHill", thumbnail: sampleImg },
    { name: "Becky Hill", artistName: "@BeckyHill", thumbnail: sampleImg },
    { name: "Benito Martinez", artistName: "@BeckyHill", thumbnail: sampleImg },
    { name: "Dua Lipa", artistName: "@BeckyHill", thumbnail: sampleImg },
  ];

  return (
    <div className="px-4 py-5 border-y border-eclipseGray">
      <div className="mb-5">
        <div className="mb-2">
          <p className="text-sm text-white font-normal">Blocked Accounts</p>
        </div>

        <p className="text-xs font-normal text-coolGray">
          Manage Blocked Accounts
        </p>
      </div>

      <div className="mb-2 relative">
        <input
          type="text"
          placeholder="Search..."
          className={`w-full text-dimGray text-xs font-normal px-4 py-3.5 rounded-lg bg-darkGray border border-eclipseGray hover:border-charcoalGray focus:border-transparent focus:outline-charcoalGray focus:outline-2 focus:outline-offset-0 resize-none`}
        />

        <div className="absolute top-1/2 -translate-y-1/2 right-4 w-4 h-4 text-mediumGray">
          <FiSearch />
        </div>
      </div>

      <div className="px-4 py-5 border border-eclipseGray bg-darkGray rounded-lg flex flex-col gap-1">
        {blockedAccUsers.map((user, idx) => {
          const { thumbnail, artistName, name } = user;
          return (
            <div
              key={idx}
              className="py-1 flex justify-between items-center gap-2"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`relative rounded-full p-[1px] bg-gradient-to-r from-blue-500 to-lime-500 w-8 h-8`}
                >
                  <img
                    src={thumbnail}
                    alt="thumbnail"
                    className="h-full w-full rounded-full object-cover border-2 border-gray-900"
                  />
                </div>

                <div>
                  <p className="text-white text-xs font-semibold">{name}</p>
                  <p className="text-coolGray text-[10px] font-normal">
                    {artistName}
                  </p>
                </div>
              </div>

              <div className="px-3 py-2 border border-mediumGray text-mediumGray text-xs font-normal rounded-[30px] cursor-pointer">
                Unlock
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BlockedAccounts;
