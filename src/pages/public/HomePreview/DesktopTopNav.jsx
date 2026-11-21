import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaFacebookF } from "react-icons/fa";
import { setAppLanguage } from "../../../i18n";
import { PREVIEW_NAV } from "./previewNav";

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

  const toggleLanguage = () => {
    setAppLanguage(activeLang === "RO" ? "en" : "ro");
  };

  return (
    <header className="hp-topnav" role="banner">
      <div className="hp-topnav__inner">
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

        <div className="hp-topnav__tools">
          {typeof onContactClick === "function" ? (
            <button
              type="button"
              ref={contactTriggerRef}
              className="hp-topnav__link hp-topnav__contact"
              data-contact-trigger
              onClick={onContactClick}
            >
              {t("preview.contact.cta")}
            </button>
          ) : null}
          <button
            type="button"
            className="hp-topnav__tool"
            onClick={toggleLanguage}
            aria-label={t("preview.chrome.langAria", { lang: activeLang })}
          >
            {activeLang}
          </button>
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
    </header>
  );
};

export default DesktopTopNav;
