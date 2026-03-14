import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getAlbumPhotos, addAlbumPhoto, deleteAlbumPhotoByIndex } from "../../../services/albumService";

const AlbumPhotos = () => {
  const { albumId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    if (!albumId) return;
    setLoading(true);
    try {
      const data = await getAlbumPhotos(albumId);
      setPhotos(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [albumId]);

  const handleAdd = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      await addAlbumPhoto(albumId, file, () => {});
      await load();
    } catch (err) {
      console.error(err);
      alert("Eroare la încărcare.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (photoId) => {
    if (!window.confirm("Ștergi fotografia?")) return;
    try {
      await deleteAlbumPhotoByIndex(albumId, photoId);
      await load();
    } catch (err) {
      console.error(err);
      alert("Eroare la ștergere.");
    }
  };

  return (
    <div>
      <Link to="/admin/gallery" style={{ marginBottom: "16px", display: "inline-block" }}>← Înapoi la Galerie</Link>
      <h1 className="admin-page-title">Fotografii album</h1>
      <div style={{ marginBottom: "16px" }}>
        <label>
          <input type="file" accept="image/*" onChange={handleAdd} disabled={uploading} style={{ display: "none" }} />
          <span style={{ padding: "8px 16px", background: "#1e3a8a", color: "#fff", borderRadius: "4px", cursor: "pointer" }}>
            {uploading ? "Se încarcă…" : "Adaugă fotografie"}
          </span>
        </label>
      </div>
      {loading ? (
        <p>Se încarcă…</p>
      ) : photos.length === 0 ? (
        <p>Nu există fotografii.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "12px" }}>
          {photos.map((photo) => (
            <li key={photo.id} style={{ position: "relative" }}>
              <img src={photo.url} alt="" style={{ width: "100%", aspectRatio: "1", objectFit: "cover", borderRadius: "4px" }} />
              <button
                type="button"
                onClick={() => handleDelete(photo.id)}
                style={{ position: "absolute", top: "4px", right: "4px", background: "rgba(185,28,28,0.9)", color: "#fff", border: "none", borderRadius: "4px", padding: "4px 8px", fontSize: "0.8em", cursor: "pointer" }}
              >
                Șterge
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AlbumPhotos;
