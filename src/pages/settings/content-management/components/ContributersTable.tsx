/*************************************************************************
 * @file ContributersTable.tsx
 * @author Ehsanullah Qadeer
 * @desc ContributersTable for content management page to show the list of contributers that are selected through collaborators dialog.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IUserProfile } from "./types";
import getMuiStyles from "styles/getMuiStyles";
import { rolesArr } from "../sample-data/sampleData";
import { ChangeEvent, useEffect } from "react";
import MultiSelectDropdown from "./MultiSelectDropdown";

interface Props {
  composerData: IUserProfile[];
  setComposerData: (value: any) => void;
  handleOpenDeleteDialog: (composer: IUserProfile) => void;
  percentError: boolean;
  setPercentError: (value: boolean) => void;
}

function ContributersTable(props: Props) {
  const {
    composerData,
    setComposerData,
    handleOpenDeleteDialog,
    percentError,
    setPercentError,
  } = props;
  const muiStyles = getMuiStyles();

  useEffect(() => {
    console.log("coposer datre", composerData);
  }, [composerData]);

  const handleEditBtn = (id: number) => {
    setComposerData((prevState) =>
      prevState.map((composer) =>
        composer.id === id
          ? { ...composer, isEditable: !composer.isEditable }
          : composer
      )
    );
  };

  const handleRolesChange = (id: number, newRoles: string[]) => {
    setComposerData((prevcollaborators) =>
      prevcollaborators.map((composer) =>
        composer.id === id ? { ...composer, roles: newRoles } : composer
      )
    );
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    let { value } = event.target;
    let parsedValue = parseFloat(value);

    if (isNaN(parsedValue)) {
      parsedValue = 0;
    } else if (parsedValue > 100) {
      parsedValue = 100;
    } else if (parsedValue < 0) {
      parsedValue = 0;
    }

    parsedValue = Math.round(parsedValue * 100) / 100;

    setComposerData((prevcollaborators) =>
      prevcollaborators.map((composer) =>
        composer.id === id
          ? { ...composer, percentValue: parsedValue }
          : composer
      )
    );

    setPercentError(false);
  };

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{
          border: "1px solid #242424",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
        }}
      >
        <TableHead
          sx={{
            ...muiStyles.tableHead,
            backgroundColor: "#1C1C1C",
            "& .MuiTableCell-head": {
              color: "#B2B2B2",
              borderTop: "none",
              fontWeight: 500,
            },
          }}
        >
          <TableRow>
            <TableCell>Contributors</TableCell>
            <TableCell>Publishing %</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Role</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody
          sx={{
            ...muiStyles.tableBody,
            "& .MuiTableRow-root": {
              cursor: "auto",
              backgroundColor: "#0F0F0F",
            },
          }}
        >
          {composerData.map((composer) => {
            const {
              id,
              artist_name,
              roles = [],
              thumbnail,
              percentValue,
              isEditable,
            } = composer;

            return (
              <TableRow key={composer.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full">
                      <img
                        src={thumbnail}
                        alt="composer"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <span className="text-base">{artist_name}</span>
                  </div>
                </TableCell>

                <TableCell>
                  <div>
                    <div className="flex gap-2.5 items-stretch">
                      <div className="flex items-center">
                        {isEditable ? (
                          <input
                            type="number"
                            min="0"
                            max="100"
                            step="0.01"
                            value={percentValue}
                            onChange={(e) => handleInputChange(e, id)}
                            className="text-silver text-sm font-semibold px-2 py-1 rounded-lg bg-darkGray border border-eclipseGray hover:border-charcoalGray focus:border-transparent focus:outline-charcoalGray focus:outline-2 focus:outline-offset-0 w-11"
                          />
                        ) : (
                          <span className="text-silver text-sm font-semibold">
                            {percentValue}%
                          </span>
                        )}
                      </div>

                      <div
                        onClick={() => handleEditBtn(id)}
                        className="py-1 px-2 border border-eclipseGray rounded text-mediumGray text-sm font-normal w-max flex items-center cursor-pointer"
                      >
                        {isEditable ? "Save" : "Edit"}
                      </div>
                    </div>

                    {percentError && (
                      <div className="mt-0.5 text-darkRed text-[10px]">
                        Sum of % should equal to 100.
                      </div>
                    )}
                  </div>
                </TableCell>

                <TableCell>
                  <span className="text-sm">Pending</span>
                </TableCell>

                <TableCell>
                  <div>
                    <MultiSelectDropdown
                      name={`role${id}`}
                      dropdownItems={rolesArr}
                      value={roles}
                      setValue={(newRoles: string[]) =>
                        handleRolesChange(id, newRoles)
                      }
                    />
                  </div>
                </TableCell>

                <TableCell align="right">
                  <div className="w-full flex justify-end">
                    <div
                      onClick={() => handleOpenDeleteDialog(composer)}
                      className="rounded border border-eclipseGray w-14 px-2 py-1 text-sm text-mediumGray cursor-pointer"
                    >
                      Delete
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ContributersTable;
