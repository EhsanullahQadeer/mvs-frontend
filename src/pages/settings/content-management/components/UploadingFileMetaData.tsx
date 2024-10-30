/*************************************************************************
 * @file UploadingFileMetaData.tsx
 * @author Ehsanullah Qadeer
 * @desc  This is the component for the files that are uploading to give their information.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

import React, { useState } from "react";
import FormikLabeledField from "../../../../components/util/FormikLabeledField";
import FormikSingleSelectDropdown from "../../../../components/util/FormikSingleSelectDropdown";
import { songType } from "../sample-data/sampleData";
import { ReactComponent as CancelIcon } from "../../../../assets/icons/cancelIcon.svg";
import ComposerDialog from "./ComposerDialog";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import getMuiStyles from "styles/getMuiStyles";
import { IUploadingFileMetaDataProps } from "./types";
import { useFormikContext } from "formik";

const UploadingFileMetaData = (props: IUploadingFileMetaDataProps) => {
  const {
    privacyValue,
    setPrivacyValue,
    setMidiFile,
    selectedComposer,
    setSelectedComposer,
    isEditSample,
    handleClose,
  } = props;
  const muiStyles = getMuiStyles();
  const [openComposerDialog, setOpenComposerDialog] = useState(false);
  const handleComposerFieldClick = () => {
    setOpenComposerDialog(true);
  };

  const handleAddComposer = (composerAdded) => {
    setSelectedComposer((prev) => {
      const isComposerAlreadySelected = prev.some(
        (composer) => composer.id === composerAdded.id
      );
      if (!isComposerAlreadySelected) {
        return [...prev, composerAdded];
      }
      return prev;
    });
  };

  const handlePrivacyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrivacyValue((event.target as HTMLInputElement).value);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMidiFile(e.target.files[0]);
  };

  const { setFieldValue } = useFormikContext();
  const [tags, setTags] = useState("");

  const handleTagsChange = (e) => {
    let value = e.target.value;

    const formattedTags = value
      .split(" ")
      .map((word) => (word.startsWith("#") || word === "" ? word : `#${word}`))
      .join(" ");

    setTags(formattedTags);

    const tagsArray = formattedTags
      .split(" ")
      .filter((word) => word.trim() !== "");
    setFieldValue("songTags", tagsArray);
  };

  return (
    <>
      <ComposerDialog
        {...{
          contributors:selectedComposer,
          openComposerDialog,
          setOpenComposerDialog,
          handleAddComposer,
        }}
      />

      <div
        className={`${
          !isEditSample && "rounded-xl border border-eclipseGray bg-eerieBlack"
        } p-5 flex flex-col gap-4`}
      >
        <div className="flex items-center justify-between">
          <span className="text-[28px] text-white font-medium leading-[34px]">
            File Metadata
          </span>

          {isEditSample && (
            <div
              onClick={handleClose}
              className="text-mediumGray cursor-pointer flex items-center justify-center bg-[#1c1c1c] p-2 rounded-full"
            >
              <CancelIcon className="w-3 h-3" />
            </div>
          )}
        </div>

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
          <FormikSingleSelectDropdown
            name="songType"
            label="Song / Sample Type"
            placeholder="Select Sample Type"
            dropdownItems={songType}
          />

          <FormikLabeledField
            name="songTags"
            label="Song / Sample Tags"
            placeholder="Song Sample Tags"
            value={tags}
            handleInputChange={handleTagsChange}
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
              collaborators / Collaborators
            </span>

            <div
              onClick={handleComposerFieldClick}
              className="w-full min-h-5 text-dimGray text-sm font-normal px-4 py-[9px] rounded-lg bg-darkGray border border-eclipseGray cursor-pointer flex flex-wrap gap-2"
            >
              {selectedComposer.length ? (
                selectedComposer.map((composer, idx) => {
                  const { professional_name } = composer;
                  return (
                    <div
                      key={professional_name + idx}
                      className="flex gap-2 py-1 px-3 rounded-[20px] bg-eerieBlack border border-eerieBlack items-center"
                    >
                      <span className="text-xs text-mediumGray font-normal">
                        {professional_name}
                      </span>
                      <div className="w-2.5 h-2.5 cursor-pointer text-mediumGray flex justify-center items-center">
                        <CancelIcon className="w-2 h-2" />
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="h-6"></div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center px-4">
          <div>
            <div className="text-coolGray text-lg font-normal mb-3">
              Sample Privacy:
            </div>

            <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={privacyValue}
                onChange={handlePrivacyChange}
              >
                <FormControlLabel
                  value="private"
                  control={<Radio />}
                  label="Private"
                  sx={muiStyles.radioButtonLabel}
                />
                <FormControlLabel
                  value="public"
                  control={<Radio />}
                  label="Public"
                  sx={muiStyles.radioButtonLabel}
                />
              </RadioGroup>
            </FormControl>

            <div className="ml-[25px] text-[10px] font-normal text-coolGray">
              {privacyValue === "private"
                ? "Only you and people in your network will be able to view your samples."
                : "Everyone will be able to view your samples."}
            </div>
          </div>

          {!isEditSample && (
            <div>
              <div className="text-base font-normal text-[#ABABAB] mb-3">
                Add MIDI File
              </div>

              <div className="w-[132px] h-[50px] border border-[#66666659] rounded-lg flex">
                <label
                  htmlFor="add-midi-file"
                  className="text-mediumGray text-sm font-medium w-full h-full cursor-pointer flex justify-center items-center"
                >
                  Select File
                </label>

                <input
                  accept="file/*"
                  type="file"
                  name="add-midi-file"
                  id="add-midi-file"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UploadingFileMetaData;
