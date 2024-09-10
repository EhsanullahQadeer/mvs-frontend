//*************************************************************************
// @file AccountSetting.tsx
// @author Ehsanullah Qadeer
// @desc component AccountSetting for account setting page.
//
// @copyright (c) 2024 MVSSIVE. All rights reserved.
//*************************************************************************/

/* LOCAL IMPORTS */
import React from "react";
import Theme from "theme";
import BioInformation from "./components/BioInformation";
import AccountInformation from "./components/AccountInformation";

// THIRD PARTY IMPORTS
import Address from "./components/Address";
import RolesGenres from "./components/RolesGenres";

const AccountSetting: React.FC = () => {
  return (
    <Theme>
      <h2
        style={{
          borderBottom: "1px solid var(--Neutral-700, #242424)",
        }}
        className="text-gainsBoro px-3 py-3 text-base font-semibold"
      >
        Notification
      </h2>
      <BioInformation />
      <AccountInformation />
      <Address />
      <RolesGenres />
    </Theme>
  );
};

export default AccountSetting;
