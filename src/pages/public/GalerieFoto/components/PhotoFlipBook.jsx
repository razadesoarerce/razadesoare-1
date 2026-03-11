import { useRef, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import { buildPageConfigs } from "./pageTemplates";
import {
  CoverPage,
  TitlePage,
  FirstSpreadRightPage,
  BlankPage,
  LAYOUT_COMPONENTS,
} from "./AlbumPageLayouts";
import "./PhotoFlipBook.css";

const COVER_IMAGE_INDEX = 7;
const FIRST_SPREAD_IMAGE_INDEX = 4;

const PhotoFlipBook = ({
  photos,
  width = 1200,
  height = 600,
  skipCover = false,
}) => {
  const bookRef = useRef(null);
  const hasAutoFlipped = useRef(false);

  const coverPhoto = photos[COVER_IMAGE_INDEX] ?? null;
  const firstSpreadPhoto = photos[FIRST_SPREAD_IMAGE_INDEX] ?? null;

  const contentPhotos = photos.filter(
    (_, i) => i !== COVER_IMAGE_INDEX && i !== FIRST_SPREAD_IMAGE_INDEX
  );

  const contentConfigs = buildPageConfigs(contentPhotos.length);

  let contentIndex = 0;

  const contentPageData = contentConfigs.map(({ layout, photoCount }) => {
    const slice = contentPhotos.slice(contentIndex, contentIndex + photoCount);
    contentIndex += photoCount;

    return {
      layout,
      photos: slice,
    };
  });

  const interiorPages = [
    { type: "title" },
    { type: "firstSpreadRight", photo: coverPhoto },
    ...contentPageData.map(({ layout, photos }) => ({
      type: "layout",
      layout,
      photos,
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

          if (page.type === "firstSpreadRight") {
            return <FirstSpreadRightPage key={i} photo={page.photo} />;
          }

          if (page.type === "blank") {
            return <BlankPage key={i} />;
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
