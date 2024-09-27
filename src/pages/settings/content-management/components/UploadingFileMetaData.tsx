/*************************************************************************
 * @file UploadingFileMetaData.tsx
 * @author Ehsanullah Qadeer
 * @desc  This is the component for the files that are uploading to give their information.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

import React, { useState } from "react";
import FormikLabeledField from "./FormikLabeledField";
import SingleSelectDropdown from "./SingleSelectDropdown";
import { composersArr, songType } from "../sample-data/sampleData";
import { ReactComponent as CancelIcon } from "../../../../assets/icons/cancelIcon.svg";
import ComposerDialog from "./ComposerDialog";

type Props = {};

const UploadingFileMetaData = (props: Props) => {
  const [openComposerDialog, setOpenComposerDialog] = useState(false);
  const handleComposerFieldClick = () => {
    setOpenComposerDialog(true);
  };

  const [selectedComposer, setSelectedComposer] = useState([composersArr[0]]);

  const handleAddComposer = (composerAdded: any) => {
    setSelectedComposer((prev) => [...prev, composerAdded]);
    setOpenComposerDialog(false);
  };

  return (
    <>
      <ComposerDialog
        {...{
          openComposerDialog,
          setOpenComposerDialog,
          composersArr,
          handleAddComposer,
        }}
      />

      <div className="rounded-xl border border-eclipseGray bg-eerieBlack p-5 flex flex-col gap-4">
        <span className="text-[28px] text-white font-medium leading-[34px]">
          File Metadata
        </span>

        <div className="flex gap-5">
          <FormikLabeledField
            name="songName"
            label="Song / Sample Name"
            placeholder="e.g - soundboyz_guitar_clean_120bpm_Dmin"
          />

          <FormikLabeledField
            name="songBpm"
            label="Song / Sample BPM"
            placeholder="e.g - 95"
          />
        </div>

        <div className="flex gap-5">
          <SingleSelectDropdown
            name="songType"
            label="Song / Sample Type"
            placeholder="Select Sample Type"
            dropdownItems={songType}
          />

          <FormikLabeledField
            name="songTags"
            label="Song / Sample Tags"
            placeholder="Song Sample Tags"
          />
        </div>

        <div className="flex gap-5">
          <FormikLabeledField
            name="sampleKey"
            label="Sample Key"
            placeholder="e.g - F#min"
          />

          <div className="flex-1 flex flex-col gap-1">
            <span className="text-silver text-sm font-normal">
              Composers / Collaborators
            </span>

            <div
              onClick={handleComposerFieldClick}
              className="w-full min-h-5 text-dimGray text-sm font-normal px-4 py-[9px] rounded-lg bg-darkGray border border-eclipseGray cursor-pointer flex flex-wrap gap-2"
            >
              {selectedComposer.map((composer, idx) => {
                const { name } = composer;
                return (
                  <div
                    key={name + idx}
                    className="flex gap-2 py-1 px-3 rounded-[20px] bg-eerieBlack border border-eerieBlack items-center"
                  >
                    <span className="text-xs text-mediumGray font-normal">
                      {name}
                    </span>
                    <div className="w-2.5 h-2.5 cursor-pointer text-mediumGray flex justify-center items-center">
                      <CancelIcon className="w-2 h-2" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadingFileMetaData;
