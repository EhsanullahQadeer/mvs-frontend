/*************************************************************************
 * @file SecuritySettings.tsx
 * @author Ramiro Santos
 * @desc  Component for the SecuritySettings for the account setting page.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* LOCAL IMPORTS */
import React from "react";
import EmailSecurityComponent from "./components/EmailSecurityComponent";
import PasswordSecurityComponent from "./components/PasswordSecurityComponent";
import DeactivateSecrurityComponent from "./components/DeactivateSecrurityComponent";
import CurrentSessionSecurityComponent from "./components/CurrentSessionSecurityComponent";
// THIRD PARTY IMPORTS
const SecuritySettings: React.FC = () => {
  return (
    <>
      <h2 className="text-white px-3 py-4 text-xl font-semibold border-b border-eclipseGray">
        Security
      </h2>
      <EmailSecurityComponent/>
      <PasswordSecurityComponent/>
      <DeactivateSecrurityComponent/>
      {/* <CurrentSessionSecurityComponent/> */}
    </>
  );
};

export default SecuritySettings;
