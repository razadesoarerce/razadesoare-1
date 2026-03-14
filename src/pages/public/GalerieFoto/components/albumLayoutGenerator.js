/**
 * Reusable layout generator for photobook flipbook.
 * Accepts album = { title, cover, photos: [{ src, width?, height?, alt? }] }.
 * Classifies by ratio: portrait (ratio < 1), landscape (ratio >= 1).
 * Page order: 1=title, 2=cover, then alternate portrait/landscape. Landscape pages have 2 stacked images.
 * If total pages odd, adds blank at end.
 */

export const LAYOUT = {
  TITLE: "TITLE",
  COVER: "COVER",
  BLANK: "BLANK",
  PORTRAIT: "PORTRAIT",
  LANDSCAPE: "LANDSCAPE",
};

/**
 * Classify image by aspect ratio (from width/height).
 * Portrait: ratio < 1. Landscape: ratio >= 1 (includes former panoramas).
 */
export function classifyByRatio(ratio) {
  if (ratio < 1) {
    return "portrait";
  }
  return "landscape";
}

/**
 * Get ratio from photo (width/height). When not available, returns 1 (portrait).
 * Optional ratioMap: content index -> number for on-load classification.
 */
export function getPhotoRatio(photo, ratioMapIndex, ratioMap = {}) {
  if (photo && typeof photo.width === "number" && typeof photo.height === "number" && photo.height > 0) {
    return photo.width / photo.height;
  }
  if (ratioMapIndex != null && typeof ratioMap[ratioMapIndex] === "number") {
    return ratioMap[ratioMapIndex];
  }
  return 1;
}

/**
 * Build page configs for flipbook.
 * @param {Object} album - { title, cover, photos: [{ src, width?, height?, alt? }] }
 * @param {Object} ratioMap - optional map of photo index -> ratio (for when dimensions loaded on demand)
 * @returns {Array<{ type: string, photo?: object, photos?: array, layout?: string }>}
 */
export function buildAlbumPages(album, ratioMap = {}) {
  const text = album?.message ?? "";
  const cover = album?.cover ?? album?.photos?.[0];
  const allPhotos = album?.photos ?? [];
  const coverSrc = typeof cover === "object" && cover?.src != null ? cover.src : cover;
  const coverPhoto = coverSrc ? { src: coverSrc, alt: (typeof cover === "object" && cover?.alt) || "" } : null;

  const contentPhotos = allPhotos.filter((p) => {
    const src = typeof p === "object" ? p?.src : p;
    return src != null && src !== coverSrc;
  });

  const pages = [];

  pages.push({ type: LAYOUT.TITLE, text });
  pages.push({ type: LAYOUT.COVER, photo: coverPhoto });

  const portraits = [];
  const landscapes = [];

  contentPhotos.forEach((photo, index) => {
    const ratio = getPhotoRatio(photo, index, ratioMap);
    const classification = classifyByRatio(ratio);
    const photoEntry = typeof photo === "object" ? photo : { src: photo, alt: "" };
    if (classification === "landscape") {
      landscapes.push(photoEntry);
    } else {
      portraits.push(photoEntry);
    }
  });

  let toggle = "portrait";
  while (portraits.length > 0 || landscapes.length > 0) {
    if (toggle === "portrait" && portraits.length > 0) {
      pages.push({ type: LAYOUT.PORTRAIT, photos: [portraits.shift()] });
      toggle = "landscape";
    } else if (landscapes.length > 0) {
      const two = [landscapes.shift(), landscapes.shift()].filter(Boolean);
      if (two.length > 0) {
        pages.push({ type: LAYOUT.LANDSCAPE, photos: two });
      }
      toggle = "portrait";
    } else if (portraits.length > 0) {
      pages.push({ type: LAYOUT.PORTRAIT, photos: [portraits.shift()] });
      toggle = "landscape";
    } else {
      break;
    }
  }

  if (pages.length % 2 !== 0) {
    pages.push({ type: LAYOUT.BLANK });
  }

  return pages;
}
