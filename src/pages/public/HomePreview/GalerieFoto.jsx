import { useTranslation } from "react-i18next";
import PreviewShell from "./PreviewShell";
import PreviewSupportFooter from "./PreviewSupportFooter";

/**
 * Photo gallery page — cover + title scaffold; album content comes next.
 */
const GalerieFoto = () => {
  const { t } = useTranslation();

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

        <section
          className="hp-section hp-despre-intro"
          aria-labelledby="hp-galerie-title"
        >
          <h1 id="hp-galerie-title" className="hp-despre-intro__title">
            {t("preview.gallery.title")}
          </h1>
          <p className="hp-despre-intro__subtitle">{t("preview.gallery.subtitle")}</p>
        </section>

        <PreviewSupportFooter />
      </main>
    </PreviewShell>
  );
};

export default GalerieFoto;
