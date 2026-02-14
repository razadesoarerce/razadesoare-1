import "./topbar.css";

const TopBar = () => {
  return (
    <div className="topbar">
      <div className="topbar-container container">
        <div className="topbar-left">
          <span>📞 0257 257 257</span>
          <span> | </span>
          <span>✉ contact@razadesoare.ro</span>
          <span className="topbar-secondary"> | </span>
          <span className="topbar-secondary">"Educația este ceea ce rămâne după ce ai uitat tot ceea ce ai învățat în școală." - Albert Einstein</span>
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