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

      <section className="news-section" aria-labelledby="news-heading">
        <div className="container">
          <h2 id="news-heading" className="news-title">
            <span className="news-title-gray">Ultimele</span>{" "}
            <span className="news-title-green">Știri</span>
          </h2>
          <div className="news-grid">
            <article className="news-card">
              <div className="news-image" aria-hidden />
              <h3>Participare la Olimpiada Incluziunii</h3>
              <span className="news-date">12 Martie 2026</span>
              <p>
                Elevii Școlii Speciale Rază de Soare au participat la un eveniment
                dedicat incluziunii și performanței educaționale, demonstrând
                implicare și progres constant.
              </p>
              <a href="/evenimente" className="news-read-more">Read more</a>
            </article>
            <article className="news-card">
              <div className="news-image" aria-hidden />
              <h3>Atelier Creativ de Primăvară</h3>
              <span className="news-date">3 Martie 2026</span>
              <p>
                Activitatea a oferit elevilor oportunitatea de a-și dezvolta
                abilitățile artistice și sociale într-un cadru colaborativ.
              </p>
              <a href="/evenimente" className="news-read-more">Read more</a>
            </article>
            <article className="news-card">
              <div className="news-image" aria-hidden />
              <h3>Parteneriat Educațional Nou</h3>
              <span className="news-date">20 Februarie 2026</span>
              <p>
                Școala noastră a încheiat un nou parteneriat menit să sprijine
                integrarea elevilor prin programe educaționale adaptate.
              </p>
              <a href="/evenimente" className="news-read-more">Read more</a>
            </article>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;