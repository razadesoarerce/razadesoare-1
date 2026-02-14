import { useTranslation } from "react-i18next";
import "./Home.css";

const Home = () => {
  const { t } = useTranslation();

  return (
    <>
      <section className="feature-grid" aria-labelledby="feature-grid-heading">
        <h2 id="feature-grid-heading" className="visually-hidden">
          Oferte și programe
        </h2>
        <div className="grid">
            <a href="/despre/viziune" className="feature-card">
              <span
                className="feature-card__image"
                style={{ backgroundImage: "url(https://picsum.photos/600/400?random=1)" }}
                aria-hidden
              />
              <span className="feature-card__overlay" aria-hidden />
              <div className="feature-content">
                <h2>{t("home.hero.vision.title")}</h2>
                <p>{t("home.hero.vision.description")}</p>
                <span className="read-more">{t("home.hero.vision.cta")}</span>
              </div>
            </a>
            <a href="/educatie/curriculum-adaptat" className="feature-card">
              <span
                className="feature-card__image"
                style={{ backgroundImage: "url(https://picsum.photos/600/400?random=2)" }}
                aria-hidden
              />
              <span className="feature-card__overlay" aria-hidden />
              <div className="feature-content">
                <h2>{t("home.hero.curriculum.title")}</h2>
                <p>{t("home.hero.curriculum.description")}</p>
                <span className="read-more">{t("home.hero.curriculum.cta")}</span>
              </div>
            </a>
            <a href="/educatie/terapii-aba" className="feature-card">
              <span
                className="feature-card__image"
                style={{ backgroundImage: "url(https://picsum.photos/600/400?random=3)" }}
                aria-hidden
              />
              <span className="feature-card__overlay" aria-hidden />
              <div className="feature-content">
                <h2>{t("home.hero.aba.title")}</h2>
                <p>{t("home.hero.aba.description")}</p>
                <span className="read-more">{t("home.hero.aba.cta")}</span>
              </div>
            </a>
            <a href="/evenimente" className="feature-card">
              <span
                className="feature-card__image"
                style={{ backgroundImage: "url(https://picsum.photos/600/400?random=4)" }}
                aria-hidden
              />
              <span className="feature-card__overlay" aria-hidden />
              <div className="feature-content">
                <h2>{t("home.hero.events.title")}</h2>
                <p>{t("home.hero.events.description")}</p>
                <span className="read-more">{t("home.hero.events.cta")}</span>
              </div>
            </a>
        </div>
      </section>

      <section className="news-section" aria-labelledby="news-heading">
        <div className="container">
          <h2 id="news-heading" className="news-section-title">
            <span className="news-title-grey">{t("home.news.sectionTitlePart1")}</span>
            {" "}
            <span className="news-title-green">{t("home.news.sectionTitlePart2")}</span>
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
              <a href="/evenimente" className="news-read-more">{t("home.news.readMore")}</a>
            </article>
            <article className="news-card">
              <div className="news-image" aria-hidden />
              <h3>Atelier Creativ de Primăvară</h3>
              <span className="news-date">3 Martie 2026</span>
              <p>
                Activitatea a oferit elevilor oportunitatea de a-și dezvolta
                abilitățile artistice și sociale într-un cadru colaborativ.
              </p>
              <a href="/evenimente" className="news-read-more">{t("home.news.readMore")}</a>
            </article>
            <article className="news-card">
              <div className="news-image" aria-hidden />
              <h3>Parteneriat Educațional Nou</h3>
              <span className="news-date">20 Februarie 2026</span>
              <p>
                Școala noastră a încheiat un nou parteneriat menit să sprijine
                integrarea elevilor prin programe educaționale adaptate.
              </p>
              <a href="/evenimente" className="news-read-more">{t("home.news.readMore")}</a>
            </article>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;