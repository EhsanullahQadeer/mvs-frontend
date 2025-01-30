import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import getMuiStyles from "styles/getMuiStyles";

interface Column {
  id: string;
  label: string;
  maxWidth?: string;
  format?: (value: any) => string;
}

interface SimpleTableProps<T> {
  columns: Column[];
  rows: T[];
}

const SimpleTable = <T extends Record<string, any>>({
  columns,
  rows,
}: SimpleTableProps<T>) => {
  const muiStyles = getMuiStyles();

  return (
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
            {rows.map((row, rowIndex) => {
              const isLastItem = rowIndex + 1 === rows.length;
              return (
                <TableRow hover tabIndex={-1} key={rowIndex}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell
                        key={column.id}
                        sx={{
                          borderBottom: isLastItem && "0px !important",
                        }}
                      >
                        {column.format ? column.format(value) : value}
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
  );
};

export default SimpleTable;
