// Utility functions for card-related operations

/**
 * Generate consistent random offsets for each date based on the date string.
 * @param dateString - The date string to hash.
 * @param type - The type of offset ('x' or 'y').
 * @returns A value between -8 and 8 pixels.
 */
export const getRandomOffset = (dateString: string, type: 'x' | 'y') => {
  let hash = 0;
  const str = dateString + type;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return ((Math.abs(hash) % 17) - 8);
};

/**
 * Generate consistent random rotation for each date stamp.
 * @param dateString - The date string to hash.
 * @returns A value between -8 and 8 degrees.
 */
export const getRandomRotation = (dateString: string) => {
  let hash = 0;
  const str = dateString + 'rotation';
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return ((Math.abs(hash) % 17) - 8);
};

/**
 * Get a consistent typewriter font for each date.
 * @param dateString - The date string to hash.
 * @returns A font-family string.
 */
export const getTypewriterFont = (dateString: string) => {
  const fonts = [
    "'Courier New', Courier, monospace",
    "'American Typewriter', 'Courier New', monospace", 
    "'Consolas', 'Courier New', monospace",
    "'Monaco', 'Courier New', monospace",
    "'Lucida Console', 'Courier New', monospace"
  ];
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    hash = ((hash << 5) - hash) + dateString.charCodeAt(i);
  }
  return fonts[Math.abs(hash) % fonts.length];
};