import React, { useEffect } from "react";
import "./styles/toast.css";
import { toastStates } from "./types/toast-types";


type ToastProps = {
  state?: string;
  message?: string;
  type?: string;
  position?: "top-left" | "top-right" | "top-center" | "bottom-left" | "bottom-right" | "bottom-center";
  duration?: number;
  onClose?: () => void;
};

const Toast: React.FC<ToastProps> = ({
  state,
  message,
  type,
  position = "top-left", //default position
  duration = 3000,
  onClose
}) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const toastState = state ? toastStates[state] : null;

  return (
    <div className={`toast ${type ? `toast-${type}` : `toast-${toastState?.type}`} toast-${position}`}>
      {toastState ? toastState.element : message}
    </div>
  );
};

export default Toast;
