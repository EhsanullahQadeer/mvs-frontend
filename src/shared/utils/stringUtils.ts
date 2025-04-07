export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/\s+/g, '_'); //replace spaces between words with underscores
};