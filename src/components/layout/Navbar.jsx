import { useState, useEffect, useRef, useContext } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MobileAlbumContext } from "../../context/MobileAlbumContext";
import "./navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAlbumOpen } = useContext(MobileAlbumContext) ?? {};
  const isStickyActive = !menuOpen && !isAlbumOpen;
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const touchStartX = useRef(null);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!touchStartX.current) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > 80) setMenuOpen(false);
    touchStartX.current = null;
  };

  return (
    <nav className={`navbar ${menuOpen ? "mobile-menu-open" : ""} ${isStickyActive ? "navbar--sticky" : ""}`} aria-label={t("nav.ariaLabel")}>
      <div
        className={`mobile-overlay ${menuOpen ? "open" : ""}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden
      />
      <div className="navbar-container container">
        <Link to="/" className="logo navbar-logo" onClick={() => setMenuOpen(false)}>
          <img src="/logo_raza_de_soare.png" alt="Raza de Soare" className="site-logo" />
        </Link>

        <div
          className={`mobile-menu ${menuOpen ? "open" : ""}`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="nav-links" role="navigation">
            <div className="mobile-menu-section">
              <NavLink
                to="/"
                className={location.pathname === "/" ? "active" : ""}
                onClick={() => setMenuOpen(false)}
              >
                {t("nav.home")}
              </NavLink>
            </div>

            <div className={`dropdown mobile-menu-section ${location.pathname.startsWith("/despre") ? "active-parent" : ""}`}>
              <span>{t("nav.about")}</span>
              <div className="dropdown-menu mobile-submenu">
                <NavLink to="/despre/istoric" className={location.pathname === "/despre/istoric" ? "active" : ""} onClick={() => setMenuOpen(false)}>{t("about.history.label")}</NavLink>
                <NavLink to="/despre/misiune-viziune" className={location.pathname === "/despre/misiune-viziune" ? "active" : ""} onClick={() => setMenuOpen(false)}>{t("about.missionVision")}</NavLink>
                <NavLink to="/despre/echipa" className={location.pathname === "/despre/echipa" ? "active" : ""} onClick={() => setMenuOpen(false)}>{t("about.team")}</NavLink>
              </div>
            </div>

            <div className={`dropdown mobile-menu-section ${location.pathname.startsWith("/educatie") ? "active-parent" : ""}`}>
              <span>{t("nav.education")}</span>
              <div className="dropdown-menu mobile-submenu">
                <NavLink to="/educatie/curriculum-adaptat" className={location.pathname === "/educatie/curriculum-adaptat" ? "active" : ""} onClick={() => setMenuOpen(false)}>{t("education.curriculum")}</NavLink>
                <NavLink to="/educatie/consiliere" className={location.pathname === "/educatie/consiliere" ? "active" : ""} onClick={() => setMenuOpen(false)}>{t("education.counseling")}</NavLink>
                <NavLink to="/educatie/logopedie" className={location.pathname === "/educatie/logopedie" ? "active" : ""} onClick={() => setMenuOpen(false)}>{t("education.logopedie")}</NavLink>
                <NavLink to="/educatie/kinetoterapie" className={location.pathname === "/educatie/kinetoterapie" ? "active" : ""} onClick={() => setMenuOpen(false)}>{t("education.kinetoterapie")}</NavLink>
              </div>
            </div>

            <div className={`dropdown mobile-menu-section ${location.pathname.startsWith("/informatii") ? "active-parent" : ""}`}>
              <span>{t("nav.information")}</span>
              <div className="dropdown-menu mobile-submenu">
                <NavLink to="/informatii/admitere" className={location.pathname === "/informatii/admitere" ? "active" : ""} onClick={() => setMenuOpen(false)}>{t("info.admission.title")}</NavLink>
                <NavLink to="/informatii/documente" className={location.pathname === "/informatii/documente" ? "active" : ""} onClick={() => setMenuOpen(false)}>{t("info.documents")}</NavLink>
                <NavLink to="/informatii/structura-anului-scolar" className={location.pathname === "/informatii/structura-anului-scolar" ? "active" : ""} onClick={() => setMenuOpen(false)}>{t("info.structure")}</NavLink>
              </div>
            </div>

            <div className={`dropdown mobile-menu-section ${location.pathname.startsWith("/evenimente") || location.pathname.startsWith("/galerie-foto") ? "active-parent" : ""}`}>
              <span>{t("events.navLabel")}</span>
              <div className="dropdown-menu mobile-submenu">
                <NavLink to="/evenimente" className={location.pathname.startsWith("/evenimente") ? "active" : ""} onClick={() => setMenuOpen(false)}>{t("events.stiriActivitati")}</NavLink>
                <NavLink to="/galerie-foto" className={location.pathname.startsWith("/galerie-foto") ? "active" : ""} onClick={() => setMenuOpen(false)}>{t("events.galerieFoto")}</NavLink>
              </div>
            </div>
          </div>
        </div>

        <div className="navbar-right">
          <button
            type="button"
            className={`burger-button navbar-toggle ${menuOpen ? "active" : ""}`}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span aria-hidden />
            <span aria-hidden />
            <span aria-hidden />
          </button>
          <div className="language-switch navbar-lang">
          <div className="language-slider language-slider-desktop">
            <button
              type="button"
              className={i18n.language === "ro" ? "active" : ""}
              onClick={() => i18n.changeLanguage("ro")}
            >
              RO
            </button>
            <button
              type="button"
              className={i18n.language === "en" ? "active" : ""}
              onClick={() => i18n.changeLanguage("en")}
            >
              EN
            </button>
          </div>
          <div className="language-slider language-slider-mobile">
            {i18n.language === "ro" ? (
              <button type="button" onClick={() => i18n.changeLanguage("en")}>EN</button>
            ) : (
              <button type="button" onClick={() => i18n.changeLanguage("ro")}>RO</button>
            )}
          </div>
        </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;