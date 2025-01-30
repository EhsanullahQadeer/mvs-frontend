import React, { useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';

interface CreditDetailDropDownProps {
  label: string; // Label for the dropdown
  options: string[]; // Options for the dropdown
  onChange: (value: string) => void; // Callback for value change
  selectedValue?: string;
  showText: string;
}

const CreditDetailDropDown: React.FC<CreditDetailDropDownProps> = ({
  label,
  options,
  onChange,
  selectedValue,
  showText
}) => {
  const [isOpen, setIsOpen] = useState(false); // To toggle the dropdown visibility
  const [currentValue, setCurrentValue] = useState(selectedValue || '');

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleOptionClick = (option: string) => {
    setCurrentValue(option);
    onChange(option);
    setIsOpen(false); // Close dropdown after selecting
  };

  return (
    <div className="relative w-full flex-col gap-2 flex ">
      {/* Label */}
      <label className="text-[14px]  text-white ">{label}</label>

      {/* Custom Dropdown */}
      <div
        className="relative w-full cursor-pointer"
        onClick={toggleDropdown}
      >
        <div className="flex text-[14px] w-[237px] gap-8 items-center justify-between bg-[#0F0F0F] border border-[#1C1C1C] text-[#3D3D3D] rounded-md p-2">
          <span className={currentValue ? 'text-white' : 'text-[#888]'}>
            {currentValue || showText}
          </span>
          <MdKeyboardArrowDown />

        </div>

        {/* Dropdown options */}
        {isOpen && (
          <div className="absolute left-0 right-0 mt-2 bg-[#0F0F0F] border border-[#1C1C1C] rounded-md shadow-lg z-10">
            {options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleOptionClick(option)}
                className="p-2 text-sm text-[#DDD] hover:bg-[#333] cursor-pointer"
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreditDetailDropDown;
