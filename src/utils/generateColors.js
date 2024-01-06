/**
 * Hashes a string to a number for generating a color.
 * @param {string} str - The input string.
 * @returns {number} The hash code of the input string.
 */
const hashCode = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
};

/**
 * Generates a product color based on the given name.
 * @param {string} name - The name of the product.
 * @returns {string} The generated color in the format "rgb(r, g, b)".
 */
export const getProductColor = (name) => {
  const number = name.replace("Core i", "") + "123";
  const hash = hashCode(number);
  const r = (hash & 0xff0000) >> 16;
  const g = (hash & 0x00ff00) >> 8;
  const b = Math.min((hash & 0x0000ff) + 30, 250);
  return `rgb(${r}, ${g}, ${b})`;
};

/**
 * Checks if a color is considered light.
 * @param {string} color - The color to check in the format "rgb(r, g, b)".
 * @returns {boolean} True if the color is considered light, false otherwise.
 */
export const isLight = (color) => {
  const [r, g, b] = color.match(/\d+/g).map(Number);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.25;
};
