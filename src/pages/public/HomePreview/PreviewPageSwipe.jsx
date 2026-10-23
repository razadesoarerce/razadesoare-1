import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PREVIEW_NAV } from "./previewNav";

const SWIPE_PX = 72;
const SWIPE_RATIO = 1.35;
const HINT_KEY = "hp-preview-page-swipe-hint-v2";
const HINT_MS = 4800;
const FADE_MS = 240;
const MOBILE_MQ = "(max-width: 899px), (pointer: coarse)";

/** Survives HomePreview ↔ PreviewShell remounts during swipe navigation. */
let pendingPageEnter = false;

/** Zones where page-swipe must not compete with local gestures. */
const IGNORE_SELECTOR = [
  ".swiper",
  ".swiper-slide",
  ".swiper-pagination",
  ".hp-dock",
  ".hp-drawer",
  ".hp-drawer-root",
  ".hp-offer-expand",
  ".hp-info-lightbox",
  ".hp-info-zoom",
  ".hp-contact-dd",
  ".hp-blog-filters",
  "input",
  "textarea",
  "select",
  "[data-no-page-swipe]",
].join(", ");

const OVERLAY_BLOCK =
  ".hp--menu-open, .hp--offer-open, .hp--contact-open, .hp-offer-expand, .hp-info-lightbox";

const getNavIndex = (pathname) =>
  PREVIEW_NAV.findIndex((item) => item.path === pathname);

const isMobileSwipeContext = () =>
  typeof window !== "undefined" && window.matchMedia(MOBILE_MQ).matches;

const getHpRoot = () => document.querySelector(".hp");

const wait = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));

/**
 * Mobile-only horizontal swipe between preview menu pages.
 * Fade-out → navigate → fade-in; edge “page corner” hint.
 */
const PreviewPageSwipe = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const touchRef = useRef(null);
  const navigatingRef = useRef(false);
  const [hintVisible, setHintVisible] = useState(false);
  const [mobile, setMobile] = useState(false);

  const navIndex = getNavIndex(location.pathname);
  const canPrev = navIndex > 0;
  const canNext = navIndex >= 0 && navIndex < PREVIEW_NAV.length - 1;

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ);
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener?.("change", sync);
    return () => mq.removeEventListener?.("change", sync);
  }, []);

  /* Fade-in only after a swipe-driven leave (not on cold load / menu clicks). */
  useEffect(() => {
    const root = getHpRoot();
    if (!root) return undefined;
    root.classList.remove("hp--page-leave");
    navigatingRef.current = false;

    if (!pendingPageEnter) return undefined;
    pendingPageEnter = false;
    root.classList.remove("hp--page-enter");
    void root.offsetWidth;
    root.classList.add("hp--page-enter");
    const timer = window.setTimeout(() => {
      root.classList.remove("hp--page-enter");
    }, FADE_MS + 80);
    return () => window.clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobile || navIndex < 0) {
      setHintVisible(false);
      return undefined;
    }
    try {
      if (window.localStorage.getItem(HINT_KEY) === "1") {
        setHintVisible(false);
        return undefined;
      }
      window.localStorage.setItem(HINT_KEY, "1");
    } catch {
      /* ignore storage errors */
    }
    setHintVisible(true);
    const timer = window.setTimeout(() => setHintVisible(false), HINT_MS);
    return () => window.clearTimeout(timer);
  }, [mobile, navIndex]);

  useEffect(() => {
    if (!mobile || navIndex < 0) return undefined;

    const dismissHint = () => {
      setHintVisible(false);
      try {
        window.localStorage.setItem(HINT_KEY, "1");
      } catch {
        /* ignore */
      }
    };

    const goTo = async (path) => {
      if (navigatingRef.current) return;
      navigatingRef.current = true;
      dismissHint();
      const root = getHpRoot();
      root?.classList.remove("hp--page-enter");
      root?.classList.add("hp--page-leave");
      pendingPageEnter = true;
      await wait(FADE_MS);
      navigate(path);
    };

    const onStart = (event) => {
      if (!isMobileSwipeContext()) return;
      if (navigatingRef.current || document.querySelector(OVERLAY_BLOCK)) {
        touchRef.current = null;
        return;
      }
      const touch = event.changedTouches?.[0] ?? event.touches?.[0];
      if (!touch) return;
      const target = event.target;
      if (target instanceof Element && target.closest(IGNORE_SELECTOR)) {
        touchRef.current = null;
        return;
      }
      touchRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        ignored: false,
      };
    };

    const onMove = (event) => {
      const start = touchRef.current;
      if (!start || start.ignored) return;
      const touch = event.touches?.[0];
      if (!touch) return;
      const dx = touch.clientX - start.x;
      const dy = touch.clientY - start.y;
      if (Math.abs(dy) > 28 && Math.abs(dy) > Math.abs(dx) * 0.85) {
        start.ignored = true;
      }
    };

    const onEnd = (event) => {
      const start = touchRef.current;
      touchRef.current = null;
      if (!start || start.ignored || navigatingRef.current) return;
      if (document.querySelector(OVERLAY_BLOCK)) return;
      const touch = event.changedTouches?.[0];
      if (!touch) return;
      const dx = touch.clientX - start.x;
      const dy = touch.clientY - start.y;
      if (Math.abs(dx) < SWIPE_PX) return;
      if (Math.abs(dx) < Math.abs(dy) * SWIPE_RATIO) return;

      const index = getNavIndex(window.location.pathname);
      if (index < 0) return;

      if (dx < 0 && index < PREVIEW_NAV.length - 1) {
        goTo(PREVIEW_NAV[index + 1].path);
      } else if (dx > 0 && index > 0) {
        goTo(PREVIEW_NAV[index - 1].path);
      }
    };

    document.addEventListener("touchstart", onStart, { passive: true });
    document.addEventListener("touchmove", onMove, { passive: true });
    document.addEventListener("touchend", onEnd, { passive: true });
    document.addEventListener("touchcancel", onEnd, { passive: true });
    return () => {
      document.removeEventListener("touchstart", onStart);
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("touchend", onEnd);
      document.removeEventListener("touchcancel", onEnd);
    };
  }, [mobile, navIndex, navigate]);

  if (!mobile || navIndex < 0 || !hintVisible) return null;

  return (
    <div className="hp-page-swipe-edges" aria-hidden>
      {canPrev ? (
        <div
          className="hp-page-swipe-curl is-prev"
          title={t("preview.chrome.pageSwipeHintPrev")}
        >
          <span className="hp-page-swipe-curl__sheet" />
          <span className="hp-page-swipe-curl__fold" />
        </div>
      ) : null}
      {canNext ? (
        <div
          className="hp-page-swipe-curl is-next"
          title={t("preview.chrome.pageSwipeHintNext")}
        >
          <span className="hp-page-swipe-curl__sheet" />
          <span className="hp-page-swipe-curl__fold" />
        </div>
      ) : null}
      <span className="hp-sr-only">{t("preview.chrome.pageSwipeHint")}</span>
    </div>
  );
};

export default PreviewPageSwipe;
