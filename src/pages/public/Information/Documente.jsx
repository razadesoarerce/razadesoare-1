import { useTranslation } from "react-i18next";
import SEO from "../../../components/common/SEO";

const Documente = () => {
  const { t } = useTranslation();

  return (
    <>
      <SEO titleKey="info.documents" descriptionKey="information.sectionTitle" />

      <section className="page-content-section editorial-content documents-content">
        <h2 className="editorial-main-title">
          {t("documents.pageTitle")}
        </h2>

        <p className="lead-paragraph">
          {t("documents.intro")}
        </p>

        {/* DOCUMENTE INTERNE */}
        <div className="documents-block">
          <h3>{t("documents.internal.title")}</h3>

          <div className="documents-list">

            <div className="document-item">
              <div className="document-info">
                <h4>{t("documents.internal.enrollmentForm.title")}</h4>
                <p>{t("documents.internal.enrollmentForm.desc")}</p>
              </div>
              <a href="#" className="document-download">
                {t("documents.download")}
              </a>
            </div>

            <div className="document-item">
              <div className="document-info">
                <h4>{t("documents.internal.rules.title")}</h4>
                <p>{t("documents.internal.rules.desc")}</p>
              </div>
              <a href="#" className="document-download">
                {t("documents.download")}
              </a>
            </div>

            <div className="document-item">
              <div className="document-info">
                <h4>{t("documents.internal.contract.title")}</h4>
                <p>{t("documents.internal.contract.desc")}</p>
              </div>
              <a href="#" className="document-download">
                {t("documents.download")}
              </a>
            </div>

            <div className="document-item">
              <div className="document-info">
                <h4>{t("documents.internal.gdpr.title")}</h4>
                <p>{t("documents.internal.gdpr.desc")}</p>
              </div>
              <a href="#" className="document-download">
                {t("documents.download")}
              </a>
            </div>

          </div>
        </div>

        {/* FORMULARE OFICIALE */}
        <div className="documents-block">
          <h3>{t("documents.official.title")}</h3>

          <div className="documents-list">

            <div className="document-item">
              <div className="document-info">
                <h4>{t("documents.official.form230.title")}</h4>
                <p>{t("documents.official.form230.desc")}</p>
              </div>
              <a href="#" className="document-download">
                {t("documents.download")}
              </a>
            </div>

            <div className="document-item">
              <div className="document-info">
                <h4>{t("documents.official.disability.title")}</h4>
                <p>{t("documents.official.disability.desc")}</p>
              </div>
              <a href="#" className="document-download">
                {t("documents.download")}
              </a>
            </div>

            <div className="document-item">
              <div className="document-info">
                <h4>{t("documents.official.orientation.title")}</h4>
                <p>{t("documents.official.orientation.desc")}</p>
              </div>
              <a href="#" className="document-download">
                {t("documents.download")}
              </a>
            </div>

            <div className="document-item">
              <div className="document-info">
                <h4>{t("documents.official.npi.title")}</h4>
                <p>{t("documents.official.npi.desc")}</p>
              </div>
              <a href="#" className="document-download">
                {t("documents.download")}
              </a>
            </div>

            <div className="document-item">
              <div className="document-info">
                <h4>{t("documents.official.social.title")}</h4>
                <p>{t("documents.official.social.desc")}</p>
              </div>
              <a href="#" className="document-download">
                {t("documents.download")}
              </a>
            </div>

          </div>
        </div>

        {/* CADRU LEGAL */}
        <div className="documents-block">
          <h3>{t("documents.legal.title")}</h3>

          <div className="legal-reference">
            <h4>{t("documents.legal.law448.title")}</h4>
            <p>{t("documents.legal.law448.desc")}</p>
          </div>

          <div className="legal-reference">
            <h4>{t("documents.legal.law1.title")}</h4>
            <p>{t("documents.legal.law1.desc")}</p>
          </div>

          <div className="legal-reference">
            <h4>{t("documents.legal.un.title")}</h4>
            <p>{t("documents.legal.un.desc")}</p>
          </div>

        </div>

      </section>
    </>
  );
};

export default Documente;
