/**
 * Strip HTML tags and return first maxLength characters for excerpt.
 */
export function getExcerpt(html, maxLength = 120) {
  if (!html || typeof html !== "string") return "";
  // Strip tags and normalize common HTML whitespace entities.
  // Some CMS contents can contain literal "&nbsp;" which shouldn't be visible in excerpts.
  const text = html
    .replace(/&nbsp;/gi, " ")
    .replace(/&#160;/g, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "…";
}
