import { Link, NavLink } from "react-router-dom";
import "./navbar.css";
import logo from "../../assets/logo.svg";


const Navbar = () => {
  return (
    <header className="navbar">
      <div className="navbar-container container">
      <Link to="/" className="logo">
  <img src={logo} alt="Logo Rază de Soare" className="logo-img" />
  <span className="logo-text">Raza de Soare</span>
</Link>

        <nav className="nav-links">
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
        </nav>
      </div>
    </header>
  );
};

export default Navbar;