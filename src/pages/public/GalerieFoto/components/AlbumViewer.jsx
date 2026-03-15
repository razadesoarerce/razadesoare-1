import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import PhotoFlipBook from "./PhotoFlipBook";
import MobileAlbumViewer from "./MobileAlbumViewer";
import "./AlbumViewer.css";

const useMobile = () => {
  const [mobile, setMobile] = useState(typeof window !== "undefined" && window.innerWidth < 768);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(mq.matches);
    mq.addEventListener("change", update);
    update();
    return () => mq.removeEventListener("change", update);
  }, []);
  return mobile;
};

const AlbumViewer = ({ album, onClose }) => {
  const containerRef = useRef(null);
  const [flipSize, setFlipSize] = useState({ pageWidth: 450, pageHeight: 600 });
  const isMobile = useMobile();

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateSize = () => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const containerWidth = rect.width;
      const containerHeight = rect.height;

      if (containerWidth <= 0 || containerHeight <= 0) return;

      // Page ratio must always be 3:4
      // Book ratio must always be 6:4 (two pages)
      const pageWidthFromHeight = (containerHeight * 3) / 4;
      const pageHeightFromWidth = (containerWidth / 2) * (4 / 3);

      let pageWidth;
      let pageHeight;

      if (pageWidthFromHeight * 2 <= containerWidth) {
        pageWidth = pageWidthFromHeight;
        pageHeight = containerHeight;
      } else {
        pageWidth = containerWidth / 2;
        pageHeight = pageHeightFromWidth;
      }

      setFlipSize({ pageWidth, pageHeight });
    };

    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(el);
    return () => ro.disconnect();
  }, [album?.id]);

  if (!album) return null;

  const albumData = {
    title: album.title ?? "",
    message: album.message ?? "",
    cover: album.cover ?? album.photos?.[0],
    photos: (album.photos ?? []).map((p) =>
      typeof p === "object" && p !== null
        ? { src: p.src ?? p.url, width: p.width, height: p.height, alt: p.alt ?? "" }
        : { src: p, alt: "" }
    ),
  };

  const content = (
    <div
      className="album-viewer-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="album-viewer-content"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="album-viewer-header">
          <h2 className="album-viewer-title">{album.title}</h2>
          <button
            className="album-viewer-close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </header>

        <div className="album-viewer-container" ref={containerRef}>
          {isMobile ? (
            <MobileAlbumViewer photos={albumData.photos} onClose={onClose} />
          ) : (
            <PhotoFlipBook
              key={album.id}
              album={albumData}
              pageWidth={flipSize.pageWidth}
              pageHeight={flipSize.pageHeight}
              usePortrait={isMobile}
            />
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
};

export default AlbumViewer;
