/*************************************************************************
 * @file EmailSecurityComponent.tsx
 * @author Ramiro Santos
 * @desc  Component for the email security page. 
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* LOCAL IMPORTS */
import { ReactComponent as EditIcon } from "../../../../assets/icons/editPencilIcon.svg";

// THIRD PARTY IMPORTS
import { EmailInputModal, EmailConfirmationModal } from './SecurityModal';
import { useState } from "react";
import { Form, Formik, Field } from "formik";
import { requestEmailChange, updateEmail, validatePasswordAPI } from '../../../../api/user';




/* Custome FormikField for the Email */
type Props = {
    label?: string;
    name: string;
    type?: string;
    as?: React.ElementType; // Use React.ElementType for more flexibility
    labelValue?: string;
    placeholder?: string; // Added placeholder prop
};

const FormikField: React.FC<Props> = ({ 
    name, 
    type = 'text', 
    as, 
    label, 
    labelValue, 
    placeholder // Accepting placeholder
}) => {
    return (
        <div className="flex flex-col">
            {label && (
                <label htmlFor={name} className="text-sm font-semibold text-coolGray">
                    {label}
                </label>
            )}
            <Field
                id={name}
                name={name}
                type={type}
                as={as} // This will allow you to specify a different element type
                placeholder={placeholder} // Added placeholder here
                style={{
                    background: "var(--Neutral-900, #131313)",
                    boxShadow: "none",
                }}
                className={`w-96 px-4 py-3 rounded-md border-[1px] border-transparent text-coolGray bg-darkGray hover:border-charcoalGray focus:border-[2px] focus:border-charcoalGray focus:outline-none ${
                    as && "resize-none"
                }`}
            />
            {/* Optional label value display */}
            {labelValue && (
                <span className="text-sm text-gray-500">{labelValue}</span>
            )}
        </div>
    );
};



const EmailSecurityComponent = () => {
    const [isEmailInputModalOpen, setIsEmailInputModalOpen] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [newEmail, setNewEmail] = useState<string>('');
    const [showVerificationModal, setShowVerificationModal] = useState(false);
    const [hasPasswordError, setHasPasswordError] = useState(false);
    const [hasVerificationError, setHasVerificationError] = useState(false);
    
    const initialValues = {
        email: "",
        verified: false
    };

    const openEmailInputModal = () => setIsEmailInputModalOpen(true);
    const closeEmailInputModal = () => setIsEmailInputModalOpen(false);
    
    const openConfirmationModal = () => {
        closeEmailInputModal();
        setIsConfirmationModalOpen(true);
    };
    const closeConfirmationModal = () => setIsConfirmationModalOpen(false);

    const handleFormSubmit = (values: any) => {
        if (values.email !== initialValues.email && isValidEmail(values.email)) {
            openEmailInputModal();
        }
    };

    const handlePasswordSubmit = (password: string) => {
        openConfirmationModal();
    };

    const handleConfirmation = () => {
        console.log("Email change confirmed");
        closeConfirmationModal();
    };

    const handleCodeVerification = async (code: string) => {
        try {
            await updateEmail(newEmail, parseInt(code, 10));
            setHasVerificationError(false);
            closeConfirmationModal();
        } catch (error: any) {
            setHasVerificationError(true);
            if (error.response?.status === 400) {
                setHasVerificationError(true);
            }
        }
    };

    const handleCancel = () => {
        closeConfirmationModal();
    };

    // Array of fields to map over for rendering inputs
    const formFields = [
        { name: "email", label: "Email", type: "email", placeholder: "e.g josh@example.com" }, // Added placeholder here
    ];

    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
    
    const handleEmailChange = (email: string) => {
        setNewEmail(email);
    };

    const handleEmailUpdate = (email: string) => {
        setNewEmail(email);
        setShowVerificationModal(true);
    };

    const handlePasswordVerification = async (inputPassword: string) => {
        try {
           const responsePassword = await validatePasswordAPI(inputPassword);
           if (responsePassword.data.results.isValid) {
            try {
                const response = await requestEmailChange(newEmail);
                setHasPasswordError(false);
                setIsEmailInputModalOpen(false);
                setIsConfirmationModalOpen(true);
                setHasVerificationError(false);
            } catch (error) {
                console.error('Error requesting email change:', error);
            }
        } else {
            setHasPasswordError(true);
            console.error("Incorrect password");
        }
        } catch (error) {
            console.error('Error validating password:', error);
        }
        
        
    };

    const handleCloseEmailModal = () => {
        setIsEmailInputModalOpen(false);
        setHasPasswordError(false);  // Reset error state when closing
    };
    

    return (
        <div className="px-3 flex flex-col">
            <div className="py-3 flex justify-between items-center">
                <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-semibold text-platinum">Email Address</h3>
                    <p className="text-sm font-normal text-coolGray">
                        The email associated with your account
                    </p>
                </div>
                <div className="flex flex-col items-end">
                    <h3 className="text-lg font-semibold text-[#666666]">serena@example.com</h3>
                    {initialValues.verified ? <p className="text-sm font-normal text-lightGreen">Verified</p> :
                        
                        <p className="text-sm font-normal text-rose-600">Unverified</p>
                    }
                </div>
            </div>
            <div className="py-3 flex flex-col">
                <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
                    {({ values, handleChange }) => (
                        <Form>
                            <div className="flex justify-between items-center">
                                <h2 className={`text-white py-2.5 text-base font-semibold`}>
                                    New Email
                                </h2>
                            </div>
                            {formFields.map((field) => {
                                const { name, label, placeholder } = field;
                                const labelValue = values[name];
                                return (
                                    <div
                                        key={name} // Use name as key
                                        className={`flex justify-between py-2.5 gap-2 rounded-lg ${values.email !== initialValues.email ? "text-white" : "text-coolGray"}`}
                                    >
                                        <FormikField
                                            {...{
                                                name,
                                                mode: "editView",
                                                placeholder, // Pass the placeholder
                                                onChange: (e) => {
                                                    handleChange(e);
                                                },
                                            }}
                                        />
                                        <button 
                                            type="submit" 
                                            className={` text-black ${(values.email !== initialValues.email && isValidEmail(values.email)) ? 'bg-[#9EFF00]' : 'bg-neutral-700'} px-4 py-2 rounded-full hover:bg-gray-300 transition-colors`}
                                            onClick={() => {
                                                if (values.email !== initialValues.email && isValidEmail(values.email)) {
                                                    setNewEmail(values.email);
                                                    handleEmailUpdate(values.email);
                                                }
                                            }}
                                        >
                                            {(values.email !== initialValues.email && isValidEmail(values.email)) ? 'Save Changes' : 'Edit Email'}        
                                        </button>
                                    </div>
                                );
                            })}
                        </Form>
                    )}
                </Formik>

                {isEmailInputModalOpen && (
                    <EmailInputModal
                        title="Confirm Password"
                        text="Please enter your password to confirm email change."
                        onSubmit={handlePasswordVerification}
                        onClose={handleCloseEmailModal}
                        hasError={hasPasswordError}
                    />
                )}

                {isConfirmationModalOpen && (
                    <EmailConfirmationModal
                        title="Verify Email"
                        text={`Enter the 6 digit code we sent to ${newEmail}`}
                        onConfirm={handleCodeVerification}
                        onCancel={handleCancel}
                        hasError={hasVerificationError}
                    />
                )}
            </div>
        </div>
    );
};

export default EmailSecurityComponent;
