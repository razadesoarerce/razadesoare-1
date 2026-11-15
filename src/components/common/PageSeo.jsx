import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const ORIGIN = "https://razadesoare.com";

const upsertMeta = (selector, attr, key, content) => {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

/**
 * Per-page title, description, Open Graph and canonical.
 * The homepage defaults also live in index.html so Google sees them before JavaScript.
 */
const PageSeo = ({ title, description, path = "/" }) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const url = `${ORIGIN}${path.startsWith("/") ? path : `/${path}`}`;
    document.title = title;
    document.documentElement.lang = i18n.language?.startsWith("en") ? "en" : "ro";
    upsertMeta('meta[name="description"]', "name", "description", description);
    upsertMeta('meta[property="og:title"]', "property", "og:title", title);
    upsertMeta('meta[property="og:description"]', "property", "og:description", description);
    upsertMeta('meta[property="og:url"]', "property", "og:url", url);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);
  }, [title, description, path, i18n.language]);

  return null;
};

export default PageSeo;
