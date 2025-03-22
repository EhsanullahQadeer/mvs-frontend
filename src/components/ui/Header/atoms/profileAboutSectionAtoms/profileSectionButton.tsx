import React from 'react';

interface ProfileSectionButtonProps {
  tabName?: string;
  icon?: React.ReactNode; // Optional icon prop
  onClick: () => void;
  width?: string; // Expecting a Tailwind CSS width class
  disabled?: boolean;
}

const ProfileSectionButton: React.FC<ProfileSectionButtonProps> = ({ tabName, icon, width = 'w-full', onClick, disabled }) => {
  return (
    <div className={`bg-transparent text-[12px] h-[33px] flex items-center justify-center 
        text-[#B2B2B2] border border-[#666666] rounded-md ${width} ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
    onClick={ disabled? null : onClick}>
      {icon && <span className={`${tabName ? 'mr-1' : ''}`}>{icon}</span>} {/* Render icon if provided */}
      {tabName && <span>{tabName}</span>} {/* Only render tabName if it exists */}
    </div>
  );
};

export default ProfileSectionButton;