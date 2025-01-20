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
import { tableStyles } from "./tableStyles";

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
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { Checkbox } from "@mui/material";
import { ISample,ISampleSearchConstraints, IGetUserSamplesResponse } from "./types";
import { RootState } from "redux/reducers";

interface Column {
  id: "filename" | "created_at" | "artist" | "uploadedBy";
  label: string;
  align?: "right";
}

const columns: readonly Column[] = [
  { id: "filename", label: "File Name" },
  { id: "created_at", label: "Date uploaded" },
  { id: "artist", label: "Artist / Owner" },
  { id: "uploadedBy", label: "Uploaded by" },
];

interface Data {
  filename: string;
  created_at: string;
  artist: string;
  uploadedBy: { name: string; icon: any };
}

interface Props {
  getUserSamplesResponse:IGetUserSamplesResponse;
  handleOpenDialog: (action: string, sample: ISample) => void;
  sampleSearchConstraints: ISampleSearchConstraints;
  setSampleSearchConstraints: (value:ISampleSearchConstraints) => void;
}

const AttachedFilesTable = (props: Props) => {
  const { 
    getUserSamplesResponse, 
    handleOpenDialog,
    sampleSearchConstraints={skip:0,take:10},
    setSampleSearchConstraints
   } = props;

  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("filename");
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const currentUserInfo = useSelector((state: RootState) => state.auth.user);


  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: any, newPage: number) => {
    const constraintChange = {...sampleSearchConstraints};
    constraintChange.skip = newPage;
    setSampleSearchConstraints(constraintChange);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSampleSearchConstraints({
      skip: 0,
      take: +event.target.value
    });
  };

  const muiStyles = getMuiStyles();
  const sortedData = getUserSamplesResponse.samples.sort((a, b) => {
    const isAsc = order === "asc";
    switch (orderBy) {
      case "filename":
        return isAsc
          ? a.filename.localeCompare(b.filename)
          : b.filename.localeCompare(a.filename);

      case "created_at":
        return isAsc
          ? a.created_at.localeCompare(b.created_at)
          : b.created_at.localeCompare(a.created_at);

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
      const newSelected = getUserSamplesResponse.samples.map((n) => n.id);
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
            sx={tableStyles.tableHead}
          >
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  sx={muiStyles.tableCheckbox}
                  color="primary"
                  indeterminate={
                    selected.length > 0 &&
                    selected.length < getUserSamplesResponse.samples.length
                  }
                  checked={
                    getUserSamplesResponse.samples.length > 0 &&
                    selected.length === getUserSamplesResponse.samples.length
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
                    // className="text-sm font-medium text-mediumGray hover:text-white transition-colors"
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody sx={{ ...muiStyles.tableBody }}>
            {sortedData.length > 0 ? (
              sortedData
                .map((row, idx) => {
                  const { filename, thumbnail, name, created_at, collaborators } = row as any;
                  console.log("collaborators ", collaborators);
                  const owner = collaborators?.find(collaborator => collaborator?.is_owner);
                  const ownerName = owner?.collaborator?.professional_name;
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

                      <TableCell
                        onClick={(event) => handleClick(event, row.id)}
                      >
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
                          <span>{filename}</span>
                        </div>
                      </TableCell>
                      <TableCell
                        onClick={(event) => handleClick(event, row.id)}
                      >
                        {formattedDate(created_at)}
                      </TableCell>
                      <TableCell
                        onClick={(event) => handleClick(event, row.id)}
                      >
                        {ownerName}
                      </TableCell>
                      <TableCell
                        onClick={(event) => handleClick(event, row.id)}
                      >
                        <div className="flex gap-2.5 items-center">
                          <div className="rounded-full w-8 h-8">
                            <img
                              src={owner?.collaborator?.thumbnail}
                              alt=""
                              className="rounded-full w-full h-full"
                            />
                          </div>

                          <div className="text-sm font-medium whitespace-nowrap">
                            {ownerName}
                          </div>
                        </div>
                      </TableCell>

                      <TableCell align="right" sx={{ verticalAlign: "middle" }}>
                        {owner?.collaborator?.id === currentUserInfo?.id && (
                          <div className="flex gap-2 justify-end">
                            <div
                              onClick={() => handleOpenDialog("delete", row)}
                              className="px-2 py-1 border border-eclipseGray rounded-[4px] text-mediumGray font-normal text-xs cursor-pointer"
                            >
                              Delete
                            </div>
                            <div
                              onClick={() => handleOpenDialog("edit", row)}
                              className="px-2 py-1 border border-eclipseGray rounded-[4px] text-mediumGray font-normal text-xs cursor-pointer"
                            >
                              Edit
                            </div>
                          </div>
                        )}
                      </TableCell>
                      
                    </TableRow>
                  );
                })
            ) : (
              <TableRow
                sx={{
                  cursor: "auto !important",
                  ":hover": { backgroundColor: "#0F0F0F !important" },
                }}
              >
                <TableCell colSpan={columns.length + 2}>
                  <div className="w-full h-80 flex justify-center items-center">
                    <div className="text-sm text-center">
                      <span className="text-white underline">
                        Empty Library
                      </span>{" "}
                      <span className="text-dimGray">
                        your files will <br /> appear here
                      </span>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
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
        count={getUserSamplesResponse.total}
        rowsPerPage={sampleSearchConstraints.take}
        page={sampleSearchConstraints.skip}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelDisplayedRows={({ to, count }) => `${to} of ${count}`}
        sx={muiStyles.tablePagination}
      />
    </Paper>
  );
};

export default AttachedFilesTable;
