import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PREVIEW_NAV } from "./previewNav";

/** Dimmed page behind the compact dock menu. */
export const PreviewMenuBackdrop = ({ onClose }) => {
  const { t } = useTranslation();
  return (
    <div className="hp-menu-root">
      <button
        type="button"
        className="hp-menu__backdrop"
        aria-label={t("preview.chrome.closeMenu")}
        onClick={onClose}
      />
    </div>
  );
};

/**
 * Compact nav panel — render as a child of `.hp-dock` so it tracks drag position.
 */
export const PreviewMenuPanel = ({ onClose, onNavClick, placeBelow = false }) => {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <aside
      id="hp-menu-panel"
      className={`hp-menu-panel ${placeBelow ? "is-below" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={t("preview.chrome.menu")}
      onPointerDown={(event) => event.stopPropagation()}
    >
      <div className="hp-menu-panel__head">
        <div className="hp-menu-panel__brand">
          <span className="hp-menu-panel__sun" aria-hidden />
          <p className="hp-menu-panel__title">{t("preview.chrome.menuBrand")}</p>
        </div>
        <button
          type="button"
          className="hp-menu-panel__close"
          onClick={onClose}
          aria-label={t("preview.chrome.close")}
        >
          ×
        </button>
      </div>
      <nav className="hp-menu-panel__nav" aria-label={t("preview.chrome.nav")}>
        {PREVIEW_NAV.map((item) => {
          const isActive = item.path && location.pathname === item.path;
          const disabled = !item.path;
          return (
            <button
              key={item.labelKey}
              type="button"
              className={`hp-menu-panel__link ${isActive ? "is-active" : ""} ${
                disabled ? "is-disabled" : ""
              }`}
              onClick={() => onNavClick(item.path)}
              disabled={disabled}
              aria-current={isActive ? "page" : undefined}
            >
              <span className="hp-menu-panel__dot" aria-hidden />
              {t(item.labelKey)}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
