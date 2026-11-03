import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationRO from "./locales/ro/translation.json";
import translationEN from "./locales/en/translation.json";
import previewRO from "./locales/ro/preview.json";
import previewEN from "./locales/en/preview.json";
import previewTeamRO from "./locales/ro/previewTeam.json";
import previewTeamEN from "./locales/en/previewTeam.json";

/** v2 — ignore older i18nextLng values auto-set from Chrome's English UI language. */
export const I18N_STORAGE_KEY = "hp-app-lang-v2";

/** Persist + switch language. Survives refresh; does not follow browser UI language. */
export const setAppLanguage = (lng) => {
  const next = lng?.startsWith("en") ? "en" : "ro";
  try {
    window.localStorage.setItem(I18N_STORAGE_KEY, next);
  } catch {
    /* ignore quota / private mode */
  }
  return i18n.changeLanguage(next);
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ro: { translation: { ...translationRO, preview: { ...previewRO, team: previewTeamRO } } },
      en: { translation: { ...translationEN, preview: { ...previewEN, team: previewTeamEN } } }
    },
    fallbackLng: "ro",
    supportedLngs: ["ro", "en"],
    load: "languageOnly",
    nonExplicitSupportedLngs: true,
    detection: {
      // Prefer saved choice; never auto-switch to Chrome/browser English.
      order: ["localStorage"],
      caches: ["localStorage"],
      lookupLocalStorage: I18N_STORAGE_KEY
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
