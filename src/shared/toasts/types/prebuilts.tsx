import { ToastConfig } from "./toast-types";

export const prebuiltToasts: ToastConfig[] = [
  // ************************ success toasts ************************
  { 
    id: "messageArchived", 
    title: "Message archived", 
    action: "Undo", 
    message: "The conversation has been moved to your archive.", 
    type: "success" 
  },
  { 
    id: "messageDeleted", 
    title: "Message deleted", 
    action: "Undo", 
    message: "The message has been successfully deleted.", 
    type: "success" 
  },
  { 
    id: "messageMovedToSpam", 
    title: "Message moved to Spam", 
    action: "Undo", 
    message: "The message has been moved to Spam.", 
    type: "success" 
  },
  { 
    id: "messageMarkedAsUnread", 
    title: "Message marked as unread", 
    message: "The message has been marked as unread.", 
    type: "success" 
  },
  { 
    id: "messageMarkedAsRead", 
    title: "Message marked as read", 
    message: "The message has been marked as read.", 
    type: "success" 
  },
  { 
    id: "demoSentSuccessfully", 
    title: "Demo sent successfully", 
    action: "Send Another", 
    message: "Your demo has been sent successfully.", 
    type: "success" 
  },
  { 
    id: "tipSentSuccessfully", 
    title: "Tip sent successfully", 
    message: "Your tip has been sent successfully.", 
    type: "success" 
  },
  { 
    id: "fileUploadedSuccessfully", 
    title: "File uploaded successfully", 
    action: "View File", 
    message: "Your file has been uploaded successfully.", 
    type: "success" 
  },
  { 
    id: "downloadComplete", 
    title: "Download complete", 
    action: "View File", 
    message: "Your download is complete.", 
    type: "success" 
  },
  { 
    id: "payoutMethodUpdated", 
    title: "Payout method updated", 
    action: "View Payout Methods", 
    message: "Your payout method has been successfully updated.", 
    type: "success" 
  },
  { 
    id: "newPayoutMethodAdded", 
    title: "New payout method added", 
    action: "View Payout Methods", 
    message: "A new payout method has been successfully added.", 
    type: "success" 
  },
  { 
    id: "stripeAccountConnected", 
    title: "Stripe account connected", 
    message: "Your Stripe account has been successfully connected.", 
    type: "success" 
  },
  { 
    id: "withdrawalRequestSubmitted", 
    title: "Withdrawal request submitted", 
    action: "View Request Status", 
    message: "Withdrawal request has been submitted successfully.", 
    type: "success" 
  },
  // ************************ error toasts ************************
  { 
    id: "failedToArchiveMessage", 
    title: "Failed to archive message", 
    action: "Retry", 
    message: "Could not archive the message. Please try again.", 
    type: "error" 
  },
  { 
    id: "failedToDeleteMessage", 
    title: "Failed to delete message", 
    action: "Retry", 
    message: "Could not delete the message.", 
    type: "error" 
  },
  { 
    id: "failedToMoveToSpam", 
    title: "Failed to move to Spam", 
    action: "Retry", 
    message: "The message could not be moved to Spam.", 
    type: "error" 
  },
  { 
    id: "couldNotApplyLabel", 
    title: "Could not apply label", 
    action: "Retry", 
    message: "The label could not be applied. Please try again.", 
    type: "error" 
  },
  { 
    id: "fileUploadFailed", 
    title: "File upload failed", 
    action: "Retry Upload", 
    message: "The file could not be uploaded. Please try again.", 
    type: "error" 
  },
  { 
    id: "unsupportedFileFormat", 
    title: "Unsupported file format", 
    action: "Choose a different file", 
    message: "The file format is not supported.", 
    type: "error" 
  },
  { 
    id: "fileSizeExceeded", 
    title: "File size exceeded", 
    action: "Choose a smaller file", 
    message: "The file size is too large to upload.", 
    type: "error" 
  },
  { 
    id: "messageFailedToSend", 
    title: "Message failed to send", 
    action: "Retry", 
    message: "The message could not be sent. Please try again.", 
    type: "error" 
  },
  { 
    id: "freeMessageLimitExceeded", 
    title: "Free message limit exceeded", 
    action: "Get More Credits", 
    message: "You have reached the daily limit of 5 free messages.", 
    type: "error" 
  },
  { 
    id: "tooManyMessagesSent", 
    title: "Too many messages sent", 
    action: "Wait & Retry", 
    message: "You are messaging too quickly. Slow down.", 
    type: "error" 
  },
  { 
    id: "unexpectedError", 
    title: "Unexpected error", 
    action: "Refresh", 
    message: "Oops! Something went wrong. Refresh and try again.", 
    type: "error" 
  },
  { 
    id: "APITimeout", 
    title: "API timeout", 
    action: "Retry", 
    message: "Failed to load data due to a server timeout. Try Again.", 
    type: "error" 
  },
  { 
    id: "messageReported", 
    title: "Message reported", 
    action: "Undo", 
    message: "The message has been reported.", 
    type: "error" 
  },
  { 
    id: "userBlocked", 
    title: "User blocked", 
    action: "Undo", 
    message: "The user has been blocked.", 
    type: "error" 
  },
  { 
    id: "failedToDownloadSample", 
    title: "Failed to download sample", 
    action: "Retry", 
    message: "The file could not be downloaded. Please try again.", 
    type: "error" 
  },
  // ************************ warning toasts ************************
  { 
    id: "actionCantBeUndone", 
    title: "This action cannot be undone", 
    message: "This action is permanent and cannot be reversed.", 
    type: "warning" 
  },
  { 
    id: "attachmentTooLarge", 
    title: "Attachment too large", 
    message: "The file is too large to upload.", 
    type: "warning" 
  },
  { 
    id: "insufficientCredits", 
    title: "Insufficient credits", 
    message: "You do not have enough credits to send this message.", 
    type: "warning" 
  },
  { 
    id: "paymentFailed", 
    title: "Payment failed", 
    message: "The payment was unsuccessful. Please try again.", 
    type: "warning" 
  },
  { 
    id: "uploadFailed", 
    title: "Upload failed", 
    message: "The upload was unsuccessful. Please try again.", 
    type: "warning" 
  },
  { 
    id: "connectionLost", 
    title: "Connection lost", 
    message: "The connection was lost. Try again later to continue.", 
    type: "warning" 
  },
  // ************************ info toasts ************************
  { 
    id: "upcomingMaintenance", 
    title: "Upcoming maintenance", 
    action: "Learn More",
    message: (params?: { date?: string; time?: string }) => 
      `Scheduled maintenance will take place on ${params?.date || 'toastDate'} at ${params?.time || 'toastTime'}. Some features may be temporarily unavailable.`,
    type: "info" 
  },
];