import { RootState } from "redux/reducers";
import AllTransactions from "./components/AllTransactions";
import CreditsHistory from "./components/CreditsHistory";
import Memberships from "./components/Memberships";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const MembershipsConnects = () => {
  const state = useSelector((state: RootState) => state);
  const [user, setUser]: any = useState({});
  useEffect(() => {
    setUser(state.auth.user);
  }, [state.auth.user]);
  return (
    <>
      <div>
        <h2 className="text-white px-3 py-4 text-xl font-semibold border-b border-eclipseGray">
          Membership & Connects
        </h2>
      </div>

      <div className="px-4 mb-5">
        <Memberships user={user} />
        <CreditsHistory />
        <AllTransactions />
      </div>
    </>
  );
};

export default MembershipsConnects;
