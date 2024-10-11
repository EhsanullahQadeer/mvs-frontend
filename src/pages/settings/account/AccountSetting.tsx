/*************************************************************************
 * @file Account-Information.tsx
 * @author Ehsanullah Qadeer
 * @desc  component AccountSetting for account setting page.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* LOCAL IMPORTS */
import React from "react";
import BioInformation from "./components/BioInformation";
import AccountInformation from "./components/AccountInformation";

// THIRD PARTY IMPORTS
import Address from "./components/Address";
import RolesGenres from "./components/RolesGenres";

const AccountSetting: React.FC = () => {
  return (
    <>
      <h2 className="text-white px-3 py-4 text-xl font-semibold border-b border-eclipseGray">
        Notification
      </h2>
      <BioInformation />
      <AccountInformation />
      <Address />
      <RolesGenres />
    </>
  );
};

export default AccountSetting;
