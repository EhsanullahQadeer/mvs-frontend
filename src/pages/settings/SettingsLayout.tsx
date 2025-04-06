/*************************************************************************
 * @file SettingsLayout.tsx
 * @author Ehsanullah Qadeer
 * @desc  This is layout for all the setting tabs.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

import Theme from "theme";
import { useEffect, useState } from "react";
import InboxTab from "components/ui/Header/atoms/InboxTab";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const SettingsLayout = () => {

  type SettingsTabType = 'account' | 'security' | 'content-management' | 'notifications' | 'billing' | 'privacy' | 'monetization' | 'memberships' | '';

  const tabs = [
    { name: "Account", value: "account" },
    { name: "Security", value: "security" },
    { name: "Content Management", value: "content-management" },
    { name: "Notifications", value: "notifications" },
    { name: "Billing", value: "billing" },
    // { name: "Privacy", value: "privacy" },
    // { name: "Monetization", value: "monetization" },
    { name: "Memberships & Connects", value: "memberships" },
  ];

  const navigate = useNavigate();
  const location = useLocation();
  let currentPath = location.pathname.split("/").pop();

  const [currentTab, setCurrentTab] = useState<SettingsTabType>(currentPath as SettingsTabType || "account");

  const handleSettingsTabClick = (tab: SettingsTabType) => {
    setCurrentTab(tab);
    navigate(`/settings/${tab}`);
  }

  useEffect(() => {
    currentPath = location.pathname.split("/").pop();
    setCurrentTab(currentPath as SettingsTabType);
  }, [location]);

  return (
    <Theme>
      <div>
        <div className="flex items-center w-full border-b border-eerieBlack">
          {tabs.map((tab, index) => (
            <InboxTab key={index} tabName={tab.name} currentTab={currentTab} tabValue={tab.value} onClick={() => {handleSettingsTabClick(tab.value as SettingsTabType)}} classname={"min-w-[140px] text-[12px]"}/>
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