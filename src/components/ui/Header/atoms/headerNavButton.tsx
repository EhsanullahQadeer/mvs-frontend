import React from "react";

// Define the ButtonProps type to handle all possible props
interface ButtonProps {
  children: React.ReactNode; // Button content (text, icon, etc.)
  onClick?: () => void; // Optional click handler
  className?: string; // Custom styles passed from the parent component
  disabled?: boolean; // Optional disabled state
  type?: "button" | "submit" | "reset"; // Button type
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = "", // Default to an empty string if no className is passed
  disabled = false,
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-3 py-2 rounded-full font-meduim text-center border border-transparent ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
