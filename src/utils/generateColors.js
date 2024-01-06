const hashCode = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
};

export const getProductColor = (name) => {
  const number = name.replace("Core i", "") + "123";
  const hash = hashCode(number);
  const r = (hash & 0xff0000) >> 16;
  const g = (hash & 0x00ff00) >> 8;
  const b = Math.min((hash & 0x0000ff) + 30, 250);
  return `rgb(${r}, ${g}, ${b})`;
};

export const isLight = (color) => {
  const [r, g, b] = color.match(/\d+/g).map(Number);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.25;
};
