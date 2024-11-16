/*************************************************************************
 * @file Account-Information.tsx
 * @author Ehsanullah Qadeer
 * @desc  component AccountSetting for account setting page.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* LOCAL IMPORTS */
import React, { useEffect } from "react";
import BioInformation from "./components/BioInformation";
import AccountInformation from "./components/AccountInformation";
import { addBreadcrumb, clearBreadcrumbs, popBreadcrumb, setBreadcrumbs } from "redux/actions/breadcrumb.actions";

// THIRD PARTY IMPORTS
import Address from "./components/Address";
import RolesGenres from "./components/RolesGenres";
import { useDispatch } from "react-redux";

const AccountSetting: React.FC = () => {
  // Set breadcrumbs (nav bar) for account setting page
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        { name: 'Settings', path: '/settings' },
        { name: 'Account', path: '/settings/account' }
      ]));
      return () => {
        // Pop current breadcrumb on unmount
        dispatch(popBreadcrumb());
      }; 
  }, [dispatch]);

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
