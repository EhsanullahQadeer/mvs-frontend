/*************************************************************************
 * @file Account-Information.tsx
 * @author Ehsanullah Qadeer
 * @desc  component Account-Information for account setting page.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* LOCAL IMPORTS */
import { ReactComponent as EditIcon } from "../../../../assets/icons/editPencilIcon.svg";
import { updateUserProfileAPI } from "api/user";
import { useToast } from "shared/toasts/ToastProvider";

// THIRD PARTY IMPORTS
import React, { useEffect } from "react";
import { useState } from "react";
import { Form, Formik } from "formik";
import FormikField from "components/util/FormikField";
import * as Yup from 'yup';
import { parsePhoneNumberFromString } from 'libphonenumber-js';


const AccountInformation: React.FC<{ user: any, setUser: any }> = ({ user, setUser }) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<any>({
    firstname: "",
    lastname: "",
    phone: "",
  });
  const [values, setValues] = useState<any>({});
  const { addToast } = useToast();

  useEffect(() => {
    const newValues = {
      firstname: user?.first_name,
      lastname: user?.last_name,
      phone: user?.phone,
    };
    setInitialValues(newValues);
    setValues(newValues);
  }, [user]);

  const handleCancel = () => {
    setValues({...initialValues});
    setIsEditable(false);
  };

  const handleFormSubmit = async (values: any) => {
    const changedValues: Record<string, any> = {};
    
    const fieldMapping = {
      firstname: 'first_name',
      lastname: 'last_name',
      phone: 'phone'
    };

    Object.keys(values).forEach(key => {
      if (values[key] !== initialValues[key]) {
        const apiFieldName = fieldMapping[key] || key;
        changedValues[apiFieldName] = values[key];
      }
    });
    
    if (Object.keys(changedValues).length > 0) {
      try {
        const res = await updateUserProfileAPI(changedValues);
        
        if (res && res.data) {
          const newValues = {
            firstname: res.data.first_name || values.firstname,
            lastname: res.data.last_name || values.lastname,
            phone: res.data.phone || values.phone,
          };
          
          setValues(newValues);
          setInitialValues(newValues);
          addToast({state: "profileUpdated", actionFunction: () => window.location.href = `/profile/${user.username}`});  
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        addToast({state: "failedToSaveChanges", actionFunction: () => handleFormSubmit(values)});
      }
    }
    
    setIsEditable(false);
  };

  const formatPhoneNumber = (value: string) => {
    if (!value) return value;
    
    const phoneNumber = parsePhoneNumberFromString(value, 'US');
    if (phoneNumber) {
      return phoneNumber.formatNational();
    }
    
    const phoneNumberString = value.replace(/[^\d]/g, '');
    if (phoneNumberString.length < 4) return phoneNumberString;
    if (phoneNumberString.length < 7) {
      return `(${phoneNumberString.slice(0, 3)}) ${phoneNumberString.slice(3)}`;
    }
    return `(${phoneNumberString.slice(0, 3)}) ${phoneNumberString.slice(3, 6)}-${phoneNumberString.slice(6, 10)}`;
  };

  const validationSchema = Yup.object({
    firstname: Yup.string().required('First name is required'),
    lastname: Yup.string().required('Last name is required'),
    phone: Yup.string()
      .matches(
        /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
        'Please enter a valid phone number'
      )
      .required('Phone number is required'),
  });

  const formFields = [
    { name: "firstname", label: "First Name", type: "text" },
    { name: "lastname", label: "Last Name", type: "text" },
    { name: "phone", label: "Phone Number", type: "tel" },
  ];

  return (
    <section className="px-4 mt-10 py-5 border-b border-t border-[#242424] w-full">
      <Formik 
        initialValues={values} 
        enableReinitialize={true} 
        onSubmit={handleFormSubmit} 
        onReset={handleCancel}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, values: formikValues, setFieldValue, errors, touched }) => (
          <Form>
            <div className="flex justify-between items-center">
              <h2 className={`text-white py-2.5 text-base font-semibold`}>
                Account Information
              </h2>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (isEditable) {
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
                    type="reset"
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
                  const { name, label, type } = field;
                  const labelValue = formikValues[name];
                  
                  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                    if (name === 'phone') {
                      const formattedValue = formatPhoneNumber(e.target.value);
                      setFieldValue(name, formattedValue);
                    }
                  };
                  
                  return (
                    <div
                      key={field.name}
                      className={`flex flex-col font-semibold w-4/5 items-start py-2.5 gap-2 rounded-lg ${
                        isEditable ? "text-white" : "text-coolGray"
                      }`}
                    >
                      <FormikField
                        {...{
                          name,
                          label,
                          type,
                          isEditable,
                          mode: "editView",
                          labelValue,
                          onChange: handleChange,
                          error: touched[name] && errors[name],
                        }}
                      />
                      {touched[name] && errors[name] && (
                        <div className="text-red-500 text-xs mt-1">{String(errors[name])}</div>
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

export default AccountInformation;
