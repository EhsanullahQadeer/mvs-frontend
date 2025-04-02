/*************************************************************************
 * @file ComposerDialog.tsx
 * @author Ehsanullah Qadeer
 * @desc  This is the component for the dialog to add collaborators.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

import Dialog from "@mui/material/Dialog";
import useDebounce from "hooks/useDebounce";
import { styled } from "@mui/material/styles";
import { CircularProgress } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { userProfessionalNameSearch } from "api/user";
import React, { useState, useEffect, useRef } from "react";
import { referUserByEmail } from "api/user";
import DialogTitle from "@mui/material/DialogTitle";
import Tooltip from "@mui/material/Tooltip";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const searchedContributorsPadding = 1;
const thumbnailSize = 10;
const searchedContributorItemYPadding = 3;
// const 16.5 = (((thumbnailSize+(searchedContributorItemYPadding*2)) * maxDisplayContributors) + (searchedContributorsPadding*2))/4;
// Had to be done this way because tailwind works weird
const dropdownItemMaxHeight = `max-h-[16.5rem]`;

interface Props {
  openComposerDialog: boolean;
  contributors: any[];
  setOpenComposerDialog: (value: boolean) => void;
  handleAddComposer: (value: any) => void;
}

function ComposerDialog(props: Props) {
  const {
    openComposerDialog,
    setOpenComposerDialog,
    handleAddComposer,
    contributors,
  } = props;

  const [searchTerm, setSearchTerm] = useState("");
  const [isInvite, setIsInvite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  // Feedback message states
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  // Debounce the search value
  const debouncedSearchValue = useDebounce(searchTerm, 300);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [searchResults, setSearchResults] = useState([]);

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Function to truncate email addresses
  const truncateEmail = (email: string) => {
    const [localPart, domain] = email.split('@');
    const [domainName, extension] = domain.split('.');
    return `${localPart.substring(0, 6)}...@${domainName.substring(0, 3)}...${extension}`;
  };

  // Function to truncate text
  const truncateText = (text: string) => {
    if (text.length <= 10) return text;
    return `${text.substring(0, 10)}...`;
  };

  // Check if input is an email
  useEffect(() => {
    setIsInvite(emailRegex.test(searchTerm));
    // Clear feedback message when input changes
    if (feedbackMessage) {
      setFeedbackMessage("");
    }
  }, [searchTerm]);

  useEffect(() => {
    if (openComposerDialog) { // Check if dialog is open
      const timer = setTimeout(() => {
        if (inputRef.current) {
          console.log("Focusing...");
          inputRef.current.focus(); // Focus the input
        }
      }, 0); // Delay the focus call

      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }
  }, [openComposerDialog]); // Run this effect when openComposerDialog changes

  const handleClose = () => {
    setOpenComposerDialog(false);
    setIsInvite(false);
    setSearchTerm("");
    setSelected(null);
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
          // Filter out users that are already in contributors list
          const filteredUsers = response.data.users.filter(user => 
            !contributors.some(contributor => 
              contributor.user.id === user.id || 
              contributor.user.professional_name === user.professional_name
            )
          );
          setSearchResults(filteredUsers);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      })();
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchValue, contributors]);

  const handleButtonClick = () => {
    if (selected) {
      handleAddComposer(selected);
      setSelected(null);
      setSearchTerm("");
    }
    if (isInvite) {
      handleInviteByEmail(searchTerm);
    }
  };

  // Function to handle email invitation
  const handleInviteByEmail = (email: string) => {
    // Validate email again just to be sure
    if (!emailRegex.test(email)) {
      setFeedbackMessage("Invalid email address");
      setIsSuccess(false);
      return;
    }

    setLoading(true);
    console.log("Inviting collaborator by email:", email);
    
    referUserByEmail(email)
      .then(response => {
        setLoading(false);
        setFeedbackMessage("Invite sent");
        setIsSuccess(true);
        setSearchTerm("");
        handleAddComposer({ email, isEmailValue: true });
      })
      .catch(error => {
        setLoading(false);
        setFeedbackMessage("Failed to send invite");
        setIsSuccess(false);
      });
  };

  // Add a useEffect to monitor the feedback message state
  useEffect(() => {
    console.log("Feedback message changed:", feedbackMessage);
    console.log("Is success:", isSuccess);
  }, [feedbackMessage, isSuccess]);

  const isSelected = (selectedComposer) => {
    for (const a of contributors) {
      if (a.id === selectedComposer.id){
        return true;
      }
    }
    return false;
  };


  const handleSelectingContributor = (selectedComposer) => {
    if (!isSelected(selectedComposer)) {
      setSelected(selectedComposer);
      setSearchTerm(selectedComposer.professional_name);
    }
  };

  const isOwner = false;

  return (
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
          overflow: "visible",
        },
      }}
    >
      <DialogTitle>
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
      </DialogTitle>
      
      {/* Dedicated feedback message container */}
      <div className="px-6 -mt-2 mb-2">
        {feedbackMessage && (
          <div 
            className={`${
              isSuccess ? "bg-green-100 border-green-500 text-green-700" : "bg-red-100 border-red-500 text-red-700"
            } border-l-4 p-2 rounded font-medium text-sm`}
          >
            {feedbackMessage}
          </div>
        )}
      </div>

      <div className="py-4 border-t border-b border-eclipseGray flex flex-col gap-3 w-full items-stretch relative">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search collaborators or enter email"
              className="px-4 relative py-3 text-sm font-normal text-coolGray w-full bg-jetBlack rounded-lg border border-eclipseGray hover:border-secondaryBlue focus:border-transparent focus:outline-secondaryBlue focus:outline-2 focus:outline-offset-0"
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => setIsFocused(true)}
              onBlur={(e) => {
                // Only hide if we're not clicking inside the dropdown
                if (!e.relatedTarget?.closest('.collaborators-dropdown')) {
                  setIsFocused(false);
                }
              }}
            />
            <div className="absolute right-[9px] top-1/2 -translate-y-1/2 text-[#4C4C4C] cursor-pointer flex">
              {loading && (
                <CircularProgress style={{ color: "#C4FF48" }} size={20} />
              )}
            </div>
          </div>

          <div
            className={`${
              selected || isInvite
                ? "bg-[#059669] text-softGray cursor-pointer"
                : "bg-eclipseGray text-dimGray pointer-events-none"
            } rounded-lg text-sm font-semibold w-[69px] flex justify-center items-center`}
            onClick={handleButtonClick}
          >
            {isInvite ? "Invite" : "Add"}
          </div>
        </div>
        {isFocused && (
          <div className={`flex flex-col bg-[#1C1C17] absolute top-full w-full rounded-lg ${dropdownItemMaxHeight} overflow-y-auto custom-dropdown collaborators-dropdown`}>
            {searchResults.map((composer, idx) => {
              const { thumbnail, professional_name, primary_role, secondary_role } =
                composer;
              return (
                <div
                  onClick={() => {
                    handleSelectingContributor(composer);
                  }}
                  key={professional_name + idx}
                  className={`px-2.5 py-${searchedContributorItemYPadding} cursor-pointer flex gap-2.5 hover:bg-darkGray rounded`}
                >
                  <div className={`w-${thumbnailSize} h-${thumbnailSize} rounded-full`}>
                    <img
                      src={thumbnail}
                      alt="thumbnail"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>

                  <div className="flex-1 flex justify-between items-center">
                    <div>
                      <div className="flex items-center">
                        <Tooltip title={professional_name} placement="top">
                          <span className="text-sm font-semibold text-white">
                            {professional_name}
                            </span>
                        </Tooltip>

                        {isOwner && (
                          <span className="ml-1.5 px-1.5 bg-eerieBlack rounded-md">
                            You
                          </span>
                        )}
                      </div>

                      {primary_role || secondary_role ? (
                        <div className="text-sm font-normal text-dimGray flex gap-1">
                          {primary_role && secondary_role
                            ? `${primary_role} / ${secondary_role}`
                            : primary_role || secondary_role}
                        </div>
                      ) : null}
                    </div>
                    {isOwner && (
                      <div className="text-coolGray text-xs font-normal">
                        Owner
                      </div>
                    )}
                  </div>
                  {isSelected(composer)?<div className="text-coolGray text-xs font-normal content-center">Already added</div>:""}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1 overflow-hidden">
        <div className="text-silver text-xs font-normal p-2">
          Contributors to this sample
        </div>
        <div className={`bg-eclipseGray rounded-lg ${dropdownItemMaxHeight} p-${searchedContributorsPadding} overflow-y-auto custom-dropdown`}>
          {contributors?.length ? (
            contributors?.map((composer, idx) => {
              const { user: { thumbnail, professional_name, primary_role, secondary_role } } =
                composer;

              return (
                <div
                  key={"contributor" + idx}
                  className={`px-2.5 py-${searchedContributorItemYPadding} flex gap-2.5 rounded`}
                >
                  <div className={`w-${thumbnailSize} h-${thumbnailSize} rounded-full`}>
                    <img
                      src={thumbnail}
                      alt={`${professional_name} thumbnail`}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>

                  <div className="flex-1 flex justify-between items-center">
                    <div>
                      <div className="flex items-center">
                        <Tooltip title={professional_name} placement="top">
                          <span className="text-sm font-semibold text-white">
                            {professional_name}
                          </span>
                        </Tooltip>

                        {isOwner && (
                          <span className="ml-1.5 px-1.5 bg-eerieBlack rounded-md">
                            You
                          </span>
                        )}
                      </div>

                      {primary_role || secondary_role ? (
                        <div className="text-sm font-normal text-dimGray flex gap-1">
                          {primary_role && secondary_role
                            ? `${primary_role} / ${secondary_role}`
                            : primary_role || secondary_role}
                        </div>
                      ) : null}
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
  );
}

export default ComposerDialog;