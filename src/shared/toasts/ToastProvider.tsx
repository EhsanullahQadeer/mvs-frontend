import React, { useState, useRef } from "react";
import Toast from "./Toast";

type ToastData = {
  id: number;
  message?: string;
  state?: string;
  type?: "success" | "error" | "warning" | "info";
  position?: "top-left" | "top-right" | "top-center" | "bottom-left" | "bottom-right" | "bottom-center";
  duration?: number;
  permanent?: boolean;
  actionRemove?: boolean | undefined;
  actionFunction?: (params?: any) => void; //action to be called when e.g. "retry" or "undo" button is clicked
  params?: any;
  closeToast?: () => void;
};

const ToastContext = React.createContext<{ addToast: (toast: Omit<ToastData, "id">) => void } | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const timeoutRefs = useRef<{ [key: number]: NodeJS.Timeout }>({});
  const remainingTimeRefs = useRef<{ [key: number]: number }>({});

  const closeToast = (id: number) => {
    if (timeoutRefs.current[id]) {
      clearTimeout(timeoutRefs.current[id]);
      delete timeoutRefs.current[id];
    }
    delete remainingTimeRefs.current[id];
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToast = (toast: Omit<ToastData, "id">) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, ...toast }]);

    if (toast.permanent) {
      return;
    }

    const duration = toast.duration || 3000;
    const timeout = setTimeout(() => {
      closeToast(id);
    }, duration);

    timeoutRefs.current[id] = timeout;
    remainingTimeRefs.current[id] = duration;
  };

  const handleMouseEnter = (id: number) => {
    if (timeoutRefs.current[id]) {
      clearTimeout(timeoutRefs.current[id]);
      delete timeoutRefs.current[id];
    }
  };

  const handleMouseLeave = (id: number) => {
    if (toasts.find((toast) => toast.id === id)?.permanent) {
      return;
    }
    if (remainingTimeRefs.current[id]) {
      const timeout = setTimeout(() => {
        closeToast(id);
      }, remainingTimeRefs.current[id]);

      timeoutRefs.current[id] = timeout;
    }
  };

  const wrapActionFunction = (id: number, originalFunction?: (params?: any) => void) => {
    return (params?: any) => {
      if (originalFunction) {
        originalFunction(params);
      }
      closeToast(id);
    };
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="toast-container">
        {toasts.map((toast) => (
          <Toast 
            key={toast.id} 
            {...toast} 
            onClose={() => closeToast(toast.id)}
            onMouseEnter={() => handleMouseEnter(toast.id)}
            onMouseLeave={() => handleMouseLeave(toast.id)}
            actionFunction={wrapActionFunction(toast.id, toast.actionFunction)}
            params={toast.params}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
