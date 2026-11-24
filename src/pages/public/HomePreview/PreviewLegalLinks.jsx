import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { trackSiteViewOncePerDay } from "../../../services/siteViewsService";

const LEGAL_IDS = ["terms", "cookies", "privacy"];

const asSections = (value) => (Array.isArray(value) ? value : []);

const formatVisitors = (count, locale) => {
  try {
    return new Intl.NumberFormat(locale?.startsWith("en") ? "en-GB" : "ro-RO").format(
      count
    );
  } catch {
    return String(count);
  }
};

/**
 * Legal links + optional visitor counter.
 * `inline` — links only (desktop credits row). Visitors render via `showVisitors`
 * so they can sit outside `display: contents` layouts.
 * `trackViews` — set false on companion instances so only one mount hits Firestore.
 */
const PreviewLegalLinks = ({
  inline = false,
  showVisitors = true,
  visitorsOnly = false,
  trackViews = true,
} = {}) => {
  const { t, i18n } = useTranslation();
  const [openId, setOpenId] = useState(null);
  const [visitors, setVisitors] = useState(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!trackViews) return undefined;
    let cancelled = false;
    // Service dedupes concurrent calls; once-per-day gate is in localStorage.
    trackSiteViewOncePerDay()
      .then((total) => {
        if (cancelled) return;
        if (typeof total === "number" && total > 0) setVisitors(total);
      })
      .catch(() => {
        /* keep hidden if Firestore is unavailable */
      });
    return () => {
      cancelled = true;
    };
  }, [trackViews]);

  const openItem = openId
    ? {
        id: openId,
        title: t(`preview.legal.${openId}.title`),
        updated: t(`preview.legal.${openId}.updated`, { defaultValue: "" }),
        sections: asSections(
          t(`preview.legal.${openId}.sections`, { returnObjects: true })
        ),
      }
    : null;

  useEffect(() => {
    if (!openId || !panelRef.current) return undefined;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const node = panelRef.current;

    const frameId = window.requestAnimationFrame(() => {
      node.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
        inline: "nearest",
      });
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [openId]);

  const onToggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const visitorsEl =
    showVisitors && visitors != null ? (
      <p className="hp-legal__visitors" aria-label={t("preview.legal.visitorsAria")}>
        {t("preview.legal.visitors", {
          count: formatVisitors(visitors, i18n.language),
        })}
      </p>
    ) : null;

  if (visitorsOnly) {
    return visitorsEl;
  }

  const links = (
    <ul className="hp-legal__links">
      {LEGAL_IDS.map((id) => {
        const isOpen = openId === id;
        return (
          <li key={id}>
            <button
              type="button"
              className={`hp-legal__link${isOpen ? " is-open" : ""}`}
              aria-expanded={isOpen}
              aria-controls={`hp-legal-panel-${id}`}
              id={`hp-legal-trigger-${id}`}
              onClick={() => onToggle(id)}
            >
              {t(`preview.legal.${id}.title`)}
            </button>
          </li>
        );
      })}
    </ul>
  );

  const panel = openItem ? (
    <div
      ref={panelRef}
      className="hp-legal__panel is-revealed"
      id={`hp-legal-panel-${openItem.id}`}
      role="region"
      aria-labelledby={`hp-legal-trigger-${openItem.id}`}
      tabIndex={-1}
    >
      <h3 className="hp-legal__panel-title">{openItem.title}</h3>
      {openItem.updated ? (
        <p className="hp-legal__updated">{openItem.updated}</p>
      ) : null}
      <div className="hp-legal__panel-body">
        {openItem.sections.map((section, index) => (
          <div
            key={`${openItem.id}-section-${index}`}
            className="hp-legal__section"
          >
            {section.heading ? (
              <h4 className="hp-legal__section-heading">{section.heading}</h4>
            ) : null}
            {(section.paragraphs || []).map((paragraph, pIndex) => (
              <p key={`${openItem.id}-${index}-${pIndex}`}>{paragraph}</p>
            ))}
          </div>
        ))}
      </div>
      <button
        type="button"
        className="hp-legal__collapse"
        onClick={() => setOpenId(null)}
      >
        {t("preview.legal.collapse")}
      </button>
    </div>
  ) : null;

  if (inline) {
    return (
      <div className="hp-legal hp-legal--inline" aria-label={t("preview.legal.aria")}>
        {links}
        {panel}
        {showVisitors ? visitorsEl : null}
      </div>
    );
  }

  return (
    <section className="hp-legal" aria-label={t("preview.legal.aria")}>
      <div className="hp-legal__inner">
        {links}
        {panel}
        {showVisitors ? visitorsEl : null}
      </div>
    </section>
  );
};

export default PreviewLegalLinks;
