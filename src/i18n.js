import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationRO from "./locales/ro/translation.json";
import translationEN from "./locales/en/translation.json";
import previewRO from "./locales/ro/preview.json";
import previewEN from "./locales/en/preview.json";
import previewTeamRO from "./locales/ro/previewTeam.json";
import previewTeamEN from "./locales/en/previewTeam.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ro: { translation: { ...translationRO, preview: { ...previewRO, team: previewTeamRO } } },
      en: { translation: { ...translationEN, preview: { ...previewEN, team: previewTeamEN } } }
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
