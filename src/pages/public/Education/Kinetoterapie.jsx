import { useTranslation } from "react-i18next";
import SEO from "../../../components/common/SEO";

const Kinetoterapie = () => {
  const { t } = useTranslation();

  return (
    <>
      <SEO titleKey="education.kinetoterapie" descriptionKey="education.sectionTitle" />

      <section className="page-content-section editorial-content therapy-content">
        <h2 className="editorial-main-title">
          {t("education.kinetotherapyPage.title")}
        </h2>

        <p className="lead-paragraph">
          {t("education.kinetotherapyPage.lead")}
        </p>

        <p>
          {t("education.kinetotherapyPage.paragraph1")}
        </p>

        <div className="therapy-section">
          <h3>{t("education.kinetotherapyPage.objectivesTitle")}</h3>
          <ul className="therapy-list">
            <li>{t("education.kinetotherapyPage.objective1")}</li>
            <li>{t("education.kinetotherapyPage.objective2")}</li>
            <li>{t("education.kinetotherapyPage.objective3")}</li>
            <li>{t("education.kinetotherapyPage.objective4")}</li>
            <li>{t("education.kinetotherapyPage.objective5")}</li>
          </ul>
        </div>

        <div className="therapy-section">
          <h3>{t("education.kinetotherapyPage.interventionTitle")}</h3>
          <p>
            {t("education.kinetotherapyPage.intervention1")}
          </p>
          <p>
            {t("education.kinetotherapyPage.intervention2")}
          </p>
        </div>

        <div className="therapy-section">
          <h3>{t("education.kinetotherapyPage.integrationTitle")}</h3>
          <p>
            {t("education.kinetotherapyPage.integration1")}
          </p>
          <p>
            {t("education.kinetotherapyPage.integration2")}
          </p>
        </div>
      </section>
    </>
  );
};

export default Kinetoterapie;
