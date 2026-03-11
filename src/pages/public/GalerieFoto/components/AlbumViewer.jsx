import { useEffect } from "react";
import { createPortal } from "react-dom";
import PhotoFlipBook from "./PhotoFlipBook";
import "./AlbumViewer.css";

const AlbumViewer = ({ album, onClose }) => {
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

  if (!album) return null;

  const photos = album.photos ?? [];

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

        <div className="album-viewer-container">
          <PhotoFlipBook
            photos={photos}
            width={650}
            height={600}
          />
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
};

export default AlbumViewer;
