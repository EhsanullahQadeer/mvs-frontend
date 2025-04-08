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
import { rolesArr } from "../sample-data/sampleData";
import { ICollaborator, IUserProfile } from "./types";
import MultiSelectDropdown from "./MultiSelectDropdown";
import TableContainer from "@mui/material/TableContainer";
import { AiOutlineDelete } from "react-icons/ai";
import Thumbnail from "components/ui/Header/atoms/notificationAtoms/thumbnailAvatar";

interface Props {
  composerData: ICollaborator[];
  setComposerData: (value: any) => void;
  handleOpenDeleteDialog: (composer: IUserProfile) => void;
  percentError: boolean;
  setPercentError: (value: boolean) => void;
  collaborators: any[];
}

// Function to truncate text
const truncateText = (text: string, maxLength: number = 20) => {
  if (!text) return '';
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

function ContributersTable(
  props: Props
) {

  const {
    composerData,
    setComposerData,
    handleOpenDeleteDialog,
    percentError,
    setPercentError,
    collaborators,
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
    setComposerData((prevCollaborators) => {
      const newData = prevCollaborators.map((composer) => {
        if (composer.user?.id === id) {
          console.log("Updating composer:", composer.user.professional_name);
          return { ...composer, contribution: parsedValue };
        }
        return composer;
      });

      console.log("After update - newData:", newData);
      return newData;
    });

    setPercentError(false);
  };

  return (
  
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
            <TableCell className="text-[12px] md:text-base ">
              Contributors
            </TableCell>
            <TableCell className="text-[12px] md:text-base ">
              Publishing%
            </TableCell>
            <TableCell className="text-[12px] md:text-base ">Status</TableCell>
            <TableCell>
              <div className="text-[12px] md:text-base md:flex hidden ">
                Role
              </div>
            </TableCell>
            <TableCell />
          </TableRow>
        </TableHead>

        <TableBody
          sx={{
            ...muiStyles.tableBody,
            "& .MuiTableRow-root": {
              backgroundColor: "#0F0F0F",
              cursor: "auto",
            },
          }}
        >
          {composerData?.map((composer) => {
            return (
              <>
                <TableRow key={composer.user?.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div>
                        <div className="w-8 h-8 rounded-full">
                          <img
                            src={composer?.user?.thumbnail}
                            alt="composer"
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                      </div>
                      <span className="text-[10px] md:text-sm">
                        {composer?.user?.professional_name}
                      </span>
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
                              step="0.01"
                              value={composer?.contribution}
                              onChange={(e) =>
                                handleInputChange(e, composer.user?.id)
                              }
                              className="text-silver text-[10px] md:text-sm font-semibold px-2 py-1 rounded-lg bg-darkGray border border-eclipseGray hover:border-charcoalGray focus:border-transparent focus:outline-charcoalGray focus:outline-2 focus:outline-offset-0 w-11"
                            />
                          ) : (
                            <span className="text-silver text-[10px] md:text-sm font-semibold">
                              {composer.contribution}%
                            </span>
                          )}
                        </div>

                        <div
                          onClick={() => handleEditBtn(composer.user?.id)}
                          className="py-1 px-2 border border-eclipseGray rounded text-mediumGray text-[10px] md:text-sm font-normal w-max flex items-center cursor-pointer"
                        >
                          {composer.isEditable ? "Save" : "Edit"}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <span className="text-[10px] md:text-sm">Pending</span>
                  </TableCell>

                  <TableCell>
                    <div className="hidden md:flex">
                      <MultiSelectDropdown
                        name={`role${composer.user?.id}`}
                        dropdownItems={rolesArr}
                        value={composer.roles || []}
                        setValue={(newRoles: string[]) =>
                          handleRolesChange(composer.user?.id, newRoles)
                        }
                      />
                    </div>
                  </TableCell>

                  <TableCell align="right">
                    <div
                      onClick={() => handleOpenDeleteDialog(composer)}
                      className="w-full  flex md:justify-end "
                    >
                      <div
                        className="rounded md:flex hidden border border-eclipseGray  px-2 py-1 text-[10px] md:text-sm text-mediumGray cursor-pointer"
                      >
                        Delete
                      </div>
                      <AiOutlineDelete className="text-xs flex md:hidden" />
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className="block md:hidden">
                  <TableCell colSpan={5} className="pt-2">
                    <MultiSelectDropdown
                      name={`role${composer.user?.id}`}
                      dropdownItems={rolesArr}
                      value={composer.roles || []}
                      setValue={(newRoles: string[]) =>
                        handleRolesChange(composer.user?.id, newRoles)
                      }
                    />
                  </TableCell>
                </TableRow>
              </>
            );
          })}
        </TableBody>
      </Table>
  );
}

export default ContributersTable;
