import AllTransactions from "./components/AllTransactions";
import CreditsHistory from "./components/CreditsHistory";
import Memberships from "./components/Memberships";

const MembershipsConnects = () => {
  return (
    <>
      <div>
        <h2 className="text-white px-3 py-4 text-xl font-semibold border-b border-eclipseGray">
          Membership & Connects
        </h2>
      </div>

      <div className="px-4 mb-5">
        <Memberships />
        <CreditsHistory />
        <AllTransactions />
      </div>
    </>
  );
};

export default MembershipsConnects;
