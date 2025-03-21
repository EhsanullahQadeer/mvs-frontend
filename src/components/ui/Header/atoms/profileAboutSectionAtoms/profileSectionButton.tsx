import React from 'react';

interface ProfileSectionButtonProps {
  tabName?: string;
  icon?: React.ReactNode; // Optional icon prop
  onClick: () => void;
  width?: string; // Expecting a Tailwind CSS width class
}

const ProfileSectionButton: React.FC<ProfileSectionButtonProps> = ({ tabName, icon, width = 'w-full', onClick }) => {
  
  return (
    <div className={`bg-transparent text-[12px] cursor-pointer h-[33px] flex items-center justify-center 
        text-[#B2B2B2] border border-[#666666] rounded-md ${width}`}
    onClick={onClick}>
      {icon && <span className={`${tabName ? 'mr-1' : ''}`}>{icon}</span>} {/* Render icon if provided */}
      {tabName && <span>{tabName}</span>} {/* Only render tabName if it exists */}
    </div>
  );
};

export default ProfileSectionButton;