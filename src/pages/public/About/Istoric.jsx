import SEO from "../../../components/common/SEO";
import { useTranslation } from "react-i18next";

const Istoric = () => {
  const { t } = useTranslation();

  return (
    <>
      <SEO titleKey="about.history.seoTitle" descriptionKey="about.history.seoDescription" />
      <section className="page-content-section editorial-content">
        <h2 className="editorial-title">{t("about.history.pageTitle")}</h2>
        <p className="lead-paragraph">
          {t("about.history.paragraphs.p1")}
        </p>
        <p>{t("about.history.paragraphs.p2")}</p>
        <p>{t("about.history.paragraphs.p3")}</p>
        <p>{t("about.history.paragraphs.p4")}</p>
        <p>{t("about.history.paragraphs.p5")}</p>
      </section>
    </>
  );
};

export default Istoric;
