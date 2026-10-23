import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaFacebookF } from "react-icons/fa";
import { PREVIEW_HOME, PREVIEW_NAV } from "./previewNav";
import "./HomePreview.css";

const SWIPE_CLOSE_PX = 56;
const DOCK_STORAGE_KEY = "hp-preview-dock-pos-v7";
const DOCK_DRAG_THRESHOLD = 6;
const DOCK_MARGIN = 12;

const clampDockPos = (left, top, width = 80, height = 80) => {
  const maxLeft = Math.max(DOCK_MARGIN, window.innerWidth - width - DOCK_MARGIN);
  const maxTop = Math.max(DOCK_MARGIN, window.innerHeight - height - DOCK_MARGIN);
  return {
    left: Math.min(Math.max(DOCK_MARGIN, left), maxLeft),
    top: Math.min(Math.max(DOCK_MARGIN, top), maxTop),
  };
};

const getDockViewportHome = (width = 80, height = 80) =>
  clampDockPos(
    window.innerWidth - width - DOCK_MARGIN,
    window.innerHeight - height - DOCK_MARGIN,
    width,
    height
  );

/**
 * Shared chrome for the new preview site: dock + drawer.
 * Inner pages use navy dock contrast (is-outside-hero).
 */
const PreviewShell = ({ children, className = "" }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dockPos, setDockPos] = useState(null);
  const [dockHomePos, setDockHomePos] = useState(null);
  const [dockDragging, setDockDragging] = useState(false);
  const menuSwipeStart = useRef(null);
  const dockRef = useRef(null);
  const dockDragRef = useRef(null);
  const dockJustDraggedRef = useRef(false);
  const activeLang = i18n.language?.startsWith("en") ? "EN" : "RO";
  const dockScreenPos = dockPos ?? dockHomePos;

  useEffect(() => {
    const id = "home-preview-fonts";
    if (document.getElementById(id)) return undefined;

    const preconnect = document.createElement("link");
    preconnect.rel = "preconnect";
    preconnect.href = "https://fonts.gstatic.com";
    preconnect.crossOrigin = "anonymous";
    document.head.appendChild(preconnect);

    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css?family=Nunito:400,600,700,800&subset=latin,latin-ext&display=swap";
    document.head.appendChild(link);
    return undefined;
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  useLayoutEffect(() => {
    const applyHome = () => {
      const el = dockRef.current;
      const w = el?.offsetWidth ?? 80;
      const h = el?.offsetHeight ?? 80;
      setDockHomePos(getDockViewportHome(w, h));
    };
    applyHome();

    try {
      const raw = localStorage.getItem(DOCK_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (typeof parsed?.left === "number" && typeof parsed?.top === "number") {
          const el = dockRef.current;
          setDockPos(
            clampDockPos(parsed.left, parsed.top, el?.offsetWidth, el?.offsetHeight)
          );
        }
      }
    } catch {
      // ignore
    }

    window.addEventListener("resize", applyHome);
    return () => window.removeEventListener("resize", applyHome);
  }, []);

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
    setDockPos(
      clampDockPos(
        state.origLeft + dx,
        state.origTop + dy,
        el?.offsetWidth,
        el?.offsetHeight
      )
    );
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
      try {
        localStorage.setItem(DOCK_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
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
    if (dx >= SWIPE_CLOSE_PX && Math.abs(dx) > Math.abs(dy) * 1.25) {
      closeMenu();
    }
  };

  return (
    <div className={`hp hp--preview-page is-outside-hero-page ${menuOpen ? "hp--menu-open" : ""} ${className}`.trim()}>
      <div
        ref={dockRef}
        className={`hp-dock is-outside-hero ${dockPos ? "is-custom-pos" : "is-home-pos"} ${dockDragging ? "is-dragging" : ""}`}
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
              <p className="hp-drawer__hint">
                {t("preview.chrome.menuHint")}
              </p>
              <button
                type="button"
                className="hp-drawer__close"
                onClick={closeMenu}
                aria-label={t("preview.chrome.close")}
              >
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

      {children}
    </div>
  );
};

export default PreviewShell;
