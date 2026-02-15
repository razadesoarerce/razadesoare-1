import { useTranslation } from "react-i18next";
import SEO from "../../../components/common/SEO";

const Consiliere = () => {
  const { t } = useTranslation();

  return (
    <>
      <SEO titleKey="education.counseling" descriptionKey="education.sectionTitle" />

      <section className="page-content-section editorial-content therapy-content">
        <h2 className="editorial-main-title">
          {t("education.counselingPage.title")}
        </h2>

        <p className="lead-paragraph">
          {t("education.counselingPage.lead")}
        </p>

        <p>
          {t("education.counselingPage.paragraph1")}
        </p>

        <div className="therapy-section">
          <h3>{t("education.counselingPage.objectivesTitle")}</h3>
          <ul className="therapy-list">
            {t("education.counselingPage.objectivesList", { returnObjects: true }).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="therapy-section">
          <h3>{t("education.counselingPage.methodsTitle")}</h3>
          <p>{t("education.counselingPage.methodsParagraph1")}</p>
          <p>{t("education.counselingPage.methodsParagraph2")}</p>
        </div>

        <div className="therapy-section">
          <h3>{t("education.counselingPage.roleTitle")}</h3>
          <p>{t("education.counselingPage.roleParagraph")}</p>
        </div>
      </section>
    </>
  );
};

export default Consiliere;
