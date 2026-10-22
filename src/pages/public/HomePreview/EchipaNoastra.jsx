import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import PreviewShell from "./PreviewShell";
import PreviewSupportFooter from "./PreviewSupportFooter";
import { ECHIPA_OFFER_CARDS, STAFF_CATEGORIES } from "./echipaOfferData";

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

const ServiceIcon = ({ name }) => {
  if (name === "book") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden>
        <path
          fill="currentColor"
          d="M10 8h16a6 6 0 0 1 6 6v24a4 4 0 0 0-4-4H10V8zm28 0H26a6 6 0 0 0-6 6v24a4 4 0 0 1 4-4h14V8z"
          opacity="0.9"
        />
      </svg>
    );
  }
  if (name === "people") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden>
        <circle cx="16" cy="16" r="5" fill="currentColor" />
        <circle cx="32" cy="16" r="5" fill="currentColor" />
        <circle cx="24" cy="14" r="5.5" fill="currentColor" />
        <path
          fill="currentColor"
          d="M8 36c0-4.4 3.6-8 8-8h0c1.7 0 3.3.5 4.6 1.5A9.9 9.9 0 0 0 24 28c1.7 0 3.3.4 4.7 1.2A8 8 0 0 1 32 28h0c4.4 0 8 3.6 8 8v2H8v-2z"
        />
      </svg>
    );
  }
  if (name === "speech") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden>
        <path
          fill="currentColor"
          d="M8 12h32a4 4 0 0 1 4 4v14a4 4 0 0 1-4 4H22l-8 8v-8H8a4 4 0 0 1-4-4V16a4 4 0 0 1 4-4z"
        />
        <circle cx="16" cy="23" r="2.2" fill="#fff" />
        <circle cx="24" cy="23" r="2.2" fill="#fff" />
        <circle cx="32" cy="23" r="2.2" fill="#fff" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 48 48" aria-hidden>
      <circle cx="24" cy="24" r="16" fill="none" stroke="currentColor" strokeWidth="3" />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        d="M14 28c3-6 6-9 10-9s7 3 10 9"
      />
      <circle cx="18" cy="18" r="2" fill="currentColor" />
      <circle cx="30" cy="18" r="2" fill="currentColor" />
    </svg>
  );
};

/** New-site team page — parallel to old /despre/echipa. */
const EchipaNoastra = () => {
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
    <PreviewShell className={expanded ? "hp--offer-open" : ""}>
      <main className="hp-page">
        <section className="hp-hero hp-despre-hero hp-echipa-hero" aria-label="Echipa noastră">
          <img
            className="hp-echipa-hero__cover"
            src="/images/preview/echipa/cover.jpg"
            alt="Echipa Raza de Soare alături de elevi în activități de terapie și învățare"
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

        <section className="hp-section hp-offer hp-echipa-offer" aria-labelledby="hp-echipa-offer-title">
          <div className="hp-section__head">
            <SunRays className="hp-rays" />
            <h2 id="hp-echipa-offer-title">Ce oferim</h2>
            <SunRays className="hp-rays" />
          </div>
          <p className="hp-section__lead">
            Servicii educaționale și de specialitate pentru fiecare copil.
          </p>
          <div className="hp-offer__carousel">
            <Swiper
              modules={[Pagination]}
              slidesPerView={2}
              spaceBetween={12}
              pagination={{ clickable: true }}
              grabCursor
              className="hp-offer-swiper"
              onTouchStart={() => {
                if (expanded) closeExpanded();
              }}
              onSlideChange={() => {
                if (expanded) closeExpanded();
              }}
            >
              {ECHIPA_OFFER_CARDS.map((card) => (
                <SwiperSlide key={card.title}>
                  <button
                    type="button"
                    className={`hp-offer-card hp-offer-card--${card.tone} ${
                      expanded?.title === card.title ? "is-active" : ""
                    }`}
                    onClick={() => setExpanded(card)}
                    aria-expanded={expanded?.title === card.title}
                    aria-controls="hp-echipa-offer-expanded"
                  >
                    <span className="hp-offer-card__icon" aria-hidden>
                      <ServiceIcon name={card.icon} />
                    </span>
                    <span className="hp-offer-card__title">{card.title}</span>
                    <span className="hp-offer-card__text">{card.text}</span>
                    <span className="hp-offer-card__go" aria-hidden>
                      →
                    </span>
                  </button>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        <section className="hp-section hp-echipa-specialisti" aria-labelledby="hp-specialisti-title">
          <div className="hp-echipa-specialisti__banner">
            <h2 id="hp-specialisti-title">Specialiștii noștri</h2>
            <p>
              O echipă de oameni dedicați, cu experiență în educație specială,
              terapii și sprijin pentru familii — uniți de grijă față de fiecare
              copil.
            </p>
          </div>

          {STAFF_CATEGORIES.map((category) => {
            const slides =
              category.members?.length > 0
                ? category.members
                : [
                    { name: null, role: null, photo: null, placeholder: true },
                    { name: null, role: null, photo: null, placeholder: true },
                    { name: null, role: null, photo: null, placeholder: true },
                    { name: null, role: null, photo: null, placeholder: true },
                  ];

            return (
              <div key={category.id} className="hp-echipa-staff">
                <h3 className="hp-echipa-staff__title">{category.title}</h3>
                <Swiper
                  modules={[Pagination]}
                  slidesPerView={2}
                  spaceBetween={12}
                  pagination={{ clickable: true }}
                  grabCursor
                  breakpoints={{
                    640: { slidesPerView: 3, spaceBetween: 14 },
                    900: { slidesPerView: 4, spaceBetween: 16 },
                  }}
                  className="hp-echipa-staff__swiper"
                >
                  {slides.map((member, slot) => (
                    <SwiperSlide
                      key={
                        member.photo
                          ? member.photo
                          : `${category.id}-ph-${slot}`
                      }
                    >
                      <article className="hp-echipa-staff__card">
                        {member.photo ? (
                          <img
                            className="hp-echipa-staff__photo"
                            src={member.photo}
                            alt={member.name}
                            loading="lazy"
                          />
                        ) : (
                          <div
                            className="hp-echipa-staff__photo hp-echipa-staff__photo--empty"
                            aria-hidden
                          />
                        )}
                        {member.name ? (
                          <div className="hp-echipa-staff__caption">
                            <p className="hp-echipa-staff__name">{member.name}</p>
                            <p className="hp-echipa-staff__role">{member.role}</p>
                          </div>
                        ) : (
                          <p className="hp-echipa-staff__placeholder">
                            Foto în curând
                          </p>
                        )}
                      </article>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            );
          })}
        </section>

        {expanded ? (
          <div
            className="hp-offer-expand"
            id="hp-echipa-offer-expanded"
            role="dialog"
            aria-modal="true"
            aria-labelledby="hp-echipa-expand-title"
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
                Derulează pentru a citi · swipe stânga/dreapta sau tap în afară
                pentru a închide
              </p>
              <div className="hp-offer-expand__icon" aria-hidden>
                <ServiceIcon name={expanded.icon} />
              </div>
              <h3 id="hp-echipa-expand-title">
                {expanded.headline || expanded.title}
              </h3>
              <div className="hp-offer-expand__body">
                {(expanded.blocks || []).map((block, index) => (
                  <div key={`${expanded.title}-block-${index}`} className="hp-echipa-expand-block">
                    {block.heading ? (
                      <h4 className="hp-echipa-expand-block__heading">
                        {block.heading}
                      </h4>
                    ) : null}
                    {(block.paragraphs || []).map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 40)}
                        className="hp-offer-expand__detail"
                      >
                        {paragraph}
                      </p>
                    ))}
                    {block.list?.length ? (
                      <ul className="hp-offer-expand__list">
                        {block.list.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : null}
                    {block.items?.map((item) => (
                      <div key={item.title} className="hp-echipa-expand-item">
                        <p className="hp-echipa-expand-item__title">{item.title}</p>
                        <p className="hp-offer-expand__detail">{item.text}</p>
                      </div>
                    ))}
                  </div>
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

        <PreviewSupportFooter />
      </main>
    </PreviewShell>
  );
};

export default EchipaNoastra;
