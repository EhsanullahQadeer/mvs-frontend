import { REACT_APP_ASSETS } from "constants/music-list";

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

// Function to capitalize the first letter of each word in a string
export const capitalizeRegion = (str: string) => {
  if (!str) return ""; // Return empty string if input is empty
  return str
    .split(" ") // Split the string into words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize the first letter and lowercase the rest
    .join(" "); // Join the words back into a single string
};

// Function to format a number with commas as thousands separators
export const formatNumberWithCommas = (num: number): string => {
  if (isNaN(num)) return ""; // Return empty string if input is not a number
  return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

// Function to convert a string to a currency format with two decimal places
export const convertToCurrencyFormat = (input: string): string => {
  // Remove commas from the input
  const cleanedInput = input.replace(/,/g, '');
  let numericValue = parseFloat(cleanedInput);

  // Check if the number has a decimal point
  if (input.includes('.')) {
    const decimalPart = input.split('.')[1]; // Get the decimal part
    // If it has only one decimal place, divide by 10
    if (decimalPart.length === 1) {
      numericValue = parseFloat((numericValue / 10).toFixed(2)); // Divide by 10 and format to two decimal places
    } else if (decimalPart.length === 2) {
      numericValue = numericValue; // Do nothing
    }
    else {
      // If it has two or more decimal places, round to two decimal places
      numericValue = parseFloat((numericValue * 10).toFixed(2)); // Format to two decimal places
    }
  }
  // If the numeric value is NaN, return "$0.00"
  if (isNaN(numericValue)) {
    return "$0.00";
  }
  // Format the number with commas and two decimal places
  return "$" + numericValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

// Function to convert a duration to an audio duration Ex: 5 -> 0:05 or 72 -> 1:12
export const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

// Function to convert bytes to a human-readable format (KB, MB, GB)
export const formatBytes = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`; // Return bytes if less than 1 KB
  const kB = bytes / 1024;
  if (kB < 1024) return `${kB.toFixed(1)} KB`; // Return KB if less than 1 MB
  const MB = kB / 1024;
  if (MB < 1024) return `${MB.toFixed(1)} MB`; // Return MB if less than 1 GB
  const GB = MB / 1024;
  return `${GB.toFixed(1)} GB`; // Return GB
};

// Function to append the environment variable to the beginning of all assets in our S3 bucket
export const loadAsset = (url: string): string => {
  if (url === null) {
    return '';
  }
  if (url.startsWith('https://')) {
    return url;
  }
  const assetUrl = REACT_APP_ASSETS + url;
  return assetUrl;
};