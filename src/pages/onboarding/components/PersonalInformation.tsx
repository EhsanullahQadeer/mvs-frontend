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
import { countriesStates } from "../sample-data/countriesStates";
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
import { IoLocationOutline, IoAdd } from "react-icons/io5";
import FormikOnChange from "./FormikOnChange";
import { checkUsernameIsAvailable } from "api/user";
import * as Yup from "yup";

type Props = {
  markSectionAsCompleted: () => void;
  formData: any;
  setFormData: (values: any) => void;
};

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  professional_name: Yup.string().required("Professional name is required"),
  country: Yup.string().required("Country is required"),
  region: Yup.string().required("Region is required"),
  bio: Yup.string()
    .max(255, "Bio must not exceed 255 characters")
    .required("Bio is required"),
});

const PersonalInformation = (props: Props) => {
  const { markSectionAsCompleted, formData, setFormData } = props;
  const muiStyles = getMuiStyles();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailType, setThumbnailType] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countriesArr, setCountriesArr] = useState<Array<{label: string, value: string}>>([]);
  const [statesArr, setStatesArr] = useState<Array<{label: string, value: string}>>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [thumbnailError, setThumbnailError] = useState(false);

  useEffect(() => {
    const countries = Object.values(countriesStates).map((country, index) => ({
      label: country.name,
      value: country.name
    }));
    console.log('Countries formatted:', countries);
    setCountriesArr(countries);
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const provinces = getStatesByCountryName();
      setStatesArr(provinces as Array<{label: string, value: string}>);
    }
  }, [selectedCountry]);

  const getStatesByCountryName = () => {
    const countryCode = Object.keys(countriesStates).find(
      (code) => countriesStates[code].name === selectedCountry
    );

    if (countryCode && countriesStates[countryCode].divisions) {
      return Object.values(countriesStates[countryCode].divisions).map((state, index) => ({
        label: state,
        value: state
      }));
    }
    return [];
  };

  const [buttonText, setButtonText] = useState("Save Changes");
  const initialValues = {
    username: "",
    professional_name: "",
    country: "",
    region: "",
    bio: "",
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
    });
  };

  const handleSubmit = async (values) => {
    setPasswordError(false);
    setConfirmPasswordError(false);
    setThumbnailError(false);

    if (!thumbnail) {
      setThumbnailError(true);
      return;
    }

    const passwordIsValid = isValidPassword(password);
    const passwordsMatch = password === confirmPassword;

    if (!passwordIsValid) {
      setPasswordError(true);
      return;
    }

    if (!passwordsMatch) {
      setConfirmPasswordError(true);
      return;
    }

    const sanitizedUsername = values.username.startsWith('@')
      ? values.username.substring(1)
      : values.username;

    try {
      const response = await checkUsernameIsAvailable(sanitizedUsername);
      if (!response.data.available) {
        setUsernameError("Username is already taken. Please choose another.");
        return;
      }
      setUsernameError("");
    } catch (error) {
      console.error("Error checking username availability", error);
      setUsernameError("An error occurred while checking username availability.");
      return;
    }

    setFormData({
      ...formData,
      ...values,
      password: password,
      thumbnail: thumbnail,
      thumbnail_type: thumbnailType,
    });
    setButtonText("Saved");
    setIsButtonDisabled(true);
    markSectionAsCompleted();
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const isValidPassword = (password) => {
    const hasMinLength = password.length >= 8;
    const hasTwoNumbers = (password.match(/\d/g) || []).length >= 2;
    return hasMinLength && hasTwoNumbers;
  };

  const handleThumbnailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const base64Thumbnail = await convertFileToBase64(file);
        setThumbnail(base64Thumbnail);
        setThumbnailType(file.type);
        setButtonText("Save Changes");
        setThumbnailError(false);
      } catch (error) {
        console.error("Error converting file to base64", error);
      }
    }
    e.target.value = null;
  };
  
  return (
    <div>
      <p className="text-sm font-normal text-mediumGray">
        Please tell us a bit about yourself, this will help us get to know you
        better and tailor your experience to your needs.
      </p>

      <div className="mt-[60px]">
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ setFieldValue, values }) => {
            const selectedCountry = values.country;
            setSelectedCountry(selectedCountry);

            const handleUsernameChange = (event: any) => {
              let value = event.target.value;
              if (value && !value.startsWith("@")) {
                value = "@" + value;
              }

              setFieldValue("username", value);
            };

            return (
              <Form>
                <>
                  <FormikOnChange
                    onChange={() => setButtonText("Save Changes")}
                  />
                  <div className="w-10/12 m-auto flex gap-10 justify-between items-center">
                    <div className="flex-1 flex gap-4 flex-col">
                      <div className="flex gap-5">
                        <div className="flex flex-col gap-1 flex-1">
                          <FormikLabeledField
                            name="username"
                            label="User Name"
                            placeholder="e.g @beckyhill"
                            handleInputChange={handleUsernameChange}
                            inputBgColor="jetBlack"
                            labelColor="white"
                          />
                          {usernameError && (
                            <div className="mt-1 text-[10px] font-normal text-darkRed">
                              {usernameError}
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col gap-1 flex-1">
                          <FormikLabeledField
                            name="professional_name"
                            label="Professional Name"
                            placeholder="e.g Becky Hill"
                            inputBgColor="jetBlack"
                            labelColor="white"
                          />
                        </div>
                      </div>

                      <div className="flex gap-5">
                        <FormikSingleSelectDropdown
                          name="country"
                          label="Country"
                          placeholder="Select Country"
                          dropdownItems={countriesArr}
                          inputBgColor="#0F0F0F"
                          labelColor="white"
                          dropdownBgColor="#1c1c1c"
                        />

                        <FormikSingleSelectDropdown
                          name="region"
                          label="State"
                          placeholder="Select State"
                          dropdownItems={statesArr}
                          inputBgColor="#0F0F0F"
                          labelColor="white"
                          dropdownBgColor="#1c1c1c"
                          disabled={!selectedCountry}
                        />
                      </div>

                      <div className="flex gap-5">
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
                              onChange={(e) => {
                                setPassword(e.target.value);
                                setButtonText("Save Changes");
                              }}
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

                        <div className="flex-1 flex flex-col gap-1">
                          <label
                            htmlFor="confirmPassword"
                            className="text-white text-sm font-normal"
                          >
                            Confirm Password
                          </label>
                          <FormControl fullWidth variant="outlined">
                            <OutlinedInput
                              id="confirmPassword"
                              placeholder="Confirm Password"
                              type={showConfirmPassword ? "text" : "password"}
                              value={confirmPassword}
                              onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                setButtonText("Save Changes");
                              }}
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowConfirmPassword}
                                    edge="end"
                                  >
                                    {showConfirmPassword ? (
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

                          {confirmPasswordError && (
                            <div
                              className={`mt-1.5 text-[10px] font-normal text-darkRed`}
                            >
                              Passwords do not match
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <FormikLabeledField
                          name="bio"
                          label="Bio"
                          placeholder="bio"
                          as="textarea"
                          inputBgColor="jetBlack"
                          labelColor="white"
                          maxLength={255}
                          showCharacterCount
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
                        <div className={`flex flex-col items-center`}>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleThumbnailChange}
                            className="hidden"
                            id="thumbnail"
                          />
                          <label htmlFor="thumbnail" className="cursor-pointer relative">
                            <img
                              src={thumbnail || avatarImg}
                              alt="thumbnail"
                              className={`w-32 h-32 object-cover rounded-full ${thumbnailError ? 'border-4 border-darkRed' : ''}`}
                            />
                            {!thumbnail && (
                              <div className="absolute bottom-0 right-0 bg-limeGreen rounded-full p-1">
                                <IoAdd className="w-5 h-5 text-jetBlack" />
                              </div>
                            )}
                          </label>
                          {thumbnailError && (
                            <div className="text-darkRed mt-1 text-xs font-medium">
                              Please provide a profile picture before proceeding.
                            </div>
                          )}
                        </div>

                        <div className="w-[231px]">
                          <div>
                            <Field
                              id="professional_name"
                              name="professional_name"
                              placeholder="Professional Name"
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
                              onChange={handleUsernameChange}
                              style={{
                                boxShadow: "none",
                              }}
                              className="w-full text-center border-none text-sm font-normal text-softGray bg-transparent p-0"
                            />
                          </div>
                        </div>

                        <div className="w-full flex items-center justify-center gap-2">
                          <div className="text-white flex items-center gap-1">
                            <IoLocationOutline className="w-4 h-4" />
                            <span className="text-[10px] font-medium">
                              City, State
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
                          maxLength={255}
                          style={{
                            boxShadow: "none",
                          }}
                          className="w-full border-none text-sm font-normal text-softGray bg-transparent p-0 resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-[60px] mr-2.5 w-full flex justify-end">
                    <button
                      type="submit"
                      className={`py-3 px-4 rounded-[60px] text-sm font-semibold border ${
                        buttonText === "Saved"
                          ? "cursor-auto bg-transparent border-eclipseGray text-mediumGray"
                          : "cursor-pointer bg-limeGreen border-limeGreen text-jetBlack"
                      }`}
                    >
                      {buttonText}
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
