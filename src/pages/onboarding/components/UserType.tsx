/*************************************************************************
 * @file UserType.tsx
 * @author Ehsanullah Qadeer
 * @desc  This is the component for user type.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

import { useEffect, useState } from "react";
import { userTypes } from "../sample-data/sampleData";

type Props = {
  markSectionAsCompleted: () => void;
};

const UserType = (props: Props) => {
  const { markSectionAsCompleted } = props;
  const initialValues = {
    primaryRole: "",
    subRole: "",
  };

  const [primaryRole, setPrimaryRole] = useState<{
    index: number;
    value: string;
  } | null>(null);
  const [subRole, setSubRole] = useState<{
    index: number;
    value: string;
  } | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const primaryRoleIndex = userTypes.findIndex(
      (type) => type.value === initialValues.primaryRole
    );
    const subRoleIndex = userTypes.findIndex(
      (type) => type.value === initialValues.subRole
    );

    if (primaryRoleIndex !== -1) {
      setPrimaryRole({
        index: primaryRoleIndex,
        value: initialValues.primaryRole,
      });
    }

    if (subRoleIndex !== -1) {
      setSubRole({
        index: subRoleIndex,
        value: initialValues.subRole,
      });
    }
  }, []);

  const handleTypeSelect = (idx: number, value: string) => {
    if (primaryRole?.index === idx) {
      setPrimaryRole(null);
    } else if (subRole?.index === idx) {
      setSubRole(null);
    } else if (!primaryRole) {
      setPrimaryRole({ index: idx, value });
    } else if (!subRole) {
      setSubRole({ index: idx, value });
    }
  };

  const handleSaveChanges = () => {
    if (!(primaryRole && subRole)) {
      setError(true);
      return;
    }

    setError(false);
    const submitValues = {
      "primary-label": primaryRole.value,
      "sub-label": subRole.value,
    };

    console.log("submitValues ", submitValues);
    markSectionAsCompleted();
  };

  return (
    <div>
      <p className="text-sm font-normal text-mediumGray">
        Before we get started, please let us know which type of user you are:
        Artist, Songwriter, Music Producer, Mixing Engineer, Mastering Engineer,
        or Composer/Musician. You must select two options: one main role and one
        sub-role that best describes your work.
      </p>

      {error && (
        <div className="text-xs font-semibold text-darkRed">
          Must select two options!
        </div>
      )}

      <div className="flex flex-wrap gap-3 mt-10">
        {userTypes.map((type, idx) => {
          const { label, value, iconSrc } = type;

          const isPrimary = primaryRole?.index === idx;
          const isSub = subRole?.index === idx;

          const isSelected = isPrimary || isSub;
          return (
            <div
              key={idx + label}
              onClick={() => handleTypeSelect(idx, value)}
              className={`w-[220px] h-40 relative rounded-lg flex flex-col justify-center items-center gap-2.5 cursor-pointer ${
                isSelected
                  ? "border-2 border-[#57AEFF] bg-[#202327]"
                  : "border border-eclipseGray bg-jetBlack"
              }`}
            >
              <div
                className={`w-[52px] h-[52px] rounded-lg flex justify-center items-center border border-eclipseGray ${
                  isSelected ? "bg-darkGray" : "bg-jetBlack"
                }`}
              >
                <img src={iconSrc} alt="icons" className="w-8 h-8" />
              </div>
              <span
                className={`text-base font-semibold ${
                  isSelected ? "text-white" : "text-mediumGray"
                }`}
              >
                {label}
              </span>

              <div
                className={`absolute top-3.5 right-3.5 text-white font-semibold w-6 h-6 rounded-xl flex justify-center items-center ${
                  isSelected
                    ? "border border-[#CCCCCC] bg-[#0185FF]"
                    : "border-[1.5px] border-eclipseGray"
                }`}
              >
                {isSelected && isPrimary ? "1" : isSub ? "2" : ""}
              </div>
            </div>
          );
        })}

        <div className="mt-[60px] mr-2.5 w-full flex justify-end">
          <div
            onClick={handleSaveChanges}
            className="bg-limeGreen py-3 px-4 rounded-[60px] text-sm font-semibold text-jetBlack cursor-pointer"
          >
            Save Changes
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserType;
