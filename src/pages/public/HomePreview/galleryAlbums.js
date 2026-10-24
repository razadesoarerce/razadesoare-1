/**
 * Preview gallery albums — ordered newest → oldest.
 * Prepend new albums at the top of this array so they appear first.
 * Copy lives in i18n (`preview.gallery.albums`).
 */
export const GALLERY_ALBUMS = [
  {
    id: "promotia-2026",
    cover: "/images/preview/galerie/promotia-2026/02.jpg",
    accent: "sky",
    photos: [
      "/images/preview/galerie/promotia-2026/01.jpg",
      "/images/preview/galerie/promotia-2026/02.jpg",
      "/images/preview/galerie/promotia-2026/03.jpg",
      "/images/preview/galerie/promotia-2026/04.jpg",
      "/images/preview/galerie/promotia-2026/05.jpg",
      "/images/preview/galerie/promotia-2026/06.jpg",
      "/images/preview/galerie/promotia-2026/07.jpg",
    ],
  },
  {
    id: "8-martie",
    cover: "/images/preview/galerie/8-martie/01.jpg",
    accent: "yellow",
    photos: [
      "/images/preview/galerie/8-martie/01.jpg",
      "/images/preview/galerie/8-martie/02.jpg",
      "/images/preview/galerie/8-martie/03.jpg",
      "/images/preview/galerie/8-martie/04.jpg",
      "/images/preview/galerie/8-martie/05.jpg",
    ],
  },
  {
    id: "terapie-joaca",
    cover: "/images/preview/life-carusel-3.jpg",
    accent: "pink",
    photos: [],
  },
  {
    id: "ateliere-creative",
    cover: "/images/preview/life-carusel-4.jpg",
    accent: "mint",
    photos: [],
  },
];

export const getGalleryAlbum = (id) =>
  GALLERY_ALBUMS.find((album) => album.id === id) ?? null;

export const galleryAlbumPath = (id) => `/preview/galerie-foto/${id}`;
