/**
 * Educational blog categories + articles for /preview/blog.
 * Copy comes from i18n (`preview.blog`). Cover paths stay here.
 */

/** Horizontal filter chips — `categoryId: null` = show all sections. */
export const BLOG_FILTERS = [
  { id: "toate", categoryId: null },
  { id: "sfaturi", categoryId: "sfaturi-parinti" },
  { id: "educatie", categoryId: "educatie-speciala" },
  { id: "psihologie", categoryId: "psihologie" },
  { id: "logopedie", categoryId: "logopedie" },
  { id: "kinetoterapie", categoryId: "kinetoterapie" },
];

export const BLOG_CATEGORIES = [
  {
    id: "sfaturi-parinti",
    articles: [
      {
        id: "sfaturi-parinti-1",
        cover: "/images/preview/life-carusel-4.jpg",
      },
    ],
  },
  {
    id: "educatie-speciala",
    articles: [
      {
        id: "educatie-speciala-1",
        cover: "/images/preview/life-carusel-3.jpg",
      },
    ],
  },
  {
    id: "psihologie",
    articles: [
      {
        id: "psihologie-1",
        cover: "/images/preview/life-carusel-2.jpg",
      },
    ],
  },
  {
    id: "logopedie",
    articles: [
      {
        id: "logopedie-1",
        cover: "/images/preview/life-carusel-1.jpg",
      },
    ],
  },
  {
    id: "kinetoterapie",
    articles: [
      {
        id: "kinetoterapie-1",
        cover: "/images/preview/life-carusel-5.jpg",
      },
    ],
  },
];
