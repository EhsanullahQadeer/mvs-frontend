import React from "react";
import Avatar from "react-avatar";
import { loadAsset } from "utils/dateUtils";

// Define the ButtonProps type to handle all possible props
interface ButtonProps {
  professionalName?: string;
  thumbnail?: string; // Custom styles passed from the parent component
  size?: string;
  round?: boolean;
  userId?: number;
}

// Define an array of gradient colors
const gradientColors = [
  'linear-gradient(to bottom, #8F8B81, #343434)', // Gradient 1
  'linear-gradient(to bottom, #FF94AE, #995968)', // Gradient 2
  'linear-gradient(to bottom, #FF827A, #994E49)', // Gradient 3
  'linear-gradient(to bottom, #FFA032, #99601E)', // Gradient 4
  'linear-gradient(to bottom, #FFCC47, #997A2B)', // Gradient 5
  'linear-gradient(to bottom, #6BDD7B, #3A7742)', // Gradient 6
  'linear-gradient(to bottom, #71CFFA, #437B94)', // Gradient 7
  'linear-gradient(to bottom, #A78EF8, #625492)', // Gradient 8
];

// Function to get gradient based on user ID
const getGradientByUserId = (userId: number): string => {
  const index = userId % gradientColors.length; // Calculate index based on modulo
  return gradientColors[index]; // Return the corresponding gradient
};

const Thumbnail: React.FC<ButtonProps> = ({
  thumbnail = "", // Default to an empty string if no thumbnail is passed
  professionalName = "",
  size = "30",
  round = true,
  userId = 0,
}) => {

  const gradient = getGradientByUserId(userId);

  return (
      <Avatar
        name={professionalName}
        src={loadAsset(thumbnail)}
        size={size}
        round={round}
        color={"transparent"}
        className={`shrink-0 ${round ? '' : 'rounded-md'}`}
        style={{
          background: gradient,
          width: Number(size),
          height: Number(size),
          color: '#fff',
        }}
      />
  );
};

export default Thumbnail;