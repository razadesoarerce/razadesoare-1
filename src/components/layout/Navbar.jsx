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
              <NavLink to="/despre/istoric">{t("nav.history")}</NavLink>
              <NavLink to="/despre/viziune">{t("nav.vision")}</NavLink>
              <NavLink to="/despre/organigrama">{t("nav.organization")}</NavLink>
            </div>
          </div>

          <div className="dropdown">
            <span>{t("nav.education")}</span>
            <div className="dropdown-menu">
              <NavLink to="/educatie/curriculum-adaptat">{t("nav.curriculum")}</NavLink>
              <NavLink to="/educatie/terapii-aba">{t("nav.aba")}</NavLink>
              <NavLink to="/educatie/consiliere">{t("nav.counselling")}</NavLink>
              <NavLink to="/educatie/logopedie">{t("nav.speechTherapy")}</NavLink>
              <NavLink to="/educatie/kinetoterapie">{t("nav.physiotherapy")}</NavLink>
            </div>
          </div>

          <div className="dropdown">
            <span>{t("nav.information")}</span>
            <div className="dropdown-menu">
              <NavLink to="/informatii/structura-anului-scolar">
                {t("nav.schoolYearStructure")}
              </NavLink>
              <NavLink to="/informatii/locatie">{t("nav.location")}</NavLink>
            </div>
          </div>

          <NavLink to="/evenimente">{t("nav.events")}</NavLink>
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