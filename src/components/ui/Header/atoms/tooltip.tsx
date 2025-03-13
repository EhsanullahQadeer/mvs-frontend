// src/components/Tooltip.tsx
import React, { useState } from 'react';

const Tooltip = ({ children, text }: { children: React.ReactNode; text: string }) => {
  const [visible, setVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  // Show the tooltip when the children are hovered
  const handleMouseEnter = () => {
    setVisible(true);
    setFadeOut(false); // Reset fade out state
    // Set a timer to hide the tooltip after 2 seconds
    const timer = setTimeout(() => {
      setFadeOut(true); // Start fade out
      // Set another timer to hide the tooltip after fade out
      const hideTimer = setTimeout(() => {
        setVisible(false);
      }, 300); // Match this duration with the CSS transition duration

      return () => clearTimeout(hideTimer);
    }, 1500); // Show for 2 seconds

    return () => clearTimeout(timer);
  };

  // Show the tooltip when the children are hovered
  const handleMouseLeave = () => {
    setVisible(false)
  };

  return (
    <div className="relative group" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      {visible && (
        <div
          className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max p-1 text-sm text-white bg-black rounded transition-opacity duration-300 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;