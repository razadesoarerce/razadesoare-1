import { useState, useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { getEventById } from "../../../services/eventService";

const formatDate = (d) => {
  if (!d) return "";
  const date = d instanceof Date ? d : new Date(d);
  return date.toLocaleDateString("ro-RO", { day: "numeric", month: "long", year: "numeric" });
};

/** Normalize URL for comparison (trim, no fragment, optional trailing slash). */
function normalizeUrl(url) {
  if (!url || typeof url !== "string") return "";
  try {
    const u = url.trim().split("#")[0].split("?")[0];
    return u.endsWith("/") ? u.slice(0, -1) : u;
  } catch {
    return url.trim();
  }
}

/**
 * Remove from HTML any <img> whose src is the event cover (cover only on homepage cards).
 */
function stripCoverImageFromContent(html, coverUrls) {
  if (!html || !coverUrls.length) return html || "";
  const normalizedCovers = coverUrls.map(normalizeUrl).filter(Boolean);
  if (!normalizedCovers.length) return html;

  const doc = new DOMParser().parseFromString(html, "text/html");
  const imgs = doc.querySelectorAll("img");
  imgs.forEach((img) => {
    const rawSrc = (img.getAttribute("src") || "").trim();
    const srcNorm = normalizeUrl(rawSrc);
    const isCover = normalizedCovers.some(
      (c) => srcNorm === c || rawSrc.startsWith(c) || rawSrc.startsWith(c + "?")
    );
    if (isCover) {
      img.remove();
    }
  });
  return doc.body.innerHTML;
}

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    getEventById(id)
      .then(setEvent)
      .finally(() => setLoading(false));
  }, [id]);

  const contentWithoutCover = useMemo(() => {
    if (!event?.content) return "";
    const coverUrls = [
      event.coverImageUrl,
      event.coverImage,
      event.imageUrl,
    ].filter(Boolean);
    return stripCoverImageFromContent(event.content, coverUrls);
  }, [event?.content, event?.coverImageUrl, event?.coverImage, event?.imageUrl]);

  if (loading) return <div style={{ padding: "40px" }}><p>Se încarcă…</p></div>;
  if (!event) return <div style={{ padding: "40px" }}><p>Eveniment negăsit.</p><Link to="/evenimente">Înapoi la evenimente</Link></div>;

  return (
    <div style={{ padding: "40px", maxWidth: "720px", margin: "0 auto" }}>
      <Link to="/evenimente" style={{ display: "inline-block", marginBottom: "16px" }}>← Înapoi la evenimente</Link>
      <h1 style={{ marginBottom: "8px" }}>{event.title}</h1>
      <p className="event-date" style={{ color: "#6b7280", fontSize: "0.95em", marginBottom: 0 }}>
        {formatDate(event.createdAt)}
      </p>
      <div
        className="event-article-content"
        style={{ marginTop: "24px" }}
        dangerouslySetInnerHTML={{ __html: contentWithoutCover }}
      />
    </div>
  );
};

export default EventDetails;
