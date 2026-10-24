import { useMemo, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PreviewShell from "./PreviewShell";
import PreviewSupportFooter from "./PreviewSupportFooter";
import { PREVIEW_GALERIE } from "./previewNav";
import { getGalleryAlbum } from "./galleryAlbums";

/**
 * Single album view — photo grid + simple lightbox.
 */
const GalerieAlbum = () => {
  const { albumId } = useParams();
  const { t } = useTranslation();
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const album = useMemo(() => getGalleryAlbum(albumId), [albumId]);

  if (!album || !album.photos?.length) {
    return <Navigate to={PREVIEW_GALERIE} replace />;
  }

  const title = t(`preview.gallery.albums.${album.id}.title`);
  const closeLightbox = () => setLightboxIndex(null);
  const showPrev = () =>
    setLightboxIndex((i) => (i === null ? null : (i + album.photos.length - 1) % album.photos.length));
  const showNext = () =>
    setLightboxIndex((i) => (i === null ? null : (i + 1) % album.photos.length));

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

        <section
          className="hp-section hp-galerie-album__grid"
          aria-label={title}
        >
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

        {lightboxIndex !== null ? (
          <div
            className="hp-galerie-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={t("preview.gallery.lightboxAria", { title })}
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
          </div>
        ) : null}

        <PreviewSupportFooter />
      </main>
    </PreviewShell>
  );
};

export default GalerieAlbum;
