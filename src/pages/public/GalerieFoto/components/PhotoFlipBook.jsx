import { useRef, useEffect, useState } from "react";
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
  const [orientationMap, setOrientationMap] = useState({});
  const frozenLayoutRef = useRef(null);

  useEffect(() => {
    setOrientationMap({});
    frozenLayoutRef.current = null;
  }, [photos]);

  useEffect(() => {
    setOrientationMap({});
    frozenLayoutRef.current = null;
  }, []);

  function handleOrientation(index, orientation) {
    setOrientationMap((prev) => ({
      ...prev,
      [index]: orientation,
    }));
  }

  const heroPhoto = photos[HERO_INDEX];
  const contentPhotos = photos
    .filter((_, i) => i !== HERO_INDEX)
    .map((photo, index) => ({ ...photo, __contentIndex: index }));

  const orientationsComplete =
    contentPhotos.length > 0 &&
    Object.keys(orientationMap).length >= contentPhotos.length;

  const contentPageData = buildPageConfigs(contentPhotos, orientationMap);

  if (orientationsComplete && !frozenLayoutRef.current) {
    frozenLayoutRef.current = contentPageData;
  }
  const layoutToUse = frozenLayoutRef.current ?? contentPageData;

  const onPhotoOrientation = (photo, orientation) => {
    if (typeof photo.__contentIndex === "number") {
      handleOrientation(photo.__contentIndex, orientation);
    }
  };

  const layoutSignature =
    layoutToUse.length + "-" + layoutToUse.map((p) => p.layout).join(",");

  const interiorPages = [
    { type: "title" },
    { type: "hero", photo: heroPhoto },
    ...layoutToUse.map(({ layout, photos: pagePhotos, singleOrientation }) =>
      layout === "BLANK"
        ? { type: "blank" }
        : { type: "layout", layout, photos: pagePhotos, singleOrientation }
    ),
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
    <div className="photo-flipbook-wrap" style={{ position: "relative" }}>
      <HTMLFlipBook
        key={layoutSignature}
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

          return (
            <PageComponent
              key={i}
              photos={page.photos}
              singleOrientation={page.singleOrientation}
              onPhotoOrientation={onPhotoOrientation}
            />
          );
        })}
      </HTMLFlipBook>
    </div>
  );
};

export default PhotoFlipBook;
