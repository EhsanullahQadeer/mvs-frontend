/*************************************************************************
 * @file SettingsLayout.tsx
 * @author Ehsanullah Qadeer
 * @desc  This is layout for all the setting tabs.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

import { NavLink, Outlet } from "react-router-dom";
import Theme from "theme";

const SettingsLayout = () => {
  const tabs = [
    { name: "Account", path: "account/1" },
    { name: "Content Management", path: "content-management/1" },
    // { name: "Notifications", path: "notifications/1" },
    // { name: "Billing", path: "billing/1" },
    // { name: "Privacy", path: "privacy/1" },
    // { name: "Monetization", path: "monetization/1" },
  ];

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
