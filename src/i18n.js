import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationRO from "./locales/ro/translation.json";
import translationEN from "./locales/en/translation.json";
import previewRO from "./locales/ro/preview.json";
import previewEN from "./locales/en/preview.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ro: { translation: { ...translationRO, preview: previewRO } },
      en: { translation: { ...translationEN, preview: previewEN } }
    },
    fallbackLng: "ro",
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"]
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
