// Updated to match Google Style Guide for code formatting and naming conventions
const RANDOM_OFFSET_MODULO = 17;
const RANDOM_OFFSET_SHIFT = 8;

const TYPEWRITER_FONTS = [
  "'Courier New', Courier, monospace",
  "'American Typewriter', 'Courier New', monospace",
  "'Consolas', 'Courier New', monospace",
  "'Monaco', 'Courier New', monospace",
  "'Lucida Console', 'Courier New', monospace"
];

/**
 * Returns the appropriate CSS class for a stamp color.
 * @param {string=} color The color of the stamp.
 * @return {string} The CSS class for the stamp color.
 */
export const getStampColor = (color: string | undefined = ''): string => {
  switch (color) {
    case 'red':
      return 'text-red-600';
    case 'blue':
      return 'text-blue-600';
    case 'brown':
      return 'text-amber-900';
    case 'green':
      return 'text-green-300';
    default:
      console.warn(`Unexpected color: ${color}`);
      return 'text-gray-700';
  }
};

/**
 * Generates consistent random offsets for each date based on the date string.
 * @param {string} dateString The date string to generate offsets for.
 * @param {'x'|'y'} type The type of offset ('x' or 'y').
 * @return {number} The random offset value.
 */
export const getRandomOffset = (dateString: string, type: 'x' | 'y'): number => {
  const str = dateString + type;
  const hash = Array.from(str).reduce((acc, char) => {
    return ((acc << 5) - acc) + char.charCodeAt(0);
  }, 0);
  return ((Math.abs(hash) % RANDOM_OFFSET_MODULO) - RANDOM_OFFSET_SHIFT);
};

/**
 * Generates consistent random rotation for each date stamp.
 * @param {string} dateString The date string to generate rotation for.
 * @return {number} The random rotation value.
 */
export const getRandomRotation = (dateString: string): number => {
  const str = dateString + 'rotation';
  const hash = Array.from(str).reduce((acc, char) => {
    return ((acc << 5) - acc) + char.charCodeAt(0);
  }, 0);
  return ((Math.abs(hash) % RANDOM_OFFSET_MODULO) - RANDOM_OFFSET_SHIFT);
};

/**
 * Returns a consistent typewriter font for each date.
 * @param {string} dateString The date string to determine the font for.
 * @return {string} The font family.
 */
export const getTypewriterFont = (dateString: string): string => {
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    hash = ((hash << 5) - hash) + dateString.charCodeAt(i);
  }
  return TYPEWRITER_FONTS[Math.abs(hash) % TYPEWRITER_FONTS.length];
};

/**
 * Interface for library information.
 * @typedef {Object} LibraryInfo
 * @property {string} name The name of the library.
 * @property {string} address The address of the library.
 */

/**
 * Default library information.
 * @const {LibraryInfo}
 */
export const DEFAULT_LIBRARY = {
  name: 'Library of Congress',
  address: '101 Independence Ave SE, Washington, DC 20540',
};