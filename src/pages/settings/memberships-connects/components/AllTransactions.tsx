import { useNavigate } from "react-router-dom";

const AllTransactions = () => {
  const navigate = useNavigate();

  const handleViewAll = () => {
    navigate("/settings/credits-history/1");
  };

  return (
    <>
      <div className="border border-eclipseGray bg-darkGray p-3 rounded-lg flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-sm text-silver">
            View All Transactions
          </h3>
          <p className="font-normal text-sm text-dimGray">
            Click here to access a full view of your Credits history
          </p>
        </div>

        <div
          onClick={handleViewAll}
          className="rounded-[30px] py-1.5 px-3 text-[10px] font-normal text-silver cursor-pointer border border-dimGray bg-eerieBlack"
        >
          View All
        </div>
      </div>
    </>
  );
};

export default AllTransactions;
