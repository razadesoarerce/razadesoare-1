import { useTranslation } from "react-i18next";
import SEO from "../../../components/common/SEO";

const Echipa = () => {
  const { t } = useTranslation();
  const categories = t("about.teamPage.categories", { returnObjects: true });

  return (
    <>
      <SEO titleKey="about.team" descriptionKey="about.sectionTitle" />

      <section className="page-content-section editorial-content team-content">
        <h2 className="editorial-main-title">
          {t("about.teamPage.title")}
        </h2>

        <p className="team-intro">
          {t("about.teamPage.intro1")}
        </p>

        <p className="team-intro">
          {t("about.teamPage.intro2")}
        </p>

        {Object.values(categories).map((category, index) => (
          <div className="team-category" key={index}>
            <h3>{category.title}</h3>
            <div className="team-grid">
              {category.members.map((member, idx) => (
                <div className="team-member" key={idx}>
                  <strong>{member.name}</strong>
                  <span className="role">{member.role}</span>
                  <span className="details">{member.details}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default Echipa;
