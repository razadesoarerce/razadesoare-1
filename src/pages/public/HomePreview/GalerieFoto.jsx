import { useTranslation } from "react-i18next";
import PreviewShell from "./PreviewShell";
import PreviewSupportFooter from "./PreviewSupportFooter";
import { GALLERY_ALBUMS } from "./galleryAlbums";

const TitleSpark = () => (
  <svg className="hp-galerie__spark" viewBox="0 0 32 32" aria-hidden>
    <g stroke="#f5c542" strokeWidth="2.4" strokeLinecap="round">
      <line x1="16" y1="4" x2="16" y2="11" />
      <line x1="24.5" y1="7.5" x2="20" y2="12.5" />
      <line x1="27.5" y1="16" x2="21" y2="16" />
    </g>
  </svg>
);

/**
 * Photo gallery — hero, title block, album cards (placeholders until real covers/photos).
 */
const GalerieFoto = () => {
  const { t } = useTranslation();

  const albums = GALLERY_ALBUMS.map((album) => ({
    ...album,
    title: t(`preview.gallery.albums.${album.id}.title`),
    coverAlt: t(`preview.gallery.albums.${album.id}.coverAlt`),
  }));

  return (
    <PreviewShell>
      <main className="hp-page hp-galerie">
        <section
          className="hp-hero hp-despre-hero hp-echipa-hero"
          aria-label={t("preview.gallery.heroAria")}
        >
          <img
            className="hp-echipa-hero__cover hp-galerie-hero__cover"
            src="/images/preview/galerie/cover.jpg"
            alt={t("preview.gallery.coverAlt")}
          />
          <div className="hp-hero__shade hp-despre-hero__shade" aria-hidden />
          <svg
            className="hp-hero__wave"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d="M0,72 C180,108 360,108 540,78 C720,48 900,36 1080,58 C1260,80 1350,92 1440,78 L1440,122 L0,122 Z"
              fill="#ffffff"
            />
          </svg>
        </section>

        <header className="hp-section hp-galerie__header" aria-labelledby="hp-galerie-title">
          <TitleSpark />
          <h1 id="hp-galerie-title" className="hp-galerie__title">
            {t("preview.gallery.title")}
          </h1>
          <p className="hp-galerie__subtitle">{t("preview.gallery.subtitle")}</p>
        </header>

        <section
          className="hp-section hp-galerie__grid"
          aria-label={t("preview.gallery.albumsAria")}
        >
          {albums.map((album) => (
            <article
              key={album.id}
              className={`hp-galerie-card hp-galerie-card--${album.accent}`}
            >
              <div className="hp-galerie-card__media">
                <img src={album.cover} alt={album.coverAlt} loading="lazy" />
              </div>
              <div className="hp-galerie-card__body">
                <div className="hp-galerie-card__text">
                  <h2 className="hp-galerie-card__title">{album.title}</h2>
                  <span className="hp-galerie-card__link">{t("preview.gallery.seeAlbum")}</span>
                </div>
                <span className="hp-galerie-card__go" aria-hidden>
                  →
                </span>
              </div>
            </article>
          ))}
        </section>

        <PreviewSupportFooter />
      </main>
    </PreviewShell>
  );
};

export default GalerieFoto;
