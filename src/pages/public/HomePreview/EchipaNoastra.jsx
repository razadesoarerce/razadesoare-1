import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import PreviewShell from "./PreviewShell";
import PreviewSupportFooter from "./PreviewSupportFooter";
import PreviewPageHead from "./PreviewPageHead";
import { ECHIPA_OFFER_META, STAFF_CATEGORIES } from "./echipaOfferData";

const SWIPE_CLOSE_PX = 56;

const asBlocks = (value) => (Array.isArray(value) ? value : []);

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
  const { t } = useTranslation();
  const [expandedId, setExpandedId] = useState(null);
  const swipeStart = useRef(null);

  const offerCards = ECHIPA_OFFER_META.map((meta) => {
    const base = `preview.team.offers.${meta.id}`;
    return {
      ...meta,
      title: t(`${base}.title`),
      text: t(`${base}.text`),
      headline: t(`${base}.headline`),
      blocks: asBlocks(t(`${base}.blocks`, { returnObjects: true })),
    };
  });

  const expanded = expandedId
    ? offerCards.find((card) => card.id === expandedId)
    : null;

  const staffCategories = STAFF_CATEGORIES.map((category) => ({
    ...category,
    title: t(`preview.team.categories.${category.id}`),
    members: category.members.map((member) => ({
      ...member,
      role: t(`preview.team.roles.${member.roleKey}`),
    })),
  }));

  useEffect(() => {
    if (!expandedId) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setExpandedId(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [expandedId]);

  const closeExpanded = () => setExpandedId(null);

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
        <section
          className="hp-hero hp-despre-hero hp-echipa-hero"
          aria-label={t("preview.team.heroAria")}
        >
          <img
            className="hp-echipa-hero__cover"
            src="/images/preview/echipa/cover.jpg"
            alt={t("preview.team.coverAlt")}
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
          className="hp-section hp-despre-intro hp-echipa-pagehead"
          aria-labelledby="hp-echipa-title"
        >
          <PreviewPageHead
            id="hp-echipa-title"
            title={t("preview.team.title")}
            subtitle={t("preview.team.subtitle")}
            rays={3}
          />
        </section>

        <section
          className="hp-section hp-offer hp-echipa-offer"
          aria-label={t("preview.team.offerTitle")}
        >
          <div className="hp-offer__carousel">
            <Swiper
              modules={[Pagination]}
              slidesPerView={2}
              spaceBetween={12}
              pagination={{ clickable: true }}
              grabCursor
              className="hp-offer-swiper"
              onTouchStart={() => {
                if (expandedId) closeExpanded();
              }}
              onSlideChange={() => {
                if (expandedId) closeExpanded();
              }}
            >
              {offerCards.map((card) => (
                <SwiperSlide key={card.id}>
                  <button
                    type="button"
                    className={`hp-offer-card hp-offer-card--${card.tone} ${
                      expandedId === card.id ? "is-active" : ""
                    }`}
                    onClick={() => setExpandedId(card.id)}
                    aria-expanded={expandedId === card.id}
                    aria-controls="hp-echipa-offer-expanded"
                  >
                    <span className="hp-offer-card__icon" aria-hidden>
                      {card.imageIcon ? (
                        <img src={card.imageIcon} alt="" />
                      ) : (
                        <ServiceIcon name={card.icon} />
                      )}
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
            <h2 id="hp-specialisti-title">{t("preview.team.specialistsTitle")}</h2>
            <p>{t("preview.team.specialistsText")}</p>
          </div>

          {staffCategories.map((category) => {
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
                            {t("preview.team.photoSoon")}
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
              aria-label={t("preview.chrome.close")}
              onClick={closeExpanded}
            />
            <article
              className={`hp-offer-expand__panel hp-offer-expand__panel--${expanded.tone}`}
            >
              <div className="hp-offer-expand__handle" aria-hidden />
              <p className="hp-offer-expand__hint">
                {t("preview.home.offer.expandHint")}
              </p>
              <div className="hp-offer-expand__icon" aria-hidden>
                {expanded.imageIcon ? (
                  <img src={expanded.imageIcon} alt="" />
                ) : (
                  <ServiceIcon name={expanded.icon} />
                )}
              </div>
              <h3 id="hp-echipa-expand-title">
                {expanded.headline || expanded.title}
              </h3>
              <div className="hp-offer-expand__body">
                {(expanded.blocks || []).map((block, index) => (
                  <div key={`${expanded.id}-block-${index}`} className="hp-echipa-expand-block">
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
                {t("preview.chrome.close")}
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
