import React from "react";
import avatarImg from "../../../../../assets/img/avatar.svg";

// Define the ButtonProps type to handle all possible props
interface ButtonProps {
  thumbnail?: string; // Custom styles passed from the parent component
}

const thumbnail: React.FC<ButtonProps> = ({
  thumbnail = "", // Default to an empty string if no thumbnail is passed
}) => {
  return (
    <div className="w-12 h-12 relative rounded-full">
      {thumbnail ? (
        <img
          src={thumbnail}
          className="w-full h-full object-cover rounded-full"
          alt="User"
        />
      ) : (
        <img
          src={avatarImg}
          className="w-full h-full object-cover rounded-full"
          alt="User"
        />
      )}
    </div>
  );
};

export default thumbnail;