import SEO from "../../../components/common/SEO";
import { useTranslation } from "react-i18next";

const Admitere = () => {
  const { t } = useTranslation();

  return (
    <>
      <SEO
        titleKey="info.admission.seoTitle"
        descriptionKey="info.admission.seoTitle"
      />

      <section className="page-content-section editorial-content admission-content">
        <h2 className="editorial-main-title">
          {t("info.admission.title")}
        </h2>

        <div className="admission-section">
          <h3>{t("info.admission.criteriaTitle")}</h3>

          <p>{t("info.admission.criteriaText1")}</p>
          <p>{t("info.admission.criteriaText2")}</p>
          <p>{t("info.admission.criteriaText3")}</p>
        </div>

        <div className="admission-section">
          <h3>{t("info.admission.documentsTitle")}</h3>

          <ul className="admission-list">
            <li>{t("info.admission.doc1")}</li>
            <li>{t("info.admission.doc2")}</li>
            <li>{t("info.admission.doc3")}</li>
            <li>{t("info.admission.doc4")}</li>
            <li>{t("info.admission.doc5")}</li>
            <li>{t("info.admission.doc6")}</li>
            <li>{t("info.admission.doc7")}</li>
          </ul>

          <p className="admission-note">
            {t("info.admission.note")}
          </p>
        </div>
      </section>
    </>
  );
};

export default Admitere;
