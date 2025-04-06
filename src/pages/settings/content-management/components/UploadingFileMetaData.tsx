/*************************************************************************
 * @file UploadingFileMetaData.tsx
 * @author Ehsanullah Qadeer
 * @desc  This is the component for the files that are uploading to give their information.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

import { Field } from 'formik';
import { useSelector } from "react-redux";
import { useFormikContext } from "formik";
import { RootState } from "redux/reducers";
import ComposerDialog from "./ComposerDialog";
import getMuiStyles from "styles/getMuiStyles";
import React, { useState, useEffect } from "react";
import { songType } from "../sample-data/sampleData";
import { IUploadingFileMetaDataProps } from "./types";
import FormikLabeledField from "../../../../components/util/FormikLabeledField";
import { ReactComponent as CancelIcon } from "../../../../assets/icons/cancelIcon.svg";
import FormikSingleSelectDropdown from "../../../../components/util/FormikSingleSelectDropdown";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

const UploadingFileMetaData = (props: IUploadingFileMetaDataProps) => {
  const {
    privacyValue,
    setPrivacyValue,
    setMidiFile,
    selectedComposer,
    setSelectedComposer,
    isEditSample,
    handleClose,
    isLoginProfile,
    sampleOwner,
  } = props;

  const muiStyles = getMuiStyles();
  const [openComposerDialog, setOpenComposerDialog] = useState(false);
  const { setFieldValue } = useFormikContext();
  const [tags, setTags] = useState("");
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (props.sample?.type) {
      const matchingType = songType.find(
        (option) =>
          option.value.toLowerCase().trim() ===
          props.sample.type.toLowerCase().trim()
      );
      
      console.log('Setting field value to:', matchingType || props.sample.type);
      setFieldValue('songType', matchingType || props.sample.type);
      setFieldValue('songBpm', props.sample.bpm);
      setFieldValue('songName', props.sample.name);
      
      // Format initial tags
      const formattedTags = Array.isArray(props.sample.tags)
        ? props.sample.tags
            .filter((tag) => tag.trim())
            .map((tag) => (tag.startsWith("#") ? tag : `#${tag}`))
            .join(" ")
        : "";

      setFieldValue("songTags", formattedTags);
      setFieldValue("sampleKey", props.sample.key);
    }
  }, [props.sample]);

  useEffect(() => {
    if (!selectedComposer?.length && user && !isEditSample) {
      const ownerCollaborator = {
        user: {
          id: user?.id,
          thumbnail: user?.thumbnail,
          professional_name: user?.professional_name,
          is_owner: true,
        },
        contribution: 100,
        roles: [],
      };

      setSelectedComposer([ownerCollaborator]);
    }
  }, [user, selectedComposer, isEditSample]);

  const handleComposerFieldClick = () => {
    setOpenComposerDialog(true);
  };

  const handleAddComposer = (composerAdded) => {
    setSelectedComposer((prev) => {
      const isComposerAlreadySelected = prev.some(
        (composer) => composer?.user?.id === composerAdded?.id
      );

      if (isComposerAlreadySelected) {
        console.log("Composer already exists");
        return prev;
      }

      const newCollaborator = {
        user: {
          id: composerAdded.id,
          thumbnail: composerAdded.thumbnail,
          professional_name: composerAdded.professional_name,
          is_owner: false,
        },
        contribution: 0,
        roles: composerAdded.roles,
      };

      console.log("Uploading File Metadata - handleAddComposer - new Composer: ", newCollaborator);

      return [...prev, newCollaborator];
    });
  };

  const handlePrivacyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrivacyValue((event.target as HTMLInputElement).value);
  };
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMidiFile(e.target.files[0]);
  };
  const handleTagsChange = (e) => {
    const value = e.target.value;

    // Update the visible input value
    setTags(value);

    // Format tags for storage - only when saving
    const tagsArray = value
      .split(" ")
      .filter((word) => word.trim() !== "")
      .map((tag) => (tag.startsWith("#") ? tag.slice(1) : tag));

    // Update Formik value
    setFieldValue("songTags", value); // Change this to pass the raw input value
  };
  const handleTagInput = (e) => {
    if (e.key === " ") {
      const value = e.target.value;
      // Split by spaces and add # to words that don't have it
      const formattedTags = value
        .split(" ")
        .map((tag) => tag.trim())
        .filter((tag) => tag)
        .map((tag) => (tag.startsWith("#") ? tag : `#${tag}`))
        .join(" ");

      setFieldValue("songTags", formattedTags);
    }
  };

 

  return (
    <>
      <ComposerDialog
        {...{
          contributors: selectedComposer,
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
          {!isLoginProfile && (
            <span className="text-[28px] text-white font-medium leading-[34px]">
              File Metadata
            </span>
          )}
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
            dropdownItems={songType.map((item) => ({
              label: item.label,
              value: item.value,
            }))}
            value={props.sample?.type || ""}
          />

          <div className="flex-1 flex flex-col gap-1">
            <span className="text-silver text-sm font-normal">
              Song / Sample Tags
            </span>
            <Field
              name="songTags"
              className="w-full text-dimGray text-sm font-normal px-4 py-[9px] rounded-lg bg-darkGray border border-eclipseGray"
              placeholder="Song Sample Tags"
              onKeyDown={handleTagInput}
            />
          </div>
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
              {selectedComposer?.length ? (
                selectedComposer?.map((composer, idx) => {
                  const { professional_name } = composer?.user;

                  // Function to remove composer
                  const removeComposer = (event: React.MouseEvent) => {
                    event.stopPropagation(); // Prevent parent onClick from firing
                    setSelectedComposer(prev => 
                      prev.filter((_, index) => index !== idx)
                    );
                  };
                  return (
                    <div
                      key={professional_name + idx}
                      className="flex gap-2 py-1 px-3 rounded-[20px] bg-eerieBlack border border-eerieBlack items-center"
                    >
                      <span className="text-xs text-mediumGray whitespace-nowrap font-normal">
                        {composer?.user?.professional_name}
                      </span>
                      <div 
                        className="w-3.5 h-3.5 cursor-pointer rounded-full text-mediumGray flex justify-center items-center hover:bg-dimGray hover:text-black" // Change 'gray-600' to your desired color
                        onClick={removeComposer} // Add onClick to remove composer
                      >
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
        {!isLoginProfile && (
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
        )}
        {isLoginProfile && (
          <div className="w-[132px] h-[50px] border border-[#66666659] rounded-lg flex justify-end items-end self-end">
            <label className="text-mediumGray text-sm font-medium w-full h-full cursor-pointer flex justify-center items-center">
              Replace File
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
        )}
      </div>
    </>
  );
};

export default UploadingFileMetaData;
