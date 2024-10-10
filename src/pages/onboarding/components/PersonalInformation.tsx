/*************************************************************************
 * @file PersonalInformation.tsx
 * @author Ehsanullah Qadeer
 * @desc  This is the component for PersonalInformation of the user while registeration.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

import FormikLabeledField from "components/util/FormikLabeledField";
import FormikSingleSelectDropdown from "components/util/FormikSingleSelectDropdown";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { citiesByState, statesArr } from "../sample-data/SatesCities";
import {
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import getMuiStyles from "styles/getMuiStyles";
import profileBannerBackImg from "../../../assets/img/profileBannerBackImg.png";
import avatarImg from "../../../assets/img/avatar.svg";
import { IoLocationOutline } from "react-icons/io5";
import { FaBirthdayCake } from "react-icons/fa";

type Props = {};

const PersonalInformation = (props: Props) => {
  const muiStyles = getMuiStyles();
  const allCities = Object.values(citiesByState).flat();
  const [citiesArr, setCitiesArr] = useState(allCities);
  const [selectedState, setSelectedState] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [thumbnail, setThumbnai] = useState(null);

  useEffect(() => {
    if (selectedState) {
      setCitiesArr(citiesByState[selectedState] || []);
    } else {
      setCitiesArr(allCities);
    }
  }, [selectedState]);

  const initialValues = {
    username: "",
    professionalName: "",
    city: "",
    state: "",
    "date-of-birth": "",
    bio: "",
    artistName: "",
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
          {({ values }) => {
            const selectedState = values.state;
            setSelectedState(selectedState);

            return (
              <Form>
                <>
                  <div className="w-10/12 m-auto flex gap-10 justify-between items-center">
                    <div className="flex-1 flex gap-4 flex-col">
                      <div className="flex gap-5">
                        <FormikLabeledField
                          name="username"
                          label="User Name"
                          placeholder="e.g @beckyhill"
                          inputBgColor="jetBlack"
                          labelColor="white"
                        />

                        <FormikLabeledField
                          name="professionalName"
                          label="Professional Name"
                          placeholder="e.g Becky Hill"
                          inputBgColor="jetBlack"
                          labelColor="white"
                        />
                      </div>

                      <div className="flex gap-5">
                        <FormikSingleSelectDropdown
                          name="state"
                          label="State"
                          placeholder="Select State"
                          dropdownItems={statesArr}
                          inputBgColor="#0F0F0F"
                          labelColor="white"
                        />

                        <FormikSingleSelectDropdown
                          name="city"
                          label="City"
                          placeholder="Select City"
                          dropdownItems={citiesArr}
                          inputBgColor="#0F0F0F"
                          labelColor="white"
                          disabled={!selectedState}
                        />
                      </div>

                      <div className="flex flex-col gap-1">
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

                      <div className="flex flex-col gap-1 w-[182px]">
                        <FormikLabeledField
                          name="date-of-birth"
                          label="Date of birth"
                          type="date"
                          inputBgColor="jetBlack"
                          labelColor="white"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <FormikLabeledField
                          name="bio"
                          label="Bio"
                          placeholder="bio"
                          as="textarea"
                          inputBgColor="jetBlack"
                          labelColor="white"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <div
                        style={{
                          backgroundImage: `url("${profileBannerBackImg}")`,
                        }}
                        className={`px-10 py-[50px] border border-eclipseGray border-b-0 flex flex-col gap-2 justify-center items-center bg-center bg-cover rounded-t-lg`}
                      >
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

                        <div className="w-[231px]">
                          <div>
                            <Field
                              id="artistName"
                              name="artistName"
                              placeholder="Artist Name"
                              style={{
                                boxShadow: "none",
                              }}
                              className="w-full text-center border-none text-[23px] font-semibold text-white bg-transparent p-0"
                            />
                          </div>
                          <div>
                            <Field
                              id="username"
                              name="username"
                              placeholder="@Username"
                              style={{
                                boxShadow: "none",
                              }}
                              className="w-full text-center border-none text-sm font-normal text-[#CCCCCC] bg-transparent p-0"
                            />
                          </div>
                        </div>

                        <div className="w-full flex items-center justify-between gap-2">
                          <div className="text-white flex items-center gap-1">
                            <IoLocationOutline className="w-4 h-4" />
                            <span className="text-[10px] font-medium">
                              City, State
                            </span>
                          </div>
                          <div className="text-white flex items-center gap-1">
                            <FaBirthdayCake className="w-4 h-4" />
                            <span className="text-[10px] font-medium">
                              Month 28th, year{" "}
                              <span className="text-platinum">(Years)</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-5 border border-eclipseGray bg-[#171717] rounded-b-lg">
                        <Field
                          id="bio"
                          name="bio"
                          placeholder="Bio"
                          as="textarea"
                          rows="4"
                          style={{
                            boxShadow: "none",
                          }}
                          className="w-full border-none text-sm font-normal text-[#CCCCCC] bg-transparent p-0 resize-none"
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

export default PersonalInformation;
