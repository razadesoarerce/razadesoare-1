import { useRef, useEffect, useState, useMemo } from "react";
import HTMLFlipBook from "react-pageflip";
import { buildAlbumPages, LAYOUT } from "./albumLayoutGenerator";
import {
  CoverPage,
  TitlePage,
  BlankPage,
  PortraitPage,
  LandscapePage,
  PanoramaLeftPage,
  PanoramaRightPage,
} from "./AlbumPageLayouts";
import "./PhotoFlipBook.css";

/**
 * Normalize props to album shape: { title, message, cover, photos: [{ src, width?, height?, alt? }] }.
 */
function normalizeAlbum(album, photos) {
  if (album && (album.photos || album.title != null)) {
    const photosList = album.photos ?? [];
    const cover = album.cover ?? photosList[0];
    return {
      title: album.title ?? "",
      message: album.message ?? "",
      cover: cover,
      photos: photosList.map((p) =>
        typeof p === "object" && p !== null
          ? { src: p.src ?? p.url, width: p.width, height: p.height, alt: p.alt ?? "" }
          : { src: p, alt: "" }
      ),
    };
  }
  if (Array.isArray(photos) && photos.length > 0) {
    const list = photos.map((p) =>
      typeof p === "object" && p !== null
        ? { src: p.src ?? p.url, width: p.width, height: p.height, alt: p.alt ?? "" }
        : { src: p, alt: "" }
    );
    return { title: "", message: "", cover: list[0], photos: list };
  }
  return { title: "", message: "", cover: null, photos: [] };
}

const PhotoFlipBook = ({
  album: albumProp,
  photos: photosProp,
  pageWidth: pageWidthProp,
  pageHeight: pageHeightProp,
  skipCover = false,
  usePortrait = false,
}) => {
  const pageWidth = pageWidthProp ?? 450;
  const pageHeight = pageHeightProp ?? 600;
  const bookRef = useRef(null);
  const hasAutoFlipped = useRef(false);
  const pagesCacheRef = useRef(null);
  const ratioMapLoadedRef = useRef(false);
  const [ratioMap, setRatioMap] = useState({});

  const album = normalizeAlbum(albumProp, photosProp);
  console.log("Flipbook album:", album);

  const coverSrc = typeof album.cover === "object" && album.cover?.src != null ? album.cover.src : album.cover;
  const contentPhotos = (album.photos ?? []).filter((p) => {
    const src = typeof p === "object" ? p?.src : p;
    return src != null && src !== coverSrc;
  });
  const contentPhotosKey = useMemo(
    () => contentPhotos.map((p) => (typeof p === "object" ? p?.src : p)).filter(Boolean).join("\0"),
    [albumProp?.id, albumProp?.photos?.length, coverSrc]
  );

  useEffect(() => {
    setRatioMap({});
    ratioMapLoadedRef.current = false;
    pagesCacheRef.current = null;
  }, [albumProp?.id]);

  useEffect(() => {
    if (ratioMapLoadedRef.current) return;
    if (contentPhotos.length === 0) return;
    ratioMapLoadedRef.current = true;
    let cancelled = false;
    const next = {};
    let loaded = 0;
    const total = contentPhotos.length;
    contentPhotos.forEach((photo, index) => {
      const src = typeof photo === "object" ? photo?.src : photo;
      if (!src) return;
      const img = new Image();
      img.onload = () => {
        if (cancelled) return;
        next[index] = img.naturalWidth / img.naturalHeight;
        loaded++;
        if (loaded === total) {
          setRatioMap((prev) => ({ ...prev, ...next }));
        }
      };
      img.onerror = () => {
        if (cancelled) return;
        next[index] = 1;
        loaded++;
        if (loaded === total) {
          setRatioMap((prev) => ({ ...prev, ...next }));
        }
      };
      img.src = src;
    });
    return () => { cancelled = true; };
  }, [contentPhotosKey]);

  const hasRatioMap = contentPhotos.length === 0 || Object.keys(ratioMap).length >= contentPhotos.length;
  if (!pagesCacheRef.current && hasRatioMap && album.photos.length > 0) {
    pagesCacheRef.current = buildAlbumPages(album, ratioMap);
  }
  const pages = pagesCacheRef.current || [];

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

  const layoutSignature = pages.length + "-" + pages.map((p) => p.type).join(",");

  return (
    <div className="photo-flipbook-wrap">
      <HTMLFlipBook
        key={layoutSignature}
        ref={bookRef}
        width={pageWidth}
        height={pageHeight}
        size="fixed"
        drawShadow={true}
        flippingTime={600}
        maxShadowOpacity={0.5}
        showCover={false}
        className="album-book"
        usePortrait={usePortrait}
      >
        {pages.map((page, i) => {
          if (page.type === LAYOUT.TITLE) {
            return <TitlePage key={i} text={page.text} />;
          }
          if (page.type === LAYOUT.COVER) {
            return <CoverPage key={i} coverPhoto={page.photo} />;
          }
          if (page.type === LAYOUT.BLANK) {
            return <BlankPage key={i} />;
          }
          if (page.type === LAYOUT.PORTRAIT) {
            return <PortraitPage key={i} photos={page.photos} />;
          }
          if (page.type === LAYOUT.LANDSCAPE) {
            return <LandscapePage key={i} photos={page.photos} />;
          }
          if (page.type === LAYOUT.PANORAMA_LEFT) {
            return <PanoramaLeftPage key={i} photo={page.photo} />;
          }
          if (page.type === LAYOUT.PANORAMA_RIGHT) {
            return <PanoramaRightPage key={i} photo={page.photo} />;
          }
          return <BlankPage key={i} />;
        })}
      </HTMLFlipBook>
    </div>
  );
};

export default PhotoFlipBook;
