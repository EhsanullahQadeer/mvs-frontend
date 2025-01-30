export const notificationTypes = {
  "downloaded-file": "download",
  "viewed-demo": "viewed",
  "liked-file": "liked",
  "audio-shared": "audio",
  "tagged-in-the-demo": "tagged",
  "connect-request": "isFollowRequest",
  follow: "isFollow",
  "collaboration-request-accepted": "requestAccepted",
  "connection-request-accepted": "connectAccepted",
  "audio-updated": "audioUpdated",
  "feedback-provided": "feedback",
  "new-collaborator-added": "collabAdded",
} as const;

// Define a type for notification keys
export type NotificationType = typeof notificationTypes[keyof typeof notificationTypes];
// Common variables
const demoTitle = `"Sunset Serenade"`;
const collaboratorName = "Poobear";
const userType = "Singer";
const collaboratorProfile = "Soundboyz";

// Notifications map
const notificationsMap: Record<NotificationType, any> = {
  requestAccepted: {
    collaboratorName,
    message: ` has accepted your collaboration request as a `,
    userType,
    remaining: "on the demo",
    demoTitle,
    btnName: "View Details",
    action: () => console.log("View Details clicked"),
  },
  isFollowRequest: {
    collaboratorName,
    message: ` sent you a connect request.`,
    btnName: "Accept",
    action: () => { },
    btnName2: "Decline",
    action2: () => console.log("Decline clicked"),
  },
  isFollow: {
    collaboratorName,
    message: ` is now following you.`,
    btnName: "Follow Back",
    action: () => console.log("Follow Back clicked"),
    btnName2: "View Profile",
    action2: () => console.log("View Profile clicked"),
  },
  connectAccepted: {
    collaboratorName,
    message: ` has accepted your connection request and you’ve unlocked exclusive content.`,
    btnName: "View Profile",
    action: () => console.log("View Profile clicked"),
  },
  audioUpdated: {
    collaboratorProfile,
    message: ` has updated the audio file`,
    demoTitle,
    btnName: "View Details",
    action: () => console.log("View Details clicked"),
  },
  feedback: {
    collaboratorProfile,
    message: ` has provided feedback on your audio demo`,
    demoTitle,
    btnName: "View Feedback",
    action: () => console.log("View Feedback clicked"),
  },
  collabAdded: {
    collaboratorProfile,
    message: ` has added a new collaborator to the file`,
    btnName: "View Details",
    action: () => console.log("View Details clicked"),
  },
  tagged: {
    collaboratorName,
    message: ` has tagged you as a `,
    userType,
    remaining: "on the demo",
    demoTitle,
    btnName: "View File",
    action: () => console.log("View File clicked"),
  },
  liked: {
    collaboratorName,
    message: ` liked your file.`,
  },
  download: {
    collaboratorName,
    message: ` downloaded your file`,
    demoTitle
  },
  viewed: {
    collaboratorName,
    message: ` viewed a demo.`,
    demoTitle,
  },
  audio: {
    collaboratorProfile,
    message: ` has shared an audio file with you.`,
    btnName: "View File",
    action: () => console.log("View File clicked"),
  },
};

// Function to get notification content safely
export const getNotificationContent = (type: NotificationType) => {
  return notificationsMap[type] || null;
};
