/**
 * Educational blog categories + articles for /preview/blog.
 * Add articles over time — each category carousel grows automatically.
 * Cover paths are temporary placeholders until final photos are provided.
 */

/** Horizontal filter chips — `categoryId: null` = show all sections. */
export const BLOG_FILTERS = [
  { id: "toate", label: "Toate", categoryId: null },
  { id: "sfaturi", label: "Sfaturi", categoryId: "sfaturi-parinti" },
  { id: "educatie", label: "Educație", categoryId: "educatie-speciala" },
  { id: "psihologie", label: "Psihologie", categoryId: "psihologie" },
  { id: "logopedie", label: "Logopedie", categoryId: "logopedie" },
  { id: "kinetoterapie", label: "Kinetoterapie", categoryId: "kinetoterapie" },
];

export const BLOG_CATEGORIES = [
  {
    id: "sfaturi-parinti",
    title: "Sfaturi pentru părinți",
    articles: [
      {
        id: "sfaturi-parinti-1",
        title: "Cum putem crea o rutină zilnică liniștitoare pentru copil",
        cover: "/images/preview/life-carusel-4.jpg",
        coverAlt: "Joc împreună la masă",
      },
    ],
  },
  {
    id: "educatie-speciala",
    title: "Educație specială",
    articles: [
      {
        id: "educatie-speciala-1",
        title: "Activități pentru dezvoltarea atenției și concentrării",
        cover: "/images/preview/life-carusel-3.jpg",
        coverAlt: "Activitate cu carte senzorială",
      },
    ],
  },
  {
    id: "psihologie",
    title: "Psihologie",
    articles: [
      {
        id: "psihologie-1",
        title: "Cum îi ajutăm pe copii să își gestioneze emoțiile",
        cover: "/images/preview/life-carusel-2.jpg",
        coverAlt: "Joc educativ la masă",
      },
    ],
  },
  {
    id: "logopedie",
    title: "Logopedie",
    articles: [
      {
        id: "logopedie-1",
        title: "Cum stimulăm vorbirea la copii prin joc",
        cover: "/images/preview/life-carusel-1.jpg",
        coverAlt: "Activitate creativă ghidată cu un copil",
      },
    ],
  },
  {
    id: "kinetoterapie",
    title: "Kinetoterapie",
    articles: [
      {
        id: "kinetoterapie-1",
        title: "Exerciții simple pentru dezvoltarea motricității la copii",
        cover: "/images/preview/life-carusel-5.jpg",
        coverAlt: "Activitate de mișcare ghidată",
      },
    ],
  },
];
