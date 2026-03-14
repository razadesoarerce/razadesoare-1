import "./topbar.css";

const TopBar = () => {
  return (
    <div className="topbar">
      <div className="topbar-container container">
        <div className="topbar-left">
          <span>📞 0257 214 805</span>
          <span> | </span>
          <span>✉ razadesoarerce@yahoo.com</span>
        </div>

        <div className="topbar-right topbar-secondary">
          <span> | </span>
          <span>📍 Arad, Strada Diogene nr 12</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;