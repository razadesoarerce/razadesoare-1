import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getLatestEvents } from "../../../services/eventService";
import { getExcerpt } from "../../../utils/excerpt";
import "./Home.css";

const formatDate = (d) => {
  if (!d) return "";
  const date = d instanceof Date ? d : new Date(d);
  return date.toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" });
};

const Home = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language.startsWith("en") ? "en" : "ro";
  const [latestEvents, setLatestEvents] = useState([]);

  useEffect(() => {
    getLatestEvents(3).then(setLatestEvents).catch(() => setLatestEvents([]));
  }, []);

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
                style={{ backgroundImage: "url(/images/home/hero-vision.jpg)" }}
                aria-hidden
              />
              <span className="feature-card__overlay" aria-hidden />
              <div className="feature-content">
                <h2>{t("home.hero.mission.title")}</h2>
                <p>{t("home.hero.mission.description")}</p>
                <span className="read-more">{t("home.hero.mission.cta")}</span>
              </div>
            </Link>
            <Link to="/educatie/curriculum-adaptat" className="feature-card">
              <span
                className="feature-card__image"
                style={{ backgroundImage: "url(/images/home/hero-curriculum.jpg)" }}
                aria-hidden
              />
              <span className="feature-card__overlay" aria-hidden />
              <div className="feature-content">
                <h2>{t("home.hero.education.title")}</h2>
                <p>{t("home.hero.education.description")}</p>
                <span className="read-more">{t("home.hero.education.cta")}</span>
              </div>
            </Link>
            <Link to="/informatii/admitere" className="feature-card">
              <span
                className="feature-card__image"
                style={{ backgroundImage: "url(/images/home/hero-informatii.jpg)" }}
                aria-hidden
              />
              <span className="feature-card__overlay" aria-hidden />
              <div className="feature-content">
                <h2>{t("home.hero.information.title")}</h2>
                <p>{t("home.hero.information.description")}</p>
                <span className="read-more">{t("home.hero.information.cta")}</span>
              </div>
            </Link>
            <Link to="/evenimente" className="feature-card">
              <span
                className="feature-card__image"
                style={{ backgroundImage: "url(/images/home/hero-events.jpg)" }}
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
            {latestEvents.length === 0 ? (
              <p className="news-empty">{t("home.news.empty", "Nu există știri recente.")}</p>
            ) : (
              latestEvents.map((event) => {
                const coverUrl = event.coverImageUrl || event.coverImage || event.imageUrl;
                return (
                  <article key={event.id} className="news-card">
                    <div className="news-image" aria-hidden>
                      {coverUrl ? (
                        <img
                          src={coverUrl}
                          alt={event.title}
                          className="event-card-image"
                        />
                      ) : null}
                    </div>
                    <h3>{event.title}</h3>
                    <span className="news-date">{formatDate(event.createdAt)}</span>
                    <p>{getExcerpt(event.content, 120)}</p>
                    <Link to={`/evenimente/${event.id}`} className="news-read-more">
                      {t("home.news.readMore", "Citeste mai mult")}
                    </Link>
                  </article>
                );
              })
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;