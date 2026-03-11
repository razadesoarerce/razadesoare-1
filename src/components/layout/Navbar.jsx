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
          {t("nav.schoolName")}
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
          <NavLink to="/">{t("nav.home")}</NavLink>

          <div className="dropdown">
            <span>{t("nav.about")}</span>
            <div className="dropdown-menu">
              <NavLink to="/despre/istoric">{t("about.history.label")}</NavLink>
              <NavLink to="/despre/misiune-viziune">{t("about.missionVision")}</NavLink>
              <NavLink to="/despre/echipa">{t("about.team")}</NavLink>
            </div>
          </div>

          <div className="dropdown">
            <span>{t("nav.education")}</span>
            <div className="dropdown-menu">
              <NavLink to="/educatie/curriculum-adaptat">{t("education.curriculum")}</NavLink>
              <NavLink to="/educatie/consiliere">{t("education.counseling")}</NavLink>
              <NavLink to="/educatie/logopedie">{t("education.logopedie")}</NavLink>
              <NavLink to="/educatie/kinetoterapie">{t("education.kinetoterapie")}</NavLink>
            </div>
          </div>

          <div className="dropdown">
            <span>{t("nav.information")}</span>
            <div className="dropdown-menu">
              <NavLink to="/informatii/admitere">{t("info.admission.title")}</NavLink>
              <NavLink to="/informatii/documente">{t("info.documents")}</NavLink>
              <NavLink to="/informatii/structura-anului-scolar">{t("info.structure")}</NavLink>
            </div>
          </div>

          <div className="dropdown">
            <span>{t("events.navLabel")}</span>
            <div className="dropdown-menu">
              <NavLink to="/evenimente">{t("events.stiriActivitati")}</NavLink>
              <NavLink to="/galerie-foto">{t("events.galerieFoto")}</NavLink>
            </div>
          </div>
        </div>

        <div className="language-switch">
          <div className="language-slider">
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;