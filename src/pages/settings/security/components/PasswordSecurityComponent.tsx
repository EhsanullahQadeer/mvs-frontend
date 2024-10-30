/*************************************************************************
 * @file PasswordSecurityComponent.tsx
 * @author Ramiro Santos
 * @desc  Component for the Password security page. 
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

// THIRD PARTY IMPORTS
import React, { useState } from 'react';
import { Form, Formik } from 'formik';


import PasswordField from './PasswordSecurityField'; // Adjust the import path as necessary
import { boolean } from 'yup';

const PasswordSecurityComponent = () => {
    const initialValues = {
        email: "",
        userpassword: "AngelIsDummy",
        currentPassword: "",
        confirmPassword: "",
        newPassword: "",
        verified: false,
    };

    const [isSubmitted, setIsSubmitted] = useState(true);

    const handleFormSubmit = (values: any) => {
      console.log("values ", values);
      
      // Compare the submitted currentPassword with the actual user password
      if (initialValues.userpassword === values.currentPassword) {
          setIsSubmitted(true); 
      } else {
          setIsSubmitted(false); 
      }
  };

    return (
        <div className="px-3 flex flex-col">
            <div className="py-3 flex justify-between items-center">
                <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-semibold text-platinum">Password</h3>
                    <p className="text-sm font-normal text-coolGray">
                        Set a unique password to protect your account
                    </p>
                </div>
            </div>
            <div className="py-3 flex flex-col">
                <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
                    {() => (
                        <Form className="flex flex-col gap-4"> {/* Changed to flex-col and added gap */}
                            <div className="flex flex-col gap-4">
                                <h4 className="text-sm font-semibold text-platinum">Current Password</h4>
                                <div className="flex gap-4 items-center">
                                    <PasswordField name="currentPassword" placeholder="Current Password" mode={!isSubmitted}/>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <h4 className="text-sm font-semibold text-platinum">New Password</h4>
                                <div className="flex gap-4 items-center">
                                    <PasswordField name="newPassword" placeholder="New Password" mode={!isSubmitted}/>
                                    <PasswordField name="confirmNewPassword" placeholder="Confirm New Password" mode={!isSubmitted}/>
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button 
                                    type="submit" 
                                    className="text-black bg-[#9EFF00] px-4 py-2 rounded-full hover:bg-gray-300 transition-colors"
                                >
                                    Save Changes        
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default PasswordSecurityComponent;
