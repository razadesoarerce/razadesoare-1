import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaFacebookF } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { PREVIEW_HOME, PREVIEW_DESPRE, PREVIEW_NAV } from "./previewNav";
import PreviewSupportFooter from "./PreviewSupportFooter";
import "./HomePreview.css";

/** Pulsing sun mark — same animated sun used previously in the hero. */
const HeroCardSun = () => (
  <span className="hp-hero-card__sun" aria-hidden>
    <svg className="hp-hero-card__sun-svg" viewBox="0 0 64 64">
      <g className="hp-hero-card__sun-rays">
        {Array.from({ length: 12 }, (_, i) => {
          const long = i % 2 === 0;
          return (
            <line
              key={i}
              x1="32"
              y1={long ? 2 : 6}
              x2="32"
              y2={long ? 12 : 12}
              transform={`rotate(${i * 30} 32 32)`}
            />
          );
        })}
      </g>
      <g className="hp-hero-card__sun-core">
        <circle cx="32" cy="32" r="11" />
        {Array.from({ length: 10 }, (_, i) => (
          <circle
            key={i}
            className="hp-hero-card__sun-bump"
            cx="32"
            cy="20.4"
            r="1.75"
            transform={`rotate(${i * 36} 32 32)`}
          />
        ))}
      </g>
    </svg>
  </span>
);

const OFFER_CARD_META = [
  {
    id: "mission",
    tone: "pink",
    icon: "people",
    imageIcon: "/images/preview/icon-misiune.png",
    hasList: true,
    hasAfter: true,
  },
  {
    id: "education",
    tone: "blue",
    icon: "book",
    imageIcon: "/images/preview/icon-educatie.png",
  },
  {
    id: "development",
    tone: "green",
    icon: "sprout",
    imageIcon: "/images/preview/icon-dezvoltare.png",
  },
  {
    id: "activities",
    tone: "yellow",
    icon: "palette",
    imageIcon: "/images/preview/icon-activitati.png",
  },
];

const GALLERY_META = [
  { id: "g1", src: "/images/preview/life-carusel-1.jpg", frame: "portrait" },
  { id: "g2", src: "/images/preview/life-carusel-2.jpg", frame: "portrait" },
  { id: "g3", src: "/images/preview/life-carusel-3.jpg", frame: "portrait" },
  { id: "g4", src: "/images/preview/life-carusel-4.jpg", frame: "portrait" },
  { id: "g5", src: "/images/preview/life-carusel-5.jpg", frame: "portrait" },
  { id: "g6", src: "/images/preview/life-carusel-6.jpg", frame: "portrait" },
  { id: "g7", src: "/images/preview/life-carusel-7.jpg", frame: "portrait" },
];

const asStringList = (value) => (Array.isArray(value) ? value : []);

const Icon = ({ name }) => {
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
  if (name === "palette") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden>
        <path
          fill="currentColor"
          d="M24 6c-9.9 0-18 7.4-18 16.5C6 33 14.1 42 24 42c2.2 0 4-1.8 4-4 0-1.1-.4-2-1.2-2.7-.7-.7-1.1-1.6-1.1-2.6 0-2.1 1.7-3.7 3.8-3.7H32c7.2 0 13-5.4 13-12C45 12.2 35.5 6 24 6z"
        />
        <circle cx="16" cy="18" r="2.5" fill="#fff" />
        <circle cx="24" cy="14" r="2.5" fill="#fff" />
        <circle cx="32" cy="18" r="2.5" fill="#fff" />
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
  return (
    <svg viewBox="0 0 48 48" aria-hidden>
      <path
        fill="currentColor"
        d="M24 42c-1.5-7-8-11-8-18 0-4.4 3.6-8 8-8s8 3.6 8 8c0 7-6.5 11-8 18z"
      />
      <path
        fill="currentColor"
        d="M22 10c0-3 2-6 2-6s2 3 2 6-2 4-2 4-2-1-2-4zm-8 6c-2.5-2-4-5-4-5s4.2.8 6.5 2.8S20 18 20 18s-3.5.1-6-2zm16 0c-2.5 2.1-6 2-6 2s1.2-2.2 3.5-4.2S36 11 36 11s-1.5 3-4 5z"
      />
    </svg>
  );
};

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

const SWIPE_CLOSE_PX = 56;
const DOCK_STORAGE_KEY = "hp-preview-dock-pos-v7";
const DOCK_DRAG_THRESHOLD = 6;
const DOCK_MARGIN = 12;
const CONTACT_ADDRESS = "Arad, Strada Diogene nr 12";
const CONTACT_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(CONTACT_ADDRESS);
const CONTACT_EMAIL = "razadesoarerce@yahoo.com";
const CONTACT_PHONE_DISPLAY = "0257 214 805";
const CONTACT_PHONE_TEL = "tel:+40257214805";

const clampDockPos = (left, top, width = 80, height = 80) => {
  const maxLeft = Math.max(DOCK_MARGIN, window.innerWidth - width - DOCK_MARGIN);
  const maxTop = Math.max(DOCK_MARGIN, window.innerHeight - height - DOCK_MARGIN);
  return {
    left: Math.min(Math.max(DOCK_MARGIN, left), maxLeft),
    top: Math.min(Math.max(DOCK_MARGIN, top), maxTop),
  };
};

/** Default: floating bottom-right of the phone viewport (fixed while scrolling). */
const getDockViewportHome = (width = 80, height = 80) =>
  clampDockPos(
    window.innerWidth - width - DOCK_MARGIN,
    window.innerHeight - height - DOCK_MARGIN,
    width,
    height
  );

/** Center of dock vs Hero bounds — flips contrast when dock leaves the photo. */
const isDockOutsideHeroRect = (heroEl, left, top, width, height) => {
  if (!heroEl || left == null || top == null) return false;
  const hero = heroEl.getBoundingClientRect();
  const cx = left + width / 2;
  const cy = top + height / 2;
  return cx < hero.left || cx > hero.right || cy < hero.top || cy > hero.bottom;
};

const HomePreview = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedOffer, setExpandedOffer] = useState(null);

  const offerCards = OFFER_CARD_META.map((meta) => {
    const base = `preview.home.offer.cards.${meta.id}`;
    return {
      ...meta,
      title: t(`${base}.title`),
      text: t(`${base}.text`),
      headline: t(`${base}.headline`),
      detailParagraphs: asStringList(t(`${base}.detailParagraphs`, { returnObjects: true })),
      detailList: meta.hasList
        ? asStringList(t(`${base}.detailList`, { returnObjects: true }))
        : undefined,
      detailParagraphsAfter: meta.hasAfter
        ? asStringList(t(`${base}.detailParagraphsAfter`, { returnObjects: true }))
        : undefined,
    };
  });

  const gallery = GALLERY_META.map((meta) => ({
    ...meta,
    alt: t(`preview.home.life.gallery.${meta.id}.alt`),
    label: t(`preview.home.life.gallery.${meta.id}.label`),
  }));

  const expandedCard = expandedOffer
    ? offerCards.find((card) => card.id === expandedOffer.id)
    : null;
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [contactPanelPos, setContactPanelPos] = useState(null);
  const [dockPos, setDockPos] = useState(null);
  const [dockHomePos, setDockHomePos] = useState(null);
  const [dockDragging, setDockDragging] = useState(false);
  const [dockOutsideHero, setDockOutsideHero] = useState(false);
  const swipeStart = useRef(null);
  const menuSwipeStart = useRef(null);
  const dockRef = useRef(null);
  const heroRef = useRef(null);
  const contactTriggerRef = useRef(null);
  const contactPanelRef = useRef(null);
  const dockDragRef = useRef(null);
  const dockJustDraggedRef = useRef(false);
  const activeLang = i18n.language?.startsWith("en") ? "EN" : "RO";
  const dockScreenPos = dockPos ?? dockHomePos;

  const syncDockOutsideHero = (left, top, width, height) => {
    const dock = dockRef.current;
    const w = width ?? dock?.offsetWidth ?? 80;
    const h = height ?? dock?.offsetHeight ?? 80;
    const next = isDockOutsideHeroRect(heroRef.current, left, top, w, h);
    setDockOutsideHero((prev) => (prev === next ? prev : next));
  };

  useEffect(() => {
    const id = "home-preview-fonts";
    if (document.getElementById(id)) return undefined;

    // latin-ext is required for Romanian diacritics (ă â î ș ț) in all weights
    const preconnect = document.createElement("link");
    preconnect.rel = "preconnect";
    preconnect.href = "https://fonts.gstatic.com";
    preconnect.crossOrigin = "anonymous";
    document.head.appendChild(preconnect);

    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    // Nunito + latin-ext: Romanian diacritics (ă â î ș ț) stay correct in bold titles/body
    link.href =
      "https://fonts.googleapis.com/css?family=Nunito:400,600,700,800&subset=latin,latin-ext&display=swap";
    document.head.appendChild(link);
    return undefined;
  }, []);

  useEffect(() => {
    if (!expandedOffer && !menuOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key !== "Escape") return;
      if (expandedOffer) setExpandedOffer(null);
      else if (menuOpen) setMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [expandedOffer, menuOpen]);

  useLayoutEffect(() => {
    if (!contactOpen) {
      setContactPanelPos(null);
      return undefined;
    }

    const syncPanelPos = () => {
      const trigger = contactTriggerRef.current;
      if (!trigger) return;
      const rect = trigger.getBoundingClientRect();
      const minWidth = Math.max(rect.width, 200);
      const maxLeft = Math.max(8, window.innerWidth - minWidth - 8);
      setContactPanelPos({
        top: rect.bottom + 6,
        left: Math.min(rect.left, maxLeft),
        minWidth,
      });
    };

    syncPanelPos();
    window.addEventListener("resize", syncPanelPos);
    window.addEventListener("scroll", syncPanelPos, true);
    return () => {
      window.removeEventListener("resize", syncPanelPos);
      window.removeEventListener("scroll", syncPanelPos, true);
    };
  }, [contactOpen]);

  useEffect(() => {
    if (!contactOpen) return undefined;

    const onPointerDown = (event) => {
      const target = event.target;
      if (contactTriggerRef.current?.contains(target)) return;
      if (contactPanelRef.current?.contains(target)) return;
      setContactOpen(false);
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") setContactOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [contactOpen]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(DOCK_STORAGE_KEY);
      if (!raw) return undefined;
      const parsed = JSON.parse(raw);
      if (typeof parsed?.left !== "number" || typeof parsed?.top !== "number") {
        return undefined;
      }
      const el = dockRef.current;
      const next = clampDockPos(
        parsed.left,
        parsed.top,
        el?.offsetWidth,
        el?.offsetHeight
      );
      setDockPos(next);
    } catch {
      // ignore invalid storage
    }
    return undefined;
  }, []);

  useLayoutEffect(() => {
    const syncHome = () => {
      const dock = dockRef.current;
      const w = dock?.offsetWidth ?? 80;
      const h = dock?.offsetHeight ?? 80;
      const next = getDockViewportHome(w, h);
      setDockHomePos(next);
      if (!dockPos) {
        syncDockOutsideHero(next.left, next.top, w, h);
      }
    };

    syncHome();
    window.addEventListener("resize", syncHome);
    return () => window.removeEventListener("resize", syncHome);
  }, [dockPos]);

  useLayoutEffect(() => {
    if (!dockScreenPos) return undefined;

    const syncOutside = () => {
      const dock = dockRef.current;
      syncDockOutsideHero(
        dockScreenPos.left,
        dockScreenPos.top,
        dock?.offsetWidth,
        dock?.offsetHeight
      );
    };

    syncOutside();
    window.addEventListener("resize", syncOutside);
    window.addEventListener("scroll", syncOutside, true);
    return () => {
      window.removeEventListener("resize", syncOutside);
      window.removeEventListener("scroll", syncOutside, true);
    };
  }, [dockScreenPos]);

  useEffect(() => {
    const onResize = () => {
      setDockPos((pos) => {
        if (!pos) return null;
        const el = dockRef.current;
        return clampDockPos(pos.left, pos.top, el?.offsetWidth, el?.offsetHeight);
      });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const closeExpanded = () => setExpandedOffer(null);
  const closeMenu = () => setMenuOpen(false);

  const suppressDockClickIfDragged = (event) => {
    if (!dockJustDraggedRef.current) return;
    event.preventDefault();
    event.stopPropagation();
    dockJustDraggedRef.current = false;
  };

  const onDockPointerDown = (event) => {
    if (event.button !== undefined && event.button !== 0) return;
    const el = dockRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    dockDragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      origLeft: rect.left,
      origTop: rect.top,
      dragging: false,
    };
    el.setPointerCapture?.(event.pointerId);
  };

  const onDockPointerMove = (event) => {
    const state = dockDragRef.current;
    if (!state || state.pointerId !== event.pointerId) return;
    const dx = event.clientX - state.startX;
    const dy = event.clientY - state.startY;
    if (!state.dragging && Math.hypot(dx, dy) < DOCK_DRAG_THRESHOLD) return;

    if (!state.dragging) {
      state.dragging = true;
      setDockDragging(true);
    }

    const el = dockRef.current;
    const next = clampDockPos(
      state.origLeft + dx,
      state.origTop + dy,
      el?.offsetWidth,
      el?.offsetHeight
    );
    setDockPos(next);
    // Live contrast flip while dragging across the Hero edge
    syncDockOutsideHero(next.left, next.top, el?.offsetWidth, el?.offsetHeight);
  };

  const onDockPointerUp = (event) => {
    const state = dockDragRef.current;
    if (!state || state.pointerId !== event.pointerId) return;

    if (state.dragging) {
      const el = dockRef.current;
      const rect = el?.getBoundingClientRect();
      const next = clampDockPos(
        rect?.left ?? state.origLeft,
        rect?.top ?? state.origTop,
        el?.offsetWidth,
        el?.offsetHeight
      );
      setDockPos(next);
      syncDockOutsideHero(next.left, next.top, el?.offsetWidth, el?.offsetHeight);
      try {
        localStorage.setItem(DOCK_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore quota / private mode
      }
      dockJustDraggedRef.current = true;
    }

    dockDragRef.current = null;
    setDockDragging(false);
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(activeLang === "RO" ? "en" : "ro");
  };

  const goHome = () => {
    setMenuOpen(false);
    setContactOpen(false);
    setExpandedOffer(null);
    if (location.pathname === PREVIEW_HOME) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    navigate(PREVIEW_HOME);
  };

  const onNavClick = (path) => {
    closeMenu();
    if (!path) return;
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    navigate(path);
  };

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
    // Close only on clear horizontal swipe — vertical scroll must keep working
    if (Math.abs(dx) >= SWIPE_CLOSE_PX && Math.abs(dx) > Math.abs(dy) * 1.25) {
      closeExpanded();
    }
  };

  const onMenuTouchStart = (event) => {
    const touch = event.touches[0];
    if (!touch) return;
    menuSwipeStart.current = { x: touch.clientX, y: touch.clientY };
  };

  const onMenuTouchEnd = (event) => {
    const start = menuSwipeStart.current;
    menuSwipeStart.current = null;
    if (!start) return;
    const touch = event.changedTouches[0];
    if (!touch) return;
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    // Swipe right closes the right-side drawer
    if (dx >= SWIPE_CLOSE_PX && Math.abs(dx) > Math.abs(dy) * 1.1) {
      closeMenu();
    }
  };

  const contactPanel =
    contactOpen && contactPanelPos
      ? createPortal(
          <div
            id="hp-contact-panel"
            ref={contactPanelRef}
            className="hp-contact-dd__panel hp-glass"
            role="region"
            aria-label={t("preview.contact.panelAria")}
            style={{
              top: contactPanelPos.top,
              left: contactPanelPos.left,
              minWidth: contactPanelPos.minWidth,
            }}
          >
            <a
              className="hp-contact-dd__row"
              href={CONTACT_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("preview.contact.openMapAria", { address: CONTACT_ADDRESS })}
            >
              <span className="hp-contact-dd__icon" aria-hidden>
                <svg viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12 2c-3.9 0-7 3.1-7 7 0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"
                  />
                </svg>
              </span>
              <span className="hp-contact-dd__text">
                <span className="hp-contact-dd__label">{t("preview.contact.address")}</span>
                <span className="hp-contact-dd__value">{CONTACT_ADDRESS}</span>
                <span className="hp-contact-dd__action">{t("preview.contact.openMap")}</span>
              </span>
              <span className="hp-contact-dd__go" aria-hidden>
                ↗
              </span>
            </a>
            <a
              className="hp-contact-dd__row"
              href={`mailto:${CONTACT_EMAIL}`}
              aria-label={t("preview.contact.sendEmailAria", { email: CONTACT_EMAIL })}
            >
              <span className="hp-contact-dd__icon" aria-hidden>
                <svg viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5L4 8V6l8 5 8-5v2z"
                  />
                </svg>
              </span>
              <span className="hp-contact-dd__text">
                <span className="hp-contact-dd__label">{t("preview.contact.email")}</span>
                <span className="hp-contact-dd__value">{CONTACT_EMAIL}</span>
                <span className="hp-contact-dd__action">{t("preview.contact.sendEmail")}</span>
              </span>
              <span className="hp-contact-dd__go" aria-hidden>
                ↗
              </span>
            </a>
            <a
              className="hp-contact-dd__row"
              href={CONTACT_PHONE_TEL}
              aria-label={t("preview.contact.callAria", { phone: CONTACT_PHONE_DISPLAY })}
            >
              <span className="hp-contact-dd__icon" aria-hidden>
                <svg viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8z"
                  />
                </svg>
              </span>
              <span className="hp-contact-dd__text">
                <span className="hp-contact-dd__label">{t("preview.contact.phone")}</span>
                <span className="hp-contact-dd__value">{CONTACT_PHONE_DISPLAY}</span>
                <span className="hp-contact-dd__action">{t("preview.contact.call")}</span>
              </span>
              <span className="hp-contact-dd__go" aria-hidden>
                ›
              </span>
            </a>
          </div>,
          document.body
        )
      : null;

  return (
    <div
      className={`hp hp--type-test${expandedOffer ? " hp--offer-open" : ""}${menuOpen ? " hp--menu-open" : ""}${contactOpen ? " hp--contact-open" : ""}`}
    >
      {contactPanel}
      <div
        ref={dockRef}
        className={`hp-dock ${dockPos ? "is-custom-pos" : "is-home-pos"} ${dockDragging ? "is-dragging" : ""} ${dockOutsideHero ? "is-outside-hero" : ""}`}
        style={
          dockScreenPos
            ? { left: dockScreenPos.left, top: dockScreenPos.top }
            : { visibility: "hidden" }
        }
        aria-label={t("preview.chrome.dockAria")}
        onPointerDown={onDockPointerDown}
        onPointerMove={onDockPointerMove}
        onPointerUp={onDockPointerUp}
        onPointerCancel={onDockPointerUp}
        onClickCapture={suppressDockClickIfDragged}
      >
        <button
          type="button"
          className="hp-dock__btn"
          onClick={goHome}
          aria-label={t("preview.chrome.homeAria")}
        >
          <svg viewBox="0 0 24 24" aria-hidden>
            <path
              d="M4 11.2L12 4.5l8 6.7V20a1 1 0 0 1-1 1h-5.2v-5.8H10.2V21H5a1 1 0 0 1-1-1v-8.8z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <button
          type="button"
          className={`hp-dock__btn hp-dock__menu ${menuOpen ? "is-open" : ""}`}
          aria-label={menuOpen ? t("preview.chrome.closeMenu") : t("preview.chrome.openMenu")}
          aria-expanded={menuOpen}
          aria-controls="hp-drawer"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
        <a
          className="hp-dock__btn hp-dock__facebook"
          href="https://www.facebook.com/scoala.razadesoare"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("preview.chrome.facebook")}
        >
          <FaFacebookF aria-hidden />
        </a>
        <button
          type="button"
          className="hp-dock__btn hp-dock__lang"
          onClick={toggleLanguage}
          aria-label={t("preview.chrome.langAria", { lang: activeLang })}
        >
          {activeLang}
        </button>
      </div>

      {menuOpen ? (
        <div className="hp-drawer-root">
          <button
            type="button"
            className="hp-drawer__backdrop"
            aria-label={t("preview.chrome.closeMenu")}
            onClick={closeMenu}
          />
          <aside
            id="hp-drawer"
            className="hp-drawer"
            role="dialog"
            aria-modal="true"
            aria-label={t("preview.chrome.menu")}
            onTouchStart={onMenuTouchStart}
            onTouchEnd={onMenuTouchEnd}
          >
            <div className="hp-drawer__head">
              <p className="hp-drawer__hint">{t("preview.chrome.menuHint")}</p>
              <button type="button" className="hp-drawer__close" onClick={closeMenu} aria-label={t("preview.chrome.close")}>
                ×
              </button>
            </div>
            <nav className="hp-drawer__nav" aria-label={t("preview.chrome.nav")}>
              {PREVIEW_NAV.map((item) => {
                const isActive = item.path && location.pathname === item.path;
                const disabled = !item.path;
                return (
                  <button
                    key={item.labelKey}
                    type="button"
                    className={`hp-drawer__link ${isActive ? "is-active" : ""} ${disabled ? "is-disabled" : ""}`}
                    onClick={() => onNavClick(item.path)}
                    disabled={disabled}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {t(item.labelKey)}
                  </button>
                );
              })}
            </nav>
          </aside>
        </div>
      ) : null}

      <main>
        <section ref={heroRef} className="hp-hero" aria-labelledby="hp-hero-title">
          <div
            className="hp-hero__bg"
            style={{
              backgroundImage: "url(/images/preview/hero-main.jpg)",
            }}
          />
          <div className="hp-hero__shade" />
          <div className="hp-hero__content">
            <article className="hp-hero-card hp-glass">
              <HeroCardSun />
              <h1 id="hp-hero-title">{t("preview.home.heroTitle")}</h1>
              <div className="hp-hero-card__actions">
                <div className={`hp-contact-dd ${contactOpen ? "is-open" : ""}`}>
                  <button
                    type="button"
                    ref={contactTriggerRef}
                    className="hp-btn hp-btn--card-ghost hp-contact-dd__trigger"
                    aria-expanded={contactOpen}
                    aria-controls="hp-contact-panel"
                    onClick={() => setContactOpen((open) => !open)}
                  >
                    {t("preview.contact.cta")}{" "}
                    <span className="hp-contact-dd__chevron" aria-hidden>
                      ▾
                    </span>
                  </button>
                </div>
              </div>
            </article>
          </div>
          <svg
            className="hp-hero__wave"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            aria-hidden
          >
            {/* Smooth continuous wave flush to bottom — no photo strip under the curve */}
            <path
              d="M0,72 C180,108 360,108 540,78 C720,48 900,36 1080,58 C1260,80 1350,92 1440,78 L1440,122 L0,122 Z"
              fill="#ffffff"
            />
          </svg>
        </section>

        <section className="hp-section hp-offer" aria-labelledby="hp-offer-title">
          <div className="hp-section__head">
            <SunRays className="hp-rays" />
            <h2 id="hp-offer-title">{t("preview.home.offer.title")}</h2>
            <SunRays className="hp-rays" />
          </div>
          <p className="hp-section__lead">{t("preview.home.offer.lead")}</p>
          <div className="hp-offer__carousel">
            <Swiper
              modules={[Pagination]}
              slidesPerView={2}
              spaceBetween={12}
              pagination={{ clickable: true }}
              grabCursor
              className="hp-offer-swiper"
              onTouchStart={() => {
                if (expandedOffer) closeExpanded();
              }}
              onSlideChange={() => {
                if (expandedOffer) closeExpanded();
              }}
            >
              {offerCards.map((card) => (
                <SwiperSlide key={card.id}>
                  <button
                    type="button"
                    className={`hp-offer-card hp-offer-card--${card.tone} ${
                      expandedOffer?.id === card.id ? "is-active" : ""
                    }`}
                    onClick={() => setExpandedOffer(card)}
                    aria-expanded={expandedOffer?.id === card.id}
                    aria-controls="hp-offer-expanded"
                  >
                    <span className="hp-offer-card__icon" aria-hidden>
                      {card.imageIcon ? (
                        <img src={card.imageIcon} alt="" />
                      ) : (
                        <Icon name={card.icon} />
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

          {expandedCard ? (
            <div
              className="hp-offer-expand"
              id="hp-offer-expanded"
              role="dialog"
              aria-modal="true"
              aria-labelledby="hp-offer-expand-title"
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
                className={`hp-offer-expand__panel hp-offer-expand__panel--${expandedCard.tone}`}
              >
                <div className="hp-offer-expand__handle" aria-hidden />
                <p className="hp-offer-expand__hint">
                  {t("preview.home.offer.expandHint")}
                </p>
                <div className="hp-offer-expand__icon" aria-hidden>
                  {expandedCard.imageIcon ? (
                    <img src={expandedCard.imageIcon} alt="" />
                  ) : (
                    <Icon name={expandedCard.icon} />
                  )}
                </div>
                <h3 id="hp-offer-expand-title">
                  {expandedCard.headline || expandedCard.title}
                </h3>
                <div className="hp-offer-expand__body">
                  {(expandedCard.detailParagraphs || []).map((paragraph) => (
                    <p key={paragraph.slice(0, 48)} className="hp-offer-expand__detail">
                      {paragraph}
                    </p>
                  ))}
                  {expandedCard.detailList?.length ? (
                    <ul className="hp-offer-expand__list">
                      {expandedCard.detailList.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                  {(expandedCard.detailParagraphsAfter || []).map((paragraph) => (
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
                  {t("preview.chrome.close")}
                </button>
              </article>
            </div>
          ) : null}
        </section>

        <section className="hp-about" aria-labelledby="hp-about-title">
          <div className="hp-section hp-about__intro">
            <div className="hp-section__head">
              <SunRays className="hp-rays" />
              <h2 id="hp-about-title">{t("preview.home.about.title")}</h2>
              <SunRays className="hp-rays" />
            </div>
            <div className="hp-about__text">
              <p>{t("preview.home.about.text")}</p>
              <Link to={PREVIEW_DESPRE} className="hp-btn hp-btn--primary">
                {t("preview.home.about.cta")} <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
          <div className="hp-about__media">
            <img
              src="/images/preview/about-noi.jpg"
              alt={t("preview.home.about.imageAlt")}
            />
          </div>
        </section>

        <section className="hp-section hp-life" aria-labelledby="hp-life-title">
          <div className="hp-section__head">
            <SunRays className="hp-rays" />
            <h2 id="hp-life-title">{t("preview.home.life.title")}</h2>
            <SunRays className="hp-rays" />
          </div>
          <p className="hp-section__lead">{t("preview.home.life.lead")}</p>
          <div className="hp-life__carousel">
            <Swiper
              modules={[Pagination]}
              slidesPerView={2}
              spaceBetween={12}
              pagination={{ clickable: true }}
              grabCursor
              className="hp-life-swiper"
            >
              {gallery.map((item) => (
                <SwiperSlide key={item.id}>
                  <figure className={`hp-life__item hp-life__item--${item.frame}`}>
                    <img src={item.src} alt={item.alt} loading="lazy" />
                    <figcaption className="hp-life__caption">{item.label}</figcaption>
                  </figure>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="hp-life__cta">
            <button type="button" className="hp-btn hp-btn--primary">
              {t("preview.home.life.galleryCta")} <span aria-hidden>→</span>
            </button>
          </div>
        </section>

        <PreviewSupportFooter />
      </main>
    </div>
  );
};

export default HomePreview;
