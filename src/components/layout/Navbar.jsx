import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./navbar.css";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  return (
    <nav className={`navbar ${mobileMenuOpen ? "mobile-menu-open" : ""}`} aria-label={t("nav.ariaLabel")}>
      <div className="navbar-container container">
        <Link to="/" className="logo" onClick={() => setMobileMenuOpen(false)}>
          <img src="/logo_raza_de_soare.png" alt="Raza de Soare" className="site-logo" />
        </Link>

        <button
          type="button"
          className="burger-button"
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="burger-bar" aria-hidden />
          <span className="burger-bar" aria-hidden />
          <span className="burger-bar" aria-hidden />
        </button>

        <div className="nav-links" role="navigation">
          <NavLink to="/" onClick={() => setMobileMenuOpen(false)}>{t("nav.home")}</NavLink>

          <div className="dropdown">
            <span>{t("nav.about")}</span>
            <div className="dropdown-menu">
              <NavLink to="/despre/istoric" onClick={() => setMobileMenuOpen(false)}>{t("about.history.label")}</NavLink>
              <NavLink to="/despre/misiune-viziune" onClick={() => setMobileMenuOpen(false)}>{t("about.missionVision")}</NavLink>
              <NavLink to="/despre/echipa" onClick={() => setMobileMenuOpen(false)}>{t("about.team")}</NavLink>
            </div>
          </div>

          <div className="dropdown">
            <span>{t("nav.education")}</span>
            <div className="dropdown-menu">
              <NavLink to="/educatie/curriculum-adaptat" onClick={() => setMobileMenuOpen(false)}>{t("education.curriculum")}</NavLink>
              <NavLink to="/educatie/consiliere" onClick={() => setMobileMenuOpen(false)}>{t("education.counseling")}</NavLink>
              <NavLink to="/educatie/logopedie" onClick={() => setMobileMenuOpen(false)}>{t("education.logopedie")}</NavLink>
              <NavLink to="/educatie/kinetoterapie" onClick={() => setMobileMenuOpen(false)}>{t("education.kinetoterapie")}</NavLink>
            </div>
          </div>

          <div className="dropdown">
            <span>{t("nav.information")}</span>
            <div className="dropdown-menu">
              <NavLink to="/informatii/admitere" onClick={() => setMobileMenuOpen(false)}>{t("info.admission.title")}</NavLink>
              <NavLink to="/informatii/documente" onClick={() => setMobileMenuOpen(false)}>{t("info.documents")}</NavLink>
              <NavLink to="/informatii/structura-anului-scolar" onClick={() => setMobileMenuOpen(false)}>{t("info.structure")}</NavLink>
            </div>
          </div>

          <div className="dropdown">
            <span>{t("events.navLabel")}</span>
            <div className="dropdown-menu">
              <NavLink to="/evenimente" onClick={() => setMobileMenuOpen(false)}>{t("events.stiriActivitati")}</NavLink>
              <NavLink to="/galerie-foto" onClick={() => setMobileMenuOpen(false)}>{t("events.galerieFoto")}</NavLink>
            </div>
          </div>
        </div>

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
    </nav>
  );
};

export default Navbar;