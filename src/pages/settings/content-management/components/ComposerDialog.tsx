/*************************************************************************
 * @file ComposerDialog.tsx
 * @author Ehsanullah Qadeer
 * @desc  This is the component for the dialog to add collaborators.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import useDebounce from "hooks/useDebounce";
import { userProfessionalNameSearch } from "api/user";
import { CircularProgress } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface Props {
  openComposerDialog: boolean;
  setOpenComposerDialog: (value: boolean) => void;
  handleAddComposer: (value: any) => void;
}

function ComposerDialog(props: Props) {
  const {
    openComposerDialog,
    setOpenComposerDialog,
    handleAddComposer,
  } = props;

  const [searchTerm, setSearchTerm] = useState("");
  const [isInvite, setIsInvite] = useState(false);
  const [isMatchedComposer, setIsMatchedComposer] = useState(false);
  const [composerToAdd, setComposerToAdd] = useState(null);
  const [loading, setLoading] = useState(false);
  // Debounce the search value
  const debouncedSearchValue = useDebounce(searchTerm, 300);

  const [searchResults, setSearchResults] = useState([]);

  const handleClose = () => {
    setOpenComposerDialog(false);
    setIsInvite(false);
    setIsMatchedComposer(false);
    setComposerToAdd(null);
    setSearchTerm("");
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  useEffect(() => {
    if (debouncedSearchValue) {
      (async () => {
        try {
          setLoading(true);
          const response = await userProfessionalNameSearch({
            skip: 0,
            professionalName: debouncedSearchValue,
            take: 10,
          });
          console.log("list response with serach", response.data);
          setSearchResults(response.data.users);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      })();
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchValue]);

  const handleButtonClick = () => {
    if (composerToAdd) {
      handleAddComposer(composerToAdd);
      handleClose();
    }
    if (isInvite) {
      console.log("search term", searchTerm);
    }
  };

  const isOwner = false;

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openComposerDialog}
        sx={{
          "& .MuiDialog-paper": {
            background: "#1C1C1C",
            borderRadius: "8px",
            border: "1px solid #242424",
            padding: "12px",
            color: "#E5E5E5",
            width: "500px",
            overflow: "hidden",
          },
        }}
      >
        <div className="flex justify-between items-center gap-2 pb-2.5">
          <span className="text-sm font-normal">
            Invite collaborators by name or email
          </span>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              color: "#848484",
              width: "16px",
              height: "16px",
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>

        <div className="py-4 border-t border-b border-eclipseGray flex gap-3 w-full items-stretch">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search collaborators"
              className="px-4 py-3 text-sm font-normal text-coolGray w-full bg-jetBlack rounded-lg border border-eclipseGray hover:border-secondaryBlue focus:border-transparent focus:outline-secondaryBlue focus:outline-2 focus:outline-offset-0"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <div className="absolute right-[9px] top-1/2 -translate-y-1/2 text-[#4C4C4C] cursor-pointer flex">
              {loading && (
                <CircularProgress style={{ color: "#C4FF48" }} size={20} />
              )}
            </div>
          </div>

          <div
            className={`${
              isInvite
                ? "bg-[#059669] text-softGray cursor-pointer"
                : isMatchedComposer
                ? "bg-blue-500 text-softGray cursor-pointer"
                : "bg-eclipseGray text-dimGray pointer-events-none"
            } rounded-lg text-sm font-semibold w-[69px] flex justify-center items-center`}
            onClick={handleButtonClick}
          >
            {isInvite ? "Invite" : "Add"}
          </div>
        </div>

        <div className="flex flex-col gap-1 overflow-hidden">
          <div className="text-silver text-xs font-normal p-2">
            Contributors to this sample
          </div>

          <div className="bg-eclipseGray rounded-lg p-1 overflow-y-auto custom-dropdown">
            {searchResults.length ? (
              searchResults.map((composer, idx) => {
                const { thumbnail, artist_name, primary_label, sub_label } =
                  composer;
                return (
                  <div
                    onClick={() => {
                      handleAddComposer(composer);
                      handleClose();
                    }}
                    key={artist_name + idx}
                    className="px-2.5 py-3 cursor-pointer flex gap-2.5 hover:bg-gunMetal rounded"
                  >
                    <div className="w-10 h-10 rounded-full">
                      <img
                        src={thumbnail}
                        alt="thumbnail"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>

                    <div className="flex-1 flex justify-between items-center">
                      <div>
                        <div className="flex items-center">
                          <span className="text-sm font-semibold text-white">
                            {artist_name}
                          </span>

                          {isOwner && (
                            <span className="ml-1.5 px-1.5 bg-eerieBlack rounded-md">
                              You
                            </span>
                          )}
                        </div>

                        <div className="text-sm font-normal text-dimGray flex gap-1">
                          {`${primary_label} / ${sub_label}`}
                        </div>
                      </div>
                      {isOwner && (
                        <div className="text-coolGray text-xs font-normal">
                          Owner
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="white text-sm fotn-normal p-2">
                Your search term does not match to any name or email.
              </div>
            )}
          </div>
        </div>
      </BootstrapDialog>
    </React.Fragment>
  );
}

export default ComposerDialog;
