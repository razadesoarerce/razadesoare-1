import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, Navigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PreviewShell from "./PreviewShell";
import PreviewSupportFooter from "./PreviewSupportFooter";
import { PREVIEW_GALERIE } from "./previewNav";
import { getGalleryAlbum } from "./galleryAlbums";

const SWIPE_PX = 48;
const SWIPE_RATIO = 1.2;

/**
 * Single album view — photo grid + blurred lightbox with swipe / arrows.
 */
const GalerieAlbum = () => {
  const { albumId } = useParams();
  const { t } = useTranslation();
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const touchRef = useRef(null);

  const album = useMemo(() => getGalleryAlbum(albumId), [albumId]);
  const photoCount = album?.photos?.length ?? 0;

  const closeLightbox = () => setLightboxIndex(null);
  const showPrev = () =>
    setLightboxIndex((i) => (i === null || !photoCount ? null : (i + photoCount - 1) % photoCount));
  const showNext = () =>
    setLightboxIndex((i) => (i === null || !photoCount ? null : (i + 1) % photoCount));

  useEffect(() => {
    if (lightboxIndex === null) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event) => {
      if (event.key === "Escape") closeLightbox();
      else if (event.key === "ArrowLeft") showPrev();
      else if (event.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [lightboxIndex, photoCount]);

  if (!album || !album.photos?.length) {
    return <Navigate to={PREVIEW_GALERIE} replace />;
  }

  const title = t(`preview.gallery.albums.${album.id}.title`);

  const onTouchStart = (event) => {
    const touch = event.changedTouches?.[0] ?? event.touches?.[0];
    if (!touch) return;
    touchRef.current = { x: touch.clientX, y: touch.clientY, ignored: false };
  };

  const onTouchMove = (event) => {
    const start = touchRef.current;
    if (!start || start.ignored) return;
    const touch = event.touches?.[0];
    if (!touch) return;
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dy) > 28 && Math.abs(dy) > Math.abs(dx) * 0.85) {
      start.ignored = true;
    }
  };

  const onTouchEnd = (event) => {
    const start = touchRef.current;
    touchRef.current = null;
    if (!start || start.ignored) return;
    const touch = event.changedTouches?.[0];
    if (!touch) return;
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) < SWIPE_PX) return;
    if (Math.abs(dx) < Math.abs(dy) * SWIPE_RATIO) return;
    if (dx < 0) showNext();
    else showPrev();
  };

  const lightbox =
    lightboxIndex !== null
      ? createPortal(
          <div
            className="hp-galerie-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={t("preview.gallery.lightboxAria", { title })}
            data-no-page-swipe
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onTouchCancel={onTouchEnd}
          >
            <button
              type="button"
              className="hp-galerie-lightbox__backdrop"
              aria-label={t("preview.chrome.close")}
              onClick={closeLightbox}
            />
            <div className="hp-galerie-lightbox__frame">
              <img
                src={album.photos[lightboxIndex]}
                alt={t("preview.gallery.photoAlt", {
                  title,
                  n: lightboxIndex + 1,
                })}
                draggable={false}
              />
              <p className="hp-galerie-lightbox__meta">
                {lightboxIndex + 1} / {album.photos.length}
              </p>
              <button
                type="button"
                className="hp-galerie-lightbox__close"
                onClick={closeLightbox}
                aria-label={t("preview.chrome.close")}
              >
                ×
              </button>
              <button
                type="button"
                className="hp-galerie-lightbox__nav is-prev"
                onClick={showPrev}
                aria-label={t("preview.gallery.prevPhoto")}
              >
                ‹
              </button>
              <button
                type="button"
                className="hp-galerie-lightbox__nav is-next"
                onClick={showNext}
                aria-label={t("preview.gallery.nextPhoto")}
              >
                ›
              </button>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <PreviewShell>
      <main className="hp-page hp-galerie-album">
        <header className="hp-section hp-despre-intro hp-galerie-album__header">
          <Link to={PREVIEW_GALERIE} className="hp-galerie-album__back">
            ← {t("preview.gallery.backToGallery")}
          </Link>
          <h1 className="hp-despre-intro__title hp-galerie-album__title">{title}</h1>
          <p className="hp-galerie-album__count">
            {t("preview.gallery.photoCount", { count: album.photos.length })}
          </p>
        </header>

        <section className="hp-section hp-galerie-album__grid" aria-label={title}>
          {album.photos.map((src, index) => (
            <button
              key={src}
              type="button"
              className="hp-galerie-album__thumb"
              onClick={() => setLightboxIndex(index)}
              aria-label={t("preview.gallery.openPhoto", {
                n: index + 1,
                total: album.photos.length,
              })}
            >
              <img
                src={src}
                alt={t("preview.gallery.photoAlt", {
                  title,
                  n: index + 1,
                })}
                loading="lazy"
              />
            </button>
          ))}
        </section>

        {lightbox}

        <PreviewSupportFooter />
      </main>
    </PreviewShell>
  );
};

export default GalerieAlbum;
