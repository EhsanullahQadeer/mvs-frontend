export const getNotificationContent = (state) => {
  const collaboratorName = "Poobear";
  const demoTitle = `"Sunset Serenade"`;
  const collaboratorProfile = "Soundboyz";
  const userType = "Singer";

  const viewDetails = () => {
    console.log("View Details clicked");
  };

  const viewFile = () => {
    console.log("View File clicked");
  };

  const followBack = () => {
    console.log("Follow Back clicked");
  };

  const viewProfile = () => {
    console.log("View Profile clicked");
  };

  const viewFeedback = () => {
    console.log("View Feedback clicked");
  };
  const acceptHandle = () => {};
  const declineHandle = () => {
    console.log("View Feedback clicked");
  };

  return [
    state.requestAccepted && {
      collaboratorName,
      message: ` has accepted your collaboration request as a `,
      userType,
      remaining: "on the demo",
      demoTitle,
      btnName: "View Details",
      action: viewDetails,
    },
    state.isFollowRequest && {
      collaboratorName,
      message: ` sent you a connect request.`,
      btnName: "Accept",
      action: acceptHandle,
      btnName2: "Decline",
      action2: declineHandle,
    },
    state.isFollow && {
      collaboratorName,
      message: ` is now following you.`,
      btnName: "Follow Back",
      action: followBack,
      btnName2: "View Profile",
      action2: viewProfile,
    },
    state.connectAccepted && {
      collaboratorName,
      message: ` has accepted your connection request and you’ve unlocked exclusive content.`,
      btnName: "View Profile",
      action: viewProfile,
    },
    state.audioUpdated && {
      collaboratorProfile,
      message: ` has updated the audio file`,
      demoTitle,
      btnName: "View Details",
      action: viewDetails,
    },
    state.feedback && {
      collaboratorProfile,
      message: ` has provided feedback on your audio demo`,
      demoTitle,
      btnName: "View Feedback",
      action: viewFeedback,
    },
    state.collabAdded && {
      collaboratorProfile,
      message: ` has added a new collaborator to the file`,
      btnName: "View Details",
      action: viewDetails,
    },
    state.tagged && {
      collaboratorName,
      message: ` has tagged you as a `,
      userType,
      remaining: "on the demo",
      demoTitle,
      btnName: "View File",
      action: viewFile,
    },
    state.liked && { collaboratorName, message: ` liked your file.` },
    state.download && {
      collaboratorName,
      message: ` downloaded your file`,
      demoTitle,
    },
    state.viewed && { collaboratorName, message: ` viewed a demo.` },
    state.audio && {
      collaboratorProfile,
      message: ` has shared an audio file with you.`,
      btnName: "View File",
      action: viewFile,
    },
  ].filter(Boolean);
};
