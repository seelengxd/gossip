export function lightenDarkenColour(col: string, amt: number) {
  let num = parseInt(col.slice(1), 16);
  let r = (num >> 16) + amt;
  let b = ((num >> 8) & 0x00ff) + amt;
  let g = (num & 0x0000ff) + amt;
  let newColor = g | (b << 8) | (r << 16);
  return `#${newColor.toString(16)}`;
}

export function lightenColour(col: string) {
  return lightenDarkenColour(col, 10);
}

export function darkenColour(col: string) {
  return lightenDarkenColour(col, -10);
}

export function isDarkColour(col: string) {
  let c = col.substring(1); // strip #
  let rgb = parseInt(c, 16); // convert rrggbb to decimal
  let r = (rgb >> 16) & 0xff; // extract red
  let g = (rgb >> 8) & 0xff; // extract green
  let b = (rgb >> 0) & 0xff; // extract blue

  let luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

  return luma < 80;
}
