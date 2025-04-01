import React, { useState } from "react";
import Toast from "./Toast";

type ToastData = {
  id: number;
  message?: string;
  state?: string;
  type?: "success" | "error" | "warning";
  position?: "top-left" | "top-right" | "top-center" | "bottom-left" | "bottom-right" | "bottom-center";
  duration?: number;
};

const ToastContext = React.createContext<{ addToast: (toast: Omit<ToastData, "id">) => void } | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  
  const addToast = (toast: Omit<ToastData, "id">) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, ...toast }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, toast.duration || 3000);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="toast-container">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))} />
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
