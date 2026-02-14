import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const SEO = ({ titleKey, descriptionKey, image, type = "website" }) => {
  const { t } = useTranslation();

  const title = t(titleKey);
  const description = t(descriptionKey);
  const defaultImage = "/images/og-default.jpg";
  const ogImage = image || defaultImage;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content={type} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};

export default SEO;
