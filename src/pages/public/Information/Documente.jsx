import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import SEO from "../../../components/common/SEO";
import {
  getDocuments,
  getDocumentDownloadUrl,
} from "../../../services/documentService";

const Documente = () => {
  const { t } = useTranslation();
  const [cmsDocuments, setCmsDocuments] = useState([]);

  useEffect(() => {
    getDocuments().then(setCmsDocuments).catch(() => setCmsDocuments([]));
  }, []);

  const internalDocs = cmsDocuments.filter((d) => d.category === "internal");
  const officialDocs = cmsDocuments.filter((d) => d.category === "official");

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
            {internalDocs.length === 0 ? (
              <p>{t("documents.empty", "Nu există documente în această categorie.")}</p>
            ) : (
              internalDocs.map((doc) => (
                <div key={doc.id} className="document-item">
                  <div className="document-info">
                    <h4>{doc.title}</h4>
                    {doc.description && <p>{doc.description}</p>}
                  </div>
                  <a
                    href={getDocumentDownloadUrl(doc)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="document-download"
                  >
                    Deschide document
                  </a>
                </div>
              ))
            )}
          </div>
        </div>

        {/* FORMULARE OFICIALE */}
        <div className="documents-block">
          <h3>{t("documents.official.title")}</h3>

          <div className="documents-list">
            {officialDocs.length === 0 ? (
              <p>{t("documents.empty", "Nu există documente în această categorie.")}</p>
            ) : (
              officialDocs.map((doc) => (
                <div key={doc.id} className="document-item">
                  <div className="document-info">
                    <h4>{doc.title}</h4>
                    {doc.description && <p>{doc.description}</p>}
                  </div>
                  <a
                    href={getDocumentDownloadUrl(doc)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="document-download"
                  >
                    Deschide document
                  </a>
                </div>
              ))
            )}
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
