import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Home.css";

const Home = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language.startsWith("en") ? "en" : "ro";

  const newsItems = [
    {
      id: 1,
      title: {
        ro: "Participare la Olimpiada Incluziunii",
        en: "Participation in the Inclusion Olympiad"
      },
      date: {
        ro: "12 Martie 2026",
        en: "March 12, 2026"
      },
      excerpt: {
        ro: "Elevii Școlii Speciale Rază de Soare au participat la un eveniment dedicat incluziunii și performanței educaționale, demonstrând implicare și progres constant.",
        en: "Students of Rază de Soare Special School participated in an event dedicated to inclusion and educational performance, demonstrating engagement and steady progress."
      }
    },
    {
      id: 2,
      title: {
        ro: "Atelier Creativ de Primăvară",
        en: "Spring Creative Workshop"
      },
      date: {
        ro: "3 Martie 2026",
        en: "March 3, 2026"
      },
      excerpt: {
        ro: "Activitatea a oferit elevilor oportunitatea de a-și dezvolta abilitățile artistice și sociale într-un cadru colaborativ.",
        en: "The activity provided students with the opportunity to develop artistic and social skills in a collaborative environment."
      }
    },
    {
      id: 3,
      title: {
        ro: "Parteneriat Educațional Nou",
        en: "New Educational Partnership"
      },
      date: {
        ro: "20 Februarie 2026",
        en: "February 20, 2026"
      },
      excerpt: {
        ro: "Școala noastră a încheiat un nou parteneriat menit să sprijine integrarea elevilor prin programe educaționale adaptate.",
        en: "Our school has established a new partnership aimed at supporting student integration through adapted educational programs."
      }
    }
  ];

  return (
    <>
      <section className="feature-grid" aria-labelledby="feature-grid-heading">
        <h2 id="feature-grid-heading" className="visually-hidden">
          Oferte și programe
        </h2>
        <div className="grid">
            <Link to="/despre/misiune-viziune" className="feature-card">
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
            </Link>
            <Link to="/educatie/curriculum-adaptat" className="feature-card">
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
            </Link>
            <Link to="/educatie/consiliere" className="feature-card">
              <span
                className="feature-card__image"
                style={{ backgroundImage: "url(https://picsum.photos/600/400?random=3)" }}
                aria-hidden
              />
              <span className="feature-card__overlay" aria-hidden />
              <div className="feature-content">
                <h2>{t("home.hero.therapies.title")}</h2>
                <p>{t("home.hero.therapies.description")}</p>
                <span className="read-more">{t("home.hero.therapies.cta")}</span>
              </div>
            </Link>
            <Link to="/evenimente" className="feature-card">
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
            </Link>
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
            {newsItems.map((item) => (
              <article key={item.id} className="news-card">
                <div className="news-image" aria-hidden />
                <h3>{item.title[lang]}</h3>
                <span className="news-date">{item.date[lang]}</span>
                <p>{item.excerpt[lang]}</p>
                <Link to="/evenimente" className="news-read-more">
                  {t("home.news.readMore")}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;