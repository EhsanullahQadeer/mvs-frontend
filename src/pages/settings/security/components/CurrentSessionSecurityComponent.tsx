/*************************************************************************
 * @file CurrentSessionSecurityComponent.tsx
 * @author Ramiro Santos
 * @desc  Component for the Current Sessions security page. 
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* LOCAL IMPORTS */
import { ReactComponent as EditIcon } from "../../../../assets/icons/editPencilIcon.svg";

// THIRD PARTY IMPORTS
import { useState } from "react";
import { Form, Formik, Field } from "formik";



const CurrentSessionSecurityComponent = () => {


    return (
        <div className="px-3 flex flex-col">
            <div className="py-3 flex justify-between items-center">
                <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-semibold text-platinum">Current sessions</h3>
                    <p className="text-sm font-normal text-coolGray">
                    These devices are currently signed in to this account.
                    </p>
                </div>
                <div className="flex flex-col items-end">
                <button 
                                type="submit" 
                                className="text-[#615e5e]  px-4 py-2 rounded-full hover:bg-gray-300 transition-colors" // Button styles
                            >
                                Deactivate       
                            </button>
                </div>
              </div>
          </div>
    );
};

export default CurrentSessionSecurityComponent;
