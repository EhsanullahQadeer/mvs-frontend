import React from "react";
import Button from "../atoms/headerNavButton";
import { useLocation } from "react-router-dom";

interface HeaderNavMenuProps {
  // You can define an array of menu items with names and click actions
  menuItems: { label: string; onClick: () => void; icon?: React.ReactNode; pathname: string }[];
}

const HeaderNavMenu: React.FC<HeaderNavMenuProps> = ({ menuItems }) => {
  const { pathname } = useLocation();

  const handleButtonClick = (index: number, onClick: () => void) => {
    onClick(); // Call the onClick for the button (navigation action)
  };

  return (
    <div className="border-2 border-[#1c1c1c] p-2 ml-12 rounded-3xl flex justify-between items-center h-16">
      {menuItems.map((item, index) => (
        <Button
          key={index}
          onClick={() => handleButtonClick(index, item.onClick)}
          className={`flex items-center space-x-2 mx-1 
            ${pathname.startsWith(item.pathname)
              ? 'text-black bg-[#9dff00]'
              : 'text-dimGray bg-transparent hover:border-[#1c1c1c]'
            }`}
        >
          {item.icon} {/* Display the icon */}
          <span>{item.label}</span> {/* Display the label */}
        </Button>
      ))}
    </div>
  );
};

export default HeaderNavMenu;