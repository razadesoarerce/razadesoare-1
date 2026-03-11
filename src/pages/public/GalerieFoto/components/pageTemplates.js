/**
 * Page template definitions for the photobook.
 * Each layout has a unique key and a fixed number of photo slots.
 */
export const LAYOUT_A = "A"; // 1 large photo
export const LAYOUT_B = "B"; // 2 photos side by side
export const LAYOUT_C = "C"; // 3 photos (2 top, 1 bottom)
export const LAYOUT_D = "D"; // 4 photos grid (2x2)

export const SLOTS_PER_LAYOUT = {
  [LAYOUT_A]: 1,
  [LAYOUT_B]: 2,
  [LAYOUT_C]: 3,
  [LAYOUT_D]: 4,
};

/**
 * Page sequence for the album. Photos are distributed in this order.
 * Total slots: 1+2+3+2+4+4+2 = 18
 */
export const PAGE_SEQUENCE = [
  LAYOUT_A, // Page 1 → 1 photo
  LAYOUT_B, // Page 2 → 2 photos
  LAYOUT_C, // Page 3 → 3 photos
  LAYOUT_B, // Page 4 → 2 photos
  LAYOUT_D, // Page 5 → 4 photos
  LAYOUT_D, // Page 6 → 4 photos
  LAYOUT_B, // Page 7 → 2 photos
];

/**
 * Build page configs with layout and photo count for a given total photo count.
 */
export function buildPageConfigs(photoCount) {
  const configs = [];
  let photoIndex = 0;
  for (const layout of PAGE_SEQUENCE) {
    const slots = SLOTS_PER_LAYOUT[layout];
    const remaining = photoCount - photoIndex;
    if (remaining <= 0) break;
    const take = Math.min(slots, remaining);
    configs.push({ layout, photoCount: take });
    photoIndex += take;
  }
  return configs;
}
