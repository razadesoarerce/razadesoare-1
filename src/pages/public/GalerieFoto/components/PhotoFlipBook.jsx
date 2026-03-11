import { useRef, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import { buildPageConfigs } from "./pageTemplates";
import {
  CoverPage,
  TitlePage,
  BlankPage,
  LayoutA,
  LAYOUT_COMPONENTS,
} from "./AlbumPageLayouts";
import "./PhotoFlipBook.css";

const COVER_IMAGE_INDEX = 7;
const HERO_INDEX = 0;

const PhotoFlipBook = ({
  photos,
  width = 1200,
  height = 600,
  skipCover = false,
}) => {
  const bookRef = useRef(null);
  const hasAutoFlipped = useRef(false);

  const heroPhoto = photos[HERO_INDEX];
  const contentPhotos = photos.filter((_, i) => i !== HERO_INDEX);

  const contentConfigs = buildPageConfigs(contentPhotos);

  let contentIndex = 0;
  const contentPageData = contentConfigs.map(({ layout, photoCount }) => {
    const slice = contentPhotos.slice(contentIndex, contentIndex + photoCount);
    contentIndex += photoCount;
    return { layout, photos: slice };
  });

  const interiorPages = [
    { type: "title" },
    { type: "hero", photo: heroPhoto },
    ...contentPageData.map(({ layout, photos: pagePhotos }) => ({
      type: "layout",
      layout,
      photos: pagePhotos,
    })),
  ];

  const pages = interiorPages;

  while (pages.length < 2) pages.push({ type: "blank" });
  if (pages.length % 2 !== 0) pages.push({ type: "blank" });

  useEffect(() => {
    if (!skipCover || hasAutoFlipped.current) return;

    const timer = setTimeout(() => {
      const pf = bookRef.current?.pageFlip?.();

      if (pf && !hasAutoFlipped.current) {
        pf.turnToNextPage();
        hasAutoFlipped.current = true;
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [skipCover]);

  return (
    <div className="photo-flipbook-wrap">
      <HTMLFlipBook
        ref={bookRef}
        width={width}
        height={height}
        showCover={false}
        className="album-book"
        size="fixed"
        drawShadow
        flippingTime={600}
        usePortrait={false}
        maxShadowOpacity={0.5}
      >
        {pages.map((page, i) => {
          if (page.type === "cover") {
            return <CoverPage key={i} coverPhoto={page.coverPhoto} />;
          }

          if (page.type === "title") {
            return <TitlePage key={i} />;
          }

          if (page.type === "blank") {
            return <BlankPage key={i} />;
          }

          if (page.type === "hero") {
            return <LayoutA key={i} photos={[page.photo]} hero />;
          }

          const PageComponent =
            LAYOUT_COMPONENTS[page.layout] ?? LAYOUT_COMPONENTS.A;

          return <PageComponent key={i} photos={page.photos} />;
        })}
      </HTMLFlipBook>
    </div>
  );
};

export default PhotoFlipBook;
