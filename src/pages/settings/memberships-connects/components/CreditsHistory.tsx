import { billingListArr } from "../sampleData";
import SimpleTable from "./SimpleTable";

const columns = [
  {
    id: "date",
    label: "Date",
    maxWidth: "250px",
    format: (value: string) => formatDate(value),
  },
  { id: "action", label: "Action" },
  { id: "credits", label: "Credits", maxWidth: "250px" },
];

const formatDate = (dateString: string | number) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
};

const CreditsHistory = () => {
  return (
    <>
      <div>
        <div className="mb-2 py-3">
          <h3 className="text-sm font-semibold text-platinum">
            Credits history
          </h3>
          <p className="text-sm font-normal text-dimGray">
            View your recent credits usage and transaction history.
          </p>
        </div>

        <div className="mb-2">
          <SimpleTable columns={columns} rows={billingListArr} />
        </div>
      </div>
    </>
  );
};

export default CreditsHistory;
