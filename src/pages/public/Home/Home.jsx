import "./Home.css";

const Home = () => {
  return (
    <>
      <div style={{ padding: "40px" }}>
        <h1>Acasă</h1>
      </div>

      <section className="feature-grid-section" aria-labelledby="feature-grid-heading">
        <div className="container">
          <h2 id="feature-grid-heading" className="visually-hidden">
            Oferte și programe
          </h2>
          <div className="feature-grid">
            <a href="/educatie/curriculum-adaptat" className="feature-card">
              <span
                className="feature-card__image"
                style={{ backgroundImage: "url(https://picsum.photos/600/400?random=1)" }}
                aria-hidden
              />
              <span className="feature-card__overlay" aria-hidden />
              <div className="feature-card__content">
                <h3 className="feature-card__title">Curriculum adaptat</h3>
                <div className="feature-card__panel">
                  <h3 className="feature-card__panel-title">Curriculum adaptat</h3>
                  <p className="feature-card__desc">
                    Curriculum adaptat la nevoile fiecărui elev, pentru o dezvoltare armonioasă.
                  </p>
                  <span className="feature-card__btn">Learn More</span>
                </div>
              </div>
            </a>
            <a href="/educatie/terapii-aba" className="feature-card">
              <span
                className="feature-card__image"
                style={{ backgroundImage: "url(https://picsum.photos/600/400?random=2)" }}
                aria-hidden
              />
              <span className="feature-card__overlay" aria-hidden />
              <div className="feature-card__content">
                <h3 className="feature-card__title">Terapii ABA</h3>
                <div className="feature-card__panel">
                  <h3 className="feature-card__panel-title">Terapii ABA</h3>
                  <p className="feature-card__desc">
                    Terapii ABA pentru sprijin comportamental și învățare structurată.
                  </p>
                  <span className="feature-card__btn">Learn More</span>
                </div>
              </div>
            </a>
            <a href="/evenimente" className="feature-card">
              <span
                className="feature-card__image"
                style={{ backgroundImage: "url(https://picsum.photos/600/400?random=3)" }}
                aria-hidden
              />
              <span className="feature-card__overlay" aria-hidden />
              <div className="feature-card__content">
                <h3 className="feature-card__title">Evenimente</h3>
                <div className="feature-card__panel">
                  <h3 className="feature-card__panel-title">Evenimente</h3>
                  <p className="feature-card__desc">
                    Evenimente, ateliere și activități pentru elevi și familii.
                  </p>
                  <span className="feature-card__btn">Learn More</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;