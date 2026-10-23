import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const LEGAL_IDS = ["terms", "cookies", "privacy"];

const asSections = (value) => (Array.isArray(value) ? value : []);

/** White legal strip under credits — links expand content below on the same page. */
const PreviewLegalLinks = () => {
  const { t } = useTranslation();
  const [openId, setOpenId] = useState(null);
  const panelRef = useRef(null);

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

    // Wait a paint so the panel is laid out before scrolling
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

  return (
    <section className="hp-legal" aria-label={t("preview.legal.aria")}>
      <div className="hp-legal__inner">
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
                  <span>{t(`preview.legal.${id}.title`)}</span>
                  <span className="hp-legal__chevron" aria-hidden>
                    {isOpen ? "▴" : "▾"}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {openItem ? (
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
        ) : null}
      </div>
    </section>
  );
};

export default PreviewLegalLinks;
