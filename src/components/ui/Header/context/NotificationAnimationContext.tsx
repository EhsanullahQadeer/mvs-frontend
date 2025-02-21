import React, { createContext, useContext, useState } from 'react';

interface NotificationAnimationContextType {
  triggerAnimation: () => void;
  isAnimating: boolean;
}

const NotificationAnimationContext = createContext<NotificationAnimationContextType | undefined>(undefined);

export const NotificationAnimationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const triggerAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  return (
    <NotificationAnimationContext.Provider value={{ triggerAnimation, isAnimating }}>
      {children}
    </NotificationAnimationContext.Provider>
  );
};

export const useNotificationAnimation = () => {
  const context = useContext(NotificationAnimationContext);
  if (context === undefined) {
    throw new Error('useNotificationAnimation must be used within a NotificationAnimationProvider');
  }
  return context;
}; 