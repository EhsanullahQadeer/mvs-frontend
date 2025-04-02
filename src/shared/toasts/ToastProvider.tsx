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
  params?: any;
};

const ToastContext = React.createContext<{ addToast: (toast: Omit<ToastData, "id">) => void } | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const timeoutRefs = useRef<{ [key: number]: NodeJS.Timeout }>({});
  const remainingTimeRefs = useRef<{ [key: number]: number }>({});

  const addToast = (toast: Omit<ToastData, "id">) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, ...toast }]);

    if (toast.permanent) {
      return;
    }

    const duration = toast.duration || 3000;
    const timeout = setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
      delete timeoutRefs.current[id];
      delete remainingTimeRefs.current[id];
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
        setToasts((prev) => prev.filter((t) => t.id !== id));
        delete timeoutRefs.current[id];
        delete remainingTimeRefs.current[id];
      }, remainingTimeRefs.current[id]);

      timeoutRefs.current[id] = timeout;
    }
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="toast-container">
        {toasts.map((toast) => (
          <Toast 
            key={toast.id} 
            {...toast} 
            onClose={() => {
              if (timeoutRefs.current[toast.id]) {
                clearTimeout(timeoutRefs.current[toast.id]);
                delete timeoutRefs.current[toast.id];
              }
              delete remainingTimeRefs.current[toast.id];
              setToasts((prev) => prev.filter((t) => t.id !== toast.id));
            }}
            onMouseEnter={() => handleMouseEnter(toast.id)}
            onMouseLeave={() => handleMouseLeave(toast.id)}
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
