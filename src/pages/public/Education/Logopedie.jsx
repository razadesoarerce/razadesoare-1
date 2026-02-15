import { useTranslation } from "react-i18next";
import SEO from "../../../components/common/SEO";

const Logopedie = () => {
  const { t } = useTranslation();

  return (
    <>
      <SEO titleKey="education.logopedie" descriptionKey="education.sectionTitle" />

      <section className="page-content-section editorial-content therapy-content">
        <h2 className="editorial-main-title">
          {t("education.logopediePage.mainTitle")}
        </h2>

        <p className="lead-paragraph">
          {t("education.logopediePage.lead")}
        </p>

        <p>
          {t("education.logopediePage.intro")}
        </p>

        <div className="therapy-section">
          <h3>{t("education.logopediePage.contextTitle")}</h3>
          <p>
            {t("education.logopediePage.contextText")}
          </p>
        </div>

        <div className="therapy-section">
          <h3>{t("education.logopediePage.directionsTitle")}</h3>
          <ul className="therapy-list">
            <li>{t("education.logopediePage.directions.d1")}</li>
            <li>{t("education.logopediePage.directions.d2")}</li>
            <li>{t("education.logopediePage.directions.d3")}</li>
            <li>{t("education.logopediePage.directions.d4")}</li>
            <li>{t("education.logopediePage.directions.d5")}</li>
          </ul>
        </div>

        <div className="therapy-section">
          <h3>{t("education.logopediePage.methodsTitle")}</h3>
          <p>
            {t("education.logopediePage.methodsText1")}
          </p>
          <p>
            {t("education.logopediePage.methodsText2")}
          </p>
        </div>

        <div className="therapy-section">
          <h3>{t("education.logopediePage.roleTitle")}</h3>
          <p>
            {t("education.logopediePage.roleText")}
          </p>
        </div>
      </section>
    </>
  );
};

export default Logopedie;
