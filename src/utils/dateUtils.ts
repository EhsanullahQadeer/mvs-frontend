// Function to format the time difference
export const timeAgo = (date: Date) => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) return interval + "yrs";
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) return interval + "mo";
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) return interval + "d";
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) return interval + "h";
  interval = Math.floor(seconds / 60);
  if (interval >= 1) return interval + "m";
  return seconds + "s";
};

// Function to truncate the filename
export const truncateFilename = (filename: string, maxLength: number = 20) => {
  if (filename === undefined) return "";
  if (filename.length <= maxLength) return filename; // Return if the filename is short enough
  const start = filename.slice(0, 15); // First 5 characters
  const end = filename.slice(-4); // Last 4 characters
  return `${start}[...]${end}`; // Concatenate with ellipsis
};