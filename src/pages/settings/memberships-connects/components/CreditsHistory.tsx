import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import getMuiStyles from "styles/getMuiStyles";
import { billingListArr } from "../sampleData";

interface Column {
  id: "date" | "action" | "credits";
  label: string;
  maxWidth?: string;
}

const columns: readonly Column[] = [
  { id: "date", label: "Date", maxWidth: "250px" },
  { id: "action", label: "Action" },
  {
    id: "credits",
    label: "Credits",
    maxWidth: "250px",
  },
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
  const muiStyles = getMuiStyles();

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
          <Paper
            sx={{
              maxWidth: "100%",
              overflow: "hidden",
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
              backgroundColor: "transparent",
            }}
          >
            <TableContainer
              className="custom-dropdown"
              sx={{
                maxHeight: 400,
                border: "1px solid #1C1C1C",
              }}
            >
              <Table stickyHeader>
                <TableHead sx={muiStyles.tableHead}>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        sx={{
                          maxWidth: column.maxWidth,
                          backgroundColor: "#131313 !important",
                          color: "#B2B2B2 !important",
                          borderTop: "0px !important",
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody sx={muiStyles.tableBody}>
                  {billingListArr.map((row, idx) => {
                    const isLastItem = idx + 1 === billingListArr.length;
                    return (
                      <TableRow hover tabIndex={-1} key={idx}>
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell
                              key={column.id}
                              sx={{
                                borderBottom: isLastItem && "0px !important",
                              }}
                            >
                              {column.id === "date" ? formatDate(value) : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>
      </div>
    </>
  );
};

export default CreditsHistory;
