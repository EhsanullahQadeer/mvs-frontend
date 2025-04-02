import "../styles/toast.css";
import { prebuiltToasts } from "./prebuilts";

type ToastType = "success" | "error" | "warning" | "info";

export type ToastConfig = {
  id: string;
  title: string;
  action?: string;
  actionFunction?: (params?: any) => void;
  message: string | ((params?: any) => string);
  type: ToastType;
};


const ToastMessage = ({ title, message, type, action, actionFunction, onClose, params }: { 
  title: string; 
  message: string | ((params?: any) => string); 
  type: ToastType; 
  action?: string; 
  actionFunction?: (params?: any) => void;
  onClose?: () => void;
  params?: any;
}) => (
  <div className="toast-content">
    <div className="toast-icon-container">
      <div className={`toast-${type}-icon toast-icon`}></div>
    </div>
    <div className="toast-text-container">
      <div className={`toast-${type}-title toast-title`}>{title}</div>
      <div className={`toast-${type}-message toast-message`}>
        {typeof message === 'function' ? message(params) : message}
      </div>
      <div className="toast-action-buttons-container">
        <button className={`toast-dismiss-button toast-${type}-dismiss-button`} onClick={onClose}>Dismiss</button>
        <button 
        className={`toast-action-button toast-${type}-action-button`}
        onClick={() => {
          if (actionFunction) {
            actionFunction(params);
          }
        }}
        >{action ? action : null}</button>
      </div>
    </div>
  </div>
);

export const toastStates = prebuiltToasts.reduce((acc, { id, title, action, actionFunction, message, type }) => {
  acc[id] = {
    element: (params?: any) => (
      <ToastMessage 
        title={title} 
        message={message} 
        type={type} 
        action={action}
        actionFunction={actionFunction}
        params={params}
      />
    ),
    type,
  };
  return acc;
}, {} as Record<string, { element: (params?: any) => JSX.Element; type: ToastType }>);

