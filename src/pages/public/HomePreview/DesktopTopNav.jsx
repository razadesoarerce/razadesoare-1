import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaFacebookF } from "react-icons/fa";
import { setAppLanguage } from "../../../i18n";
import { PREVIEW_NAV } from "./previewNav";

const FlagRo = () => (
  <svg className="hp-topnav__flag" viewBox="0 0 24 16" aria-hidden>
    <rect width="8" height="16" fill="#002B7F" />
    <rect x="8" width="8" height="16" fill="#FCD116" />
    <rect x="16" width="8" height="16" fill="#CE1126" />
  </svg>
);

const FlagUs = () => (
  <svg className="hp-topnav__flag" viewBox="0 0 24 16" aria-hidden>
    <rect width="24" height="16" fill="#B22234" />
    <rect y="1.23" width="24" height="1.23" fill="#fff" />
    <rect y="3.69" width="24" height="1.23" fill="#fff" />
    <rect y="6.15" width="24" height="1.23" fill="#fff" />
    <rect y="8.62" width="24" height="1.23" fill="#fff" />
    <rect y="11.08" width="24" height="1.23" fill="#fff" />
    <rect y="13.54" width="24" height="1.23" fill="#fff" />
    <rect width="10" height="8.6" fill="#3C3B6E" />
  </svg>
);

/**
 * Classic top band for wide screens — subtle text links, no button chrome.
 * Phone keeps the floating dock; this bar is CSS-hidden below the desktop breakpoint.
 */
const DesktopTopNav = ({ onContactClick, contactTriggerRef }) => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const activeLang = i18n.language?.startsWith("en") ? "EN" : "RO";

  const onNavClick = (path) => {
    if (!path) return;
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    navigate(path);
  };

  return (
    <header className="hp-topnav" role="banner">
      <div className="hp-topnav__inner">
        <p className="hp-topnav__brand">{t("preview.chrome.navBrand")}</p>

        <nav className="hp-topnav__nav" aria-label={t("preview.chrome.nav")}>
          {PREVIEW_NAV.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                type="button"
                className={`hp-topnav__link ${isActive ? "is-active" : ""}`}
                aria-current={isActive ? "page" : undefined}
                onClick={() => onNavClick(item.path)}
              >
                {t(item.labelKey)}
              </button>
            );
          })}
        </nav>

        <span className="hp-topnav__divider" aria-hidden />

        <div className="hp-topnav__tools">
          {typeof onContactClick === "function" ? (
            <button
              type="button"
              ref={contactTriggerRef}
              className="hp-topnav__link hp-topnav__contact"
              data-contact-trigger
              data-contact-surface="chrome"
              onClick={onContactClick}
            >
              {t("preview.contact.navLabel")}
            </button>
          ) : null}
          <div className="hp-topnav__langs" role="group" aria-label={t("preview.chrome.langAria", { lang: activeLang })}>
            <button
              type="button"
              className={`hp-topnav__tool hp-topnav__lang ${activeLang === "RO" ? "is-active" : ""}`}
              onClick={() => setAppLanguage("ro")}
              aria-label={t("preview.chrome.langRoAria")}
              aria-pressed={activeLang === "RO"}
            >
              <FlagRo />
              <span>RO</span>
            </button>
            <button
              type="button"
              className={`hp-topnav__tool hp-topnav__lang ${activeLang === "EN" ? "is-active" : ""}`}
              onClick={() => setAppLanguage("en")}
              aria-label={t("preview.chrome.langEnAria")}
              aria-pressed={activeLang === "EN"}
            >
              <FlagUs />
              <span>EN</span>
            </button>
          </div>
          <a
            className="hp-topnav__tool hp-topnav__facebook"
            href="https://www.facebook.com/scoala.razadesoare"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("preview.chrome.facebook")}
          >
            <FaFacebookF aria-hidden />
          </a>
        </div>
      </div>
      <hr className="hp-despre-rule hp-topnav__rule" aria-hidden />
    </header>
  );
};

export default DesktopTopNav;
