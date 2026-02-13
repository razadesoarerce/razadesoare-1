import "./Home.css";

const Home = () => {
  return (
    <>
      <section className="feature-grid" aria-labelledby="feature-grid-heading">
        <h2 id="feature-grid-heading" className="visually-hidden">
          Oferte și programe
        </h2>
        <div className="grid">
            <a href="/educatie/curriculum-adaptat" className="feature-card">
              <span
                className="feature-card__image"
                style={{ backgroundImage: "url(https://picsum.photos/600/400?random=1)" }}
                aria-hidden
              />
              <span className="feature-card__overlay" aria-hidden />
              <div className="feature-content">
                <h2>Curriculum adaptat</h2>
                <p>Curriculum adaptat la nevoile fiecărui elev, pentru o dezvoltare armonioasă.</p>
                <span className="read-more">Read more</span>
              </div>
            </a>
            <a href="/educatie/terapii-aba" className="feature-card">
              <span
                className="feature-card__image"
                style={{ backgroundImage: "url(https://picsum.photos/600/400?random=2)" }}
                aria-hidden
              />
              <span className="feature-card__overlay" aria-hidden />
              <div className="feature-content">
                <h2>Terapii ABA</h2>
                <p>Terapii ABA pentru sprijin comportamental și învățare structurată.</p>
                <span className="read-more">Read more</span>
              </div>
            </a>
            <a href="/evenimente" className="feature-card">
              <span
                className="feature-card__image"
                style={{ backgroundImage: "url(https://picsum.photos/600/400?random=3)" }}
                aria-hidden
              />
              <span className="feature-card__overlay" aria-hidden />
              <div className="feature-content">
                <h2>Evenimente</h2>
                <p>Evenimente, ateliere și activități pentru elevi și familii.</p>
                <span className="read-more">Read more</span>
              </div>
            </a>
            <a href="/despre/viziune" className="feature-card">
              <span
                className="feature-card__image"
                style={{ backgroundImage: "url(https://picsum.photos/600/400?random=4)" }}
                aria-hidden
              />
              <span className="feature-card__overlay" aria-hidden />
              <div className="feature-content">
                <h2>Comunitate</h2>
                <p>Colaborare cu familiile, parteneri și comunitatea pentru dezvoltarea elevilor.</p>
                <span className="read-more">Read more</span>
              </div>
            </a>
        </div>
      </section>
    </>
  );
};

export default Home;