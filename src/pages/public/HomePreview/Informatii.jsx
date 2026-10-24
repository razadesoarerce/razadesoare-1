import { Fragment, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import PreviewShell from "./PreviewShell";
import PreviewSupportFooter from "./PreviewSupportFooter";
import PreviewPageHead from "./PreviewPageHead";

const CALENDAR_SRC = "/images/preview/informatii/calendar-an-scolar-2026-2027.png";

const INFO_CARD_META = [
  { id: "admitere", icon: "/images/preview/informatii/icon-admitere.png" },
  { id: "inscriere", icon: "/images/preview/informatii/icon-inscriere.png" },
  { id: "documente", icon: "/images/preview/informatii/icon-documente.png" },
  { id: "structura", icon: "/images/preview/informatii/icon-structura.png" },
];

const asStringList = (value) => (Array.isArray(value) ? value : []);

const DownloadPlaceholder = ({ label, downloadLabel }) => (
  <li className="hp-info-doc">
    <span className="hp-info-doc__name">{label}</span>
    <button type="button" className="hp-info-download" disabled>
      {downloadLabel}
    </button>
  </li>
);

/** Inline preview + full-screen lightbox (pan on phone for small calendar text). */
const ZoomableImage = ({ src, alt, zoomHint, zoomAria, closeAria, lightboxHint, closeLabel }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const lightbox = open
    ? createPortal(
        <div className="hp-info-lightbox" role="dialog" aria-modal="true" aria-label={alt}>
          <button
            type="button"
            className="hp-info-lightbox__backdrop"
            aria-label={closeAria}
            onClick={() => setOpen(false)}
          />
          <div className="hp-info-lightbox__bar">
            <p className="hp-info-lightbox__hint">{lightboxHint}</p>
            <button
              type="button"
              className="hp-info-lightbox__close"
              aria-label={closeLabel}
              onClick={() => setOpen(false)}
            >
              ×
            </button>
          </div>
          <div className="hp-info-lightbox__stage">
            <img src={src} alt={alt} />
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <button
        type="button"
        className="hp-info-zoom"
        onClick={() => setOpen(true)}
        aria-label={zoomAria}
      >
        <img src={src} alt="" loading="lazy" />
        <span className="hp-info-zoom__hint">{zoomHint}</span>
      </button>
      {lightbox}
    </>
  );
};

const CardPanel = ({ id, t }) => {
  const base = `preview.info.cards.${id}`;

  if (id === "admitere") {
    return (
      <>
        <h3 className="hp-info-panel__heading">{t(`${base}.heading`)}</h3>
        {asStringList(t(`${base}.paragraphs`, { returnObjects: true })).map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
      </>
    );
  }

  if (id === "inscriere") {
    return (
      <>
        <h3 className="hp-info-panel__heading">{t(`${base}.heading`)}</h3>
        <ul className="hp-info-list">
          {asStringList(t(`${base}.docs`, { returnObjects: true })).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>{t(`${base}.note`)}</p>
      </>
    );
  }

  if (id === "documente") {
    const legal = asStringList(t(`${base}.legal`, { returnObjects: true }));
    return (
      <>
        <p>{t(`${base}.intro`)}</p>
        <h3 className="hp-info-panel__heading">{t(`${base}.internalHeading`)}</h3>
        <ul className="hp-info-docs">
          {asStringList(t(`${base}.internalDocs`, { returnObjects: true })).map((label) => (
            <DownloadPlaceholder
              key={label}
              label={label}
              downloadLabel={t("preview.info.download")}
            />
          ))}
        </ul>
        <h3 className="hp-info-panel__heading">{t(`${base}.rightsHeading`)}</h3>
        <ul className="hp-info-legal">
          {legal.map((ref) => (
            <li key={ref.title}>
              <p className="hp-info-legal__title">{ref.title}</p>
              <p className="hp-info-legal__text">{ref.text}</p>
            </li>
          ))}
        </ul>
      </>
    );
  }

  const calendarAlt = t("preview.info.calendarAlt");
  return (
    <>
      <p>{t(`${base}.intro`)}</p>
      <h3 className="hp-info-panel__heading">{t(`${base}.heading`)}</h3>
      {asStringList(t(`${base}.paragraphs`, { returnObjects: true })).map((paragraph) => (
        <p key={paragraph.slice(0, 40)}>{paragraph}</p>
      ))}
      <ZoomableImage
        src={CALENDAR_SRC}
        alt={calendarAlt}
        zoomHint={t("preview.info.zoomHint")}
        zoomAria={t("preview.info.zoomAria", { alt: calendarAlt })}
        closeAria={t("preview.info.lightboxCloseAria")}
        lightboxHint={t("preview.info.lightboxHint")}
        closeLabel={t("preview.chrome.close")}
      />
    </>
  );
};

/** New-site Informații page — parallel to old /informatii/* routes. */
const Informatii = () => {
  const { t } = useTranslation();
  const [openId, setOpenId] = useState(null);

  const infoCards = INFO_CARD_META.map((meta) => ({
    ...meta,
    title: t(`preview.info.cards.${meta.id}.title`),
    text: t(`preview.info.cards.${meta.id}.text`),
  }));

  const toggleCard = (id) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <PreviewShell>
      <main className="hp-page">
        <section
          className="hp-hero hp-despre-hero hp-echipa-hero"
          aria-label={t("preview.info.heroAria")}
        >
          <img
            className="hp-echipa-hero__cover"
            src="/images/preview/informatii/cover.jpg"
            alt={t("preview.info.coverAlt")}
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
          className="hp-section hp-despre-intro hp-informatii"
          aria-labelledby="hp-informatii-title"
        >
          <PreviewPageHead
            id="hp-informatii-title"
            title={t("preview.info.title")}
            subtitle={t("preview.info.subtitle")}
            rays={1}
          />

          <div className="hp-informatii__intro">
            <div className="hp-informatii__intro-media">
              <img
                src="/images/preview/informatii/mid.jpg"
                alt={t("preview.info.midAlt")}
              />
            </div>
            <h2 className="hp-informatii__lead-title">{t("preview.info.leadTitle")}</h2>
            <p className="hp-informatii__lead-text">{t("preview.info.leadText")}</p>
          </div>

          <div className="hp-info-cards">
            {infoCards.map((card, index) => {
              const isOpen = openId === card.id;
              const panelId = `hp-info-panel-${card.id}`;

              return (
                <Fragment key={card.id}>
                  {index > 0 ? <hr className="hp-despre-rule" aria-hidden /> : null}
                  <article className={`hp-info-card ${isOpen ? "is-open" : ""}`}>
                    <button
                      type="button"
                      className="hp-info-card__toggle"
                      onClick={() => toggleCard(card.id)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                    >
                      <span className="hp-info-card__icon" aria-hidden>
                        <img src={card.icon} alt="" loading="lazy" />
                      </span>
                      <span className="hp-info-card__body">
                        <span className="hp-info-card__title">{card.title}</span>
                        <span className="hp-info-card__text">{card.text}</span>
                      </span>
                      <span className="hp-info-card__arrow" aria-hidden>
                        <svg viewBox="0 0 24 24" width="16" height="16">
                          <path
                            d="M6 9l6 6 6-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>

                    <div className="hp-info-card__collapse" id={panelId}>
                      <div className="hp-info-card__panel">
                        <CardPanel id={card.id} t={t} />
                      </div>
                    </div>
                  </article>
                </Fragment>
              );
            })}
          </div>
        </section>

        <PreviewSupportFooter />
      </main>
    </PreviewShell>
  );
};

export default Informatii;
