/**
 * Strip HTML tags and return first maxLength characters for excerpt.
 */
export function getExcerpt(html, maxLength = 120) {
  if (!html || typeof html !== "string") return "";
  const text = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "…";
}
