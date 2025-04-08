/*************************************************************************
 * @file Address.tsx
 * @author Ehsanullah Qadeer
 * @desc  component Address for account setting page.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* LOCAL IMPORTS */
import FormikField from "components/util/FormikField";
import FormikSingleSelectDropdown from "components/util/FormikSingleSelectDropdown";
import { ReactComponent as EditIcon } from "../../../../assets/icons/editPencilIcon.svg";
import { Select, MenuItem, Chip, FormControl } from "@mui/material";
import { updateUserProfileAPI } from "api/user";
import { useToast } from "shared/toasts/ToastProvider";
// THIRD PARTY IMPORTS
import { useState, useEffect } from "react";
import { Form, Formik } from "formik";
import { countriesStates } from "pages/onboarding/sample-data/countriesStates";
import * as Yup from 'yup';
import getMuiStyles from "styles/getMuiStyles";

interface AddressFormValues {
  country: string;
  region: string;
}

interface AddressProps {
  user: {
    country?: string;
    region?: string;
    [key: string]: any;
  };
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

// Add validation schema
const AddressValidationSchema = Yup.object().shape({
  country: Yup.string().required('Country is required'),
  region: Yup.string().required('Region is required'),
});

const Address: React.FC<AddressProps> = ({ user, setUser }) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<AddressFormValues>({
    country: "",
    region: "",
  });

  const [countriesArr, setCountriesArr] = useState<Array<{label: string, value: string}>>([]);
  const [statesArr, setStatesArr] = useState<Array<{label: string, value: string}>>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const { addToast } = useToast();

  useEffect(() => {
    if (user) {
      setInitialValues({
        country: user.country || "",
        region: user.region || "",
      });
      
      // Set selected country when user data loads
      if (user.country) {
        setSelectedCountry(user.country);
      }
    }
  }, [user]);
  
  

  const handleFormSubmit = async (values: AddressFormValues) => {
    const changedValues: {[key: string]: string} = {};
    
    if (values.country !== user.country) {
      changedValues.country = values.country;
    }
    if (values.region !== user.region) {
      changedValues.region = values.region;
    }
    
    if (Object.keys(changedValues).length > 0) {
      try {
        await updateUserProfileAPI(changedValues);
        setUser({ ...user, ...changedValues });
        addToast({state: "profileUpdated", actionFunction: () => window.location.href = `/profile/${user.username}`});
      } catch (error) {
        addToast({state: "failedToSaveChanges", actionFunction: () => handleFormSubmit(values)});
      }
    }
    
    setInitialValues(values);
    setIsEditable(false);
  };

  useEffect(() => {
    const countries = Object.values(countriesStates).map((country, index) => ({
      label: country.name,
      value: country.name
    }));
    setCountriesArr(countries);
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const provinces = getStatesByCountryName(selectedCountry);
      setStatesArr(provinces as Array<{label: string, value: string}>);
    } else {
      setStatesArr([]);
    }
  }, [selectedCountry]);

  const getStatesByCountryName = (countryName: string) => {
    const countryCode = Object.keys(countriesStates).find(
      (code) => countriesStates[code].name === countryName
    );

    if (countryCode && countriesStates[countryCode].divisions) {
      return Object.values(countriesStates[countryCode].divisions).map((state) => ({
        label: state,
        value: state
      }));
    }
    return [];
  };

  const formFields = [
    { 
      name: "country", 
      label: "Country", 
      type: "dropdown",
      options: countriesArr
    },
    { 
      name: "region", 
      label: "Region", 
      type: "dropdown",
      options: statesArr
    },
  ];

  // Add this function to handle form field changes
  const handleFieldChange = (formik: any) => {
    return (e: React.ChangeEvent<any>) => {
      const { name, value } = e.target;
      
      // Let Formik handle the change first
      formik.handleChange(e);
      
      // Then handle our custom logic
      if (name === "country") {
        setSelectedCountry(value);
        formik.setFieldValue("region", "");
      }
    };
  };

  return (
    <section className="px-4 mt-10 py-5 border-b border-t border-[#242424] w-full">
      <Formik 
        initialValues={initialValues} 
        onSubmit={handleFormSubmit}
        enableReinitialize={true}
        validationSchema={AddressValidationSchema}
        validateOnChange={true}
        validateOnBlur={true}
      >
        {({ values, errors, touched, handleSubmit, resetForm, setFieldValue, handleChange, isValid, dirty, setTouched }) => (
          <Form>
            <div className="flex justify-between items-center">
              <h2 className="text-white py-2.5 text-base font-semibold">
                Address
              </h2>
              
              {/* Edit / Save / Cancel Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (isEditable) {
                      // Touch all fields to trigger validation
                      setTouched({
                        country: true,
                        region: true
                      });
                      handleSubmit();
                    } else {
                      setIsEditable(true);
                    }
                  }}
                  className="flex justify-between items-center gap-1 whitespace-nowrap text-sm px-2 py-1 rounded-lg text-dimGray bg-gunMetal hover:bg-opacity-80 cursor-pointer"
                >
                  {isEditable ? (
                    "Save"
                  ) : (
                    <>
                      <span className="text-sm">Edit</span>
                      <div className="text-dimGray">
                        <EditIcon />
                      </div>
                    </>
                  )}
                </button>
                
                {isEditable && (
                  <button
                    type="button"
                    onClick={() => {
                      resetForm({ values: initialValues });
                      setIsEditable(false);
                    }}
                    className="flex justify-between items-center gap-1 whitespace-nowrap text-sm px-2 py-1 rounded-lg text-dimGray bg-gunMetal hover:bg-opacity-80 cursor-pointer"
                  >
                    <span className="text-sm">Cancel</span>
                  </button>
                )}
              </div>
            </div>
            
            <div>
              <div className="w-4/5 grid grid-cols-2 py-3 text-sm">
                {formFields.map((field) => {
                  const { name, label, type, options } = field;
                  const labelValue = values[name as keyof AddressFormValues];
                  return (
                    <div
                      key={name}
                      className={`flex flex-col font-semibold w-4/5 items-start py-2.5 gap-2 rounded-lg ${
                        isEditable ? "text-white" : "text-coolGray"
                      }`}
                    >
                      {isEditable ? (
                        <>
                          <label className="text-white text-sm mb-1">{label}:</label>
                          {name === "country" ? (
                            // Special handling for country field
                            <Select
                              name="country"
                              value={values.country}
                              onChange={(e) => {
                                handleChange(e);
                                setSelectedCountry(e.target.value);
                                setFieldValue("region", "");
                              }}
                              className="w-4/5 rounded text-white"
                              MenuProps={{
                                PaperProps: {
                                  sx: {
                                    bgcolor: "#161616",
                                    borderRadius: "4px",
                                    "& .MuiList-root": {
                                      padding: 0
                                    }
                                  }
                                }
                              }}
                              sx={{
                                ...getMuiStyles().SelectDropdown,
                                ".MuiSelect-select": {
                                  backgroundColor: "transparent",
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: "8px",
                                  padding: "10px 6px 4px 12px",
                                  minHeight: "36px",
                                },
                              }}
                            >
                              <MenuItem 
                                value="" 
                                sx={{ 
                                  backgroundColor: "#161616",
                                  "&:hover": { backgroundColor: "#242424" },
                                  color: "#9CA3AF"
                                }}
                              >
                                Select Country
                              </MenuItem>
                              {countriesArr.map(option => (
                                <MenuItem 
                                  key={option.value} 
                                  value={option.value}
                                  sx={{ 
                                    backgroundColor: "#161616",
                                    "&:hover": { backgroundColor: "#242424" },
                                    color: "#9CA3AF"
                                  }}
                                >
                                  {option.label}
                                </MenuItem>
                              ))}
                            </Select>
                          ) : (
                            // Region field
                            <Select
                              name="region"
                              value={values.region}
                              onChange={handleChange}
                              disabled={!selectedCountry}
                              className="w-4/5 rounded text-white"
                              MenuProps={{
                                PaperProps: {
                                  sx: {
                                    bgcolor: "#161616",
                                    borderRadius: "4px",
                                    "& .MuiList-root": {
                                      padding: 0
                                    }
                                  }
                                }
                              }}
                              sx={{
                                ...getMuiStyles().SelectDropdown,
                                ".MuiSelect-select": {
                                  backgroundColor: "transparent",
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: "8px",
                                  padding: "10px 6px 4px 12px",
                                  minHeight: "36px",
                                },
                              }}
                            >
                              <MenuItem 
                                value="" 
                                sx={{ 
                                  backgroundColor: "#161616",
                                  "&:hover": { backgroundColor: "#242424" },
                                  color: "#9CA3AF"
                                }}
                              >
                                Select Region
                              </MenuItem>
                              {statesArr.map(option => (
                                <MenuItem 
                                  key={option.value} 
                                  value={option.value}
                                  sx={{ 
                                    backgroundColor: "#161616",
                                    "&:hover": { backgroundColor: "#242424" },
                                    color: "#9CA3AF"
                                  }}
                                >
                                  {option.label}
                                </MenuItem>
                              ))}
                            </Select>
                          )}
                        </>
                      ) : (
                        <FormikField
                          name={name}
                          label={label}
                          isEditable={false}
                          mode="editView"
                          labelValue={labelValue}
                          type="text"
                        />
                      )}
                      {touched[name as keyof AddressFormValues] && errors[name as keyof AddressFormValues] && (
                        <div className="text-red-500 text-xs mt-1">
                          {String(errors[name as keyof AddressFormValues])}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default Address;
