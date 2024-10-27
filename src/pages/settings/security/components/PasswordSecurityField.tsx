/*************************************************************************
 * @file DeactivateSecrurityComponent.tsx
 * @author Ramiro Santos
 * @desc  Component for the Deactivation security page. 
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

// THIRD PARTY IMPORTS
import React, { useState } from 'react';
import { Field } from 'formik';

type PasswordFieldProps = {
    name: string;
    placeholder?: string;
    mode?: boolean; // Add mode as a boolean prop
};

const PasswordField: React.FC<PasswordFieldProps> = ({ name, placeholder, mode }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [showError, setError] = useState(false);
    return (
        <div className={`flex gap-2 mb-[15px] ${mode ? 'border-rose-600' : 'focus-within:border-[#ACD7FF]'}  border border-solid border-[#131313] justify-between p-2 mt-3 text-xl font-medium text-blue-200 whitespace-nowrap rounded-lg bg-[#131313]`}>
            <Field
                type={showPassword ? 'text' : 'password'}
                name={name}
                placeholder={placeholder}
                autoComplete="new-password"
                className="bg-transparent outline-none text-blue-200 border-none w-[250px] focus:ring-0"
            />
            <img
                loading="lazy"
                src={`https://assets.mvssive.net/${showPassword ? 'show' : 'hide'}-password.png`}
                alt=""
                className="cursor-pointer shrink-0 my-auto w-5 aspect-[1.11]"
                onClick={() => setShowPassword(!showPassword)}
            />
        </div>
    );
};

export default PasswordField;
