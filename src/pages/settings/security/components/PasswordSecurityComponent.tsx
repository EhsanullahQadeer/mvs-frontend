/*************************************************************************
 * @file PasswordSecurityComponent.tsx
 * @author Ramiro Santos
 * @desc  Component for the Password security page. 
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/
// LOCAL IMPORTS
import { useToast } from '../../../../shared/toasts/ToastProvider';
import { validatePasswordAPI } from '../../../../api/user'; 
import PasswordField from './PasswordSecurityField';
import { changeUserPasswordAPI } from 'api/auth';

// THIRD PARTY IMPORTS
import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';


const validationSchema = Yup.object({
  currentPassword: Yup.string().required('Current password is required'),
  newPassword: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('New password is required'),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Please confirm your password'),
});

const PasswordSecurityComponent = () => {
    const initialValues = {
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    };

    const [hasPasswordError, setHasPasswordError] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const { addToast } = useToast();

    const handleFormSubmit = async (values: any, { resetForm }) => {
        try {
            console.log("values ", values);
            const response = await validatePasswordAPI(values.currentPassword);
            console.log("response ", response);
            if (response.data.results.isValid) {
                setHasPasswordError(false);
                setIsSubmitted(true);
                setErrorMessage("");
                await changeUserPasswordAPI({
                    currentPassword: values.currentPassword,
                    newPassword: values.newPassword
                });
                resetForm();
                setSuccessMessage("Password Successfully Changed");
                addToast({ state: 'passwordChanged' })
                console.log('Password validated successfully');
            } else {
                setHasPasswordError(true);
                setIsSubmitted(false);
                setErrorMessage(response.data.message);
                setSuccessMessage("");
            }
        } catch (error) {
            console.error('Error validating password:', error);
            setHasPasswordError(true);
            setIsSubmitted(false);
            setSuccessMessage("");
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
                <Formik 
                    initialValues={initialValues} 
                    validationSchema={validationSchema}
                    onSubmit={handleFormSubmit}
                >
                    {({ isValid, dirty, errors, touched }) => (
                        <Form className="flex flex-col gap-4">
                            <div className="flex flex-col gap-4">
                                <h4 className="text-sm font-semibold text-platinum">Current Password</h4>
                                <div className="flex flex-col gap-2">
                                    <div className="flex gap-4 items-center">
                                        <PasswordField 
                                            name="currentPassword" 
                                            placeholder="Current Password" 
                                            mode={!isSubmitted}
                                        />
                                        {hasPasswordError && (
                                            <p className="text-xs text-red-500">Incorrect password</p>
                                        )}
                                    </div>
                                    {errors.currentPassword && touched.currentPassword && (
                                        <p className="text-xs text-red-500">{errors.currentPassword as string}</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <h4 className="text-sm font-semibold text-platinum">New Password</h4>
                                <div className="flex flex-col gap-2">
                                    <div className="flex gap-4 items-center">
                                        <PasswordField 
                                            name="newPassword" 
                                            placeholder="New Password" 
                                            mode={!isSubmitted}
                                        />
                                        <PasswordField 
                                            name="confirmNewPassword" 
                                            placeholder="Confirm New Password" 
                                            mode={!isSubmitted}
                                        />
                                    </div>
                                    {errors.newPassword && touched.newPassword && (
                                        <p className="text-xs text-red-500">{errors.newPassword as string}</p>
                                    )}
                                    {errors.confirmNewPassword && touched.confirmNewPassword && (
                                        <p className="text-xs text-red-500">{errors.confirmNewPassword as string}</p>
                                    )}
                                    {errorMessage && (
                                        <p className="text-xs text-red-500">{errorMessage}</p>
                                    )}
                                    {successMessage && (
                                        <p className="text-xs text-[#9EFF00]">{successMessage}</p>
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <button 
                                    type="submit" 
                                    className="text-black bg-[#9EFF00] px-4 py-2 rounded-full hover:bg-gray-300 transition-colors"
                                    disabled={!isValid || !dirty}
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
