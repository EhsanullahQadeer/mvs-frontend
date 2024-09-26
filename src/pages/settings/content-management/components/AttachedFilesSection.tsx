/*************************************************************************
 * @file AttachedFilesSection.tsx
 * @author Ehsanullah Qadeer
 * @desc  This is the component for showing attached files.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/
import  { useState } from "react";
import AttachedFilesTable from "./AttachedFilesTable";

type Props = {};

const tableTabs = [
  { label: "View all", value: "viewAll", func: () => {} },
  { label: "Your files", value: "yourFiles", func: () => {} },
  { label: "Shared files", value: "sharedFiles", func: () => {} },
];

const AttachedFilesSection = (props: Props) => {
  const [selectedTab, setSelectedTab] = useState("viewAll");

  const handleTabClick = (value: string, clickFunc: () => void) => {
    setSelectedTab(value);
    clickFunc();
  };

  return (
    <div>
      <div className="py-3 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-platinum">Attached files</h3>
        <p className="text-sm font-normal text-coolGray">
          Files Associated with This Profile
        </p>
      </div>

      <div className="my-2 p-4 bg-darkGray rounded-lg flex items-center">
        {tableTabs.map((tab, idx) => {
          const { label, value, func } = tab;
          return (
            <button
              key={label + idx}
              onClick={() => handleTabClick(value, func)}
              className={`py-3 px-4 text-xs font-semibold flex items-center justify-center border border-eclipseGray ${
                selectedTab === value
                  ? "text-[#B2B2B2] bg-eerieBlack"
                  : "text-charcoalGray bg-jetBlack"
              } ${idx === 0 && "rounded-l-lg border-r-0"} ${
                idx === 2 && "rounded-r-lg border-l-0"
              } transition duration-300`}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div>
        <AttachedFilesTable />
      </div>
    </div>
  );
};

export default AttachedFilesSection;
