/*************************************************************************
 * @file MusicTable.tsx
 * @author Ehsanullah Qadeer
 * @desc MusicTable for artist profile page to show the list of songs that artist produced.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* LOCAL IMPORTS */

import getMuiStyles from "styles/getMuiStyles";
import sampleImg from "../sampleData/download.png";
import musicBeam from "../../../assets/icons/musicBeam.svg";
import playIcon from "../../../assets/icons/playIcon.svg";
import waveform from "../../../assets/img/waveform.png";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import { musicTableData } from "../sampleData/sampleData";

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
import { FaEllipsisVertical } from "react-icons/fa6";

import React, { useState } from "react";
interface Column {
  id:
    | "sample"
    | "fileName"
    | "waveform"
    | "time"
    | "key"
    | "bpm"
    | "status"
    | "considering";
  label: string;
  align?: "right";
}

const columns: readonly Column[] = [
  { id: "sample", label: "Sample" },
  { id: "fileName", label: "Filename" },
  { id: "waveform", label: "Waveform" },
  { id: "time", label: "Time" },
  { id: "key", label: "Key" },
  { id: "bpm", label: "BPM" },
  { id: "status", label: "Status" },
  { id: "considering", label: "Considering" },
];

interface Data {
  sample: string;
  fileName: string;
  waveform: string;
  time: string;
  key: string;
  bpm: string;
  status: string;
  considering: { name: string; icon: any }[];
}

const MusicTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("fileName");
  const [hoveredRow, setHoveredRow] = useState(null);

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

  const handleRowClick = (music) => {};

  const muiStyles = getMuiStyles();

  const sortedData = musicTableData.sort((a, b) => {
    const isAsc = order === "asc";
    switch (orderBy) {
      case "fileName":
        return isAsc
          ? a.fileName.localeCompare(b.fileName)
          : b.fileName.localeCompare(a.fileName);

      // Add more cases for other columns as needed
      default:
        return 0;
    }
  });

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
        <Table stickyHeader>
          <TableHead sx={muiStyles.tableHead}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: "70px" }}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : "asc"}
                    onClick={(e) => handleRequestSort(e, column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell style={{ minWidth: "255px" }} />
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              ".MuiTableCell-body": {
                borderBottom: "1px solid #1C1C1C",
              },
            }}
          >
            {sortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((music, idx) => {
                const {
                  fileName,
                  time,
                  key,
                  bpm,
                  status,
                  considering,
                  // link,
                  album,
                } = music;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={idx}
                    sx={{
                      "&.MuiTableRow-root": {
                        cursor: "pointer",
                        ":hover": { backgroundColor: "#101113" },
                      },
                    }}
                    onMouseEnter={() => setHoveredRow(music.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                  >
                    <TableCell
                      onClick={() => handleRowClick(music)}
                      sx={{ verticalAlign: "top" }}
                    >
                      <div className="flex gap-4 items-center">
                        <div className="w-8 h-8 rounded-sm">
                          <img
                            src={sampleImg}
                            alt="sample-img"
                            className="w-full h-full rounded-sm"
                          />
                        </div>
                        <div className="w-6 h-6">
                          <img
                            src={hoveredRow === music.id ? playIcon : musicBeam}
                            alt="icon"
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell
                      align="left"
                      onClick={() => handleRowClick(music)}
                    >
                      <div className="flex flex-col">
                        <span className="font-normal text-sm text-white">
                          {fileName}
                        </span>
                        <span className="font-semibold text-xs text-[#848484]">
                          {album}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell
                      align="left"
                      onClick={() => handleRowClick(music)}
                    >
                      <div className="w-[180px] h-[30px]">
                        <img src={waveform} alt="waveform" />
                      </div>
                    </TableCell>
                    <TableCell
                      align="left"
                      onClick={() => handleRowClick(music)}
                    >
                      <span className="text-sm font-normal text-white">
                        {time}
                      </span>
                    </TableCell>
                    <TableCell
                      align="left"
                      onClick={() => handleRowClick(music)}
                    >
                      <span className="text-sm font-normal text-white">
                        {key}
                      </span>
                    </TableCell>
                    <TableCell
                      align="left"
                      onClick={() => handleRowClick(music)}
                    >
                      <span className="text-sm font-normal text-white">
                        {bpm}
                      </span>
                    </TableCell>
                    <TableCell
                      align="left"
                      onClick={() => handleRowClick(music)}
                    >
                      <span className="bg-blackMarbel border-[1px] border-[#222222] rounded-lg text-white px-4 py-2 flex gap-2 w-max items-center">
                        <div
                          className={`w-[7px] h-[7px] rounded-full ${
                            status === "available"
                              ? "bg-[#25BA00]"
                              : "bg-[#FF9900]"
                          }`}
                        ></div>
                        <span className="text-sm font-normal text-white capitalize">
                          {status}
                        </span>
                      </span>
                    </TableCell>
                    <TableCell
                      align="left"
                      onClick={() => handleRowClick(music)}
                    >
                      <div className="flex gap-1.5 ">
                        {considering.map((artist, idx) => {
                          const { icon } = artist;
                          return (
                            <div key={idx} className="rounded-full w-5 h-5">
                              <img
                                src={icon}
                                alt=""
                                className="rounded-full w-full h-full"
                              />
                            </div>
                          );
                        })}
                        <div className="text-sm font-normal text-[#666666] whitespace-nowrap">
                          View All
                        </div>
                      </div>
                    </TableCell>
                    <TableCell align="right" sx={{ verticalAlign: "middle" }}>
                      <div className="flex gap-3 justify-end">
                        <span className="text-white">
                          <FaRegHeart className="w-6 h-6" />
                        </span>
                        <span className="text-white">
                          <MdOutlineFileDownload className="w-6 h-6" />
                        </span>
                        <span className="text-white">
                          <FaEllipsisVertical className="w-6 h-6" />
                        </span>
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
        count={musicTableData.length}
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

export default MusicTable;
