import { ToastConfig } from "./toast-types";

export const prebuiltToasts: ToastConfig[] = [
  // ************************ success toasts *********************************************************************
  { 
    id: "messageArchived", 
    title: "Message archived", 
    action: "Undo", 
    message: "The conversation has been moved to your archive.", 
    type: "success" 
  },
  { 
    id: "messagesArchived", 
    title: "Messages archived", 
    action: "Undo", 
    message: "The conversations have been moved to your archive.", 
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
  // batch 2
  { 
    id: "profileUpdated", 
    title: "Profile updated successfully", 
    action: "View Profile", 
    message: "Your profile details have been updated.", 
    type: "success" 
  },
  { 
    id: "changesSaved", 
    title: "Changes saved",
    message: "All changes have been saved successfully.", 
    type: "success" 
  },
  { 
    id: "informationDeleted", 
    title: "Information deleted successfully", 
    action: "Undo", 
    message: "Selected information has been permanently removed.", 
    type: "success" 
  },
  { 
    id: "accountInfoUpdated", 
    title: "Account info updated", 
    action: "Edit Info", 
    message: "Your account information has been updated.", 
    type: "success" 
  },
  { 
    id: "emailUpdated", 
    title: "Email updated succesfully",
    message: "Your email address has been updated.", 
    type: "success" 
  },
  { 
    id: "passwordChanged", 
    title: "Password changed succesfully", 
    message: "Your password was changed successfully.", 
    type: "success" 
  },
  { 
    id: "contributorAdded", 
    title: "Contributor added", 
    action: "View contributors", 
    message: "The contributor was successfully added to your file.", 
    type: "success" 
  },
  { 
    id: "metadataUpdated", 
    title: "Metadata updated", 
    action: "View file", 
    message: "File metadata was updated.", 
    type: "success" 
  },
  { 
    id: "fileDeleted", 
    title: "File deleted", 
    action: "Undo", 
    message: "The file was permanently removed.", 
    type: "success" 
  },
  { 
    id: "publishPercentageUpdated", 
    title: "Publishing percentage updated", 
    action: "View Details", 
    message: "The publishing percentage has been saved.", 
    type: "success" 
  },
  { 
    id: "roleUpdated", 
    title: "Role updated", 
    action: "Edit roles", 
    message: "The role has been updated successfully.", 
    type: "success" 
  },
  { 
    id: "fileShared", 
    title: "File shared successfully", 
    action: "Add new method", 
    message: "Your file was shared with selected users.", 
    type: "success" 
  },
  { 
    id: "paymentMethodRemoved", 
    title: "Payment method removed", 
    action: "Add new method", 
    message: "Your payment method was successfully deleted.", 
    type: "success" 
  },
  { 
    id: "defaultPaymentMethodChanged", 
    title: "Default payment method changed", 
    action: "View payment method", 
    message: "Your default payment method was updated.", 
    type: "success" 
  },
  { 
    id: "statusRefreshed", 
    title: "Status refreshed", 
    action: "View status", 
    message: "Your billing status has been updated.", 
    type: "success" 
  },
  // batch 3
  { 
    id: "privacySettingsUpdated", 
    title: "Privacy settings updated", 
    action: "View settings", 
    message: "Your privacy settings were updated successfully.", 
    type: "success" 
  },
  { 
    id: "accountUnblocked", 
    title: "Account successfully unblocked", 
    action: "View account", 
    message: "The account has been unblocked.", 
    type: "success" 
  },
  { 
    id: "inboxFeeUpdated", 
    title: "Inbox fee updated successfully", 
    action: "View fee", 
    message: "Your inbox fee has been saved.", 
    type: "success" 
  },
  { 
    id: "automaticMessageSaved", 
    title: "Automatic message saved", 
    action: "View message", 
    message: "Your auto-response has been saved.", 
    type: "success" 
  },
  { 
    id: "demoFeeUpdated", 
    title: "Demo fee updated successfully", 
    action: "View fee", 
    message: "Your demo fee has been saved.", 
    type: "success" 
  },
  { 
    id: "meetingFeeSaved", 
    title: "Meeting fee saved", 
    action: "View meeting settings", 
    message: "Your meeting fee has been saved.", 
    type: "success" 
  },
  { 
    id: "meetingDurationsUpdated", 
    title: "Meeting durations updated", 
    action: "View meeting settings", 
    message: "Your availability times have been updated.", 
    type: "success" 
  },
  { 
    id: "planChanged", 
    title: "Plan changed successfully", 
    action: "View plan", 
    message: "Your subscription plan was updated.", 
    type: "success" 
  },
  { 
    id: "creditsPurchased", 
    title: "Credits purchased successfully", 
    action: "View credits", 
    message: "Your credits have been added to your account.", 
    type: "success" 
  },
  { 
    id: "monthlyCreditsAdded", 
    title: "Monthly credits added", 
    action: "View usage", 
    message: "Your credits have been renewed.", 
    type: "success" 
  },
  { 
    id: "userTypeSaved", 
    title: "User type saved successfully", 
    message: "Your user role has been saved.", 
    type: "success" 
  },
  { 
    id: "personalInfoSaved", 
    title: "Personal information saved successfully", 
    action: "Review profile", 
    message: "Your information has been saved.", 
    type: "success" 
  },
  { 
    id: "pricesUpdated", 
    title: "Prices updated successfully", 
    action: "View pricing", 
    message: "Your pricing settings have been saved.", 
    type: "success" 
  },
  // ************************ error toasts *****************************************************************
  { 
    id: "failedToArchiveMessage", 
    title: "Failed to archive message(s)", 
    action: "Retry", 
    message: "Could not archive the message(s). Please try again.", 
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
  // batch 2
  { 
    id: "failedToSubmitWithdrawalRequest", 
    title: "Failed to submit withdrawal request", 
    action: "Retry", 
    message: "We could not process your request. Please try again later.", 
    type: "error" 
  },
  { 
    id: "somethingWentWrong", 
    title: "Something went wrong", 
    action: "Refresh", 
    message: "An unexpected error occurred. Please refresh the page and try again.", 
    type: "error" 
  },
  { 
    id: "failedToUpdateEmail", 
    title: "Failed to update email", 
    action: "Retry", 
    message: "Something went wrong. Please try again.", 
    type: "error" 
  },
  { 
    id: "atLeastOneContributor", 
    title: "You must select at least one contributor", 
    action: "Add contributor", 
    message: "Please assign at least one contributor to continue.", 
    type: "error" 
  },
  { 
    id: "publishingPercentage100", 
    title: "Publishing percentage must equal 100%", 
    action: "Edit split", 
    message: "All contributor shares must add up to 100%.", 
    type: "error" 
  },
  { 
    id: "failedToAddPaymentMethod", 
    title: "Failed to add payment method", 
    action: "Retry", 
    message: "We could not add your card. Please try again.", 
    type: "error" 
  },
  { 
    id: "failedToUpdatePrivacySettings", 
    title: "Failed to update privacy settings", 
    action: "Retry", 
    message: "We could not save your changes.", 
    type: "error" 
  },
  { 
    id: "unableToUnblockAccount", 
    title: "Unable to unblock account", 
    action: "Retry", 
    message: "Something went wrong while unblocking the user.", 
    type: "error" 
  },
  // batch 3
  { 
    id: "failedToAddPaymentMethod", 
    title: "Failed to add payment method", 
    action: "Retry", 
    message: "We could not add your card. Please try again.", 
    type: "error" 
  },
  { 
    id: "failedToUpdatePayoutMethod", 
    title: "Unable to update payout method", 
    action: "Retry", 
    message: "Failed to update your payout method. Please try again", 
    type: "error" 
  },
  { 
    id: "verificationFailed", 
    title: "Verification failed", 
    action: "Retry", 
    message: "We could not verify your identity. Please try again.", 
    type: "error" 
  },
  { 
    id: "failedToUpdateInboxFee", 
    title: "Failed to update inbox fee", 
    action: "Retry", 
    message: "We could not update your inbox fee. Please try again.", 
    type: "error" 
  },
  { 
    id: "failedToSaveAutomaticMessage", 
    title: "Could not save automatic message", 
    action: "Retry", 
    message: "We could not save your automatic response.", 
    type: "error" 
  },
  { 
    id: "failedToUpdateDemoFee", 
    title: "Error updating demo fee", 
    action: "Retry", 
    message: "Something went wrong while saving your demo fee.", 
    type: "error" 
  },
  { 
    id: "failedToSaveMeetingFee", 
    title: "Meeting fee save failed", 
    action: "Retry", 
    message: "We could not save your meeting fee.", 
    type: "error" 
  },
  { 
    id: "failedToChangePlan", 
    title: "Failed to change plan", 
    action: "Retry", 
    message: "Something went wrong when changing your plan.", 
    type: "error" 
  },
  { 
    id: "failedToPurchaseCredits", 
    title: "Credit purchase failed", 
    action: "Retry", 
    message: "We could not process your payment.", 
    type: "error" 
  },
  { 
    id: "failedToRetrieveCreditHistory", 
    title: "Could not retrieve credit history", 
    action: "Retry", 
    message: "We could not load your transactions.", 
    type: "error" 
  },
  { 
    id: "pleaseSelectBothRoles", 
    title: "Please select both a main and a sub-role", 
    action: "Complete now", 
    message: "Both roles are required to proceed.", 
    type: "error" 
  },
  { 
    id: "failedToSaveChanges", 
    title: "Failed to save changes", 
    action: "Retry", 
    message: "We could not save your information. Please try again.", 
    type: "error" 
  },  
  // ************************ warning toasts *********************************************************************
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
  // batch 2
  { 
    id: "mustConnectToPayoutMethod", 
    title: "You must connect a payout method first", 
    action: "Add payout method", 
    message: "Please add a payout method to proceed.", 
    type: "warning" 
  },
  { 
    id: "payoutMethodAlreadyDefault", 
    title: "This payout method is already set as default", 
    action: "View payout methods", 
    message: "No changes were made because this is already your default method.", 
    type: "warning" 
  },
  { 
    id: "mustCompleteMetadata", 
    title: "You must complete all required metadata before saving/closing", 
    action: "Go to metadata", 
    message: "Some fields are missing. Please complete all details before continuing.", 
    type: "warning" 
  },
  { 
    id: "missingPublishingPercentage", 
    title: "Missing publishing percentage for one or more contributors", 
    action: "Edit percentages", 
    message: "Each contributor must have a defined percentage.", 
    type: "warning" 
  },
  { 
    id: "fileAlreadyExists", 
    title: "File already exists", 
    action: "Rename file", 
    message: "A file with this name has already been uploaded.", 
    type: "warning" 
  },
  { 
    id: "unsavedChanges", 
    title: "Unsaved changes", 
    action: "Save now", 
    message: "You have unsaved changes. Do not forget to save before closing.", 
    type: "warning" 
  },
  { 
    id: "cardAlreadyAdded", 
    title: "You already have this card added", 
    action: "Use another", 
    message: "This card is already linked to your account.", 
    type: "warning" 
  },
  { 
    id: "feeCannotBeSetToZero", 
    title: "Fee cannot be set to $0", 
    action: "Edit fee", 
    message: "Minimum price must be at least $1.", 
    type: "warning" 
  },
  { 
    id: "creditBalanceIsLow", 
    title: "Credit balance is low", 
    action: "Buy credits", 
    message: "You are about to run out of monthly credits.", 
    type: "warning" 
  },
  { 
    id: "aboutToRunOutOfCredits", 
    title: "You are about to run out of monthly credits", 
    action: "View plans", 
    message: "Consider upgrading your plan or buying more credits.", 
    type: "warning" 
  },
  // ************************ info toasts *********************************************************************
  { 
    id: "upcomingMaintenance", 
    title: "Upcoming maintenance", 
    action: "Learn More",
    message: (params?: { date?: string; time?: string }) => 
      `Scheduled maintenance will take place on ${params?.date || 'toastDate'} at ${params?.time || 'toastTime'}. Some features may be temporarily unavailable.`,
    type: "info" 
  },
];