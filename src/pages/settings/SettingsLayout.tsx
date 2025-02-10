/*************************************************************************
 * @file SettingsLayout.tsx
 * @author Ehsanullah Qadeer
 * @desc  This is layout for all the setting tabs.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { setBreadcrumbs } from "redux/actions/breadcrumb.actions";
import Theme from "theme";

const SettingsLayout = () => {
  const tabs = [
    { name: "Account", path: "account/1" },
    { name: "Content Management", path: "content-management/1" },
    { name: "Notifications", path: "notifications/1" },
    { name: "Security", path: "security/1" },
    { name: "Billing", path: "billing/1" },
    { name: "Privacy", path: "privacy/1" },
    { name: "Monetization", path: "monetization/1" },
    { name: "Memberships & Connects", path: "memberships/1" },
  ];

  // Set breadcrumbs (nav bar) for settings page
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setBreadcrumbs([
      { name: 'Settings', path: '/settings' },
    ]));
  }, [dispatch]);

  return (
    <Theme>
      <div>
        <div className="flex gap-3 px-3 py-6 border-b border-eclipseGray">
          {tabs.map((tab, index) => (
            <NavLink
              key={index}
              to={`/settings/${tab.path}`}
              className={({ isActive }) =>
                `py-2 px-3 border rounded-[30px] text-xs font-semibold ${
                  isActive
                    ? "text-eerieBlack border-[#7ECC00] bg-limeGreen shadow-custom-inset"
                    : "border-gunMetal bg-richBlack text-charcoalGray"
                }`
              }
            >
              {tab.name}
            </NavLink>
          ))}
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </Theme>
  );
};

export default SettingsLayout;
