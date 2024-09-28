/*************************************************************************
 * @file AttachedFilesTable.tsx
 * @author Ehsanullah Qadeer
 * @desc AttachedFilesTable for content management page to show the list of attached files.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* LOCAL IMPORTS */

import getMuiStyles from "styles/getMuiStyles";
import musicBeam from "../../../../assets/icons/musicBeam.svg";
import { attachedFilesTableData } from "../sample-data/sampleData";

// THIRD PARTY IMPORTS
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import moment from "moment";

import React, { useState } from "react";
import { Checkbox } from "@mui/material";

interface Column {
  id: "fileName" | "dateUploaded" | "artist" | "uploadedBy";
  label: string;
  align?: "right";
}

const columns: readonly Column[] = [
  { id: "fileName", label: "File Name" },
  { id: "dateUploaded", label: "Date uploaded" },
  { id: "artist", label: "Artist / Owner" },
  { id: "uploadedBy", label: "Uploaded by" },
];

interface Data {
  fileName: string;
  dateUploaded: string;
  artist: string;
  uploadedBy: { name: string; icon: any };
}

const AttachedFilesTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("fileName");
  const [selected, setSelected] = React.useState<readonly number[]>([]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const muiStyles = getMuiStyles();

  const sortedData = attachedFilesTableData.sort((a, b) => {
    const isAsc = order === "asc";
    switch (orderBy) {
      case "fileName":
        return isAsc
          ? a.fileName.localeCompare(b.fileName)
          : b.fileName.localeCompare(a.fileName);

      case "dateUploaded":
        return isAsc
          ? a.uploadedDate.localeCompare(b.uploadedDate)
          : b.uploadedDate.localeCompare(a.uploadedDate);

      default:
        return 0;
    }
  });

  const formattedDate = (dateStr: string) => {
    const date = moment(dateStr).format("MMM D, YYYY");
    return date;
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = attachedFilesTableData.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  return (
    <Paper
      sx={{
        width: "100%",
        overflow: "hidden",
        boxShadow: "none",
        backgroundColor: "transparent",
      }}
    >
      <TableContainer sx={{ maxHeight: "maxContent" }}>
        <Table
          stickyHeader
          sx={{
            border: "1px solid #242424",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
          }}
        >
          <TableHead
            sx={{
              ...muiStyles.tableHead,
              backgroundColor: "#131313",
              "& .MuiTableCell-head": {
                color: "#B2B2B2",
                borderTop: "none",
                fontWeight: 500,
              },
            }}
          >
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  sx={muiStyles.tableCheckbox}
                  color="primary"
                  indeterminate={
                    selected.length > 0 &&
                    selected.length < attachedFilesTableData.length
                  }
                  checked={
                    attachedFilesTableData.length > 0 &&
                    selected.length === attachedFilesTableData.length
                  }
                  onChange={handleSelectAllClick}
                  inputProps={{
                    "aria-label": "select all desserts",
                  }}
                />
              </TableCell>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align}>
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : "asc"}
                    onClick={(e) => handleRequestSort(e, column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody sx={muiStyles.tableBody}>
            {sortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, idx) => {
                const { fileName, uploadedBy, uploadedDate, artist } = row;

                const isItemSelected = selected.includes(row.id);
                const labelId = `enhanced-table-checkbox-${idx}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={idx}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      padding="checkbox"
                      onClick={(event) => handleClick(event, row.id)}
                    >
                      <Checkbox
                        sx={muiStyles.tableCheckbox}
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>

                    <TableCell onClick={(event) => handleClick(event, row.id)}>
                      <div className="flex flex-row gap-2.5 items-center">
                        <div className="border border-charcoalGray py-2.5 px-1.5 bg-eerieBlack rounded">
                          <div className="w-4 h-4">
                            <img
                              src={musicBeam}
                              alt="musicBeam"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <span>{fileName}</span>
                      </div>
                    </TableCell>
                    <TableCell onClick={(event) => handleClick(event, row.id)}>
                      {formattedDate(uploadedDate)}
                    </TableCell>
                    <TableCell onClick={(event) => handleClick(event, row.id)}>
                      {artist}
                    </TableCell>
                    <TableCell onClick={(event) => handleClick(event, row.id)}>
                      <div className="flex gap-2.5 items-center">
                        <div className="rounded-full w-8 h-8">
                          <img
                            src={uploadedBy.icon}
                            alt=""
                            className="rounded-full w-full h-full"
                          />
                        </div>

                        <div className="text-sm font-medium whitespace-nowrap">
                          {uploadedBy.name}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell align="right" sx={{ verticalAlign: "middle" }}>
                      <div className="flex gap-2 justify-end">
                        <div className="px-2 py-1 border border-eclipseGray rounded-[4px] text-mediumGray font-normal text-xs cursor-pointer">
                          Delete
                        </div>
                        <div className="px-2 py-1 border border-eclipseGray rounded-[4px] text-mediumGray font-normal text-xs cursor-pointer">
                          Edit
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[
          { value: 10, label: "View 10" },
          { value: 20, label: "View 20" },
          { value: 50, label: "View 50" },
        ]}
        component="div"
        count={attachedFilesTableData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelDisplayedRows={({ to, count }) => `${to} of ${count}`}
        sx={muiStyles.tablePagination}
      />
    </Paper>
  );
};

export default AttachedFilesTable;
