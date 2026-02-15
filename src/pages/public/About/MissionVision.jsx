import { useTranslation } from "react-i18next";

const MissionVision = () => {
  const { t } = useTranslation();

  return (
    <section className="page-content-section editorial-content mission-vision-content">
      <h2 className="editorial-main-title">
        {t("about.missionVisionPage.title")}
      </h2>

      <div className="mission-section">
        <h3 className="section-title">
          {t("about.missionVisionPage.missionTitle")}
        </h3>
        <p className="lead-paragraph">
          {t("about.missionVisionPage.missionLead")}
        </p>
        <p>{t("about.missionVisionPage.missionParagraph1")}</p>
        <ul className="mission-list">
          {t("about.missionVisionPage.missionList", { returnObjects: true }).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p>{t("about.missionVisionPage.missionParagraph2")}</p>
        <p>{t("about.missionVisionPage.missionParagraph3")}</p>
      </div>

      <div className="vision-section">
        <h3 className="section-title">
          {t("about.missionVisionPage.visionTitle")}
        </h3>
        <p>{t("about.missionVisionPage.visionParagraph1")}</p>
        <p>{t("about.missionVisionPage.visionParagraph2")}</p>
        <p>{t("about.missionVisionPage.visionParagraph3")}</p>
        <p>{t("about.missionVisionPage.visionParagraph4")}</p>
        <p>{t("about.missionVisionPage.visionParagraph5")}</p>
      </div>
    </section>
  );
};

export default MissionVision;
