/**
 * Converts CSS number in px to rem.
 *
 * This assumes that the standard base font size
 * of 16px has not been tampered with.
 */
export const pxToRem = (...pxs: number[]) => {
  return pxs.map((px) => `${px / 16}rem`).join(" ")
}

export default {
  pxToRem,
}