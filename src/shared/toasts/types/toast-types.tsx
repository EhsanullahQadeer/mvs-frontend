import "../styles/toast.css";

type ToastState = {
  element: JSX.Element;
  type: string;
  position: string;
};

type ToastStates = {
  [key: string]: ToastState;
};

export const toastStates: ToastStates = {
  // ************************ success toasts ************************
  messageArchived: {
    element: (
      <>
        <div className="toast-success-icon">
          <i className="fas fa-check-circle"></i>
        </div>
        <div className="toast-success-message">
          The conversation has been moved to your archive.
        </div>
      </>
    ),
    type: "success",
    position: "bottom-right",
  },
  messageDeleted: {
    element: (
      <>
        <div className="toast-success-icon">
          <i className="fas fa-check-circle"></i>
        </div>
        <div className="toast-success-message">
          The message has been successfully deleted.
        </div>
      </>
    ),
    type: "success",
    position: "bottom-right",
  },
  messageMovedToSpam: {
    element: (
      <>
        <div className="toast-success-icon">
          <i className="fas fa-check-circle"></i>
        </div>
        <div className="toast-success-message">
          The message has been moved to Spam.
        </div>
      </>
    ),
    type: "success",
    position: "bottom-right",
  },
  messageMarkedAsUnread: {
    element: (
      <>
        <div className="toast-success-icon">
          <i className="fas fa-check-circle"></i>
        </div>
        <div className="toast-success-message">
          The message has been marked as unread.
        </div>
      </>
    ),
    type: "success",
    position: "bottom-right",
  },
  messageMarkedAsRead: {
    element: (
      <>
        <div className="toast-success-icon">
          <i className="fas fa-check-circle"></i>
        </div>
        <div className="toast-success-message">
          The message has been marked as read.
        </div>
      </>
    ),
    type: "success",
    position: "bottom-right",
  },
  demoSentSuccessfully: {
    element: (
      <>
        <div className="toast-success-icon">
          <i className="fas fa-check-circle"></i>
        </div>
        <div className="toast-success-message">
          Your demo has been sent successfully.
        </div>
      </>
    ),
    type: "success",
    position: "bottom-right",
  },
  tipSentSuccessfully: {
    element: (
      <>
        <div className="toast-success-icon">
          <i className="fas fa-check-circle"></i>
        </div>
        <div className="toast-success-message">
          Your tip has been sent successfully.
        </div>
      </>
    ),
    type: "success",
    position: "bottom-right",
  },
  fileUploadedSuccessfully: {
    element: (
      <>
        <div className="toast-success-icon">
          <i className="fas fa-check-circle"></i>
        </div>
        <div className="toast-success-message">
          Your file has been uploaded successfully.
        </div>
      </>
    ),
    type: "success",
    position: "bottom-right",
  },
  downloadComplete: {
    element: (
      <>
        <div className="toast-success-icon">
          <i className="fas fa-check-circle"></i>
        </div>
        <div className="toast-success-message">
          Your download is complete.
        </div>
      </>
    ),
    type: "success",
    position: "bottom-right",
  },
  payoutMethodUpdated: {
    element: (
      <>
        <div className="toast-success-icon">
          <i className="fas fa-check-circle"></i>
        </div>
        <div className="toast-success-message">
          Your payout method has been successfully updated.
        </div>
      </>
    ),
    type: "success",
    position: "bottom-right",
  },
  newPayoutMethodAdded: {
    element: (
      <>
        <div className="toast-success-icon">
          <i className="fas fa-check-circle"></i>
        </div>
        <div className="toast-success-message">
          A new payout method has been successfully added.
        </div>
      </>
    ),
    type: "success",
    position: "bottom-right",
  },
  stripeAccountConnected: {
    element: (
      <>
        <div className="toast-success-icon">
          <i className="fas fa-check-circle"></i>
        </div>
        <div className="toast-success-message">
          Your Stripe account has been successfully connected.
        </div>
      </>
    ),
    type: "success",
    position: "bottom-right",
  },
  withdrawalRequestSubmitted: {
    element: (
      <>
        <div className="toast-success-icon">
          <i className="fas fa-check-circle"></i>
        </div>
        <div className="toast-success-message">
          Withdrawal request has been submitted successfully.
        </div>
      </>
    ),
    type: "success",
    position: "bottom-right",
  },
  // ************************ error toasts ************************
};