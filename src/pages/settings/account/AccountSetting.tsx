/*************************************************************************
 * @file Account-Information.tsx
 * @author Ehsanullah Qadeer
 * @desc  component AccountSetting for account setting page.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* LOCAL IMPORTS */
import React, { useEffect, useState } from "react";
import BioInformation from "./components/BioInformation";
import AccountInformation from "./components/AccountInformation";
import { addBreadcrumb, clearBreadcrumbs, popBreadcrumb, setBreadcrumbs } from "redux/actions/breadcrumb.actions";

// THIRD PARTY IMPORTS
import Address from "./components/Address";
import RolesGenres from "./components/RolesGenres";
import { useDispatch } from "react-redux";
import { currentUserAPI } from "api/auth";

const AccountSetting: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setBreadcrumbs([
        { name: 'Settings', path: '/settings' },
        { name: 'Account', path: '/settings/account' }
      ]));
      return () => {
        dispatch(popBreadcrumb());
      }; 
  }, [dispatch]);


  const [user, setUser] = useState<any>({} as any);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await currentUserAPI();
        setUser(res.data);
        console.log("user ", res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, []);

  
  return (
    <>
      <h2 className="text-white px-3 py-4 text-xl font-semibold border-b border-eclipseGray">
        Account Settings
      </h2>
      <BioInformation user={user} setUser={setUser} />
      <AccountInformation user={user} setUser={setUser} />
      <Address user={user} setUser={setUser} />
      <RolesGenres user={user} setUser={setUser} />
    </>
  );
};

export default AccountSetting;
