/*************************************************************************
 * @file ContributersTable.tsx
 * @author Ehsanullah Qadeer
 * @desc ContributersTable for content management page to show the list of contributers that are selected through collaborators dialog.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

import { ChangeEvent } from "react";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableRow from "@mui/material/TableRow";
import getMuiStyles from "styles/getMuiStyles";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import { ICollaborator, IUserProfile } from "../../types";
import TableContainer from "@mui/material/TableContainer";
import Tooltip from "@mui/material/Tooltip";
import Thumbnail from "components/ui/Header/atoms/notificationAtoms/thumbnailAvatar";
import MultiSelectDropdown from "../../MultiSelectDropdown";

export const rolesArr = [
  "Producer",
  "Songwriter",
  "Instrumentalist",
  "Artist",
  "DJ",
  "Mixing Engineer",
  "Mastering Engineer",
  "Composer",
];

interface Props {
  composerData: ICollaborator[];
  setComposerData: (value: any) => void;
  handleOpenDeleteDialog: (composer: IUserProfile) => void;
  percentError: boolean;
  setPercentError: (value: boolean) => void;
  collaborators: any[];
}

function ContributersTable(
  props: Props
) {

  const {
    composerData,
    setComposerData,
    handleOpenDeleteDialog,
    setPercentError,
  } = props;
  const muiStyles = getMuiStyles();

  const handleEditBtn = (id: number) => {
    setComposerData((prevState) =>
      prevState.map((composer) =>
        composer.user?.id === id
          ? { ...composer, isEditable: !composer.isEditable }
          : composer
      )
    );
  };

  const handleRolesChange = (id: number, newRoles: string[]) => {
    setComposerData((prevcollaborators) =>
      prevcollaborators.map((composer) =>
        composer.user?.id === id ? { ...composer, roles: newRoles } : composer
      )
    );
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>, id: number
  ) => {
    let { value } = event.target;
    let parsedValue = value === '' ? 0 : parseFloat(value);

    if (isNaN(parsedValue)) {
      parsedValue = 0;
    } else if (parsedValue > 100) {
      parsedValue = 100;
    } else if (parsedValue < 0) {
      parsedValue = 0;
    }

    parsedValue = Math.round(parsedValue * 100) / 100;
    setComposerData((prevCollaborators) => {
      const newData = prevCollaborators.map((composer) => {
        if (composer.user?.id === id) {
          return { ...composer, contribution: parsedValue };
        }
        return composer;
      });

      console.log('After update - newData:', newData);
      return newData;
    });

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
              backgroundColor: "#0F0F0F",
              cursor: "auto"
            }
          }}
        >
          {composerData?.map((composer) => {
            return (
              <TableRow key={composer.user?.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Thumbnail professionalName={composer?.user?.professional_name} thumbnail={composer?.user?.thumbnail} userId={composer?.user?.id} size="32"/>
                    <span className="text-base">{composer?.user?.professional_name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="flex gap-2.5 items-stretch">
                      <div className="flex items-center">
                        {composer.isEditable ? (
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={composer.contribution || ''}
                            onChange={(e) => handleInputChange(e, composer.user?.id)}
                            className="text-silver text-sm font-semibold px-2 py-1 rounded-lg bg-darkGray border border-eclipseGray hover:border-charcoalGray focus:border-transparent focus:outline-charcoalGray focus:outline-2 focus:outline-offset-0 w-11 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                        ) : (
                          <span className="text-silver text-sm font-semibold">
                            {composer.contribution}%
                          </span>
                        )}
                      </div>

                      <div
                        onClick={() => handleEditBtn(composer.user?.id)}
                        className="py-1 px-2 border border-eclipseGray rounded text-mediumGray text-sm font-normal w-max flex items-center cursor-pointer"
                      >
                        {composer.isEditable ? "Save" : "Edit"}
                      </div>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <span className="text-sm">Pending</span>
                </TableCell>

                <TableCell>
                  <div>
                    <MultiSelectDropdown
                      name={`role${composer.user?.id}`}
                      dropdownItems={rolesArr}
                      value={composer.roles || []}
                      setValue={(newRoles: string[]) => handleRolesChange(composer.user?.id, newRoles)}
                    />
                  </div>
                </TableCell>

                <TableCell align="right">
                  <div className="w-full flex justify-end">
                    {!composer.user?.is_owner && (
                      <div
                        onClick={() => handleOpenDeleteDialog(composer)}
                        className="rounded border border-eclipseGray w-14 px-2 py-1 text-sm text-mediumGray cursor-pointer"
                      >
                        Delete
                      </div>
                    )}
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

