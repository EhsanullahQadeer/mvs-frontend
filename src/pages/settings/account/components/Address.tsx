/*************************************************************************
 * @file Address.tsx
 * @author Ehsanullah Qadeer
 * @desc  component Address for account setting page.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* LOCAL IMPORTS */
import FormikField from "components/util/FormikField";
import { ReactComponent as EditIcon } from "../../../../assets/icons/editPencilIcon.svg";
import { updateUserProfileAPI } from "api/user";
// THIRD PARTY IMPORTS
import { useState, useEffect } from "react";
import { Form, Formik } from "formik";

interface AddressFormValues {
  country: string;
  city: string;
}

interface AddressProps {
  user: any;
  setUser: any;
}

const Address: React.FC<AddressProps> = ({ user, setUser }) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState<AddressFormValues>({
    country: "",
    city: "",
  });

  useEffect(() => {
    if (user) {
      setInitialValues({
        country: user.country || "",
        city: user.city || "",
      });
    }
  }, [user]);

  const handleFormSubmit = async (values: AddressFormValues) => {
    const changedValues: {[key: string]: string} = {};
    
    if (values.country !== user.country) {
      changedValues.country = values.country;
    }
    if (values.city !== user.city) {
      changedValues.city = values.city;
    }
    
    if (Object.keys(changedValues).length > 0) {
      await updateUserProfileAPI(changedValues);
      setUser({ ...user, ...changedValues });
    }
    
    setInitialValues(values);
    setIsEditable(false);
  };

  const formFields = [
    { name: "country", label: "Country", type: "text" },
    { name: "city", label: "City/State", type: "text" },
  ];

  return (
    <section className="px-4 mt-10 py-5 border-b border-t border-[#242424] w-full">
      <Formik 
        initialValues={initialValues} 
        onSubmit={handleFormSubmit}
        enableReinitialize={true}
      >
        {({ values, errors, touched, handleSubmit, resetForm }) => (
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
                  const { name, label } = field;
                  const labelValue = values[name as keyof AddressFormValues];
                  return (
                    <div
                      key={name}
                      className={`flex flex-col font-semibold w-4/5 items-start py-2.5 gap-2 rounded-lg ${
                        isEditable ? "text-white" : "text-coolGray"
                      }`}
                    >
                      <FormikField
                        name={name}
                        label={label}
                        isEditable={isEditable}
                        mode="editView"
                        labelValue={labelValue}
                      />
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
