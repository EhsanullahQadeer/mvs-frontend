/*************************************************************************
 * @file ComposerDialog.tsx
 * @author Ehsanullah Qadeer
 * @desc  This is the component for the dialog to add composers.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

import React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

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
  composersArr: any[];
  handleAddComposer: (value: any) => void
}

function ComposerDialog(props: Props) {
  const { openComposerDialog, setOpenComposerDialog, composersArr, handleAddComposer } = props;

  const handleClose = () => {
    setOpenComposerDialog(false);
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
          <div className="flex-1">
            <input
              type="text"
              placeholder="search collaborators"
              className="text-sm font-normal text-coolGray w-full bg-jetBlack rounded-lg border border-eclipseGray hover:border-secondaryBlue focus:border-transparent focus:outline-secondaryBlue focus:outline-2 focus:outline-offset-0"
            />
          </div>

          <div className="bg-eclipseGray rounded-lg px-4 py-2 text-dimGray text-sm font-semibold cursor-pointer">
            Add
          </div>
        </div>

        <div className="flex flex-col gap-1 overflow-hidden">
          <div className="text-silver text-xs font-normal p-2">
            Contributors to this sample
          </div>

          <div className="bg-eclipseGray rounded-lg p-1 overflow-y-auto custom-dropdown">
            {composersArr.map((composer, idx) => {
              const { imgSrc, name, tags } = composer;
              return (
                <div
                  onClick={() => handleAddComposer(composer)}
                  key={name + idx}
                  className="px-2.5 py-3 cursor-pointer flex gap-2.5 hover:bg-gunMetal rounded"
                >
                  <div className="w-10 h-10 rounded-full">
                    <img
                      src={imgSrc}
                      alt="imgSrc"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>

                  <div className="flex-1 flex justify-between items-center">
                    <div>
                      <div className="flex items-center">
                        <span className="text-sm font-semibold text-white">
                          {name}
                        </span>

                        {isOwner && (
                          <span className="ml-1.5 px-1.5 bg-eerieBlack rounded-md">
                            You
                          </span>
                        )}
                      </div>

                      <div className="text-sm font-normal text-dimGray">
                        {tags}
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
            })}
          </div>
        </div>
      </BootstrapDialog>
    </React.Fragment>
  );
}

export default ComposerDialog;
