
// format the size of the image
export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} bytes`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

// estimate the size of the image in base64
export const estimateBase64Size = (base64String: string): number => {
  const base64WithoutPrefix = base64String.includes(';base64,') 
    ? base64String.split(';base64,')[1] 
    : base64String;
    
  return Math.round((base64WithoutPrefix.length * 3) / 4) - 
    (base64WithoutPrefix.endsWith('==') ? 2 : (base64WithoutPrefix.endsWith('=') ? 1 : 0));
};

// unused for now cause i got some issues with it
export const calculateRecommendedSize = (
  originalSize: number, 
  croppedSize: number, 
  maxSize: number
): number | null => {
  if (!originalSize || !croppedSize || croppedSize <= 0) {
    return null;
  }
  
  const reductionRatio = croppedSize / originalSize;
  return Math.max(1024, maxSize / reductionRatio);
};

// if we wanted to show how much the image was reduced in percentage
export const calculateReductionPercentage = (
  originalSize: number, 
  croppedSize: number
): string | null => {
  if (!originalSize || !croppedSize) {
    return null;
  }
  
  const reductionPercent = ((originalSize - croppedSize) / originalSize * 100).toFixed(2);
  return `${reductionPercent}%`;
};