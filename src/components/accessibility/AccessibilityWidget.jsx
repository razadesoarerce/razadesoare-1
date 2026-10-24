import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./AccessibilityWidget.css";

const STORAGE_KEY = "rds-a11y-settings-v1";
const FONT_STEPS = [0.875, 1, 1.125, 1.25, 1.375];
const BRIGHTNESS_MIN = 0.75;
const BRIGHTNESS_MAX = 1.25;
const BRIGHTNESS_STEP = 0.05;

const DEFAULTS = {
  fontScale: 1,
  contrast: "normal", // normal | high
  brightness: 1,
};

const loadSettings = () => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULTS };
    const parsed = JSON.parse(raw);
    return {
      fontScale: FONT_STEPS.includes(parsed.fontScale) ? parsed.fontScale : 1,
      contrast: parsed.contrast === "high" ? "high" : "normal",
      brightness:
        typeof parsed.brightness === "number" &&
        parsed.brightness >= BRIGHTNESS_MIN &&
        parsed.brightness <= BRIGHTNESS_MAX
          ? parsed.brightness
          : 1,
    };
  } catch {
    return { ...DEFAULTS };
  }
};

const applySettings = (settings) => {
  const root = document.documentElement;
  root.style.setProperty("--a11y-font-scale", String(settings.fontScale));
  root.style.setProperty("--a11y-brightness", String(settings.brightness));
  root.classList.toggle("a11y-high-contrast", settings.contrast === "high");
  root.classList.toggle("a11y-font-scaled", settings.fontScale !== 1);
  root.classList.toggle("a11y-brightness-tuned", settings.brightness !== 1);
};

/** Standard accessibility person-in-circle mark (ISA-style). */
const AccessibilityIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden className="a11y-widget__icon">
    <circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" strokeWidth="1.75" />
    <circle cx="12" cy="6.2" r="1.55" fill="currentColor" />
    <path
      d="M8.2 9.2h7.6M12 9.2v5.4M9.1 18.2l2.9-3.6 2.9 3.6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Site-wide accessibility tool (RO institutional expectation):
 * text size, contrast, brightness — fixed person-in-circle control.
 */
const AccessibilityWidget = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const panelId = useId();
  const rootRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState(DEFAULTS);

  const isAdmin = location.pathname.startsWith("/admin");

  useEffect(() => {
    const initial = loadSettings();
    setSettings(initial);
    applySettings(initial);
  }, []);

  useEffect(() => {
    applySettings(settings);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      /* ignore quota / private mode */
    }
  }, [settings]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointer = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const update = useCallback((patch) => {
    setSettings((current) => ({ ...current, ...patch }));
  }, []);

  const bumpFont = (direction) => {
    const index = FONT_STEPS.indexOf(settings.fontScale);
    const safeIndex = index < 0 ? 1 : index;
    const next = FONT_STEPS[Math.min(FONT_STEPS.length - 1, Math.max(0, safeIndex + direction))];
    update({ fontScale: next });
  };

  const reset = () => setSettings({ ...DEFAULTS });

  if (isAdmin || typeof document === "undefined") return null;

  const fontPercent = Math.round(settings.fontScale * 100);
  const brightnessPercent = Math.round(settings.brightness * 100);

  return createPortal(
    <div
      ref={rootRef}
      className={`a11y-widget ${open ? "is-open" : ""}`}
      data-no-page-swipe
    >
      <button
        type="button"
        className="a11y-widget__toggle"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={t("a11y.open")}
        onClick={() => setOpen((value) => !value)}
      >
        <AccessibilityIcon />
      </button>

      {open ? (
        <div
          className="a11y-widget__panel"
          id={panelId}
          role="dialog"
          aria-modal="false"
          aria-label={t("a11y.title")}
        >
          <div className="a11y-widget__head">
            <h2 className="a11y-widget__title">{t("a11y.title")}</h2>
            <button
              type="button"
              className="a11y-widget__close"
              aria-label={t("a11y.close")}
              onClick={() => setOpen(false)}
            >
              ×
            </button>
          </div>

          <div className="a11y-widget__group">
            <p className="a11y-widget__label">{t("a11y.textSize")}</p>
            <div className="a11y-widget__row">
              <button
                type="button"
                className="a11y-widget__btn"
                onClick={() => bumpFont(-1)}
                disabled={settings.fontScale <= FONT_STEPS[0]}
                aria-label={t("a11y.textDecrease")}
              >
                A−
              </button>
              <span className="a11y-widget__value" aria-live="polite">
                {fontPercent}%
              </span>
              <button
                type="button"
                className="a11y-widget__btn"
                onClick={() => bumpFont(1)}
                disabled={settings.fontScale >= FONT_STEPS[FONT_STEPS.length - 1]}
                aria-label={t("a11y.textIncrease")}
              >
                A+
              </button>
            </div>
          </div>

          <div className="a11y-widget__group">
            <p className="a11y-widget__label">{t("a11y.contrast")}</p>
            <div className="a11y-widget__row a11y-widget__row--stack">
              <button
                type="button"
                className={`a11y-widget__chip ${settings.contrast === "normal" ? "is-active" : ""}`}
                onClick={() => update({ contrast: "normal" })}
                aria-pressed={settings.contrast === "normal"}
              >
                {t("a11y.contrastNormal")}
              </button>
              <button
                type="button"
                className={`a11y-widget__chip ${settings.contrast === "high" ? "is-active" : ""}`}
                onClick={() => update({ contrast: "high" })}
                aria-pressed={settings.contrast === "high"}
              >
                {t("a11y.contrastHigh")}
              </button>
            </div>
          </div>

          <div className="a11y-widget__group">
            <p className="a11y-widget__label">
              {t("a11y.brightness")} <span className="a11y-widget__value">{brightnessPercent}%</span>
            </p>
            <input
              type="range"
              className="a11y-widget__slider"
              min={BRIGHTNESS_MIN}
              max={BRIGHTNESS_MAX}
              step={BRIGHTNESS_STEP}
              value={settings.brightness}
              onChange={(event) => update({ brightness: Number(event.target.value) })}
              aria-label={t("a11y.brightness")}
            />
          </div>

          <button type="button" className="a11y-widget__reset" onClick={reset}>
            {t("a11y.reset")}
          </button>
        </div>
      ) : null}
    </div>,
    document.body
  );
};

export default AccessibilityWidget;
