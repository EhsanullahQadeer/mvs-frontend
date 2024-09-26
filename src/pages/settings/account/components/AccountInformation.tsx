/*************************************************************************
 * @file Account-Information.tsx
 * @author Ehsanullah Qadeer
 * @desc  component Account-Information for account setting page.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* LOCAL IMPORTS */
import { ReactComponent as EditIcon } from "../../../../assets/icons/editPencilIcon.svg";

// THIRD PARTY IMPORTS
import React from "react";
import { useState } from "react";
import { Form, Formik } from "formik";
import FormikField from "components/util/FormikField";

const AccountInformation: React.FC = () => {
  // Define form data with multiple fields
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const initialValues = {
    firstname: "Serena",
    lastname: "Williams",
    email: "serena@example.com",
    phoneNumber: "123-456-7890",
  };

  const handleFormSubmit = (values: any) => {
    console.log("values ", values);
  };

  // Array of fields to map over for rendering inputs
  const formFields = [
    { name: "firstname", label: "First Name", type: "text" },
    { name: "lastname", label: "Last Name", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "phoneNumber", label: "Phone Number", type: "text" },
  ];

  return (
    <section className="px-4 mt-10 py-5 border-b border-t border-[#242424] w-full">
      <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
        {({ values }) => (
          <Form>
            <div className="flex justify-between items-center">
              <h2 className={`text-white py-2.5 text-base font-semibold`}>
                Account Information
              </h2>
              {/* Edit / Save Changes Button */}
              <div className="flex">
                <button
                  type={isEditable ? "button" : "submit"}
                  onClick={() => setIsEditable(!isEditable)}
                  className="flex justify-between items-center gap-1 whitespace-nowrap text-sm px-2 py-1 rounded-lg text-dimGray bg-gunMetal"
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
              </div>
            </div>
            <div>
              <div className="w-4/5 grid grid-cols-2 py-3 text-sm">
                {formFields.map((field) => {
                  const { name, label } = field;
                  const labelValue = values[name];
                  return (
                    <div
                      key={field.name}
                      className={`flex flex-col font-semibold w-4/5  items-start py-2.5 gap-2 rounded-lg ${
                        isEditable ? "text-white" : "text-coolGray"
                      }`}
                    >
                      <FormikField
                        {...{
                          name,
                          label,
                          isEditable,
                          mode: "editView",
                          labelValue,
                        }}
                      />
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
