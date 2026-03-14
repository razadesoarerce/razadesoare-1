import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEventByIdAdmin, updateEvent } from "../../../services/eventService";
import { uploadImage, validateImageFile } from "../../../services/cloudinaryService";
import RichTextEditor from "../../../components/admin/RichTextEditor";

const EditEvent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [coverImagePublicId, setCoverImagePublicId] = useState("");
  const [coverImageSizeBytes, setCoverImageSizeBytes] = useState(0);
  const [coverFile, setCoverFile] = useState(null);
  const [status, setStatus] = useState("published");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null);

  useEffect(() => {
    let cancelled = false;
    getEventByIdAdmin(id).then((data) => {
      if (!cancelled && data) {
        setEvent(data);
        setTitle(data.title || "");
        setContent(data.content || "");
        setCoverImageUrl(data.coverImageUrl || data.coverImage || data.imageUrl || "");
        setCoverImagePublicId(data.coverImagePublicId || "");
        setCoverImageSizeBytes(typeof data.coverImageSizeBytes === "number" ? data.coverImageSizeBytes : 0);
        setStatus(data.status || "published");
      }
    });
    return () => { cancelled = true; };
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    try {
      let finalCoverImageUrl = coverImageUrl;
      let finalCoverImagePublicId = coverImagePublicId;
      let finalCoverImageSizeBytes = coverImageSizeBytes;
      if (coverFile) {
        const validation = validateImageFile(coverFile);
        if (!validation.ok) {
          setErrorMessage(validation.error);
          setLoading(false);
          return;
        }
        setUploadProgress(0);
        const result = await uploadImage(coverFile, (pct) => setUploadProgress(pct));
        finalCoverImageUrl = result.secure_url ?? "";
        finalCoverImagePublicId = result.public_id ?? "";
        finalCoverImageSizeBytes = typeof result.bytes === "number" ? result.bytes : 0;
        setUploadProgress(null);
      }
      await updateEvent(id, {
        title,
        content,
        coverImageUrl: finalCoverImageUrl,
        coverImagePublicId: finalCoverImagePublicId,
        coverImageSizeBytes: finalCoverImageSizeBytes,
        status,
      });
      navigate("/admin/events");
    } catch (err) {
      console.error(err);
      setErrorMessage(err?.message || "Eroare la salvare.");
    } finally {
      setLoading(false);
    }
  };

  if (!event) return <p>Se încarcă…</p>;

  return (
    <div>
      <h1 className="admin-page-title">Editează Eveniment</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "640px" }}>
        <div>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: 600 }}>Titlu</label>
          <input
            type="text"
            placeholder="Titlu"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: "100%", padding: "8px 12px", boxSizing: "border-box" }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: 600 }}>Imagine copertă (doar pentru cardul de pe homepage)</label>
          {errorMessage && (
            <div style={{ marginBottom: "8px", padding: "8px 12px", background: "#fee2e2", color: "#991b1b", borderRadius: "6px" }}>{errorMessage}</div>
          )}
          {coverImageUrl && (
            <div style={{ marginBottom: "8px" }}>
              <span style={{ fontSize: "0.9em", color: "#666" }}>Imagine curentă: </span>
              <img src={coverImageUrl} alt="" style={{ maxWidth: "200px", maxHeight: "120px", display: "block", marginTop: "4px", borderRadius: "4px" }} />
            </div>
          )}
          {uploadProgress !== null && (
            <div style={{ marginBottom: "8px", padding: "8px", background: "#f3f4f6", borderRadius: "6px" }}>Se încarcă imaginea… {uploadProgress}%</div>
          )}
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
            onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
          />
          <p style={{ fontSize: "0.9em", color: "#666", marginTop: "4px" }}>Lăsați gol pentru a păstra imaginea curentă. JPG, PNG, WEBP, max 2 MB. Recomandat: 1200×800px.</p>
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: 600 }}>Conținut articol</label>
          <RichTextEditor value={content} onChange={setContent} minHeight={280} />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "6px", fontWeight: 600 }}>Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ padding: "8px 12px" }}>
            <option value="published">Publicat</option>
            <option value="draft">Ciornă</option>
          </select>
        </div>

        <button type="submit" disabled={loading || uploadProgress !== null} style={{ padding: "10px 20px", alignSelf: "flex-start" }}>
          {loading || uploadProgress !== null ? "Se salvează…" : "Salvează eveniment"}
        </button>
      </form>
    </div>
  );
};

export default EditEvent;
