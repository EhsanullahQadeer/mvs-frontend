/*************************************************************************
 * @file UserPersonalInformation.tsx
 * @author Ehsanullah Qadeer
 * @desc  This is the component for UserPersonalInformation of the user while registeration.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

import FormikLabeledField from "components/util/FormikLabeledField";
import FormikSingleSelectDropdown from "components/util/FormikSingleSelectDropdown";
import { Form, Formik } from "formik";
import { useState } from "react";
import { countriesList, worldRegions } from "../sample-data/countryRegions";
import {
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import getMuiStyles from "styles/getMuiStyles";
import avatarImg from "../../../assets/img/avatar.svg";

type Props = {
  markSectionAsCompleted: () => void;
};

const UserPersonalInformation = (props: Props) => {
  const { markSectionAsCompleted } = props;
  const muiStyles = getMuiStyles();
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [thumbnail, setThumbnai] = useState(null);

  const initialValues = {
    professionalName: "",
    country: "",
    region: "",
  };

  const handleSubmit = (values) => {
    setPasswordError(false);
    const passwordIsValid = isValidPassword(password);

    if (!passwordIsValid) {
      setPasswordError(true);
      return;
    }
    console.log("values", values);
    console.log("password", password);
    console.log("thumbnail", thumbnail);
    markSectionAsCompleted();
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const isValidPassword = (password) => {
    const hasMinLength = password.length >= 8;
    const hasTwoNumbers = (password.match(/\d/g) || []).length >= 2;
    return hasMinLength && hasTwoNumbers;
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setThumbnai(imageUrl);
      e.target.value = null;
    }
  };
  return (
    <div>
      <p className="text-sm font-normal text-mediumGray">
        Please tell us a bit about yourself, this will help us get to know you
        better and tailor your experience to your needs.
      </p>

      <div className="mt-[60px]">
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {() => {
            return (
              <Form>
                <>
                  <div className="w-10/12 m-auto flex gap-[50px] justify-between">
                    <div className="flex">
                      <input
                        type="file"
                        accept="image/*"
                        name="thumbnail"
                        id="thumbnail"
                        className="hidden"
                        onChange={handleThumbnailChange}
                      />

                      <label
                        htmlFor="thumbnail"
                        className="w-[138px] h-[138px] bg-eerieBlack rounded-full relative cursor-pointer"
                      >
                        <img
                          src={thumbnail ? thumbnail : avatarImg}
                          alt="avatarImg"
                          className="rounded-full w-full h-full object-cover"
                        />

                        <div className="absolute bottom-2 right-1 w-7 h-7 flex justify-center items-center bg-limeGreen rounded-full text-dimGray font-semibold">
                          +
                        </div>
                      </label>
                    </div>

                    <div className="flex-1 flex gap-4 flex-col">
                      <div className="flex gap-5">
                        <div className="flex-1 flex flex-col gap-1">
                          <FormikLabeledField
                            name="professionalName"
                            label="Professional Name"
                            placeholder="e.g Becky Hill"
                            inputBgColor="jetBlack"
                            labelColor="white"
                          />

                          <div
                            className={`mt-1.5 text-[10px] font-normal text-dimGray`}
                          >
                            What’s your professional name? Let us know so we can
                            make sure to address you just the way you’d like!
                          </div>
                        </div>

                        <div className="flex-1 flex flex-col gap-1">
                          <label
                            htmlFor="password"
                            className="text-white text-sm font-normal"
                          >
                            Set Password
                          </label>
                          <FormControl fullWidth variant="outlined">
                            <OutlinedInput
                              id="password"
                              placeholder="Password"
                              type={showPassword ? "text" : "password"}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                  >
                                    {showPassword ? (
                                      <MdVisibilityOff />
                                    ) : (
                                      <MdVisibility />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              }
                              sx={muiStyles.passwordFieldStyles}
                            />
                          </FormControl>

                          <div
                            className={`mt-1.5 text-[10px] font-normal ${
                              passwordError ? "text-darkRed" : "text-dimGray"
                            }`}
                          >
                            at least 8 characters and at least 2 numbers
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-5">
                        <FormikSingleSelectDropdown
                          name="region"
                          label="Region"
                          placeholder="Select Region"
                          dropdownItems={worldRegions}
                          inputBgColor="#0F0F0F"
                          labelColor="white"
                          dropdownBgColor="#1c1c1c"
                        />

                        <FormikSingleSelectDropdown
                          name="Country"
                          label="Country"
                          placeholder="Select Country"
                          dropdownItems={countriesList}
                          inputBgColor="#0F0F0F"
                          labelColor="white"
                          dropdownBgColor="#1c1c1c"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-[60px] mr-2.5 w-full flex justify-end">
                    <button
                      type="submit"
                      className="bg-limeGreen py-3 px-4 rounded-[60px] text-sm font-semibold text-jetBlack cursor-pointer"
                    >
                      Save Changes
                    </button>
                  </div>
                </>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default UserPersonalInformation;
