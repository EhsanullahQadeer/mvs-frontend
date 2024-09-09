/*************************************************************************
 * @file AccountSetting.tsx
 * @author Ehsanullah Qadeer
 * @desc  component AccountSetting for account setting page.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* LOCAL IMPORTS */
import React from 'react'

// THIRD PARTY IMPORTS
import  {useState}  from 'react'

const RolesGenres = () => {
  const [isEditable, setIsEditable] = useState(false);
  const handleEditClick = () => {
    setIsEditable(true);
  };
  const handleSaveClick = () => {
    setIsEditable(false);
  };
  return (
    <>
            <h2
            style={{
              borderBottom: "1px solid var(--Neutral-700, #242424)",
            }}
            className="text-gainsBoro px-3 py-3 text-base font-semibold"
          >
            Account Information
          </h2>
     
      
    </>
  )
}

export default RolesGenres
