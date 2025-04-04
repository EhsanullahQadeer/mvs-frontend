import React from "react";
import "./styles/toast.css";
import { toastStates } from "./types/toast-types";

type ToastProps = {
  state?: string;
  message?: string;
  type?: string;
  position?: "top-left" | "top-right" | "top-center" | "bottom-left" | "bottom-right" | "bottom-center";
  duration?: number;
  permanent?: boolean;
  onClose?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  actionFunction?: (params?: any) => void;
  params?: any;
};

const Toast: React.FC<ToastProps> = ({
  state,
  message,
  type,
  position = "top-left", //default position
  duration = 3000,
  permanent = false,
  onClose,
  onMouseEnter,
  onMouseLeave,
  actionFunction,
  params
}) => {
  const toastState = state ? toastStates[state] : null;

  return (
    <div
      className={`toast ${type ? `toast-${type}` : `toast-${toastState?.type}`} toast-${position}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="toast-content">
        {toastState ? React.cloneElement(toastState.element(params) as React.ReactElement, { onClose, actionFunction }) : message}
      </div>
      <button
        className="toast-close"
        onClick={onClose}
        aria-label="Close toast"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="x / 16 / White">
            <path id="Vector" d="M12 4L4 12M4 4L12 12" stroke="#CCCCCC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </g>
        </svg>
      </button>
    </div>
  );
};

export default Toast;
