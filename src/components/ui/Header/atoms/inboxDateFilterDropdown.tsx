import React, { useState } from 'react';

const options = [
  "Any date",
  "More than a week",
  "More than a month",
  "More than 6 months",
  "More than a year"
];

const InboxDateFilterDropdown: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>(options[0]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false); // Close the dropdown after selection
  };

  return (
    <div className="relative">
      <div
        className="flex items-center justify-between py-2 px-3 rounded-full bg-transparent border border-[#3D3D3D] cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-[#848484]">{selectedOption}</span>
        <span className="ml-2">
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5 5L9 1" stroke="#848484" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      </div>
      {isOpen && (
        <div className="absolute h-[185px] w-[173px] z-10 mt-1 w-full bg-[#1c1c1c] border border-[#202327] rounded-md">
          <div className="mt-[10px]"></div>
          {options.map((option) => (
            <div
              key={option}
              className={`mx-[10px] text-[12px] py-2 pl-[6px] cursor-pointer flex rounded-md text-[#848484] hover:bg-[#0f0f0f]`}
              onClick={() => handleOptionClick(option)}
            >
              {option === selectedOption ? 
              <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.3307 4.5L5.9974 11.8333L2.66406 8.5" stroke="#848484" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg> : 
              <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.3307 4.5L5.9974 11.8333L2.66406 8.5" stroke="transparent" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              }
              <div className={`flex items-center pl-[5px]`}>
                {option}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InboxDateFilterDropdown;