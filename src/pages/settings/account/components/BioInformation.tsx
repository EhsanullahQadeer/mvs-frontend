//*************************************************************************
// @file BioInformation.tsx
// @author Ehsanullah Qadeer
// @desc component Bio-Information for account setting page.
//
// @copyright (c) 2024 MVSSIVE. All rights reserved.
//*************************************************************************/

/* LOCAL IMPORTS */
import React from 'react'
import Theme from 'theme'

// THIRD PARTY IMPORTS
import { useState } from 'react'

const BioInformation: React.FC = () => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    username: "Serena",
    bio: "This is a sample bio of the user Serena.",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <section>
      <div className='pt-6 py-2.5 border-b border-[#242424] w-full'>
        <div className="w-2/5 text-sm">
          <div className="flex flex-col items-start px-4 py-2.5 gap-2 text-white rounded-lg">
            <label className="block text-sm">Username:</label>
            <input
              style={{ background: "var(--Neutral-900, #131313)" }}
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              disabled={!isEditable}
              className="w-full px-4 py-3 rounded-md border-[1px] text-coolGray border-none bg-darkGray"
            />
          </div>

          {/* Bio */}
          <div className="flex flex-col items-start px-4 py-2.5 gap-2  text-white rounded-lg">
            <label className="block text-sm">Bio:</label>
            <textarea
              style={{ background: "var(--Neutral-900, #131313)" }}
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              disabled={!isEditable}
              className="w-full px-4 py-3 outline-none rounded-md border-[1px] text-coolGray border-none bg-darkGray resize-none"
            ></textarea>
          </div>

          {/* Edit / Save Changes Button */}
          <div className="flex px-4 pt-8 py-2.5 justify-start">
            {isEditable ? (
              <button
                onClick={() => setIsEditable(false)}
                className="whitespace-nowrap text-sm px-2 py-1 border-[1.5px] rounded-lg text-[#3D3D3D] border-[#2B2B2B] bg-[#161616]"
              >
                Save Changes
              </button>
            ) : (
              <button
              onClick={() => setIsEditable(true)}
              className=" flex justify-between items-center gap-1 whitespace-nowrap px-2 py-1 border-[1.5px] rounded-lg text-[#3D3D3D] border-[#2B2B2B] bg-[#161616]"
            >
              <span className='text-sm '>
              Edit
              </span>
              
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 16 17" fill="none">
            <path d="M8 13.8332H14H8Z" fill="#666666"/>
            <path d="M11 2.83316C11.2652 2.56794 11.6249 2.41895 12 2.41895C12.1857 2.41895 12.3696 2.45553 12.5412 2.5266C12.7128 2.59767 12.8687 2.70184 13 2.83316C13.1313 2.96448 13.2355 3.12038 13.3066 3.29196C13.3776 3.46354 13.4142 3.64744 13.4142 3.83316C13.4142 4.01888 13.3776 4.20277 13.3066 4.37435C13.2355 4.54594 13.1313 4.70184 13 4.83316L4.66667 13.1665L2 13.8332L2.66667 11.1665L11 2.83316Z" fill="#666666"/>
          </svg>
          </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default BioInformation