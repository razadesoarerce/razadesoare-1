import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StorageUsageWidget from "../../components/admin/StorageUsageWidget";
import { getEventsAdmin } from "../../services/eventService";
import { getDocuments } from "../../services/documentService";
import { getAlbums } from "../../services/albumService";

/**
 * Admin dashboard. Only accessible when authenticated (guarded by AdminAuthGuard).
 */
function countGalleryImages(albums) {
  return albums.reduce((acc, a) => {
    const photos = Array.isArray(a.photos) ? a.photos.length : 0;
    const hasCoverCard = a.coverCard && (typeof a.coverCard === "string" ? a.coverCard : a.coverCard?.url);
    const hasFrontCover = a.frontCover && (typeof a.frontCover === "string" ? a.frontCover : a.frontCover?.url);
    return acc + photos + (hasCoverCard ? 1 : 0) + (hasFrontCover ? 1 : 0);
  }, 0);
}

const Dashboard = () => {
  const [eventsCount, setEventsCount] = useState(0);
  const [documentsCount, setDocumentsCount] = useState(0);
  const [albumsCount, setAlbumsCount] = useState(0);
  const [galleryImagesCount, setGalleryImagesCount] = useState(0);

  useEffect(() => {
    Promise.all([getEventsAdmin(), getDocuments(), getAlbums()])
      .then(([events, documents, albums]) => {
        setEventsCount(events.length);
        setDocumentsCount(documents.length);
        setAlbumsCount(albums.length);
        setGalleryImagesCount(countGalleryImages(albums));
      })
      .catch(() => {});
  }, []);

  return (
    <div>
      <h1 className="admin-page-title">Admin Dashboard</h1>
      <p style={{ marginBottom: "24px" }}>Bine ai venit în panoul de administrare.</p>

      <div className="admin-cards-grid">
        <div className="admin-card">
          <div style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "4px" }}>Evenimente</div>
          <div style={{ fontSize: "1.75rem", fontWeight: 600, color: "#1f2937" }}>{eventsCount}</div>
          <div className="admin-card-footer">
            <Link to="/admin/events" className="admin-button" style={{ marginTop: "12px", display: "inline-block" }}>
              Vezi evenimente
            </Link>
          </div>
        </div>
        <div className="admin-card">
          <div style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "4px" }}>Documente</div>
          <div style={{ fontSize: "1.75rem", fontWeight: 600, color: "#1f2937" }}>{documentsCount}</div>
          <div className="admin-card-footer">
            <Link to="/admin/documents" className="admin-button" style={{ marginTop: "12px", display: "inline-block" }}>
              Vezi documente
            </Link>
          </div>
        </div>
        <div className="admin-card">
          <div style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "4px" }}>Galerie (albume)</div>
          <div style={{ fontSize: "1.75rem", fontWeight: 600, color: "#1f2937" }}>{albumsCount}</div>
          <div style={{ fontSize: "0.875rem", color: "#6b7280", marginTop: "4px" }}>
            {galleryImagesCount} imagini
          </div>
          <div className="admin-card-footer">
            <Link to="/admin/gallery" className="admin-button" style={{ marginTop: "12px", display: "inline-block" }}>
              Vezi galeria
            </Link>
          </div>
        </div>
      </div>

      <div style={{ marginTop: "24px" }}>
        <StorageUsageWidget />
      </div>
    </div>
  );
};

export default Dashboard;