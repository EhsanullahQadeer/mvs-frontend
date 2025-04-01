import "../styles/toast.css";

type ToastType = "success" | "error" | "warning";

type ToastConfig = {
  id: string;
  message: string;
  type: ToastType;
};

const toastConfigs: ToastConfig[] = [
  // ************************ success toasts ************************
  { id: "messageArchived", message: "The conversation has been moved to your archive.", type: "success" },
  { id: "messageDeleted", message: "The message has been successfully deleted.", type: "success" },
  { id: "messageMovedToSpam", message: "The message has been moved to Spam.", type: "success" },
  { id: "messageMarkedAsUnread", message: "The message has been marked as unread.", type: "success" },
  { id: "messageMarkedAsRead", message: "The message has been marked as read.", type: "success" },
  { id: "demoSentSuccessfully", message: "Your demo has been sent successfully.", type: "success" },
  { id: "tipSentSuccessfully", message: "Your tip has been sent successfully.", type: "success" },
  { id: "fileUploadedSuccessfully", message: "Your file has been uploaded successfully.", type: "success" },
  { id: "downloadComplete", message: "Your download is complete.", type: "success" },
  { id: "payoutMethodUpdated", message: "Your payout method has been successfully updated.", type: "success" },
  { id: "newPayoutMethodAdded", message: "A new payout method has been successfully added.", type: "success" },
  { id: "stripeAccountConnected", message: "Your Stripe account has been successfully connected.", type: "success" },
  { id: "withdrawalRequestSubmitted", message: "Withdrawal request has been submitted successfully.", type: "success" },
  // ************************ error toasts ************************
  { id: "failedToArchiveMessage", message: "Could not archive the message. Please try again.", type: "error" },
  { id: "failedToDeleteMessage", message: "Could not delete the message.", type: "error" },
  { id: "failedToMoveToSpam", message: "The message could not be moved to Spam.", type: "error" },
  { id: "couldNotApplyLabel", message: "The label could not be applied. Please try again.", type: "error" },
  { id: "fileUploadFailed", message: "The file could not be uploaded. Please try again.", type: "error" },
  { id: "unsupportedFileFormat", message: "The file format is not supported.", type: "error" },
  { id: "fileSizeExceeded", message: "The file size is too large to upload.", type: "error" },
  { id: "messageFailedToSend", message: "The message could not be sent. Please try again.", type: "error" },
  { id: "freeMessageLimitExceeded", message: "You have reached the daily limit of 5 free messages.", type: "error" },
  { id: "tooManyMessagesSent", message: "You are messaging too quickly. Slow down.", type: "error" },
  { id: "unexpectedError", message: "Oops! Something went wrong. Refresh and try again.", type: "error" },
  { id: "APITimeout", message: "Failed to load data due to a server timeout. Try Again.", type: "error" },
  { id: "messageReported", message: "The message has been reported.", type: "error" },
  { id: "userBlocked", message: "The user has been blocked.", type: "error" },
  { id: "failedToDownloadSample", message: "The file could not be downloaded. Please try again.", type: "error" },
  // ************************ warning toasts ************************
  { id: "actionCantBeUndone", message: "This action is permanent and cannot be reversed.", type: "warning" },
  { id: "attachmentTooLarge", message: "The file is too large to upload.", type: "warning" },
  { id: "insufficientCredits", message: "You don’t have enough credits to send this message.", type: "warning" },
  { id: "paymentFailed", message: "The payment was unsuccessful. Please try again.", type: "warning" },
  { id: "uploadFailed", message: "The upload was unsuccessful. Please try again.", type: "warning" },
  { id: "connectionLost", message: "The connection was lost. Try again later to continue.", type: "warning" },
];

const ToastMessage = ({ message, type }: { message: string; type: ToastType }) => (
  <div className={`toast-${type}-icon`}>
    <i className="fas fa-check-circle"></i>
    <div className={`toast-${type}-message`}>{message}</div>
  </div>
);

export const toastStates = toastConfigs.reduce((acc, { id, message, type }) => {
  acc[id] = {
    element: <ToastMessage message={message} type={type} />,
    type,
  };
  return acc;
}, {} as Record<string, { element: JSX.Element; type: ToastType }>);

