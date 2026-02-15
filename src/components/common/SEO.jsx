import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const SEO = ({ titleKey, descriptionKey }) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (titleKey) {
      document.title = t(titleKey);
    }

    if (descriptionKey) {
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.name = "description";
        document.head.appendChild(meta);
      }
      meta.content = t(descriptionKey);
    }
  }, [titleKey, descriptionKey, t]);

  return null;
};

export default SEO;
