import { useTranslation } from "react-i18next";
import SEO from "../../../components/common/SEO";

const Curriculum = () => {
  const { t } = useTranslation();

  return (
    <>
      <SEO titleKey="education.curriculum" descriptionKey="education.sectionTitle" />

      <section className="page-content-section editorial-content curriculum-content">
        <h2 className="editorial-main-title">
          {t("education.curriculumPage.title")}
        </h2>

        <p className="lead-paragraph">
          {t("education.curriculumPage.lead")}
        </p>

        <p>
          {t("education.curriculumPage.paragraph1")}
        </p>

        <div className="curriculum-section">
          <h3>{t("education.curriculumPage.principlesTitle")}</h3>
          <ul className="curriculum-list">
            {t("education.curriculumPage.principlesList", { returnObjects: true }).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="curriculum-section">
          <h3>{t("education.curriculumPage.domainsTitle")}</h3>
          {Object.values(t("education.curriculumPage.domains", { returnObjects: true })).map((domain, index) => (
            <div className="curriculum-domain" key={index}>
              <h4>{domain.title}</h4>
              <p>{domain.text}</p>
            </div>
          ))}
        </div>

        <div className="curriculum-section">
          <h3>{t("education.curriculumPage.structureTitle")}</h3>
          <p>{t("education.curriculumPage.structureParagraph1")}</p>
          <p>{t("education.curriculumPage.structureParagraph2")}</p>
        </div>

        <div className="curriculum-section">
          <h3>{t("education.curriculumPage.evaluationTitle")}</h3>
          <p>{t("education.curriculumPage.evaluationParagraph1")}</p>
          <p>{t("education.curriculumPage.evaluationParagraph2")}</p>
        </div>
      </section>
    </>
  );
};

export default Curriculum;
