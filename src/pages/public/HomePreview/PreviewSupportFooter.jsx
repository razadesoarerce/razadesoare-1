import { useEffect, useRef, useState } from "react";
import { SUPPORT_CARDS, SUPPORT_FORM_URL } from "./previewSupportData";

const SWIPE_CLOSE_PX = 56;

const SunRays = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 64 24" aria-hidden>
    <path
      d="M4 18 Q8 4 12 18 M16 18 Q20 2 24 18 M28 18 Q32 6 36 18 M40 18 Q44 2 48 18 M52 18 Q56 6 60 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

/** Shared Support strip + credits bar for all preview-site pages. */
const PreviewSupportFooter = () => {
  const [expanded, setExpanded] = useState(null);
  const swipeStart = useRef(null);

  useEffect(() => {
    if (!expanded) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setExpanded(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [expanded]);

  const closeExpanded = () => setExpanded(null);

  const onExpandTouchStart = (event) => {
    const touch = event.touches[0];
    if (!touch) return;
    swipeStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const onExpandTouchEnd = (event) => {
    const start = swipeStart.current;
    swipeStart.current = null;
    if (!start) return;
    const touch = event.changedTouches[0];
    if (!touch) return;
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    if (Math.abs(dx) >= SWIPE_CLOSE_PX && Math.abs(dx) > Math.abs(dy) * 1.25) {
      closeExpanded();
    }
  };

  return (
    <>
      <section className="hp-section hp-support" aria-labelledby="hp-support-title">
        <div className="hp-section__head">
          <SunRays className="hp-rays" />
          <h2 id="hp-support-title">Fii o rază de speranță</h2>
          <SunRays className="hp-rays" />
        </div>
        <div className="hp-support__frame">
          <a
            className="hp-support-btn hp-support-btn--tax"
            href={SUPPORT_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="hp-support-btn__badge" aria-hidden>
              3,5%
            </span>
            <span className="hp-support-btn__title">Redirecționează</span>
          </a>
          {SUPPORT_CARDS.map((card) => (
            <button
              key={card.title}
              type="button"
              className={`hp-support-btn hp-support-btn--${card.tone} ${
                expanded?.title === card.title ? "is-active" : ""
              }`}
              onClick={() => setExpanded(card)}
              aria-expanded={expanded?.title === card.title}
              aria-controls="hp-support-expanded"
            >
              <span className="hp-support-btn__badge" aria-hidden>
                {card.badge}
              </span>
              <span className="hp-support-btn__title">{card.title}</span>
            </button>
          ))}
        </div>
      </section>

      {expanded ? (
        <div
          className="hp-offer-expand"
          id="hp-support-expanded"
          role="dialog"
          aria-modal="true"
          aria-labelledby="hp-support-expand-title"
          onTouchStart={onExpandTouchStart}
          onTouchEnd={onExpandTouchEnd}
        >
          <button
            type="button"
            className="hp-offer-expand__backdrop"
            aria-label="Închide"
            onClick={closeExpanded}
          />
          <article
            className={`hp-offer-expand__panel hp-offer-expand__panel--${expanded.tone}`}
          >
            <div className="hp-offer-expand__handle" aria-hidden />
            <p className="hp-offer-expand__hint">
              Derulează pentru a citi · swipe stânga/dreapta sau tap în afară pentru
              a închide
            </p>
            <h3 id="hp-support-expand-title">
              {expanded.headline || expanded.title}
            </h3>
            <div className="hp-offer-expand__body">
              {(expanded.detailParagraphs || []).map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="hp-offer-expand__detail">
                  {paragraph}
                </p>
              ))}
            </div>
            <button
              type="button"
              className="hp-btn hp-btn--primary hp-offer-expand__close"
              onClick={closeExpanded}
            >
              Închide
            </button>
          </article>
        </div>
      ) : null}

      <footer className="hp-credits" aria-label="Echipa de realizare a site-ului">
        <div className="hp-credits__inner">
          <p className="hp-credits__brand">Școala Specială „Raza de Soare”</p>
          <ul className="hp-credits__list">
            <li>
              <span className="hp-credits__role">Dezvoltare web</span>
              <span className="hp-credits__name">Lolea Florentin Alin</span>
            </li>
            <li>
              <span className="hp-credits__role">Design vizual și multimedia</span>
              <span className="hp-credits__name">Roxin Mariana</span>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
};

export default PreviewSupportFooter;
