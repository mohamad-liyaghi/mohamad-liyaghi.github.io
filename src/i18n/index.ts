import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en";
import fa from "./fa";

export const LANGS = ["en", "fa"] as const;
export type Lang = (typeof LANGS)[number];

export function isLang(v: string | undefined): v is Lang {
  return v === "en" || v === "fa";
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fa: { translation: fa },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
  returnNull: false,
});

export default i18n;
