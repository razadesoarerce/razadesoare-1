import { useEffect, useState, useMemo } from "react";
import {
  uploadDocument,
  getDocuments,
  deleteDocument,
  getDocumentDownloadUrl,
  updateDocumentMeta,
} from "../../../services/documentService";
import { validateDocumentFile } from "../../../services/cloudinaryService";

const formatDate = (d) => {
  if (!d) return "";
  const date = d instanceof Date ? d : new Date(d);
  return date.toLocaleDateString("ro-RO", { day: "numeric", month: "short", year: "numeric" });
};

const DocumentsList = () => {
  const [documents, setDocuments] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("internal");
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [search, setSearch] = useState("");
  const [sortDirection, setSortDirection] = useState("desc");

  const load = async () => {
    setLoading(true);
    try {
      const data = await getDocuments();
      setDocuments(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filteredAndSorted = useMemo(() => {
    let list = documents.filter((d) =>
      (d.title || "").toLowerCase().includes(search.trim().toLowerCase())
    );
    const dir = sortDirection === "asc" ? 1 : -1;
    list = [...list].sort((a, b) => {
      const ta = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const tb = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dir * (ta - tb);
    });
    return list;
  }, [documents, search, sortDirection]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      if (editingId) {
        await updateDocumentMeta(editingId, { title, description, category });
        setSuccessMessage("Document actualizat cu succes.");
      } else {
        if (!file) {
          setErrorMessage("Selectează un fișier.");
          setUploading(false);
          return;
        }
        const validation = validateDocumentFile(file);
        if (!validation.ok) {
          setErrorMessage(validation.error);
          setUploading(false);
          return;
        }
        setUploadProgress(0);
        await uploadDocument(file, title || file.name, description, category, (pct) => setUploadProgress(pct));
        setSuccessMessage("Document încărcat cu succes.");
      }
      setTitle("");
      setDescription("");
      setCategory("internal");
      setFile(null);
      setEditingId(null);
      e.target.reset();
      await load();
    } catch (err) {
      console.error(err);
      setErrorMessage(err?.message || "Eroare la încărcare.");
    } finally {
      setUploading(false);
      setUploadProgress(null);
    }
  };

  const handleDelete = async (d) => {
    const confirmed = window.confirm("Esti sigur ca vrei sa stergi acest element?");
    if (!confirmed) return;
    try {
      console.log("Deleting:", d);
      await deleteDocument(d);
      await load();
    } catch (err) {
      console.error(err);
      alert("Eroare la ștergere.");
    }
  };

  const handleEdit = (docItem) => {
    setEditingId(docItem.id);
    setTitle(docItem.title || "");
    setDescription(docItem.description || "");
    setCategory(docItem.category || "internal");
    setFile(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setCategory("internal");
    setFile(null);
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const toggleSort = () => {
    setSortDirection((d) => (d === "desc" ? "asc" : "desc"));
  };

  return (
    <div>
      <div className="admin-header">
        <h1 className="admin-page-title">Documente</h1>
      </div>

      {successMessage && (
        <div style={{ marginBottom: "16px", padding: "12px 16px", background: "#dcfce7", color: "#166534", borderRadius: "6px" }}>
          ✅ {successMessage}
        </div>
      )}
      {errorMessage && (
        <div style={{ marginBottom: "16px", padding: "12px 16px", background: "#fee2e2", color: "#991b1b", borderRadius: "6px" }}>
          ❌ {errorMessage}
        </div>
      )}

      <div className="admin-card" style={{ marginBottom: "24px", maxWidth: "400px" }}>
        <h3 style={{ marginTop: 0, marginBottom: "12px" }}>
          {editingId ? "Editează document" : "Încarcă document"}
        </h3>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <input
            type="text"
            placeholder="Titlu document"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="internal">Documente interne</option>
            <option value="official">Documente oficiale</option>
          </select>
          <textarea
            placeholder="Descriere document"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            style={{ resize: "vertical", padding: "10px 12px", border: "1px solid #e5e7eb", borderRadius: "6px" }}
          />
          <input
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            required={!editingId}
            onChange={(e) => { setFile(e.target.files?.[0] || null); setErrorMessage(null); }}
          />
          <p style={{ fontSize: "0.9em", color: "#666", margin: 0 }}>PDF, DOC sau DOCX, max 5 MB.</p>
          {uploadProgress !== null && (
            <div style={{ padding: "12px", background: "#f3f4f6", borderRadius: "6px" }}>
              <div style={{ marginBottom: "6px" }}>Se încarcă…</div>
              <div style={{ height: "8px", background: "#e5e7eb", borderRadius: "4px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${uploadProgress}%`, background: "#7ac142", transition: "width 0.2s" }} />
              </div>
              <div style={{ fontSize: "0.9em", marginTop: "4px" }}>Progres: {uploadProgress}%</div>
            </div>
          )}
          <button type="submit" disabled={uploading} className="admin-button">
            {uploading ? "Se încarcă…" : editingId ? "Salvează modificările" : "Încarcă document"}
          </button>
          {editingId && (
            <button type="button" className="admin-button-secondary" onClick={handleCancelEdit}>
              Anulează editarea
            </button>
          )}
        </form>
      </div>

      <div className="admin-search-bar">
        <input
          type="text"
          placeholder="Caută..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Se încarcă…</p>
      ) : documents.length === 0 ? (
        <p>Nu există documente.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Titlu</th>
              <th data-sort onClick={toggleSort} style={{ cursor: "pointer" }}>
                Data {sortDirection === "desc" ? "↓" : "↑"}
              </th>
              <th>Categorie</th>
              <th>Acțiuni</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSorted.map((d) => (
              <tr key={d.id}>
                <td>
                  <div style={{ fontWeight: 600 }}>{d.title}</div>
                  {d.description ? (
                    <div style={{ color: "#6b7280", fontSize: "0.9rem" }}>{d.description}</div>
                  ) : null}
                </td>
                <td>{formatDate(d.createdAt)}</td>
                <td>{d.category === "official" ? "Documente oficiale" : "Documente interne"}</td>
                <td>
                  <a
                    href={getDocumentDownloadUrl(d)}
                    className="admin-button-secondary"
                  >
                    Descarcă
                  </a>
                  <button type="button" onClick={() => handleEdit(d)} className="admin-action-btn admin-edit-btn">
                    Edit
                  </button>
                  <button type="button" onClick={() => handleDelete(d)} className="admin-button-danger">
                    Șterge
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DocumentsList;
