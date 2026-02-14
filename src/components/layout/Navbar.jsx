import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className={`navbar ${mobileMenuOpen ? "mobile-menu-open" : ""}`} aria-label="Navigare principală">
      <div className="navbar-container container">
        <Link to="/" className="logo" onClick={() => setMobileMenuOpen(false)}>
          Școala Specială Rază de Soare
        </Link>

        <button
          type="button"
          className="burger-button"
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Închide meniul" : "Deschide meniul"}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="burger-bar" aria-hidden />
          <span className="burger-bar" aria-hidden />
          <span className="burger-bar" aria-hidden />
        </button>

        <div className="nav-links" role="navigation">
          <NavLink to="/">Acasă</NavLink>

          <div className="dropdown">
            <span>Despre noi</span>
            <div className="dropdown-menu">
              <NavLink to="/despre/istoric">Istoric</NavLink>
              <NavLink to="/despre/viziune">Viziune</NavLink>
              <NavLink to="/despre/organigrama">Organigramă</NavLink>
            </div>
          </div>

          <div className="dropdown">
            <span>Educație</span>
            <div className="dropdown-menu">
              <NavLink to="/educatie/curriculum-adaptat">Curriculum adaptat</NavLink>
              <NavLink to="/educatie/terapii-aba">Terapii ABA</NavLink>
              <NavLink to="/educatie/consiliere">Consiliere</NavLink>
              <NavLink to="/educatie/logopedie">Logopedie</NavLink>
              <NavLink to="/educatie/kinetoterapie">Kinetoterapie</NavLink>
            </div>
          </div>

          <div className="dropdown">
            <span>Informații</span>
            <div className="dropdown-menu">
              <NavLink to="/informatii/structura-anului-scolar">
                Structura anului școlar
              </NavLink>
              <NavLink to="/informatii/locatie">Locație</NavLink>
            </div>
          </div>

          <NavLink to="/evenimente">Evenimente</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;