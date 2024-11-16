/*************************************************************************
 * @file SecuritySettings.tsx
 * @author Ramiro Santos
 * @desc  Component for the SecuritySettings for the account setting page.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* LOCAL IMPORTS */
import React, { useEffect } from "react";
import EmailSecurityComponent from "./components/EmailSecurityComponent";
import PasswordSecurityComponent from "./components/PasswordSecurityComponent";
import DeactivateSecrurityComponent from "./components/DeactivateSecrurityComponent";
import CurrentSessionSecurityComponent from "./components/CurrentSessionSecurityComponent";
import { useDispatch } from "react-redux";
import { popBreadcrumb, setBreadcrumbs } from "redux/actions/breadcrumb.actions";

const SecuritySettings: React.FC = () => {
    // Set breadcrumbs (nav bar) for account setting page
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(
        setBreadcrumbs([
          { name: 'Settings', path: '/settings' },
          { name: 'Security', path: '/settings/security' }
        ]));
        return () => {
          // Pop current breadcrumb on unmount
          dispatch(popBreadcrumb());
        }; 
    }, [dispatch]);
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
