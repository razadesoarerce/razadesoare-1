import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationRO from "./locales/ro/translation.json";
import translationEN from "./locales/en/translation.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      ro: { translation: translationRO },
      en: { translation: translationEN }
    },
    lng: "ro",
    fallbackLng: "ro",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
