/*************************************************************************
 * @file Address.tsx
 * @author Ehsanullah Qadeer
 * @desc  component Address for account setting page.
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

/* LOCAL IMPORTS */
import React from 'react'

// THIRD PARTY IMPORTS
import  {useState}  from 'react'
// Define a TypeScript interface for props

const Address: React.FC  = () => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    country: "uk",
    city: "leeds",
    postalcode: "52100",
  });

  // Function to handle changes to the form fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Array of fields to map over for rendering inputs
  const formFields = [
    { name: "country", label: "Country", type: "text" },
    { name: "city", label: "City/State", type: "text" },
    { name: "postalcode", label: "Postal Code", type: "email" },
  ];

  return (
    <section  className=' px-4 mt-10 py-5 border-b border-t border-[#242424] w-full' >
        <div className='flex justify-between items-center' >
         <h2
           
            className={`text-white py-2.5 text-base font-semibold `}
          >
            Address
          </h2>
          <div className="flex px-4 pt-8 py-2.5 justify-start">
            {isEditable ? (
              <button
                onClick={() => setIsEditable(false)}
                className="whitespace-nowrap text-sm px-2 py-1 border-[1.5px] rounded-lg text-[#3D3D3D] border-[#2B2B2B] bg-[#161616]"
              >
                Save 
              </button>
            ) : (
              <button
                onClick={() => setIsEditable(true)}
                className=" flex justify-between items-center gap-1 whitespace-nowrap px-2 py-1 border-[1.5px] rounded-lg text-[#3D3D3D] border-none bg-[#161616]"
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
      <div>
        <div className=" w-4/5 grid grid-cols-2 py-3 text-sm">
        {formFields.map((field) => (
            <div key={field.name} className={`flex flex-col font-semibold w-4/5  items-start  py-2.5 gap-2  rounded-lg ${isEditable ? '  text-white' : 'bg-[#0F0F0F] p-0 text-coolGray  '  }`}>
              <label className="block text-sm">{field.label}:</label>
              <input
                // style={{ background: "var(--Neutral-900, #131313)" }}
                type={field.type}
                name={field.name}
                value={formData[field.name as keyof typeof formData]} 
                onChange={handleChange}
                disabled={!isEditable}
                className={`w-full  rounded-md border-[1px] text-coolGray border-none  ${isEditable ? ' px-4 py-3 text-coolGray   bg-eerieBlack' : 'text-white  bg-[#0F0F0F] p-0  '  }`}
              />
            </div>
          ))}

          
        </div>
      </div>
    </section>
  );
}

export default Address
