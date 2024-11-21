import moment from "moment";

export function formatMediaDetails(durationInSeconds, fileSizeInBytes) {
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = durationInSeconds % 60;
  const formattedDuration = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  const fileSizeInMB = (fileSizeInBytes / (1024 * 1024)).toFixed(2);
  const formattedFileSize = `${fileSizeInMB} MB`;

  return {
    duration: formattedDuration,
    size: formattedFileSize,
  };
}

export const lastMsgTimeStamp = (time) => {
  const lastUpdated = moment(time);
  const today = moment().startOf("day");
  const yesterday = moment().subtract(1, "days").startOf("day");

  if (lastUpdated.isSame(today, "d")) {
    return lastUpdated.format("h:mm A");
  } else if (lastUpdated.isSame(yesterday, "d")) {
    return "Yesterday";
  } else {
    return lastUpdated.format("MMMM D");
  }
};
