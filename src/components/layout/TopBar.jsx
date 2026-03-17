import { FaFacebookF } from "react-icons/fa";
import "./topbar.css";

const TopBar = () => {
  return (
    <div className="topbar">
      <div className="topbar-container container">
        <div className="topbar-left">
          <span className="topbar-item">📞 0257 214 805</span>
          <span> | </span>
          <span className="topbar-item">✉ razadesoarerce@yahoo.com</span>
          <span> | </span>
          <span className="topbar-item topbar-address">📍 Arad, Strada Diogene nr 12</span>
        </div>

        <div className="topbar-right">
          <a
            href="https://www.facebook.com/scoala.razadesoare"
            target="_blank"
            rel="noopener noreferrer"
            className="topheader-facebook"
            aria-label="Facebook"
          >
            <FaFacebookF />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;